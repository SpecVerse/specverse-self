/**
 * AIWorkflow Type Definition
 * Auto-generated from SpecVerse model
 */

export interface AIWorkflow {
  id: string;
  name: string;
  description?: string;
  stepCount?: number;
}

export type CreateAIWorkflowInput = Omit<AIWorkflow, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAIWorkflowInput = Partial<CreateAIWorkflowInput>;
