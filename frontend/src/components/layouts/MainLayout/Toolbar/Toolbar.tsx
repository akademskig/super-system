import { useMemo } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUserAstronaut } from "react-icons/fa";
import MenuButton from "../../../common/MenuButton";
import useAuth from "../../../hooks/useAuth";

import styles from "./Toolbar.module.scss";

const Toolbar = () => {
  const { logout, isAuth, user } = useAuth();

  const isAuthOptions = useMemo(
    () => [
      {
        label: "Logout",
        icon: <FaSignOutAlt />,
        action: logout,
      },
    ],
    [logout]
  );

  const notAuthOptions = useMemo(
    () => [
      {
        label: "Login",
        icon: <FaSignInAlt />,
        link: "/login",
      },
    ],
    []
  );

  return (
    <div className={styles.root}>
      {isAuth ? (
        <MenuButton options={isAuthOptions}>
          <FaUserAstronaut />
          {user?.username}
        </MenuButton>
      ) : (
        <MenuButton options={notAuthOptions}>
          <FaUserAstronaut />
        </MenuButton>
      )}
    </div>
  );
};

export default Toolbar;
