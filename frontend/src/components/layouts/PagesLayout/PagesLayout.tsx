import { PropsWithChildren } from 'react'
import styles from './PagesLayout.module.scss'

const PagesLayout = ({ children }: PropsWithChildren<any>) => {
  return <div className={styles.root}>{children}</div>
}
export default PagesLayout
