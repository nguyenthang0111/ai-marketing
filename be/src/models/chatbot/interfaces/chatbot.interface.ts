export interface ChatbotInterface {
  chatbotId: string;
  projectId: string;
  name: string;
  description?: string | null;
  favorite: boolean;
  createdBy: string;
  updatedAt: Date;
}
