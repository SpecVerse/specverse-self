/**
 * useView
 * Custom React hook for View data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { View } from '../types/View';

interface UseViewOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useView - Fetch and mutate View data
 */
export function useView(options: UseViewOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single View
  const { data: view, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['view', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ViewController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Views
  const { data: views, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['views', filters],
    queryFn: async () => {
      return await executeOperation('ViewController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<View>) => {
      return await executeOperation('ViewController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['views'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<View> }) => {
      return await executeOperation('ViewController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['view', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['views'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ViewController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['views'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['views'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['view', id] });
    }
  };

  return {
    view,
    views,
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
