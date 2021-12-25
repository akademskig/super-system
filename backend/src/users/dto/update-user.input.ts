import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean)
  isVerified: boolean;

  @IsEmail()
  @Field(() => String)
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
