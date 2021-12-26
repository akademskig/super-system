import { useCallback } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { signIn } from '../../../api/public/auth'
import Button from '../../common/Button'
import Input from '../../common/Input'
import useAuth from '../../hooks/useAuth'
import styles from './InvoiceForm.module.scss'
import Textarea from '../../common/Textarea'
import moment from 'moment'
import ClientSelect from './ClientSelect'
import InvoiceTypeSelect from './InvoiceTypeSelect'

const NewInvoiceForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const navigate = useNavigate()
  const { setAuthData } = useAuth()

  const onSubmit = useCallback(
    async (values) => {
      console.log(values)
      const { email, password } = values
      const res = await signIn({ email, password })
      setAuthData(res)
      navigate('/dashboard')
    },
    [navigate, setAuthData]
  )
  console.log(errors)

  return (
    <div className={styles.root}>
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <p>Marked fields (*) are required</p>
        </div>
        <div className={'row'}>
          <ClientSelect
            classes={{ root: 'col-lg-8', label: styles.label }}
            {...register('client', { required: 'This field is required' })}
            error={errors.buyer}
          />
        </div>
        <div className={'row'}>
          <Input
            classes={{ root: 'col-lg-4', label: styles.label }}
            label={'Service type'}
            {...register('serviceType', { required: 'This field is required' })}
            error={errors.serviceType}
            type="text"
          />
          <Input
            classes={{ root: 'col-lg-4', label: styles.label }}
            label={'Invoice number'}
            {...register('invoiceNumber', {
              required: 'This field is required',
            })}
            error={errors.invoiceNumber}
            type="text"
          />
          <InvoiceTypeSelect
            classes={{ root: 'col-lg-4', label: styles.label }}
            {...register('invoiceType', { required: 'This field is required' })}
            error={errors.buyer}
          />
        </div>

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

          {fields.map((field, idx) => (
            <div className={classNames(styles.accountItem)} key={field.id}>
              <Button
                className={styles.buttonMinus}
                link
                type="button"
                onClick={() => remove(idx)}
              >
                <FaMinus />
              </Button>
              <Textarea
                error={errors?.items?.[idx]?.serviceDescription}
                classes={{
                  root: classNames('col-lg-12', styles.textarea),
                  label: styles.label,
                }}
                {...register(`items[${idx}].serviceDescription`, {
                  required: 'Description is required',
                })}
                label={'Description'}
              />
              <div className={classNames('row')}>
                <Input
                  classes={{ root: 'col-lg-2', label: styles.label }}
                  label={'Unit'}
                  {...register(`items[${idx}].vatId`, {
                    required: 'This field is required',
                  })}
                  error={errors?.items?.[idx]?.vatId}
                  type="text"
                />
                <Input
                  classes={{ root: 'col-lg-2', label: styles.label }}
                  label={'Amount'}
                  {...register(`items[${idx}].amount`, {
                    required: 'This field is required',
                  })}
                  error={errors?.items?.[idx]?.vatId}
                  type="text"
                />
                <Input
                  classes={{ root: 'col-lg-3', label: styles.label }}
                  label={'Price'}
                  {...register(`items[${idx}].price`, {
                    required: 'This field is required',
                  })}
                  error={errors?.items?.[idx]?.price}
                  type="text"
                />
                <Input
                  classes={{ root: 'col-lg-2' }}
                  label={'Discount'}
                  {...register(`items[${idx}].discount`)}
                  error={errors?.items?.[idx]?.discount}
                  type="text"
                />
                <Input
                  classes={{ root: 'col-lg-3' }}
                  label={'Tax'}
                  {...register(`items[${idx}].tax`)}
                  error={errors?.items?.[idx]?.tax}
                  type="text"
                />
              </div>
            </div>
          ))}
        </div>
        <div className={'row'}>
          <Input
            classes={{ root: 'col-lg-6', label: styles.label }}
            label={'Payment method'}
            {...register('paymentMethod', {
              required: 'This field is required',
            })}
            error={errors.paymentMethod}
            type="text"
          />
          <Input
            classes={{ root: 'col-lg-6', label: styles.label }}
            label={'Date'}
            defaultValue={moment().format('DD/MM/yyyy')}
            {...register('date', { required: 'This field is required' })}
            error={errors.date}
            type="text"
          />
        </div>
        <div className={'row'}>
          <Input
            classes={{ root: 'col-lg-6', label: styles.label }}
            label={'Payment deadline'}
            defaultValue={moment().add(30, 'days').format('DD/MM/yyyy')}
            {...register('paymentDeadline', {
              required: 'This field is required',
            })}
            error={errors.date}
            type="text"
          />
          <Input
            classes={{ root: 'col-lg-6', label: styles.label }}
            label={'Shipment date'}
            defaultValue={moment().add(30, 'days').format('DD/MM/yyyy')}
            {...register('shipmentDate')}
            error={errors.date}
            type="text"
          />
        </div>
        <div className={'row'}>
          <Textarea
            classes={{
              root: classNames('col-lg-12', styles.textarea),
            }}
            {...register(`notes`)}
            label={'Notes'}
          />
        </div>
        <Button className={styles.button} type="submit">
          {' '}
          Save
        </Button>
      </form>
    </div>
  )
}

export default NewInvoiceForm
