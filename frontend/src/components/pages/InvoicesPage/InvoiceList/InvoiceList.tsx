import { useQuery } from '@apollo/client'
import { GET_INVOICES } from '../../../../apollo/api/invoices'
import { IInvoice } from '../../../../types/invoices.type'
import styles from './InvoiceList.module.scss'
import EmptyList from '../../../common/EmptyList'
import Loader from '../../../common/Loader'
import InvoiceItem from './InvoiceItem'

const InvoiceList = () => {
  const { data, loading } = useQuery(GET_INVOICES)

  return (
    <ul className={styles.root}>
      {loading && <Loader />}
      {!data?.invoices.length && !loading && <EmptyList />}
      {(data?.invoices || []).map((invoice: IInvoice, idx: number) => (
        <InvoiceItem invoice={invoice} key={idx} />
      ))}
    </ul>
  )
}
export default InvoiceList
