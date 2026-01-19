'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRoles, useCreateRole } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  Badge,
  DataTable,
  Pagination,
  Skeleton,
  EmptyState,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Plus, Shield } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Role = Database['public']['Tables']['roles']['Row'];

export default function RolesPage() {
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useRoles({ page, pageSize });
  const createMutation = useCreateRole();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        name: formData.get('name') as string,
        description: formData.get('description') as string || null,
        status: formData.get('status') as string || 'draft',
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create role:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Role Name',
      render: (role: Role) => (
        <div>
          <div className="font-medium">{role.name}</div>
          {role.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">{role.description}</div>
          )}
        </div>
      ),
    },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (role: Role) => {
        const perms = role.permissions as string[] | null;
        return perms?.length ? `${perms.length} permissions` : '-';
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (role: Role) => (
        <Badge className={getStatusColor(role.status || 'active')}>
          {role.status || 'Active'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (role: Role) => formatDate(role.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Role</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {createMutation.error && (
                <div className="text-sm text-destructive">{createMutation.error.message}</div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={createMutation.isPending}>Create</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : error ? (
            <EmptyState
              icon={<Shield className="h-12 w-12" />}
              title="Error loading roles"
              description="Please try again later"
            />
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<Shield className="h-12 w-12" />}
              title="No roles found"
              description="Create a role to get started"
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Create Role</Button>}
            />
          ) : (
            <>
              <DataTable columns={columns} data={data?.data || []} />
              {data && data.totalPages > 1 && (
                <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
