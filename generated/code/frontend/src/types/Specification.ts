/**
 * Specification Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Specification {
  id: string;
  filename: string;
  specVersion: string;
}

export type CreateSpecificationInput = Omit<Specification, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSpecificationInput = Partial<CreateSpecificationInput>;
