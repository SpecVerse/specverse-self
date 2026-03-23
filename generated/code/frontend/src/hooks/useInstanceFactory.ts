/**
 * useInstanceFactory
 * Custom React hook for InstanceFactory data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { InstanceFactory } from '../types/InstanceFactory';

interface UseInstanceFactoryOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useInstanceFactory - Fetch and mutate InstanceFactory data
 */
export function useInstanceFactory(options: UseInstanceFactoryOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single InstanceFactory
  const { data: instancefactory, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['instancefactory', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('InstanceFactoryController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of InstanceFactorys
  const { data: instancefactorys, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['instancefactorys', filters],
    queryFn: async () => {
      return await executeOperation('InstanceFactoryController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<InstanceFactory>) => {
      return await executeOperation('InstanceFactoryController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instancefactorys'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InstanceFactory> }) => {
      return await executeOperation('InstanceFactoryController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['instancefactory', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['instancefactorys'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('InstanceFactoryController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instancefactorys'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['instancefactorys'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['instancefactory', id] });
    }
  };

  return {
    instancefactory,
    instancefactorys,
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
