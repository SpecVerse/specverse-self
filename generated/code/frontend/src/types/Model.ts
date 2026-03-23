/**
 * Model Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Model {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  name: string;
  description?: string;
  extends?: string;
}

export type CreateModelInput = Omit<Model, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateModelInput = Partial<CreateModelInput>;
