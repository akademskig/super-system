import Button from '../../common/Button'
import { FaPlus } from 'react-icons/fa'
import styles from './ClientsPage.module.scss'
import PagesLayout from '../../layouts/PagesLayout'
import Modal from '../../common/Modal'
import NewClientForm from '../../forms/NewClientForm'
import ClientList from './ClientList'

const ClientsPage = () => {
  return (
    <PagesLayout>
      <div className={styles.root}>
        <Modal
          title={'Add new client'}
          trigger={(onOpen) => (
            <Button className={styles.button} onClick={onOpen}>
              <FaPlus /> <span>New Client</span>
            </Button>
          )}
        >
          <NewClientForm />
        </Modal>
        <ClientList />
      </div>
    </PagesLayout>
  )
}
export default ClientsPage
