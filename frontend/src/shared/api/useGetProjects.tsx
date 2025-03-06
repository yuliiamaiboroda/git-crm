import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { PaginatedList, Project } from "../types";

const PAGE_LIMIT = 10;

const useGetProjects = (page: number) => {
  return useQuery<PaginatedList<Project>, Error>({
    queryKey: ["projects", page],
    queryFn: async () => {
      const response = await axiosInstance.get(`/project`, {
        params: {
          page,
          limit: PAGE_LIMIT,
        },
      });

      return response.data as PaginatedList<Project>;
    },
  });
};

export default useGetProjects;
