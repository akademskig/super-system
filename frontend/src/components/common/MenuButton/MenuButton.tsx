import classNames from 'classnames'
import {
  createRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'

import styles from './MenuButton.module.scss'

type Option = {
  label: string
  value?: string | number
  link?: string
  icon?: ReactNode
  action?: (e?: any) => void
}

type Props = {
  options: Option[]
  classes?: Record<string, string>
}

const MenuButton = ({
  children,
  options,
  classes,
}: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false)
  const ref = createRef<HTMLDivElement>()

  const onOpen = useCallback(() => {
    setOpened(true)
  }, [])

  const checkClick = useCallback(
    (e) => {
      if (opened) {
        setOpened(false)
      }
    },
    [opened]
  )

  useEffect(() => {
    window.addEventListener('click', checkClick)
    return () => window.removeEventListener('click', checkClick)
  })

  return (
    <div className={classNames(styles.root, classes?.root)}>
      <Button
        type="button"
        className={classNames(classes?.menuButton)}
        onClick={onOpen}
      >
        {children}
      </Button>
      {!!options.length && (
        <div
          ref={ref}
          className={classNames(styles.menu, classes?.menu, {
            [styles.opened]: opened,
          })}
        >
          {options.map((option, idx) => {
            return option.link ? (
              <Link key={idx} to={option?.link || ''}>
                <Button
                  type="button"
                  link
                  onClick={option?.action}
                  className={classes?.button}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </Button>
              </Link>
            ) : (
              <Button
                type="button"
                key={idx}
                link
                onClick={option?.action}
                className={classes?.button}
              >
                {option.icon}
                <span>{option.label}</span>
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default MenuButton
