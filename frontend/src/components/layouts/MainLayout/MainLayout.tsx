import { PropsWithChildren } from "react"
import Sidebar from "../Sidebar"
import Toolbar from "./Toolbar"
import styles from './MainLayout.module.scss'

const MainLayout = ({ children }: PropsWithChildren<any>) => {
  return (
    <div>
      <Toolbar />
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  )
}

export default MainLayout
