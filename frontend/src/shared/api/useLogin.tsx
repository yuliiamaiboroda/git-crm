import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { AuthPayload, AuthResponse } from "../types";

const useLogin = () => {
  return useMutation<AuthResponse, unknown, AuthPayload>({
    mutationFn: async (params): Promise<AuthResponse> => {
      const res = await axiosInstance.post("/login", params);

      return res.data as AuthResponse;
    },
    onError: (error) => console.error("Login error: ", error),
  });
};

export default useLogin;
