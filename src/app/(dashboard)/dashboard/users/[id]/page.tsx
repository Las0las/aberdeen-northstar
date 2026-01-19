'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useUser, useDeleteUser } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Building, Shield } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: user, isLoading, error } = useUser(id);
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    if (confirm('Delete this user?')) {
      await deleteUser.mutateAsync(id);
      router.push('/dashboard/users');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !user) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">User not found</p></CardContent></Card></div>;

  const relatedEntities = [
    { label: 'Tasks', href: `/dashboard/tasks?assigned_to_user_id=${id}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          <div><h1 className="text-3xl font-bold tracking-tight">{user.full_name || user.name || user.email}</h1><p className="text-muted-foreground">{user.email}</p></div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteUser.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </div>
      <Entity360Tabs entityType="users" entityId={id} relatedEntities={relatedEntities}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card><CardHeader><CardTitle>Contact Info</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span>{user.email}</span></div>
            {user.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span>{user.phone}</span></div>}
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Account</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><Badge className={getStatusColor(user.status || (user.is_active ? 'active' : 'inactive'))}>{user.status || (user.is_active ? 'Active' : 'Inactive')}</Badge></div>
            {user.role && <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-muted-foreground" /><span>Role: {user.role}</span></div>}
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Organization</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><span>Org: {user.organization_id.slice(0, 8)}...</span></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4"><div><span className="text-sm text-muted-foreground">Created</span><p>{user.created_at ? formatDate(user.created_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{user.updated_at ? formatDate(user.updated_at) : 'N/A'}</p></div><div><span className="text-sm text-muted-foreground">Last Login</span><p>{user.last_login_at ? formatDate(user.last_login_at) : 'Never'}</p></div></div></CardContent></Card>
        </div>
      </Entity360Tabs>
    </div>
  );
}
