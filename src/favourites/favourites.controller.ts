import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private dataBase: DatabaseService,
  ) {}

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }

  @Post('/track/:id')
  addTrackToFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      try {
        this.favouritesService.addTrack(id);
        throw new HttpException(
          'This track was successfully added to favourites',
          HttpStatus.CREATED,
        );
      } catch {
        throw new HttpException(
          'This track does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Post('/album/:id')
  addAlbumToFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      try {
        this.favouritesService.addAlbum(id);
        throw new HttpException(
          'This album was successfully added to favourites',
          HttpStatus.CREATED,
        );
      } catch {
        throw new HttpException(
          'This album does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Post('/artist/:id')
  addArtistToFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      try {
        this.favouritesService.addArtist(id);
        throw new HttpException(
          'This artist was successfully added to favourites',
          HttpStatus.CREATED,
        );
      } catch {
        throw new HttpException(
          'This artist does not exist',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete('/track/:id')
  deleteTrackFromFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      try {
        this.favouritesService.deleteTrack(id);
        throw new HttpException(
          'This track was successfully deleted from favourites',
          HttpStatus.NO_CONTENT,
        );
      } catch {
        throw new HttpException(
          'This track is not favourite',
          HttpStatus.NOT_FOUND,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete('/album/:id')
  deleteAlbumFromFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      try {
        this.favouritesService.deleteAlbum(id);
        throw new HttpException(
          'This album was successfully deleted from favourites',
          HttpStatus.NO_CONTENT,
        );
      } catch {
        throw new HttpException(
          'This album is not favourite',
          HttpStatus.NOT_FOUND,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }

  @Delete('/artist/:id')
  deleteArtistFromFavs(@Param('id') id: string) {
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id,
      )
    ) {
      try {
        this.favouritesService.deleteArtist(id);
        throw new HttpException(
          'This artist was successfully deleted from favourites',
          HttpStatus.NO_CONTENT,
        );
      } catch {
        throw new HttpException(
          'This artist is not favourite',
          HttpStatus.NOT_FOUND,
        );
      }
    } else
      throw new HttpException('This id is not valid', HttpStatus.BAD_REQUEST);
  }
}
