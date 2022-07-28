import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Album } from './Album';
import { Artist } from './Artist';
import { Track } from './Track';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Artist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'artists_favourite',
    joinColumn: {
      name: 'fav',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'artists',
      referencedColumnName: 'id',
    },
  })
  artists: Artist[];

  @ManyToMany(() => Album, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'albums_favourite',
    joinColumn: {
      name: 'fav',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'albums',
      referencedColumnName: 'id',
    },
  })
  albums: Album[];

  @ManyToMany(() => Track, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'tracks_favourite',
    joinColumn: {
      name: 'fav',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tracks',
      referencedColumnName: 'id',
    },
  })
  tracks: Track[];
}
