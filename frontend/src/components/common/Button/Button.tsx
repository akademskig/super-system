import classNames from 'classnames'
import { ButtonHTMLAttributes, PropsWithChildren, useCallback } from 'react'

import styles from './Button.module.scss'

type Props = {
  onClick?: (e: Event) => void
  link?: boolean
  rounded?: boolean
  active?: boolean
}

const Button = ({
  children,
  onClick,
  link,
  rounded,
  className,
  active,
  ...rest
}: PropsWithChildren<Props & ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const handleClick = useCallback(
    (e) => {
      onClick && onClick(e)
    },
    [onClick]
  )
  return (
    <button
      {...rest}
      className={classNames(
        styles.root,
        { [styles.link]: link },
        { [styles.active]: active },
        { [styles.button]: !link },
        { [styles.rounded]: rounded },
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
export default Button
