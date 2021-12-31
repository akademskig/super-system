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
  {
    labelTitle: 'Base currency',
    label: 'base currency',
    id: 'baseCurrency',
    fieldId: 'baseCurrency',
    row: 3,
    required: true,
    fieldType: 'select',
  },
  {
    labelTitle: 'Notes',
    label: 'note',
    id: 'notes',
    fieldId: 'note',
    row: 3,
    required: true,
    fieldType: 'array',
  },
  {
    labelTitle: 'Units',
    label: 'unit',
    id: 'units',
    fieldId: 'unit',
    row: 4,
    required: true,
    fieldType: 'array',
  },
]

export default invoiceSettingsFormFields
