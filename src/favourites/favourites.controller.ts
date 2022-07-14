import { Controller, Get } from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }
}
