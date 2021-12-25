import { ObjectType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity()
@ObjectType()
export class Client {
  @Field(() => String, { description: '' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field(() => String, { nullable: false })
  @Column({ type: 'text', unique: true })
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

  @Field(() => String, { nullable: false })
  @Column({ type: 'text' })
  vatId: string;

  @Field(() => String)
  @MaxLength(10)
  @Column({ type: 'text' })
  zipCode: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Timestamp;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
