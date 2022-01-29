import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;

  @IsEmail()
  @Field(() => String, { nullable: true })
  email: string;

  constructor(userData: Partial<UpdateUserInput>) {
    if (!userData) {
      return this;
    }
    const { username, password, email, isVerified } = userData;
    if (username) this.username = username;
    if (password) this.password = password;
    if (email) this.email = email;
    if (isVerified) this.isVerified = isVerified;
  }
}
