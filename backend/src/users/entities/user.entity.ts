import {
  ObjectType,
  Field,
  registerEnumType,
  InputType,
} from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

enum UserRoles {
  ADMIN = 'admin',
  OWNER = 'owner',
  REGULAR = 'regular',
}
registerEnumType(UserRoles, {
  name: 'UserRoles',
});

@Entity()
@ObjectType()
export class User {
  @Field(() => String, { description: '' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: '' })
  @Column({ length: 500 })
  username: string;

  @Field(() => String, { description: '' })
  @Length(8)
  @Column('text')
  password: string;

  @Field(() => String, { description: '' })
  @IsEmail()
  @Column({ type: 'text', unique: true })
  email: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  @Column({ type: 'text', nullable: true })
  fullName: string;

  @Field(() => UserRoles)
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.REGULAR,
  })
  role: UserRoles;

  @Field(() => String, { description: '' })
  @Column({ type: 'text', nullable: true })
  company: string;

  @Field(() => Boolean, { description: '' })
  @Column({ type: Boolean, default: false })
  isVerified: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Timestamp;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Timestamp;
}
