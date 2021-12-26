import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import Button from '../../common/Button'
import Input from '../../common/Input'
import styles from './NewClientForm.module.scss'
import newClientFormFields from './newClientFormFields'
import { uniq } from 'lodash'
import { useMutation } from '@apollo/client'
import { CLIENT_FRAGMENT, CREATE_CLIENT } from '../../../apollo/api/clients'
import getErrorMessage from '../../../utils/getErrorMessage'

const rows = newClientFormFields.map((field) => field.row)

type Props = {
  onCloseModal?: () => void
}
const NewClientForm = ({ onCloseModal }: Props) => {
  const {
    register,
    handleSubmit,
    reset: formReset,
    formState: { errors },
  } = useForm()

  const [createClient, res] = useMutation(CREATE_CLIENT, {
    errorPolicy: 'all',
    update(cache, { data }) {
      if (!data) {
        return null
      }
      cache.modify({
        fields: {
          clients(existingClients = []) {
            const newClientRef = cache.writeFragment({
              data: data?.createClient,
              fragment: CLIENT_FRAGMENT,
            })
            return [...existingClients, newClientRef]
          },
        },
      })
    },
  })

  const onSubmit = useCallback(
    async (values) => {
      const { data } = await createClient({
        variables: { input: values },
      })
      if (data?.createClient) {
        onCloseModal && onCloseModal()
        res.reset()
        formReset()
      }
    },
    [createClient, formReset, onCloseModal, res]
  )
  return (
    <div className={styles.root}>
      {res.error && (
        <div className={classNames(styles.error)}>
          {res.error &&
            getErrorMessage(res?.error).map((errorMessage, idx) => (
              <div key={idx}>{errorMessage}</div>
            ))}
        </div>
      )}
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <p>Marked fields (*) are required</p>
        </div>
        {uniq(rows)
          .sort()
          .map((row, idx) => (
            <div className={'row'} key={idx}>
              {newClientFormFields
                .filter((field) => field.row === row)
                .map(({ label, id, required, width }, idx, arr) => (
                  <Input
                    key={idx}
                    classes={{
                      root: `col-lg-${width}`,
                      label: required ? styles.labelRequired : '',
                    }}
                    label={label}
                    {...register(id, {
                      required: required && 'This field is required',
                    })}
                    error={errors[id]}
                    type="text"
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

export default NewClientForm
