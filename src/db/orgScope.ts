/**
 * Organization Scoping Helper
 * 
 * Derives org-scoped tables from db_contract.json
 * Used to ensure deterministic organization filtering
 */

import dbContract from './contract/db_contract.json';

// Cache of tables that have organization_id column
const orgScopedTables: Set<string> = new Set();

// Initialize from contract
function initOrgScopedTables() {
  if (orgScopedTables.size > 0) return;
  
  for (const table of dbContract.tables) {
    const hasOrgId = table.columns.some(
      (col: { name: string }) => col.name === 'organization_id'
    );
    if (hasOrgId) {
      orgScopedTables.add(table.table);
    }
  }
}

/**
 * Check if a table has organization_id column per db_contract.json
 */
export function tableHasOrg(tableName: string): boolean {
  initOrgScopedTables();
  return orgScopedTables.has(tableName);
}

/**
 * Get list of all org-scoped tables
 */
export function getOrgScopedTables(): string[] {
  initOrgScopedTables();
  return Array.from(orgScopedTables);
}

/**
 * Get list of all tables from contract
 */
export function getAllTables(): string[] {
  return dbContract.tables.map((t: { table: string }) => t.table);
}

/**
 * Get table schema from contract
 */
export function getTableSchema(tableName: string) {
  const table = dbContract.tables.find((t: { table: string }) => t.table === tableName);
  return table || null;
}

/**
 * Apply organization scope to a Supabase query builder
 * Only applies filter if table has organization_id column
 */
export function applyOrgScope<T extends { eq: (column: string, value: string) => T }>(
  query: T,
  tableName: string,
  orgId: string
): T {
  if (tableHasOrg(tableName)) {
    return query.eq('organization_id', orgId);
  }
  return query;
}
