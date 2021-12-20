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

import styles from './Toolbar.module.scss'

type Props = {
  onMobileOpen: () => void
  onTabletOpen: () => void
}
const Toolbar = ({ onMobileOpen, onTabletOpen }: Props) => {
  const { logout, isAuth, user } = useAuth()

  const isAuthOptions = useMemo(
    () => [
      {
        label: 'Logout',
        icon: <FaSignOutAlt />,
        action: logout,
      },
    ],
    [logout]
  )

  const notAuthOptions = useMemo(
    () => [
      {
        label: 'Sign In',
        icon: <FaSignInAlt />,
        link: '/auth#signIn',
      },
    ],
    []
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
