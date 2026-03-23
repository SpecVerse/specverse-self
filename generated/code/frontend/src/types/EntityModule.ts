/**
 * EntityModule Type Definition
 * Auto-generated from SpecVerse model
 */

export interface EntityModule {
  id: string;
  name: string;
  moduleType: string;
  version: string;
  hasFacetSchema?: boolean;
  hasFacetConventions?: boolean;
  hasFacetInference?: boolean;
  hasFacetBehaviour?: boolean;
  hasFacetGenerators?: boolean;
  hasFacetDiagrams?: boolean;
  hasFacetDocs?: boolean;
  hasFacetTests?: boolean;
}

export type CreateEntityModuleInput = Omit<EntityModule, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEntityModuleInput = Partial<CreateEntityModuleInput>;
