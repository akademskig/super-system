import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import {
  FaBuilding,
  FaFileInvoice,
  FaPencilAlt,
  FaUserCog,
} from 'react-icons/fa'
import { GET_COMPANIES, REMOVE_COMPANY } from '../../../../apollo/api/companies'
import { ICompanyInvoiceSettings } from '../../../../types/companies.type'
import Button from '../../../common/Button'
import Loader from '../../../common/Loader'
import Modal from '../../../common/Modal'
import AddClientForm from '../../../forms/AddClientsForm/AddClientsForm'
import CompanyForm from '../../../forms/CompanyForm'
import InvoiceSettingsForm from '../../../forms/InvoiceSettingsForm'
import { FormTypes } from '../../../hooks/useClientForm'
import ConfirmModal from '../../../modals/ConfirmModal'
import styles from './CompanyList.module.scss'
import EmptyList from '../../../common/EmptyList'
import { companiesPageMessages } from '../../../../lang/messages.lang'
import { useIntl } from 'react-intl'

const CompanyList = () => {
  const { data, loading } = useQuery(GET_COMPANIES)
  const { formatMessage } = useIntl()
  const [deleteCompany] = useMutation(REMOVE_COMPANY, {
    errorPolicy: 'all',
    update(cache, { data }) {
      const normalizedId = cache.identify({
        id: data.removeCompany.id,
        __typename: 'Company',
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
  })
  const onDelete = useCallback(
    (id) => {
      return async () => deleteCompany({ variables: { id } })
    },
    [deleteCompany]
  )
  return (
    <ul className={styles.root}>
      {loading && <Loader />}
      {!data?.companies.length && <EmptyList />}
      {(data?.companies || []).map(
        (company: ICompanyInvoiceSettings, idx: number) => (
          <li className={styles.clientListItem} key={idx}>
            <div className={styles.left}>
              <FaBuilding className={styles.buildingIcon} />
              <span>{company?.name}</span>
            </div>
            <div className={styles.right}>
              <Modal
                title={formatMessage(companiesPageMessages.addClients)}
                trigger={(onOpen) => (
                  <Button
                    className={styles.deleteButton}
                    link
                    onClick={onOpen}
                    title={formatMessage(companiesPageMessages.addClients)}
                  >
                    <FaUserCog className={styles.trashIcon} />
                  </Button>
                )}
              >
                <AddClientForm
                  type={FormTypes.UPDATE}
                  initialValues={{
                    id: company.id,
                    clients: company.clients,
                  }}
                />
              </Modal>
              <Modal
                title={formatMessage(companiesPageMessages.invoiceSettings)}
                trigger={(onOpen) => (
                  <Button
                    className={styles.deleteButton}
                    link
                    onClick={onOpen}
                    title={formatMessage(companiesPageMessages.invoiceSettings)}
                  >
                    <FaFileInvoice className={styles.trashIcon} />
                  </Button>
                )}
              >
                <InvoiceSettingsForm
                  type={FormTypes.UPDATE}
                  initialValues={{
                    id: company.id,
                    invoiceSettings: company.invoiceSettings,
                  }}
                />
              </Modal>
              <Modal
                title={formatMessage(companiesPageMessages.editCompany)}
                trigger={(onOpen) => (
                  <Button className={styles.deleteButton} link onClick={onOpen}>
                    <FaPencilAlt className={styles.trashIcon} />
                  </Button>
                )}
              >
                <CompanyForm type={FormTypes.UPDATE} initialValues={company} />
              </Modal>
              <ConfirmModal
                onConfirm={onDelete(company.id)}
                title={'Are you sure you want to delete this company?'}
              />
            </div>
          </li>
        )
      )}
    </ul>
  )
}
export default CompanyList
