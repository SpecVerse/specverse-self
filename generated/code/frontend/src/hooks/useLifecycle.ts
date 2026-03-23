/**
 * useLifecycle
 * Custom React hook for Lifecycle data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Lifecycle } from '../types/Lifecycle';

interface UseLifecycleOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useLifecycle - Fetch and mutate Lifecycle data
 */
export function useLifecycle(options: UseLifecycleOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Lifecycle
  const { data: lifecycle, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['lifecycle', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('LifecycleController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Lifecycles
  const { data: lifecycles, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['lifecycles', filters],
    queryFn: async () => {
      return await executeOperation('LifecycleController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Lifecycle>) => {
      return await executeOperation('LifecycleController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifecycles'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Lifecycle> }) => {
      return await executeOperation('LifecycleController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lifecycle', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['lifecycles'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('LifecycleController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifecycles'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['lifecycles'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['lifecycle', id] });
    }
  };

  return {
    lifecycle,
    lifecycles,
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
