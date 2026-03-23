/**
 * useManifest
 * Custom React hook for Manifest data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Manifest } from '../types/Manifest';

interface UseManifestOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useManifest - Fetch and mutate Manifest data
 */
export function useManifest(options: UseManifestOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Manifest
  const { data: manifest, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['manifest', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ManifestController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Manifests
  const { data: manifests, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['manifests', filters],
    queryFn: async () => {
      return await executeOperation('ManifestController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Manifest>) => {
      return await executeOperation('ManifestController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manifests'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Manifest> }) => {
      return await executeOperation('ManifestController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['manifest', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['manifests'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ManifestController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manifests'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['manifests'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['manifest', id] });
    }
  };

  return {
    manifest,
    manifests,
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
