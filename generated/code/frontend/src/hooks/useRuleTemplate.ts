/**
 * useRuleTemplate
 * Custom React hook for RuleTemplate data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { RuleTemplate } from '../types/RuleTemplate';

interface UseRuleTemplateOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useRuleTemplate - Fetch and mutate RuleTemplate data
 */
export function useRuleTemplate(options: UseRuleTemplateOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single RuleTemplate
  const { data: ruletemplate, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['ruletemplate', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('RuleTemplateController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of RuleTemplates
  const { data: ruletemplates, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['ruletemplates', filters],
    queryFn: async () => {
      return await executeOperation('RuleTemplateController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<RuleTemplate>) => {
      return await executeOperation('RuleTemplateController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ruletemplates'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<RuleTemplate> }) => {
      return await executeOperation('RuleTemplateController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ruletemplate', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['ruletemplates'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('RuleTemplateController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ruletemplates'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['ruletemplates'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['ruletemplate', id] });
    }
  };

  return {
    ruletemplate,
    ruletemplates,
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
