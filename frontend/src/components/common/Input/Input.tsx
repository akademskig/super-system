import classNames from 'classnames'
import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  RefCallback,
  useCallback,
} from 'react'
import { ChangeHandler } from 'react-hook-form'
import { FaCalendar, FaCalendarDay } from 'react-icons/fa'
import styles from './Input.module.scss'

type Props = {
  label?: string | ReactNode
  name: string
  onChange?: ChangeHandler
  error?: any
  ref: RefCallback<any>
  classes?: Record<string, string>
  withMessage?: boolean
  watch?: ChangeHandler
  inputAdornment?: string
}

const Input = (
  {
    label,
    name,
    onChange,
    watch,
    type,
    error,
    classes,
    withMessage,
    inputAdornment,
    ...rest
  }: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: any
) => {
  const handleChange = useCallback(
    (e) => {
      onChange &&
        onChange({
          target: {
            value: type === 'number' ? Number(e.target.value) : e.target.value,
            name,
          },
        })
      watch &&
        watch({
          target: {
            value: type === 'number' ? Number(e.target.value) : e.target.value,
            name,
          },
        })
    },
    [name, onChange, type, watch]
  )
  return (
    <div className={classNames(styles.root, classes?.root)}>
      <label className={classNames(styles.label, classes?.label)}>
        {label}
      </label>
      <div className={classNames(styles.inputBox, { [styles.error]: error })}>
        <input
          {...rest}
          type={type}
          ref={ref}
          name={name}
          onChange={handleChange}
          className={classNames(styles.input)}
        />
        {type === 'date' && <FaCalendar className={styles.calendarIcon} />}
        {type === 'datetime-local' && (
          <FaCalendarDay className={styles.calendarIcon} />
        )}
        {inputAdornment && (
          <div className={styles.inputAdornment}>{inputAdornment}</div>
        )}
      </div>
      {error && withMessage && (
        <small className={styles.errorMessage}>{error.message}</small>
      )}
    </div>
  )
}
export default forwardRef(Input)
