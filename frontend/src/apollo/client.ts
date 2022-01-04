import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { getToken } from '../components/providers/AuthProvider/Auth.provider'

const httpLink = createUploadLink({ uri: 'http://localhost:4001/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`,
    },
  }))

  return forward(operation)
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
})

export default client
