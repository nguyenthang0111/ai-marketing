export interface BrandInterface {
  brandId: string;
  projectId: string;
  name: string;
  description?: string | null;
  location?: string | null;
  contactInfo?: string | null;
  createdBy: string;
  updatedAt: Date;
}
