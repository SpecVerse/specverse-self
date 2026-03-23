/**
 * Export Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Export {
  id: string;
  capabilities?: string;
}

export type CreateExportInput = Omit<Export, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateExportInput = Partial<CreateExportInput>;
