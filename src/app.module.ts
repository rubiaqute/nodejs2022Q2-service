import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavouritesModule } from './favourites/favourites.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Album } from './entities/Album';
import { Artist } from './entities/Artist';
import { Track } from './entities/Track';
import { User } from './entities/User';
import { Favourite } from './entities/Favourites';
import { AuthModule } from './authorization/auth.module';

dotenv.config({
  path: path.join(__dirname, '.env'),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavouritesModule,
    DatabaseModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DB_PORT,
      logging: true,
      entities: [Album, Track, Artist, User, Favourite],
      host: 'postgres',
      database: `${process.env.DB_NAME}`,
      password: `${process.env.DB_PASSWORD}`,
      username: `${process.env.DB_USERNAME}`,
      synchronize: false,
      // entities: [User, Album, Artist, Favourite, Track],
      subscribers: [],
      migrations: [`${__dirname}/migrations/*.ts`],
    }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavouritesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
