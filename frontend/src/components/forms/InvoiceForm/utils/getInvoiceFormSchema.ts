import * as yup from 'yup'
import getSchemaFields from '../../../../utils/getSchemaFields'

import invoiceFormFields, { invoiceItemsFields } from '../invoiceFormFields'
const getInvoiceFormSchema = () => {
  const invoiceSchema = getSchemaFields(invoiceFormFields)
  const invoiceItemShape = getSchemaFields(invoiceItemsFields)
  const invoiceItemsShape = yup.object().shape(invoiceItemShape)
  const invoiceItemsSchema = yup.array().of(invoiceItemsShape)
  invoiceSchema['items'] = invoiceItemsSchema
  return yup.object().shape(invoiceSchema)
}
export default getInvoiceFormSchema
