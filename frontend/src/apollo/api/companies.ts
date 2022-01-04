import { gql } from '@apollo/client'

export const COMPANY_FRAGMENT = gql`
  fragment CompanyFragment on Company {
    id
    name
    street
    city
    zipCode
    vatId
    country
    email
    logoUrl
    clients {
      id
      name
    }
    phoneNumber
    invoiceSettings {
      serviceTypes
      paymentMethods
      baseCurrency
      notes
      units
    }
  }
`
export const GET_COMPANY = gql`
  query findOne($id: String!) {
    company(id: $id) {
      ...CompanyFragment
    }
  }
  ${COMPANY_FRAGMENT}
`
export const GET_COMPANIES = gql`
  query findAll {
    companies {
      ...CompanyFragment
    }
  }
  ${COMPANY_FRAGMENT}
`
export const CREATE_COMPANY = gql`
  mutation createCompany($input: CreateCompanyInput!) {
    createCompany(createCompanyInput: $input) {
      ...CompanyFragment
    }
  }
  ${COMPANY_FRAGMENT}
`
export const UPDATE_COMPANY = gql`
  mutation updateCompany($input: UpdateCompanyInput!) {
    updateCompany(updateCompanyInput: $input) {
      ...CompanyFragment
    }
  }
  ${COMPANY_FRAGMENT}
`
export const REMOVE_COMPANY = gql`
  mutation removeCompany($id: String!) {
    removeCompany(id: $id) {
      id
    }
  }
`
export const UPLOAD_LOGO = gql`
  mutation ($file: Upload!, $id: String!) {
    uploadLogo(file: $file, id: $id) {
      ...CompanyFragment
    }
  }
  ${COMPANY_FRAGMENT}
`
