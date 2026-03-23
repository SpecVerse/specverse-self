/**
 * MCPResource Type Definition
 * Auto-generated from SpecVerse model
 */

export interface MCPResource {
  id: string;
  uri: string;
  name: string;
  description?: string;
  mimeType: string;
}

export type CreateMCPResourceInput = Omit<MCPResource, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMCPResourceInput = Partial<CreateMCPResourceInput>;
