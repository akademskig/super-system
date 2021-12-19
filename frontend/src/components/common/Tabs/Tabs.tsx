import { ReactNode, useState } from "react";
import Button from "../Button";
import styles from "./Tabs.module.scss";

type Tab = {
  label: string;
  content: ReactNode;
};
type Props = {
  tabs: Tab[];
};
const Tabs = ({ tabs }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
            );
          })}
      </div>
      <div className={styles.tabContent}>{tabs[activeIndex].content}</div>
    </div>
  );
};

export default Tabs;
