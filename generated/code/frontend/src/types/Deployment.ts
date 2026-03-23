/**
 * Deployment Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Deployment {
  id: string;
  name: string;
  environment: string;
}

export type CreateDeploymentInput = Omit<Deployment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDeploymentInput = Partial<CreateDeploymentInput>;
