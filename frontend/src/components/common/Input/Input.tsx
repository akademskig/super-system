import classNames from "classnames";
import { forwardRef, InputHTMLAttributes, ReactNode, RefCallback } from "react";
import { ChangeHandler } from "react-hook-form";
import styles from "./Input.module.scss";

type Props = {
  label?: string | ReactNode;
  name: string;
  onChange: ChangeHandler;
  error?: any;
  ref: RefCallback<any>;
};

const Input = (
  {
    label,
    name,
    onChange,
    error,
    ...rest
  }: Props & InputHTMLAttributes<HTMLInputElement>,
  ref: any
) => {
  console.log(error);
  return (
    <div className={styles.root}>
      <label>{label}</label>
      <input
        {...rest}
        ref={ref}
        name={name}
        onChange={onChange}
        className={classNames(styles.input, { [styles.error]: error })}
      />
      {error && <small className={styles.errorMessage}>{error.message}</small>}
    </div>
  );
};
export default forwardRef(Input);
