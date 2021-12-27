import { InputType, Field } from '@nestjs/graphql';

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
}
