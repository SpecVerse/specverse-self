/**
 * useStep
 * Custom React hook for Step data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Step } from '../types/Step';

interface UseStepOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useStep - Fetch and mutate Step data
 */
export function useStep(options: UseStepOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Step
  const { data: step, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['step', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('StepController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Steps
  const { data: steps, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['steps', filters],
    queryFn: async () => {
      return await executeOperation('StepController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Step>) => {
      return await executeOperation('StepController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Step> }) => {
      return await executeOperation('StepController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['step', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('StepController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['step', id] });
    }
  };

  return {
    step,
    steps,
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
