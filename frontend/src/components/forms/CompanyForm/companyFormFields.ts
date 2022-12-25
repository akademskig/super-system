const companyFormFields = [
  {
    label: 'Name',
    id: 'name',
    required: true,
    row: 1,
    width: 7,
  },
  {
    label: 'Street',
    id: 'street',
    required: true,
    width: 5,
    row: 2,
  },
  {
    label: 'Country',
    id: 'country',
    required: true,
    width: 5,
    row: 3,
  },
  {
    label: 'City',
    id: 'city',
    required: true,
    width: 4,
    row: 2,
  },
  {
    label: 'Zip Code',
    id: 'zipCode',
    required: true,
    width: 3,
    row: 2,
  },
  {
    label: 'VAT ID',
    id: 'vatId',
    required: true,
    row: 1,
    width: 5,
  },
  {
    label: 'Email',
    id: 'email',
    required: true,
    row: 4,
    width: 6,
    fieldType: 'email',
  },
  {
    label: 'Phone number (+385...)',
    id: 'phoneNumber',
    fieldType: 'phone',
    row: 4,
    width: 6,
  },
  {
    label: 'IBAN',
    id: 'iban',
    fieldType: 'iban',
    row: 5,
    required: true,
    width: 6,
  },
]

export default companyFormFields
