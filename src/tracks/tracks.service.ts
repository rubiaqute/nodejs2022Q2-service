import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { Track as TrackBase } from './../entities/Track';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackBase)
    private tracksRepository: Repository<TrackBase>,
  ) {}

  tracksF: string[] = [];

  addToF(id: string) {
    this.tracksF.push(id);
  }

  isInF(id: string) {
    return this.tracksF.filter((el) => el === id);
  }

  delFromF(id: string) {
    this.tracksF = this.tracksF.filter((el) => el !== id);
  }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: uuid(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    await this.tracksRepository.save(newTrack);
    return await this.tracksRepository.findOneBy({ id: newTrack.id });
  }

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    return await this.tracksRepository.findOneBy({ id });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackForUpdate = await this.tracksRepository.findOneBy({ id });

    if (!trackForUpdate)
      throw new HttpException(
        'This track does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedTrack = {
      name: updateTrackDto.name || trackForUpdate.name,
      artistId: updateTrackDto.artistId || trackForUpdate.artistId,
      albumId: updateTrackDto.albumId || trackForUpdate.albumId,
      duration: updateTrackDto.duration || trackForUpdate.duration,
    };

    await this.tracksRepository.update(id, updatedTrack);
    return await this.tracksRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const isSuccess = !!(await this.tracksRepository.findOneBy({ id }));
    if (isSuccess) {
      await this.tracksRepository.delete(id);
      this.delFromF(id);
    }
    return isSuccess;
  }
}
