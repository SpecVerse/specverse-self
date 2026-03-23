/**
 * Attribute Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Attribute {
  id: string;
  name: string;
  attrType: string;
  required?: boolean;
  unique?: boolean;
  searchable?: boolean;
  verified?: boolean;
  defaultValue?: string;
  auto?: string;
}

export type CreateAttributeInput = Omit<Attribute, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAttributeInput = Partial<CreateAttributeInput>;
