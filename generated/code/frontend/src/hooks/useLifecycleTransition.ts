/**
 * useLifecycleTransition
 * Custom React hook for LifecycleTransition data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { LifecycleTransition } from '../types/LifecycleTransition';

interface UseLifecycleTransitionOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useLifecycleTransition - Fetch and mutate LifecycleTransition data
 */
export function useLifecycleTransition(options: UseLifecycleTransitionOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single LifecycleTransition
  const { data: lifecycletransition, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['lifecycletransition', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('LifecycleTransitionController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of LifecycleTransitions
  const { data: lifecycletransitions, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['lifecycletransitions', filters],
    queryFn: async () => {
      return await executeOperation('LifecycleTransitionController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<LifecycleTransition>) => {
      return await executeOperation('LifecycleTransitionController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifecycletransitions'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<LifecycleTransition> }) => {
      return await executeOperation('LifecycleTransitionController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['lifecycletransition', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['lifecycletransitions'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('LifecycleTransitionController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lifecycletransitions'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['lifecycletransitions'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['lifecycletransition', id] });
    }
  };

  return {
    lifecycletransition,
    lifecycletransitions,
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
