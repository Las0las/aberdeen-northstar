'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useBenchEntry, useDeleteBenchEntry } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Calendar, User } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function BenchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: entry, isLoading, error } = useBenchEntry(id);
  const deleteEntry = useDeleteBenchEntry();

  const handleDelete = async () => {
    if (confirm('Delete this bench entry?')) {
      await deleteEntry.mutateAsync(id);
      router.push('/dashboard/bench');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !entry) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">Entry not found</p></CardContent></Card></div>;

  const relatedEntities = [
    ...(entry.consultant_id ? [{ label: 'Consultant', href: `/dashboard/candidates/${entry.consultant_id}` }] : []),
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      <div><h1 className="text-3xl font-bold tracking-tight">Bench Entry</h1><p className="text-muted-foreground">ID: {id.slice(0, 8)}...</p></div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteEntry.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Details</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><Badge className={getStatusColor(entry.status || 'available')}>{entry.status || 'Available'}</Badge></div>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Availability</CardTitle></CardHeader><CardContent className="space-y-4">
        {entry.availability_date && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Available: {formatDate(entry.availability_date)}</span></div>}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>References</CardTitle></CardHeader><CardContent className="space-y-4">
        {entry.consultant_id && <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span>Consultant: {entry.consultant_id.slice(0, 8)}...</span></div>}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4"><div><span className="text-sm text-muted-foreground">Created</span><p>{entry.created_at ? formatDate(entry.created_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{entry.updated_at ? formatDate(entry.updated_at) : 'N/A'}</p></div></div></CardContent></Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="bench_entries"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
