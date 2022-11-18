import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto.duration && createTrackDto.name) {
      const newTrack = await this.tracksService.create(createTrackDto);
      return newTrack;
    }
    throw new HttpException('Some fields are missing', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const track = await this.tracksService.findOne(params.id);
      if (track) return track;
      throw new HttpException(
        'This track does not exist',
        HttpStatus.NOT_FOUND,
      );
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Put(':id')
  async update(@Param() params: any, @Body() updateTrackDto: UpdateTrackDto) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      ) &&
      updateTrackDto.name !== null &&
      updateTrackDto.duration !== null
    ) {
      const trackUpdated = await this.tracksService.update(
        params.id,
        updateTrackDto,
      );
      return trackUpdated;
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async remove(@Param() params: any) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const isSuccess = await this.tracksService.remove(params.id);
      if (!isSuccess) {
        throw new HttpException(
          'This track does not exist',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          'This track was successfullly deleted',
          HttpStatus.NO_CONTENT,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }
}
