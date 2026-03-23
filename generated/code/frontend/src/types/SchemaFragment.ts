/**
 * SchemaFragment Type Definition
 * Auto-generated from SpecVerse model
 */

export interface SchemaFragment {
  id: string;
  schemaId: string;
  description?: string;
  defsCount: number;
  fragmentType: string;
}

export type CreateSchemaFragmentInput = Omit<SchemaFragment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSchemaFragmentInput = Partial<CreateSchemaFragmentInput>;
