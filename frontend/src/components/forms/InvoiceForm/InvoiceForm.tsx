import { useCallback, useEffect, useState } from 'react'
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
import useBaseCurrency from '../../hooks/useBaseCurrency'
import useExchangeRates from '../../hooks/useExchangeRates'
import { GET_COMPANY } from '../../../apollo/api/companies'
import { useQuery } from '@apollo/client'

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
  const { baseCurrency } = useBaseCurrency(watch('company') as string)
  const invoiceItems = watch('items')

  const [hasTax, setHasTax] = useState(
    (invoiceItems as InvoiceItems[]).some((item) => Number(item.tax) > 0)
  )
  const { data } = useQuery(GET_COMPANY, {
    variables: { id: watch('company') },
    skip: !watch('company'),
  })
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
    async ({ target: { value, name } }) => {
      const price = await calculatePrice(getValues().items)
      register('price').onChange({
        target: { value: omit(price, ['__typename']), name: 'price' },
      })
      const invoiceItems = watch('items')
      const hasTax = (invoiceItems as InvoiceItems[]).some(
        (item) => Number(item.tax) > 0
      )
      setHasTax(hasTax)
    },
    [calculatePrice, getValues, register, setHasTax, watch]
  )
  const { exchangeRate, exchangePrice, getExchangeRate } = useExchangeRates(
    watch('currency') as string,
    baseCurrency,
    watch('price.gross') as number
  )
  const currency = watch('currency') as string
  const notes = watch('notes') as string
  const onWatchCurrency = useCallback(
    async ({ target: { value, name } }) => {
      const exchangeRateCurrent = await getExchangeRate({
        currency: value,
        baseCurrency,
      })
      const newString = `${
        notes?.length ? '\n' : ''
      }Preračunato po srednjem tečaju HNB-a (${formatNumber(1, {
        style: 'currency',
        currency: value || 'HRK',
      })} = ${formatNumber(exchangeRateCurrent, {
        style: 'currency',
        currency: baseCurrency || 'HRK',
      })})`
      if (value !== baseCurrency) {
        return register('notes').onChange({
          target: {
            value: (notes || '').concat(newString),
            name: 'notes',
          },
        })
      } else {
        return register('notes').onChange({
          target: {
            value: (notes || '').replace(newString, ''),
            name: 'notes',
          },
        })
      }
    },
    [baseCurrency, formatNumber, getExchangeRate, notes, register]
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
                        setDefault
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
                        setDefault
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
                        autoExpand
                        value={notes}
                        defaultValue={(
                          data?.company?.invoiceSettings?.notes || []
                        ).join('\n')}
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
                                value={
                                  watch(`items[${index}][${id}]`) as string
                                }
                                defaultValue={watch('serviceType') as string}
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
                          } else if (id === 'unit') {
                            return (
                              <InvoiceSettingsSelect
                                field={'units'}
                                label={label}
                                setDefault
                                value={
                                  watch(`items[${index}][${id}]`) as string
                                }
                                companyId={watch('company') as string}
                                key={idx}
                                classes={{
                                  root: `col-lg-${width}`,
                                  label: styles.labelRequired,
                                }}
                                {...register(`items[${index}][${id}]`)}
                                error={errors[`items[${index}][${id}]`]}
                              />
                            )
                          }
                          return (
                            <Input
                              key={idx}
                              defaultValue={fieldType === 'number' ? 0 : ''}
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
        </div>
        {uniq(rowsBottom)
          .sort()
          .map((row, idx) => (
            <div className={'row justify-content-end'} key={idx}>
              {invoiceFormFields.bottom
                .filter((field) => field.row === row)
                .map(({ label, id, width }, idx, arr) => {
                  if (id === 'currency') {
                    return (
                      <CurrencySelect
                        watch={onWatchCurrency}
                        defaultValue={baseCurrency}
                        label={label}
                        value={watch(id) as string}
                        key={idx}
                        classes={{
                          root: classNames(
                            styles.currencySelectRoot,
                            `col-lg-${width}`
                          ),
                          label: styles.labelRequired,
                        }}
                        {...register(id)}
                        error={errors[id]}
                      />
                    )
                  }
                  return null
                })}
            </div>
          ))}
        <div className={classNames(styles.price)}>
          <div className="row justify-content-end align-items-start">
            {baseCurrency !== watch('currency') && (
              <span className={classNames(styles.priceItem, 'col-5')}>
                <label>In {baseCurrency}</label>
                {formatNumber(exchangePrice, {
                  style: 'currency',
                  currency: baseCurrency || 'HRK',
                })}
                <div>
                  (
                  {formatNumber(1, {
                    style: 'currency',
                    currency: currency || 'HRK',
                  })}{' '}
                  ={' '}
                  {formatNumber(exchangeRate, {
                    style: 'currency',
                    currency: baseCurrency || 'HRK',
                  })}
                  )
                </div>
              </span>
            )}
            <span className={classNames(styles.priceItem, 'col-3')}>
              <label>Total price </label>
              {formatNumber((watch('price') as Price)?.gross, {
                style: 'currency',
                currency: (watch('currency') as string) || 'HRK',
              })}
            </span>
          </div>
          {hasTax && (
            <div className="row justify-content-end">
              <span className={classNames(styles.priceItem, 'col-3')}>
                <label>Net </label>
                {formatNumber((watch('price') as Price)?.net, {
                  style: 'currency',
                  currency: (watch('currency') as string) || 'HRK',
                })}
              </span>
              <span className={classNames(styles.priceItem, 'col-3')}>
                <label>Tax </label>
                {formatNumber(
                  (watch('price') as Price)?.gross -
                    (watch('price') as Price)?.net,
                  {
                    style: 'currency',
                    currency: (watch('currency') as string) || 'HRK',
                  }
                )}
              </span>
            </div>
          )}
        </div>
        <Button className={styles.button} type="submit">
          Save
        </Button>
      </form>
    </div>
  )
}

export default InvoiceForm
