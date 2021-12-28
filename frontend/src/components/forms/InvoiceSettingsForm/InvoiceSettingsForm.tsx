import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { omit, uniq } from 'lodash'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../common/Button'
import { InvoiceSettingsInput } from '../../../types/companies.type'
import Input from '../../common/Input'
import invoiceSettingsFormFields from './invoiceSettingsFormFields'
import getErrorMessage from '../../../utils/getErrorMessage'
import { FormTypes } from '../../hooks/useClientForm'
import getSchemaFields from '../../../utils/getSchemaFields'

import styles from './InvoiceSettingsForm.module.scss'
import { FaMinus, FaPlus } from 'react-icons/fa'
import useInvoiceSettingsForm from '../../hooks/useInvoiceSettingsForm'

const rows = invoiceSettingsFormFields.map((field) => field.row)

const schemaFields = getSchemaFields(invoiceSettingsFormFields)

const schema = yup.object().shape(schemaFields)

type Props = {
  onCloseModal?: () => void
  type: FormTypes
  initialValues?: InvoiceSettingsInput
}
const InvoiceSettingsForm = ({ onCloseModal, type, initialValues }: Props) => {
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    ...(initialValues
      ? { defaultValues: omit(initialValues, ['__typename']) }
      : {
          serviceTypes: [],
        }),
  })
  const {
    handleSubmit: handleFieldSubmit,
    register: registerField,
    watch: watchField,
    formState: { errors: errorsField },
  } = useForm({ mode: 'onChange' })

  const { onSubmit, error } = useInvoiceSettingsForm(type)

  const submitHandler = useCallback(
    async (values) => {
      const res = await onSubmit(values, initialValues?.id)
      if (res) {
        onCloseModal && onCloseModal()
      }
    },
    [initialValues?.id, onCloseModal, onSubmit]
  )

  const addField = useCallback(
    (id, fieldId) => {
      const value = watch(id)
      const valueField = watchField(fieldId)
      return () =>
        handleFieldSubmit((v) =>
          register(id).onChange({
            target: {
              value: !value?.includes(valueField)
                ? [...(value || []), valueField]
                : value,
              name: id,
            },
          })
        )()
    },
    [handleFieldSubmit, register, watch, watchField]
  )
  const removeField = useCallback(
    (id, index) => {
      const value = watch(id)
      return () =>
        register(id).onChange({
          target: {
            value: [...value.filter((v: string, idx: number) => index !== idx)],
            name: id,
          },
        })
    },
    [register, watch]
  )
  const getArrayValues = useCallback(
    (fieldName) => {
      return watch(fieldName)
    },
    [watch]
  )

  return (
    <div className={styles.root}>
      {error && !!getErrorMessage(error).length && (
        <div className={classNames(styles.error)}>
          {error &&
            getErrorMessage(error).map((errorMessage, idx) => (
              <div key={idx}>{errorMessage}</div>
            ))}
        </div>
      )}
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(submitHandler)}
      >
        {uniq(rows)
          .sort()
          .map((row, idx) =>
            invoiceSettingsFormFields
              .filter((field) => field.row === row)
              .map(({ label, id, required, fieldId, fieldType }, idx, arr) => (
                <div className={classNames(styles.item, 'row')} key={idx}>
                  <h5 className={styles.itemTitle}>{label}</h5>
                  <ul className={classNames(styles.list, 'col-lg-6')}>
                    {(getArrayValues(id) || []).map(
                      (v: string, index: number) => (
                        <li key={index} className={styles.listItem}>
                          {v}
                          <Button
                            className={styles.removeButton}
                            onClick={removeField(id, index)}
                            type="button"
                          >
                            <FaMinus />
                          </Button>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="col-lg-6">
                    <div className={styles.fieldWithButton}>
                      {' '}
                      <Input
                        {...registerField(fieldId, { required })}
                        key={idx}
                        label={'Add new service type'}
                        error={errorsField[id]}
                        type={fieldType || 'text'}
                      />
                      <Button
                        className={styles.removeButton}
                        onClick={addField(id, fieldId)}
                        type="button"
                        disabled={!!errorsField[id]}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
          )}
        <Button className={styles.button} type="submit">
          {' '}
          Save
        </Button>
      </form>
    </div>
  )
}

export default InvoiceSettingsForm
