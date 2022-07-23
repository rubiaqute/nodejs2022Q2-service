import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { Album as AlbumBase } from 'src/entities/Album';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumBase)
    private albumsRepository: Repository<AlbumBase>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new AlbumBase();
    newAlbum.id = uuid();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId;

    await this.albumsRepository.save(newAlbum);
    return await this.albumsRepository.findOneBy({ id: newAlbum.id });
  }

  async findAll(): Promise<AlbumBase[]> {
    return await this.albumsRepository.find();
  }

  async findOne(id: string): Promise<AlbumBase> {
    return await this.albumsRepository.findOneBy({ id });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumForUpdate = await this.albumsRepository.findOneBy({ id });

    if (!albumForUpdate)
      throw new HttpException(
        'This album does not exist',
        HttpStatus.NOT_FOUND,
      );
    const updatedAlbum = {
      name: updateAlbumDto.name || albumForUpdate.name,
      year: updateAlbumDto.year || albumForUpdate.year,
      artistId: updateAlbumDto.artistId || albumForUpdate.artistId,
    };

    await this.albumsRepository.update(id, updatedAlbum);
    return await this.albumsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const isSuccess = !!(await this.albumsRepository.findOneBy({ id }));
    if (isSuccess) {
      await this.albumsRepository.delete(id);
    }
    return isSuccess;
  }
}
