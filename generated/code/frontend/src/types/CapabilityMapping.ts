/**
 * CapabilityMapping Type Definition
 * Auto-generated from SpecVerse model
 */

export interface CapabilityMapping {
  id: string;
  capability: string;
  factoryName: string;
}

export type CreateCapabilityMappingInput = Omit<CapabilityMapping, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCapabilityMappingInput = Partial<CreateCapabilityMappingInput>;
