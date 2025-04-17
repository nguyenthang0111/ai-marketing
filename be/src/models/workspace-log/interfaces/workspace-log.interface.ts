export interface WorkspaceLogInterface {
  logId: string;
  workspaceId: string;
  madeBy: string;
  type: string;
  description?: string | null;
  createdAt: Date;
}
