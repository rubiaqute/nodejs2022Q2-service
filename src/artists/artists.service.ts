import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuid } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];
  constructor(
    private trackService: TracksService,
    private albumsService: AlbumsService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      id: uuid(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistForUpdate = this.artists.find((artist) => artist.id === id);

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

    this.artists = this.artists.map((el) =>
      el.id === id ? updatedArtist : el,
    );
    return updatedArtist;
  }

  remove(id: string) {
    const isSuccess = !!this.artists.find((artist) => artist.id === id);
    if (isSuccess) {
      this.artists = this.artists.filter((el) => el.id !== id);
      this.trackService.deleteArtist(id);
      this.albumsService.deleteArtist(id);
    }
    return isSuccess;
  }
}
