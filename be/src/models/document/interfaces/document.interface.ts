export interface DocumentInterface {
  documentId: string;
  projectId: string;
  name: string;
  description?: string | null;
  content: string;
  createdBy: string;
  updatedAt: Date;
}
