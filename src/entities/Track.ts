import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Album } from './Album';
import { Artist } from './Artist';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @OneToOne((type) => Artist, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  artist: Artist;

  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @OneToOne((type) => Album, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  album: Album;

  @Column('int')
  duration: number;
}
