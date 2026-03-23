/**
 * useAIOrchestrator
 * Custom React hook for AIOrchestrator data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { AIOrchestrator } from '../types/AIOrchestrator';

interface UseAIOrchestratorOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useAIOrchestrator - Fetch and mutate AIOrchestrator data
 */
export function useAIOrchestrator(options: UseAIOrchestratorOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single AIOrchestrator
  const { data: aiorchestrator, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['aiorchestrator', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('AIOrchestratorController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of AIOrchestrators
  const { data: aiorchestrators, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['aiorchestrators', filters],
    queryFn: async () => {
      return await executeOperation('AIOrchestratorController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<AIOrchestrator>) => {
      return await executeOperation('AIOrchestratorController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiorchestrators'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AIOrchestrator> }) => {
      return await executeOperation('AIOrchestratorController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aiorchestrator', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['aiorchestrators'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('AIOrchestratorController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiorchestrators'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['aiorchestrators'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['aiorchestrator', id] });
    }
  };

  return {
    aiorchestrator,
    aiorchestrators,
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
