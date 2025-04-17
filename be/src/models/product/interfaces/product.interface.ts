export interface ProductInterface {
  productId: string;
  projectId: string;
  name: string;
  description?: string | null;
  benefit?: string | null;
  promotion?: string | null;
  customerPersona?: string | null;
  customerProblem?: string | null;
  solution?: string | null;
  createdBy: string;
  updatedAt: Date;
}
