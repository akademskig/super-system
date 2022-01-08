import { FaPlus } from 'react-icons/fa'
import { useIntl } from 'react-intl'
import { companiesPageMessages } from '../../../lang/messages.lang'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import CompanyForm from '../../forms/CompanyForm'
import { FormTypes } from '../../hooks/useClientForm'
import PagesLayout from '../../layouts/PagesLayout'
import styles from './CompaniesPage.module.scss'
import CompanyList from './CompanyList'

const CompaniesPage = () => {
  const { formatMessage } = useIntl()
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Modal
          title={formatMessage(companiesPageMessages.newCompany)}
          trigger={(onOpen) => (
            <Button className={styles.button} onClick={onOpen}>
              <FaPlus />{' '}
              <span>{formatMessage(companiesPageMessages.newCompany)}</span>
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
