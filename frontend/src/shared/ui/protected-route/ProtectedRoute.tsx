import { LOCAL_STORAGE_KEYS, routes } from "@/shared";
import { FC, JSX } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  element: JSX.Element;
};

export const ProtectedRoute: FC<Props> = ({ element }) => {
  const isLoggedIn = sessionStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  return isLoggedIn ? element : <Navigate to={routes.LOGIN} replace />;
};
