import { useQuery } from '@apollo/client'
import { ForwardedRef, forwardRef, SelectHTMLAttributes, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { GET_COMPANY } from '../../../../apollo/api/companies'
import Select from '../../../common/Select'

type Props = {
  error?: any
  classes: Record<string, string>
  onChange: ChangeHandler
  companyId: string
  name: string
  label?: string
}
const InvoiceSettingsSelect = (
  {
    error,
    classes,
    companyId,
    label,
    name,
    ...rest
  }: Props & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const { data } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
    skip: !companyId,
  })
  const options = useMemo(
    () =>
      (data?.company?.invoiceSettings?.[`${name}s`] || []).map(
        (type: string) => ({
          label: type,
          value: type,
        })
      ),
    [data?.company?.invoiceSettings, name]
  )

  return (
    <Select
      name={name}
      label={label}
      classes={classes}
      error={error}
      options={options}
      ref={ref}
      {...rest}
    />
  )
}
export default forwardRef(InvoiceSettingsSelect)
