import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Price {
  @Field(() => Float, { defaultValue: 0 })
  net: number;
  @Field(() => Float, { defaultValue: 0 })
  gross: number;
  @Field(() => Float, { defaultValue: 0 })
  tax: number;
}
