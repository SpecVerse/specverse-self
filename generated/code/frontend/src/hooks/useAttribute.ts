/**
 * useAttribute
 * Custom React hook for Attribute data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Attribute } from '../types/Attribute';

interface UseAttributeOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useAttribute - Fetch and mutate Attribute data
 */
export function useAttribute(options: UseAttributeOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Attribute
  const { data: attribute, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['attribute', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('AttributeController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Attributes
  const { data: attributes, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['attributes', filters],
    queryFn: async () => {
      return await executeOperation('AttributeController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Attribute>) => {
      return await executeOperation('AttributeController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Attribute> }) => {
      return await executeOperation('AttributeController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['attribute', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('AttributeController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['attributes'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['attribute', id] });
    }
  };

  return {
    attribute,
    attributes,
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
