import { Box, Button, Typography } from "@mui/material";

interface Props {
  handleOpenCreateProjectDialog: () => void;
  handleOpenDeleteProjectDialog: () => void;
  handleOpenUpdateProjectDialog: () => void;
}

export function Toolbar({
  handleOpenCreateProjectDialog,
  handleOpenDeleteProjectDialog,
  handleOpenUpdateProjectDialog,
}: Props) {
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Typography variant="h5" fontWeight="bold" color="primary">
        Project Management
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpenCreateProjectDialog}
          sx={{ mx: 1 }}
        >
          Create Project
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDeleteProjectDialog}
        >
          Delete Project
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleOpenUpdateProjectDialog}
        >
          Update Project
        </Button>
      </Box>
    </Box>
  );
}
