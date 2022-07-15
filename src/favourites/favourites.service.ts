import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { FavoritesResponse } from './interfaces/favourites.interface';

@Injectable()
export class FavouritesService {
  constructor(private dataBase: DatabaseService) {}

  findAll(): FavoritesResponse {
    return this.dataBase.getFavourites();
  }

  addTrack(trackId: string) {
    this.dataBase.addTrackToFavs(trackId);
  }

  addAlbum(albumId: string) {
    this.dataBase.addAlbumToFavs(albumId);
  }

  addArtist(artistId: string) {
    this.dataBase.addArtistToFavs(artistId);
  }

  deleteTrack(trackId: string) {
    this.dataBase.deleteTrackFromFavs(trackId);
  }

  deleteAlbum(albumId: string) {
    this.dataBase.deleteAlbumFromFavs(albumId);
  }

  deleteArtist(artistId: string) {
    this.dataBase.deleteArtistFromFavs(artistId);
  }
}
