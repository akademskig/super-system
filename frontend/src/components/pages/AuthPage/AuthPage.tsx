import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Tabs from '../../common/Tabs/Tabs'
import LoginForm from '../../forms/LoginForm'
import RegisterForm from '../../forms/RegisterForm'
import styles from './AuthPage.module.scss'
import { useIntl } from 'react-intl'
import messages from '../../../lang/messages.lang'

const AuthPage = () => {
  const location = useLocation()
  const { formatMessage } = useIntl()

  const tabs = useMemo(() => {
    return [
      {
        label: formatMessage(messages.signIn),
        content: <LoginForm />,
        active: location.hash === '#signIn',
      },
      {
        label: formatMessage(messages.register),
        content: <RegisterForm />,
        active: location.hash === '#register',
      },
    ]
  }, [formatMessage, location.hash])

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} />
    </div>
  )
}
export default AuthPage
