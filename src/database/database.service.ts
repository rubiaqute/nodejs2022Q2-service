import { Track } from 'src/tracks/interfaces/track.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Favorites } from 'src/favourites/interfaces/favourites.interface';
import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';

@Injectable()
export class DatabaseService {
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favourites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  deleteTrack(id: string) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
    this.favourites.tracks = this.favourites.tracks.filter((el) => el !== id);
  }

  deleteAlbum(id: string) {
    this.albums = this.albums.filter((album) => album.id !== id);
    this.favourites.albums = this.favourites.albums.filter((el) => el !== id);
    this.tracks.forEach((el) => {
      if (el.albumId === id) {
        el.albumId = null;
      }
    });
  }

  deleteArtist(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
    this.favourites.artists = this.favourites.artists.filter((el) => el !== id);
    this.tracks.forEach((el) => {
      if (el.artistId === id) {
        el.artistId = null;
      }
    });
    this.albums.forEach((el) => {
      if (el.artistId === id) {
        el.artistId = null;
      }
    });
  }

  updateTrack(id: string, updatedTrack: Track) {
    this.tracks = this.tracks.map((el) => (el.id === id ? updatedTrack : el));
  }

  updateArtist(id: string, updatedArtist: Artist) {
    this.artists = this.artists.map((el) =>
      el.id === id ? updatedArtist : el,
    );
  }

  updateAlbum(id: string, updatedAlbum: Album) {
    this.albums = this.albums.map((el) => (el.id === id ? updatedAlbum : el));
  }

  deleteArtistFromFavs(artistId: string) {
    this.favourites.artists = this.favourites.artists.filter(
      (el) => el !== artistId,
    );
  }

  deleteAlbumFromFavs(albumId: string) {
    this.favourites.albums = this.favourites.albums.filter(
      (el) => el !== albumId,
    );
  }

  deleteTrackFromFavs(trackId: string) {
    this.favourites.tracks = this.favourites.tracks.filter(
      (el) => el !== trackId,
    );
  }

  addTrackToFavs(trackId: string) {
    this.favourites.tracks.push(trackId);
  }

  addAlbumToFavs(albumId: string) {
    this.favourites.albums.push(albumId);
  }

  addArtistToFavs(artistId: string) {
    this.favourites.artists.push(artistId);
  }

  getFavourites() {
    return {
      artists: this.favourites.artists.map((el) =>
        this.artists.find((artist) => artist.id === el),
      ),
      albums: this.favourites.albums.map((el) =>
        this.albums.find((album) => album.id === el),
      ),
      tracks: this.favourites.tracks.map((el) =>
        this.tracks.find((album) => album.id === el),
      ),
    };
  }
}
