import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import Cookies from 'js-cookie'
import { getToken } from '../components/providers/AuthProvider/Auth.provider'
import { LOCALE_KEY } from '../components/providers/LocaleProvider/LocaleProvider'

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
const cookieMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'locale-cookie': Cookies.get(LOCALE_KEY),
    },
  }))

  return forward(operation)
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, cookieMiddleware, httpLink]),
})

export default client
