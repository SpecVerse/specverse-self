/**
 * ExtensionTheme Type Definition
 * Auto-generated from SpecVerse model
 */

export interface ExtensionTheme {
  id: string;
  label: string;
  uiTheme: string;
  path: string;
}

export type CreateExtensionThemeInput = Omit<ExtensionTheme, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateExtensionThemeInput = Partial<CreateExtensionThemeInput>;
