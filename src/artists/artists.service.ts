import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private dataBase: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuid(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.dataBase.addArtist(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.dataBase.artists;
  }

  findOne(id: string): Artist {
    return this.dataBase.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistForUpdate = this.dataBase.artists.find(
      (artist) => artist.id === id,
    );

    if (!artistForUpdate)
      throw new HttpException(
        'This artist does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedArtist = {
      id: artistForUpdate.id,
      name: updateArtistDto.name || artistForUpdate.name,
      grammy: updateArtistDto.grammy,
    };
    this.dataBase.updateArtist(id, updatedArtist);
    return updatedArtist;
  }

  remove(id: string) {
    const isSuccess = !!this.dataBase.artists.find(
      (artist) => artist.id === id,
    );
    if (isSuccess) {
      this.dataBase.deleteArtist(id);
    }
    return isSuccess;
  }
}
