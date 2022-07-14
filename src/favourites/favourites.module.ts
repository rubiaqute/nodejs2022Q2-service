import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [TracksModule, AlbumsModule, ArtistsModule],
})
export class FavouritesModule {}
