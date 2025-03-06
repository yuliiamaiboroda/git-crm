import { Box, FormControl, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, FC } from "react";

type Props = {
  id: string;
  label: string;
  value: string | number;
  touched?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string | undefined;
  type: React.HTMLInputTypeAttribute;
  multiline?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export const CustomTextField: FC<Props> = ({
  id,
  error,
  label,
  touched,
  value,
  type,
  autoComplete,
  placeholder,
  multiline,
  onChange,
  onBlur,
}) => (
  <FormControl>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <FormLabel htmlFor="password">{label}</FormLabel>
    </Box>
    <TextField
      name={id}
      multiline={multiline}
      minRows={4}
      maxRows={10}
      placeholder={placeholder}
      type={type}
      id={id}
      autoComplete={autoComplete}
      required
      fullWidth
      variant="outlined"
      color={error ? "error" : "primary"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={touched && Boolean(error)}
      helperText={touched && error}
    />
  </FormControl>
);
