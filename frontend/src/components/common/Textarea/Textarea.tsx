import classNames from 'classnames'
import { forwardRef, InputHTMLAttributes, ReactNode, RefCallback } from 'react'
import { ChangeHandler } from 'react-hook-form'
import styles from './Textarea.module.scss'

type Props = {
  label?: string | ReactNode
  name: string
  onChange: ChangeHandler
  error?: any
  ref: RefCallback<any>
  classes?: Record<string, string>
  withMessage?: boolean
}

const Textarea = (
  {
    label,
    name,
    onChange,
    error,
    classes,
    withMessage,
    ...rest
  }: Props & InputHTMLAttributes<HTMLTextAreaElement>,
  ref: any
) => {
  return (
    <div className={classNames(styles.root, classes?.root)}>
      <label className={classNames(classes?.label)}>{label}</label>
      <textarea
        {...rest}
        ref={ref}
        name={name}
        onChange={onChange}
        className={classNames(styles.input, { [styles.error]: error })}
      />
      {error && withMessage && (
        <small className={styles.errorMessage}>{error.message}</small>
      )}
    </div>
  )
}
export default forwardRef(Textarea)
