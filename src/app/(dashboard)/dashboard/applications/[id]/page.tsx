'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApplication, useDeleteApplication, useUpdateApplication } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Skeleton,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';
import { ArrowLeft, Edit, Trash2, Star, Archive } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: application, isLoading, error } = useApplication(id);
  const deleteApplication = useDeleteApplication();
  const updateApplication = useUpdateApplication();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this application?')) {
      await deleteApplication.mutateAsync(id);
      router.push('/dashboard/applications');
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await updateApplication.mutateAsync({
        id,
        data: {
          candidate_id: formData.get('candidate_id') as string || null,
          job_id: formData.get('job_id') as string || null,
          stage: formData.get('stage') as string || null,
          status: formData.get('status') as string || null,
          date_applied: formData.get('date_applied') as string || null,
          is_favorite: formData.get('is_favorite') === 'true',
          is_archived: formData.get('is_archived') === 'true',
        },
      });
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to update application:', err);
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

  if (error || !application) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Application not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    { label: 'Candidate', href: `/dashboard/candidates/${application.candidate_id}` },
    { label: 'Job', href: `/dashboard/jobs/${application.job_id}` },
    { label: 'Interviews', href: `/dashboard/interviews?application_id=${id}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Application Details</h1>
        <p className="text-muted-foreground">ID: {application.id.slice(0, 8)}...</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setIsEditOpen(true)}>
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteApplication.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <>
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="candidate_id">Candidate ID</Label>
              <Input
                id="candidate_id"
                name="candidate_id"
                placeholder="UUID of candidate"
                defaultValue={application.candidate_id || ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job_id">Job ID</Label>
              <Input
                id="job_id"
                name="job_id"
                placeholder="UUID of job"
                defaultValue={application.job_id || ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stage">Stage</Label>
                <Select name="stage" defaultValue={String(application.stage || application.current_stage || 'new')}>
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
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={application.status || 'new'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_applied">Applied Date</Label>
              <Input
                id="date_applied"
                name="date_applied"
                type="date"
                defaultValue={application.date_applied?.split('T')[0] || ''}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="is_favorite">Favorite</Label>
                <Select name="is_favorite" defaultValue={application.is_favorite ? 'true' : 'false'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="is_archived">Archived</Label>
                <Select name="is_archived" defaultValue={application.is_archived ? 'true' : 'false'}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {updateApplication.error && (
              <div className="text-sm text-destructive">{updateApplication.error.message}</div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateApplication.isPending}>
                {updateApplication.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className={getStatusColor(application.status || 'pending')}>
                {application.status || 'Pending'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Stage</span>
              <Badge variant="outline">{String(application.stage || application.current_stage || 'New')}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Candidate ID</span>
              <span className="font-mono text-sm">{application.candidate_id?.slice(0, 8)}...</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job ID</span>
              <span className="font-mono text-sm">{application.job_id?.slice(0, 8)}...</span>
            </div>
            {application.candidate_email && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Candidate Email</span>
                <span>{application.candidate_email}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Favorite</span>
              <div className="flex items-center gap-2">
                <Star className={`h-4 w-4 ${application.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                <span>{application.is_favorite ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Archived</span>
              <div className="flex items-center gap-2">
                <Archive className={`h-4 w-4 ${application.is_archived ? 'text-orange-500' : 'text-muted-foreground'}`} />
                <span>{application.is_archived ? 'Yes' : 'No'}</span>
              </div>
            </div>
            {application.assigned_to && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Assigned To</span>
                <span className="font-mono text-sm">{application.assigned_to.slice(0, 8)}...</span>
              </div>
            )}
            {application.date_applied && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date Applied</span>
                <span>{formatDate(application.date_applied)}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {application.screening_questions && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Screening Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                {JSON.stringify(application.screening_questions, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}

        {application.stage_history && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Stage History</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-4 rounded overflow-auto">
                {JSON.stringify(application.stage_history, null, 2)}
              </pre>
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
                <p>{formatDate(application.created_at)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Updated</span>
                <p>{formatDate(application.updated_at)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">ID</span>
                <p className="font-mono text-sm">{application.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <Entity360Tabs
      entityType="applications"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
