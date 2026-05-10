// AUTO-GENERATED - Typed Supabase API Layer
// DO NOT EDIT - Regenerate with: node scripts/generate-typed-api.js

import { supabase, getOrganizationId } from '@/lib/supabase';
import type { Database } from '@/types/database.types';
import { tableHasOrg } from '@/db/orgScope';

type Tables = Database['public']['Tables'];

// Single source of truth: src/db/orgScope.ts derives org-scoped tables from
// the contract at runtime. Don't duplicate the list here.
export function isOrgScoped(table: string): boolean {
  return tableHasOrg(table);
}

// Pagination types
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface QueryOptions {
  select?: string;
  orderBy?: { column: string; ascending?: boolean };
}

export interface ListOptions extends QueryOptions, PaginationParams {
  filters?: Record<string, unknown>;
}

// Type helpers
type TableName = keyof Tables;
type TableRow<T extends TableName> = Tables[T]['Row'];
type TableInsert<T extends TableName> = Tables[T]['Insert'];
type TableUpdate<T extends TableName> = Tables[T]['Update'];

// Generic CRUD with RLS enforcement
export async function createRecord<T extends TableName>(
  table: T,
  data: Omit<TableInsert<T>, 'organization_id'> & { organization_id?: string }
): Promise<TableRow<T>> {
  let insertData = { ...data } as TableInsert<T>;
  
  if (isOrgScoped(table)) {
    const orgId = await getOrganizationId();
    insertData = { ...insertData, organization_id: orgId } as TableInsert<T>;
  }
  
  // The generated Database types are too loose for the supabase client's
  // strict overload set when T is generic. Cast to any at the call site —
  // the public API surface still has the correct generic types.
  const { data: result, error } = await (supabase
    .from(table as string) as any)
    .insert(insertData)
    .select()
    .single();
  if (error) throw error;
  return result as TableRow<T>;
}

