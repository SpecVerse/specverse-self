/**
 * Operation Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Operation {
  id: string;
  name: string;
  description?: string;
  returns?: string;
  requires?: string;
  ensures?: string;
}

export type CreateOperationInput = Omit<Operation, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateOperationInput = Partial<CreateOperationInput>;
