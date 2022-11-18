import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [DatabaseModule],
})
export class FavouritesModule {}
