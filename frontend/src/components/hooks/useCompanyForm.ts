import { useMutation } from '@apollo/client'
import { omit } from 'lodash'
import { useCallback, useMemo } from 'react'
import {} from '../../apollo/api/clients'
import {
  COMPANY_FRAGMENT,
  CREATE_COMPANY,
  UPDATE_COMPANY,
  UPLOAD_LOGO,
} from '../../apollo/api/companies'

export enum FormTypes {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}
const useCompanyForm = (type: FormTypes) => {
  const [uploadLogo, resUpload] = useMutation(UPLOAD_LOGO, {
    errorPolicy: 'all',
  })

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
        variables: { input: omit(values, ['logoFile']) },
      })
      if (data.createCompany.id && values.logoFile[0]) {
        await uploadLogo({
          variables: { file: values.logoFile[0], id: data.createCompany.id },
        })
      }
      return data?.createCompany
    },
    [createCompany, uploadLogo]
  )
  const onSubmitUpdate = useCallback(
    async (values) => {
      const { data } = await updateCompany({
        variables: { input: omit(values, ['logoFile']) },
      })
      if (data.updateCompany.id && values?.logoFile[0]) {
        await uploadLogo({
          variables: { file: values.logoFile[0], id: values.id },
        })
      }
      return data?.updateCompany
    },
    [updateCompany, uploadLogo]
  )

  const values = useMemo(() => {
    return {
      onSubmit: type === FormTypes.CREATE ? onSubmitCreate : onSubmitUpdate,
      error: resCreate.error || resEdit.error || resUpload.error,
      loading: resCreate.loading || resEdit.loading || resUpload.loading,
    }
  }, [
    onSubmitCreate,
    onSubmitUpdate,
    resCreate.error,
    resCreate.loading,
    resEdit.error,
    resEdit.loading,
    resUpload.error,
    resUpload.loading,
    type,
  ])

  return values
}
export default useCompanyForm
