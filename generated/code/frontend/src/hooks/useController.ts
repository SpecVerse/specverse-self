/**
 * useController
 * Custom React hook for Controller data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Controller } from '../types/Controller';

interface UseControllerOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useController - Fetch and mutate Controller data
 */
export function useController(options: UseControllerOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Controller
  const { data: controller, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['controller', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ControllerController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Controllers
  const { data: controllers, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['controllers', filters],
    queryFn: async () => {
      return await executeOperation('ControllerController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Controller>) => {
      return await executeOperation('ControllerController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['controllers'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Controller> }) => {
      return await executeOperation('ControllerController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['controller', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['controllers'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ControllerController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['controllers'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['controllers'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['controller', id] });
    }
  };

  return {
    controller,
    controllers,
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
