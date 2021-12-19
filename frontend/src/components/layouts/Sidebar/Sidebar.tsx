import { Link } from "react-router-dom"
import Button from "../../common/Button"
import sidebarItems from "./sidebarItems"
import styles from "./Sidebar.module.scss"
import useAuth from "../../hooks/useAuth"

const Sidebar = () => {
  const { isAuth } = useAuth()
  return (
    <div className={styles.root}>
      {sidebarItems.map(({ label, Icon, link, authOnly }, index) => {
        return (
          ((!isAuth && !authOnly) || isAuth) && (
            <Link key={index} to={link}>
              <Button link>
                <Icon />
                <span>{label}</span>
              </Button>
            </Link>
          )
        )
      })}
    </div>
  )
}
export default Sidebar
