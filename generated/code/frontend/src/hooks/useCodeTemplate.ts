/**
 * useCodeTemplate
 * Custom React hook for CodeTemplate data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { CodeTemplate } from '../types/CodeTemplate';

interface UseCodeTemplateOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useCodeTemplate - Fetch and mutate CodeTemplate data
 */
export function useCodeTemplate(options: UseCodeTemplateOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single CodeTemplate
  const { data: codetemplate, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['codetemplate', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('CodeTemplateController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of CodeTemplates
  const { data: codetemplates, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['codetemplates', filters],
    queryFn: async () => {
      return await executeOperation('CodeTemplateController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<CodeTemplate>) => {
      return await executeOperation('CodeTemplateController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['codetemplates'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CodeTemplate> }) => {
      return await executeOperation('CodeTemplateController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['codetemplate', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['codetemplates'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('CodeTemplateController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['codetemplates'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['codetemplates'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['codetemplate', id] });
    }
  };

  return {
    codetemplate,
    codetemplates,
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
