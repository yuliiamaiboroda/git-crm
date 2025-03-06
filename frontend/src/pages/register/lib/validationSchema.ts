import {
  EMAIL_REGEX,
  LOWERCASE_REGEX,
  NUMBER_REGEX,
  UPPERCASE_REGEX,
} from "@/shared/lib";
import { InferType, object, string } from "yup";
import {
  MAX_LENGTH_OF_EMAIL,
  MAX_LENGTH_OF_PASSWORD,
  MIN_LENGTH_OF_EMAIL,
  MIN_LENGTH_OF_PASSWORD,
} from "../data/constants";

export type ValidationSchemaType = InferType<typeof validationSchema>;

export const validationSchema = object().shape({
  email: string()
    .matches(EMAIL_REGEX, "Email should be a valid email!")
    .min(
      MIN_LENGTH_OF_EMAIL,
      ({ min }) => `Email should have a minimum length of ${min}`
    )
    .max(
      MAX_LENGTH_OF_EMAIL,
      ({ max }) => `Email should have a maximum length of ${max}`
    )
    .required("Email is a required field"),
  password: string()
    .min(
      MIN_LENGTH_OF_PASSWORD,
      ({ min }) => `Password should have a minimum length of ${min}`
    )
    .max(
      MAX_LENGTH_OF_PASSWORD,
      ({ max }) => `Password should have a maximum length of ${max}`
    )
    .matches(UPPERCASE_REGEX, "AT LEAST ONE UPPERCASE CHARACTER")
    .matches(LOWERCASE_REGEX, "AT LEAST ONE LOWERCASE CHARACTER")
    .matches(NUMBER_REGEX, "AT LEAST ONE NUMBER")
    .required("Password is a required field"),
});
