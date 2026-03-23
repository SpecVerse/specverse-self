/**
 * useInvariant
 * Custom React hook for Invariant data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Invariant } from '../types/Invariant';

interface UseInvariantOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useInvariant - Fetch and mutate Invariant data
 */
export function useInvariant(options: UseInvariantOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Invariant
  const { data: invariant, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['invariant', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('InvariantController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Invariants
  const { data: invariants, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['invariants', filters],
    queryFn: async () => {
      return await executeOperation('InvariantController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Invariant>) => {
      return await executeOperation('InvariantController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invariants'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Invariant> }) => {
      return await executeOperation('InvariantController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invariant', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['invariants'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('InvariantController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invariants'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['invariants'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['invariant', id] });
    }
  };

  return {
    invariant,
    invariants,
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
