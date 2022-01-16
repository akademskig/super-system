import classNames from 'classnames'
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  SelectHTMLAttributes,
  useCallback,
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
  value: string | number
}

export type SelectProps = {
  options: Option[]
  classes?: Record<string, string>
  error?: any
  onChange?: ChangeHandler | ((event: any) => void)
  watch?: ChangeHandler
  label?: string
  setDefault?: boolean
  returnLabel?: boolean
  value: string | number | { value: string | number; label: string } | undefined
}

const getDefaultLabel = (label?: string) => 'Select...'

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
    returnLabel,
    defaultValue,
  }: SelectProps & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const [selectedLabel, setSelectedLabel] = useState(getDefaultLabel(label))

  const getValue = useCallback(
    (value) => {
      return returnLabel
        ? {
            value: value,
            label: options.find((o) => o.value === value)?.label || '',
          }
        : value
    },
    [options, returnLabel]
  )
  const newOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      action: (e: ChangeEvent<HTMLSelectElement>) => {
        onChange &&
          onChange({ target: { value: getValue(option.value), name } })
        watch && watch({ target: { value: getValue(option.value), name } })
      },
    }))
  }, [getValue, name, onChange, options, watch])

  useEffect(() => {
    const v = typeof value === 'object' ? value?.value : value
    const inOptions = options.find((o) => o?.value === v)
    if (!v || !inOptions) {
      onChange &&
        onChange({
          target: {
            value: defaultValue
              ? getValue(defaultValue)
              : setDefault
              ? getValue(options?.[0]?.value)
              : '',
            name,
          },
        })
    }
  }, [
    defaultValue,
    getValue,
    label,
    name,
    onChange,
    options,
    setDefault,
    value,
  ])

  useEffect(() => {
    setSelectedLabel(
      options.find(
        (o) => o?.value === (typeof value === 'object' ? value?.value : value)
      )?.label || getDefaultLabel(label)
    )
  }, [label, options, returnLabel, value])
  return (
    <div className={classNames(styles.root, classes?.root)}>
      {label && <label className={classes?.label}>{label}</label>}
      <MenuButton
        classes={{
          menuButton: classNames(styles.menuButton, classes?.menuButton, {
            [styles.error]: error,
          }),
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
