import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import {
  CLIENT_FRAGMENT,
  CREATE_CLIENT,
  UPDATE_CLIENT,
} from '../../apollo/api/clients'

export enum FormTypes {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
}
const useClientForm = (type: FormTypes) => {
  const [updateClient, resEdit] = useMutation(UPDATE_CLIENT, {
    errorPolicy: 'all',
    update(cache, { data }) {
      cache.writeFragment({
        id: cache.identify({
          id: data?.updateClient.id,
          __typename: 'Client',
        }),
        fragment: CLIENT_FRAGMENT,
        data: data.updateClient,
      })
    },
  })

  const [createClient, resCreate] = useMutation(CREATE_CLIENT, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) {
        return null
      }
      cache.modify({
        fields: {
          clients(existingClients = []) {
            const newClientRef = cache.writeFragment({
              data: data?.createClient,
              fragment: CLIENT_FRAGMENT,
            })
            return [...existingClients, newClientRef]
          },
        },
      })
    },
  })

  const onSubmitCreate = useCallback(
    async (values) => {
      const { data } = await createClient({
        variables: { input: values },
      })
      if (data?.createClient) {
        // onCloseModal && onCloseModal()
        resCreate.reset()
        // formReset()
      }
      return data?.createClient
    },
    [createClient, resCreate]
  )
  const onSubmitUpdate = useCallback(
    async (values) => {
      const { data } = await updateClient({
        variables: { input: values },
      })
      if (data?.editClient) {
        // onCloseModal && onCloseModal()
        resEdit.reset()
        // formReset()
      }
      return data?.updateClient
    },
    [updateClient, resEdit]
  )

  const values = useMemo(() => {
    return {
      onSubmit: type === FormTypes.CREATE ? onSubmitCreate : onSubmitUpdate,
      error: type === FormTypes.CREATE ? resCreate.error : resEdit.error,
    }
  }, [onSubmitCreate, onSubmitUpdate, resCreate.error, resEdit.error, type])

  return values
}
export default useClientForm
