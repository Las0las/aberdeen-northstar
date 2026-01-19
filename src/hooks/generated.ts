// AUTO-GENERATED - React Query Hooks
// DO NOT EDIT - Regenerate with: node scripts/generate-hooks.js

import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { api, type ListOptions, type PaginatedResponse } from '@/api/typed';
import type { Database } from '@/types/database.types';

type Tables = Database['public']['Tables'];

// Query key factory
export const queryKeys = {
  tags: {
    all: ['tags'] as const,
    lists: () => [...queryKeys.tags.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.tags.lists(), options] as const,
    infinite: () => [...queryKeys.tags.all, 'infinite'] as const,
    details: () => [...queryKeys.tags.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tags.details(), id] as const,
  },
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.users.lists(), options] as const,
    infinite: () => [...queryKeys.users.all, 'infinite'] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  savedSearches: {
    all: ['saved_searches'] as const,
    lists: () => [...queryKeys.savedSearches.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.savedSearches.lists(), options] as const,
    infinite: () => [...queryKeys.savedSearches.all, 'infinite'] as const,
    details: () => [...queryKeys.savedSearches.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.savedSearches.details(), id] as const,
  },
  activities: {
    all: ['activities'] as const,
    lists: () => [...queryKeys.activities.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.activities.lists(), options] as const,
    infinite: () => [...queryKeys.activities.all, 'infinite'] as const,
    details: () => [...queryKeys.activities.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.activities.details(), id] as const,
  },
  integrationConnections: {
    all: ['integration_connections'] as const,
    lists: () => [...queryKeys.integrationConnections.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.integrationConnections.lists(), options] as const,
    infinite: () => [...queryKeys.integrationConnections.all, 'infinite'] as const,
    details: () => [...queryKeys.integrationConnections.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.integrationConnections.details(), id] as const,
  },
  messages: {
    all: ['messages'] as const,
    lists: () => [...queryKeys.messages.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.messages.lists(), options] as const,
    infinite: () => [...queryKeys.messages.all, 'infinite'] as const,
    details: () => [...queryKeys.messages.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.messages.details(), id] as const,
  },
  workspaces: {
    all: ['workspaces'] as const,
    lists: () => [...queryKeys.workspaces.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.workspaces.lists(), options] as const,
    infinite: () => [...queryKeys.workspaces.all, 'infinite'] as const,
    details: () => [...queryKeys.workspaces.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.workspaces.details(), id] as const,
  },
  clients: {
    all: ['clients'] as const,
    lists: () => [...queryKeys.clients.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.clients.lists(), options] as const,
    infinite: () => [...queryKeys.clients.all, 'infinite'] as const,
    details: () => [...queryKeys.clients.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.clients.details(), id] as const,
  },
  jobs: {
    all: ['jobs'] as const,
    lists: () => [...queryKeys.jobs.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.jobs.lists(), options] as const,
    infinite: () => [...queryKeys.jobs.all, 'infinite'] as const,
    details: () => [...queryKeys.jobs.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.jobs.details(), id] as const,
  },
  notes: {
    all: ['notes'] as const,
    lists: () => [...queryKeys.notes.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.notes.lists(), options] as const,
    infinite: () => [...queryKeys.notes.all, 'infinite'] as const,
    details: () => [...queryKeys.notes.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.notes.details(), id] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    lists: () => [...queryKeys.notifications.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.notifications.lists(), options] as const,
    infinite: () => [...queryKeys.notifications.all, 'infinite'] as const,
    details: () => [...queryKeys.notifications.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.notifications.details(), id] as const,
  },
  workspaceMembers: {
    all: ['workspace_members'] as const,
    lists: () => [...queryKeys.workspaceMembers.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.workspaceMembers.lists(), options] as const,
    infinite: () => [...queryKeys.workspaceMembers.all, 'infinite'] as const,
    details: () => [...queryKeys.workspaceMembers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.workspaceMembers.details(), id] as const,
  },
  submissions: {
    all: ['submissions'] as const,
    lists: () => [...queryKeys.submissions.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.submissions.lists(), options] as const,
    infinite: () => [...queryKeys.submissions.all, 'infinite'] as const,
    details: () => [...queryKeys.submissions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.submissions.details(), id] as const,
  },
  interviews: {
    all: ['interviews'] as const,
    lists: () => [...queryKeys.interviews.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.interviews.lists(), options] as const,
    infinite: () => [...queryKeys.interviews.all, 'infinite'] as const,
    details: () => [...queryKeys.interviews.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.interviews.details(), id] as const,
  },
  invoices: {
    all: ['invoices'] as const,
    lists: () => [...queryKeys.invoices.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.invoices.lists(), options] as const,
    infinite: () => [...queryKeys.invoices.all, 'infinite'] as const,
    details: () => [...queryKeys.invoices.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.invoices.details(), id] as const,
  },
  workflows: {
    all: ['workflows'] as const,
    lists: () => [...queryKeys.workflows.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.workflows.lists(), options] as const,
    infinite: () => [...queryKeys.workflows.all, 'infinite'] as const,
    details: () => [...queryKeys.workflows.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.workflows.details(), id] as const,
  },
  contacts: {
    all: ['contacts'] as const,
    lists: () => [...queryKeys.contacts.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.contacts.lists(), options] as const,
    infinite: () => [...queryKeys.contacts.all, 'infinite'] as const,
    details: () => [...queryKeys.contacts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.contacts.details(), id] as const,
  },
  meetings: {
    all: ['meetings'] as const,
    lists: () => [...queryKeys.meetings.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.meetings.lists(), options] as const,
    infinite: () => [...queryKeys.meetings.all, 'infinite'] as const,
    details: () => [...queryKeys.meetings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.meetings.details(), id] as const,
  },
  timesheets: {
    all: ['timesheets'] as const,
    lists: () => [...queryKeys.timesheets.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.timesheets.lists(), options] as const,
    infinite: () => [...queryKeys.timesheets.all, 'infinite'] as const,
    details: () => [...queryKeys.timesheets.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.timesheets.details(), id] as const,
  },
  applications: {
    all: ['applications'] as const,
    lists: () => [...queryKeys.applications.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.applications.lists(), options] as const,
    infinite: () => [...queryKeys.applications.all, 'infinite'] as const,
    details: () => [...queryKeys.applications.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.applications.details(), id] as const,
  },
  templates: {
    all: ['templates'] as const,
    lists: () => [...queryKeys.templates.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.templates.lists(), options] as const,
    infinite: () => [...queryKeys.templates.all, 'infinite'] as const,
    details: () => [...queryKeys.templates.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.templates.details(), id] as const,
  },
  teams: {
    all: ['teams'] as const,
    lists: () => [...queryKeys.teams.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.teams.lists(), options] as const,
    infinite: () => [...queryKeys.teams.all, 'infinite'] as const,
    details: () => [...queryKeys.teams.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.teams.details(), id] as const,
  },
  offers: {
    all: ['offers'] as const,
    lists: () => [...queryKeys.offers.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.offers.lists(), options] as const,
    infinite: () => [...queryKeys.offers.all, 'infinite'] as const,
    details: () => [...queryKeys.offers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.offers.details(), id] as const,
  },
  reports: {
    all: ['reports'] as const,
    lists: () => [...queryKeys.reports.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.reports.lists(), options] as const,
    infinite: () => [...queryKeys.reports.all, 'infinite'] as const,
    details: () => [...queryKeys.reports.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.reports.details(), id] as const,
  },
  documents: {
    all: ['documents'] as const,
    lists: () => [...queryKeys.documents.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.documents.lists(), options] as const,
    infinite: () => [...queryKeys.documents.all, 'infinite'] as const,
    details: () => [...queryKeys.documents.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.documents.details(), id] as const,
  },
  placements: {
    all: ['placements'] as const,
    lists: () => [...queryKeys.placements.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.placements.lists(), options] as const,
    infinite: () => [...queryKeys.placements.all, 'infinite'] as const,
    details: () => [...queryKeys.placements.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.placements.details(), id] as const,
  },
  organizations: {
    all: ['organizations'] as const,
    lists: () => [...queryKeys.organizations.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.organizations.lists(), options] as const,
    infinite: () => [...queryKeys.organizations.all, 'infinite'] as const,
    details: () => [...queryKeys.organizations.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.organizations.details(), id] as const,
  },
  talentPools: {
    all: ['talent_pools'] as const,
    lists: () => [...queryKeys.talentPools.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.talentPools.lists(), options] as const,
    infinite: () => [...queryKeys.talentPools.all, 'infinite'] as const,
    details: () => [...queryKeys.talentPools.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.talentPools.details(), id] as const,
  },
  tasks: {
    all: ['tasks'] as const,
    lists: () => [...queryKeys.tasks.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.tasks.lists(), options] as const,
    infinite: () => [...queryKeys.tasks.all, 'infinite'] as const,
    details: () => [...queryKeys.tasks.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tasks.details(), id] as const,
  },
  roles: {
    all: ['roles'] as const,
    lists: () => [...queryKeys.roles.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.roles.lists(), options] as const,
    infinite: () => [...queryKeys.roles.all, 'infinite'] as const,
    details: () => [...queryKeys.roles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.roles.details(), id] as const,
  },
  settings: {
    all: ['settings'] as const,
    lists: () => [...queryKeys.settings.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.settings.lists(), options] as const,
    infinite: () => [...queryKeys.settings.all, 'infinite'] as const,
    details: () => [...queryKeys.settings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.settings.details(), id] as const,
  },
  bench: {
    all: ['bench'] as const,
    lists: () => [...queryKeys.bench.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.bench.lists(), options] as const,
    infinite: () => [...queryKeys.bench.all, 'infinite'] as const,
    details: () => [...queryKeys.bench.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bench.details(), id] as const,
  },
  appUsers: {
    all: ['app_users'] as const,
    lists: () => [...queryKeys.appUsers.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.appUsers.lists(), options] as const,
    infinite: () => [...queryKeys.appUsers.all, 'infinite'] as const,
    details: () => [...queryKeys.appUsers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.appUsers.details(), id] as const,
  },
  candidates: {
    all: ['candidates'] as const,
    lists: () => [...queryKeys.candidates.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.candidates.lists(), options] as const,
    infinite: () => [...queryKeys.candidates.all, 'infinite'] as const,
    details: () => [...queryKeys.candidates.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.candidates.details(), id] as const,
  },
  companies: {
    all: ['companies'] as const,
    lists: () => [...queryKeys.companies.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.companies.lists(), options] as const,
    infinite: () => [...queryKeys.companies.all, 'infinite'] as const,
    details: () => [...queryKeys.companies.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.companies.details(), id] as const,
  },
};

