import { useMemo } from "react"
import { FaSignInAlt, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa"
import MenuButton from "../../../common/MenuButton"
import useAuth from "../../../hooks/useAuth"

import styles from "./Toolbar.module.scss"

const Toolbar = () => {
  const { logout, isAuth, user } = useAuth()

  const isAuthOptions = useMemo(
    () => [
      {
        label: "Logout",
        icon: <FaSignOutAlt />,
        action: logout,
      },
    ],
    [logout]
  )

  const notAuthOptions = useMemo(
    () => [
      {
        label: "Sign In",
        icon: <FaSignInAlt />,
        link: "/auth#signIn",
      },
    ],
    []
  )

  return (
    <div className={styles.root}>
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
  )
}

export default Toolbar
