import { useMutation } from '@apollo/client'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { UPDATE_USER, USER_FRAGMENT } from '../../../apollo/api/user'
import Input from '../../common/Input'
import styles from './UserForm.module.scss'
import Button from '../../common/Button'
import { useCallback } from 'react'
import { ClipLoader } from 'react-spinners'
import { commonMessages } from '../../../lang/messages.lang'
import { useIntl } from 'react-intl'

const UserForm = ({ initialValues }: any) => {
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) return
      cache.writeFragment({
        id: cache.identify({
          id: data?.updateUser.id,
          __typename: 'User',
        }),
        fragment: USER_FRAGMENT,
        data: data.updateUser,
      })
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: omit(initialValues, ['__typename']) })
  
  const { formatMessage } = useIntl()

  const onSubmit = useCallback(
    async (data) => {
      await updateUser({
        variables: { input: { ...data, id: initialValues?.id } },
      })
    },
    [initialValues?.id, updateUser]
  )
  return (
    <div className={styles.root}>
      <h4 className={styles.title}> Edit user data </h4>
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label={'Username'}
          {...register('username', { required: true })}
          error={errors['username']}
        />
        <Input
          label={'Email'}
          type="email"
          {...register('email', { required: true })}
          error={errors['email']}
        />
        <Input label={'Full name'} {...register('fullName')} />
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
export default UserForm
