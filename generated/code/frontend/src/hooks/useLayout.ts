/**
 * useLayout
 * Custom React hook for Layout data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Layout } from '../types/Layout';

interface UseLayoutOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useLayout - Fetch and mutate Layout data
 */
export function useLayout(options: UseLayoutOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Layout
  const { data: layout, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['layout', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('LayoutController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Layouts
  const { data: layouts, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['layouts', filters],
    queryFn: async () => {
      return await executeOperation('LayoutController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Layout>) => {
      return await executeOperation('LayoutController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layouts'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Layout> }) => {
      return await executeOperation('LayoutController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['layout', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['layouts'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('LayoutController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['layouts'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['layouts'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['layout', id] });
    }
  };

  return {
    layout,
    layouts,
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
