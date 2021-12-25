import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: '' })
  username: string;

  @Field(() => String, { description: '' })
  password: string;

  @IsEmail()
  @Field(() => String, { description: '' })
  email: string;

  constructor(userData: Partial<CreateUserInput>) {
    if (!userData) {
      return this;
    }
    const { username, password, email } = userData;
    if (username) this.username = username;
    if (password) this.password = password;
    if (email) this.email = email;
  }
}
