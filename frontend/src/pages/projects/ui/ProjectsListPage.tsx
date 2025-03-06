import { Paper, Button, Box, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { columns } from "../data/constants";
import { useGetProjects } from "@/shared";
import { useState } from "react";
import { PageContainer } from "@/shared/ui/layouts/login/Containers";
import { CreateProjectDialog } from "../components/CreateProjectDialog/ui/CreateProjectDialog";
import { DeleteProjectDialog } from "../components/DeleteProjectDialog/ui/DeleteProjectDialog";

export function ProjectsListPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
  const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
  const [deleteProjectDialogProjectId, setDeleteProjectDialogProjectId] =
    useState<number | null>(null);

  const { data: projects, isLoading } = useGetProjects(
    paginationModel.page + 1
  );

  const CustomToolbar = () => {
    return (
      <Box display="flex" justifyContent="space-between" p={2}>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Project Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={() => setCreateProjectDialogOpen(true)}
            sx={{ mx: 1 }}
          >
            Create Project
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteProjectDialogOpen(true)}
          >
            Delete Project
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <PageContainer>
      <Paper
        elevation={4}
        sx={{ p: 3, borderRadius: 3, maxWidth: "90vw", margin: "auto" }}
      >
        <CustomToolbar />
        <DataGrid
          rows={projects?.data || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10]}
          pagination
          rowCount={projects?.total || 0}
          disableColumnSelector
          disableMultipleRowSelection
          onRowClick={(params) => {
            setDeleteProjectDialogProjectId(params.row.id);
          }}
          loading={isLoading}
          sx={{
            "& .MuiDataGrid-root": {
              borderRadius: 3,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
          }}
        />
      </Paper>
      <CreateProjectDialog
        open={createProjectDialogOpen}
        onClose={() => setCreateProjectDialogOpen(false)}
      />
      <DeleteProjectDialog
        open={deleteProjectDialogOpen}
        onClose={() => setDeleteProjectDialogOpen(false)}
        projectId={deleteProjectDialogProjectId}
      />
    </PageContainer>
  );
}
