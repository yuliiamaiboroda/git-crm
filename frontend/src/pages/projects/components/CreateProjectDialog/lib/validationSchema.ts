import { InferType } from "yup";
import { object, string } from "yup";
import { PROJECT_NAME_REGEX } from "@/shared/lib";

export type ValidationSchemaType = InferType<typeof validationSchema>;

export const validationSchema = object().shape({
  name: string()
    .matches(PROJECT_NAME_REGEX, "Invalid project name format")
    .required("Name is required"),
});
