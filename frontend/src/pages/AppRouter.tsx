import { routes } from "@/shared/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RegisterPage } from "./register";
import { ProtectedRoute } from "@/shared";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.REGISTER} element={<RegisterPage />} />
      <Route path={routes.LOGIN} element={<div>Login</div>} />
      <Route
        path={routes.MAIN}
        element={<ProtectedRoute element={<div>Main</div>} />}
      />
    </Routes>
  </BrowserRouter>
);
