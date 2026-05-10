'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { usePlacement, useDeletePlacement } from '@/hooks';
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
import { ArrowLeft, Edit, Trash2, Calendar, DollarSign } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';

export default function PlacementDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: placement, isLoading, error } = usePlacement(id);
  const deletePlacement = useDeletePlacement();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this placement?')) {
      await deletePlacement.mutateAsync(id);
      router.push('/dashboard/placements');
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

  if (error || !placement) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Placement not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    ...(placement.candidate_id ? [{ label: 'Candidate', href: `/dashboard/candidates/${placement.candidate_id}` }] : []),
    ...(placement.job_id ? [{ label: 'Job', href: `/dashboard/jobs/${placement.job_id}` }] : []),
    ...(placement.offer_id ? [{ label: 'Offer', href: `/dashboard/offers/${placement.offer_id}` }] : []),
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Placement Details</h1>
        <p className="text-muted-foreground">ID: {placement.id.slice(0, 8)}...</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deletePlacement.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Placement Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(placement.status || 'active')}>
              {placement.status || 'Active'}
            </Badge>
          </div>
          {placement.guarantee_days && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Guarantee</span>
              <span>{placement.guarantee_days} days</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {placement.placement_fee && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Placement Fee</span>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{formatCurrency(placement.placement_fee)}</span>
              </div>
            </div>
          )}
          {placement.fee_currency && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Currency</span>
              <span>{placement.fee_currency}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Duration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Start Date</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(placement.start_date)}</span>
            </div>
          </div>
          {placement.end_date && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">End Date</span>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatDate(placement.end_date)}</span>
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
          {placement.candidate_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Candidate</span>
              <span className="font-mono text-sm">{placement.candidate_id.slice(0, 8)}...</span>
            </div>
          )}
          {placement.job_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job</span>
              <span className="font-mono text-sm">{placement.job_id.slice(0, 8)}...</span>
            </div>
          )}
          {placement.offer_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Offer</span>
              <span className="font-mono text-sm">{placement.offer_id.slice(0, 8)}...</span>
            </div>
          )}
        </CardContent>
      </Card>

      {placement.notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{placement.notes}</p>
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
              <p>{placement.created_at ? formatDate(placement.created_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{placement.updated_at ? formatDate(placement.updated_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{placement.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="placements"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
