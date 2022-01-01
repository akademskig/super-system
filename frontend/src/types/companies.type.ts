import { IClient } from './clients.type'

export interface ICompany {
  id: string
  name: string
  street: string
  city: string
  zipCode: string
  vatId: string
  country: string
  email: string
  phoneNumber: string
}
export interface ICompanyInvoiceSettings extends ICompany {
  invoiceSettings: InvoiceSettings
  clients: IClient[]
}
export interface InvoiceSettings {
  serviceTypes: string[]
  paymentMethods: string[]
  baseCurrency: string
}
export interface InvoiceSettingsInput {
  id: string
  invoiceSettings: InvoiceSettings
}
export interface AddClientsInput {
  id: string
  clients: IClient[]
}
