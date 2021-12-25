import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => User, { description: '' })
  user: User;

  @Field(() => String, { description: '' })
  accessToken: string;
}
