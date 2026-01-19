'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useApplications, useCreateApplication } from '@/hooks';
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
import { Plus, FileText } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Application = Database['public']['Tables']['applications']['Row'];

export default function ApplicationsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useApplications({
    page,
    pageSize,
    filters: statusFilter !== 'all' ? { status: statusFilter } : undefined,
  });
  const createMutation = useCreateApplication();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        candidate_id: formData.get('candidate_id') as string || null,
        job_id: formData.get('job_id') as string || null,
        stage: formData.get('stage') as string || null,
        status: formData.get('status') as string || null,
        date_applied: formData.get('date_applied') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create application:', err);
    }
  };

  const columns = [
    {
      key: 'candidate_id',
      header: 'Candidate',
      render: (app: Application) => (
        <div className="font-medium">{app.candidate_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'job_id',
      header: 'Job',
      render: (app: Application) => (
        <div className="font-medium">{app.job_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'stage',
      header: 'Stage',
      render: (app: Application) => String(app.stage || app.current_stage || '-'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (app: Application) => (
        <Badge className={getStatusColor(app.status || 'new')}>
          {app.status || 'New'}
        </Badge>
      ),
    },
    {
      key: 'date_applied',
      header: 'Applied',
      render: (app: Application) => formatDate(app.date_applied || app.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">Track and manage candidate applications</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Application
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Application</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="candidate_id">Candidate ID</Label>
                <Input id="candidate_id" name="candidate_id" placeholder="UUID of candidate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job_id">Job ID</Label>
                <Input id="job_id" name="job_id" placeholder="UUID of job" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select name="stage" defaultValue="new">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date_applied">Applied Date</Label>
                  <Input id="date_applied" name="date_applied" type="date" />
                </div>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
              icon={<FileText className="h-12 w-12" />}
              title="Error loading applications"
              description="Please try again later"
            />
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-12 w-12" />}
              title="No applications found"
              description="Applications will appear here when candidates apply"
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />New Application</Button>}
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
