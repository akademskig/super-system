import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../../api/public/auth'
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

  const onSubmit = useCallback(
    async (values) => {
      const { email, password } = values
      const res = await signIn({ email, password })
      setAuthData(res)
      navigate('/dashboard')
    },
    [navigate, setAuthData]
  )

  return (
    <div className={styles.root}>
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
