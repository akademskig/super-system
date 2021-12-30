import { useQuery } from '@apollo/client'
import { GET_EXCHANGE_RATE } from '../../apollo/api/currencies'

const useExchangeRates = (currency?: string, price?: number) => {
  const { data } = useQuery(GET_EXCHANGE_RATE, {
    variables: { currency },
    skip: !currency,
  })
  return {
    exchangeRate: data?.exchangeRate,
    exchangePrice: '',
  }
}
export default useExchangeRates
