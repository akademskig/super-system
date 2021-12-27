import { gql } from '@apollo/client'

const AUTH_FRAGMENT = gql`
  fragment AuthFragment on Auth {
    user {
      username
    }
    accessToken
  }
`
const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    username
  }
`
export const SIGN_IN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      ...AuthFragment
    }
  }
  ${AUTH_FRAGMENT}
`
export const REGISTER = gql`
  mutation register($input: RegisterInput!) {
    register(registerInput: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
