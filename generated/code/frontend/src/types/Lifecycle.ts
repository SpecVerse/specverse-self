/**
 * Lifecycle Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Lifecycle {
  id: string;
  name: string;
  flow: string;
}

export type CreateLifecycleInput = Omit<Lifecycle, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLifecycleInput = Partial<CreateLifecycleInput>;
