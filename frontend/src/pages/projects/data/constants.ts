import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "url", headerName: "URL" },
  { field: "stars", headerName: "Stars" },
  { field: "forks", headerName: "Forks" },
  { field: "issues", headerName: "Issues" },
];
