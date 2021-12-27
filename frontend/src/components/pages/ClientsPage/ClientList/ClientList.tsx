import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FaBuilding, FaPencilAlt, FaTrash } from 'react-icons/fa'
import { GET_CLIENTS, REMOVE_CLIENT } from '../../../../apollo/api/clients'
import { IClient } from '../../../../types/clients.type'
import Button from '../../../common/Button'
import Modal from '../../../common/Modal'
import ClientForm from '../../../forms/ClientForm'
import { FormTypes } from '../../../hooks/useClientForm'
import styles from './ClientList.module.scss'

const ClientList = () => {
  const { data } = useQuery(GET_CLIENTS)

  const [deleteClient] = useMutation(REMOVE_CLIENT, {
    errorPolicy: 'all',
    update(cache, { data }) {
      const normalizedId = cache.identify({
        id: data.removeClient.id,
        __typename: 'Client',
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
  })
  const onDelete = useCallback(
    (id) => {
      return async () => deleteClient({ variables: { id } })
    },
    [deleteClient]
  )
  return (
    <ul className={styles.root}>
      {(data?.clients || []).map((client: IClient, idx: number) => (
        <li className={styles.clientListItem} key={idx}>
          <div className={styles.left}>
            <FaBuilding className={styles.buildingIcon} />
            <span>{client?.name}</span>
          </div>
          <div className={styles.right}>
            <Modal
              title={'Edit Client'}
              trigger={(onOpen) => (
                <Button className={styles.deleteButton} link onClick={onOpen}>
                  <FaPencilAlt className={styles.trashIcon} />
                </Button>
              )}
            >
              <ClientForm type={FormTypes.UPDATE} initialValues={client} />
            </Modal>
            <Button
              className={styles.deleteButton}
              link
              onClick={onDelete(client?.id)}
            >
              <FaTrash className={styles.trashIcon} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default ClientList
