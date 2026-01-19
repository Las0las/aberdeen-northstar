'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useOffers, useCreateOffer } from '@/hooks';
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
import { Plus, FileCheck } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Offer = Database['public']['Tables']['offers']['Row'];

export default function OffersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useOffers({
    page,
    pageSize,
    filters: statusFilter !== 'all' ? { status: statusFilter } : undefined,
  });

  const createMutation = useCreateOffer();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        submission_id: formData.get('submission_id') as string || null,
        salary_amount: parseInt(formData.get('salary_amount') as string),
        salary_currency: formData.get('salary_currency') as string || 'USD',
        equity_percentage: formData.get('equity_percentage') ? parseFloat(formData.get('equity_percentage') as string) : null,
        start_date: formData.get('start_date') as string || null,
        status: formData.get('status') as string || 'pending',
        notes: formData.get('notes') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create offer:', err);
    }
  };

  const columns = [
    {
      key: 'submission_id',
      header: 'Submission',
      render: (offer: Offer) => (
        <div className="font-medium">{offer.submission_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'salary_amount',
      header: 'Salary',
      render: (offer: Offer) => formatCurrency(offer.salary_amount, offer.salary_currency || 'USD'),
    },
    {
      key: 'equity_percentage',
      header: 'Equity',
      render: (offer: Offer) => offer.equity_percentage ? `${offer.equity_percentage}%` : '-',
    },
    {
      key: 'start_date',
      header: 'Start Date',
      render: (offer: Offer) => offer.start_date ? formatDate(offer.start_date) : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (offer: Offer) => (
        <Badge className={getStatusColor(offer.status || 'pending')}>
          {offer.status || 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'sent_at',
      header: 'Sent',
      render: (offer: Offer) => offer.sent_at ? formatDate(offer.sent_at) : '-',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offers</h1>
          <p className="text-muted-foreground">Manage candidate offers</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Offer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="submission_id">Submission ID</Label>
                <Input id="submission_id" name="submission_id" placeholder="UUID of submission" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_amount">Salary Amount *</Label>
                  <Input id="salary_amount" name="salary_amount" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary_currency">Currency</Label>
                  <Select name="salary_currency" defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equity_percentage">Equity %</Label>
                  <Input id="equity_percentage" name="equity_percentage" type="number" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input id="start_date" name="start_date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" rows={2} />
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
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
              icon={<FileCheck className="h-12 w-12" />}
              title="Error loading offers"
              description="Please try again later"
            />
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<FileCheck className="h-12 w-12" />}
              title="No offers found"
              description="Create an offer to get started"
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Create Offer</Button>}
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
