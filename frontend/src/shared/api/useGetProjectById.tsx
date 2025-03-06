import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { Project } from "../types";

const useGetProjectById = (id: number) => {
  return useQuery<Project, Error>({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/project/${id}`);
      return response.data as Project;
    },
    enabled: !!id,
  });
};

export default useGetProjectById;
