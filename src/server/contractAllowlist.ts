// Contract-Driven Allowlists and Validation (Server Only)
// Reads db_contract.json to enforce truthful behavior

import dbContract from '@/db/contract/db_contract.json';

// Types
interface ContractColumn {
  name: string;
  type: string;
  nullable: string;
  default: string | null;
}

interface ContractTable {
  table: string;
  schema: string;
  columns: ContractColumn[];
}

// Parse contract
const tables: ContractTable[] = (dbContract as { tables: ContractTable[] }).tables || [];

// Core Northstar entity tables permitted in 360 routes
const ALLOWED_ENTITY_TABLES = new Set([
  'candidates',
  'jobs',
  'submissions',
  'interviews',
  'offers',
  'placements',
  'bench',
  'companies',
  'clients',
  'contacts',
  'organizations',
  'users',
  'roles',
  'teams',
  'applications',
  'tasks',
  'reports',
]);

// UUID v4 regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Get table from contract
function getContractTable(tableName: string): ContractTable | undefined {
  return tables.find(t => t.table === tableName && t.schema === 'public');
}

// Check if table has column
function tableHasColumn(tableName: string, columnName: string): boolean {
  const table = getContractTable(tableName);
  if (!table) return false;
  return table.columns.some(c => c.name === columnName);
}

// Assertions
export function assertAllowedEntity(entityTable: string): void {
  if (!ALLOWED_ENTITY_TABLES.has(entityTable)) {
    throw new Error(`Entity table "${entityTable}" is not in allowlist`);
  }
}

export function assertUuid(id: string | null | undefined, fieldName: string = 'id'): void {
  if (!id || !UUID_REGEX.test(id)) {
    throw new Error(`Invalid UUID for ${fieldName}`);
  }
}

export function isValidUuid(id: string | null | undefined): boolean {
  return !!id && UUID_REGEX.test(id);
}

// Notes support detection from contract
export interface NotesSupport {
  supported: boolean;
  reason: string;
  fkColumn?: string;
  requiresCandidateId: boolean;
}

export function getNotesSupport(entityTable: string): NotesSupport {
  // Check if notes table exists in contract
  const notesTable = getContractTable('notes');
  if (!notesTable) {
    return { supported: false, reason: 'notes table not in contract', requiresCandidateId: false };
  }

  // Check for polymorphic pattern (entity_type + entity_id)
  const hasEntityType = notesTable.columns.some(c => c.name === 'entity_type');
  const hasEntityId = notesTable.columns.some(c => c.name === 'entity_id');
  
  if (hasEntityType && hasEntityId) {
    // Polymorphic - all entities supported
    return { supported: true, reason: 'polymorphic', fkColumn: 'entity_id', requiresCandidateId: false };
  }

  // Check for specific FK columns
  const candidateIdCol = notesTable.columns.find(c => c.name === 'candidate_id');
  const applicationIdCol = notesTable.columns.find(c => c.name === 'application_id');

  // candidate_id is NOT NULL in contract - always required
  const candidateIdRequired = candidateIdCol && candidateIdCol.nullable === 'NO';

  if (entityTable === 'candidates') {
    if (candidateIdCol) {
      return { 
        supported: true, 
        reason: 'candidate_id FK', 
        fkColumn: 'candidate_id',
        requiresCandidateId: !!candidateIdRequired
      };
    }
  }

  if (entityTable === 'applications') {
    if (applicationIdCol) {
      return { 
        supported: true, 
        reason: 'application_id FK', 
        fkColumn: 'application_id',
        requiresCandidateId: !!candidateIdRequired  // Still need candidate_id
      };
    }
  }

  return { 
    supported: false, 
    reason: `notes table has no FK for ${entityTable} (contract only supports candidate_id/application_id)`,
    requiresCandidateId: false
  };
}

// Activities support detection
export function getActivitiesSupport(): { hasOrgId: boolean; hasEntityType: boolean; hasEntityId: boolean } {
  const activitiesTable = getContractTable('activities');
  if (!activitiesTable) {
    return { hasOrgId: false, hasEntityType: false, hasEntityId: false };
  }
  return {
    hasOrgId: tableHasColumn('activities', 'organization_id'),
    hasEntityType: tableHasColumn('activities', 'entity_type'),
    hasEntityId: tableHasColumn('activities', 'entity_id'),
  };
}

// Audit support detection
export function getAuditSupport(): { tableName: string; hasOrgId: boolean; hasTableName: boolean; hasRecordId: boolean } {
  // Check for audit_log or audit_logs
  let auditTable = getContractTable('audit_log');
  let tableName = 'audit_log';
  
  if (!auditTable) {
    auditTable = getContractTable('audit_logs');
    tableName = 'audit_logs';
  }
  
  if (!auditTable) {
    return { tableName: '', hasOrgId: false, hasTableName: false, hasRecordId: false };
  }

  return {
    tableName,
    hasOrgId: tableHasColumn(tableName, 'organization_id'),
    hasTableName: tableHasColumn(tableName, 'table_name'),
    hasRecordId: tableHasColumn(tableName, 'record_id'),
  };
}

// Export constants
export { ALLOWED_ENTITY_TABLES };
