import { useMemo } from 'react'
import {
  FaHamburger,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAstronaut,
} from 'react-icons/fa'
import Button from '../../../common/Button'
import MenuButton from '../../../common/MenuButton'
import useAuth from '../../../hooks/useAuth'
import LocaleControl from '../../../widgets/LocaleControl'
import { useIntl } from 'react-intl'
import styles from './Toolbar.module.scss'
import messages from '../../../../lang/messages.lang'

type Props = {
  onMobileOpen: () => void
  onTabletOpen: () => void
}
const Toolbar = ({ onMobileOpen, onTabletOpen }: Props) => {
  const { logout, isAuth, user } = useAuth()
  const { formatMessage } = useIntl()
  const isAuthOptions = useMemo(
    () => [
      {
        label: formatMessage(messages.logout),
        icon: <FaSignOutAlt />,
        action: logout,
      },
    ],
    [formatMessage, logout]
  )

  const notAuthOptions = useMemo(
    () => [
      {
        label: formatMessage(messages.signIn),
        icon: <FaSignInAlt />,
        link: '/auth#signIn',
      },
    ],
    [formatMessage]
  )

  return (
    <div className={styles.root}>
      <div>
        <Button
          className={styles.hamburgerButtonMobile}
          link
          onClick={onMobileOpen}
        >
          <FaHamburger />
        </Button>
        <Button
          className={styles.hamburgerButtonTablet}
          link
          onClick={onTabletOpen}
        >
          <FaHamburger />
        </Button>
      </div>
      <div className={styles.menuItems}>
        <LocaleControl />
        {isAuth ? (
          <MenuButton options={isAuthOptions}>
            <FaUserAstronaut />
            <span>{user?.username}</span>
          </MenuButton>
        ) : (
          <MenuButton options={notAuthOptions}>
            <FaUserAstronaut />
          </MenuButton>
        )}
      </div>
    </div>
  )
}

export default Toolbar
