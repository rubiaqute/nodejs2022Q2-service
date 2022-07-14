import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuid(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackForUpdate = this.tracks.find((track) => track.id === id);

    if (!trackForUpdate)
      throw new HttpException(
        'This track does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedTrack = {
      id: trackForUpdate.id,
      name: updateTrackDto.name || trackForUpdate.name,
      artistId: updateTrackDto.artistId || trackForUpdate.artistId,
      albumId: updateTrackDto.albumId || trackForUpdate.albumId,
      duration: updateTrackDto.duration || trackForUpdate.duration,
    };

    this.tracks = this.tracks.map((el) => (el.id === id ? updatedTrack : el));
    return updatedTrack;
  }

  remove(id: string) {
    const isSuccess = !!this.tracks.find((track) => track.id === id);
    if (isSuccess) this.tracks = this.tracks.filter((el) => el.id !== id);
    return isSuccess;
  }

  deleteArtist(artistId: string) {
    this.tracks.forEach((el) => {
      if (el.artistId === artistId) {
        el.artistId = null;
      }
    });
  }

  deleteAlbum(albumId: string) {
    this.tracks.forEach((el) => {
      if (el.albumId === albumId) {
        el.albumId = null;
      }
    });
  }
}
