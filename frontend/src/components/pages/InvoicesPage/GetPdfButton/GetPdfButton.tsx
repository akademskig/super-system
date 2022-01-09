import { useMutation } from '@apollo/client'
import moment from 'moment'
import { useCallback, useState } from 'react'
import { FaFileDownload, FaFilePdf } from 'react-icons/fa'
import { ClipLoader } from 'react-spinners'
import { GET_PDF } from '../../../../apollo/api/invoices'
import { IInvoice } from '../../../../types/invoices.type'
import Button from '../../../common/Button'
import styles from './GetPdfButton.module.scss'

type Props = {
  invoice: Partial<IInvoice>
}
const GetPdfButton = ({ invoice }: Props) => {
  const [pdfUrl, setPdfUrl] = useState('')
  const [getPDF, { loading: pdfLoading }] = useMutation(GET_PDF, {
    errorPolicy: 'all',
  })
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
    <div className={styles.root}>
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
          download={`${invoice.invoiceNumber}/${moment().format('DD-MM-yyyy')}`}
        >
          <Button className={styles.deleteButton} link>
            <FaFileDownload className={styles.trashIcon} />
          </Button>
        </a>
      )}
    </div>
  )
}
export default GetPdfButton
