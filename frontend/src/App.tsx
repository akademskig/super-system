import { BrowserRouter } from 'react-router-dom'
import styles from './App.module.scss'
import AuthProvider from './components/providers/AuthProvider'
import { MainRoutes } from './routes'
import TranslationsProvider from './components/providers/LocaleProvider/LocaleProvider'

function App() {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <TranslationsProvider>
          <AuthProvider>
            <MainRoutes />
          </AuthProvider>
        </TranslationsProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
