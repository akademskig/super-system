import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { get } from 'env-var';
import { firstValueFrom } from 'rxjs';
import { GetExchangeRateInput } from './dto/get-exchange-rate.input';

const EXCHANGE_RATE_API = get('EXCHANGE_RATE_API').required().asString();
const SUPPORTED_CURRENCY = get('SUPPORTED_CURRENCY').required().asArray();

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return SUPPORTED_CURRENCY;
  }

  async getExchangeRate(getExchangeRateInput: GetExchangeRateInput) {
    const { from, to } = getExchangeRateInput;
    const o = await this.httpService.get(
      `${EXCHANGE_RATE_API}/pair/${to}/${from}`,
    );
    const r = await firstValueFrom(o);
    if (r) {
      return r.data.conversion_rate;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
