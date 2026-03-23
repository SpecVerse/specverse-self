/**
 * InstanceFactory Type Definition
 * Auto-generated from SpecVerse model
 */

export interface InstanceFactory {
  id: string;
  name: string;
  version: string;
  category: string;
  technology: string;
}

export type CreateInstanceFactoryInput = Omit<InstanceFactory, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInstanceFactoryInput = Partial<CreateInstanceFactoryInput>;
