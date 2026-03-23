/**
 * useImport
 * Custom React hook for Import data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Import } from '../types/Import';

interface UseImportOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useImport - Fetch and mutate Import data
 */
export function useImport(options: UseImportOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Import
  const { data: import, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['import', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ImportController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Imports
  const { data: imports, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['imports', filters],
    queryFn: async () => {
      return await executeOperation('ImportController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Import>) => {
      return await executeOperation('ImportController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Import> }) => {
      return await executeOperation('ImportController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['import', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['imports'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ImportController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['imports'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['import', id] });
    }
  };

  return {
    import,
    imports,
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
