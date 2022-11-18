import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Album } from 'src/entities/Album';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [TypeOrmModule.forFeature([Album])],
  exports: [AlbumsService],
})
export class AlbumsModule {}
