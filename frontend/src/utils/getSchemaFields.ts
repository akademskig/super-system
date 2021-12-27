import * as yup from 'yup'

import { phoneRegExpNotRequired } from '../config/fieldRegex'

const getSchemaFields = (formFields: any[]) => {
  const schemaFields = formFields.reduce((acc, curr) => {
    let field = yup.string()
    if (curr.fieldType === 'email') {
      field = yup.string().email('Invalid email')
    }
    if (curr.fieldType === 'phone') {
      field = yup
        .string()
        .matches(phoneRegExpNotRequired, 'Phone number is not valid')
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
