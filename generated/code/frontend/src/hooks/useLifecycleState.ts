/**
 * useLifecycleState
 * Custom React hook for LifecycleState data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { LifecycleState } from '../types/LifecycleState';

interface UseLifecycleStateOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useLifecycleState - Fetch and mutate LifecycleState data
 */
export function useLifecycleState(options: UseLifecycleStateOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single LifecycleState
  const { data: lifecyclestate, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['lifecyclestate', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('LifecycleStateController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of LifecycleStates
  const { data: lifecyclestates, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['lifecyclestates', filters],
    queryFn: async () => {
      return await executeOperation('LifecycleStateController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<LifecycleState>) => {
      return await executeOperation('LifecycleStateController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifecyclestates'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LifecycleState> }) => {
      return await executeOperation('LifecycleStateController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lifecyclestate', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['lifecyclestates'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('LifecycleStateController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifecyclestates'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['lifecyclestates'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['lifecyclestate', id] });
    }
  };

  return {
    lifecyclestate,
    lifecyclestates,
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
