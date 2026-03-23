/**
 * useExport
 * Custom React hook for Export data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Export } from '../types/Export';

interface UseExportOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useExport - Fetch and mutate Export data
 */
export function useExport(options: UseExportOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Export
  const { data: export, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['export', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ExportController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Exports
  const { data: exports, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['exports', filters],
    queryFn: async () => {
      return await executeOperation('ExportController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Export>) => {
      return await executeOperation('ExportController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exports'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Export> }) => {
      return await executeOperation('ExportController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['export', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['exports'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ExportController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exports'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['exports'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['export', id] });
    }
  };

  return {
    export,
    exports,
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
