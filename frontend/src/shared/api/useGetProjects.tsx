import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { PaginatedList, Project } from "../types";

const useGetProjects = (page: number, pageSize: number = 10) => {
  return useQuery<PaginatedList<Project>, Error>({
    queryKey: ["projects", page, pageSize],
    queryFn: async () => {
      const response = await axiosInstance.get(`/project`, {
        params: {
          page,
          limit: pageSize,
        },
      });

      return response.data as PaginatedList<Project>;
    },
  });
};

export default useGetProjects;