// ============ Tags Hooks ============

// Get single Tag
export function useTag(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.tags.detail(id!),
    queryFn: () => api.tags.get(id!),
    enabled: !!id,
  });
}

// List Tags with pagination
export function useTags(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.tags.list(options),
    queryFn: () => api.tags.list(options),
  });
}

// Infinite Tags
export function useTagsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.tags.infinite(), options],
    queryFn: ({ pageParam }) => api.tags.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Tag
export function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['tags']['Insert'], 'organization_id'>) => api.tags.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
  });
}

// Update Tag
export function useUpdateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['tags']['Update'] }) =>
      api.tags.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.lists() });
    },
  });
}

// Delete Tag
export function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.tags.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tags.all });
    },
  });
}

// ============ Users Hooks ============

// Get single User
export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.users.detail(id!),
    queryFn: () => api.users.get(id!),
    enabled: !!id,
  });
}

// List Users with pagination
export function useUsers(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.users.list(options),
    queryFn: () => api.users.list(options),
  });
}

// Infinite Users
export function useUsersInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.users.infinite(), options],
    queryFn: ({ pageParam }) => api.users.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create User
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['users']['Insert'], 'organization_id'>) => api.users.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

// Update User
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['users']['Update'] }) =>
      api.users.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

// Delete User
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.users.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

