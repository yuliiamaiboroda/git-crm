import { ErrorSnackbarRef, useDeleteProject } from "@/shared";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  projectId: number | null;
}

export function DeleteProjectDialog({ open, onClose, projectId }: Props) {
  const { mutateAsync: deleteProjectAsync } = useDeleteProject();
  const errorSnackbarRef = useRef<ErrorSnackbarRef>(null);

  if (!projectId) {
    onClose();
    return null;
  }

  const onDelete = async () => {
    try {
      await deleteProjectAsync({ id: projectId });
      onClose();
    } catch {
      errorSnackbarRef.current?.showError();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ "& .MuiDialog-paper": { borderRadius: 3, padding: 2 } }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" color="error">
          Delete Project
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={onDelete} variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
