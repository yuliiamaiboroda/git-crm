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
  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @ApiProperty()
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Column({ name: 'owner_name', nullable: false })
  ownerName: string;

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
    type: 'timestamp',
    transformer: {
      to: (value: Date | undefined) => value || new Date(),
      from: (value: Date) => Math.floor(value.getTime() / 1000),
    },
  })
  createdDate: number;

  @UpdateDateColumn({
    name: 'updated_date',
    type: 'timestamp',
    transformer: {
      to: (value: Date | undefined) => value || new Date(),
      from: (value: Date) => Math.floor(value.getTime() / 1000),
    },
  })
  updatedDate: number;
}
