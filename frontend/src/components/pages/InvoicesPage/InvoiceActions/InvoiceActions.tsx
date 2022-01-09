import { FaPencilAlt } from 'react-icons/fa'
import { useIntl } from 'react-intl'
import { invoicePageMessages } from '../../../../lang/messages.lang'
import { IInvoice } from '../../../../types/invoices.type'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import InvoiceForm from '../../../forms/InvoiceForm'
import { FormTypes } from '../../../hooks/useClientForm'
import DeleteInvoiceButton from '../DeleteInvoiceButton'
import GetPdfButton from '../GetPdfButton'
import styles from './InvoiceActions.module.scss'

type Props = {
  invoice: IInvoice
}
const InvoiceActions = ({ invoice }: Props) => {
  const { formatMessage } = useIntl()

  return (
    <div className={styles.actions}>
      <Modal
        title={formatMessage(invoicePageMessages.editInvoice)}
        trigger={(onOpen) => (
          <Button className={styles.deleteButton} link onClick={onOpen}>
            <FaPencilAlt className={styles.trashIcon} />
          </Button>
        )}
      >
        <InvoiceForm type={FormTypes.UPDATE} initialValues={invoice} />
      </Modal>
      <GetPdfButton invoice={invoice} />
      <DeleteInvoiceButton invoice={invoice} />
    </div>
  )
}
export default InvoiceActions
