export interface ProjectInterface {
  projectId: string;
  workspaceId: string;
  name: string;
  description?: string | null;
  createdBy: string;
  updatedAt: Date;
}
