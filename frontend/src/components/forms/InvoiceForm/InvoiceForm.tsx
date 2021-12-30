import { useCallback, useEffect } from 'react'
import { Control, FieldError, useFieldArray, useForm } from 'react-hook-form'
import classNames from 'classnames'
import { FaMinus, FaPlus } from 'react-icons/fa'
import Button from '../../common/Button'
import Input from '../../common/Input'
import styles from './InvoiceForm.module.scss'
import Textarea from '../../common/Textarea'
import ClientSelect from './ClientSelect'
import InvoiceTypeSelect from './InvoiceTypeSelect'
import CompanySelect from './CompanySelect'
import invoiceFormFields, { invoiceItemsFields } from './invoiceFormFields'
import { omit, uniq } from 'lodash'
import { IInvoice, InvoiceItems, Price } from '../../../types/invoices.type'
import { yupResolver } from '@hookform/resolvers/yup'
import useInvoiceForm, { FormTypes } from '../../hooks/useInvoiceForm'
import getInvoiceFormSchema from './utils/getInvoiceFormSchema'
import getDefaultFormValues from './utils/getDefaultFormValues'
import InvoiceSettingsSelect from './InvoiceSettingsSelect'
import CurrencySelect from './CurrencySelect'
import useCalculatePrice from '../../hooks/useCalculatePrice'
import { useIntl } from 'react-intl'

const rowsTop = invoiceFormFields.top.map((field) => field.row)
const rowsBottom = invoiceFormFields.bottom.map((field) => field.row)
const rowsItems = invoiceItemsFields.map((field) => field.row)

const schema = getInvoiceFormSchema()
type Props = {
  onCloseModal?: () => void
  type: FormTypes
  initialValues?: IInvoice
}

