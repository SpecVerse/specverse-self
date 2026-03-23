/**
 * AIOrchestrator Type Definition
 * Auto-generated from SpecVerse model
 */

export interface AIOrchestrator {
  id: string;
  name: string;
  providerType: string;
}

export type CreateAIOrchestratorInput = Omit<AIOrchestrator, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAIOrchestratorInput = Partial<CreateAIOrchestratorInput>;
