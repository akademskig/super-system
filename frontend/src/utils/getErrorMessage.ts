import { ApolloError } from '@apollo/client'

const getErrorMessage = (apolloError: ApolloError) => {
  if (apolloError?.graphQLErrors) {
    return apolloError?.graphQLErrors.map((error) => error.message)
  }
  return []
}
export default getErrorMessage