export async function getRecord<T extends TableName>(
  table: T,
  id: string,
  options?: QueryOptions
): Promise<TableRow<T> | null> {
  const { data, error } = await (supabase
    .from(table as string) as any)
    .select(options?.select || '*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data as TableRow<T> | null;
}

export async function listRecords<T extends TableName>(
  table: T,
  options?: ListOptions
): Promise<PaginatedResponse<TableRow<T>>> {
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = (supabase.from(table as string) as any).select(options?.select || '*', { count: 'exact' });
  
  if (options?.filters) {
    for (const [key, value] of Object.entries(options.filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }
  }
  
  if (options?.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);
  if (error) throw error;
  
  return {
    data: (data || []) as TableRow<T>[],
    count: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

export async function updateRecord<T extends TableName>(
  table: T,
  id: string,
  data: TableUpdate<T>
): Promise<TableRow<T>> {
  const { data: result, error } = await (supabase
    .from(table as string) as any)
    .update(data)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return result as TableRow<T>;
}

export async function deleteRecord<T extends TableName>(
  table: T,
  id: string
): Promise<void> {
  const { error } = await (supabase.from(table as string) as any).delete().eq('id', id);
  if (error) throw error;
}

// Infinite query support
export async function listRecordsInfinite<T extends TableName>(
  table: T,
  cursor: string | null,
  options?: Omit<ListOptions, 'page'>
): Promise<{ data: TableRow<T>[]; nextCursor: string | null }> {
  const pageSize = options?.pageSize || 20;

  let query = (supabase
    .from(table as string) as any)
    .select(options?.select || '*')
    .order('created_at', { ascending: false })
    .limit(pageSize + 1);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  if (options?.filters) {
    for (const [key, value] of Object.entries(options.filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }
  }

  const { data, error } = await query;
  if (error) throw error;

  const hasMore = (data?.length || 0) > pageSize;
  const items = hasMore ? data!.slice(0, -1) : (data || []);
  const nextCursor = hasMore && items.length > 0 ? items[items.length - 1].created_at : null;

  return {
    data: items as TableRow<T>[],
    nextCursor,
  };
}


// Tags API
export const tagsApi = {
  create: (data: Omit<TableInsert<'tags'>, 'organization_id'>) => createRecord('tags', data),
  get: (id: string, options?: QueryOptions) => getRecord('tags', id, options),
  list: (options?: ListOptions) => listRecords('tags', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('tags', cursor, options),
  update: (id: string, data: TableUpdate<'tags'>) => updateRecord('tags', id, data),
  delete: (id: string) => deleteRecord('tags', id),
};

// Users API
export const usersApi = {
  create: (data: Omit<TableInsert<'users'>, 'organization_id'>) => createRecord('users', data),
  get: (id: string, options?: QueryOptions) => getRecord('users', id, options),
  list: (options?: ListOptions) => listRecords('users', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('users', cursor, options),
  update: (id: string, data: TableUpdate<'users'>) => updateRecord('users', id, data),
  delete: (id: string) => deleteRecord('users', id),
};

// SavedSearches API
export const savedSearchesApi = {
  create: (data: Omit<TableInsert<'saved_searches'>, 'organization_id'>) => createRecord('saved_searches', data),
  get: (id: string, options?: QueryOptions) => getRecord('saved_searches', id, options),
  list: (options?: ListOptions) => listRecords('saved_searches', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('saved_searches', cursor, options),
  update: (id: string, data: TableUpdate<'saved_searches'>) => updateRecord('saved_searches', id, data),
  delete: (id: string) => deleteRecord('saved_searches', id),
};

// Activities API
export const activitiesApi = {
  create: (data: Omit<TableInsert<'activities'>, 'organization_id'>) => createRecord('activities', data),
  get: (id: string, options?: QueryOptions) => getRecord('activities', id, options),
  list: (options?: ListOptions) => listRecords('activities', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('activities', cursor, options),
  update: (id: string, data: TableUpdate<'activities'>) => updateRecord('activities', id, data),
  delete: (id: string) => deleteRecord('activities', id),
};

// IntegrationConnections API
export const integrationConnectionsApi = {
  create: (data: Omit<TableInsert<'integration_connections'>, 'organization_id'>) => createRecord('integration_connections', data),
  get: (id: string, options?: QueryOptions) => getRecord('integration_connections', id, options),
  list: (options?: ListOptions) => listRecords('integration_connections', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('integration_connections', cursor, options),
  update: (id: string, data: TableUpdate<'integration_connections'>) => updateRecord('integration_connections', id, data),
  delete: (id: string) => deleteRecord('integration_connections', id),
};

// Messages API
export const messagesApi = {
  create: (data: Omit<TableInsert<'messages'>, 'organization_id'>) => createRecord('messages', data),
  get: (id: string, options?: QueryOptions) => getRecord('messages', id, options),
  list: (options?: ListOptions) => listRecords('messages', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('messages', cursor, options),
  update: (id: string, data: TableUpdate<'messages'>) => updateRecord('messages', id, data),
  delete: (id: string) => deleteRecord('messages', id),
};

// Workspaces API
export const workspacesApi = {
  create: (data: Omit<TableInsert<'workspaces'>, 'organization_id'>) => createRecord('workspaces', data),
  get: (id: string, options?: QueryOptions) => getRecord('workspaces', id, options),
  list: (options?: ListOptions) => listRecords('workspaces', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('workspaces', cursor, options),
  update: (id: string, data: TableUpdate<'workspaces'>) => updateRecord('workspaces', id, data),
  delete: (id: string) => deleteRecord('workspaces', id),
};

// Clients API
export const clientsApi = {
  create: (data: Omit<TableInsert<'clients'>, 'organization_id'>) => createRecord('clients', data),
  get: (id: string, options?: QueryOptions) => getRecord('clients', id, options),
  list: (options?: ListOptions) => listRecords('clients', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('clients', cursor, options),
  update: (id: string, data: TableUpdate<'clients'>) => updateRecord('clients', id, data),
  delete: (id: string) => deleteRecord('clients', id),
};

// Jobs API
export const jobsApi = {
  create: (data: Omit<TableInsert<'jobs'>, 'organization_id'>) => createRecord('jobs', data),
  get: (id: string, options?: QueryOptions) => getRecord('jobs', id, options),
  list: (options?: ListOptions) => listRecords('jobs', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('jobs', cursor, options),
  update: (id: string, data: TableUpdate<'jobs'>) => updateRecord('jobs', id, data),
  delete: (id: string) => deleteRecord('jobs', id),
};

// Notes API
export const notesApi = {
  create: (data: Omit<TableInsert<'notes'>, 'organization_id'>) => createRecord('notes', data),
  get: (id: string, options?: QueryOptions) => getRecord('notes', id, options),
  list: (options?: ListOptions) => listRecords('notes', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('notes', cursor, options),
  update: (id: string, data: TableUpdate<'notes'>) => updateRecord('notes', id, data),
  delete: (id: string) => deleteRecord('notes', id),
};

// Notifications API
export const notificationsApi = {
  create: (data: Omit<TableInsert<'notifications'>, 'organization_id'>) => createRecord('notifications', data),
  get: (id: string, options?: QueryOptions) => getRecord('notifications', id, options),
  list: (options?: ListOptions) => listRecords('notifications', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('notifications', cursor, options),
  update: (id: string, data: TableUpdate<'notifications'>) => updateRecord('notifications', id, data),
  delete: (id: string) => deleteRecord('notifications', id),
};

// WorkspaceMembers API
export const workspaceMembersApi = {
  create: (data: Omit<TableInsert<'workspace_members'>, 'id'>) => createRecord('workspace_members', data as unknown as Omit<TableInsert<'workspace_members'>, 'organization_id'>),
  get: (id: string, options?: QueryOptions) => getRecord('workspace_members', id, options),
  list: (options?: ListOptions) => listRecords('workspace_members', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('workspace_members', cursor, options),
  update: (id: string, data: TableUpdate<'workspace_members'>) => updateRecord('workspace_members', id, data),
  delete: (id: string) => deleteRecord('workspace_members', id),
};

// Submissions API
export const submissionsApi = {
  create: (data: Omit<TableInsert<'submissions'>, 'organization_id'>) => createRecord('submissions', data),
  get: (id: string, options?: QueryOptions) => getRecord('submissions', id, options),
  list: (options?: ListOptions) => listRecords('submissions', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('submissions', cursor, options),
  update: (id: string, data: TableUpdate<'submissions'>) => updateRecord('submissions', id, data),
  delete: (id: string) => deleteRecord('submissions', id),
};

// Interviews API
export const interviewsApi = {
  create: (data: Omit<TableInsert<'interviews'>, 'organization_id'>) => createRecord('interviews', data),
  get: (id: string, options?: QueryOptions) => getRecord('interviews', id, options),
  list: (options?: ListOptions) => listRecords('interviews', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('interviews', cursor, options),
  update: (id: string, data: TableUpdate<'interviews'>) => updateRecord('interviews', id, data),
  delete: (id: string) => deleteRecord('interviews', id),
};

// Invoices API
export const invoicesApi = {
  create: (data: Omit<TableInsert<'invoices'>, 'organization_id'>) => createRecord('invoices', data),
  get: (id: string, options?: QueryOptions) => getRecord('invoices', id, options),
  list: (options?: ListOptions) => listRecords('invoices', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('invoices', cursor, options),
  update: (id: string, data: TableUpdate<'invoices'>) => updateRecord('invoices', id, data),
  delete: (id: string) => deleteRecord('invoices', id),
};

// Workflows API
export const workflowsApi = {
  create: (data: Omit<TableInsert<'workflows'>, 'organization_id'>) => createRecord('workflows', data),
  get: (id: string, options?: QueryOptions) => getRecord('workflows', id, options),
  list: (options?: ListOptions) => listRecords('workflows', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('workflows', cursor, options),
  update: (id: string, data: TableUpdate<'workflows'>) => updateRecord('workflows', id, data),
  delete: (id: string) => deleteRecord('workflows', id),
};

// Contacts API
export const contactsApi = {
  create: (data: Omit<TableInsert<'contacts'>, 'organization_id'>) => createRecord('contacts', data),
  get: (id: string, options?: QueryOptions) => getRecord('contacts', id, options),
  list: (options?: ListOptions) => listRecords('contacts', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('contacts', cursor, options),
  update: (id: string, data: TableUpdate<'contacts'>) => updateRecord('contacts', id, data),
  delete: (id: string) => deleteRecord('contacts', id),
};

// Meetings API
export const meetingsApi = {
  create: (data: Omit<TableInsert<'meetings'>, 'organization_id'>) => createRecord('meetings', data),
  get: (id: string, options?: QueryOptions) => getRecord('meetings', id, options),
  list: (options?: ListOptions) => listRecords('meetings', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('meetings', cursor, options),
  update: (id: string, data: TableUpdate<'meetings'>) => updateRecord('meetings', id, data),
  delete: (id: string) => deleteRecord('meetings', id),
};

// Timesheets API
export const timesheetsApi = {
  create: (data: Omit<TableInsert<'timesheets'>, 'organization_id'>) => createRecord('timesheets', data),
  get: (id: string, options?: QueryOptions) => getRecord('timesheets', id, options),
  list: (options?: ListOptions) => listRecords('timesheets', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('timesheets', cursor, options),
  update: (id: string, data: TableUpdate<'timesheets'>) => updateRecord('timesheets', id, data),
  delete: (id: string) => deleteRecord('timesheets', id),
};

// Applications API
export const applicationsApi = {
  create: (data: Omit<TableInsert<'applications'>, 'organization_id'>) => createRecord('applications', data),
  get: (id: string, options?: QueryOptions) => getRecord('applications', id, options),
  list: (options?: ListOptions) => listRecords('applications', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('applications', cursor, options),
  update: (id: string, data: TableUpdate<'applications'>) => updateRecord('applications', id, data),
  delete: (id: string) => deleteRecord('applications', id),
};

// Templates API
export const templatesApi = {
  create: (data: Omit<TableInsert<'templates'>, 'organization_id'>) => createRecord('templates', data),
  get: (id: string, options?: QueryOptions) => getRecord('templates', id, options),
  list: (options?: ListOptions) => listRecords('templates', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('templates', cursor, options),
  update: (id: string, data: TableUpdate<'templates'>) => updateRecord('templates', id, data),
  delete: (id: string) => deleteRecord('templates', id),
};

// Teams API
export const teamsApi = {
  create: (data: Omit<TableInsert<'teams'>, 'organization_id'>) => createRecord('teams', data),
  get: (id: string, options?: QueryOptions) => getRecord('teams', id, options),
  list: (options?: ListOptions) => listRecords('teams', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('teams', cursor, options),
  update: (id: string, data: TableUpdate<'teams'>) => updateRecord('teams', id, data),
  delete: (id: string) => deleteRecord('teams', id),
};

// Offers API
export const offersApi = {
  create: (data: Omit<TableInsert<'offers'>, 'organization_id'>) => createRecord('offers', data),
  get: (id: string, options?: QueryOptions) => getRecord('offers', id, options),
  list: (options?: ListOptions) => listRecords('offers', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('offers', cursor, options),
  update: (id: string, data: TableUpdate<'offers'>) => updateRecord('offers', id, data),
  delete: (id: string) => deleteRecord('offers', id),
};

// Reports API
export const reportsApi = {
  create: (data: Omit<TableInsert<'reports'>, 'organization_id'>) => createRecord('reports', data),
  get: (id: string, options?: QueryOptions) => getRecord('reports', id, options),
  list: (options?: ListOptions) => listRecords('reports', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('reports', cursor, options),
  update: (id: string, data: TableUpdate<'reports'>) => updateRecord('reports', id, data),
  delete: (id: string) => deleteRecord('reports', id),
};

// Documents API
export const documentsApi = {
  create: (data: Omit<TableInsert<'documents'>, 'organization_id'>) => createRecord('documents', data),
  get: (id: string, options?: QueryOptions) => getRecord('documents', id, options),
  list: (options?: ListOptions) => listRecords('documents', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('documents', cursor, options),
  update: (id: string, data: TableUpdate<'documents'>) => updateRecord('documents', id, data),
  delete: (id: string) => deleteRecord('documents', id),
};

// Placements API
export const placementsApi = {
  create: (data: Omit<TableInsert<'placements'>, 'organization_id'>) => createRecord('placements', data),
  get: (id: string, options?: QueryOptions) => getRecord('placements', id, options),
  list: (options?: ListOptions) => listRecords('placements', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('placements', cursor, options),
  update: (id: string, data: TableUpdate<'placements'>) => updateRecord('placements', id, data),
  delete: (id: string) => deleteRecord('placements', id),
};

// Organizations API
export const organizationsApi = {
  create: (data: Omit<TableInsert<'organizations'>, 'id'>) => createRecord('organizations', data as unknown as Omit<TableInsert<'organizations'>, 'organization_id'>),
  get: (id: string, options?: QueryOptions) => getRecord('organizations', id, options),
  list: (options?: ListOptions) => listRecords('organizations', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('organizations', cursor, options),
  update: (id: string, data: TableUpdate<'organizations'>) => updateRecord('organizations', id, data),
  delete: (id: string) => deleteRecord('organizations', id),
};

// TalentPools API
export const talentPoolsApi = {
  create: (data: Omit<TableInsert<'talent_pools'>, 'organization_id'>) => createRecord('talent_pools', data),
  get: (id: string, options?: QueryOptions) => getRecord('talent_pools', id, options),
  list: (options?: ListOptions) => listRecords('talent_pools', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('talent_pools', cursor, options),
  update: (id: string, data: TableUpdate<'talent_pools'>) => updateRecord('talent_pools', id, data),
  delete: (id: string) => deleteRecord('talent_pools', id),
};

// Tasks API
export const tasksApi = {
  create: (data: Omit<TableInsert<'tasks'>, 'organization_id'>) => createRecord('tasks', data),
  get: (id: string, options?: QueryOptions) => getRecord('tasks', id, options),
  list: (options?: ListOptions) => listRecords('tasks', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('tasks', cursor, options),
  update: (id: string, data: TableUpdate<'tasks'>) => updateRecord('tasks', id, data),
  delete: (id: string) => deleteRecord('tasks', id),
};

// Roles API
export const rolesApi = {
  create: (data: Omit<TableInsert<'roles'>, 'organization_id'>) => createRecord('roles', data),
  get: (id: string, options?: QueryOptions) => getRecord('roles', id, options),
  list: (options?: ListOptions) => listRecords('roles', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('roles', cursor, options),
  update: (id: string, data: TableUpdate<'roles'>) => updateRecord('roles', id, data),
  delete: (id: string) => deleteRecord('roles', id),
};

// Settings API
export const settingsApi = {
  create: (data: Omit<TableInsert<'settings'>, 'organization_id'>) => createRecord('settings', data),
  get: (id: string, options?: QueryOptions) => getRecord('settings', id, options),
  list: (options?: ListOptions) => listRecords('settings', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('settings', cursor, options),
  update: (id: string, data: TableUpdate<'settings'>) => updateRecord('settings', id, data),
  delete: (id: string) => deleteRecord('settings', id),
};

// Bench API
export const benchApi = {
  create: (data: Omit<TableInsert<'bench'>, 'organization_id'>) => createRecord('bench', data),
  get: (id: string, options?: QueryOptions) => getRecord('bench', id, options),
  list: (options?: ListOptions) => listRecords('bench', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('bench', cursor, options),
  update: (id: string, data: TableUpdate<'bench'>) => updateRecord('bench', id, data),
  delete: (id: string) => deleteRecord('bench', id),
};

// AppUsers API
export const appUsersApi = {
  create: (data: Omit<TableInsert<'app_users'>, 'id'>) => createRecord('app_users', data as unknown as Omit<TableInsert<'app_users'>, 'organization_id'>),
  get: (id: string, options?: QueryOptions) => getRecord('app_users', id, options),
  list: (options?: ListOptions) => listRecords('app_users', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('app_users', cursor, options),
  update: (id: string, data: TableUpdate<'app_users'>) => updateRecord('app_users', id, data),
  delete: (id: string) => deleteRecord('app_users', id),
};

// Candidates API
export const candidatesApi = {
  create: (data: Omit<TableInsert<'candidates'>, 'organization_id'>) => createRecord('candidates', data),
  get: (id: string, options?: QueryOptions) => getRecord('candidates', id, options),
  list: (options?: ListOptions) => listRecords('candidates', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('candidates', cursor, options),
  update: (id: string, data: TableUpdate<'candidates'>) => updateRecord('candidates', id, data),
  delete: (id: string) => deleteRecord('candidates', id),
};

// Companies API
export const companiesApi = {
  create: (data: Omit<TableInsert<'companies'>, 'organization_id'>) => createRecord('companies', data),
  get: (id: string, options?: QueryOptions) => getRecord('companies', id, options),
  list: (options?: ListOptions) => listRecords('companies', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('companies', cursor, options),
  update: (id: string, data: TableUpdate<'companies'>) => updateRecord('companies', id, data),
  delete: (id: string) => deleteRecord('companies', id),
};

// Unified API export
export const api = {
  organizations: organizationsApi,
  users: usersApi,
  workspaces: workspacesApi,
  workspaceMembers: workspaceMembersApi,
  candidates: candidatesApi,
  companies: companiesApi,
  clients: clientsApi,
  jobs: jobsApi,
  applications: applicationsApi,
  submissions: submissionsApi,
  interviews: interviewsApi,
  offers: offersApi,
  placements: placementsApi,
  bench: benchApi,
  contacts: contactsApi,
  notes: notesApi,
  tasks: tasksApi,
  activities: activitiesApi,
  documents: documentsApi,
  teams: teamsApi,
  roles: rolesApi,
  appUsers: appUsersApi,
  notifications: notificationsApi,
  reports: reportsApi,
  timesheets: timesheetsApi,
  invoices: invoicesApi,
  talentPools: talentPoolsApi,
  savedSearches: savedSearchesApi,
  messages: messagesApi,
  meetings: meetingsApi,
  tags: tagsApi,
  templates: templatesApi,
  workflows: workflowsApi,
  integrationConnections: integrationConnectionsApi,
  settings: settingsApi,
};

export type Api = typeof api;
