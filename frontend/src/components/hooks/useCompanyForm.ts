import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import {} from '../../apollo/api/clients'
import {
  COMPANY_FRAGMENT,
  CREATE_COMPANY,
  UPDATE_COMPANY,
} from '../../apollo/api/companies'

export enum FormTypes {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}
const useCompanyForm = (type: FormTypes) => {
  const [updateCompany, resEdit] = useMutation(UPDATE_COMPANY, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) return
      cache.writeFragment({
        id: cache.identify({
          id: data?.updateCompany.id,
          __typename: 'Client',
        }),
        fragment: COMPANY_FRAGMENT,
        data: data.updateCompany,
      })
    },
  })

  const [createCompany, resCreate] = useMutation(CREATE_COMPANY, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) {
        return null
      }
      cache.modify({
        fields: {
          companies(existingCompanies = []) {
            const newCompanyRef = cache.writeFragment({
              data: data?.createCompany,
              fragment: COMPANY_FRAGMENT,
            })
            return [...existingCompanies, newCompanyRef]
          },
        },
      })
    },
  })

  const onSubmitCreate = useCallback(
    async (values) => {
      const { data } = await createCompany({
        variables: { input: values },
      })
      return data?.createCompany
    },
    [createCompany]
  )
  const onSubmitUpdate = useCallback(
    async (values) => {
      const { data } = await updateCompany({
        variables: { input: values },
      })
      return data?.updateCompany
    },
    [updateCompany]
  )

  const values = useMemo(() => {
    return {
      onSubmit: type === FormTypes.CREATE ? onSubmitCreate : onSubmitUpdate,
      error: type === FormTypes.CREATE ? resCreate.error : resEdit.error,
    }
  }, [onSubmitCreate, onSubmitUpdate, resCreate.error, resEdit.error, type])

  return values
}
export default useCompanyForm
