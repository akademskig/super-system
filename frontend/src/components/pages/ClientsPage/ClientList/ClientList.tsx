import { useQuery, useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { FaBuilding, FaTrash } from 'react-icons/fa'
import { GET_CLIENTS, REMOVE_CLIENT } from '../../../../apollo/api/clients'
import { IClient } from '../../../../apollo/api/clients.type'
import Button from '../../../common/Button'
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
      {(data?.clients || []).map(({ id, name }: IClient, idx: number) => (
        <li className={styles.clientListItem} key={idx}>
          <div className={styles.left}>
            <FaBuilding className={styles.buildingIcon} />
            <span>{name}</span>
          </div>
          <div className={styles.right}>
            <Button className={styles.deleteButton} link onClick={onDelete(id)}>
              <FaTrash className={styles.trashIcon} />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
export default ClientList
