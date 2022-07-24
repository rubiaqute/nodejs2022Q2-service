import { Injectable } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class DatabaseService {
  constructor(
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  deleteArtistFromFavs(artistId: string) {
    this.artistsService.delFromF(artistId);
  }

  deleteAlbumFromFavs(albumId: string) {
    this.albumsService.delFromF(albumId);
  }

  deleteTrackFromFavs(trackId: string) {
    this.tracksService.delFromF(trackId);
  }

  addTrackToFavs(trackId: string) {
    this.tracksService.addToF(trackId);
  }

  addAlbumToFavs(albumId: string) {
    this.albumsService.addToF(albumId);
  }

  addArtistToFavs(artistId: string) {
    this.artistsService.addToF(artistId);
  }

  isArtistinFav(id) {
    return this.artistsService.isInF(id);
  }

  isAlbuminFav(id) {
    return this.albumsService.isInF(id);
  }

  isTrackinFav(id: string) {
    return this.tracksService.isInF(id);
  }

  async getFavourites() {
    return {
      artists: await Promise.all(
        this.artistsService.artistsF.map((el) =>
          this.artistsService.findOne(el),
        ),
      ),
      albums: await Promise.all(
        this.albumsService.albumsF.map(
          async (el) => await this.albumsService.findOne(el),
        ),
      ),
      tracks: await Promise.all(
        this.tracksService.tracksF.map(
          async (el) => await this.tracksService.findOne(el),
        ),
      ),
    };
  }
}
