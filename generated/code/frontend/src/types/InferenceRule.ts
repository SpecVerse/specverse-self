/**
 * InferenceRule Type Definition
 * Auto-generated from SpecVerse model
 */

export interface InferenceRule {
  id: string;
  ruleId: string;
  description: string;
  pattern: string;
  priority: number;
  category: string;
  conditionExpression?: string;
  isActive?: boolean;
}

export type CreateInferenceRuleInput = Omit<InferenceRule, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInferenceRuleInput = Partial<CreateInferenceRuleInput>;
