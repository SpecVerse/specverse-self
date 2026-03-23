/**
 * Relationship Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Relationship {
  id: string;
  name: string;
  relType: string;
  target: string;
  eager?: boolean;
  cascade?: string;
}

export type CreateRelationshipInput = Omit<Relationship, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRelationshipInput = Partial<CreateRelationshipInput>;
