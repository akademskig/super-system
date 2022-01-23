import PagesLayout from '../../layouts/PagesLayout'
import { useIntl } from 'react-intl'
import styles from './UserSettingsPage.module.scss'
import UserForm from '../../forms/UserForm'

const UserSettingsPage = () => {
  const { formatMessage } = useIntl()
  return (
    <PagesLayout>
      hello hitler
      <UserForm />
    </PagesLayout>
  )
}
export default UserSettingsPage
