import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export default class VerificationToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  constructor(data) {
    if (!data) {
      return this;
    }
    const { token, duration, user } = data;
    this.token = token;
    this.duration = duration;
    this.user = user;
  }
}
