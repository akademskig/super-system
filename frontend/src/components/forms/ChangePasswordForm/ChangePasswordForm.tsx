import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { CHANGE_PASSWORD } from '../../../apollo/api/user'
import Input from '../../common/Input'
import styles from './ChangePasswordForm.module.scss'
import Button from '../../common/Button'
import { useCallback } from 'react'
import { ClipLoader } from 'react-spinners'
import { commonMessages } from '../../../lang/messages.lang'
import { useIntl } from 'react-intl'

const ChangePasswordForm = () => {
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    errorPolicy: 'all',
  })

  const { register, handleSubmit } = useForm()
  const { formatMessage } = useIntl()
  const onSubmit = useCallback(
    async (data) => {
      const { oldPassword, newPassword } = data
      await changePassword({
        variables: { input: { oldPassword, newPassword } },
      })
    },
    [changePassword]
  )
  return (
    <div className={styles.root}>
      <h4 className={styles.title}> Change password </h4>
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label={'Old password'}
          type="password"
          {...register('oldPassword', { required: true })}
        />
        <Input
          label={'New password'}
          type="password"
          {...register('newPassword', { required: true })}
        />
        <Button className={styles.saveBtn}>
          {' '}
          {loading ? (
            <ClipLoader size={25} color="white" />
          ) : (
            formatMessage(commonMessages.save)
          )}
        </Button>
      </form>
    </div>
  )
}
export default ChangePasswordForm
