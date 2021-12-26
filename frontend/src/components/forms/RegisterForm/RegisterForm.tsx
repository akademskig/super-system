import { useMutation } from '@apollo/client'
import classNames from 'classnames'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { REGISTER } from '../../../apollo/api/auth'
import getErrorMessage from '../../../utils/getErrorMessage'
import Button from '../../common/Button'
import Input from '../../common/Input'
import styles from './RegisterForm.module.scss'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [registerUser, res] = useMutation(REGISTER, { errorPolicy: 'all' })
  const navigate = useNavigate()

  const onSubmit = useCallback(
    async (values) => {
      const { email, password, username } = values
      const { data } = await registerUser({
        variables: { input: { email, password, username } },
      })
      if (data?.register) {
        navigate('/auth#signIn')
      }
    },
    [navigate, registerUser]
  )

  return (
    <div className={styles.root}>
      {res.error && (
        <ul className={classNames(styles.error)}>
          {res.error &&
            getErrorMessage(res?.error).map((errorMessage, idx) => (
              <li key={idx}>{errorMessage}</li>
            ))}
        </ul>
      )}
      <form
        noValidate
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label={'Username'}
          {...register('username', { required: true })}
          error={errors.username}
        />
        <Input
          label={'Email'}
          {...register('email', { required: true })}
          error={errors.email}
          type="email"
        />
        <Input
          label={'Password'}
          {...register('password', { required: true })}
          error={errors.password}
          type="password"
        />
        <Button className={styles.button} type="submit">
          {' '}
          Register
        </Button>
      </form>
    </div>
  )
}

export default RegisterForm
