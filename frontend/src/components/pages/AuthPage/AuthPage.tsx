import { useMemo } from "react";
import Tabs from "../../common/Tabs/Tabs";
import LoginForm from "../../forms/LoginForm";
import RegisterForm from "../../forms/RegisterForm";
import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const tabs = useMemo(() => {
    return [
      {
        label: "Login",
        content: <LoginForm />,
      },
      {
        label: "Register",
        content: <RegisterForm />,
      },
    ];
  }, []);

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} />
    </div>
  );
};
export default AuthPage;
