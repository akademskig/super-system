import { useQuery } from '@apollo/client'
import { ForwardedRef, forwardRef, SelectHTMLAttributes, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { GET_CLIENTS } from '../../../../apollo/api/clients'
import { IClient } from '../../../../types/clients.type'
import Select, { SelectProps } from '../../../common/Select'

type Props = {
  error?: any
  classes?: Record<string, string>
  onChange: ChangeHandler
  value: string | { label: string; value: string }
  label?: string
  companyId?: string
}
const ClientSelect = (
  {
    error,
    classes,
    label,
    companyId,
    ...rest
  }: Props & Partial<SelectProps> & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const { data } = useQuery(GET_CLIENTS, {
    variables: { query: { companyId } },
  })
  const options = useMemo(
    () =>
      (data?.clients || []).map((client: IClient) => ({
        label: client.name,
        value: client.id,
      })),
    [data?.clients]
  )
  return (
    <Select
      classes={classes}
      error={error}
      options={options}
      {...rest}
      ref={ref}
      label={label}
    />
  )
}
export default forwardRef(ClientSelect)
