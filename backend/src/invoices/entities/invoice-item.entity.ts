import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvoiceItem {
  @Field(() => String)
  description: string;
  @Field(() => String)
  unit: string;
  @Field(() => Float)
  price: number;
  @Field(() => Float)
  discount: number;
  @Field(() => Float)
  tax: number;
  @Field(() => Float)
  amount: number;
}
