/**
 * useOperation
 * Custom React hook for Operation data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Operation } from '../types/Operation';

interface UseOperationOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useOperation - Fetch and mutate Operation data
 */
export function useOperation(options: UseOperationOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Operation
  const { data: operation, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['operation', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('OperationController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Operations
  const { data: operations, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['operations', filters],
    queryFn: async () => {
      return await executeOperation('OperationController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Operation>) => {
      return await executeOperation('OperationController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operations'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Operation> }) => {
      return await executeOperation('OperationController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['operation', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['operations'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('OperationController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['operations'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['operations'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['operation', id] });
    }
  };

  return {
    operation,
    operations,
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
