import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authorization/jwt-auth.guard';
import { DatabaseService } from 'src/database/database.service';
import { FavouritesService } from './favourites.service';

@Controller('favs')
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private dataBase: DatabaseService,
  ) {}

  @Get()
  async findAll() {
    return await this.favouritesService.findAll();
  }

  @Post('/track/:id')
  async addTrackToFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      await this.favouritesService.addTrack(id);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Post('/album/:id')
  async addAlbumToFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      await this.favouritesService.addAlbum(id);
      throw new HttpException(
        'This album was successfully added to favourites',
        HttpStatus.CREATED,
      );
      throw new HttpException(
        'This album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Post('/artist/:id')
  async addArtistToFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      await this.favouritesService.addArtist(id);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete('/track/:id')
  async deleteTrackFromFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      await this.favouritesService.deleteTrack(id);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete('/album/:id')
  async deleteAlbumFromFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      await this.favouritesService.deleteAlbum(id);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete('/artist/:id')
  async deleteArtistFromFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      await this.favouritesService.deleteArtist(id);
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }
}
