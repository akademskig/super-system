import { useQuery } from '@apollo/client'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { GET_CURRENT_USER } from '../../../apollo/api/user'
import Input from '../../common/Input'
import styles from './UserForm.module.scss'
import Button from '../../common/Button'
import { useCallback } from 'react'

const UserForm = () => {
  const { data } = useQuery(GET_CURRENT_USER)
  console.log(data)
  const { register, handleSubmit } = useForm({
    defaultValues: omit(data?.user, ['__typename', 'password']),
  })

  const onSubmit = useCallback((data) => {
    console.log(data)
  }, [])
  return (
    <div className={styles.root}>
      <form
        className={classNames(styles.form, 'row')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label={'Username'}
          {...register('username')}
          className="col-lg-6"
        />
        <Input
          label={'Email'}
          type="email"
          {...register('email')}
          className="col-lg-6"
        />
        <Input
          label={'Full name'}
          {...register('fullName')}
          className="col-lg-6"
        />
        <Button>Save</Button>
      </form>
    </div>
  )
}
export default UserForm
