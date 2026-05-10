'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useInterview, useDeleteInterview } from '@/hooks';
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
import { ArrowLeft, Edit, Trash2, Calendar, Clock, Video, MapPin, Star } from 'lucide-react';
import { formatDate, formatDateTime, getStatusColor } from '@/utils/helpers';

export default function InterviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: interview, isLoading, error } = useInterview(id);
  const deleteInterview = useDeleteInterview();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this interview?')) {
      await deleteInterview.mutateAsync(id);
      router.push('/dashboard/interviews');
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

  if (error || !interview) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Interview not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    ...(interview.candidate_id ? [{ label: 'Candidate', href: `/dashboard/candidates/${interview.candidate_id}` }] : []),
    ...(interview.job_id ? [{ label: 'Job', href: `/dashboard/jobs/${interview.job_id}` }] : []),
    ...(interview.submission_id ? [{ label: 'Submission', href: `/dashboard/submissions/${interview.submission_id}` }] : []),
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Details</h1>
        <p className="text-muted-foreground">
          {interview.interview_type || 'Interview'} - {interview.interview_stage || 'Stage'}
        </p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteInterview.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Interview Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(interview.status || 'scheduled')}>
              {interview.status || 'Scheduled'}
            </Badge>
          </div>
          {interview.interview_type && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Type</span>
              <Badge variant="outline">{interview.interview_type}</Badge>
            </div>
          )}
          {interview.interview_round && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Round</span>
              <span>{interview.interview_round}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interview.scheduled_start_at && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDateTime(interview.scheduled_start_at)}</span>
            </div>
          )}
          {interview.duration_minutes && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{interview.duration_minutes} minutes</span>
            </div>
          )}
          {interview.meeting_link && (
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <a href={interview.meeting_link} className="text-primary hover:underline text-sm">
                Join Meeting
              </a>
            </div>
          )}
          {interview.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{interview.location}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ratings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interview.overall_rating && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Overall</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning-foreground text-warning-foreground" aria-hidden="true" />
                <span>{interview.overall_rating}/5</span>
              </div>
            </div>
          )}
          {interview.technical_score && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Technical</span>
              <span>{interview.technical_score}/5</span>
            </div>
          )}
          {interview.cultural_fit_score && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cultural Fit</span>
              <span>{interview.cultural_fit_score}/5</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interview.candidate_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Candidate</span>
              <span className="font-mono text-sm">{interview.candidate_id.slice(0, 8)}...</span>
            </div>
          )}
          {interview.job_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job</span>
              <span className="font-mono text-sm">{interview.job_id.slice(0, 8)}...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {interview.feedback_notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{interview.feedback_notes}</p>
          </CardContent>
        </Card>
      )}

      {interview.interviewer_notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Interviewer Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{interview.interviewer_notes}</p>
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
              <p>{interview.created_at ? formatDate(interview.created_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{interview.updated_at ? formatDate(interview.updated_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{interview.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="interview"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
