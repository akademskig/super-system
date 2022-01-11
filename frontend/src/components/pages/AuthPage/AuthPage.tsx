import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Tabs from '../../common/Tabs/Tabs'
import LoginForm from '../../forms/LoginForm'
import RegisterForm from '../../forms/RegisterForm'
import styles from './AuthPage.module.scss'
import { useIntl } from 'react-intl'
import messages from '../../../lang/messages.lang'
import { toast } from 'react-toastify'

const AuthPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { formatMessage } = useIntl()

  useEffect(() => {
    if (location.hash === '#tokenExpired') {
      toast.error('Token expired')
      navigate('')
    }
  }, [location.hash, navigate])

  const tabs = useMemo(() => {
    return [
      {
        label: formatMessage(messages.signIn),
        content: <LoginForm />,
        hash: '#signIn',
        active: location.hash === '#signIn',
      },
      {
        label: formatMessage(messages.register),
        content: <RegisterForm />,
        hash: '#register',
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
