import React from "react"
import { BrowserRouter } from "react-router-dom"
import styles from "./App.module.scss"
import { MainRoutes } from "./routes"

function App() {
  return (
    <div className={styles.root}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
