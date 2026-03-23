/**
 * View Type Definition
 * Auto-generated from SpecVerse model
 */

export interface View {
  id: string;
  name: string;
  viewType: string;
  primaryModel: string;
  tags?: string;
  export?: boolean;
  hasProfileSupport?: boolean;
}

export type CreateViewInput = Omit<View, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateViewInput = Partial<CreateViewInput>;
