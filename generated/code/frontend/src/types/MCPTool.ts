/**
 * MCPTool Type Definition
 * Auto-generated from SpecVerse model
 */

export interface MCPTool {
  id: string;
  name: string;
  description: string;
  isEntityModuleTool?: boolean;
}

export type CreateMCPToolInput = Omit<MCPTool, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMCPToolInput = Partial<CreateMCPToolInput>;
