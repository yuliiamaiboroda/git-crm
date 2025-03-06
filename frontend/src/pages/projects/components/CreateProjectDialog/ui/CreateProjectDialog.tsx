import { useRef } from "react";
import {
  CustomButton,
  CustomTextField,
  ErrorSnackbarRef,
  useCreateProject,
} from "@/shared";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import {
  validationSchema,
  ValidationSchemaType,
} from "../lib/validationSchema";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateProjectDialog({ open, onClose }: Props) {
  const { mutateAsync: createProjectAsync, isPending: isCreateProjectPending } =
    useCreateProject();

  const errorSnackbarRef = useRef<ErrorSnackbarRef>(null);

  const handleSubmit = async (values: ValidationSchemaType) => {
    try {
      await createProjectAsync(values);
      formik.resetForm();
      onClose();
    } catch {
      errorSnackbarRef.current?.showError();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <Dialog
      key={open ? "open" : "closed"}
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { borderRadius: 3, padding: 2 } }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Create New Project
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField
            type="text"
            id="name"
            label="Project Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <CustomButton onClick={onClose} variant="outlined" color="primary">
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              loading={isCreateProjectPending}
              variant="contained"
              color="success"
            >
              Create
            </CustomButton>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
