import { BrowserRouter } from "react-router-dom"
import styles from "./App.module.scss"
import AuthProvider from "./components/providers/AuthProvider"
import { MainRoutes } from "./routes"

function App() {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <AuthProvider>
          <MainRoutes />
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
