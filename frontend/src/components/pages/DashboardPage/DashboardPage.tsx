import classNames from "classnames"
import dashboardItems from "./dashboardItems"
import styles from "./DashboardPage.module.scss"

const DashboardPage = () => {
  return (
    <div className={classNames(styles.root)}>
      <div className="row g-6">
        {dashboardItems.length &&
          dashboardItems.map(({ label, Icon }, index) => {
            return (
              <div key={index} className="col-md-3">
                <div className={classNames(styles.dashboardItem)}>
                  {Icon && <Icon className={styles.icon} />}
                  <h2 className={styles.title}> {label}</h2>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default DashboardPage
