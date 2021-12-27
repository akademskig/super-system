import { Link, useLocation } from 'react-router-dom'
import Button from '../../../common/Button'
import sidebarItems from './sidebarItems'
import styles from './Sidebar.module.scss'
import useAuth from '../../../hooks/useAuth'
import classNames from 'classnames'
import { useIntl } from 'react-intl'
import messages from '../../../../lang/messages.lang'

type Props = {
  opened: boolean
}

const Sidebar = ({ opened }: Props) => {
  const { isAuth } = useAuth()
  const { formatMessage } = useIntl()
  const location = useLocation()
  return (
    <div className={classNames(styles.root, { [styles.opened]: opened })}>
      {sidebarItems.map(({ label, Icon, link, authOnly, key }, index) => {
        return (
          ((!isAuth && !authOnly) || isAuth) && (
            <Link key={index} to={link}>
              <Button link active={location.pathname === link}>
                <Icon className={styles.icon} />
                <span>
                  {formatMessage(messages[key as keyof typeof messages])}
                </span>
              </Button>
            </Link>
          )
        )
      })}
    </div>
  )
}
export default Sidebar
