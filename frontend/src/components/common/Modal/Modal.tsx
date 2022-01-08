import classNames from 'classnames'
import {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import { IoClose } from 'react-icons/io5'
import Button from '../Button'
import styles from './Modal.module.scss'

type Props = {
  title?: string
  trigger: (onOpen: () => void) => JSX.Element
  classes?: Record<string, string>
  children?:
    | (({ onClose }: { onClose: () => void }) => JSX.Element)
    | JSX.Element
}
const Modal = ({
  trigger,
  children,
  title,
  classes,
}: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false)
  const [removed, setRemoved] = useState(true)
  const onOpen = useCallback(() => {
    setRemoved(false)
    setOpened(true)
  }, [])

  const onClose = useCallback(() => {
    setOpened(false)
    window.setTimeout(() => setRemoved(true), 200)
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
        <div className={classNames(styles.content, classes?.content)}>
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
          {typeof children === 'function'
            ? !removed && children && children({ onClose })
            : !removed &&
              cloneElement(children as ReactElement, { onCloseModal: onClose })}
        </div>
      </div>
    </div>
  )
}
export default Modal
