'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import { useJobs, useCreateJob } from '@/hooks';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
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
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Plus, Search, Briefcase } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Job = Database['public']['Tables']['jobs']['Row'];

export default function JobsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useJobs({ page, pageSize });
  const createMutation = useCreateJob();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        title: formData.get('title') as string,
        department: formData.get('department') as string || null,
        location: formData.get('location') as string || null,
        employment_type: formData.get('employment_type') as string || null,
        salary_min: formData.get('salary_min') ? Number(formData.get('salary_min')) : null,
        salary_max: formData.get('salary_max') ? Number(formData.get('salary_max')) : null,
        description: formData.get('description') as string || null,
        status: 'open',
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create job:', err);
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Job Title',
      render: (job: Job) => (
        <Link href={`/dashboard/jobs/${job.id}`} className="hover:underline">
          <div className="font-medium">{job.title}</div>
          <div className="text-sm text-muted-foreground">{job.department || 'No department'}</div>
        </Link>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (job: Job) => job.location || '-',
    },
    {
      key: 'type',
      header: 'Type',
      render: (job: Job) => job.employment_type || '-',
    },
    {
      key: 'salary',
      header: 'Salary Range',
      render: (job: Job) => {
        if (job.salary_min && job.salary_max) {
          return `${formatCurrency(job.salary_min)} - ${formatCurrency(job.salary_max)}`;
        }
        return '-';
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (job: Job) => (
        <Badge className={getStatusColor(job.status || 'open')}>
          {job.status || 'Open'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Posted',
      render: (job: Job) => formatDate(job.created_at),
    },
  ];

  const filteredData = search
    ? data?.data.filter((job) =>
        job.title?.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">Manage job openings and requisitions</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Job</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employment_type">Employment Type</Label>
                <Select name="employment_type">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_min">Min Salary</Label>
                  <Input id="salary_min" name="salary_min" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_max">Max Salary</Label>
                  <Input id="salary_max" name="salary_max" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={createMutation.isPending}>
                  Create Job
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8 text-destructive">
              Error loading jobs: {error.message}
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredData?.length === 0 ? (
            <EmptyState
              icon={<Briefcase className="h-12 w-12" />}
              title="No jobs found"
              description={search ? 'Try adjusting your search' : 'Create your first job posting'}
              action={
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Job
                </Button>
              }
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
