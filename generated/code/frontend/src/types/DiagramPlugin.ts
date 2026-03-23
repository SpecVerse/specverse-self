/**
 * DiagramPlugin Type Definition
 * Auto-generated from SpecVerse model
 */

export interface DiagramPlugin {
  id: string;
  diagramType: string;
  description?: string;
}

export type CreateDiagramPluginInput = Omit<DiagramPlugin, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDiagramPluginInput = Partial<CreateDiagramPluginInput>;
