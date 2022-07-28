import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Favourite as FavouriteBase } from './../entities/Favourites';

import { FavoritesResponse } from './interfaces/favourites.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavouriteBase)
    private favouritesRepository: Repository<FavouriteBase>,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
    private artistsService: ArtistsService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const result = await this.favouritesRepository.findOne({
      where: {},
      relations: ['tracks', 'artists', 'albums'],
    });

    return (
      result || {
        albums: [],
        tracks: [],
        artists: [],
      }
    );
  }

  async addTrack(trackId: string) {
    let result = await this.favouritesRepository.findOne({
      where: {},
    });
    const track = await this.tracksService.findOne(trackId);
    if (!result) result = new FavouriteBase();
    if (!result.tracks) result.tracks = [];
    if (track) {
      result.tracks.push(track);
      await this.favouritesRepository.save(result);
      throw new HttpException(
        'This track was successfully added to favourites',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'This track does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addAlbum(albumId: string) {
    let result = await this.favouritesRepository.findOne({
      where: {},
    });
    if (!result) result = new FavouriteBase();
    if (!result.albums) result.albums = [];
    const album = await this.albumsService.findOne(albumId);
    if (album) {
      result.albums.push(album);
      await this.favouritesRepository.save(result);
      throw new HttpException(
        'This album was successfully added to favourites',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'This album does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async addArtist(artistId: string) {
    let result = await this.favouritesRepository.findOne({
      where: {},
    });
    if (!result) result = new FavouriteBase();
    if (!result.artists) result.artists = [];
    const artist = await this.artistsService.findOne(artistId);
    if (artist) {
      result.artists.push(artist);
      await this.favouritesRepository.save(result);
      throw new HttpException(
        'This artist was successfully added to favourites',
        HttpStatus.CREATED,
      );
    } else {
      throw new HttpException(
        'This artist does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteTrack(trackId: string) {
    let result = await this.favouritesRepository.findOne({
      where: {},
    });
    if (!result) result = new FavouriteBase();
    if (!result.tracks) result.tracks = [];
    const track = await this.tracksService.findOne(trackId);
    if (track) {
      result.tracks = result.tracks.filter((el) => el.id !== trackId);
      await this.favouritesRepository.save(result);
      throw new HttpException(
        'This track was successfully deleted from favourites',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'This track is not favourite',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteAlbum(albumId: string) {
    let result = await this.favouritesRepository.findOne({
      where: {},
    });
    if (!result) result = new FavouriteBase();
    if (!result.albums) result.albums = [];
    const album = await this.albumsService.findOne(albumId);
    if (album) {
      result.albums = result.albums.filter((el) => el.id !== albumId);
      await this.favouritesRepository.save(result);
      throw new HttpException(
        'This track was successfully deleted from favourites',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'This track is not favourite',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteArtist(artistId: string) {
    let result = await this.favouritesRepository.findOne({
      where: {},
    });
    if (!result) result = new FavouriteBase();
    if (!result.artists) result.artists = [];
    const artist = await this.artistsService.findOne(artistId);
    if (artist) {
      result.artists = result.artists.filter((el) => el.id !== artistId);
      await this.favouritesRepository.save(result);
      throw new HttpException(
        'This track was successfully deleted from favourites',
        HttpStatus.NO_CONTENT,
      );
    } else {
      throw new HttpException(
        'This track is not favourite',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
