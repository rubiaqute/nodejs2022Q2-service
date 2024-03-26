import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Album } from './Album';
import { Artist } from './Artist';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  album: string;
  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @Column('int')
  duration: number;
}
