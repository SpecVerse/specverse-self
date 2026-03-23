/**
 * useEventVersion
 * Custom React hook for EventVersion data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { EventVersion } from '../types/EventVersion';

interface UseEventVersionOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useEventVersion - Fetch and mutate EventVersion data
 */
export function useEventVersion(options: UseEventVersionOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single EventVersion
  const { data: eventversion, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['eventversion', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('EventVersionController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of EventVersions
  const { data: eventversions, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['eventversions', filters],
    queryFn: async () => {
      return await executeOperation('EventVersionController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<EventVersion>) => {
      return await executeOperation('EventVersionController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventversions'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EventVersion> }) => {
      return await executeOperation('EventVersionController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['eventversion', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['eventversions'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('EventVersionController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventversions'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['eventversions'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['eventversion', id] });
    }
  };

  return {
    eventversion,
    eventversions,
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
