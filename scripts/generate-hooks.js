#!/usr/bin/env node
// React Query Hooks Generator
const fs = require('fs');
const path = require('path');

const CONTRACT_PATH = path.join(__dirname, '../src/db/contract/db_contract.json');
const OUTPUT_PATH = path.join(__dirname, '../src/hooks/generated.ts');

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function toSingular(str) {
  // Handle common irregular plurals
  const irregulars = {
    'Companies': 'Company',
    'Activities': 'Activity',
    'Categories': 'Category',
    'Entities': 'Entity',
    'Properties': 'Property',
    'Queries': 'Query',
    'Stories': 'Story',
    'Bodies': 'Body',
    'Policies': 'Policy',
    'Bench': 'BenchEntry',  // Special case: bench is already singular, use BenchEntry for individual
  };
  if (irregulars[str]) return irregulars[str];
  
  // Handle 'ies' -> 'y'
  if (str.endsWith('ies')) {
    return str.slice(0, -3) + 'y';
  }
  // Handle 'es' -> '' for words ending in s, x, z, ch, sh
  if (str.endsWith('ses') || str.endsWith('xes') || str.endsWith('zes') || str.endsWith('ches') || str.endsWith('shes')) {
    return str.slice(0, -2);
  }
  // Handle regular 's' plural
  if (str.endsWith('s') && !str.endsWith('ss')) {
    return str.slice(0, -1);
  }
  return str;
}

function generateHooks(contract) {
  const coreEntities = [
    'organizations', 'users', 'workspaces', 'workspace_members',
    'candidates', 'companies', 'clients', 'jobs', 'applications',
    'submissions', 'interviews', 'offers', 'placements', 'bench',
    'contacts', 'notes', 'tasks', 'activities', 'documents',
    'teams', 'roles', 'app_users', 'notifications', 'reports',
    'timesheets', 'invoices', 'talent_pools', 'saved_searches',
    'messages', 'meetings', 'tags', 'templates', 'workflows',
    'integration_connections', 'settings'
  ];

  const tables = contract.tables.filter(t => coreEntities.includes(t.table));

  let output = `// AUTO-GENERATED - React Query Hooks
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
`;

  // Generate query keys
  for (const table of tables) {
    const name = table.table;
    const camel = toCamelCase(name);
    output += `  ${camel}: {
    all: ['${name}'] as const,
    lists: () => [...queryKeys.${camel}.all, 'list'] as const,
    list: (options?: ListOptions) => [...queryKeys.${camel}.lists(), options] as const,
    infinite: () => [...queryKeys.${camel}.all, 'infinite'] as const,
    details: () => [...queryKeys.${camel}.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.${camel}.details(), id] as const,
  },
`;
  }

  output += `};

`;

  // Generate hooks for each entity
  for (const table of tables) {
    const name = table.table;
    const camel = toCamelCase(name);
    const pascal = toPascalCase(name);
    const singular = toSingular(pascal);

    output += `// ============ ${pascal} Hooks ============

// Get single ${singular}
export function use${singular}(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.${camel}.detail(id!),
    queryFn: () => api.${camel}.get(id!),
    enabled: !!id,
  });
}

// List ${pascal} with pagination
export function use${pascal}(options?: ListOptions) {
  return useQuery({
    queryKey: queryKeys.${camel}.list(options),
    queryFn: () => api.${camel}.list(options),
  });
}

// Infinite ${pascal}
export function use${pascal}Infinite(options?: Omit<ListOptions, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.${camel}.infinite(), options],
    queryFn: ({ pageParam }) => api.${camel}.listInfinite(pageParam, options),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

// Create ${singular}
export function useCreate${singular}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Tables['${name}']['Insert']) => api.${camel}.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.${camel}.all });
    },
  });
}

// Update ${singular}
export function useUpdate${singular}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Tables['${name}']['Update'] }) =>
      api.${camel}.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.${camel}.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.${camel}.lists() });
    },
  });
}

// Delete ${singular}
export function useDelete${singular}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.${camel}.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.${camel}.all });
    },
  });
}

`;
  }

  // Add specialized hooks
  output += `// ============ Specialized Hooks ============

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
export function useCandidateSearch(query: string, options?: ListOptions) {
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
        .or(\`first_name.ilike.%\${query}%,last_name.ilike.%\${query}%,email.ilike.%\${query}%\`)
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
    enabled: query.length >= 2,
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
`;

  return output;
}

// Main
const contract = JSON.parse(fs.readFileSync(CONTRACT_PATH, 'utf8'));
const output = generateHooks(contract);

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, output);
console.log(`Generated: ${OUTPUT_PATH}`);
