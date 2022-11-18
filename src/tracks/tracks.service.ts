import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  constructor(private dataBase: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuid(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    this.dataBase.addTrack(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.dataBase.tracks;
  }

  findOne(id: string) {
    return this.dataBase.tracks.find((track) => track.id === id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackForUpdate = this.dataBase.tracks.find(
      (track) => track.id === id,
    );

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

    this.dataBase.updateTrack(id, updatedTrack);
    return updatedTrack;
  }

  remove(id: string) {
    const isSuccess = !!this.dataBase.tracks.find((track) => track.id === id);
    if (isSuccess) this.dataBase.deleteTrack(id);
    return isSuccess;
  }
}
