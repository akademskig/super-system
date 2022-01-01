import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { uniq } from 'lodash'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../common/Button'
import { AddClientsInput } from '../../../types/companies.type'
import addClientFormFields from './invoiceSettingsFormFields'
import getErrorMessage from '../../../utils/getErrorMessage'
import { FormTypes } from '../../hooks/useClientForm'
import getSchemaFields from '../../../utils/getSchemaFields'

import styles from './AddClientForm.module.scss'
import { FaMinus, FaPlus } from 'react-icons/fa'
import ClientSelect from '../InvoiceForm/ClientSelect'
import useAddClientForm from '../../hooks/useAddClientForm'

const rows = addClientFormFields.map((field) => field.row)

const schemaFields = getSchemaFields(addClientFormFields)

const schema = yup.object().shape(schemaFields)

type Props = {
  onCloseModal?: () => void
  type: FormTypes
  initialValues?: AddClientsInput
}
const AddClientForm = ({ onCloseModal, type, initialValues }: Props) => {
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
    ...(initialValues
      ? {
          defaultValues: {
            clients: (initialValues?.clients || []).map((client) => ({
              label: client.name,
              value: client.id,
            })),
          },
        }
      : {
          serviceTypes: [],
        }),
  })
  const {
    register: registerField,
    watch: watchField,
    trigger,
    formState: { errors: errorsField },
  } = useForm()

  const { onSubmit, error } = useAddClientForm(type)

  const submitHandler = useCallback(
    async (values) => {
      const clients = values.clients.map((v: { value: string }) => v.value)
      const res = await onSubmit(clients, initialValues?.id)
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
      return async () =>
        (await trigger(fieldId)) &&
        register(id).onChange({
          target: {
            value: !value?.find(
              (v: { value?: string; label: string }) =>
                v.value === valueField.value
            )
              ? [...(value || []), valueField]
              : value,
            name: id,
          },
        })
    },
    [register, trigger, watch, watchField]
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
            addClientFormFields
              .filter((field) => field.row === row)
              .map(
                (
                  { label, labelTitle, id, required, fieldId, fieldType },
                  idx,
                  arr
                ) => (
                  <div className={classNames(styles.item, 'row')} key={idx}>
                    <h5 className={styles.itemTitle}>{labelTitle}</h5>{' '}
                    <>
                      <div className={classNames('col-6')}>
                        <div className={styles.fieldWithButton}>
                          <ClientSelect
                            returnLabel
                            value={watchField(fieldId)}
                            {...registerField(fieldId, { required })}
                            key={idx}
                            label={label}
                            error={errorsField[fieldId]}
                          />
                          <Button
                            className={styles.removeButton}
                            onClick={addField(id, fieldId)}
                            type="button"
                            disabled={!!errorsField[fieldId]}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                      <ul
                        className={classNames(styles.list, {
                          'col-12': id === 'notes',
                        })}
                      >
                        {fieldType === 'arrayOfObjects' &&
                          (getArrayValues(id) || []).map(
                            (
                              v: string | { label: string; value: string },
                              index: number
                            ) => (
                              <li key={index} className={styles.listItem}>
                                {typeof v === 'string' ? v : v.label}
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
                    </>
                  </div>
                )
              )
          )}
        <Button className={styles.button} type="submit">
          {' '}
          Save
        </Button>
      </form>
    </div>
  )
}

export default AddClientForm
