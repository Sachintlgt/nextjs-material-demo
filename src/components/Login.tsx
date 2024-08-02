"use client";
import { TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CommonButton from "./CommonButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/login";
import { useEffect, useState } from "react";
import { saveLocalStorageItem } from "@/utils/utility";
import { DisplayAPIStatus } from "./DisplayAPIStatus";
import { IAPIStatus } from "@/interfaces/interfaces";
import { loginService } from "@/services/login";
import { useRouter } from "next/navigation";
import { withAuth } from "@/hoc/withAuth";

const defaultValues = {
  username: "",
  password: "",
};

/** This component will handle all the login activity */
const Login = () => {
  // react hook form init
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });
  const { push } = useRouter();
  // to track api status
  const [apiStatus, setAPIStatus] = useState<IAPIStatus>({
    loading: false,
    error: "",
    message: "",
  });
  const onSubmit = async (data: any) => {
    try {
      setAPIStatus({ ...apiStatus, loading: true });
      // call login api
      const response = await loginService(data);
      const resJSON = await response.json();

      if (resJSON.token) {
        setAPIStatus({ loading: false, error: "", message: "Login Success!" });
        saveLocalStorageItem("token", resJSON.token);
        // redirect to login
        push("/products");
      } else {
        // display error
        setAPIStatus({ ...apiStatus, loading: false, error: resJSON.message });
      }
    } catch (err: any) {
      // display error
      setAPIStatus({ ...apiStatus, loading: false, error: err.message });
    }
  };

  useEffect(() => {
    if (!isValid) {
      setAPIStatus({ ...apiStatus, message: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <TextField
        label="UserName"
        fullWidth
        disabled={apiStatus.loading}
        margin="normal"
        defaultValue={defaultValues.username}
        {...register("username")}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        disabled={apiStatus.loading}
        margin="normal"
        defaultValue={defaultValues.password}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <CommonButton
        disabled={apiStatus.loading}
        type="submit"
        variant="contained"
        title="Login"
      />
      <br />
      <DisplayAPIStatus {...apiStatus} />
    </form>
  );
}
export default withAuth(Login);