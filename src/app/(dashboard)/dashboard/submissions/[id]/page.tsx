'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useSubmission, useDeleteSubmission } from '@/hooks';
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
import { ArrowLeft, Edit, Trash2, Calendar, Star } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function SubmissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: submission, isLoading, error } = useSubmission(id);
  const deleteSubmission = useDeleteSubmission();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this submission?')) {
      await deleteSubmission.mutateAsync(id);
      router.push('/dashboard/submissions');
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

  if (error || !submission) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Submission not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    ...(submission.candidate_id ? [{ label: 'Candidate', href: `/dashboard/candidates/${submission.candidate_id}` }] : []),
    ...(submission.job_id ? [{ label: 'Job', href: `/dashboard/jobs/${submission.job_id}` }] : []),
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Submission Details</h1>
        <p className="text-muted-foreground">ID: {submission.id.slice(0, 8)}...</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteSubmission.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Submission Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(submission.status || 'pending')}>
              {submission.status || 'Pending'}
            </Badge>
          </div>
          {submission.submitted_at && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Submitted: {formatDate(submission.submitted_at)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {submission.ai_match_score !== null && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Match Score</span>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{submission.ai_match_score}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {submission.candidate_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Candidate</span>
              <span className="font-mono text-sm">{submission.candidate_id.slice(0, 8)}...</span>
            </div>
          )}
          {submission.job_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job</span>
              <span className="font-mono text-sm">{submission.job_id.slice(0, 8)}...</span>
            </div>
          )}
          {submission.submitted_by && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Submitted By</span>
              <span className="font-mono text-sm">{submission.submitted_by.slice(0, 8)}...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {submission.cover_letter && (
        <Card>
          <CardHeader>
            <CardTitle>Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{submission.cover_letter}</p>
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
              <p>{submission.created_at ? formatDate(submission.created_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{submission.updated_at ? formatDate(submission.updated_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{submission.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="submissions"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
