import classNames from 'classnames'
import { cloneElement, PropsWithChildren, useCallback, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Button from '../Button'
import styles from './Modal.module.scss'

type Props = {
  title?: string
  trigger: (onOpen: () => void) => JSX.Element
}
const Modal = ({ trigger, children, title }: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false)
  const [removed, setRemoved] = useState(false)
  const onOpen = useCallback(() => {
    setRemoved(false)
    setOpened(true)
  }, [])

  const onClose = useCallback(() => {
    setOpened(false)
    window.setTimeout(() => setRemoved(true), 500)
  }, [])

  return (
    <div className={styles.root}>
      {trigger(onOpen)}
      <div
        className={classNames(
          styles.wrapper,
          { [styles.opened]: opened },
          { [styles.removed]: removed }
        )}
      >
        <div className={styles.content}>
          <div
            className={classNames(styles.header, {
              [styles.headerWithTitle]: title,
            })}
          >
            <h5 className={classNames(styles.title)}>{title}</h5>
            <Button className={styles.closeButton} link onClick={onClose}>
              <IoClose />
            </Button>
          </div>
          {/*@ts-ignore*/}
          {!removed && cloneElement(children, { onCloseModal: onClose })}
        </div>
      </div>
    </div>
  )
}
export default Modal
