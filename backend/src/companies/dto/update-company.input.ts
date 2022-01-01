import { CreateCompanyInput } from './create-company.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import {
  ClientsInput,
  InvoiceSettings,
  InvoiceSettingsInput,
} from '../entities/company.entity';

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
  @Field(() => String)
  id: string;
  @Field(() => InvoiceSettingsInput, { nullable: true })
  invoiceSettings: InvoiceSettings;
  @Field(() => [String], { nullable: true })
  clientIds: string[];
}
