import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private dataBase: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuid(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };
    this.dataBase.addAlbum(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.dataBase.albums;
  }

  findOne(id: string): Album {
    return this.dataBase.albums.find((album) => album.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumForUpdate = this.dataBase.albums.find(
      (album) => album.id === id,
    );

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

    this.dataBase.updateAlbum(id, updatedAlbum);
    return updatedAlbum;
  }

  remove(id: string) {
    const isSuccess = !!this.dataBase.albums.find((album) => album.id === id);
    if (isSuccess) {
      this.dataBase.deleteAlbum(id);
    }
    return isSuccess;
  }
}
