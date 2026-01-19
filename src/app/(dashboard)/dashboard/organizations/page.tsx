'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useOrganizations, useCreateOrganization } from '@/hooks';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
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
} from '@/components/ui';
import { Plus, Search, Building } from 'lucide-react';
import { formatDate } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Organization = Database['public']['Tables']['organizations']['Row'];

export default function OrganizationsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useOrganizations({ page, pageSize });
  const createMutation = useCreateOrganization();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        name: formData.get('name') as string,
        slug: formData.get('slug') as string,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create organization:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (org: Organization) => (
        <div>
          <div className="font-medium">{org.name}</div>
          <div className="text-sm text-muted-foreground">{org.slug}</div>
        </div>
      ),
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (org: Organization) => formatDate(org.created_at),
    },
  ];

  const filteredData = search
    ? data?.data.filter((org) =>
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.slug.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground">Manage organizations</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input id="slug" name="slug" required placeholder="unique-identifier" />
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
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search organizations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : error ? (
            <EmptyState
              icon={<Building className="h-12 w-12" />}
              title="Error loading organizations"
              description="Please try again later"
            />
          ) : filteredData?.length === 0 ? (
            <EmptyState
              icon={<Building className="h-12 w-12" />}
              title="No organizations found"
              description={search ? 'Try adjusting your search' : 'Create your first organization'}
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Create Organization</Button>}
            />
          ) : (
            <>
              <DataTable columns={columns} data={filteredData || []} />
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
