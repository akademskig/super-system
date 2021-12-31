import { useQuery } from '@apollo/client'
import { ForwardedRef, forwardRef, SelectHTMLAttributes, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { GET_CURRENCIES } from '../../../../apollo/api/currencies'
import Select, { type SelectProps } from '../../../common/Select'

type Props = {
  error?: any
  classes?: Record<string, string>
  label?: string
  value?: string
  onChange: ChangeHandler
}
const CurrencySelect = (
  {
    error,
    classes,
    label,
    value,
    ...rest
  }: Props & Partial<SelectProps> & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const { data } = useQuery(GET_CURRENCIES)

  const options = useMemo(
    () =>
      (data?.currencies || []).map((currency: string) => ({
        label: currency.trim(),
        value: currency.trim(),
      })),
    [data?.currencies]
  )
  return (
    <Select
      value={value}
      label={label}
      classes={classes}
      error={error}
      options={options}
      ref={ref}
      {...rest}
    />
  )
}
export default forwardRef(CurrencySelect)
