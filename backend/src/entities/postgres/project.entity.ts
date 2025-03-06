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
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'owner_id', nullable: false })
  ownerId: number;

  @ApiProperty()
  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @ApiProperty()
  @Column({ name: 'name', nullable: false })
  name: string;

  @ApiProperty()
  @Column({ name: 'url', nullable: false, default: '' })
  url: string;

  @ApiProperty()
  @Column({ name: 'stars', nullable: false, default: 0 })
  stars: number;

  @ApiProperty()
  @Column({ name: 'forks', nullable: false, default: 0 })
  forks: number;

  @ApiProperty()
  @Column({ name: 'issues', nullable: false, default: 0 })
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
