import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Price } from '../entities/price.entity';
import { PriceInput } from './price.input';

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
  @Field(() => PriceInput, { nullable: true })
  total: Price;
}
