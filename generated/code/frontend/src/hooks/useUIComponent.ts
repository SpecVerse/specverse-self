/**
 * useUIComponent
 * Custom React hook for UIComponent data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { UIComponent } from '../types/UIComponent';

interface UseUIComponentOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useUIComponent - Fetch and mutate UIComponent data
 */
export function useUIComponent(options: UseUIComponentOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single UIComponent
  const { data: uicomponent, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['uicomponent', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('UIComponentController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of UIComponents
  const { data: uicomponents, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['uicomponents', filters],
    queryFn: async () => {
      return await executeOperation('UIComponentController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<UIComponent>) => {
      return await executeOperation('UIComponentController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uicomponents'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UIComponent> }) => {
      return await executeOperation('UIComponentController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['uicomponent', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['uicomponents'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('UIComponentController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uicomponents'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['uicomponents'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['uicomponent', id] });
    }
  };

  return {
    uicomponent,
    uicomponents,
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
