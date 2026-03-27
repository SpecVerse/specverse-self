/**
 * ExtensionLanguage Type Definition
 * Auto-generated from SpecVerse model
 */

export interface ExtensionLanguage {
  id: string;
  languageId: string;
  extensions: string;
  configuration?: string;
  grammarScopeName: string;
  grammarPath: string;
}

export type CreateExtensionLanguageInput = Omit<ExtensionLanguage, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateExtensionLanguageInput = Partial<CreateExtensionLanguageInput>;
