import { useMemo } from 'react'
import {
  FaHamburger,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAstronaut,
  FaUserCog,
} from 'react-icons/fa'
import Button from '../../../common/Button'
import MenuButton from '../../../common/MenuButton'
import useAuth from '../../../hooks/useAuth'
import LocaleControl from '../../../widgets/LocaleControl'
import { useIntl } from 'react-intl'
import styles from './Toolbar.module.scss'
import messages from '../../../../lang/messages.lang'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../../../apollo/api/user'

type Props = {
  onMobileOpen: () => void
  onTabletOpen: () => void
}
const Toolbar = ({ onMobileOpen, onTabletOpen }: Props) => {
  const { logout, isAuth } = useAuth()
  const { data: userData } = useQuery(GET_CURRENT_USER)
  const user = userData?.user

  const { formatMessage } = useIntl()
  const navigate = useNavigate()
  const isAuthOptions = useMemo(
    () => [
      {
        label: formatMessage(messages.userSettings),
        icon: <FaUserCog />,
        action: () => navigate('/user-settings'),
      },
      {
        label: formatMessage(messages.logout),
        icon: <FaSignOutAlt />,
        action: logout,
      },
    ],
    [formatMessage, logout, navigate]
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
