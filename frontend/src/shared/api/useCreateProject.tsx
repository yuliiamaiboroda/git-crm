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
      // Get the current page data
      const currentData = queryClient.getQueryData<PaginatedList<Project>>([
        "projects",
        1,
        10,
      ]);

      if (currentData) {
        // Only add to current page if there's space (less than 10 items)
        const shouldAddToCurrentPage = currentData.data.length < 10;

        // Update the first page cache
        queryClient.setQueryData<PaginatedList<Project>>(["projects", 1, 10], {
          ...currentData,
          data: shouldAddToCurrentPage
            ? [...currentData.data, newProject]
            : currentData.data,
          total: currentData.total + 1,
          totalPages: Math.ceil((currentData.total + 1) / 10),
        });

        // Set individual project cache
        queryClient.setQueryData(["project", newProject.id], newProject);

        // Always invalidate after delay to ensure consistency
        setTimeout(() => {
          queryClient.invalidateQueries({
            queryKey: ["projects", 1, 10],
          });
        }, 2000);
      }
    },
    onError: (error) => console.error("Create project error: ", error),
  });
};

export default useCreateProject;
