import { InferType } from "yup";
import { object, string, number } from "yup";
import { GITHUB_URL_REGEX, PROJECT_NAME_REGEX } from "@/shared/lib";

export type ValidationSchemaType = InferType<typeof validationSchema>;

export const validationSchema = object().shape({
  name: string()
    .matches(PROJECT_NAME_REGEX, "Invalid project name format")
    .optional(),
  url: string()
    .matches(GITHUB_URL_REGEX, "Invalid GitHub URL format")
    .url("Invalid URL format")
    .optional(),
  stars: number().min(0).optional(),
  forks: number().min(0).optional(),
  issues: number().min(0).optional(),
});
