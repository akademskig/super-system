import { gql } from '@apollo/client'

export const INVOICE_FRAGMENT = gql`
  fragment InvoiceFragment on Invoice {
    id
    serviceType
    invoiceNumber
    invoiceType
    paymentMethod
    date
    paymentDeadline
    shipmentDate
    notes
    currency
    price {
      net
      gross
    }
    items {
      description
      unit
      price
      amount
      discount
      tax
    }
    createdAt
    client {
      name
      id
    }
    company {
      name
      id
    }
  }
`
export const GET_INVOICES = gql`
  query findAll {
    invoices {
      ...InvoiceFragment
    }
  }
  ${INVOICE_FRAGMENT}
`
export const CREATE_INVOICE = gql`
  mutation createInvoice($input: CreateInvoiceInput!) {
    createInvoice(createInvoiceInput: $input) {
      ...InvoiceFragment
    }
  }
  ${INVOICE_FRAGMENT}
`
export const UPDATE_INVOICE = gql`
  mutation updateInvoice($input: UpdateInvoiceInput!) {
    updateInvoice(updateInvoiceInput: $input) {
      ...InvoiceFragment
    }
  }
  ${INVOICE_FRAGMENT}
`
export const REMOVE_INVOICE = gql`
  mutation removeInvoice($id: String!) {
    removeInvoice(id: $id) {
      id
    }
  }
`
