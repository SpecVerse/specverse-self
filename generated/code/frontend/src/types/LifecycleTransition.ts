/**
 * LifecycleTransition Type Definition
 * Auto-generated from SpecVerse model
 */

export interface LifecycleTransition {
  id: string;
  name: string;
  fromState: string;
  toState: string;
  action?: string;
}

export type CreateLifecycleTransitionInput = Omit<LifecycleTransition, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLifecycleTransitionInput = Partial<CreateLifecycleTransitionInput>;
