import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesResolver } from './currencies.resolver';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesResolver', () => {
  let resolver: CurrenciesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesResolver, CurrenciesService],
    }).compile();

    resolver = module.get<CurrenciesResolver>(CurrenciesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
