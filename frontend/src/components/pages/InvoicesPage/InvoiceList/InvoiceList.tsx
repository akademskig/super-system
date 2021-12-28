import { useQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import { useCallback } from 'react'
import { FaBuilding, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { REMOVE_COMPANY } from '../../../../apollo/api/companies'
import { GET_INVOICES, REMOVE_INVOICE } from '../../../../apollo/api/invoices'
import { IInvoice } from '../../../../types/invoices.type'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import InvoiceForm from '../../../forms/InvoiceForm'
import { FormTypes } from '../../../hooks/useClientForm'
import styles from './InvoiceList.module.scss'

const InvoiceList = () => {
  const { data } = useQuery(GET_INVOICES)

  const [removeInvoice] = useMutation(REMOVE_INVOICE, {
    errorPolicy: 'all',
    update(cache, { data }) {
      const normalizedId = cache.identify({
        id: data.removeInvoice.id,
        __typename: 'Invoice',
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
  })
  const onDelete = useCallback(
    (id) => {
      return async () => removeInvoice({ variables: { id } })
    },
    [removeInvoice]
  )
  return (
    <ul className={styles.root}>
      {(data?.invoices || []).map((invoice: IInvoice, idx: number) => (
        <li className={styles.clientListItem} key={idx}>
          <div className={styles.left}>
            <FaBuilding className={styles.buildingIcon} />
            <span>{invoice.client.name}</span> &nbsp; &#8226; &nbsp;
            <span>{invoice.company.name}</span> &nbsp; &#8226; &nbsp;
            <span>
              {moment(invoice?.createdAt)
                .format('DD/MM/YY, hh:mm:ss')
                .toString()}
            </span>
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
              <InvoiceForm type={FormTypes.UPDATE} initialValues={invoice} />
            </Modal>
            <Button
              className={styles.deleteButton}
              link
              onClick={onDelete(invoice?.id)}
            >
              <FaTrash className={styles.trashIcon} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default InvoiceList
