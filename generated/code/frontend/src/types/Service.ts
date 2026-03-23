/**
 * Service Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Service {
  id: string;
  name: string;
  pattern: string;
}

export type CreateServiceInput = Omit<Service, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateServiceInput = Partial<CreateServiceInput>;
