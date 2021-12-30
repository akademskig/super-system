import { omit } from 'lodash'
import moment from 'moment'
import { IClient } from '../../../../types/clients.type'
import { ICompany } from '../../../../types/companies.type'
import { IInvoice, InvoiceItems, Price } from '../../../../types/invoices.type'

const getDefaultFormValues = (initialValues?: IInvoice) => {
  return {
    defaultValues: initialValues
      ? omit(
          Object.keys(initialValues).reduce((acc, key) => {
            if (key === 'client') {
              acc[key] = (initialValues[key] as IClient).id
            } else if (key === 'company') {
              acc[key] = (initialValues[key] as ICompany).id
            } else if (key === 'paymentDeadline' || key === 'shipmentDate') {
              acc[key] = moment(initialValues[key]).format('YYYY-MM-DD')
            } else if (key === 'date') {
              acc[key] = moment(initialValues[key]).format('YYYY-MM-DDThh:mm')
            } else if (key === 'price') {
              acc[key] = omit(initialValues[key], ['__typename']) as Price
            } else if (key === 'items') {
              acc[key] = (
                initialValues[key as keyof IInvoice] as InvoiceItems[]
              ).map((item) => omit(item, ['__typename'])) as InvoiceItems[]
            } else {
              acc[key] = initialValues[key as keyof IInvoice] as string
            }
            return acc
          }, {} as Record<string, string | InvoiceItems[] | Price>),
          ['__typename', 'createdAt']
        )
      : {
          shipmentDate: moment().add(30, 'days').format('YYYY-MM-DD'),
          paymentDeadline: moment().add(30, 'days').format('YYYY-MM-DD'),
          date: moment().format('YYYY-MM-DDThh:mm'),
        },
  }
}
export default getDefaultFormValues
