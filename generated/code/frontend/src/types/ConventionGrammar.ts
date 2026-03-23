/**
 * ConventionGrammar Type Definition
 * Auto-generated from SpecVerse model
 */

export interface ConventionGrammar {
  id: string;
  domain: string;
  entityType: string;
  conventionCount?: number;
}

export type CreateConventionGrammarInput = Omit<ConventionGrammar, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateConventionGrammarInput = Partial<CreateConventionGrammarInput>;
