export interface BotWebInterface {
  botWebId: string;
  projectId: string;
  name: string;
  description?: string | null;
  prompt?: string;
  favorite: boolean;
  createdBy: string;
  updatedAt: Date;
}
