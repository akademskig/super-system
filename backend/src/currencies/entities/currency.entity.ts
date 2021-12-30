import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
