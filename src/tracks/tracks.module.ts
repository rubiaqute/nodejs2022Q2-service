import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [DatabaseModule],
  exports: [TracksService],
})
export class TracksModule {}
