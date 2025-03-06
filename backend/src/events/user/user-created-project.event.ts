export const USER_CREATED_PROJECT = 'USER_CREATED_PROJECT';

export interface userCreatedProjectPayload {
  userId: number;
  projectId: number;
}

export interface userCreatedProjectData {
  payload: userCreatedProjectPayload;
}
