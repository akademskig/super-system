import { ForwardedRef, forwardRef, SelectHTMLAttributes, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { InvoiceTypes } from '../../../../types/invoices.type'
import Select, { SelectProps } from '../../../common/Select'

type Props = {
  error?: any
  classes: Record<string, string>
  onChange: ChangeHandler
}
const InvoiceTypeSelect = (
  {
    error,
    classes,
    ...rest
  }: Props & Partial<SelectProps> & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const options = useMemo(
    () =>
      (Object.keys(InvoiceTypes) || []).map((type) => ({
        label: type,
        value: type,
      })),
    []
  )
  return (
    <Select
      label={'Invoice Type'}
      classes={classes}
      error={error}
      options={options}
      ref={ref}
      {...rest}
    />
  )
}
export default forwardRef(InvoiceTypeSelect)
