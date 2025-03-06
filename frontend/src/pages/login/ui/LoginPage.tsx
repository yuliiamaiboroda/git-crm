import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ValidationSchemaType,
  validationSchema,
} from "../lib/validationSchema";
import { ErrorSnackbarRef, LOCAL_STORAGE_KEYS } from "@/shared/types";
import {
  CustomButton,
  CustomLayouts,
  CustomTextField,
  ErrorSnackbar,
  routes,
  useLogin,
} from "@/shared";

export function LoginPage() {
  const {
    mutateAsync: loginAsync,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useLogin();

  const navigate = useNavigate();
  const errorSnackbarRef = useRef<ErrorSnackbarRef>(null);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = async ({ email, password }: ValidationSchemaType) => {
    try {
      const res = await loginAsync({ email, password });
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.token);

      navigate(routes.MAIN);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      errorSnackbarRef.current?.showError();
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <CustomLayouts.Login heading="Login" onSubmit={formik.handleSubmit}>
      <CustomTextField
        label="Email"
        id="email"
        type="email"
        placeholder="your@email.com"
        autoComplete="email"
        error={formik.errors.email}
        touched={formik.touched.email}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CustomTextField
        label="Password"
        id="password"
        type="password"
        placeholder="••••••"
        autoComplete="current-password"
        error={formik.errors.password}
        touched={formik.touched.password}
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <CustomButton
        type="submit"
        loading={isLoginPending}
        done={isLoginSuccess}
      >
        Login
      </CustomButton>
      <CustomButton onClick={() => navigate(routes.REGISTER)}>
        Register
      </CustomButton>
      <ErrorSnackbar
        ref={errorSnackbarRef}
        message="Invalid email or password"
      />
    </CustomLayouts.Login>
  );
}
