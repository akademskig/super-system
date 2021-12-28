import classNames from 'classnames'
import { forwardRef, InputHTMLAttributes, ReactNode, RefCallback } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { FaCalendar, FaCalendarDay } from 'react-icons/fa'
import styles from './Input.module.scss'

type Props = {
  label?: string | ReactNode
  name: string
  onChange: ChangeHandler
  error?: any
  ref: RefCallback<any>
  classes?: Record<string, string>
  withMessage?: boolean
}

const Input = (
  {
    label,
    name,
    onChange,
    type,
    error,
    classes,
    withMessage,
    ...rest
  }: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: any
) => {
  return (
    <div className={classNames(styles.root, classes?.root)}>
      <label className={classNames(styles.label, classes?.label)}>
        {label}
      </label>
      <div className={styles.inputBox}>
        <input
          {...rest}
          type={type}
          ref={ref}
          name={name}
          onChange={onChange}
          className={classNames(styles.input, { [styles.error]: error })}
        />
        {type === 'date' && <FaCalendar className={styles.calendarIcon} />}
        {type === 'datetime-local' && (
          <FaCalendarDay className={styles.calendarIcon} />
        )}
      </div>
      {error && withMessage && (
        <small className={styles.errorMessage}>{error.message}</small>
      )}
    </div>
  )
}
export default forwardRef(Input)
