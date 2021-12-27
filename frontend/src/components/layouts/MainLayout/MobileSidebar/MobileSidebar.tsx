import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { IoClose } from 'react-icons/io5'

import Button from '../../../common/Button'
import useAuth from '../../../hooks/useAuth'
import sidebarItems from '../Sidebar/sidebarItems'

import styles from './MobileSidebar.module.scss'
import messages from '../../../../lang/messages.lang'

type Props = {
  onClose: () => void
  opened: boolean
}
const MobileSidebar = ({ onClose, opened }: Props) => {
  const { isAuth } = useAuth()
  const { formatMessage } = useIntl()
  const location = useLocation()

  return (
    <div className={classNames(styles.root, { [styles.opened]: opened })}>
      <div className={styles.topBar}>
        <Button link onClick={onClose}>
          <IoClose />
        </Button>
      </div>
      <div className={styles.items}>
        {sidebarItems.map(({ label, Icon, link, key, authOnly }, index) => {
          return (
            ((!isAuth && !authOnly) || isAuth) && (
              <Link key={index} to={link}>
                <Button
                  link
                  onClick={onClose}
                  active={location.pathname === link}
                >
                  <Icon className={styles.icon} />
                  <span>
                    {' '}
                    {formatMessage(messages[key as keyof typeof messages])}
                  </span>
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
