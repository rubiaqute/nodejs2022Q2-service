import { Album } from './entities/Album';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { Artist } from './entities/Artist';
import { Track } from './entities/Track';
import { User } from './entities/User';
import { Favourite } from './entities/Favourites';

dotenv.config({
  path: path.join(__dirname, '.env'),
});

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: +process.env.DB_PORT,
  logging: true,
  entities: [Album, Track, Artist, User, Favourite],
  host: 'localhost',
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
  username: `${process.env.DB_USERNAME}`,
  synchronize: false,
  // entities: [User, Album, Artist, Favourite, Track],
  subscribers: [],
  migrations: [`./migrations/*.ts`],
  migrationsRun: true,
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
