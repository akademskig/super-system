import { ApolloError } from '@apollo/client'

const getErrorMessage = (apolloError: ApolloError) => {
  if (apolloError?.graphQLErrors.length) {
    return apolloError?.graphQLErrors.map((error) => error.message)
  } else if (apolloError.networkError) {
    return [apolloError.networkError.message]
  }
  return []
}
export default getErrorMessage
