import Button from '../../common/Button'
import { FaPlus } from 'react-icons/fa'
import styles from './ClientsPage.module.scss'
import PagesLayout from '../../layouts/PagesLayout'
import Modal from '../../common/Modal'
import ClientList from './ClientList'
import { FormTypes } from '../../hooks/useClientForm'
import ClientForm from '../../forms/ClientForm'
import { useIntl } from 'react-intl'
import { clientsPageMessages } from '../../../lang/messages.lang'

const ClientsPage = () => {
  const { formatMessage } = useIntl()
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Modal
          title={formatMessage(clientsPageMessages.newClient)}
          trigger={(onOpen) => (
            <Button className={styles.button} onClick={onOpen}>
              <FaPlus />{' '}
              <span>{formatMessage(clientsPageMessages.newClient)}</span>
            </Button>
          )}
        >
          <ClientForm type={FormTypes.CREATE} />
        </Modal>
        <ClientList />
      </div>
    </PagesLayout>
  )
}
export default ClientsPage
