import { gql } from '@apollo/client'
import { USER_FRAGMENT } from './user'

const AUTH_FRAGMENT = gql`
  fragment AuthFragment on Auth {
    user {
      username
    }
    accessToken
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
