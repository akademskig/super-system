import classNames from 'classnames'
import RingLoader from 'react-spinners/RingLoader'
import styles from './Loader.module.scss'

function Loader() {
  return (
    <div className={classNames(styles.root)}>
      <RingLoader size={100} color={'#7b0099'} />
    </div>
  )
}

export default Loader
