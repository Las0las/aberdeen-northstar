'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useTeam, useDeleteTeam } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Users } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: team, isLoading, error } = useTeam(id);
  const deleteTeam = useDeleteTeam();

  const handleDelete = async () => {
    if (confirm('Delete this team?')) {
      await deleteTeam.mutateAsync(id);
      router.push('/dashboard/teams');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !team) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">Team not found</p></CardContent></Card></div>;

  const relatedEntities = [
    { label: 'Members', href: `/dashboard/users?team_id=${id}` },
    { label: 'Jobs', href: `/dashboard/jobs?team_id=${id}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          <div><h1 className="text-3xl font-bold tracking-tight">{team.name}</h1><p className="text-muted-foreground">ID: {id.slice(0, 8)}...</p></div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteTeam.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </div>
      <Entity360Tabs entityType="teams" entityId={id} relatedEntities={relatedEntities}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card><CardHeader><CardTitle>Team Info</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{team.name}</span></div>
            {team.status && <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><Badge className={getStatusColor(team.status)}>{team.status}</Badge></div>}
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Organization</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>Org: {team.organization_id.slice(0, 8)}...</span></div>
          </CardContent></Card>
          {team.description && <Card className="md:col-span-2"><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap">{team.description}</p></CardContent></Card>}
          <Card className="md:col-span-2"><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4 md:grid-cols-3"><div><span className="text-sm text-muted-foreground">Created</span><p>{team.created_at ? formatDate(team.created_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{team.updated_at ? formatDate(team.updated_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">ID</span><p className="font-mono text-sm">{team.id}</p></div></div></CardContent></Card>
        </div>
      </Entity360Tabs>
    </div>
  );
}
