import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Favourite } from 'src/entities/Favourites';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Favourite]),
    AlbumsModule,
    TracksModule,
    ArtistsModule,
  ],
})
export class FavouritesModule {}
