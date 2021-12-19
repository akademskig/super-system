import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/public/auth";
import Button from "../../common/Button";
import Input from "../../common/Input";
import useAuth from "../../hooks/useAuth";
import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuthData } = useAuth();
  const navigate = useNavigate()

  const onSubmit = useCallback(
    async (values) => {
      const { email, password, username } = values;
      const res = await registerUser({ email, password, username });
      setAuthData(res);
      navigate('/auth#signIn')
    },
    [navigate, setAuthData]
  );

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={"Username"}
          {...register("username", { required: true })}
          error={errors.username}
        />
        <Input
          label={"Email"}
          {...register("email", { required: true })}
          error={errors.email}
          type="email"
        />
        <Input
          label={"Password"}
          {...register("password", { required: true })}
          error={errors.password}
          type="password"
        />
        <Button className={styles.button} type="submit">
          {" "}
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