// ============ SavedSearches Hooks ============

// Get single SavedSearch
export function useSavedSearch(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.savedSearches.detail(id!),
    queryFn: () => api.savedSearches.get(id!),
    enabled: !!id,
  });
}

// List SavedSearches with pagination
export function useSavedSearches(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.savedSearches.list(options),
    queryFn: () => api.savedSearches.list(options),
  });
}

// Infinite SavedSearches
export function useSavedSearchesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.savedSearches.infinite(), options],
    queryFn: ({ pageParam }) => api.savedSearches.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create SavedSearch
export function useCreateSavedSearch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['saved_searches']['Insert'], 'organization_id'>) => api.savedSearches.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedSearches.all });
    },
  });
}

// Update SavedSearch
export function useUpdateSavedSearch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['saved_searches']['Update'] }) =>
      api.savedSearches.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedSearches.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.savedSearches.lists() });
    },
  });
}

// Delete SavedSearch
export function useDeleteSavedSearch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.savedSearches.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedSearches.all });
    },
  });
}

// ============ Activities Hooks ============

// Get single Activity
export function useActivity(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.activities.detail(id!),
    queryFn: () => api.activities.get(id!),
    enabled: !!id,
  });
}

// List Activities with pagination
export function useActivities(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.activities.list(options),
    queryFn: () => api.activities.list(options),
  });
}

// Infinite Activities
export function useActivitiesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.activities.infinite(), options],
    queryFn: ({ pageParam }) => api.activities.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Activity
export function useCreateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['activities']['Insert'], 'organization_id'>) => api.activities.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.all });
    },
  });
}

// Update Activity
export function useUpdateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['activities']['Update'] }) =>
      api.activities.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.lists() });
    },
  });
}

// Delete Activity
export function useDeleteActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.activities.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.activities.all });
    },
  });
}

// ============ IntegrationConnections Hooks ============

// Get single IntegrationConnection
export function useIntegrationConnection(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.integrationConnections.detail(id!),
    queryFn: () => api.integrationConnections.get(id!),
    enabled: !!id,
  });
}

// List IntegrationConnections with pagination
export function useIntegrationConnections(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.integrationConnections.list(options),
    queryFn: () => api.integrationConnections.list(options),
  });
}

// Infinite IntegrationConnections
export function useIntegrationConnectionsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.integrationConnections.infinite(), options],
    queryFn: ({ pageParam }) => api.integrationConnections.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create IntegrationConnection
export function useCreateIntegrationConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['integration_connections']['Insert'], 'organization_id'>) => api.integrationConnections.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.integrationConnections.all });
    },
  });
}

// Update IntegrationConnection
export function useUpdateIntegrationConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['integration_connections']['Update'] }) =>
      api.integrationConnections.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.integrationConnections.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.integrationConnections.lists() });
    },
  });
}

// Delete IntegrationConnection
export function useDeleteIntegrationConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.integrationConnections.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.integrationConnections.all });
    },
  });
}

// ============ Messages Hooks ============

// Get single Message
export function useMessage(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.messages.detail(id!),
    queryFn: () => api.messages.get(id!),
    enabled: !!id,
  });
}

// List Messages with pagination
export function useMessages(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.messages.list(options),
    queryFn: () => api.messages.list(options),
  });
}

// Infinite Messages
export function useMessagesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.messages.infinite(), options],
    queryFn: ({ pageParam }) => api.messages.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Message
export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['messages']['Insert'], 'organization_id'>) => api.messages.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.all });
    },
  });
}

// Update Message
export function useUpdateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['messages']['Update'] }) =>
      api.messages.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.lists() });
    },
  });
}

// Delete Message
export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.messages.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.messages.all });
    },
  });
}

// ============ Workspaces Hooks ============

// Get single Workspace
export function useWorkspace(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.workspaces.detail(id!),
    queryFn: () => api.workspaces.get(id!),
    enabled: !!id,
  });
}

