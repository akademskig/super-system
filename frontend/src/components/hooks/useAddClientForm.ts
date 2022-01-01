import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { COMPANY_FRAGMENT, UPDATE_COMPANY } from '../../apollo/api/companies'

export enum FormTypes {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}
const useAddClientForm = (type: FormTypes) => {
  const [updateCompany, resEdit] = useMutation(UPDATE_COMPANY, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) return
      cache.writeFragment({
        id: cache.identify({
          id: data?.updateCompany.id,
          __typename: 'Company',
        }),
        fragment: COMPANY_FRAGMENT,
        data: data.updateCompany,
      })
    },
  })

  const onSubmitUpdate = useCallback(
    async (values, id) => {
      const { data } = await updateCompany({
        variables: { input: { id, clientIds: values } },
      })
      return data?.updateCompany
    },
    [updateCompany]
  )

  const values = useMemo(() => {
    return {
      onSubmit: onSubmitUpdate,
      error: resEdit.error,
    }
  }, [onSubmitUpdate, resEdit.error])

  return values
}
export default useAddClientForm
