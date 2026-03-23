/**
 * ConventionPattern Type Definition
 * Auto-generated from SpecVerse model
 */

export interface ConventionPattern {
  id: string;
  name: string;
  pattern: string;
  expandsTo: string;
  description?: string;
  templateName: string;
  templateBody: string;
}

export type CreateConventionPatternInput = Omit<ConventionPattern, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateConventionPatternInput = Partial<CreateConventionPatternInput>;
