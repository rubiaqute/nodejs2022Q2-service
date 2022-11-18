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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authorization/jwt-auth.guard';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@UseGuards(JwtAuthGuard)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    if (createArtistDto.name && createArtistDto.grammy !== null) {
      const newArtist = await this.artistsService.create(createArtistDto);
      return newArtist;
    }
    throw new HttpException('Some fields are missing', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const artist = await this.artistsService.findOne(params.id);
      if (artist) return artist;
      throw new HttpException(
        'This artist does not exist',
        HttpStatus.NOT_FOUND,
      );
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Put(':id')
  async update(@Param() params: any, @Body() updateArtistDto: UpdateArtistDto) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      ) &&
      updateArtistDto.name !== null &&
      typeof updateArtistDto.name === 'string'
    ) {
      const artistUpdated = await this.artistsService.update(
        params.id,
        updateArtistDto,
      );
      return artistUpdated;
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
      const isSuccess = await this.artistsService.remove(params.id);
      if (!isSuccess) {
        throw new HttpException(
          'This artist does not exist',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          'This artist was successfullly deleted',
          HttpStatus.NO_CONTENT,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }
}
