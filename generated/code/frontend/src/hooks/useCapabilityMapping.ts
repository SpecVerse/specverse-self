/**
 * useCapabilityMapping
 * Custom React hook for CapabilityMapping data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { CapabilityMapping } from '../types/CapabilityMapping';

interface UseCapabilityMappingOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useCapabilityMapping - Fetch and mutate CapabilityMapping data
 */
export function useCapabilityMapping(options: UseCapabilityMappingOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single CapabilityMapping
  const { data: capabilitymapping, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['capabilitymapping', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('CapabilityMappingController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of CapabilityMappings
  const { data: capabilitymappings, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['capabilitymappings', filters],
    queryFn: async () => {
      return await executeOperation('CapabilityMappingController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<CapabilityMapping>) => {
      return await executeOperation('CapabilityMappingController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['capabilitymappings'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CapabilityMapping> }) => {
      return await executeOperation('CapabilityMappingController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['capabilitymapping', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['capabilitymappings'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('CapabilityMappingController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['capabilitymappings'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['capabilitymappings'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['capabilitymapping', id] });
    }
  };

  return {
    capabilitymapping,
    capabilitymappings,
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
