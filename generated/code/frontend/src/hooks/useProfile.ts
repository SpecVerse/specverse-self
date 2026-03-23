/**
 * useProfile
 * Custom React hook for Profile data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Profile } from '../types/Profile';

interface UseProfileOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useProfile - Fetch and mutate Profile data
 */
export function useProfile(options: UseProfileOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Profile
  const { data: profile, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('ProfileController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Profiles
  const { data: profiles, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['profiles', filters],
    queryFn: async () => {
      return await executeOperation('ProfileController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Profile>) => {
      return await executeOperation('ProfileController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Profile> }) => {
      return await executeOperation('ProfileController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['profile', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('ProfileController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['profile', id] });
    }
  };

  return {
    profile,
    profiles,
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
