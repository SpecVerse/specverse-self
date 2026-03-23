/**
 * usePrimitive
 * Custom React hook for Primitive data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Primitive } from '../types/Primitive';

interface UsePrimitiveOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * usePrimitive - Fetch and mutate Primitive data
 */
export function usePrimitive(options: UsePrimitiveOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Primitive
  const { data: primitive, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['primitive', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('PrimitiveController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Primitives
  const { data: primitives, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['primitives', filters],
    queryFn: async () => {
      return await executeOperation('PrimitiveController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Primitive>) => {
      return await executeOperation('PrimitiveController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['primitives'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Primitive> }) => {
      return await executeOperation('PrimitiveController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['primitive', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['primitives'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('PrimitiveController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['primitives'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['primitives'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['primitive', id] });
    }
  };

  return {
    primitive,
    primitives,
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
