import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Album } from './Album';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'boolean', nullable: true })
  grammy: boolean;
}