// List Workspaces with pagination
export function useWorkspaces(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.workspaces.list(options),
    queryFn: () => api.workspaces.list(options),
  });
}

// Infinite Workspaces
export function useWorkspacesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.workspaces.infinite(), options],
    queryFn: ({ pageParam }) => api.workspaces.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Workspace
export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['workspaces']['Insert'], 'organization_id'>) => api.workspaces.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces.all });
    },
  });
}

// Update Workspace
export function useUpdateWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['workspaces']['Update'] }) =>
      api.workspaces.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces.lists() });
    },
  });
}

// Delete Workspace
export function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.workspaces.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces.all });
    },
  });
}

// ============ Clients Hooks ============

// Get single Client
export function useClient(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.clients.detail(id!),
    queryFn: () => api.clients.get(id!),
    enabled: !!id,
  });
}

// List Clients with pagination
export function useClients(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.clients.list(options),
    queryFn: () => api.clients.list(options),
  });
}

// Infinite Clients
export function useClientsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.clients.infinite(), options],
    queryFn: ({ pageParam }) => api.clients.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Client
export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['clients']['Insert'], 'organization_id'>) => api.clients.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}

// Update Client
export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['clients']['Update'] }) =>
      api.clients.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.lists() });
    },
  });
}

// Delete Client
export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.clients.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.clients.all });
    },
  });
}

// ============ Jobs Hooks ============

// Get single Job
export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id!),
    queryFn: () => api.jobs.get(id!),
    enabled: !!id,
  });
}

// List Jobs with pagination
export function useJobs(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.jobs.list(options),
    queryFn: () => api.jobs.list(options),
  });
}

// Infinite Jobs
export function useJobsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.jobs.infinite(), options],
    queryFn: ({ pageParam }) => api.jobs.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Job
export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['jobs']['Insert'], 'organization_id'>) => api.jobs.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

// Update Job
export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['jobs']['Update'] }) =>
      api.jobs.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.lists() });
    },
  });
}

// Delete Job
export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.jobs.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
    },
  });
}

// ============ Notes Hooks ============

// Get single Note
export function useNote(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.notes.detail(id!),
    queryFn: () => api.notes.get(id!),
    enabled: !!id,
  });
}

// List Notes with pagination
export function useNotes(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.notes.list(options),
    queryFn: () => api.notes.list(options),
  });
}

// Infinite Notes
export function useNotesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.notes.infinite(), options],
    queryFn: ({ pageParam }) => api.notes.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Note
export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['notes']['Insert'], 'organization_id'>) => api.notes.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.all });
    },
  });
}

// Update Note
export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['notes']['Update'] }) =>
      api.notes.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.lists() });
    },
  });
}

// Delete Note
export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.notes.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.all });
    },
  });
}

// ============ Notifications Hooks ============

// Get single Notification
export function useNotification(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.notifications.detail(id!),
    queryFn: () => api.notifications.get(id!),
    enabled: !!id,
  });
}

// List Notifications with pagination
export function useNotifications(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.notifications.list(options),
    queryFn: () => api.notifications.list(options),
  });
}

// Infinite Notifications
export function useNotificationsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.notifications.infinite(), options],
    queryFn: ({ pageParam }) => api.notifications.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Notification
export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['notifications']['Insert'], 'organization_id'>) => api.notifications.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}

// Update Notification
export function useUpdateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['notifications']['Update'] }) =>
      api.notifications.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.lists() });
    },
  });
}

// Delete Notification
export function useDeleteNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.notifications.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
  });
}

// ============ WorkspaceMembers Hooks ============

// Get single WorkspaceMember
export function useWorkspaceMember(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.workspaceMembers.detail(id!),
    queryFn: () => api.workspaceMembers.get(id!),
    enabled: !!id,
  });
}

// List WorkspaceMembers with pagination
export function useWorkspaceMembers(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.workspaceMembers.list(options),
    queryFn: () => api.workspaceMembers.list(options),
  });
}

// Infinite WorkspaceMembers
export function useWorkspaceMembersInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.workspaceMembers.infinite(), options],
    queryFn: ({ pageParam }) => api.workspaceMembers.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create WorkspaceMember
export function useCreateWorkspaceMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['workspace_members']['Insert'], 'organization_id'>) => api.workspaceMembers.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceMembers.all });
    },
  });
}

// Update WorkspaceMember
export function useUpdateWorkspaceMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['workspace_members']['Update'] }) =>
      api.workspaceMembers.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceMembers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceMembers.lists() });
    },
  });
}

// Delete WorkspaceMember
export function useDeleteWorkspaceMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.workspaceMembers.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaceMembers.all });
    },
  });
}

// ============ Submissions Hooks ============

// Get single Submission
export function useSubmission(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.submissions.detail(id!),
    queryFn: () => api.submissions.get(id!),
    enabled: !!id,
  });
}

// List Submissions with pagination
export function useSubmissions(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.submissions.list(options),
    queryFn: () => api.submissions.list(options),
  });
}

// Infinite Submissions
export function useSubmissionsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.submissions.infinite(), options],
    queryFn: ({ pageParam }) => api.submissions.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Submission
export function useCreateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['submissions']['Insert'], 'organization_id'>) => api.submissions.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
    },
  });
}

