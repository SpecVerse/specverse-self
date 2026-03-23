/**
 * Event Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Event {
  id: string;
  name: string;
  description?: string;
  pattern: string;
  modelName: string;
  version: number;
}

export type CreateEventInput = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEventInput = Partial<CreateEventInput>;
