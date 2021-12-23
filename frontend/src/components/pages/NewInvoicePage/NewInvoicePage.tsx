import styles from './NewInvoicePage.module.scss'
import PagesLayout from '../../layouts/PagesLayout'
import NewInvoiceForm from '../../forms/NewInvoiceForm'

const NewInvoicePage = () => {
  return (
    <PagesLayout>
      <div className={styles.form}>
        <h4 className={styles.formHeader}>New invoice</h4>
        <NewInvoiceForm />
      </div>
    </PagesLayout>
  )
}
export default NewInvoicePage
