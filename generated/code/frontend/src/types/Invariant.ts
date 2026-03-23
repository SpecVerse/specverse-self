/**
 * Invariant Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Invariant {
  id: string;
  name: string;
  description: string;
  quintExpression: string;
  category: string;
}

export type CreateInvariantInput = Omit<Invariant, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInvariantInput = Partial<CreateInvariantInput>;
