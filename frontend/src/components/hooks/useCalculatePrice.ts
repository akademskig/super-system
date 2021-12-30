import { useApolloClient } from '@apollo/client'
import { useCallback } from 'react'
import { CALCULATE_PRICE } from '../../apollo/api/prices'
import { InvoiceItems } from '../../types/invoices.type'

const useCalculatePrice = () => {
  const client = useApolloClient()
  const parseItems = useCallback((items) => {
    if (!items) {
      return null
    }
    return items?.map((item: InvoiceItems) => ({
      ...item,
      price: Number(item.price),
      amount: Number(item.amount),
      discount: Number(item.discount),
      tax: Number(item.tax),
    }))
  }, [])

  const calculatePrice = useCallback(
    async (items) => {
      const parsedItems = parseItems(items)
      if (!parsedItems) {
        return 0
      }
      const { data } = await client.query({
        query: CALCULATE_PRICE,
        variables: { invoice: { items: parsedItems } },
      })
      if (data?.price) {
        return data?.price
      }
    },
    [client, parseItems]
  )
  return {
    calculatePrice,
  }
}
export default useCalculatePrice
