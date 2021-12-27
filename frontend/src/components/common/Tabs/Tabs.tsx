import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../Button'
import styles from './Tabs.module.scss'

type Tab = {
  label: string
  content: ReactNode
  active?: boolean
  hash?: string
}
type Props = {
  tabs: Tab[]
}
const Tabs = ({ tabs }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

  const activeTab = useMemo(
    () => tabs.findIndex((tab) => tab.hash === location.hash),
    [location.hash, tabs]
  )
  const [activeIndex, setActiveIndex] = useState(activeTab > -1 ? activeTab : 0)
  const handleClick = useCallback(
    (idx) => {
      return () => {
        setActiveIndex(idx)
        if (tabs?.[idx]?.hash) {
          navigate(tabs[idx].hash || '')
        }
      }
    },
    [navigate, tabs]
  )

  useEffect(() => {
    setActiveIndex(activeTab)
  }, [activeTab])
  
  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {tabs.length &&
          tabs.map((tab, index) => {
            return (
              <Button
                key={index}
                className={styles.tabButton}
                active={index === activeIndex}
                style={{ width: `${100 / tabs.length}%` }}
                onClick={handleClick(index)}
                link
              >
                {' '}
                {tab.label}
              </Button>
            )
          })}
      </div>
      <div className={styles.tabContent}>{tabs[activeIndex].content}</div>
    </div>
  )
}

export default Tabs
