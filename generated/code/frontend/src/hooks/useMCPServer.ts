/**
 * useMCPServer
 * Custom React hook for MCPServer data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { MCPServer } from '../types/MCPServer';

interface UseMCPServerOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useMCPServer - Fetch and mutate MCPServer data
 */
export function useMCPServer(options: UseMCPServerOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single MCPServer
  const { data: mcpserver, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['mcpserver', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('MCPServerController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of MCPServers
  const { data: mcpservers, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['mcpservers', filters],
    queryFn: async () => {
      return await executeOperation('MCPServerController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<MCPServer>) => {
      return await executeOperation('MCPServerController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcpservers'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<MCPServer> }) => {
      return await executeOperation('MCPServerController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['mcpserver', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['mcpservers'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('MCPServerController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcpservers'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['mcpservers'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['mcpserver', id] });
    }
  };

  return {
    mcpserver,
    mcpservers,
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