// Update Submission
export function useUpdateSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['submissions']['Update'] }) =>
      api.submissions.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.lists() });
    },
  });
}

// Delete Submission
export function useDeleteSubmission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.submissions.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
    },
  });
}

// ============ Interviews Hooks ============

// Get single Interview
export function useInterview(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.interviews.detail(id!),
    queryFn: () => api.interviews.get(id!),
    enabled: !!id,
  });
}

// List Interviews with pagination
export function useInterviews(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.interviews.list(options),
    queryFn: () => api.interviews.list(options),
  });
}

// Infinite Interviews
export function useInterviewsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.interviews.infinite(), options],
    queryFn: ({ pageParam }) => api.interviews.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Interview
export function useCreateInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['interviews']['Insert'], 'organization_id'>) => api.interviews.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.all });
    },
  });
}

// Update Interview
export function useUpdateInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['interviews']['Update'] }) =>
      api.interviews.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.lists() });
    },
  });
}

// Delete Interview
export function useDeleteInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.interviews.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.all });
    },
  });
}

// ============ Invoices Hooks ============

// Get single Invoice
export function useInvoice(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.invoices.detail(id!),
    queryFn: () => api.invoices.get(id!),
    enabled: !!id,
  });
}

// List Invoices with pagination
export function useInvoices(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.invoices.list(options),
    queryFn: () => api.invoices.list(options),
  });
}

// Infinite Invoices
export function useInvoicesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.invoices.infinite(), options],
    queryFn: ({ pageParam }) => api.invoices.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Invoice
export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['invoices']['Insert'], 'organization_id'>) => api.invoices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
    },
  });
}

// Update Invoice
export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['invoices']['Update'] }) =>
      api.invoices.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.lists() });
    },
  });
}

// Delete Invoice
export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.invoices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invoices.all });
    },
  });
}

// ============ Workflows Hooks ============

// Get single Workflow
export function useWorkflow(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.workflows.detail(id!),
    queryFn: () => api.workflows.get(id!),
    enabled: !!id,
  });
}

// List Workflows with pagination
export function useWorkflows(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.workflows.list(options),
    queryFn: () => api.workflows.list(options),
  });
}

// Infinite Workflows
export function useWorkflowsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.workflows.infinite(), options],
    queryFn: ({ pageParam }) => api.workflows.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Workflow
export function useCreateWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['workflows']['Insert'], 'organization_id'>) => api.workflows.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workflows.all });
    },
  });
}

// Update Workflow
export function useUpdateWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['workflows']['Update'] }) =>
      api.workflows.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workflows.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.workflows.lists() });
    },
  });
}

// Delete Workflow
export function useDeleteWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.workflows.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.workflows.all });
    },
  });
}

// ============ Contacts Hooks ============

// Get single Contact
export function useContact(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.contacts.detail(id!),
    queryFn: () => api.contacts.get(id!),
    enabled: !!id,
  });
}

// List Contacts with pagination
export function useContacts(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.contacts.list(options),
    queryFn: () => api.contacts.list(options),
  });
}

// Infinite Contacts
export function useContactsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.contacts.infinite(), options],
    queryFn: ({ pageParam }) => api.contacts.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Contact
export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['contacts']['Insert'], 'organization_id'>) => api.contacts.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
    },
  });
}

// Update Contact
export function useUpdateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['contacts']['Update'] }) =>
      api.contacts.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.lists() });
    },
  });
}

// Delete Contact
export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.contacts.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts.all });
    },
  });
}

// ============ Meetings Hooks ============

// Get single Meeting
export function useMeeting(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.meetings.detail(id!),
    queryFn: () => api.meetings.get(id!),
    enabled: !!id,
  });
}

// List Meetings with pagination
export function useMeetings(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.meetings.list(options),
    queryFn: () => api.meetings.list(options),
  });
}

// Infinite Meetings
export function useMeetingsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.meetings.infinite(), options],
    queryFn: ({ pageParam }) => api.meetings.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Meeting
export function useCreateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['meetings']['Insert'], 'organization_id'>) => api.meetings.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.meetings.all });
    },
  });
}

// Update Meeting
export function useUpdateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['meetings']['Update'] }) =>
      api.meetings.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.meetings.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.meetings.lists() });
    },
  });
}

// Delete Meeting
export function useDeleteMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.meetings.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.meetings.all });
    },
  });
}

// ============ Timesheets Hooks ============

// Get single Timesheet
export function useTimesheet(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.timesheets.detail(id!),
    queryFn: () => api.timesheets.get(id!),
    enabled: !!id,
  });
}

// List Timesheets with pagination
export function useTimesheets(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.timesheets.list(options),
    queryFn: () => api.timesheets.list(options),
  });
}

// Infinite Timesheets
export function useTimesheetsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.timesheets.infinite(), options],
    queryFn: ({ pageParam }) => api.timesheets.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Timesheet
export function useCreateTimesheet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['timesheets']['Insert'], 'organization_id'>) => api.timesheets.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.timesheets.all });
    },
  });
}

// Update Timesheet
export function useUpdateTimesheet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['timesheets']['Update'] }) =>
      api.timesheets.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.timesheets.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.timesheets.lists() });
    },
  });
}

// Delete Timesheet
export function useDeleteTimesheet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.timesheets.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.timesheets.all });
    },
  });
}

