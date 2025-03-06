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

  @Column({ name: 'name', nullable: true })
  name?: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'email', unique: true, nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

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
