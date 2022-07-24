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

  artistsF: string[] = [];

  addToF(id: string) {
    this.artistsF.push(id);
  }

  isInF(id: string) {
    return this.artistsF.filter((el) => el === id);
  }

  delFromF(id: string) {
    this.artistsF = this.artistsF.filter((el) => el !== id);
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new ArtistBase();
    newArtist.id = uuid();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;
    await this.artistsRepository.save(newArtist);
    return await this.artistsRepository.findOneBy({ id: newArtist.id });
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
      name: updateArtistDto.name || artistForUpdate.name,
      grammy: updateArtistDto.grammy,
    };
    await this.artistsRepository.update(id, updatedArtist);
    return await this.artistsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const isSuccess = !!(await this.artistsRepository.findOneBy({ id }));
    console.log(await this.artistsRepository.findOneBy({ id }));
    if (isSuccess) {
      await this.artistsRepository.delete(id);
      this.delFromF(id);
    }
    return isSuccess;
  }
}