// ============ Applications Hooks ============

// Get single Application
export function useApplication(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.applications.detail(id!),
    queryFn: () => api.applications.get(id!),
    enabled: !!id,
  });
}

// List Applications with pagination
export function useApplications(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.applications.list(options),
    queryFn: () => api.applications.list(options),
  });
}

// Infinite Applications
export function useApplicationsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.applications.infinite(), options],
    queryFn: ({ pageParam }) => api.applications.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Application
export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['applications']['Insert'], 'organization_id'>) => api.applications.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
    },
  });
}

// Update Application
export function useUpdateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['applications']['Update'] }) =>
      api.applications.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.lists() });
    },
  });
}

// Delete Application
export function useDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.applications.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications.all });
    },
  });
}

// ============ Templates Hooks ============

// Get single Template
export function useTemplate(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.templates.detail(id!),
    queryFn: () => api.templates.get(id!),
    enabled: !!id,
  });
}

// List Templates with pagination
export function useTemplates(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.templates.list(options),
    queryFn: () => api.templates.list(options),
  });
}

// Infinite Templates
export function useTemplatesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.templates.infinite(), options],
    queryFn: ({ pageParam }) => api.templates.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Template
export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['templates']['Insert'], 'organization_id'>) => api.templates.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.all });
    },
  });
}

// Update Template
export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['templates']['Update'] }) =>
      api.templates.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.lists() });
    },
  });
}

// Delete Template
export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.templates.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.templates.all });
    },
  });
}

// ============ Teams Hooks ============

// Get single Team
export function useTeam(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.teams.detail(id!),
    queryFn: () => api.teams.get(id!),
    enabled: !!id,
  });
}

// List Teams with pagination
export function useTeams(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.teams.list(options),
    queryFn: () => api.teams.list(options),
  });
}

// Infinite Teams
export function useTeamsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.teams.infinite(), options],
    queryFn: ({ pageParam }) => api.teams.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Team
export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['teams']['Insert'], 'organization_id'>) => api.teams.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
    },
  });
}

// Update Team
export function useUpdateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['teams']['Update'] }) =>
      api.teams.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.lists() });
    },
  });
}

// Delete Team
export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.teams.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
    },
  });
}

// ============ Offers Hooks ============

// Get single Offer
export function useOffer(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.offers.detail(id!),
    queryFn: () => api.offers.get(id!),
    enabled: !!id,
  });
}

// List Offers with pagination
export function useOffers(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.offers.list(options),
    queryFn: () => api.offers.list(options),
  });
}

// Infinite Offers
export function useOffersInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.offers.infinite(), options],
    queryFn: ({ pageParam }) => api.offers.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Offer
export function useCreateOffer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['offers']['Insert'], 'organization_id'>) => api.offers.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.all });
    },
  });
}

// Update Offer
export function useUpdateOffer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['offers']['Update'] }) =>
      api.offers.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.lists() });
    },
  });
}

// Delete Offer
export function useDeleteOffer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.offers.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.all });
    },
  });
}

// ============ Reports Hooks ============

// Get single Report
export function useReport(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.reports.detail(id!),
    queryFn: () => api.reports.get(id!),
    enabled: !!id,
  });
}

// List Reports with pagination
export function useReports(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.reports.list(options),
    queryFn: () => api.reports.list(options),
  });
}

// Infinite Reports
export function useReportsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.reports.infinite(), options],
    queryFn: ({ pageParam }) => api.reports.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Report
export function useCreateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['reports']['Insert'], 'organization_id'>) => api.reports.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
}

// Update Report
export function useUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['reports']['Update'] }) =>
      api.reports.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.lists() });
    },
  });
}

// Delete Report
export function useDeleteReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.reports.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reports.all });
    },
  });
}

// ============ Documents Hooks ============

// Get single Document
export function useDocument(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.documents.detail(id!),
    queryFn: () => api.documents.get(id!),
    enabled: !!id,
  });
}

// List Documents with pagination
export function useDocuments(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.documents.list(options),
    queryFn: () => api.documents.list(options),
  });
}

// Infinite Documents
export function useDocumentsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.documents.infinite(), options],
    queryFn: ({ pageParam }) => api.documents.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Document
export function useCreateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['documents']['Insert'], 'organization_id'>) => api.documents.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.all });
    },
  });
}

// Update Document
export function useUpdateDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['documents']['Update'] }) =>
      api.documents.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.lists() });
    },
  });
}

// Delete Document
export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.documents.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.documents.all });
    },
  });
}

// ============ Placements Hooks ============

// Get single Placement
export function usePlacement(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.placements.detail(id!),
    queryFn: () => api.placements.get(id!),
    enabled: !!id,
  });
}

// List Placements with pagination
export function usePlacements(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.placements.list(options),
    queryFn: () => api.placements.list(options),
  });
}

// Infinite Placements
export function usePlacementsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.placements.infinite(), options],
    queryFn: ({ pageParam }) => api.placements.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Placement
export function useCreatePlacement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['placements']['Insert'], 'organization_id'>) => api.placements.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.placements.all });
    },
  });
}

// Update Placement
export function useUpdatePlacement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['placements']['Update'] }) =>
      api.placements.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.placements.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.placements.lists() });
    },
  });
}

// Delete Placement
export function useDeletePlacement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.placements.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.placements.all });
    },
  });
}

