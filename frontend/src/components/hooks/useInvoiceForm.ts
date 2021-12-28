import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import {
  CREATE_INVOICE,
  INVOICE_FRAGMENT,
  UPDATE_INVOICE,
} from '../../apollo/api/invoices'

export enum FormTypes {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}
const useInvoiceForm = (type: FormTypes) => {
  const [updateInvoice, resEdit] = useMutation(UPDATE_INVOICE, {
    errorPolicy: 'all',
    update(cache, { data }) {
      cache.writeFragment({
        id: cache.identify({
          id: data?.updateInvoice.id,
          __typename: 'Client',
        }),
        fragment: INVOICE_FRAGMENT,
        data: data.updateInvoice,
      })
    },
  })

  const [createInvoice, resCreate] = useMutation(CREATE_INVOICE, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) {
        return null
      }
      cache.modify({
        fields: {
          invoices(existingInvoices = []) {
            const newInvoiceRef = cache.writeFragment({
              data: data?.createInvoice,
              fragment: INVOICE_FRAGMENT,
            })
            return [...existingInvoices, newInvoiceRef]
          },
        },
      })
    },
  })

  const onSubmitCreate = useCallback(
    async (values) => {
      const { data } = await createInvoice({
        variables: { input: values },
      })
      return data?.createInvoice
    },
    [createInvoice]
  )
  const onSubmitUpdate = useCallback(
    async (values) => {
      const { data } = await updateInvoice({
        variables: { input: values },
      })
      return data?.updateInvoice
    },
    [updateInvoice]
  )

  const values = useMemo(() => {
    return {
      onSubmit: type === FormTypes.CREATE ? onSubmitCreate : onSubmitUpdate,
      error: type === FormTypes.CREATE ? resCreate.error : resEdit.error,
    }
  }, [onSubmitCreate, onSubmitUpdate, resCreate.error, resEdit.error, type])

  return values
}
export default useInvoiceForm
