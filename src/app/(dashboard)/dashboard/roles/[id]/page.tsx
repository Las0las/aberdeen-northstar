'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useRole, useDeleteRole } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Shield } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function RoleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: role, isLoading, error } = useRole(id);
  const deleteRole = useDeleteRole();

  const handleDelete = async () => {
    if (confirm('Delete this role?')) {
      await deleteRole.mutateAsync(id);
      router.push('/dashboard/roles');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !role) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">Role not found</p></CardContent></Card></div>;

  const relatedEntities = [
    { label: 'Users', href: `/dashboard/users?role=${role.name}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
      <div><h1 className="text-3xl font-bold tracking-tight">{role.name}</h1><p className="text-muted-foreground">ID: {id.slice(0, 8)}...</p></div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteRole.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Role Info</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{role.name}</span></div>
        {role.status && <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><Badge className={getStatusColor(role.status)}>{role.status}</Badge></div>}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Permissions</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">Configured permissions</span></div>
      </CardContent></Card>
      {role.description && <Card className="md:col-span-2"><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap">{role.description}</p></CardContent></Card>}
      <Card className="md:col-span-2"><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4 md:grid-cols-3"><div><span className="text-sm text-muted-foreground">Created</span><p>{role.created_at ? formatDate(role.created_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{role.updated_at ? formatDate(role.updated_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">ID</span><p className="font-mono text-sm">{role.id}</p></div></div></CardContent></Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="roles"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
