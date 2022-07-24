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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto.name && createAlbumDto.year) {
      const newAlbum = await this.albumsService.create(createAlbumDto);
      return newAlbum;
    }
    throw new HttpException('Some fields are missing', HttpStatus.BAD_REQUEST);
  }

  @Get()
  async findAll() {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      )
    ) {
      const album = await this.albumsService.findOne(params.id);
      if (album) return album;
      throw new HttpException(
        'This album does not exist',
        HttpStatus.NOT_FOUND,
      );
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Put(':id')
  async update(@Param() params: any, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        params.id,
      ) &&
      updateAlbumDto.name !== null &&
      updateAlbumDto.year !== null &&
      typeof updateAlbumDto.name === 'string'
    ) {
      const albumUpdated = await this.albumsService.update(
        params.id,
        updateAlbumDto,
      );
      return albumUpdated;
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
      const isSuccess = await this.albumsService.remove(params.id);
      if (!isSuccess) {
        throw new HttpException(
          'This album does not exist',
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          'This album was successfullly deleted',
          HttpStatus.NO_CONTENT,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }
}
