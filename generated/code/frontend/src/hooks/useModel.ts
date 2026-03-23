/**
 * useModel
 * Custom React hook for Model data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Model } from '../types/Model';

interface UseModelOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useModel - Fetch and mutate Model data
 */
export function useModel(options: UseModelOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Model
  const { data: model, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['model', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ModelController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Models
  const { data: models, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['models', filters],
    queryFn: async () => {
      return await executeOperation('ModelController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Model>) => {
      return await executeOperation('ModelController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Model> }) => {
      return await executeOperation('ModelController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['model', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ModelController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['models'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['model', id] });
    }
  };

  return {
    model,
    models,
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
