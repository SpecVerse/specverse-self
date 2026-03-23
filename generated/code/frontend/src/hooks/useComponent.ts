/**
 * useComponent
 * Custom React hook for Component data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Component } from '../types/Component';

interface UseComponentOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useComponent - Fetch and mutate Component data
 */
export function useComponent(options: UseComponentOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Component
  const { data: component, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['component', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ComponentController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Components
  const { data: components, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['components', filters],
    queryFn: async () => {
      return await executeOperation('ComponentController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Component>) => {
      return await executeOperation('ComponentController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Component> }) => {
      return await executeOperation('ComponentController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['component', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['components'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ComponentController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['components'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['components'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['component', id] });
    }
  };

  return {
    component,
    components,
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
