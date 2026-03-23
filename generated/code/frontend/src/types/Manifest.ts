/**
 * Manifest Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Manifest {
  id: string;
  name: string;
  specVersion: string;
}

export type CreateManifestInput = Omit<Manifest, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateManifestInput = Partial<CreateManifestInput>;
