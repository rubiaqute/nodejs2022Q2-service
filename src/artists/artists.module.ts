import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/entities/Artist';
import { DatabaseService } from 'src/database/database.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist])],
  exports: [ArtistsService]
})
export class ArtistsModule {}
