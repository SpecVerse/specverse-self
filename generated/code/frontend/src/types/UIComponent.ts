/**
 * UIComponent Type Definition
 * Auto-generated from SpecVerse model
 */

export interface UIComponent {
  id: string;
  componentType: string;
  name: string;
}

export type CreateUIComponentInput = Omit<UIComponent, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUIComponentInput = Partial<CreateUIComponentInput>;
