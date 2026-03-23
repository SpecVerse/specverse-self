/**
 * EntityRegistry Type Definition
 * Auto-generated from SpecVerse model
 */

export interface EntityRegistry {
  id: string;
  moduleCount?: number;
  usesKahnsAlgorithm?: boolean;
}

export type CreateEntityRegistryInput = Omit<EntityRegistry, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEntityRegistryInput = Partial<CreateEntityRegistryInput>;
