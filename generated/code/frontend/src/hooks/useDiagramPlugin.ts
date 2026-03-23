/**
 * useDiagramPlugin
 * Custom React hook for DiagramPlugin data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { DiagramPlugin } from '../types/DiagramPlugin';

interface UseDiagramPluginOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useDiagramPlugin - Fetch and mutate DiagramPlugin data
 */
export function useDiagramPlugin(options: UseDiagramPluginOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single DiagramPlugin
  const { data: diagramplugin, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['diagramplugin', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('DiagramPluginController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of DiagramPlugins
  const { data: diagramplugins, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['diagramplugins', filters],
    queryFn: async () => {
      return await executeOperation('DiagramPluginController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<DiagramPlugin>) => {
      return await executeOperation('DiagramPluginController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagramplugins'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DiagramPlugin> }) => {
      return await executeOperation('DiagramPluginController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['diagramplugin', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['diagramplugins'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('DiagramPluginController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagramplugins'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['diagramplugins'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['diagramplugin', id] });
    }
  };

  return {
    diagramplugin,
    diagramplugins,
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
