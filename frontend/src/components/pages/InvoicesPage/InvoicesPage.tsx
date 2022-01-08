import Button from '../../common/Button'
import { FaPlus } from 'react-icons/fa'
import styles from './InvoicesPage.module.scss'
import PagesLayout from '../../layouts/PagesLayout'
import Modal from '../../common/Modal'
import InvoiceForm from '../../forms/InvoiceForm'
import { FormTypes } from '../../hooks/useInvoiceForm'
import InvoiceList from './InvoiceList'
import { useIntl } from 'react-intl'
import { invoicePageMessages } from '../../../lang/messages.lang'

const InvoicesPage = () => {
  const { formatMessage } = useIntl()
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Modal
          title={formatMessage(invoicePageMessages.newInvoice)}
          trigger={(onOpen) => (
            <Button onClick={onOpen} className={styles.button}>
              <FaPlus />{' '}
              <span>{formatMessage(invoicePageMessages.newInvoice)}</span>
            </Button>
          )}
        >
          <InvoiceForm type={FormTypes.CREATE} />
        </Modal>
      </div>
      <InvoiceList />
    </PagesLayout>
  )
}
export default InvoicesPage
