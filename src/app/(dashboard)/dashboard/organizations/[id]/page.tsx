'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useOrganization, useDeleteOrganization } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Building, Link as LinkIcon } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function OrganizationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: org, isLoading, error } = useOrganization(id);
  const deleteOrg = useDeleteOrganization();

  const handleDelete = async () => {
    if (confirm('Delete this organization?')) {
      await deleteOrg.mutateAsync(id);
      router.push('/dashboard/organizations');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !org) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">Organization not found</p></CardContent></Card></div>;

  const relatedEntities = [
    { label: 'Users', href: `/dashboard/users?organization_id=${id}` },
    { label: 'Teams', href: `/dashboard/teams?organization_id=${id}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      <div><h1 className="text-3xl font-bold tracking-tight">{org.name}</h1><p className="text-muted-foreground">/{org.slug}</p></div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteOrg.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Organization Info</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{org.name}</span></div>
        <div className="flex items-center gap-2"><LinkIcon className="h-4 w-4 text-muted-foreground" /><span>Slug: {org.slug}</span></div>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">Custom settings configured</span></div>
      </CardContent></Card>
      <Card className="md:col-span-2"><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4 md:grid-cols-3"><div><span className="text-sm text-muted-foreground">Created</span><p>{org.created_at ? formatDate(org.created_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{org.updated_at ? formatDate(org.updated_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">ID</span><p className="font-mono text-sm">{org.id}</p></div></div></CardContent></Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="organizations"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
