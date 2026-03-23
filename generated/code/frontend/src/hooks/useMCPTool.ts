/**
 * useMCPTool
 * Custom React hook for MCPTool data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { MCPTool } from '../types/MCPTool';

interface UseMCPToolOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useMCPTool - Fetch and mutate MCPTool data
 */
export function useMCPTool(options: UseMCPToolOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single MCPTool
  const { data: mcptool, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['mcptool', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('MCPToolController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of MCPTools
  const { data: mcptools, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['mcptools', filters],
    queryFn: async () => {
      return await executeOperation('MCPToolController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<MCPTool>) => {
      return await executeOperation('MCPToolController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcptools'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<MCPTool> }) => {
      return await executeOperation('MCPToolController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['mcptool', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['mcptools'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('MCPToolController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mcptools'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['mcptools'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['mcptool', id] });
    }
  };

  return {
    mcptool,
    mcptools,
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
