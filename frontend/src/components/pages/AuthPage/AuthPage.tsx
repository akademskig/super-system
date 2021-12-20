import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Tabs from '../../common/Tabs/Tabs'
import LoginForm from '../../forms/LoginForm'
import RegisterForm from '../../forms/RegisterForm'
import styles from './AuthPage.module.scss'

const AuthPage = () => {
  const location = useLocation()

  const tabs = useMemo(() => {
    return [
      {
        label: 'Sign in',
        content: <LoginForm />,
        active: location.hash === '#signIn',
      },
      {
        label: 'Register',
        content: <RegisterForm />,
        active: location.hash === '#register',
      },
    ]
  }, [location.hash])

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} />
    </div>
  )
}
export default AuthPage
