import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { v4 as uuid } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];
  constructor(private trackService: TracksService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumForUpdate = this.albums.find((album) => album.id === id);

    if (!albumForUpdate)
      throw new HttpException(
        'This album does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedAlbum = {
      id: albumForUpdate.id,
      name: updateAlbumDto.name || albumForUpdate.name,
      year: updateAlbumDto.year || albumForUpdate.year,
      artistId: updateAlbumDto.artistId || albumForUpdate.artistId,
    };

    this.albums = this.albums.map((el) => (el.id === id ? updatedAlbum : el));
    return updatedAlbum;
  }

  remove(id: string) {
    const isSuccess = !!this.albums.find((artist) => artist.id === id);
    if (isSuccess) {
      this.albums = this.albums.filter((el) => el.id !== id);
      this.trackService.deleteAlbum(id);
    }
    return isSuccess;
  }

  deleteArtist(artistId: string) {
    this.albums.forEach((el) => {
      if (el.artistId === artistId) {
        el.artistId = null;
      }
    });
  }
}
