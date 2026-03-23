/**
 * EventVersion Type Definition
 * Auto-generated from SpecVerse model
 */

export interface EventVersion {
  id: string;
  version: number;
  compatibility: string;
  deprecated?: boolean;
  deprecationMessage?: string;
}

export type CreateEventVersionInput = Omit<EventVersion, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEventVersionInput = Partial<CreateEventVersionInput>;
