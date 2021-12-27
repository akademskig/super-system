import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  city: string;

  @Field(() => String, { nullable: false })
  country: string;

  @Field(() => String, { nullable: false })
  street: string;

  @Field(() => String, { nullable: false })
  vatId: string;

  @Field(() => String)
  zipCode: string;

  @Field(() => String, { description: '' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: '' })
  @IsPhoneNumber()
  phoneNumber: string;
}
