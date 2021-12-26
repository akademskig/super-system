import { ForwardedRef, forwardRef, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import Select from '../../../common/Select'

enum InvoiceTypes {
  R = 'R',
  R1 = 'R1',
  R2 = 'R2',
  NONE = 'none',
  ADVANCE = 'advance',
}
type Props = {
  error?: any
  classes: Record<string, string>
  onChange: ChangeHandler
}
const InvoiceTypeSelect = (
  { error, classes, ...rest }: Props,
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
      {...rest}
      ref={ref}
    />
  )
}
export default forwardRef(InvoiceTypeSelect)
