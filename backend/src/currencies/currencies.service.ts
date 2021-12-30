import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { get } from 'env-var';
import { firstValueFrom } from 'rxjs';

const EXCHANGE_RATE_API = get('EXCHANGE_RATE_API').required().asString();
const SUPPORTED_CURRENCY = get('SUPPORTED_CURRENCY').required().asArray();

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  findAll() {
    return SUPPORTED_CURRENCY;
  }

  async getExchangeRate(currency: string) {
    console.log(`${EXCHANGE_RATE_API}/pair/${currency}/HRK`);
    const o = await this.httpService.get(
      `${EXCHANGE_RATE_API}/pair/${currency}/HRK`,
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
