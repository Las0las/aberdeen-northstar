'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useOffer, useDeleteOffer } from '@/hooks';
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
import { ArrowLeft, Edit, Trash2, Calendar, DollarSign, Percent } from 'lucide-react';
import { formatDate, formatDateTime, formatCurrency, getStatusColor } from '@/utils/helpers';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: offer, isLoading, error } = useOffer(id);
  const deleteOffer = useDeleteOffer();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this offer?')) {
      await deleteOffer.mutateAsync(id);
      router.push('/dashboard/offers');
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

  if (error || !offer) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Offer not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    ...(offer.submission_id ? [{ label: 'Submission', href: `/dashboard/submissions/${offer.submission_id}` }] : []),
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Offer Details</h1>
        <p className="text-muted-foreground">ID: {offer.id.slice(0, 8)}...</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteOffer.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Offer Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(offer.status || 'pending')}>
              {offer.status || 'Pending'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Salary</span>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{formatCurrency(offer.salary_amount)}</span>
              {offer.salary_currency && <span className="text-muted-foreground text-sm">({offer.salary_currency})</span>}
            </div>
          </div>
          {offer.equity_percentage && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Equity</span>
              <div className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span>{offer.equity_percentage}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {offer.start_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Start: {formatDate(offer.start_date)}</span>
            </div>
          )}
          {offer.sent_at && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Sent: {formatDateTime(offer.sent_at)}</span>
            </div>
          )}
          {offer.accepted_at && (
            <div className="flex items-center gap-2 text-success-foreground">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Accepted: {formatDateTime(offer.accepted_at)}</span>
            </div>
          )}
          {offer.declined_at && (
            <div className="flex items-center gap-2 text-destructive">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>Declined: {formatDateTime(offer.declined_at)}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {offer.submission_id && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Submission</span>
              <span className="font-mono text-sm">{offer.submission_id.slice(0, 8)}...</span>
            </div>
          )}
          {offer.offer_letter_url && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Offer Letter</span>
              <a href={offer.offer_letter_url} className="text-primary hover:underline text-sm">View</a>
            </div>
          )}
        </CardContent>
      </Card>

      {offer.notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{offer.notes}</p>
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
              <p>{offer.created_at ? formatDate(offer.created_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{offer.updated_at ? formatDate(offer.updated_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{offer.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="offer"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
