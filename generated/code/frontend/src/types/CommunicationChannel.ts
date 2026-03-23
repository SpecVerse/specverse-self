/**
 * CommunicationChannel Type Definition
 * Auto-generated from SpecVerse model
 */

export interface CommunicationChannel {
  id: string;
  name: string;
  channelType: string;
}

export type CreateCommunicationChannelInput = Omit<CommunicationChannel, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCommunicationChannelInput = Partial<CreateCommunicationChannelInput>;
