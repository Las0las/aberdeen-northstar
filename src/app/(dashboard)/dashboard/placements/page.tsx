'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { usePlacements, useActivePlacements, useCreatePlacement } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  DataTable,
  Pagination,
  Skeleton,
  EmptyState,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Plus, Award } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Placement = Database['public']['Tables']['placements']['Row'];

export default function PlacementsPage() {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data: activeData, isLoading: loadingActive, error: errorActive } = useActivePlacements({ page, pageSize });
  const { data: allData, isLoading: loadingAll, error: errorAll } = usePlacements({ page, pageSize });
  const createMutation = useCreatePlacement();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        candidate_id: formData.get('candidate_id') as string || null,
        job_id: formData.get('job_id') as string || null,
        offer_id: formData.get('offer_id') as string || null,
        start_date: formData.get('start_date') as string,
        end_date: formData.get('end_date') as string || null,
        placement_fee: formData.get('placement_fee') ? parseInt(formData.get('placement_fee') as string) : null,
        status: formData.get('status') as string || 'active',
        notes: formData.get('notes') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create placement:', err);
    }
  };

  const columns = [
    {
      key: 'candidate_id',
      header: 'Candidate',
      render: (placement: Placement) => (
        <div className="font-medium">{placement.candidate_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'job_id',
      header: 'Job',
      render: (placement: Placement) => (
        <div>{placement.job_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'start_date',
      header: 'Start Date',
      render: (placement: Placement) => formatDate(placement.start_date),
    },
    {
      key: 'end_date',
      header: 'End Date',
      render: (placement: Placement) => placement.end_date ? formatDate(placement.end_date) : 'Ongoing',
    },
    {
      key: 'placement_fee',
      header: 'Placement Fee',
      render: (placement: Placement) => placement.placement_fee ? formatCurrency(placement.placement_fee) : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (placement: Placement) => (
        <Badge className={getStatusColor(placement.status || 'active')}>
          {placement.status || 'Active'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Placements</h1>
          <p className="text-muted-foreground">Track candidate placements and assignments</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Placement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Placement</DialogTitle>
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
                <Label htmlFor="offer_id">Offer ID</Label>
                <Input id="offer_id" name="offer_id" placeholder="UUID of offer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input id="start_date" name="start_date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input id="end_date" name="end_date" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="placement_fee">Placement Fee</Label>
                  <Input id="placement_fee" name="placement_fee" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="active">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="all">All Placements</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Placements</CardTitle>
            </CardHeader>
            <CardContent>
              {errorActive ? (
                <div className="text-center py-8 text-destructive">
                  Error loading placements: {errorActive.message}
                </div>
              ) : loadingActive ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : activeData?.data.length === 0 ? (
                <EmptyState
                  icon={<Award className="h-12 w-12" />}
                  title="No active placements"
                  description="Create a placement to get started"
                  action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />New Placement</Button>}
                />
              ) : (
                <>
                  <DataTable columns={columns} data={activeData?.data || []} />
                  {activeData && activeData.totalPages > 1 && (
                    <Pagination page={page} totalPages={activeData.totalPages} onPageChange={setPage} />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Placements</CardTitle>
            </CardHeader>
            <CardContent>
              {errorAll ? (
                <div className="text-center py-8 text-destructive">
                  Error loading placements: {errorAll.message}
                </div>
              ) : loadingAll ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : allData?.data.length === 0 ? (
                <EmptyState
                  icon={<Award className="h-12 w-12" />}
                  title="No placements found"
                  description="Create a placement to get started"
                />
              ) : (
                <>
                  <DataTable columns={columns} data={allData?.data || []} />
                  {allData && allData.totalPages > 1 && (
                    <Pagination page={page} totalPages={allData.totalPages} onPageChange={setPage} />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
