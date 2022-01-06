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
import useNextInvoiceNumber from '../../hooks/useNextInvoiceNumber'
import { ClipLoader } from 'react-spinners'

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
  const { invoiceNumber } = useNextInvoiceNumber(watch('company') as string)

  const { fields, append, remove } = useFieldArray<
    Record<string, InvoiceItems[]>
  >({
    control: control as Control<Record<string, InvoiceItems[]>>,
    name: 'items',
  })
  const { formatNumber } = useIntl()
  const { onSubmit, loading } = useInvoiceForm(type)
  const { calculatePrice, calculateItemTotal } = useCalculatePrice()
  const { baseCurrency } = useBaseCurrency(watch('company') as string)
  const invoiceItems = watch('items') as InvoiceItems[]
  const currency = watch('currency') as string
  const notes = watch('notes') as string
  const price = watch('price') as Price
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

  const { exchangeRate, exchangePrice, getExchangeRate, getExchangePrice } =
    useExchangeRates(
      watch('currency') as string,
      baseCurrency,
      watch('price.gross') as number
    )

  const addExchangePrices = useCallback(
    async (exchangeRate) => {
      const price = await calculatePrice(getValues().items)
      const exchange = {
        net: getExchangePrice(price.net, exchangeRate),
        gross: getExchangePrice(price.gross, exchangeRate),
        tax: getExchangePrice(price.tax, exchangeRate),
      }
      const priceWithExchange = { ...price, exchange }
      register('price').onChange({
        target: {
          value: omit(priceWithExchange, ['__typename']),
          name: 'price',
        },
      })
      invoiceItems.map(async (item, idx) => {
        const total = await calculateItemTotal(item)
        const totalWithExchangePrice = {
          ...total,
          exchange: {
            net: getExchangePrice(total.net, exchangeRate),
            gross: getExchangePrice(total.gross, exchangeRate),
            tax: getExchangePrice(total.tax, exchangeRate),
          },
        }
        register(`items[${idx}].total`).onChange({
          target: {
            value: omit(totalWithExchangePrice, ['__typename']),
            name: `items[${idx}].total`,
          },
        })
      })
    },
    [
      calculateItemTotal,
      calculatePrice,
      getExchangePrice,
      getValues,
      invoiceItems,
      register,
    ]
  )
  const removeExchangePrices = useCallback(() => {
    register('price').onChange({
      target: { value: omit(price, ['exchange']), name: 'price' },
    })
    invoiceItems.map((item, idx) => {
      return register(`items[${idx}].total`).onChange({
        target: {
          value: omit(invoiceItems[idx].total, ['exchange']),
          name: `items[${idx}].total`,
        },
      })
    })
  }, [invoiceItems, price, register])

  const onWatch = useCallback(
    async ({ target: { value, name } }) => {
      const price = await calculatePrice(getValues().items)
      const found = name.match(/[0-9]/)
      if (found) {
        const item = invoiceItems[found[0]]
        const total = await calculateItemTotal(item)
        register(`items[${found[0]}].total`).onChange({
          target: {
            value: omit(total, ['__typename']),
            name: `items[${found[0]}].total`,
          },
        })
      }
      register('price').onChange({
        target: { value: omit(price, ['__typename']), name: 'price' },
      })
      if (currency !== baseCurrency) {
        addExchangePrices(exchangeRate)
      }
      const hasTax = (invoiceItems as InvoiceItems[]).some(
        (item) => Number(item.tax) > 0
      )
      setHasTax(hasTax)
    },
    [
      addExchangePrices,
      baseCurrency,
      calculateItemTotal,
      calculatePrice,
      currency,
      exchangeRate,
      getValues,
      invoiceItems,
      register,
    ]
  )

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
        addExchangePrices(exchangeRateCurrent)
        register('notes').onChange({
          target: {
            value: (notes || '').concat(newString),
            name: 'notes',
          },
        })
      } else {
        removeExchangePrices()
        return register('notes').onChange({
          target: {
            value: (notes || '').replace(newString, ''),
            name: 'notes',
          },
        })
      }
    },
    [
      addExchangePrices,
      baseCurrency,
      formatNumber,
      getExchangeRate,
      notes,
      register,
      removeExchangePrices,
    ]
  )

  useEffect(() => {
    register('invoiceNumber').onChange({
      target: { value: invoiceNumber, name: 'invoiceNumber' },
    })
  }, [invoiceNumber, register])
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
                        label={'Client'}
                        setDefault
                        companyId={watch('company') as string}
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
                        value={watch('notes') as string}
                        autoExpand
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
                      defaultValue={id === 'invoiceNumber' ? invoiceNumber : ''}
                      key={idx}
                      classes={{
                        root: `col-lg-${width}`,
                        label: required ? styles.labelRequired : '',
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
                          } else if (id === 'total') {
                            return (
                              <div
                                className={classNames(
                                  styles.invoiceItemPriceItem,
                                  'justify-content-end'
                                )}
                              >
                                <span>
                                  <div>
                                    <label>Total price: </label>
                                    {formatNumber(
                                      (watch(`items[${index}].total`) as Price)
                                        ?.gross || 0,
                                      {
                                        style: 'currency',
                                        currency:
                                          (watch('currency') as string) ||
                                          'HRK',
                                      }
                                    )}
                                  </div>
                                  {baseCurrency !== currency && (
                                    <div>
                                      (
                                      {formatNumber(
                                        (
                                          watch(
                                            `items[${index}].total`
                                          ) as Price
                                        )?.exchange?.gross || 0,
                                        {
                                          style: 'currency',
                                          currency: baseCurrency || 'HRK',
                                        }
                                      )}
                                      )
                                    </div>
                                  )}
                                </span>

                                {!!(watch(`items[${index}].total`) as Price)
                                  ?.tax && (
                                  <span>
                                    <div className={classNames()}>
                                      <label>Tax: </label>
                                      {formatNumber(
                                        (
                                          watch(
                                            `items[${index}].total`
                                          ) as Price
                                        )?.tax || 0,
                                        {
                                          style: 'currency',
                                          currency:
                                            (watch('currency') as string) ||
                                            'HRK',
                                        }
                                      )}
                                    </div>
                                    {baseCurrency !== currency && (
                                      <div>
                                        (
                                        {formatNumber(
                                          (
                                            watch(
                                              `items[${index}].total`
                                            ) as Price
                                          )?.exchange?.tax || 0,
                                          {
                                            style: 'currency',
                                            currency: baseCurrency || 'HRK',
                                          }
                                        )}
                                        )
                                      </div>
                                    )}
                                  </span>
                                )}
                              </div>
                            )
                          }
                          return (
                            <div className={`col-lg-${width}`}>
                              <Input
                                key={idx}
                                defaultValue={fieldType === 'number' ? 0 : ''}
                                classes={{
                                  label: required ? styles.labelRequired : '',
                                }}
                                watch={onWatch}
                                label={label}
                                {...register(`items[${index}][${id}]`)}
                                error={
                                  (
                                    errors?.items as Record<
                                      string,
                                      FieldError
                                    >[]
                                  )?.[index]?.[id]
                                }
                                type={fieldType || 'text'}
                              />
                              {id === 'price' && baseCurrency !== currency && (
                                <span>
                                  (
                                  {formatNumber(
                                    (watch(
                                      `items[${index}][${id}]`
                                    ) as unknown as number) * exchangeRate,
                                    {
                                      style: 'currency',
                                      currency: baseCurrency || 'HRK',
                                    }
                                  )}
                                  )
                                </span>
                              )}
                            </div>
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
                    currencyDisplay: 'narrowSymbol',
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
                {formatNumber((watch('price') as Price)?.tax, {
                  style: 'currency',
                  currency: (watch('currency') as string) || 'HRK',
                })}
              </span>
            </div>
          )}
        </div>
        <Button className={styles.button} type="submit">
          {loading ? <ClipLoader size={25} color="white" /> : 'Save'}
        </Button>
      </form>
    </div>
  )
}

export default InvoiceForm
