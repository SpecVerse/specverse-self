/**
 * VSCodeExtension Type Definition
 * Auto-generated from SpecVerse model
 */

export interface VSCodeExtension {
  id: string;
  name: string;
  displayName: string;
  publisher: string;
  version: string;
  description?: string;
  categories?: string;
  activationEvents?: string;
}

export type CreateVSCodeExtensionInput = Omit<VSCodeExtension, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateVSCodeExtensionInput = Partial<CreateVSCodeExtensionInput>;
