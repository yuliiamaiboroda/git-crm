import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { CreateProjectPayload, PaginatedList, Project } from "../types";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, unknown, CreateProjectPayload>({
    mutationFn: async (params): Promise<Project> => {
      const res = await axiosInstance.post("/project", params);
      return res.data as Project;
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData<PaginatedList<Project>>(
        ["projects", 1],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: [newProject, ...old.data],
            total: old.total + 1,
            totalPages: Math.ceil((old.total + 1) / 10),
          };
        }
      );
    },
    onError: (error) => console.error("Create project error: ", error),
  });
};

export default useCreateProject;
