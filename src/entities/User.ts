import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  login: string;

  @Column({ type: 'text' })
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      from(value) {
        return +value;
      },
      to(value) {
        return value;
      },
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      from(value) {
        return +value;
      },
      to(value) {
        return value;
      },
    },
  })
  updatedAt: number;
}
// export default interface User {
//     id: string; // uuid v4
//     login: string;
//     password: string;
//     version: number; // integer number, increments on update
//     createdAt: number; // timestamp of creation
//     updatedAt: number; // timestamp of last update
// }
