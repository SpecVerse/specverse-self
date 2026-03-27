/**
 * useVSCodeExtension
 * Custom React hook for VSCodeExtension data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { VSCodeExtension } from '../types/VSCodeExtension';

interface UseVSCodeExtensionOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useVSCodeExtension - Fetch and mutate VSCodeExtension data
 */
export function useVSCodeExtension(options: UseVSCodeExtensionOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single VSCodeExtension
  const { data: vscodeextension, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['vscodeextension', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('VSCodeExtensionController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of VSCodeExtensions
  const { data: vscodeextensions, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['vscodeextensions', filters],
    queryFn: async () => {
      return await executeOperation('VSCodeExtensionController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<VSCodeExtension>) => {
      return await executeOperation('VSCodeExtensionController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vscodeextensions'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<VSCodeExtension> }) => {
      return await executeOperation('VSCodeExtensionController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['vscodeextension', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['vscodeextensions'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('VSCodeExtensionController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vscodeextensions'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['vscodeextensions'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['vscodeextension', id] });
    }
  };

  return {
    vscodeextension,
    vscodeextensions,
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
