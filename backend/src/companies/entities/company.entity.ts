import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity()
@Unique(['name', 'user', 'vatId', 'email'])
export class Company {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  name: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  city: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  country: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  street: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @Column({ type: 'text', nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @IsPhoneNumber()
  @Column({ type: 'text', nullable: true })
  phoneNumber: string;

  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  vatId: string;

  @Field(() => String)
  @MaxLength(10)
  @Column({ type: 'text' })
  zipCode: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Timestamp;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Timestamp;
}