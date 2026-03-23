/**
 * useDeploymentInstance
 * Custom React hook for DeploymentInstance data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { DeploymentInstance } from '../types/DeploymentInstance';

interface UseDeploymentInstanceOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useDeploymentInstance - Fetch and mutate DeploymentInstance data
 */
export function useDeploymentInstance(options: UseDeploymentInstanceOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single DeploymentInstance
  const { data: deploymentinstance, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['deploymentinstance', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('DeploymentInstanceController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of DeploymentInstances
  const { data: deploymentinstances, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['deploymentinstances', filters],
    queryFn: async () => {
      return await executeOperation('DeploymentInstanceController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<DeploymentInstance>) => {
      return await executeOperation('DeploymentInstanceController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deploymentinstances'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DeploymentInstance> }) => {
      return await executeOperation('DeploymentInstanceController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deploymentinstance', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['deploymentinstances'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('DeploymentInstanceController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deploymentinstances'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['deploymentinstances'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['deploymentinstance', id] });
    }
  };

  return {
    deploymentinstance,
    deploymentinstances,
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
