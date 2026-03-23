/**
 * useRelationship
 * Custom React hook for Relationship data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Relationship } from '../types/Relationship';

interface UseRelationshipOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useRelationship - Fetch and mutate Relationship data
 */
export function useRelationship(options: UseRelationshipOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Relationship
  const { data: relationship, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['relationship', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('RelationshipController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Relationships
  const { data: relationships, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['relationships', filters],
    queryFn: async () => {
      return await executeOperation('RelationshipController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Relationship>) => {
      return await executeOperation('RelationshipController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Relationship> }) => {
      return await executeOperation('RelationshipController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['relationship', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('RelationshipController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['relationship', id] });
    }
  };

  return {
    relationship,
    relationships,
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
