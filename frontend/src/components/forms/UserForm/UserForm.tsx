import { useMutation, useQuery } from '@apollo/client'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import {
  GET_CURRENT_USER,
  UPDATE_USER,
  USER_FRAGMENT,
} from '../../../apollo/api/user'
import Input from '../../common/Input'
import styles from './UserForm.module.scss'
import Button from '../../common/Button'
import { useCallback } from 'react'

const UserForm = () => {
  const { data: userData } = useQuery(GET_CURRENT_USER)
  const [updateUser] = useMutation(UPDATE_USER, {
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
  const { register, handleSubmit } = useForm({
    defaultValues: omit(userData?.user, ['__typename', 'password']),
  })

  const onSubmit = useCallback(
    async (data) => {
      await updateUser({
        variables: { input: { ...data, ...{ id: userData?.user?.id } } },
      })
    },
    [updateUser, userData]
  )
  return (
    <div className={styles.root}>
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label={'Username'} {...register('username')} />
        <Input label={'Email'} type="email" {...register('email')} />
        <Input label={'Full name'} {...register('fullName')} />
        <Button className={styles.saveBtn}>Save</Button>
      </form>
    </div>
  )
}
export default UserForm
