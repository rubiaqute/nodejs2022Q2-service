import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('uuid')
  artistId: string | null;

  @Column('uuid')
  albumId: string | null;

  @Column()
  duration: number;
}
