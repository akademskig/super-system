import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    fullName
    password
    email
  }
`
export const GET_CURRENT_USER = gql`
  query getCurrent {
    user {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
