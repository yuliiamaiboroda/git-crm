import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { AuthPayload, AuthResponse } from "../types";

const useRegister = () => {
  return useMutation<AuthResponse, unknown, AuthPayload>({
    mutationFn: async (params): Promise<AuthResponse> => {
      const res = await axiosInstance.post("/register", params);

      return res.data as AuthResponse;
    },
    onError: (error) => console.error("Register error: ", error),
  });
};

export default useRegister;
