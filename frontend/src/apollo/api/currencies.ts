import { gql } from '@apollo/client'

export const GET_CURRENCIES = gql`
  query findAll {
    currencies
  }
`
export const GET_EXCHANGE_RATE = gql`
  query getExchangeRate($getExchangeRateInput: GetExchangeRateInput!) {
    exchangeRate(getExchangeRateInput: $getExchangeRateInput)
  }
`
