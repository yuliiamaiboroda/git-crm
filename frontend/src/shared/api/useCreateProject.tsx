import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { CreateProjectPayload, PaginatedList, Project } from "../types";

const REFETCH_DELAY = 2000;

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
            data: [...old.data, newProject],
            total: old.total + 1,
            totalPages: Math.ceil((old.total + 1) / 10),
          };
        }
      );

      queryClient.setQueryData(["project", newProject.id], newProject);

      setTimeout(() => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["project", newProject.id],
          }),
          queryClient.invalidateQueries({ queryKey: ["projects"] }),
        ]).then(async () => {
          try {
            const response = await axiosInstance.get(
              `/project/${newProject.id}`
            );
            const updatedProject = response.data as Project;

            if (updatedProject.updatedAt !== updatedProject.createdAt) {
              queryClient.setQueryData(
                ["project", newProject.id],
                updatedProject
              );

              queryClient.setQueryData<PaginatedList<Project>>(
                ["projects", 1],
                (old) => {
                  if (!old) return old;
                  return {
                    ...old,
                    data: old.data.map((project) =>
                      project.id === updatedProject.id
                        ? updatedProject
                        : project
                    ),
                  };
                }
              );
            }
          } catch (error) {
            console.error("Failed to refetch project:", error);
          }
        });
      }, REFETCH_DELAY);
    },
    onError: (error) => console.error("Create project error: ", error),
  });
};

export default useCreateProject;
