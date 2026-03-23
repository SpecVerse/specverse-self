/**
 * useConventionPattern
 * Custom React hook for ConventionPattern data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { ConventionPattern } from '../types/ConventionPattern';

interface UseConventionPatternOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useConventionPattern - Fetch and mutate ConventionPattern data
 */
export function useConventionPattern(options: UseConventionPatternOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single ConventionPattern
  const { data: conventionpattern, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['conventionpattern', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ConventionPatternController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of ConventionPatterns
  const { data: conventionpatterns, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['conventionpatterns', filters],
    queryFn: async () => {
      return await executeOperation('ConventionPatternController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<ConventionPattern>) => {
      return await executeOperation('ConventionPatternController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conventionpatterns'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ConventionPattern> }) => {
      return await executeOperation('ConventionPatternController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conventionpattern', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['conventionpatterns'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ConventionPatternController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conventionpatterns'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['conventionpatterns'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['conventionpattern', id] });
    }
  };

  return {
    conventionpattern,
    conventionpatterns,
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
