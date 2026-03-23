/**
 * Layout Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Layout {
  id: string;
  layoutType: string;
}

export type CreateLayoutInput = Omit<Layout, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateLayoutInput = Partial<CreateLayoutInput>;
