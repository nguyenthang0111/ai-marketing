export interface BotSocialInterface {
  botSocialId: string;
  projectId: string;
  name: string;
  description?: string | null;
  prompt?: string | null;
  favorite: boolean;
  createdBy: string;
  updatedAt: Date;
}
