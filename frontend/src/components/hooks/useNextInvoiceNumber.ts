import { useQuery } from '@apollo/client'
import { GET_NEXT_INVOICE_NUMBER } from '../../apollo/api/invoices'

const useNextInvoiceNumber = (companyId?: string) => {
  const { data } = useQuery(GET_NEXT_INVOICE_NUMBER, {
    variables: { companyId },
    skip: !companyId,
    fetchPolicy: 'network-only',
  })
  return {
    invoiceNumber: data?.invoiceNumber,
  }
}
export default useNextInvoiceNumber
