import classNames from 'classnames'
import PagesLayout from '../../layouts/PagesLayout'
import UserForm from '../../forms/UserForm'
import ChangePasswordForm from '../../forms/ChangePasswordForm'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../../../apollo/api/user'

import styles from './UserSettingsPage.module.scss'

const UserSettingsPage = () => {
  const { data: userData } = useQuery(GET_CURRENT_USER)

  return (
    <PagesLayout>
      <div className={classNames("row", styles.content)}>
        {userData?.user && (
          <div className="col-md-6">
            <UserForm initialValues={userData?.user} />
          </div>
        )}
        <div className="col-md-6">
          <ChangePasswordForm />
        </div>
      </div>
    </PagesLayout>
  )
}
export default UserSettingsPage
