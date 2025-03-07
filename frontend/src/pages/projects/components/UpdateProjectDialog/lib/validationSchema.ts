import { InferType } from "yup";
import { object, string, number } from "yup";
import {
  GITHUB_URL_REGEX,
  GITHUB_USERNAME_REGEX,
  MAX_USERNAME_LENGTH,
} from "@/shared/lib";

export type ValidationSchemaType = InferType<typeof validationSchema>;

export const validationSchema = object().shape({
  name: string()
    .matches(GITHUB_USERNAME_REGEX, "Invalid project name format")
    .optional(),
  ownerName: string().max(MAX_USERNAME_LENGTH).optional(),
  url: string()
    .matches(GITHUB_URL_REGEX, "Invalid GitHub URL format")
    .url("Invalid URL format")
    .optional(),
  stars: number().min(0).optional(),
  forks: number().min(0).optional(),
  issues: number().min(0).optional(),
});
