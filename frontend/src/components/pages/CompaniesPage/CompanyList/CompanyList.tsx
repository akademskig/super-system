import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FaBuilding, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { GET_COMPANIES, REMOVE_COMPANY } from '../../../../apollo/api/companies'
import { ICompany } from '../../../../types/companies.type'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import CompanyForm from '../../../forms/CompanyForm'
import { FormTypes } from '../../../hooks/useClientForm'
import styles from './CompanyList.module.scss'

const CompanyList = () => {
  const { data } = useQuery(GET_COMPANIES)

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
      {(data?.companies || []).map((company: ICompany, idx: number) => (
        <li className={styles.clientListItem} key={idx}>
          <div className={styles.left}>
            <FaBuilding className={styles.buildingIcon} />
            <span>{company?.name}</span>
          </div>
          <div className={styles.right}>
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
      ))}
    </ul>
  )
}
export default CompanyList
