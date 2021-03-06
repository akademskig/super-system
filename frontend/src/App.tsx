import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import AuthProvider from './components/providers/AuthProvider'
import { MainRoutes } from './routes'
import TranslationsProvider from './components/providers/LocaleProvider/LocaleProvider'
import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'

function App() {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <TranslationsProvider>
            <AuthProvider>
              <MainRoutes />
            </AuthProvider>
          </TranslationsProvider>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
