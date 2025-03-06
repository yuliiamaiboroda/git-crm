import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { CreateProjectPayload, Project } from "../types";

const useCreateProject = () => {
  return useMutation<Project, unknown, CreateProjectPayload>({
    mutationFn: async (params): Promise<Project> => {
      const res = await axiosInstance.post("/project", params);

      return res.data as Project;
    },
    onError: (error) => console.error("Create project error: ", error),
  });
};

export default useCreateProject;
