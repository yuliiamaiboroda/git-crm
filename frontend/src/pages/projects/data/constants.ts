import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", sortable: false },
  { field: "name", headerName: "Name", sortable: false },
  { field: "ownerName", headerName: "Owner", sortable: false },
  { field: "url", headerName: "URL", sortable: false },
  { field: "stars", headerName: "Stars", sortable: false },
  { field: "forks", headerName: "Forks", sortable: false },
  { field: "issues", headerName: "Issues", sortable: false },
  { field: "createdDate", headerName: "Created At", sortable: false },
];
