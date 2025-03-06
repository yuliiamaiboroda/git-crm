import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { PaginatedList, Project } from "../types";

type MutationContext = {
  previousQueries: [readonly unknown[], PaginatedList<Project> | undefined][];
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<Project, unknown, Partial<Project>, MutationContext>({
    mutationFn: async (params): Promise<Project> => {
      const res = await axiosInstance.put(`/project/${params.id}`, params);
      return res.data as Project;
    },
    onMutate: async (updatedProject) => {
      await queryClient.cancelQueries({ queryKey: ["projects"] });

      const previousQueries = queryClient.getQueriesData<
        PaginatedList<Project>
      >({ queryKey: ["projects"] });

      queryClient.setQueriesData<PaginatedList<Project>>(
        { queryKey: ["projects"] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            data: old.data.map((project) =>
              project.id === updatedProject.id
                ? { ...project, ...updatedProject }
                : project
            ),
          };
        }
      );

      return { previousQueries };
    },
    onError: (err, _variables, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, previousData]) => {
          if (previousData) {
            queryClient.setQueryData(queryKey, previousData);
          }
        });
      }
      console.error("Update project error: ", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useUpdateProject;
