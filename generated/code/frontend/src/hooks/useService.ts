/**
 * useService
 * Custom React hook for Service data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Service } from '../types/Service';

interface UseServiceOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useService - Fetch and mutate Service data
 */
export function useService(options: UseServiceOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Service
  const { data: service, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ServiceController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Services
  const { data: services, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['services', filters],
    queryFn: async () => {
      return await executeOperation('ServiceController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Service>) => {
      return await executeOperation('ServiceController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Service> }) => {
      return await executeOperation('ServiceController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['service', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ServiceController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['service', id] });
    }
  };

  return {
    service,
    services,
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
