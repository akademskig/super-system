import { useMutation } from '@apollo/client'
import classNames from 'classnames'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { SIGN_IN } from '../../../apollo/api/auth'
import getErrorMessage from '../../../utils/getErrorMessage'
import Button from '../../common/Button'
import Input from '../../common/Input'
import useAuth from '../../hooks/useAuth'
import styles from './LoginForm.module.scss'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const { setAuthData } = useAuth()
  const [signIn, { error }] = useMutation(SIGN_IN)

  const onSubmit = useCallback(
    async (values) => {
      const { email, password } = values
      const { data } = await signIn({
        variables: { input: { email, password } },
      })
      if (data?.signIn) {
        setAuthData(data?.signIn)
        navigate('/dashboard')
      }
    },
    [navigate, setAuthData, signIn]
  )

  return (
    <div className={styles.root}>
      {error && !!getErrorMessage(error).length && (
        <div className={classNames(styles.error)}>
          {error &&
            getErrorMessage(error).map((errorMessage, idx) => (
              <div key={idx}>{errorMessage}</div>
            ))}
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'Email'}
          {...register('email', { required: 'This field is required' })}
          error={errors.email}
          type="email"
        />
        <Input
          label={'Password'}
          {...register('password', { required: 'This field is required' })}
          error={errors.password}
          type="password"
        />
        <Button className={styles.button} type="submit">
          {' '}
          Sign In
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