const InvoiceForm = ({ type, onCloseModal, initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    ...getDefaultFormValues(initialValues),
  })
  const { fields, append, remove } = useFieldArray<
    Record<string, InvoiceItems[]>
  >({
    control: control as Control<Record<string, InvoiceItems[]>>,
    name: 'items',
  })
  const { formatNumber } = useIntl()
  const { onSubmit } = useInvoiceForm(type)
  const { calculatePrice } = useCalculatePrice()

  const submitHandler = useCallback(
    async (values) => {
      const res = await onSubmit(values)
      if (res) {
        onCloseModal && onCloseModal()
      }
    },
    [onCloseModal, onSubmit]
  )
  useEffect(() => {
    if (fields.length === 0) {
      append({})
    }
  }, [append, fields.length])

  const onWatch = useCallback(
    async ({ name, value }) => {
      const price = await calculatePrice(getValues().items)
      console.log(price)
      register('price').onChange({
        target: { value: omit(price, ['__typename']), name: 'price' },
      })
    },
    [calculatePrice, getValues, register]
  )

  return (
    <div className={styles.root}>
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="row">
          <p>Marked fields (*) are required</p>
        </div>
        {uniq(rowsTop)
          .sort()
          .map((row, idx) => (
            <div className={'row'} key={idx}>
              {invoiceFormFields.top
                .filter((field) => field.row === row)
                .map(({ label, id, required, width, fieldType }, idx, arr) => {
                  if (id === 'company') {
                    return (
                      <CompanySelect
                        value={watch(id) as string}
                        key={idx}
                        classes={{
                          root: `col-lg-${width}`,
                          label: styles.labelRequired,
                        }}
                        {...register(id)}
                        error={errors[id]}
                      />
                    )
                  } else if (id === 'client') {
                    return (
                      <ClientSelect
                        value={watch(id) as string}
                        key={idx}
                        classes={{
                          root: `col-lg-${width}`,
                          label: styles.labelRequired,
                        }}
                        {...register(id)}
                        error={errors[id]}
                      />
                    )
                  } else if (id === 'invoiceType') {
                    return (
                      <InvoiceTypeSelect
                        value={watch(id) as string}
                        key={idx}
                        classes={{
                          root: `col-lg-${width}`,
                          label: styles.labelRequired,
                        }}
                        {...register(id)}
                        error={errors[id]}
                      />
                    )
                  } else if (id === 'serviceType' || id === 'paymentMethod') {
                    return (
                      <InvoiceSettingsSelect
                        label={label}
                        value={watch(id) as string}
                        companyId={watch('company') as string}
                        key={idx}
                        classes={{
                          root: `col-lg-${width}`,
                          label: styles.labelRequired,
                        }}
                        {...register(id)}
                        error={errors[id]}
                      />
                    )
                  } else if (id === 'notes') {
                    return (
                      <Textarea
                        key={idx}
                        classes={{
                          root: classNames('col-lg-12', styles.textarea),
                        }}
                        {...register(`notes`)}
                        label={'Notes'}
                      />
                    )
                  }
                  return (
                    <Input
                      key={idx}
                      classes={{
                        root: `col-lg-${width}`,
                        label: required ? styles.labelRequired : '',
                      }}
                      {...{
                        withMessage:
                          (fieldType === 'email' &&
                            (errors[id as keyof IInvoice] as FieldError)
                              ?.type === 'email') ||
                          (fieldType === 'phone' &&
                            (errors[id as keyof IInvoice] as FieldError)
                              ?.type === 'matches'),
                      }}
                      label={label}
                      {...register(id as keyof IInvoice)}
                      error={errors[id as keyof IInvoice]}
                      type={fieldType || 'text'}
                    />
                  )
                })}
            </div>
          ))}
        <div className={classNames('row', styles.accountItems)}>
          <div className={styles.accountItemsHeader}>
            <h5>Invoice Items</h5>
            <Button
              className={styles.addNewButton}
              type="button"
              onClick={() => append({})}
            >
              <FaPlus />
            </Button>
          </div>
          {fields.map((field, index) => (
            <div className={classNames(styles.accountItem)} key={field.id}>
              <Button
                className={styles.buttonMinus}
                link
                type="button"
                onClick={() => fields.length > 1 && remove(index)}
              >
                <FaMinus />
              </Button>
              {uniq(rowsItems)
                .sort()
                .map((row, idx) => (
                  <div className={'row'} key={idx}>
                    {invoiceItemsFields
                      .filter((field) => field.row === row)
                      .map(
                        (
                          { label, id, required, width, fieldType },
                          idx,
                          arr
                        ) => {
                          if (id === 'description') {
                            return (
                              <Textarea
                                error={
                                  (
                                    errors?.items as Record<
                                      string,
                                      FieldError
                                    >[]
                                  )?.[index]?.[id]
                                }
                                key={idx}
                                classes={{
                                  root: classNames(
                                    `col-lg-${width}`,
                                    styles.textarea
                                  ),
                                  label: classNames({
                                    [styles.labelRequired]: required,
                                  }),
                                }}
                                {...register(`items[${index}][${id}]`)}
                                label={label}
                              />
                            )
                          }
                          return (
                            <Input
                              key={idx}
                              classes={{
                                root: `col-lg-${width}`,
                                label: required ? styles.labelRequired : '',
                              }}
                              watch={onWatch}
                              label={label}
                              {...register(`items[${index}][${id}]`)}
                              error={
                                (
                                  errors?.items as Record<string, FieldError>[]
                                )?.[index]?.[id]
                              }
                              type={fieldType || 'text'}
                            />
                          )
                        }
                      )}
                  </div>
                ))}
            </div>
          ))}
          {uniq(rowsBottom)
            .sort()
            .map((row, idx) => (
              <div className={'row'} key={idx}>
                {invoiceFormFields.bottom
                  .filter((field) => field.row === row)
                  .map(
                    ({ label, id, required, width, fieldType }, idx, arr) => {
                      if (id === 'currency') {
                        return (
                          <CurrencySelect
                            label={label}
                            value={watch(id) as string}
                            key={idx}
                            classes={{
                              root: `col-lg-${width}`,
                              label: styles.labelRequired,
                            }}
                            {...register(id)}
                            error={errors[id]}
                          />
                        )
                      }
                    }
                  )}
              </div>
            ))}
        </div>
        <div className={classNames(styles.price, 'row justify-content-end')}>
          <div className="col-lg-3">
            <span className={styles.priceItem}>
              <label>Net </label>
              {formatNumber((watch('price') as Price)?.net, {
                style: 'currency',
                currency: watch('currency') as string,
              })}
            </span>
          </div>
          <div className="col-lg-3">
            <span className={styles.priceItem}>
              <label>Gross </label>
              {formatNumber((watch('price') as Price)?.gross, {
                style: 'currency',
                currency: watch('currency') as string,
              })}
            </span>
          </div>
        </div>
        <Button className={styles.button} type="submit">
          Save
        </Button>
      </form>
    </div>
  )
}

export default InvoiceForm
