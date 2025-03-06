import { useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { columns } from "../data/constants";

import { PageContainer } from "@/shared/ui/layouts/login/Containers";
import { Project, useGetProjects } from "@/shared";
import {
  CreateProjectDialog,
  DeleteProjectDialog,
  UpdateProjectDialog,
  Toolbar,
} from "../components";

export function ProjectsListPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [createProjectDialogOpen, setCreateProjectDialogOpen] = useState(false);
  const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [updateProjectDialogOpen, setUpdateProjectDialogOpen] = useState(false);

  const handleOpenCreateProjectDialog = () => {
    setCreateProjectDialogOpen(true);
  };
  const handleCloseCreateProjectDialog = () => {
    setCreateProjectDialogOpen(false);
  };
  const handleOpenUpdateProjectDialog = () => {
    setUpdateProjectDialogOpen(true);
  };
  const handleCloseUpdateProjectDialog = () => {
    setUpdateProjectDialogOpen(false);
    setSelectedProject(null);
  };
  const handleOpenDeleteProjectDialog = () => {
    setDeleteProjectDialogOpen(true);
  };
  const handleCloseDeleteProjectDialog = () => {
    setDeleteProjectDialogOpen(false);
    setSelectedProject(null);
  };

  const { data: projects, isLoading } = useGetProjects(
    paginationModel.page + 1
  );

  return (
    <PageContainer>
      <Paper elevation={4}>
        <Toolbar
          handleOpenCreateProjectDialog={handleOpenCreateProjectDialog}
          handleOpenDeleteProjectDialog={handleOpenDeleteProjectDialog}
          handleOpenUpdateProjectDialog={handleOpenUpdateProjectDialog}
        />
        <DataGrid
          rows={projects?.data || []}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          pagination
          rowCount={projects?.total || 0}
          disableColumnSelector
          disableMultipleRowSelection
          onRowClick={(params) => {
            setSelectedProject(params.row);
          }}
          loading={isLoading}
        />
      </Paper>
      <CreateProjectDialog
        open={createProjectDialogOpen}
        onClose={handleCloseCreateProjectDialog}
      />
      <DeleteProjectDialog
        open={deleteProjectDialogOpen}
        onClose={handleCloseDeleteProjectDialog}
        projectId={selectedProject?.id || null}
      />
      {selectedProject && (
        <UpdateProjectDialog
          open={updateProjectDialogOpen}
          onClose={handleCloseUpdateProjectDialog}
          project={selectedProject}
        />
      )}
    </PageContainer>
  );
}
