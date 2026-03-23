/**
 * BehaviourSpec Type Definition
 * Auto-generated from SpecVerse model
 */

export interface BehaviourSpec {
  id: string;
  entityType: string;
  invariantCount?: number;
  ruleCount?: number;
  verificationStatus?: string;
}

export type CreateBehaviourSpecInput = Omit<BehaviourSpec, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBehaviourSpecInput = Partial<CreateBehaviourSpecInput>;
