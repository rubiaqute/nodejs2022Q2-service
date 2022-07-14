import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import {
  Favorites,
  FavoritesResponse,
} from './interfaces/favourites.interface';

@Injectable()
export class FavouritesService {
  constructor(
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}
  private favourites: Favorites = {
    artists: [], // favorite artists ids
    albums: [], // favorite albums ids
    tracks: [],
  };

  findAll(): FavoritesResponse {
    return {
      artists: this.favourites.artists.map((el) =>
        this.artistsService.findOne(el),
      ),
      albums: this.favourites.albums.map((el) =>
        this.albumsService.findOne(el),
      ),
      tracks: this.favourites.tracks.map((el) =>
        this.tracksService.findOne(el),
      ),
    };
  }
}
