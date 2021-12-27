import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { omit, uniq } from 'lodash'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../common/Button'
import { ICompany } from '../../../types/companies.type'
import Input from '../../common/Input'
import clientFormFields from './companyFormFields'
import getErrorMessage from '../../../utils/getErrorMessage'
import { FormTypes } from '../../hooks/useClientForm'
import useCompanyForm from '../../hooks/useCompanyForm'
import getSchemaFields from '../../../utils/getSchemaFields'

import styles from './CompanyForm.module.scss'

const rows = clientFormFields.map((field) => field.row)

const schemaFields = getSchemaFields(clientFormFields)

const schema = yup.object().shape(schemaFields)

type Props = {
  onCloseModal?: () => void
  type: FormTypes
  initialValues?: ICompany
}
const CompanyForm = ({ onCloseModal, type, initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: omit(initialValues, ['__typename']),
  })
  const { onSubmit, error } = useCompanyForm(type)

  const submitHandler = useCallback(
    async (values) => {
      const res = await onSubmit(values)
      if (res) {
        onCloseModal && onCloseModal()
      }
    },
    [onCloseModal, onSubmit]
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
        <div className="row">
          <p>Marked fields (*) are required</p>
        </div>
        {uniq(rows)
          .sort()
          .map((row, idx) => (
            <div className={'row'} key={idx}>
              {clientFormFields
                .filter((field) => field.row === row)
                .map(({ label, id, required, width, fieldType }, idx, arr) => (
                  <Input
                    key={idx}
                    classes={{
                      root: `col-lg-${width}`,
                      label: required ? styles.labelRequired : '',
                    }}
                    {...{
                      withMessage:
                        (fieldType === 'email' &&
                          errors[id as keyof ICompany]?.type === 'email') ||
                        (fieldType === 'phone' &&
                          errors[id as keyof ICompany]?.type === 'matches'),
                    }}
                    label={label}
                    {...register(id as keyof ICompany)}
                    error={errors[id as keyof ICompany]}
                    type={fieldType || 'text'}
                  />
                ))}
            </div>
          ))}
        <Button className={styles.button} type="submit">
          {' '}
          Save
        </Button>
      </form>
    </div>
  )
}

export default CompanyForm
