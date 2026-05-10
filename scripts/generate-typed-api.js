#!/usr/bin/env node
// Typed API Generator - Generates Supabase-aware API from db_contract.json
const fs = require('fs');
const path = require('path');

const CONTRACT_PATH = path.join(__dirname, '../src/db/contract/db_contract.json');
const OUTPUT_PATH = path.join(__dirname, '../src/api/typed/index.ts');

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function toPascalCase(str) {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function generateTypedAPI(contract) {
  const tables = contract.tables;
  const orgTables = tables.filter(t => t.columns.some(c => c.name === 'organization_id')).map(t => t.table);

  let output = `// AUTO-GENERATED - Typed Supabase API Layer
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

`;

  // Generate entity-specific APIs for core tables
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

  for (const table of tables) {
    if (!coreEntities.includes(table.table)) continue;
    
    const name = table.table;
    const apiName = toCamelCase(name) + 'Api';
    const hasOrgId = orgTables.includes(name);
    
    // For tables without organization_id, callers don't supply that field but
    // createRecord's signature still expects an Omit on 'organization_id'.
    // Bridge with a cast so the public API stays clean for the consumer.
    const createParam = hasOrgId
      ? `Omit<TableInsert<'${name}'>, 'organization_id'>`
      : `Omit<TableInsert<'${name}'>, 'id'>`;
    const createBody = hasOrgId
      ? `createRecord('${name}', data)`
      : `createRecord('${name}', data as unknown as Omit<TableInsert<'${name}'>, 'organization_id'>)`;

    output += `
// ${toPascalCase(name)} API
export const ${apiName} = {
  create: (data: ${createParam}) => ${createBody},
  get: (id: string, options?: QueryOptions) => getRecord('${name}', id, options),
  list: (options?: ListOptions) => listRecords('${name}', options),
  listInfinite: (cursor: string | null, options?: Omit<ListOptions, 'page'>) => listRecordsInfinite('${name}', cursor, options),
  update: (id: string, data: TableUpdate<'${name}'>) => updateRecord('${name}', id, data),
  delete: (id: string) => deleteRecord('${name}', id),
};
`;
  }

  // Export unified api object
  output += `
// Unified API export
export const api = {
${coreEntities.filter(t => tables.some(x => x.table === t)).map(t => `  ${toCamelCase(t)}: ${toCamelCase(t)}Api,`).join('\n')}
};

export type Api = typeof api;
`;

  return output;
}

// Main
const contract = JSON.parse(fs.readFileSync(CONTRACT_PATH, 'utf8'));
const output = generateTypedAPI(contract);

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, output);
console.log(`Generated: ${OUTPUT_PATH}`);
