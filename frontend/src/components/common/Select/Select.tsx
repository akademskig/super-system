import classNames from 'classnames'
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  SelectHTMLAttributes,
  useEffect,
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

export type SelectProps = {
  options: Option[]
  classes?: Record<string, string>
  error?: any
  onChange?: ChangeHandler
  watch?: ChangeHandler
  label?: string
  setDefault?: boolean
}

const getDefaultLabel = (label?: string) =>
  label ? `Select ${label}` : 'Select...'

const Select = (
  {
    options,
    classes,
    error,
    onChange,
    watch,
    name,
    label,
    value,
    setDefault,
    defaultValue,
  }: SelectProps & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const [selectedLabel, setSelectedLabel] = useState(getDefaultLabel(label))

  const newOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      action: (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange({ target: { value: option.value, name } })
        watch && watch({ target: { value: option.value, name } })
      },
    }))
  }, [name, onChange, options, watch])

  useEffect(() => {
    const inOptions = options.find((o) => o.value === value)
    if (!value || !inOptions) {
      onChange &&
        onChange({
          target: {
            value: defaultValue
              ? defaultValue
              : setDefault
              ? options?.[0]?.value
              : '',
            name,
          },
        })
    }
  }, [defaultValue, label, name, onChange, options, setDefault, value])

  useEffect(() => {
    setSelectedLabel(
      options.find((o) => o.value === value)?.label || getDefaultLabel(label)
    )
  }, [label, options, value])
  return (
    <div className={classNames(styles.root, classes?.root)}>
      <label className={classes?.label}>{label}</label>
      <MenuButton
        classes={{
          menuButton: classNames(styles.menuButton, { [styles.error]: error }),
          menu: styles.menu,
          button: classNames(styles.button),
        }}
        options={newOptions}
      >
        <label className={styles.label}>{selectedLabel}</label>
        <FaChevronDown className={styles.iconChevronDown} />
      </MenuButton>
    </div>
  )
}
export default forwardRef(Select)
