/**
 * LifecycleState Type Definition
 * Auto-generated from SpecVerse model
 */

export interface LifecycleState {
  id: string;
  name: string;
  isInitial?: boolean;
  isTerminal?: boolean;
}

export type CreateLifecycleStateInput = Omit<LifecycleState, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLifecycleStateInput = Partial<CreateLifecycleStateInput>;
