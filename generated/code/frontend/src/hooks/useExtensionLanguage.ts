/**
 * useExtensionLanguage
 * Custom React hook for ExtensionLanguage data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { ExtensionLanguage } from '../types/ExtensionLanguage';

interface UseExtensionLanguageOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useExtensionLanguage - Fetch and mutate ExtensionLanguage data
 */
export function useExtensionLanguage(options: UseExtensionLanguageOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single ExtensionLanguage
  const { data: extensionlanguage, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['extensionlanguage', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ExtensionLanguageController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of ExtensionLanguages
  const { data: extensionlanguages, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['extensionlanguages', filters],
    queryFn: async () => {
      return await executeOperation('ExtensionLanguageController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<ExtensionLanguage>) => {
      return await executeOperation('ExtensionLanguageController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensionlanguages'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ExtensionLanguage> }) => {
      return await executeOperation('ExtensionLanguageController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['extensionlanguage', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['extensionlanguages'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ExtensionLanguageController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['extensionlanguages'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['extensionlanguages'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['extensionlanguage', id] });
    }
  };

  return {
    extensionlanguage,
    extensionlanguages,
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
