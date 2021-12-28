import { useQuery } from '@apollo/client'
import { ForwardedRef, forwardRef, SelectHTMLAttributes, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { GET_CLIENTS } from '../../../../apollo/api/clients'
import { IClient } from '../../../../types/clients.type'
import Select from '../../../common/Select'

type Props = {
  error?: any
  classes: Record<string, string>
  onChange: ChangeHandler
}
const ClientSelect = (
  { error, classes, ...rest }: Props & SelectHTMLAttributes<HTMLSelectElement>,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const { data } = useQuery(GET_CLIENTS)

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
      label={'Client'}
    />
  )
}
export default forwardRef(ClientSelect)
