import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/entities/Track';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DatabaseModule, TypeOrmModule.forFeature([Track])],
  exports: [TracksService],
})
export class TracksModule {}
