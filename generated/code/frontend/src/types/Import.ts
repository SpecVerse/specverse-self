/**
 * Import Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Import {
  id: string;
  from: string;
  file?: string;
  package?: string;
  namespace?: string;
  version?: string;
  select?: string;
}

export type CreateImportInput = Omit<Import, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateImportInput = Partial<CreateImportInput>;
