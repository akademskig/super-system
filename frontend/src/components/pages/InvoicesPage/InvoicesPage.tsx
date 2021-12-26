import Button from '../../common/Button'
import { FaPlus } from 'react-icons/fa'
import styles from './InvoicesPage.module.scss'
import PagesLayout from '../../layouts/PagesLayout'
import Modal from '../../common/Modal'
import InvoiceForm from '../../forms/InvoiceForm'

const InvoicesPage = () => {
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Modal
          title={'New Invoice'}
          trigger={(onOpen) => (
            <Button onClick={onOpen} className={styles.button}>
              <FaPlus /> <span>new Invoice</span>
            </Button>
          )}
        >
          <InvoiceForm />
        </Modal>
      </div>
    </PagesLayout>
  )
}
export default InvoicesPage
