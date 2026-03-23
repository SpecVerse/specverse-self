/**
 * useBehaviourSpec
 * Custom React hook for BehaviourSpec data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { BehaviourSpec } from '../types/BehaviourSpec';

interface UseBehaviourSpecOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useBehaviourSpec - Fetch and mutate BehaviourSpec data
 */
export function useBehaviourSpec(options: UseBehaviourSpecOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single BehaviourSpec
  const { data: behaviourspec, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['behaviourspec', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('BehaviourSpecController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of BehaviourSpecs
  const { data: behaviourspecs, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['behaviourspecs', filters],
    queryFn: async () => {
      return await executeOperation('BehaviourSpecController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<BehaviourSpec>) => {
      return await executeOperation('BehaviourSpecController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['behaviourspecs'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<BehaviourSpec> }) => {
      return await executeOperation('BehaviourSpecController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['behaviourspec', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['behaviourspecs'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('BehaviourSpecController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['behaviourspecs'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['behaviourspecs'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['behaviourspec', id] });
    }
  };

  return {
    behaviourspec,
    behaviourspecs,
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
