import { ApolloError } from '@apollo/client'

const getErrorMessage = (error?: ApolloError) => {
  if (error?.graphQLErrors) {
    return error.graphQLErrors.map((error) => error.message)
  }
  return []
}
export default getErrorMessage