/**
 * useAIWorkflow
 * Custom React hook for AIWorkflow data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { AIWorkflow } from '../types/AIWorkflow';

interface UseAIWorkflowOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useAIWorkflow - Fetch and mutate AIWorkflow data
 */
export function useAIWorkflow(options: UseAIWorkflowOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single AIWorkflow
  const { data: aiworkflow, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['aiworkflow', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('AIWorkflowController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of AIWorkflows
  const { data: aiworkflows, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['aiworkflows', filters],
    queryFn: async () => {
      return await executeOperation('AIWorkflowController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<AIWorkflow>) => {
      return await executeOperation('AIWorkflowController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiworkflows'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<AIWorkflow> }) => {
      return await executeOperation('AIWorkflowController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['aiworkflow', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['aiworkflows'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('AIWorkflowController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiworkflows'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['aiworkflows'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['aiworkflow', id] });
    }
  };

  return {
    aiworkflow,
    aiworkflows,
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
