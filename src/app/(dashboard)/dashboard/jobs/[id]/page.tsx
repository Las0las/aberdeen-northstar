'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useJob, useDeleteJob } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Skeleton,
} from '@/components/ui';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';
import { ArrowLeft, Edit, Trash2, MapPin, DollarSign, Clock } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: job, isLoading, error } = useJob(id);
  const deleteJob = useDeleteJob();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
      await deleteJob.mutateAsync(id);
      router.push('/dashboard/jobs');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Job not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    { label: 'Applications', href: `/dashboard/applications?job_id=${id}` },
    { label: 'Submissions', href: `/dashboard/submissions?job_id=${id}` },
    { label: 'Interviews', href: `/dashboard/interviews?job_id=${id}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
        <p className="text-muted-foreground">{job.department || 'No department'}</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteJob.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(job.status || 'open')}>
              {job.status || 'Open'}
            </Badge>
          </div>
          {job.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
          )}
          {job.employment_type && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{job.employment_type}</span>
            </div>
          )}
          {job.experience_level && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Experience Level</span>
              <span>{job.experience_level}</span>
            </div>
          )}
          {job.openings && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Openings</span>
              <span>{job.openings}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(job.salary_min || job.salary_max) && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>
                {job.salary_min && job.salary_max
                  ? `${formatCurrency(job.salary_min, job.salary_currency || undefined)} - ${formatCurrency(job.salary_max, job.salary_currency || undefined)}`
                  : job.salary_min
                  ? `From ${formatCurrency(job.salary_min, job.salary_currency || undefined)}`
                  : `Up to ${formatCurrency(job.salary_max, job.salary_currency || undefined)}`}
              </span>
            </div>
          )}
          {job.priority && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Priority</span>
              <Badge variant="outline">{job.priority}</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {job.description && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </CardContent>
        </Card>
      )}

      {job.requirements && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{job.requirements}</p>
          </CardContent>
        </Card>
      )}

      {job.benefits && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{job.benefits}</p>
          </CardContent>
        </Card>
      )}

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <span className="text-sm text-muted-foreground">Created</span>
              <p>{formatDate(job.created_at)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{formatDate(job.updated_at)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{job.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="job"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
