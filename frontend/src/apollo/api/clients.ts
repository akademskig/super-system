import { gql } from '@apollo/client'

const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
  }
`
export const GET_CLIENTS = gql`
  query getClients {
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
