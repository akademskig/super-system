import { defineMessages } from 'react-intl'

export const commonMessages = defineMessages({
  yes: {
    id: 'common.yes',
    defaultMessage: 'Yes',
  },
  no: {
    id: 'common.no',
    defaultMessage: 'No',
  },
  save: {
    id: 'common.save',
    defaultMessage: 'Save',
  },
  requiredNote: {
    id: 'common.requiredNote',
    defaultMessage: 'Marked fields (*) are required',
  },
})

export const invoicePageMessages = defineMessages({
  newInvoice: {
    id: 'InvoiceList.newInvoice',
    defaultMessage: 'New Invoice',
  },
  editInvoice: {
    id: 'InvoiceList.editInvoice',
    defaultMessage: 'Edit Invoice',
  },
  deleteInvoiceConfirm: {
    id: 'InvoiceList.deleteInvoiceConfirm',
    defaultMessage: 'Are you sure you want to delete this invoice?',
  },
})
export const clientsPageMessages = defineMessages({
  newClient: {
    id: 'ClientList.newClient',
    defaultMessage: 'New client',
  },
  editClient: {
    id: 'ClientList.editClient',
    defaultMessage: 'Edit Client',
  },
  deleteClientConfirm: {
    id: 'ClientList.deleteClientConfirm',
    defaultMessage: 'Are you sure you want to delete this client?',
  },
})
export const companiesPageMessages = defineMessages({
  newCompany: {
    id: 'CompanyList.newCompany',
    defaultMessage: 'New Client',
  },
  editCompany: {
    id: 'CompanyList.editCompany',
    defaultMessage: 'Edit Company',
  },
  deleteCompanyConfirm: {
    id: 'CompanyList.deleteCompanyConfirm',
    defaultMessage: 'Are you sure you want to delete this company?',
  },
  addClients: {
    id: 'CompanyList.addClients',
    defaultMessage: 'Add clients',
  },
  invoiceSettings: {
    id: 'CompanyList.invoiceSettings',
    defaultMessage: 'Invoice settings',
  },
})
export const invoiceFormMessages = defineMessages({
  requiredNote: {
    id: 'InvoiceForm.requiredNote',
    defaultMessage: 'Marked fields (*) are required',
  },
  company: {
    id: 'InvoiceForm.company',
    defaultMessage: 'Company',
  },
  client: {
    id: 'InvoiceForm.client',
    defaultMessage: 'Client',
  },
  serviceType: {
    id: 'InvoiceForm.serviceType',
    defaultMessage: 'Service type',
  },
  invoiceNumber: {
    id: 'InvoiceForm.invoiceNumber',
    defaultMessage: 'Invoice number',
  },
  invoiceType: {
    id: 'InvoiceForm.invoiceType',
    defaultMessage: 'Invoice type',
  },
  paymentMethod: {
    id: 'InvoiceForm.paymentMethod',
    defaultMessage: 'Payment method',
  },
  date: {
    id: 'InvoiceForm.date',
    defaultMessage: 'Invoice date',
  },
  paymentDeadline: {
    id: 'InvoiceForm.paymentDeadline',
    defaultMessage: 'Payment deadline',
  },
  shipmentDate: {
    id: 'InvoiceForm.shipmentDate',
    defaultMessage: 'Shipment date',
  },
  notes: {
    id: 'InvoiceForm.notes',
    defaultMessage: 'Notes',
  },
  invoiceItems: {
    id: 'InvoiceForm.invoiceItems',
    defaultMessage: 'Invoice items',
  },
  description: {
    id: 'InvoiceForm.description',
    defaultMessage: 'Description',
  },
  unit: {
    id: 'InvoiceForm.unit',
    defaultMessage: 'Unit',
  },
  price: {
    id: 'InvoiceForm.price',
    defaultMessage: 'Price',
  },
  amount: {
    id: 'InvoiceForm.amount',
    defaultMessage: 'Amount',
  },
  discount: {
    id: 'InvoiceForm.discount',
    defaultMessage: 'Discount',
  },
  tax: {
    id: 'InvoiceForm.tax',
    defaultMessage: 'Tax',
  },
  net: {
    id: 'InvoiceForm.net',
    defaultMessage: 'Net',
  },
  totalPrice: {
    id: 'InvoiceForm.totalPrice',
    defaultMessage: 'Total price',
  },
  currency: {
    id: 'InvoiceForm.currency',
    defaultMessage: 'Currency',
  },
})
export const clientFormMessages = defineMessages({
  name: {
    id: 'ClientForm.name',
    defaultMessage: 'Name',
  },
  vatId: {
    id: 'ClientForm.vatId',
    defaultMessage: 'VAT ID',
  },
  street: {
    id: 'ClientForm.street',
    defaultMessage: 'Street',
  },
  city: {
    id: 'ClientForm.city',
    defaultMessage: 'City',
  },
  zipCode: {
    id: 'ClientForm.zipCode',
    defaultMessage: 'Zip Code',
  },
  country: {
    id: 'ClientForm.country',
    defaultMessage: 'Country',
  },
})
export const companyFormMessages = defineMessages({
  name: {
    id: 'CompanyForm.name',
    defaultMessage: 'Name',
  },
  vatId: {
    id: 'CompanyForm.vatId',
    defaultMessage: 'VAT ID',
  },
  street: {
    id: 'CompanyForm.street',
    defaultMessage: 'Street',
  },
  city: {
    id: 'CompanyForm.city',
    defaultMessage: 'City',
  },
  zipCode: {
    id: 'CompanyForm.zipCode',
    defaultMessage: 'Zip Code',
  },
  country: {
    id: 'CompanyForm.country',
    defaultMessage: 'Country',
  },
  email: {
    id: 'CompanyForm.email',
    defaultMessage: 'Email',
  },
  phoneNumber: {
    id: 'CompanyForm.phoneNumber',
    defaultMessage: 'Phone number',
  },
  iban: {
    id: 'CompanyForm.iban',
    defaultMessage: 'IBAN',
  },
  uploadLogo: {
    id: 'CompanyForm.uploadLogo',
    defaultMessage: 'Upload Logo',
  },
})
export default defineMessages({
  dashboard: {
    id: 'Sidebar.dashboard',
    defaultMessage: 'Dashboard',
  },
  userSettings: {
    id: 'Sidebar.userSettings',
    defaultMessage: 'User Settings',
  },
  clients: {
    id: 'Sidebar.clients',
    defaultMessage: 'Clients',
  },
  invoices: {
    id: 'Sidebar.invoices',
    defaultMessage: 'Invoices',
  },
  companies: {
    id: 'Sidebar.companies',
    defaultMessage: 'Companies',
  },
  logout: {
    id: 'Toolbar.logout',
    defaultMessage: 'Logout',
  },
  signIn: {
    id: 'Toolbar.signIn',
    defaultMessage: 'sign In',
  },
  register: {
    id: 'Toolbar.register',
    defaultMessage: 'Register',
  },
})
