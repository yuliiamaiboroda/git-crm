import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: String })
  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

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
