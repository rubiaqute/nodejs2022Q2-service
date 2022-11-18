import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './Artist';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;
  @Column({ type: 'uuid', nullable: true })
  artistId: string;
}

// export interface Track {
//   id: string; // uuid v4
//   name: string;
//   artistId: string | null; // refers to Artist
//   albumId: string | null; // refers to Album
//   duration: number; // integer number
// }
// id: string; // uuid v4
// name: string;
// year: number;
// artistId: string | null; // refers to Artist
