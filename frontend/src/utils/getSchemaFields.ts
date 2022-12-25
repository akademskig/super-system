import * as yup from 'yup'
import { ibanRegex } from './fieldRegex'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// yup.addMethod(yup.string, 'isPhoneNumber', (errorMsg) => {

// })
const getSchemaFields = (formFields: any[]) => {
  const schemaFields = formFields.reduce((acc, curr) => {
    let field: yup.AnySchema = yup.string()
    if (curr.fieldType === 'email') {
      field = yup.string().email('Invalid email')
    }
    if (curr.fieldType === 'phone') {
      field = yup
        .string()
        .test('isPhoneNumber', 'Phone number is not valid', (value) => {
          if (!value) {
            return true
          } else {
            return !!parsePhoneNumberFromString(value)?.isValid()
          }
        })
    }
    if (curr.fieldType === 'number') {
      field = yup.number()
    }
    if (curr.fieldType === 'array') {
      field = yup.array().of(yup.string())
    }
    if (curr.fieldType === 'arrayOfObjects') {
      field = yup.array().of(yup.object())
    }
    if (curr.fieldType === 'object') {
      field = yup.object()
    }
    if (curr.fieldType === 'iban') {
      field = yup.string().matches(ibanRegex, 'Iban is not valid')
    }
    if (curr.required) {
      field = field.required()
    }
    acc[curr.id] = field
    return acc
  }, {} as Record<string, yup.AnySchema<string | undefined, any>>)
  return schemaFields
}
export default getSchemaFields
