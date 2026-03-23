/**
 * CodeTemplate Type Definition
 * Auto-generated from SpecVerse model
 */

export interface CodeTemplate {
  id: string;
  name: string;
  templateType: string;
  technology: string;
  basePath: string;
}

export type CreateCodeTemplateInput = Omit<CodeTemplate, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCodeTemplateInput = Partial<CreateCodeTemplateInput>;
