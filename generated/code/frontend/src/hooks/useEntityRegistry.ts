/**
 * useEntityRegistry
 * Custom React hook for EntityRegistry data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { EntityRegistry } from '../types/EntityRegistry';

interface UseEntityRegistryOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useEntityRegistry - Fetch and mutate EntityRegistry data
 */
export function useEntityRegistry(options: UseEntityRegistryOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single EntityRegistry
  const { data: entityregistry, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['entityregistry', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('EntityRegistryController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of EntityRegistrys
  const { data: entityregistrys, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['entityregistrys', filters],
    queryFn: async () => {
      return await executeOperation('EntityRegistryController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<EntityRegistry>) => {
      return await executeOperation('EntityRegistryController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entityregistrys'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EntityRegistry> }) => {
      return await executeOperation('EntityRegistryController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['entityregistry', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['entityregistrys'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('EntityRegistryController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entityregistrys'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['entityregistrys'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['entityregistry', id] });
    }
  };

  return {
    entityregistry,
    entityregistrys,
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
