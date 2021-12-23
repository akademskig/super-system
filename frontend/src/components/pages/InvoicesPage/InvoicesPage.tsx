import Button from '../../common/Button'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './InvoicesPage.module.scss'
import PagesLayout from '../../layouts/PagesLayout'

const InvoicesPage = () => {
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Link className={styles.button} to="/new-invoice">
          <Button>
            {' '}
            <FaPlus /> <span>new Invoice</span>
          </Button>
        </Link>
      </div>
    </PagesLayout>
  )
}
export default InvoicesPage
