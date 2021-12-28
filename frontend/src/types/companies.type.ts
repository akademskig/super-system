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
}
export interface InvoiceSettings {
  serviceTypes: string[]
}
export interface InvoiceSettingsInput extends InvoiceSettings {
  id: string
}
