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
  totalPrice: {
    id: 'InvoiceForm.totalPrice',
    defaultMessage: 'Total price',
  },
  currency: {
    id: 'InvoiceForm.currency',
    defaultMessage: 'Currency',
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
