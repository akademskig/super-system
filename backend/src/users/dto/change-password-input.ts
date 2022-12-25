import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field(() => String, { description: '' })
  oldPassword: string;

  @Field(() => String, { description: '' })
  newPassword: string;
}
