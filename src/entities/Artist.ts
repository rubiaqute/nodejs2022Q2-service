import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column({ type: 'boolean', nullable: true })
  grammy: boolean;
}
