/**
 * useExtensionCommand
 * Custom React hook for ExtensionCommand data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { ExtensionCommand } from '../types/ExtensionCommand';

interface UseExtensionCommandOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useExtensionCommand - Fetch and mutate ExtensionCommand data
 */
export function useExtensionCommand(options: UseExtensionCommandOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single ExtensionCommand
  const { data: extensioncommand, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['extensioncommand', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ExtensionCommandController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of ExtensionCommands
  const { data: extensioncommands, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['extensioncommands', filters],
    queryFn: async () => {
      return await executeOperation('ExtensionCommandController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<ExtensionCommand>) => {
      return await executeOperation('ExtensionCommandController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensioncommands'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ExtensionCommand> }) => {
      return await executeOperation('ExtensionCommandController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['extensioncommand', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['extensioncommands'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ExtensionCommandController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensioncommands'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['extensioncommands'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['extensioncommand', id] });
    }
  };

  return {
    extensioncommand,
    extensioncommands,
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
