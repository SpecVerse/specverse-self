/**
 * Controller Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Controller {
  id: string;
  name: string;
  pattern: string;
  parentModel?: string;
  hasAssociationOps?: boolean;
}

export type CreateControllerInput = Omit<Controller, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateControllerInput = Partial<CreateControllerInput>;
