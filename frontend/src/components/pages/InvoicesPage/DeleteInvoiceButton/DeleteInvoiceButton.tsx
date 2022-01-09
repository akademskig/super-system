import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { REMOVE_INVOICE } from '../../../../apollo/api/invoices'
import { invoicePageMessages } from '../../../../lang/messages.lang'
import { IInvoice } from '../../../../types/invoices.type'
import ConfirmModal from '../../../modals/ConfirmModal'

type Props = {
  invoice: Partial<IInvoice>
}
const DeleteInvoiceButton = ({ invoice }: Props) => {
  const { formatMessage } = useIntl()
  const [removeInvoice] = useMutation(REMOVE_INVOICE, {
    errorPolicy: 'all',
    update(cache, { data }) {
      const normalizedId = cache.identify({
        id: data.removeInvoice.id,
        __typename: 'Invoice',
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
  })
  const onDelete = useCallback(
    (id) => {
      return async () => removeInvoice({ variables: { id } })
    },
    [removeInvoice]
  )
  return (
    <ConfirmModal
      onConfirm={onDelete(invoice.id)}
      title={formatMessage(invoicePageMessages.deleteInvoiceConfirm)}
    />
  )
}
export default DeleteInvoiceButton
