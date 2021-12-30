import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class InvoiceItemInput {
  @Field(() => String)
  description: string;
  @Field(() => String)
  unit: string;
  @Field(() => Float)
  price: number;
  @Field(() => Float)
  discount: string;
  @Field(() => Float)
  tax: number;
  @Field(() => Float)
  amount: number;
}
