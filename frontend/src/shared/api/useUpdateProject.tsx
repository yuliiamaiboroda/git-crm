import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { Project } from "../types";

const useUpdateProject = () => {
  return useMutation<Project, unknown, Partial<Project>>({
    mutationFn: async (params): Promise<Project> => {
      const res = await axiosInstance.put(`/project/${params.id}`, params);

      return res.data as Project;
    },
    onError: (error) => console.error("Update project error: ", error),
  });
};

export default useUpdateProject;
