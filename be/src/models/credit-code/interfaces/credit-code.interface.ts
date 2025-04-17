export interface CreditCodeInterface {
  code: string;
  workspaceId: string;
  totalCredits: number;
  usedCredits: number;
  effectiveDate: Date;
  expirationDate: Date;
  status: string;
  updatedAt: Date;
}
