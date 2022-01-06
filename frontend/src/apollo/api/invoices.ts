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
      tax
      exchange {
        net
        gross
        tax
      }
    }
    items {
      description
      unit
      price
      amount
      discount
      tax
      total {
        net
        gross
        tax
        exchange {
          net
          gross
          tax
        }
      }
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
export const GET_NEXT_INVOICE_NUMBER = gql`
  query getNextInvoiceNumber($companyId: String!) {
    invoiceNumber(companyId: $companyId)
  }
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
export const GET_PDF = gql`
  mutation getPdf($id: String!) {
    getPdf(id: $id)
  }
`
