import { useQuery, useMutation } from '@apollo/client'
import moment from 'moment'
import { useCallback, useState } from 'react'
import {
  FaBuilding,
  FaFileDownload,
  FaFilePdf,
  FaPencilAlt,
} from 'react-icons/fa'
import {
  GET_INVOICES,
  GET_PDF,
  REMOVE_INVOICE,
} from '../../../../apollo/api/invoices'
import { IInvoice } from '../../../../types/invoices.type'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import InvoiceForm from '../../../forms/InvoiceForm'
import { FormTypes } from '../../../hooks/useClientForm'
import ConfirmModal from '../../../modals/ConfirmModal'
import styles from './InvoiceList.module.scss'
import EmptyList from '../../../common/EmptyList'

const InvoiceList = () => {
  const { data } = useQuery(GET_INVOICES)
  const [filenames, setFilenames] = useState<Record<string, string>>({})
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
  const [getPDF] = useMutation(GET_PDF, {
    errorPolicy: 'all',
  })
  const onDelete = useCallback(
    (id) => {
      return async () => removeInvoice({ variables: { id } })
    },
    [removeInvoice]
  )
  const onGetPDF = useCallback(
    (id) => {
      return async () => {
        const { data } = await getPDF({ variables: { id } })
        setFilenames((state) => ({
          ...state,
          [id]: `data:application/pdf;base64, ${data?.getPdf}`,
        }))
      }
    },
    [getPDF]
  )

  return (
    <ul className={styles.root}>
      {!data?.invoices.length && <EmptyList />}
      {(data?.invoices || []).map((invoice: IInvoice, idx: number) => (
        <li className={styles.clientListItem} key={idx}>
          <div className={styles.left}>
            <FaBuilding className={styles.buildingIcon} />
            <span>{invoice.client.name}</span> &nbsp; &#8226; &nbsp;
            <span>{invoice.company.name}</span> &nbsp; &#8226; &nbsp;
            <span>
              {moment(invoice?.date).format('DD/MM/YY, hh:mm:ss').toString()}
            </span>
          </div>
          <div className={styles.right}>
            <Button
              className={styles.deleteButton}
              link
              onClick={onGetPDF(invoice?.id)}
            >
              <FaFilePdf className={styles.trashIcon} />
            </Button>
            {filenames[invoice?.id] && (
              <a href={filenames[invoice?.id]} download={'test.pdf'}>
                <Button
                  className={styles.deleteButton}
                  link
                  onClick={onGetPDF(invoice?.id)}
                >
                  <FaFileDownload className={styles.trashIcon} />
                </Button>
              </a>
            )}
            <Modal
              title={'Edit Invoice'}
              trigger={(onOpen) => (
                <Button className={styles.deleteButton} link onClick={onOpen}>
                  <FaPencilAlt className={styles.trashIcon} />
                </Button>
              )}
            >
              <InvoiceForm type={FormTypes.UPDATE} initialValues={invoice} />
            </Modal>
            <ConfirmModal
              onConfirm={onDelete(invoice.id)}
              title={'Are you sure you want to delete this invoice?'}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
export default InvoiceList
