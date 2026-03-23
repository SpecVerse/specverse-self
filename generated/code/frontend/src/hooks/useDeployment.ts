/**
 * useDeployment
 * Custom React hook for Deployment data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Deployment } from '../types/Deployment';

interface UseDeploymentOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useDeployment - Fetch and mutate Deployment data
 */
export function useDeployment(options: UseDeploymentOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Deployment
  const { data: deployment, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['deployment', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('DeploymentController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Deployments
  const { data: deployments, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['deployments', filters],
    queryFn: async () => {
      return await executeOperation('DeploymentController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Deployment>) => {
      return await executeOperation('DeploymentController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Deployment> }) => {
      return await executeOperation('DeploymentController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['deployment', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('DeploymentController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['deployment', id] });
    }
  };

  return {
    deployment,
    deployments,
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