// ============ Organizations Hooks ============

// Get single Organization
export function useOrganization(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.organizations.detail(id!),
    queryFn: () => api.organizations.get(id!),
    enabled: !!id,
  });
}

// List Organizations with pagination
export function useOrganizations(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.organizations.list(options),
    queryFn: () => api.organizations.list(options),
  });
}

// Infinite Organizations
export function useOrganizationsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.organizations.infinite(), options],
    queryFn: ({ pageParam }) => api.organizations.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Organization
export function useCreateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['organizations']['Insert'], 'organization_id'>) => api.organizations.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all });
    },
  });
}

// Update Organization
export function useUpdateOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['organizations']['Update'] }) =>
      api.organizations.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.lists() });
    },
  });
}

// Delete Organization
export function useDeleteOrganization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.organizations.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organizations.all });
    },
  });
}

// ============ TalentPools Hooks ============

// Get single TalentPool
export function useTalentPool(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.talentPools.detail(id!),
    queryFn: () => api.talentPools.get(id!),
    enabled: !!id,
  });
}

// List TalentPools with pagination
export function useTalentPools(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.talentPools.list(options),
    queryFn: () => api.talentPools.list(options),
  });
}

// Infinite TalentPools
export function useTalentPoolsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.talentPools.infinite(), options],
    queryFn: ({ pageParam }) => api.talentPools.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create TalentPool
export function useCreateTalentPool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['talent_pools']['Insert'], 'organization_id'>) => api.talentPools.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.talentPools.all });
    },
  });
}

// Update TalentPool
export function useUpdateTalentPool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['talent_pools']['Update'] }) =>
      api.talentPools.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.talentPools.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.talentPools.lists() });
    },
  });
}

// Delete TalentPool
export function useDeleteTalentPool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.talentPools.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.talentPools.all });
    },
  });
}

// ============ Tasks Hooks ============

// Get single Task
export function useTask(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id!),
    queryFn: () => api.tasks.get(id!),
    enabled: !!id,
  });
}

// List Tasks with pagination
export function useTasks(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.tasks.list(options),
    queryFn: () => api.tasks.list(options),
  });
}

// Infinite Tasks
export function useTasksInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.tasks.infinite(), options],
    queryFn: ({ pageParam }) => api.tasks.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Task
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['tasks']['Insert'], 'organization_id'>) => api.tasks.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
}

// Update Task
export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['tasks']['Update'] }) =>
      api.tasks.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.lists() });
    },
  });
}

// Delete Task
export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.tasks.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
}

// ============ Roles Hooks ============

// Get single Role
export function useRole(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.roles.detail(id!),
    queryFn: () => api.roles.get(id!),
    enabled: !!id,
  });
}

// List Roles with pagination
export function useRoles(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.roles.list(options),
    queryFn: () => api.roles.list(options),
  });
}

// Infinite Roles
export function useRolesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.roles.infinite(), options],
    queryFn: ({ pageParam }) => api.roles.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Role
export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['roles']['Insert'], 'organization_id'>) => api.roles.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.all });
    },
  });
}

// Update Role
export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['roles']['Update'] }) =>
      api.roles.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.lists() });
    },
  });
}

// Delete Role
export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.roles.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roles.all });
    },
  });
}

// ============ Settings Hooks ============

// Get single Setting
export function useSetting(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.settings.detail(id!),
    queryFn: () => api.settings.get(id!),
    enabled: !!id,
  });
}

// List Settings with pagination
export function useSettings(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.settings.list(options),
    queryFn: () => api.settings.list(options),
  });
}

// Infinite Settings
export function useSettingsInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.settings.infinite(), options],
    queryFn: ({ pageParam }) => api.settings.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Setting
export function useCreateSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['settings']['Insert'], 'organization_id'>) => api.settings.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
}

// Update Setting
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['settings']['Update'] }) =>
      api.settings.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.lists() });
    },
  });
}

// Delete Setting
export function useDeleteSetting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.settings.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
}

// ============ Bench Hooks ============

// Get single BenchEntry
export function useBenchEntry(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.bench.detail(id!),
    queryFn: () => api.bench.get(id!),
    enabled: !!id,
  });
}

// List Bench with pagination
export function useBench(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.bench.list(options),
    queryFn: () => api.bench.list(options),
  });
}

// Infinite Bench
export function useBenchInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.bench.infinite(), options],
    queryFn: ({ pageParam }) => api.bench.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create BenchEntry
export function useCreateBenchEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['bench']['Insert'], 'organization_id'>) => api.bench.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bench.all });
    },
  });
}

// Update BenchEntry
export function useUpdateBenchEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['bench']['Update'] }) =>
      api.bench.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bench.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.bench.lists() });
    },
  });
}

// Delete BenchEntry
export function useDeleteBenchEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.bench.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bench.all });
    },
  });
}

// ============ AppUsers Hooks ============

// Get single AppUser
export function useAppUser(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.appUsers.detail(id!),
    queryFn: () => api.appUsers.get(id!),
    enabled: !!id,
  });
}

// List AppUsers with pagination
export function useAppUsers(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.appUsers.list(options),
    queryFn: () => api.appUsers.list(options),
  });
}

// Infinite AppUsers
export function useAppUsersInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.appUsers.infinite(), options],
    queryFn: ({ pageParam }) => api.appUsers.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create AppUser
