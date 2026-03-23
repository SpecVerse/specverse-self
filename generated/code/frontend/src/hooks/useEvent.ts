/**
 * useEvent
 * Custom React hook for Event data fetching and mutations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { executeOperation } from '../lib/apiClient';
import type { Event } from '../types/Event';

interface UseEventOptions {
  id?: string;
  list?: boolean;
  filters?: Record<string, any>;
}

/**
 * useEvent - Fetch and mutate Event data
 */
export function useEvent(options: UseEventOptions = {}) {
  const queryClient = useQueryClient();
  const { id, list, filters } = options;

  // Fetch single Event
  const { data: event, isLoading: singleLoading, error: singleError } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      if (!id) return null;
      return await executeOperation('EventController', 'retrieve', { id });
    },
    enabled: !!id && !list,
  });

  // Fetch list of Events
  const { data: events, isLoading: listLoading, error: listError } = useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      return await executeOperation('EventController', 'list', filters || {});
    },
    enabled: list,
  });

  const isLoading = list ? listLoading : singleLoading;
  const error = list ? listError : singleError;

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: Partial<Event>) => {
      return await executeOperation('EventController', 'create', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Event> }) => {
      return await executeOperation('EventController', 'update', { id, ...data });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['event', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await executeOperation('EventController', 'delete', { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  // Refetch functions
  const refetch = () => {
    if (list) {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    } else if (id) {
      queryClient.invalidateQueries({ queryKey: ['event', id] });
    }
  };

  return {
    event,
    events,
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
