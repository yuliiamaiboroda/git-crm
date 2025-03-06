export interface Project {
  id: number;
  ownerId: number;
  owner: {
    email: string;
  };
  name: string;
  url: string;
  stars: number;
  forks: number;
  issues: number;
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
