import axios, { AxiosError } from "axios";
import { routes } from "../routes";
import { LOCAL_STORAGE_KEYS } from "../types";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401 && error.config?.url !== "/login") {
      sessionStorage.clear();

      window.location.href = routes.LOGIN;
    }

    return Promise.reject(error);
  }
);
