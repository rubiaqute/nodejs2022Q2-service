import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/entities/Artist';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DatabaseModule, TypeOrmModule.forFeature([Artist])],
})
export class ArtistsModule {}
