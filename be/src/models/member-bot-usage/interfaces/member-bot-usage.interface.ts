export interface MemberBotUsageInterface {
  id: string;
  userId: string;
  workspaceId: string;
  botSocialId?: string | null;
  botWebId?: string | null;
  chatbotId?: string | null;
  lastUsedAt: Date;
}