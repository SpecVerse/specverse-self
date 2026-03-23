/**
 * Component Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Component {
  id: string;
  name: string;
  version: string;
  description?: string;
  tags?: string;
}

export type CreateComponentInput = Omit<Component, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateComponentInput = Partial<CreateComponentInput>;
