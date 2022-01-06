import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { Price } from '../entities/price.entity';
import { CreateInvoiceInput } from './create-invoice.input';
import { InvoiceItemInput } from './invoice-item.input';

@InputType()
export class CalculatePriceInput {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => [InvoiceItemInput])
  items: InvoiceItem[];
}
@InputType()
export class ExchangePriceInput {
  @Field(() => Float, { defaultValue: 0 })
  net: number;
  @Field(() => Float, { defaultValue: 0 })
  gross: number;
  @Field(() => Float, { defaultValue: 0 })
  tax: number;
}
@InputType()
export class PriceInput {
  @Field(() => Float, { defaultValue: 0 })
  net: number;
  @Field(() => Float, { defaultValue: 0 })
  gross: number;
  @Field(() => Float, { defaultValue: 0 })
  tax: number;
  @Field(() => ExchangePriceInput, { nullable: true })
  exchange: ExchangePriceInput;
}
