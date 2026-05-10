'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useSubmissions, useCreateSubmission } from '@/hooks';
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
  Textarea,
} from '@/components/ui';
import { Plus, Send } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Submission = Database['public']['Tables']['submissions']['Row'];

export default function SubmissionsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useSubmissions({
    page,
    pageSize,
    filters: statusFilter !== 'all' ? { status: statusFilter } : undefined,
  });

  const createMutation = useCreateSubmission();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        candidate_id: formData.get('candidate_id') as string || null,
        job_id: formData.get('job_id') as string || null,
        status: formData.get('status') as string || 'submitted',
        cover_letter: formData.get('cover_letter') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create submission:', err);
    }
  };

  const columns = [
    {
      key: 'candidate_id',
      header: 'Candidate',
      render: (sub: Submission) => (
        <div className="font-medium">{sub.candidate_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'job_id',
      header: 'Job',
      render: (sub: Submission) => (
        <div>{sub.job_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'ai_match_score',
      header: 'Match Score',
      render: (sub: Submission) => (
        sub.ai_match_score ? (
          <Badge
            variant={
              sub.ai_match_score >= 80
                ? 'success'
                : sub.ai_match_score >= 60
                ? 'warning'
                : 'destructive'
            }
            aria-label={`Match score ${sub.ai_match_score} percent`}
          >
            {sub.ai_match_score}%
          </Badge>
        ) : '-'
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (sub: Submission) => (
        <Badge className={getStatusColor(sub.status || 'pending')}>
          {sub.status || 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'submitted_at',
      header: 'Submitted',
      render: (sub: Submission) => formatDate(sub.submitted_at || sub.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Manage candidate submissions to jobs</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Submission
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Submission</DialogTitle>
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
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="submitted">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_letter">Cover Letter</Label>
                <Textarea id="cover_letter" name="cover_letter" rows={3} />
              </div>
              {createMutation.error && (
                <div className="text-sm text-destructive">
                  {createMutation.error.message}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={createMutation.isPending}>
                  Create
                </Button>
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
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
              icon={<Send className="h-12 w-12" />}
              title="Error loading submissions"
              description="Please try again later"
            />
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<Send className="h-12 w-12" />}
              title="No submissions found"
              description="Create a submission to get started"
              action={
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Submission
                </Button>
              }
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
