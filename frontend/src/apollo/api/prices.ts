import { gql } from '@apollo/client'

export const CALCULATE_PRICE = gql`
  query calculatePrice($invoice: CalculatePriceInput!) {
    price(invoice: $invoice) {
      net
      gross
    }
  }
`
