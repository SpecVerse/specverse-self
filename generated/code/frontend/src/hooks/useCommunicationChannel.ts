/**
 * useCommunicationChannel
 * Custom React hook for CommunicationChannel data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { CommunicationChannel } from '../types/CommunicationChannel';

interface UseCommunicationChannelOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useCommunicationChannel - Fetch and mutate CommunicationChannel data
 */
export function useCommunicationChannel(options: UseCommunicationChannelOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single CommunicationChannel
  const { data: communicationchannel, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['communicationchannel', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('CommunicationChannelController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of CommunicationChannels
  const { data: communicationchannels, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['communicationchannels', filters],
    queryFn: async () => {
      return await executeOperation('CommunicationChannelController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<CommunicationChannel>) => {
      return await executeOperation('CommunicationChannelController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communicationchannels'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CommunicationChannel> }) => {
      return await executeOperation('CommunicationChannelController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['communicationchannel', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['communicationchannels'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('CommunicationChannelController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communicationchannels'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['communicationchannels'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['communicationchannel', id] });
    }
  };

  return {
    communicationchannel,
    communicationchannels,
    isLoading,
    error,
    refetch,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    delete: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
