/**
 * Profile Type Definition
 * Auto-generated from SpecVerse model
 */

export interface Profile {
  id: string;
  name: string;
  description?: string;
}

export type CreateProfileInput = Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProfileInput = Partial<CreateProfileInput>;
