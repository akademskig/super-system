import { ApolloClient, ApolloLink, from, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import Cookies from 'js-cookie'
import {
  getToken,
  removeToken,
} from '../components/providers/AuthProvider/Auth.provider'
import { LOCALE_KEY } from '../components/providers/LocaleProvider/LocaleProvider'
import { onError } from '@apollo/client/link/error'
const httpLink = createUploadLink({ uri: 'http://localhost:4001/graphql' })

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // Apollo Server sets code to UNAUTHENTICATED
          // when an AuthenticationError is thrown in a resolver
          case 'UNAUTHENTICATED':
            removeToken()
            window.location.href = '/auth#tokenExpired'
            // Modify the operation context with a new token
            // const oldHeaders = operation.getContext().headers;
            // operation.setContext({
            //   headers: {
            //     ...oldHeaders,
            //     authorization: removeToken(),
            //   },
            // });
            // Retry the request, returning the new observable
            return forward(operation)
        }
      }
    }

    // To retry on network errors, we recommend the RetryLink
    // instead of the onError link. This just logs the error.
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  }
)
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
  link: from([errorLink, authMiddleware, cookieMiddleware, httpLink]),
})

export default client
