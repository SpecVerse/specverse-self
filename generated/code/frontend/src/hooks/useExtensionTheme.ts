/**
 * useExtensionTheme
 * Custom React hook for ExtensionTheme data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { ExtensionTheme } from '../types/ExtensionTheme';

interface UseExtensionThemeOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useExtensionTheme - Fetch and mutate ExtensionTheme data
 */
export function useExtensionTheme(options: UseExtensionThemeOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single ExtensionTheme
  const { data: extensiontheme, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['extensiontheme', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ExtensionThemeController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of ExtensionThemes
  const { data: extensionthemes, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['extensionthemes', filters],
    queryFn: async () => {
      return await executeOperation('ExtensionThemeController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<ExtensionTheme>) => {
      return await executeOperation('ExtensionThemeController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensionthemes'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ExtensionTheme> }) => {
      return await executeOperation('ExtensionThemeController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['extensiontheme', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['extensionthemes'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ExtensionThemeController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensionthemes'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['extensionthemes'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['extensiontheme', id] });
    }
  };

  return {
    extensiontheme,
    extensionthemes,
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
