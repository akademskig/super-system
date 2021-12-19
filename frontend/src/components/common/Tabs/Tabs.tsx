import { ReactNode, useState } from "react"
import Button from "../Button"
import styles from "./Tabs.module.scss"

type Tab = {
  label: string
  content: ReactNode
  active?: boolean
}
type Props = {
  tabs: Tab[]
}
const Tabs = ({ tabs }: Props) => {
  const activeTab = tabs.findIndex((tab) => tab.active)
  const [activeIndex, setActiveIndex] = useState(activeTab > -1 ? activeTab : 0)
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
                onClick={() => setActiveIndex(index)}
                link
              >
                {" "}
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
