import { InputType, Field } from '@nestjs/graphql';
import { InvoiceTypes } from '../entities/invoice.entity';
import { Timestamp } from 'typeorm';
import { InvoiceItemInput } from './invoice-item.input';
import { InvoiceItem } from '../entities/invoice-item.entity';
import { PriceInput } from './price.input';
import { Price } from '../entities/price.entity';

@InputType()
export class CreateInvoiceInput {
  @Field(() => String)
  serviceType: string;

  @Field(() => String)
  invoiceNumber: string;

  @Field(() => String)
  currency: string;

  @Field(() => String)
  paymentMethod: string;

  @Field(() => InvoiceTypes)
  invoiceType: InvoiceTypes;

  @Field(() => String)
  client: string;

  @Field(() => String)
  company: string;

  @Field(() => String, { nullable: true })
  notes: string;

  @Field(() => String, { nullable: true })
  iban: string;

  @Field(() => Date)
  date: Timestamp;

  @Field(() => Date)
  paymentDeadline: Timestamp;

  @Field(() => Date)
  shipmentDate: Timestamp;

  @Field(() => [InvoiceItemInput])
  items: InvoiceItem[];

  @Field(() => PriceInput)
  price: Price;
}
