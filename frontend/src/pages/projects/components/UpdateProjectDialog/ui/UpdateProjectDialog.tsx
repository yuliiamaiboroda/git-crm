import { useRef } from "react";
import {
  CustomButton,
  CustomTextField,
  ErrorSnackbarRef,
  Project,
  useUpdateProject,
  ErrorSnackbar,
} from "@/shared";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import {
  validationSchema,
  ValidationSchemaType,
} from "../lib/validationSchema";

interface Props {
  open: boolean;
  onClose: () => void;
  project: Project;
}

export function UpdateProjectDialog({ open, onClose, project }: Props) {
  const {
    mutateAsync: updateProjectAsync,
    isPending: isUpdateProjectPending,
    isSuccess: isUpdateProjectSuccess,
  } = useUpdateProject();

  const errorSnackbarRef = useRef<ErrorSnackbarRef>(null);

  const handleSubmit = async (values: ValidationSchemaType) => {
    try {
      await updateProjectAsync({
        id: project.id,
        ...values,
      });
      formik.resetForm();
      onClose();
    } catch {
      errorSnackbarRef.current?.showError();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: project.name,
      url: project.url,
      stars: project.stars,
      forks: project.forks,
      issues: project.issues,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": { borderRadius: 4, padding: 3, width: "500px" },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Update Project
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                type="text"
                id="url"
                label="URL"
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.url}
                touched={formik.touched.url}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                type="number"
                id="stars"
                label="Stars"
                value={formik.values.stars}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.stars}
                touched={formik.touched.stars}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                type="number"
                id="forks"
                label="Forks"
                value={formik.values.forks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.forks}
                touched={formik.touched.forks}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                type="number"
                id="issues"
                label="Issues"
                value={formik.values.issues}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.issues}
                touched={formik.touched.issues}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <CustomButton onClick={onClose} variant="outlined" color="primary">
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              loading={isUpdateProjectPending}
              done={isUpdateProjectSuccess}
              variant="contained"
              color="success"
            >
              Update
            </CustomButton>
          </Box>
        </form>
      </DialogContent>
      <ErrorSnackbar
        ref={errorSnackbarRef}
        message="Failed to update project"
      />
    </Dialog>
  );
}
