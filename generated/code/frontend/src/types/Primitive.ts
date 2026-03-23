/**
 * Primitive Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Primitive {
  id: string;
  name: string;
  baseType: string;
  description?: string;
  pattern?: string;
  isTypeAlias?: boolean;
}

export type CreatePrimitiveInput = Omit<Primitive, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePrimitiveInput = Partial<CreatePrimitiveInput>;
