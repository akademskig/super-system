import { gql } from '@apollo/client'

export const CALCULATE_PRICE = gql`
  query calculatePrice($invoice: CalculatePriceInput!) {
    price(invoice: $invoice) {
      net
      gross
      tax
    }
  }
`
export const CALCULATE_ITEM_TOTAL = gql`
  query calculateItemTotal($invoiceItem: InvoiceItemInput!) {
    total(invoiceItem: $invoiceItem) {
      net
      gross
      tax
    }
  }
`
