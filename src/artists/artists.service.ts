import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { Artist as ArtistBase } from './../entities/Artist';
import { v4 as uuid } from 'uuid';
import { DatabaseService } from 'src/database/database.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistBase)
    private artistsRepository: Repository<ArtistBase>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new ArtistBase();
    newArtist.id = uuid();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;
    await this.artistsRepository.save(newArtist);
    return newArtist;
  }

  async findAll(): Promise<ArtistBase[]> {
    return await this.artistsRepository.find();
  }

  async findOne(id: string): Promise<ArtistBase> {
    return await this.artistsRepository.findOneBy({ id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistForUpdate = await this.artistsRepository.findOneBy({ id });

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
    await this.artistsRepository.save(updatedArtist);
    return updatedArtist;
  }

  async remove(id: string) {
    const isSuccess = !!(await this.artistsRepository.findOneBy({ id }));
    if (isSuccess) {
      this.artistsRepository.delete(id);
    }
    return isSuccess;
  }
}
