import { useCallback, useEffect, useMemo, useState } from 'react'
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
import PriceItem from './PriceItem'
import ReactDatePicker from 'react-datepicker'
import useLocale from '../../hooks/useLocale'
import { localesDateFormats } from '../../providers/LocaleProvider/LocaleProvider'
import {
  commonMessages,
  invoiceFormMessages,
} from '../../../lang/messages.lang'

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
  const { locale } = useLocale()
  const { formatNumber, formatMessage } = useIntl()
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
  const showExchangeRates = useMemo(
    () => baseCurrency && currency && baseCurrency !== currency,
    [baseCurrency, currency]
  )
  return (
    <div className={styles.root}>
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="row">
          <p>{formatMessage(invoiceFormMessages.requiredNote)}</p>
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
                        label={formatMessage(
                          invoiceFormMessages[
                            id as keyof typeof invoiceFormMessages
                          ]
                        )}
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
                        label={formatMessage(
                          invoiceFormMessages[
                            id as keyof typeof invoiceFormMessages
                          ]
                        )}
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
                        label={formatMessage(
                          invoiceFormMessages[
                            id as keyof typeof invoiceFormMessages
                          ]
                        )}
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
                        label={formatMessage(
                          invoiceFormMessages[
                            id as keyof typeof invoiceFormMessages
                          ]
                        )}
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
                        label={formatMessage(
                          invoiceFormMessages[
                            id as keyof typeof invoiceFormMessages
                          ]
                        )}
                        autoExpand
                        defaultValue={(
                          data?.company?.invoiceSettings?.notes || []
                        ).join('\n')}
                        key={idx}
                        classes={{
                          root: classNames('col-lg-12', styles.textarea),
                        }}
                        {...register(`notes`)}
                      />
                    )
                  } else if (
                    fieldType === 'date' ||
                    fieldType === 'datetime-local'
                  ) {
                    return (
                      <div className={`col-lg-${width}`} key={`${idx}-${id}`}>
                        <label>
                          {formatMessage(
                            invoiceFormMessages[
                              id as keyof typeof invoiceFormMessages
                            ]
                          )}
                        </label>
                        <ReactDatePicker
                          showTimeInput={fieldType === 'datetime-local'}
                          className={styles.datepicker}
                          dateFormat={
                            fieldType === 'datetime-local'
                              ? `${localesDateFormats[locale]},hh:mm`
                              : `${localesDateFormats[locale]}`
                          }
                          locale={locale}
                          selected={
                            (watch(id) || new Date()) as unknown as Date
                          }
                          onChange={(e) =>
                            register(id).onChange({
                              target: { value: e, name: id },
                            })
                          }
                        />
                      </div>
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
                      label={formatMessage(
                        invoiceFormMessages[
                          id as keyof typeof invoiceFormMessages
                        ]
                      )}
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
            <h5>{formatMessage(invoiceFormMessages.invoiceItems)}</h5>
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
                      .map(({ label, id, required, width, fieldType }, idx) => {
                        if (id === 'description') {
                          return (
                            <Textarea
                              defaultValue={watch('serviceType') as string}
                              error={
                                (
                                  errors?.items as Record<string, FieldError>[]
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
                              label={formatMessage(
                                invoiceFormMessages[
                                  id as keyof typeof invoiceFormMessages
                                ]
                              )}
                            />
                          )
                        } else if (id === 'unit') {
                          return (
                            <InvoiceSettingsSelect
                              field={'units'}
                              label={formatMessage(
                                invoiceFormMessages[
                                  id as keyof typeof invoiceFormMessages
                                ]
                              )}
                              setDefault
                              value={watch(`items[${index}][${id}]`) as string}
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
                              key={idx}
                              className={classNames(
                                styles.invoiceItemPriceItem,
                                'justify-content-end'
                              )}
                            >
                              <span>
                                <div>
                                  <PriceItem
                                    price={
                                      (watch(`items[${index}].total`) as Price)
                                        ?.gross || 0
                                    }
                                    currency={currency}
                                    label={formatMessage(
                                      invoiceFormMessages.totalPrice
                                    )}
                                  />
                                </div>
                                {showExchangeRates && (
                                  <div>
                                    (
                                    <PriceItem
                                      price={
                                        (
                                          watch(
                                            `items[${index}].total`
                                          ) as Price
                                        )?.exchange?.gross || 0
                                      }
                                      currency={baseCurrency}
                                    />
                                    )
                                  </div>
                                )}
                              </span>

                              {!!(watch(`items[${index}].total`) as Price)
                                ?.tax && (
                                <span key={`${idx}-tax`}>
                                  <div className={classNames()}>
                                    <PriceItem
                                      price={
                                        (
                                          watch(
                                            `items[${index}].total`
                                          ) as Price
                                        )?.tax || 0
                                      }
                                      currency={currency}
                                      label={formatMessage(
                                        invoiceFormMessages.tax
                                      )}
                                    />
                                  </div>
                                  {showExchangeRates && (
                                    <div>
                                      (
                                      <PriceItem
                                        price={
                                          (
                                            watch(
                                              `items[${index}].total`
                                            ) as Price
                                          )?.exchange?.tax || 0
                                        }
                                        currency={baseCurrency}
                                      />
                                      )
                                    </div>
                                  )}
                                </span>
                              )}
                              {!!(watch(`items[${index}].total`) as Price)
                                ?.tax && (
                                <span key={`${idx}-net`}>
                                  <div className={classNames()}>
                                    <PriceItem
                                      price={
                                        (
                                          watch(
                                            `items[${index}].total`
                                          ) as Price
                                        )?.net || 0
                                      }
                                      currency={currency}
                                      label={formatMessage(
                                        invoiceFormMessages.net
                                      )}
                                    />
                                  </div>
                                  {showExchangeRates && (
                                    <div>
                                      (
                                      <PriceItem
                                        price={
                                          (
                                            watch(
                                              `items[${index}].total`
                                            ) as Price
                                          )?.exchange?.net || 0
                                        }
                                        currency={baseCurrency}
                                      />
                                      )
                                    </div>
                                  )}
                                </span>
                              )}
                            </div>
                          )
                        }
                        return (
                          <div className={`col-lg-${width}`} key={idx}>
                            <Input
                              inputAdornment={
                                id === 'price'
                                  ? currency
                                  : id === 'tax'
                                  ? '%'
                                  : undefined
                              }
                              key={idx}
                              defaultValue={fieldType === 'number' ? 0 : ''}
                              classes={{
                                label: required ? styles.labelRequired : '',
                              }}
                              watch={onWatch}
                              label={formatMessage(
                                invoiceFormMessages[
                                  id as keyof typeof invoiceFormMessages
                                ]
                              )}
                              {...register(`items[${index}][${id}]`)}
                              error={
                                (
                                  errors?.items as Record<string, FieldError>[]
                                )?.[index]?.[id]
                              }
                              type={fieldType || 'text'}
                            />
                            {id === 'price' && showExchangeRates && (
                              <span key={`${idx}-price`}>
                                (
                                <PriceItem
                                  price={
                                    (watch(
                                      `items[${index}][${id}]`
                                    ) as unknown as number) * exchangeRate || 0
                                  }
                                  currency={baseCurrency}
                                />
                                )
                              </span>
                            )}
                          </div>
                        )
                      })}
                  </div>
                ))}
            </div>
          ))}
        </div>
        {uniq(rowsBottom)
          .sort()
          .map((row, idx) => (
            <div className={'row justify-content-between'} key={idx}>
              <div className={classNames(styles.exchangeRate, 'col-lg-5')}>
                <label>Exchange rate</label>
                <PriceItem price={1} currency={currency} /> {' = '}
                <PriceItem price={exchangeRate} currency={baseCurrency} />
              </div>
              {invoiceFormFields.bottom
                .filter((field) => field.row === row)
                .map(({ label, id, width }, idx, arr) => {
                  if (id === 'currency') {
                    return (
                      <CurrencySelect
                        setDefault
                        watch={onWatchCurrency}
                        defaultValue={baseCurrency}
                        label={formatMessage(
                          invoiceFormMessages[
                            id as keyof typeof invoiceFormMessages
                          ]
                        )}
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
          <div className={styles.invoiceItemPriceItem}>
            <span>
              <div>
                <PriceItem
                  price={price?.gross}
                  currency={currency}
                  label={formatMessage(invoiceFormMessages.totalPrice)}
                />
                <div>
                  {showExchangeRates && (
                    <div>
                      (
                      <PriceItem
                        price={exchangePrice}
                        currency={baseCurrency}
                      />
                      )
                    </div>
                  )}
                </div>
              </div>
            </span>
            {hasTax && (
              <>
                {' '}
                <span>
                  <PriceItem
                    price={price?.net}
                    currency={currency}
                    label={`Net`}
                  />
                  <div>
                    {showExchangeRates && (
                      <div>
                        (
                        <PriceItem
                          price={price?.net * exchangeRate}
                          currency={baseCurrency}
                        />
                        )
                      </div>
                    )}
                  </div>
                </span>
                <span>
                  <PriceItem
                    price={price?.tax}
                    currency={currency}
                    label={formatMessage(invoiceFormMessages.tax)}
                  />
                  <div>
                    {showExchangeRates && (
                      <div>
                        (
                        <PriceItem
                          price={price?.tax * exchangeRate}
                          currency={baseCurrency}
                        />
                        )
                      </div>
                    )}
                  </div>
                </span>
              </>
            )}
          </div>
        </div>
        <Button className={styles.button} type="submit">
          {loading ? (
            <ClipLoader size={25} color="white" />
          ) : (
            formatMessage(commonMessages.save)
          )}
        </Button>
      </form>
    </div>
  )
}

export default InvoiceForm
