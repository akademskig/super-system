import { useQuery } from '@apollo/client'
import { ForwardedRef, forwardRef, useMemo } from 'react'
import { ChangeHandler } from 'react-hook-form'
import { GET_COMPANIES } from '../../../../apollo/api/companies'
import { IClient } from '../../../../types/clients.type'
import Select from '../../../common/Select'

type Props = {
  error?: any
  classes: Record<string, string>
  onChange: ChangeHandler
}
const CompanySelect = (
  { error, classes, ...rest }: Props,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const { data } = useQuery(GET_COMPANIES)

  const options = useMemo(
    () =>
      (data?.companies || []).map((client: IClient) => ({
        label: client.name,
        value: client.id,
      })),
    [data?.companies]
  )
  return (
    <Select
      classes={classes}
      error={error}
      options={options}
      {...rest}
      ref={ref}
      label={'Company'}
    />
  )
}
export default forwardRef(CompanySelect)
