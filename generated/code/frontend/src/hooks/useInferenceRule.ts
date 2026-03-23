/**
 * useInferenceRule
 * Custom React hook for InferenceRule data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { InferenceRule } from '../types/InferenceRule';

interface UseInferenceRuleOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useInferenceRule - Fetch and mutate InferenceRule data
 */
export function useInferenceRule(options: UseInferenceRuleOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single InferenceRule
  const { data: inferencerule, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['inferencerule', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('InferenceRuleController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of InferenceRules
  const { data: inferencerules, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['inferencerules', filters],
    queryFn: async () => {
      return await executeOperation('InferenceRuleController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<InferenceRule>) => {
      return await executeOperation('InferenceRuleController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inferencerules'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InferenceRule> }) => {
      return await executeOperation('InferenceRuleController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inferencerule', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['inferencerules'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('InferenceRuleController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inferencerules'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['inferencerules'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['inferencerule', id] });
    }
  };

  return {
    inferencerule,
    inferencerules,
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