export function useCreateAppUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['app_users']['Insert'], 'organization_id'>) => api.appUsers.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appUsers.all });
    },
  });
}

// Update AppUser
export function useUpdateAppUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['app_users']['Update'] }) =>
      api.appUsers.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appUsers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.appUsers.lists() });
    },
  });
}

// Delete AppUser
export function useDeleteAppUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.appUsers.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appUsers.all });
    },
  });
}

// ============ Candidates Hooks ============

// Get single Candidate
export function useCandidate(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.candidates.detail(id!),
    queryFn: () => api.candidates.get(id!),
    enabled: !!id,
  });
}

// List Candidates with pagination
export function useCandidates(options?: ListOptions & { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.candidates.list(options),
    queryFn: () => api.candidates.list(options),
    enabled: options?.enabled !== false,
  });
}

// Infinite Candidates
export function useCandidatesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.candidates.infinite(), options],
    queryFn: ({ pageParam }) => api.candidates.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Candidate
export function useCreateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['candidates']['Insert'], 'organization_id'>) => api.candidates.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates.all });
    },
  });
}

// Update Candidate
export function useUpdateCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['candidates']['Update'] }) =>
      api.candidates.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates.lists() });
    },
  });
}

// Delete Candidate
export function useDeleteCandidate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.candidates.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates.all });
    },
  });
}

// ============ Companies Hooks ============

// Get single Company
export function useCompany(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.companies.detail(id!),
    queryFn: () => api.companies.get(id!),
    enabled: !!id,
  });
}

// List Companies with pagination
export function useCompanies(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.companies.list(options),
    queryFn: () => api.companies.list(options),
  });
}

// Infinite Companies
export function useCompaniesInfinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.companies.infinite(), options],
    queryFn: ({ pageParam }) => api.companies.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create Company
export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Tables['companies']['Insert'], 'organization_id'>) => api.companies.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

// Update Company
export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['companies']['Update'] }) =>
      api.companies.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.lists() });
    },
  });
}

// Delete Company
export function useDeleteCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.companies.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companies.all });
    },
  });
}

// ============ Specialized Hooks ============

// Current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      return api.users.get(user.id);
    },
  });
}

// Candidates search
export function useCandidateSearch(query: string, options?: ListOptions & { enabled?: boolean }) {
  return useQuery({
    queryKey: [...queryKeys.candidates.all, 'search', query, options],
    queryFn: async () => {
      const { supabase } = await import('@/lib/supabase');
      const page = options?.page || 1;
      const pageSize = options?.pageSize || 20;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, error, count } = await supabase
        .from('candidates')
        .select('*', { count: 'exact' })
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
        .range(from, to);
      if (error) throw error;
      
      return {
        data: data || [],
        count: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      };
    },
    enabled: options?.enabled !== false && query.length >= 2,
  });
}

// Jobs by status
export function useJobsByStatus(status: string, options?: ListOptions) {
  return useQuery({
    queryKey: [...queryKeys.jobs.all, 'status', status, options],
    queryFn: () => api.jobs.list({ ...options, filters: { ...options?.filters, status } }),
    enabled: !!status,
  });
}

// Upcoming interviews
export function useUpcomingInterviews(options?: ListOptions) {
  return useQuery({
    queryKey: [...queryKeys.interviews.all, 'upcoming', options],
    queryFn: async () => {
      const { supabase } = await import('@/lib/supabase');
      const { data, error, count } = await supabase
        .from('interviews')
        .select('*', { count: 'exact' })
        .eq('status', 'scheduled')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true });
      if (error) throw error;
      return { data: data || [], count: count || 0 };
    },
  });
}

// Active placements
export function useActivePlacements(options?: ListOptions) {
  return usePlacements({ ...options, filters: { ...options?.filters, status: 'active' } });
}

// Pending tasks (status='open' per contract)
export function usePendingTasks(options?: ListOptions) {
  return useTasks({ ...options, filters: { ...options?.filters, status: 'open' } });
}

// Tasks by assignee
export function useTasksByAssignee(userId: string, options?: ListOptions) {
  return useTasks({ ...options, filters: { ...options?.filters, assigned_to_user_id: userId } });
}

// Notes by candidate
export function useNotesByCandidate(candidateId: string, options?: ListOptions) {
  return useNotes({ ...options, filters: { ...options?.filters, candidate_id: candidateId } });
}

// Applications by job
export function useApplicationsByJob(jobId: string, options?: ListOptions) {
  return useApplications({ ...options, filters: { ...options?.filters, job_id: jobId } });
}

// Applications by candidate
export function useApplicationsByCandidate(candidateId: string, options?: ListOptions) {
  return useApplications({ ...options, filters: { ...options?.filters, candidate_id: candidateId } });
}

// Submissions by job
export function useSubmissionsByJob(jobId: string, options?: ListOptions) {
  return useSubmissions({ ...options, filters: { ...options?.filters, job_id: jobId } });
}

// Bench entries
export function useActiveBench(options?: ListOptions) {
  return useBench({ ...options, filters: { ...options?.filters, status: 'available' } });
}

// Offers by status
export function useOffersByStatus(status: string, options?: ListOptions) {
  return useOffers({ ...options, filters: { ...options?.filters, status } });
}
