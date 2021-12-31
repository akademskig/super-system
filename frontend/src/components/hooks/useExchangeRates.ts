import { useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { GET_EXCHANGE_RATE } from '../../apollo/api/currencies'

const useExchangeRates = (
  currency?: string,
  baseCurrency?: string,
  price?: number
) => {
  const client = useApolloClient()
  const { data } = useQuery(GET_EXCHANGE_RATE, {
    variables: { getExchangeRateInput: { from: baseCurrency, to: currency } },
    skip: !currency || !baseCurrency,
  })

  const exchangePrice = useMemo(() => {
    const exPrice = (price || 0) * data?.exchangeRate || 0
    return exPrice
  }, [data?.exchangeRate, price])

  const getExchangeRate = useCallback(
    async ({ currency, baseCurrency }) => {
      const { data } = await client.query({
        query: GET_EXCHANGE_RATE,
        variables: {
          getExchangeRateInput: { from: baseCurrency, to: currency },
        },
      })
      return data?.exchangeRate
    },
    [client]
  )
  return {
    exchangeRate: data?.exchangeRate,
    exchangePrice,
    getExchangeRate,
  }
}
export default useExchangeRates
