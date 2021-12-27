import { FaPlus } from 'react-icons/fa'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import CompanyForm from '../../forms/CompanyForm'
import { FormTypes } from '../../hooks/useClientForm'
import PagesLayout from '../../layouts/PagesLayout'
import styles from './CompaniesPage.module.scss'
import CompanyList from './CompanyList'

const CompaniesPage = () => {
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Modal
          title={'Add new company'}
          trigger={(onOpen) => (
            <Button className={styles.button} onClick={onOpen}>
              <FaPlus /> <span>New Company</span>
            </Button>
          )}
        >
          <CompanyForm type={FormTypes.CREATE} />
        </Modal>
        <CompanyList />
      </div>
    </PagesLayout>
  )
}
export default CompaniesPage
