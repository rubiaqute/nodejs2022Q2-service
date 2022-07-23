import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('int')
  year: number;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;
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
