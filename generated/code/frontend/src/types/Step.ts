/**
 * Step Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Step {
  id: string;
  ordinal: number;
  instruction?: string;
}

export type CreateStepInput = Omit<Step, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateStepInput = Partial<CreateStepInput>;
