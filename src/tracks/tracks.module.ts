import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/entities/Track';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [TypeOrmModule.forFeature([Track])],
  exports: [TracksService],
})
export class TracksModule {}
