import classNames from "classnames";
import {
  createRef,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

import styles from "./MenuButton.module.scss";
import { isClickedOutside } from "./utils";

type Option = {
  label: string;
  link?: string;
  icon: ReactNode;
  action?: () => void;
};

type Props = {
  options: Option[];
};

const MenuButton = ({ children, options }: PropsWithChildren<Props>) => {
  const [opened, setOpened] = useState(false);
  const ref = createRef<HTMLDivElement>();

  const onClick = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const checkClick = useCallback(
    (e) => {
      if (isClickedOutside(e, ref) && opened) {
        setOpened(false);
      }
    },
    [opened, ref]
  );

  useEffect(() => {
    window.addEventListener("click", checkClick);
    return () => window.removeEventListener("click", checkClick);
  });

  return (
    <div className={styles.root}>
      <Button onClick={onClick}>{children}</Button>
      <div
        ref={ref}
        className={classNames(styles.menu, { [styles.opened]: opened })}
      >
        {options.length &&
          options.map((option, idx) => {
            return (
              <Link key={idx} to={option?.link || ""}>
                <Button link onClick={option?.action}>
                  {option.icon}
                  {option.label}
                </Button>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default MenuButton;
