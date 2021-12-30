import { useQuery } from '@apollo/client'
import { GET_COMPANY } from '../../apollo/api/companies'

const useBaseCurrency = (companyId?: string) => {
  const { data } = useQuery(GET_COMPANY, {
    variables: { id: companyId },
    skip: !companyId,
  })
  return {
    baseCurrency: data?.company?.invoiceSettings?.baseCurrency,
  }
}
export default useBaseCurrency
