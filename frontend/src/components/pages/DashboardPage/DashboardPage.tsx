import classNames from 'classnames'
import { Link } from 'react-router-dom'
import dashboardItems from './dashboardItems'
import styles from './DashboardPage.module.scss'

const DashboardPage = () => {
  return (
    <div className={classNames(styles.root)}>
      <div className="row g-6">
        {dashboardItems.length &&
          dashboardItems.map(({ label, Icon, link }, index) => {
            return (
              <div key={index} className="col-xxl-2 col-lg-3 col-sm-4">
                {link ? (
                  <Link to={link}>
                    <div className={classNames(styles.dashboardItem)}>
                      {Icon && <Icon className={styles.icon} />}
                      <h2 className={styles.title}> {label}</h2>
                    </div>
                  </Link>
                ) : (
                  <div className={classNames(styles.dashboardItem)}>
                    {Icon && <Icon className={styles.icon} />}
                    <h2 className={styles.title}> {label}</h2>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default DashboardPage
