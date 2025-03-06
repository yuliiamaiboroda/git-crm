import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { DeleteProjectPayload, Project } from "../types";

const useDeleteProject = () => {
  return useMutation<Project, unknown, DeleteProjectPayload>({
    mutationFn: async (params): Promise<Project> => {
      const res = await axiosInstance.delete(`/project/${params.id}`);

      return res.data as Project;
    },
    onError: (error) => console.error("Delete project error: ", error),
  });
};

export default useDeleteProject;
