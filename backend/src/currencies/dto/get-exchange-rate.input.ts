import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class GetExchangeRateInput {
  @Field(() => String)
  from: string;
  @Field(() => String)
  to: string;
}
