import { gql } from '@apollo/client'

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    name
    street
    city
    zipCode
  }
`
export const GET_CLIENTS = gql`
  query findAll {
    clients {
      ...ClientFragment
    }
  }
  ${CLIENT_FRAGMENT}
`
export const CREATE_CLIENT = gql`
  mutation createClient($input: CreateClientInput!) {
    createClient(createClientInput: $input) {
      ...ClientFragment
    }
  }
  ${CLIENT_FRAGMENT}
`
export const REMOVE_CLIENT = gql`
  mutation removeClient($id: String!) {
    removeClient(id: $id) {
      id
    }
  }
`
