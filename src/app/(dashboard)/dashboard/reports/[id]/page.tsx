'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useReport, useDeleteReport } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Calendar, FileText, Clock } from 'lucide-react';
import { formatDate, formatDateTime, getStatusColor } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: report, isLoading, error } = useReport(id);
  const deleteReport = useDeleteReport();

  const handleDelete = async () => {
    if (confirm('Delete this report?')) {
      await deleteReport.mutateAsync(id);
      router.push('/dashboard/reports');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !report) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">Report not found</p></CardContent></Card></div>;

  const relatedEntities: { label: string; href: string }[] = [];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      <div><h1 className="text-3xl font-bold tracking-tight">{report.name}</h1><p className="text-muted-foreground">ID: {id.slice(0, 8)}...</p></div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteReport.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Report Info</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{report.name}</span></div>
        {report.status && <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><Badge className={getStatusColor(report.status)}>{report.status}</Badge></div>}
        {report.report_type && <div className="flex items-center justify-between"><span className="text-muted-foreground">Type</span><Badge variant="outline">{report.report_type}</Badge></div>}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Schedule</CardTitle></CardHeader><CardContent className="space-y-4">
        {report.schedule && <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span>{report.schedule}</span></div>}
        {report.last_run_at && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Last Run: {formatDateTime(report.last_run_at)}</span></div>}
      </CardContent></Card>
      {report.description && <Card className="md:col-span-2"><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap">{report.description}</p></CardContent></Card>}
      <Card className="md:col-span-2"><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4 md:grid-cols-3"><div><span className="text-sm text-muted-foreground">Created</span><p>{report.created_at ? formatDate(report.created_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{report.updated_at ? formatDate(report.updated_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Created By</span><p className="font-mono text-sm">{report.created_by ? report.created_by.slice(0, 8) + '...' : 'N/A'}</p></div></div></CardContent></Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="reports"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
