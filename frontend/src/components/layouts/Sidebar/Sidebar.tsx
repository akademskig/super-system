import { Link } from "react-router-dom"
import Button from "../../common/Button"
import sidebarItems from "./sidebarItems"
import styles from "./Sidebar.module.scss"

const Sidebar = () => {
  return (
    <div className={styles.root}>
      {sidebarItems.map(({ label, Icon, link }, index) => {
        return (
          <Link to={link}>
            <Button link>
              <Icon />
              <span>{label}</span>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}
export default Sidebar
