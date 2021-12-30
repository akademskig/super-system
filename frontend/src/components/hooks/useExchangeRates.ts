import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { GET_EXCHANGE_RATE } from '../../apollo/api/currencies'

const useExchangeRates = (
  currency?: string,
  baseCurrency?: string,
  price?: number
) => {
  const { data } = useQuery(GET_EXCHANGE_RATE, {
    variables: { getExchangeRateInput: { from: baseCurrency, to: currency } },
    skip: !currency || !baseCurrency,
  })

  const exchangePrice = useMemo(() => {
    const exPrice = (price || 0) * data?.exchangeRate || 0
    return exPrice
  }, [data?.exchangeRate, price])

  return {
    exchangeRate: data?.exchangeRate,
    exchangePrice,
  }
}
export default useExchangeRates
