#!/usr/bin/env npx ts-node
/**
 * Development Validation Script
 * 
 * Run with: npx ts-node scripts/dev-validate.ts
 * 
 * Validates core modules against the real Supabase database.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const devOrgId = process.env.NEXT_PUBLIC_DEV_ORGANIZATION_ID || '00000000-0000-0000-0000-000000000001';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Load DB contract to determine org-scoped tables
const contractPath = path.join(__dirname, '../src/db/contract/db_contract.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf-8'));

const orgScopedTables = new Set<string>();
for (const table of contract.tables) {
  if (table.columns.some((col: { name: string }) => col.name === 'organization_id')) {
    orgScopedTables.add(table.table);
  }
}

const CORE_MODULES = [
  { module: 'Candidates', table: 'candidates' },
  { module: 'Jobs', table: 'jobs' },
  { module: 'Submissions', table: 'submissions' },
  { module: 'Interviews', table: 'interviews' },
  { module: 'Offers', table: 'offers' },
  { module: 'Placements', table: 'placements' },
  { module: 'Bench', table: 'bench' },
  { module: 'Companies', table: 'companies' },
  { module: 'Clients', table: 'clients' },
  { module: 'Contacts', table: 'contacts' },
  { module: 'Organizations', table: 'organizations' },
  { module: 'Users', table: 'users' },
  { module: 'Roles', table: 'roles' },
  { module: 'Teams', table: 'teams' },
  { module: 'Applications', table: 'applications' },
  { module: 'Tasks', table: 'tasks' },
  { module: 'Reports', table: 'reports' },
];

interface ValidationResult {
  module: string;
  table: string;
  isOrgScoped: boolean;
  listStatus: 'pass' | 'fail' | 'rls_blocked';
  listError?: string;
  listCount?: number;
  fetchStatus: 'pass' | 'fail' | 'skip';
  fetchError?: string;
  firstId?: string;
}

async function validateModule(mod: { module: string; table: string }): Promise<ValidationResult> {
  const isOrgScoped = orgScopedTables.has(mod.table);
  const result: ValidationResult = {
    module: mod.module,
    table: mod.table,
    isOrgScoped,
    listStatus: 'pass',
    fetchStatus: 'skip',
  };

  try {
    let query = supabase.from(mod.table).select('*', { count: 'exact', head: false }).limit(5);
    
    if (isOrgScoped) {
      query = query.eq('organization_id', devOrgId);
    }

    const { data, error, count } = await query;

    if (error) {
      if (error.code === '42501' || error.message.includes('permission') || error.message.includes('RLS')) {
        result.listStatus = 'rls_blocked';
        result.listError = 'RLS blocked';
      } else {
        result.listStatus = 'fail';
        result.listError = error.message;
      }
      return result;
    }

    result.listCount = count || data?.length || 0;

    // Test fetch if we have data
    if (data && data.length > 0 && 'id' in data[0]) {
      result.firstId = (data[0] as { id: string }).id;
      const { error: fetchError } = await supabase
        .from(mod.table)
        .select('*')
        .eq('id', result.firstId)
        .single();

      if (fetchError) {
        result.fetchStatus = 'fail';
        result.fetchError = fetchError.message;
      } else {
        result.fetchStatus = 'pass';
      }
    }
  } catch (e) {
    result.listStatus = 'fail';
    result.listError = String(e);
  }

  return result;
}

async function main() {
  console.log('\n🔍 Aberdeen Northstar - Local Validation Proof\n');
  console.log(`📍 Supabase: ${supabaseUrl?.replace(/https:\/\/([^.]+)\..*/, 'https://$1.***')}`);
  console.log(`🏢 Organization: ${devOrgId}`);
  console.log(`📊 DB Contract: ${contract.tables.length} tables (${orgScopedTables.size} org-scoped)\n`);
  console.log('─'.repeat(70));

  let passed = 0;
  let failed = 0;
  let blocked = 0;
  const results: ValidationResult[] = [];

  for (const mod of CORE_MODULES) {
    const result = await validateModule(mod);
    results.push(result);
    
    const status = result.listStatus === 'pass' 
      ? '✅' 
      : result.listStatus === 'rls_blocked' 
        ? '⚠️' 
        : '❌';
    
    const orgBadge = result.isOrgScoped ? '[org]' : '     ';
    const countStr = result.listCount !== undefined ? `(${result.listCount} records)` : '';
    const fetchStr = result.fetchStatus === 'pass' ? ' fetch✓' : result.fetchStatus === 'fail' ? ' fetch✗' : '';
    const errorStr = result.listError ? ` - ${result.listError}` : '';

    console.log(`${status} ${mod.module.padEnd(15)} ${orgBadge} ${mod.table.padEnd(20)} ${countStr}${fetchStr}${errorStr}`);

    if (result.listStatus === 'pass') passed++;
    else if (result.listStatus === 'rls_blocked') blocked++;
    else failed++;
  }

  console.log('─'.repeat(70));
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed, ${blocked} RLS blocked\n`);

  // Output detail page test IDs
  console.log('📝 Sample IDs for detail page testing:');
  for (const r of results) {
    if (r.firstId) {
      console.log(`   ${r.module}: ${r.firstId}`);
    }
  }

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
