import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { DeleteProjectPayload, PaginatedList, Project } from "../types";

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, unknown, DeleteProjectPayload>({
    mutationFn: async (params): Promise<Project> => {
      const res = await axiosInstance.delete(`/project/${params.id}`);
      return res.data as Project;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueriesData<PaginatedList<Project>>(
        { queryKey: ["projects"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.filter((project) => project.id !== variables.id),
            total: old.total - 1,
            totalPages: Math.ceil((old.total - 1) / 10),
          };
        }
      );
    },
    onError: (error) => console.error("Delete project error: ", error),
  });
};

export default useDeleteProject;
