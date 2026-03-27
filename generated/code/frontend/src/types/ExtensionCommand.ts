/**
 * ExtensionCommand Type Definition
 * Auto-generated from SpecVerse model
 */

export interface ExtensionCommand {
  id: string;
  command: string;
  title: string;
  category?: string;
  enablement?: string;
  keybinding?: string;
}

export type CreateExtensionCommandInput = Omit<ExtensionCommand, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateExtensionCommandInput = Partial<CreateExtensionCommandInput>;
