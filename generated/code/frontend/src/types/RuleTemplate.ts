/**
 * RuleTemplate Type Definition
 * Auto-generated from SpecVerse model
 */

export interface RuleTemplate {
  id: string;
  templateType: string;
  content: string;
}

export type CreateRuleTemplateInput = Omit<RuleTemplate, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRuleTemplateInput = Partial<CreateRuleTemplateInput>;
