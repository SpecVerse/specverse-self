/**
 * useConventionGrammar
 * Custom React hook for ConventionGrammar data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { ConventionGrammar } from '../types/ConventionGrammar';

interface UseConventionGrammarOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useConventionGrammar - Fetch and mutate ConventionGrammar data
 */
export function useConventionGrammar(options: UseConventionGrammarOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single ConventionGrammar
  const { data: conventiongrammar, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['conventiongrammar', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ConventionGrammarController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of ConventionGrammars
  const { data: conventiongrammars, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['conventiongrammars', filters],
    queryFn: async () => {
      return await executeOperation('ConventionGrammarController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<ConventionGrammar>) => {
      return await executeOperation('ConventionGrammarController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conventiongrammars'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ConventionGrammar> }) => {
      return await executeOperation('ConventionGrammarController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conventiongrammar', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['conventiongrammars'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ConventionGrammarController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conventiongrammars'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['conventiongrammars'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['conventiongrammar', id] });
    }
  };

  return {
    conventiongrammar,
    conventiongrammars,
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
