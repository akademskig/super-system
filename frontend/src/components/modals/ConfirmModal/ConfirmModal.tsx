import classNames from 'classnames'
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa'
import Button from '../../common/Button'
import Modal from '../../common/Modal'
import styles from './ConfirmModal.module.scss'

type Props = {
  title?: string
  onConfirm: () => void
  onClose?: () => void
}
const ConfirmModal = ({ onConfirm, title }: Props) => {
  return (
    <Modal
      classes={{ content: styles.modalContent }}
      title={title}
      trigger={(onOpen) => (
        <Button className={styles.deleteButton} link onClick={onOpen}>
          <FaTrash className={styles.trashIcon} />
        </Button>
      )}
    >
      {({ onClose }) => (
        <div className={styles.root}>
          <Button
            className={classNames(styles.button, styles.buttonConfirm)}
            onClick={onConfirm}
          >
            <FaCheck className={styles.icon} />
          </Button>
          <Button
            className={classNames(styles.button, styles.buttonClose)}
            onClick={onClose}
          >
            <FaTimes className={styles.icon} />
          </Button>
        </div>
      )}
    </Modal>
  )
}
export default ConfirmModal
