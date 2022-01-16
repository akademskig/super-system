import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FaBuilding, FaPencilAlt } from 'react-icons/fa'
import { useIntl } from 'react-intl'
import { GET_CLIENTS, REMOVE_CLIENT } from '../../../../apollo/api/clients'
import { clientsPageMessages } from '../../../../lang/messages.lang'
import { IClient } from '../../../../types/clients.type'
import Button from '../../../common/Button'
import EmptyList from '../../../common/EmptyList'
import Loader from '../../../common/Loader'
import Modal from '../../../common/Modal'
import ClientForm from '../../../forms/ClientForm'
import { FormTypes } from '../../../hooks/useClientForm'
import ConfirmModal from '../../../modals/ConfirmModal'
import styles from './ClientList.module.scss'

const ClientList = () => {
  const { data, loading } = useQuery(GET_CLIENTS)
  const { formatMessage } = useIntl()

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
    <>
      {loading && <Loader />}
      {!data?.clients.length && !loading && <EmptyList />}
      <ul className={styles.root}>
        {(data?.clients || []).map((client: IClient, idx: number) => (
          <li className={styles.clientListItem} key={idx}>
            <div className={styles.left}>
              <FaBuilding className={styles.buildingIcon} />
              <span>{client?.name}</span>
            </div>
            <div className={styles.right}>
              <Modal
                title={formatMessage(clientsPageMessages.editClient)}
                trigger={(onOpen) => (
                  <Button className={styles.deleteButton} link onClick={onOpen}>
                    <FaPencilAlt className={styles.trashIcon} />
                  </Button>
                )}
              >
                <ClientForm type={FormTypes.UPDATE} initialValues={client} />
              </Modal>
              <ConfirmModal
                onConfirm={onDelete(client.id)}
                title={formatMessage(clientsPageMessages.deleteClientConfirm)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
export default ClientList
