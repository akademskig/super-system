import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { GetExchangeRateInput } from './dto/get-exchange-rate.input';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Mutation(() => Currency)
  createCurrency(
    @Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput,
  ) {
    return this.currenciesService.create(createCurrencyInput);
  }

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
  updateCurrency(
    @Args('updateCurrencyInput') updateCurrencyInput: UpdateCurrencyInput,
  ) {
    return this.currenciesService.update(
      updateCurrencyInput.id,
      updateCurrencyInput,
    );
  }

  @Mutation(() => Currency)
  removeCurrency(@Args('id', { type: () => Int }) id: number) {
    return this.currenciesService.remove(id);
  }
}
