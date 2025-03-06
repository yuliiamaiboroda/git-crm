export interface Project {
  id: number;
  userId: number;
  ownerName: string;
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedList<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateProjectPayload {
  name: string;
}

export interface DeleteProjectPayload {
  id: number;
}
