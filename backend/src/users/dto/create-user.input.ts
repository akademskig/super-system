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
}
