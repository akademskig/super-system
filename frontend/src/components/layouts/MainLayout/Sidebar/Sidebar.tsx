import { Link } from 'react-router-dom'
import Button from '../../../common/Button'
import sidebarItems from './sidebarItems'
import styles from './Sidebar.module.scss'
import useAuth from '../../../hooks/useAuth'
import classNames from 'classnames'

type Props = {
  opened: boolean
}

const Sidebar = ({ opened }: Props) => {
  const { isAuth } = useAuth()
  return (
    <div className={classNames(styles.root, { [styles.opened]: opened })}>
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
