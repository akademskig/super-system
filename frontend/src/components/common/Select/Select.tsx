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

type Props = {
  options: Option[]
  classes?: Record<string, string>
  error?: any
  onChange?: ChangeHandler
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
    name,
    label,
    value,
    setDefault,
    defaultValue,
  }: Props & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const [selectedLabel, setSelectedLabel] = useState(getDefaultLabel(label))

  const newOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      action: (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange({ target: { value: option.value, name } })
      },
    }))
  }, [name, onChange, options])

  useEffect(() => {
    if (!value) {
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
    setSelectedLabel(
      options.find((o) => o.value === value)?.label || getDefaultLabel(label)
    )
  }, [defaultValue, label, name, onChange, options, setDefault, value])

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
