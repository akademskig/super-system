import { InputType, Field } from '@nestjs/graphql';
import {
  InvoiceItem,
  InvoiceItemInput,
  InvoiceTypes,
} from '../entities/invoice.entity';
import { Timestamp } from 'typeorm';

@InputType()
export class CreateInvoiceInput {
  @Field(() => String)
  serviceType: string;

  @Field(() => String)
  invoiceNumber: string;

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

  @Field(() => Date)
  date: Timestamp;

  @Field(() => Date)
  paymentDeadline: Timestamp;

  @Field(() => Date)
  shipmentDate: Timestamp;

  @Field(() => [InvoiceItemInput])
  items: InvoiceItem[];
}
