const invoiceSettingsFormFields = [
  {
    labelTitle: 'Service types',
    label: 'service type',
    id: 'serviceTypes',
    fieldId: 'serviceType',
    row: 1,
    required: true,
    fieldType: 'array',
  },
  {
    labelTitle: 'Payment methods',
    label: 'payment method',
    id: 'paymentMethods',
    fieldId: 'paymentMethod',
    row: 2,
    required: true,
    fieldType: 'array',
  },
]

export default invoiceSettingsFormFields
