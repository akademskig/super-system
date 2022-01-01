import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import {
  FaBuilding,
  FaFileInvoice,
  FaPencilAlt,
  FaTrash,
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
import styles from './CompanyList.module.scss'

const CompanyList = () => {
  const { data, loading } = useQuery(GET_COMPANIES)

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
      {(data?.companies || []).map(
        (company: ICompanyInvoiceSettings, idx: number) => (
          <li className={styles.clientListItem} key={idx}>
            <div className={styles.left}>
              <FaBuilding className={styles.buildingIcon} />
              <span>{company?.name}</span>
            </div>
            <div className={styles.right}>
              <Modal
                title={'Add clients'}
                trigger={(onOpen) => (
                  <Button
                    className={styles.deleteButton}
                    link
                    onClick={onOpen}
                    title="Add clients"
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
                title={'Invoice settings'}
                trigger={(onOpen) => (
                  <Button
                    className={styles.deleteButton}
                    link
                    onClick={onOpen}
                    title="Invoice settings"
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
                title={'Edit Company'}
                trigger={(onOpen) => (
                  <Button className={styles.deleteButton} link onClick={onOpen}>
                    <FaPencilAlt className={styles.trashIcon} />
                  </Button>
                )}
              >
                <CompanyForm type={FormTypes.UPDATE} initialValues={company} />
              </Modal>
              <Button
                className={styles.deleteButton}
                link
                onClick={onDelete(company?.id)}
              >
                <FaTrash className={styles.trashIcon} />
              </Button>
            </div>
          </li>
        )
      )}
    </ul>
  )
}
export default CompanyList
