import classNames from 'classnames'
import { FaRegWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from '../../../common/Button'
import useAuth from '../../../hooks/useAuth'
import sidebarItems from '../Sidebar/sidebarItems'
import styles from './MobileSidebar.module.scss'

type Props = {
  onClose: () => void
  opened: boolean
}
const MobileSidebar = ({ onClose, opened }: Props) => {
  const { isAuth } = useAuth()
  return (
    <div className={classNames(styles.root, { [styles.opened]: opened })}>
      <div className={styles.topBar}>
        <Button link onClick={onClose}>
          <FaRegWindowClose />
        </Button>
      </div>
      <div className={styles.items}>
        {sidebarItems.map(({ label, Icon, link, authOnly }, index) => {
          return (
            ((!isAuth && !authOnly) || isAuth) && (
              <Link key={index} to={link}>
                <Button link onClick={onClose}>
                  <Icon />
                  <span>{label}</span>
                </Button>
              </Link>
            )
          )
        })}
      </div>
    </div>
  )
}
export default MobileSidebar
