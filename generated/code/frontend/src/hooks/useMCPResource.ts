/**
 * useMCPResource
 * Custom React hook for MCPResource data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { MCPResource } from '../types/MCPResource';

interface UseMCPResourceOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useMCPResource - Fetch and mutate MCPResource data
 */
export function useMCPResource(options: UseMCPResourceOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single MCPResource
  const { data: mcpresource, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['mcpresource', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('MCPResourceController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of MCPResources
  const { data: mcpresources, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['mcpresources', filters],
    queryFn: async () => {
      return await executeOperation('MCPResourceController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<MCPResource>) => {
      return await executeOperation('MCPResourceController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcpresources'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<MCPResource> }) => {
      return await executeOperation('MCPResourceController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['mcpresource', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['mcpresources'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('MCPResourceController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcpresources'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['mcpresources'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['mcpresource', id] });
    }
  };

  return {
    mcpresource,
    mcpresources,
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
