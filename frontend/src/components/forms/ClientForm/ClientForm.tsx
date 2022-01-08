import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import Button from '../../common/Button'
import Input from '../../common/Input'
import styles from './ClientForm.module.scss'
import clientFormFields from './clientFormFields'
import { omit, uniq } from 'lodash'
import getErrorMessage from '../../../utils/getErrorMessage'
import useClientForm, { FormTypes } from '../../hooks/useClientForm'
import { IClient } from '../../../types/clients.type'
import { ClipLoader } from 'react-spinners'
import { clientFormMessages, commonMessages } from '../../../lang/messages.lang'
import { useIntl } from 'react-intl'

const rows = clientFormFields.map((field) => field.row)

type Props = {
  onCloseModal?: () => void
  type: FormTypes
  initialValues?: IClient
}
const ClientForm = ({ onCloseModal, type, initialValues }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: omit(initialValues, ['__typename']),
  })
  const { onSubmit, error, loading } = useClientForm(type)
  const { formatMessage } = useIntl()
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
          <p>{formatMessage(commonMessages.requiredNote)}</p>
        </div>
        {uniq(rows)
          .sort()
          .map((row, idx) => (
            <div className={'row'} key={idx}>
              {clientFormFields
                .filter((field) => field.row === row)
                .map(({ label, id, required, width }, idx, arr) => (
                  <Input
                    key={idx}
                    classes={{
                      root: `col-lg-${width}`,
                      label: required ? styles.labelRequired : '',
                    }}
                    label={formatMessage(
                      clientFormMessages[id as keyof typeof clientFormMessages]
                    )}
                    {...register(id as keyof IClient, {
                      required: required && 'This field is required',
                    })}
                    error={errors[id as keyof IClient]}
                    type="text"
                  />
                ))}
            </div>
          ))}
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

export default ClientForm
