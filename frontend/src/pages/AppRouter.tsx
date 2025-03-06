import { routes } from "@/shared/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RegisterPage } from "./register";
import { ProtectedRoute } from "@/shared";
import { LoginPage } from "./login";
import { ProjectsListPage } from "./projects";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={routes.REGISTER} element={<RegisterPage />} />
      <Route path={routes.LOGIN} element={<LoginPage />} />
      <Route
        path={routes.MAIN}
        element={<ProtectedRoute element={<ProjectsListPage />} />}
      />
    </Routes>
  </BrowserRouter>
);
