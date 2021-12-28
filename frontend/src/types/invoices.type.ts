import { IClient } from './clients.type'
import { ICompany } from './companies.type'

export enum InvoiceTypes {
  R = 'R',
  R1 = 'R1',
  R2 = 'R2',
  NONE = 'none',
  ADVANCE = 'advance',
}
export interface IInvoice {
  id: string
  company: ICompany
  client: IClient
  serviceType: string
  invoiceNumber: string
  invoiceType: InvoiceTypes
  date: Date
  createdAt: Date
  paymentDeadline: Date
  shipmentDate: Date
  items: InvoiceItems[]
}
export type InvoiceItems = {
  description: string
}
