/**
 * MCPServer Type Definition
 * Auto-generated from SpecVerse model
 */

export interface MCPServer {
  id: string;
  name: string;
  mode: string;
}

export type CreateMCPServerInput = Omit<MCPServer, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMCPServerInput = Partial<CreateMCPServerInput>;
