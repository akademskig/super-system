import { PropsWithChildren, useState } from 'react'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'
import styles from './MainLayout.module.scss'
import MobileSidebar from './MobileSidebar'

const MainLayout = ({ children }: PropsWithChildren<any>) => {
  const [mobileOpened, setMobileOpened] = useState(true)
  const [tabletOpened, setTabletOpened] = useState(true)
  return (
    <div>
      <Toolbar
        onMobileOpen={() => setMobileOpened(true)}
        onTabletOpen={() => setTabletOpened(!tabletOpened)}
      />
      <div className={styles.sidebarMain}>
        <Sidebar opened={tabletOpened} />
        <MobileSidebar
          opened={mobileOpened}
          onClose={() => setMobileOpened(false)}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

export default MainLayout
