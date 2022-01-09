import { useMutation } from '@apollo/client'
import moment from 'moment'
import { useCallback, useState } from 'react'
import {
  FaBuilding,
  FaFileDownload,
  FaFilePdf,
  FaPencilAlt,
} from 'react-icons/fa'
import { GET_PDF, REMOVE_INVOICE } from '../../../../apollo/api/invoices'
import { IInvoice } from '../../../../types/invoices.type'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import InvoiceForm from '../../../forms/InvoiceForm'
import { FormTypes } from '../../../hooks/useClientForm'
import ConfirmModal from '../../../modals/ConfirmModal'
import styles from './InvoiceItem.module.scss'
import { useIntl } from 'react-intl'
import { invoicePageMessages } from '../../../../lang/messages.lang'
import { ClipLoader } from 'react-spinners'
import classNames from 'classnames'

type Props = {
  invoice: IInvoice
}
const InvoiceItem = ({ invoice }: Props) => {
  const { formatMessage } = useIntl()
  const [pdfUrl, setPdfUrl] = useState('')
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
  const [getPDF, { loading: pdfLoading }] = useMutation(GET_PDF, {
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
        setPdfUrl(`data:application/pdf;base64, ${data?.getPdf}`)
      }
    },
    [getPDF]
  )
  return (
    <li className={classNames(styles.clientListItem, 'row')}>
      <div className={classNames(styles.left, 'col-lg-11')}>
        <span className={styles.clientName}>
          <FaBuilding className={styles.buildingIcon} />
          <span> {invoice.client.name} </span>
        </span>
        <span className={styles.companyName}>
          &nbsp;&#8226;&nbsp;{invoice.company.name}{' '}
        </span>
        <span className={styles.date}>
          &nbsp;&#8226;&nbsp;
          {moment(invoice?.date).format('DD/MM/YY, hh:mm:ss').toString()}
        </span>
      </div>
      <div className={classNames(styles.right, 'col-lg-1')}>
        <Button
          className={styles.deleteButton}
          link
          onClick={onGetPDF(invoice?.id)}
        >
          {!pdfLoading ? (
            <FaFilePdf className={styles.trashIcon} />
          ) : (
            <ClipLoader size={16} color="white" />
          )}
        </Button>
        {pdfUrl && (
          <a
            href={pdfUrl}
            download={`${invoice.invoiceNumber}/${moment().format(
              'DD-MM-yyyy'
            )}`}
          >
            <Button className={styles.deleteButton} link>
              <FaFileDownload className={styles.trashIcon} />
            </Button>
          </a>
        )}
        <Modal
          title={formatMessage(invoicePageMessages.editInvoice)}
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
          title={formatMessage(invoicePageMessages.deleteInvoiceConfirm)}
        />
      </div>
    </li>
  )
}
export default InvoiceItem
