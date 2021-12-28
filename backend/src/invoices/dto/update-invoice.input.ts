import { CreateInvoiceInput } from './create-invoice.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceInput extends PartialType(CreateInvoiceInput) {
  @Field(() => String)
  id: string;
}
