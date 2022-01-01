import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetClientsInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  street: string;

  @Field(() => String, { nullable: true })
  vatId: string;

  @Field(() => String, { nullable: true })
  zipCode: string;

  @Field(() => String, { nullable: true })
  companyId: string;
}
