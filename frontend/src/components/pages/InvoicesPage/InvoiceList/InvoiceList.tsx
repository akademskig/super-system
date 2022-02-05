import { useQuery } from '@apollo/client'
import { GET_INVOICES } from '../../../../apollo/api/invoices'
import { IInvoice } from '../../../../types/invoices.type'
import styles from './InvoiceList.module.scss'
import EmptyList from '../../../common/EmptyList'
import Loader from '../../../common/Loader'
import { useMemo } from 'react'
import {
  Column,
  TableInstance,
  usePagination,
  UsePaginationInstanceProps,
  useSortBy,
  useTable,
} from 'react-table'
import moment from 'moment'
import Table from '../../../common/Table'
import InvoiceActions from '../InvoiceActions'
import formatHeader from '../../../../utils/formatHeader'
import useScreenSize from '../../../hooks/useScreenSize'

const tableColumns = ['invoiceNumber', 'client', 'company', 'date']
const hiddenColumnsKeys = ['company', 'date']

const InvoiceList = () => {
  const { data, loading } = useQuery(GET_INVOICES)
  const { width } = useScreenSize()
  const isSmall = useMemo(() => width < 700, [width])

  const hiddenColumns = useMemo(
    () => (isSmall ? hiddenColumnsKeys : []),
    [isSmall]
  )

  const { columns, tableData } = useMemo(() => {
    const columns: Column<object>[] = Object.keys(data?.invoices?.[0] || {})
      .filter((key) => tableColumns.includes(key))
      .map((key) => ({
        Header: formatHeader(key),
        accessor: key,
      }))
    columns.push({
      Header: '',
      accessor: 'actions',
    })
    const tableData = (data?.invoices || []).map((invoice: IInvoice) => ({
      invoiceNumber: invoice.invoiceNumber,
      client: <span className={styles.td}>{invoice?.client?.name}</span>,
      company: invoice?.company?.name,
      date: moment(invoice?.date).format('DD/MM/YY, hh:mm:ss').toString(),
      actions: <InvoiceActions invoice={invoice} />,
    }))
    return {
      columns,
      tableData,
    }
  }, [data?.invoices])

  const tableInstance = useTable(
    { columns, data: tableData, initialState: { hiddenColumns } },
    useSortBy,
    usePagination
  ) as TableInstance<object> & UsePaginationInstanceProps<any>
  return (
    <>
      {loading && <Loader />}
      {!Boolean(data?.invoices.length) && !loading && <EmptyList />}
      {Boolean(data?.invoices?.length) && (
        <Table tableInstance={tableInstance} />
      )}
    </>
  )
}
export default InvoiceList
