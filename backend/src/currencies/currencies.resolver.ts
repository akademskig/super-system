import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';
import { GetExchangeRateInput } from './dto/get-exchange-rate.input';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Query(() => [String], { name: 'currencies' })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Query(() => Float, { name: 'exchangeRate' })
  getExchangeRate(
    @Args('getExchangeRateInput', { type: () => GetExchangeRateInput })
    getExchangeRateInput: GetExchangeRateInput,
  ) {
    return this.currenciesService.getExchangeRate(getExchangeRateInput);
  }

  @Mutation(() => Currency)
  removeCurrency(@Args('id', { type: () => Int }) id: number) {
    return this.currenciesService.remove(id);
  }
}
