/**
 * useEntityModule
 * Custom React hook for EntityModule data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { EntityModule } from '../types/EntityModule';

interface UseEntityModuleOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useEntityModule - Fetch and mutate EntityModule data
 */
export function useEntityModule(options: UseEntityModuleOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single EntityModule
  const { data: entitymodule, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['entitymodule', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('EntityModuleController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of EntityModules
  const { data: entitymodules, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['entitymodules', filters],
    queryFn: async () => {
      return await executeOperation('EntityModuleController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<EntityModule>) => {
      return await executeOperation('EntityModuleController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entitymodules'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EntityModule> }) => {
      return await executeOperation('EntityModuleController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['entitymodule', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['entitymodules'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('EntityModuleController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entitymodules'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['entitymodules'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['entitymodule', id] });
    }
  };

  return {
    entitymodule,
    entitymodules,
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
