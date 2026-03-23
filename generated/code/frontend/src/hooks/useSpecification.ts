/**
 * useSpecification
 * Custom React hook for Specification data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Specification } from '../types/Specification';

interface UseSpecificationOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useSpecification - Fetch and mutate Specification data
 */
export function useSpecification(options: UseSpecificationOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Specification
  const { data: specification, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['specification', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('SpecificationController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Specifications
  const { data: specifications, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['specifications', filters],
    queryFn: async () => {
      return await executeOperation('SpecificationController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Specification>) => {
      return await executeOperation('SpecificationController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specifications'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Specification> }) => {
      return await executeOperation('SpecificationController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['specification', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['specifications'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('SpecificationController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specifications'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['specifications'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['specification', id] });
    }
  };

  return {
    specification,
    specifications,
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
