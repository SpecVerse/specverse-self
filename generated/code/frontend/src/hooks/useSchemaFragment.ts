/**
 * useSchemaFragment
 * Custom React hook for SchemaFragment data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { SchemaFragment } from '../types/SchemaFragment';

interface UseSchemaFragmentOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useSchemaFragment - Fetch and mutate SchemaFragment data
 */
export function useSchemaFragment(options: UseSchemaFragmentOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single SchemaFragment
  const { data: schemafragment, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['schemafragment', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('SchemaFragmentController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of SchemaFragments
  const { data: schemafragments, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['schemafragments', filters],
    queryFn: async () => {
      return await executeOperation('SchemaFragmentController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<SchemaFragment>) => {
      return await executeOperation('SchemaFragmentController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schemafragments'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SchemaFragment> }) => {
      return await executeOperation('SchemaFragmentController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['schemafragment', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['schemafragments'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('SchemaFragmentController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schemafragments'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['schemafragments'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['schemafragment', id] });
    }
  };

  return {
    schemafragment,
    schemafragments,
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
