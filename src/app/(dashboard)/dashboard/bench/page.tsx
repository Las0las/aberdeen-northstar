'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useBench, useCreateBenchEntry } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Badge,
  DataTable,
  Pagination,
  Skeleton,
  EmptyState,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Input,
} from '@/components/ui';
import { Plus, Users2 } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Bench = Database['public']['Tables']['bench']['Row'];

export default function BenchPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useBench({
    page,
    pageSize,
    filters: statusFilter !== 'all' ? { status: statusFilter } : undefined,
  });

  const createMutation = useCreateBenchEntry();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        consultant_id: formData.get('consultant_id') as string || null,
        availability_date: formData.get('availability_date') as string || null,
        status: formData.get('status') as string || 'available',
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to add to bench:', err);
    }
  };

  const columns = [
    {
      key: 'consultant_id',
      header: 'Consultant',
      render: (bench: Bench) => (
        <div className="font-medium">{bench.consultant_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'availability_date',
      header: 'Available From',
      render: (bench: Bench) => bench.availability_date ? formatDate(bench.availability_date) : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (bench: Bench) => (
        <Badge className={getStatusColor(bench.status || 'available')}>
          {bench.status || 'Available'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Added',
      render: (bench: Bench) => formatDate(bench.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bench</h1>
          <p className="text-muted-foreground">Manage consultant availability</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add to Bench
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add to Bench</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consultant_id">Consultant ID</Label>
                <Input id="consultant_id" name="consultant_id" placeholder="UUID of consultant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability_date">Available From</Label>
                <Input id="availability_date" name="availability_date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="available">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {createMutation.error && (
                <div className="text-sm text-destructive">{createMutation.error.message}</div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={createMutation.isPending}>Add</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
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
              icon={<Users2 className="h-12 w-12" />}
              title="Error loading bench"
              description="Please try again later"
            />
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<Users2 className="h-12 w-12" />}
              title="No bench entries"
              description="Add consultants to the bench"
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Add to Bench</Button>}
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
