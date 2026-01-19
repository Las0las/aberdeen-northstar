'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isDevBypassEnabled, getDevSession } from '@/config/devAuth';
import { supabase } from '@/lib/supabase';
import { getOrgScopedTables, getAllTables, tableHasOrg } from '@/db/orgScope';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

interface ValidationResult {
  module: string;
  table: string;
  isOrgScoped: boolean;
  listStatus: 'pending' | 'pass' | 'fail' | 'write_blocked';
  listError?: string;
  listCount?: number;
  fetchStatus: 'pending' | 'pass' | 'fail' | 'skip';
  fetchError?: string;
}

const CORE_MODULES = [
  { module: 'Candidates', table: 'candidates' },
  { module: 'Jobs', table: 'jobs' },
  { module: 'Submissions', table: 'submissions' },
  { module: 'Interviews', table: 'interviews' },
  { module: 'Offers', table: 'offers' },
  { module: 'Placements', table: 'placements' },
  { module: 'Bench', table: 'bench_entries' },
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

export default function DevValidatePage() {
  const router = useRouter();
  const [isDevMode, setIsDevMode] = useState(false);
  const [devSession, setDevSession] = useState<ReturnType<typeof getDevSession>>(null);
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [running, setRunning] = useState(false);
  const [orgScopedCount, setOrgScopedCount] = useState(0);
  const [totalTables, setTotalTables] = useState(0);

  useEffect(() => {
    if (!isDevBypassEnabled()) {
      router.push('/dashboard');
      return;
    }
    setIsDevMode(true);
    setDevSession(getDevSession());
    setSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured');
    setOrgScopedCount(getOrgScopedTables().length);
    setTotalTables(getAllTables().length);

    // Initialize results
    setResults(
      CORE_MODULES.map((m) => ({
        module: m.module,
        table: m.table,
        isOrgScoped: tableHasOrg(m.table),
        listStatus: 'pending',
        fetchStatus: 'pending',
      }))
    );
  }, [router]);

  const runValidation = async () => {
    if (!devSession) return;
    setRunning(true);

    const newResults: ValidationResult[] = [];

    for (const mod of CORE_MODULES) {
      const result: ValidationResult = {
        module: mod.module,
        table: mod.table,
        isOrgScoped: tableHasOrg(mod.table),
        listStatus: 'pending',
        fetchStatus: 'pending',
      };

      // Test LIST operation
      try {
        let query = supabase.from(mod.table).select('*', { count: 'exact', head: false }).limit(5);
        
        // Apply org scope if table has organization_id
        if (result.isOrgScoped) {
          query = query.eq('organization_id', devSession.organizationId);
        }

        const { data, error, count } = await query;

        if (error) {
          if (error.code === '42501' || error.message.includes('permission') || error.message.includes('RLS')) {
            result.listStatus = 'write_blocked';
            result.listError = 'RLS blocked (expected)';
          } else {
            result.listStatus = 'fail';
            result.listError = error.message;
          }
        } else {
          result.listStatus = 'pass';
          result.listCount = count || data?.length || 0;

          // Test FETCH ONE if we have data
          if (data && data.length > 0 && 'id' in data[0]) {
            try {
              const { data: fetchData, error: fetchError } = await supabase
                .from(mod.table)
                .select('*')
                .eq('id', (data[0] as { id: string }).id)
                .single();

              if (fetchError) {
                result.fetchStatus = 'fail';
                result.fetchError = fetchError.message;
              } else {
                result.fetchStatus = 'pass';
              }
            } catch (e) {
              result.fetchStatus = 'fail';
              result.fetchError = String(e);
            }
          } else {
            result.fetchStatus = 'skip';
          }
        }
      } catch (e) {
        result.listStatus = 'fail';
        result.listError = String(e);
      }

      newResults.push(result);
      setResults([...newResults, ...CORE_MODULES.slice(newResults.length).map((m) => ({
        module: m.module,
        table: m.table,
        isOrgScoped: tableHasOrg(m.table),
        listStatus: 'pending' as const,
        fetchStatus: 'pending' as const,
      }))]);
    }

    setResults(newResults);
    setRunning(false);
  };

  if (!isDevMode) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-muted-foreground">Access denied - dev mode only</div>
      </div>
    );
  }

  const passCount = results.filter((r) => r.listStatus === 'pass').length;
  const failCount = results.filter((r) => r.listStatus === 'fail').length;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline flex items-center gap-1 mb-2">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Dev Validation Checklist</h1>
            <p className="text-muted-foreground">Verify core modules against Supabase database</p>
          </div>
          <Button onClick={runValidation} disabled={running}>
            <RefreshCw className={`mr-2 h-4 w-4 ${running ? 'animate-spin' : ''}`} />
            {running ? 'Running...' : 'Run Validation'}
          </Button>
        </div>

        {/* Environment Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Dev Bypass Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">User Email:</span>
                <span className="ml-2 font-mono">{devSession?.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground">User ID:</span>
                <span className="ml-2 font-mono text-xs">{devSession?.userId}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Organization ID:</span>
                <span className="ml-2 font-mono text-xs">{devSession?.organizationId}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Supabase URL:</span>
                <span className="ml-2 font-mono text-xs">
                  {supabaseUrl.replace(/https:\/\/([^.]+)\..*/, 'https://$1.***')}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t mt-4">
              <span className="text-muted-foreground">DB Contract:</span>
              <span className="ml-2">{totalTables} tables ({orgScopedCount} org-scoped)</span>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        {results.some((r) => r.listStatus !== 'pending') && (
          <div className="flex gap-4">
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 mr-1" /> {passCount} Passed
            </Badge>
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 mr-1" /> {failCount} Failed
            </Badge>
          </div>
        )}

        {/* Results */}
        <div className="grid gap-4">
          {results.map((result) => (
            <Card key={result.module} className={
              result.listStatus === 'fail' ? 'border-red-200' :
              result.listStatus === 'pass' ? 'border-green-200' : ''
            }>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.listStatus === 'pass' && <CheckCircle className="h-5 w-5 text-green-500" />}
                    {result.listStatus === 'fail' && <XCircle className="h-5 w-5 text-red-500" />}
                    {result.listStatus === 'write_blocked' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                    {result.listStatus === 'pending' && <div className="h-5 w-5 rounded-full border-2 border-muted" />}
                    <div>
                      <div className="font-medium">{result.module}</div>
                      <div className="text-xs text-muted-foreground font-mono">{result.table}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {result.isOrgScoped && (
                      <Badge variant="outline" className="text-xs">org-scoped</Badge>
                    )}
                    {result.listStatus === 'pass' && (
                      <span className="text-muted-foreground">{result.listCount} records</span>
                    )}
                    {result.listStatus === 'fail' && (
                      <span className="text-red-600 text-xs max-w-xs truncate">{result.listError}</span>
                    )}
                    {result.fetchStatus === 'pass' && (
                      <Badge className="bg-green-100 text-green-700 text-xs">fetch ✓</Badge>
                    )}
                    {result.fetchStatus === 'fail' && (
                      <Badge className="bg-red-100 text-red-700 text-xs">fetch ✗</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
