import { gql } from '@apollo/client'

export const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    name
    street
    city
    zipCode
    vatId
    country
  }
`
export const GET_CLIENTS = gql`
  query findAll($query: GetClientsInput) {
    clients(query: $query) {
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
export const UPDATE_CLIENT = gql`
  mutation updateClient($input: UpdateClientInput!) {
    updateClient(updateClientInput: $input) {
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
