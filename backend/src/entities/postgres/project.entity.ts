import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'owner_id', nullable: false })
  ownerId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'url', nullable: false })
  url: string;

  @Column({ name: 'stars', nullable: false })
  stars: number;

  @Column({ name: 'forks', nullable: false })
  forks: number;

  @Column({ name: 'issues', nullable: false })
  issues: number;

  @CreateDateColumn({
    name: 'created_date',
    transformer: {
      to: (value: Date) => Math.floor(value.getTime() / 1000),
      from: (value: number) => new Date(value * 1000),
    },
  })
  createdDate: number;

  @UpdateDateColumn({
    name: 'updated_date',
    transformer: {
      to: (value: Date) => Math.floor(value.getTime() / 1000),
      from: (value: number) => new Date(value * 1000),
    },
  })
  updatedDate: number;
}
