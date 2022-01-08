import box from '../../../assets/images/icons8-box.svg'
import styles from './EmptyList.module.scss'

const EmptyList = () => {
  return (
    <div className={styles.root}>
      <img src={box} alt="empty list" />
    </div>
  )
}
export default EmptyList
