import classNames from 'classnames'
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  SelectHTMLAttributes,
  useMemo,
  useState,
} from 'react'
import { ChangeHandler } from 'react-hook-form'
import { FaChevronDown } from 'react-icons/fa'
import MenuButton from '../MenuButton'
import styles from './Select.module.scss'

type Option = {
  label: string
  value: string
}

type Props = {
  options: Option[]
  classes?: Record<string, string>
  error?: any
  onChange?: ChangeHandler
  label?: string
}

const Select = (
  {
    options,
    classes,
    error,
    onChange,
    name,
    label,
  }: Props & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const [selectedLabel, setSelectedLabel] = useState(`Select ${label}`)

  const newOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      action: (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange({ target: { value: option.value } })
        setSelectedLabel(option.label)
      },
    }))
  }, [onChange, options])

  return (
    <div className={classNames(styles.root, classes?.root)}>
      <label className={classes?.label}>{label}</label>
      <MenuButton
        classes={{ menuButton: styles.menuButton, menu: styles.menu }}
        options={newOptions}
      >
        <label className={styles.label}>{selectedLabel}</label>
        <FaChevronDown className={styles.iconChevronDown} />
      </MenuButton>
      <select
        name={name}
        onChange={onChange}
        ref={ref}
        className={classNames(styles.select, { [styles.error]: error })}
      >
        {options.length &&
          options.map((option) => (
            <option className={styles.option} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  )
}
export default forwardRef(Select)
