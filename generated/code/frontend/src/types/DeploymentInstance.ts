/**
 * DeploymentInstance Type Definition
 * Auto-generated from SpecVerse model
 */

export interface DeploymentInstance {
  id: string;
  name: string;
  category: string;
  scale?: number;
}

export type CreateDeploymentInstanceInput = Omit<DeploymentInstance, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDeploymentInstanceInput = Partial<CreateDeploymentInstanceInput>;
