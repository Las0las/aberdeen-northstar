'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useInterviews, useUpcomingInterviews, useCreateInterview } from '@/hooks';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Plus, Calendar } from 'lucide-react';
import { formatDateTime, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Interview = Database['public']['Tables']['interviews']['Row'];

export default function InterviewsPage() {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data: upcomingData, isLoading: loadingUpcoming, error: errorUpcoming } = useUpcomingInterviews();
  const { data: allData, isLoading: loadingAll, error: errorAll } = useInterviews({ page, pageSize });
  const createMutation = useCreateInterview();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        candidate_id: formData.get('candidate_id') as string || null,
        job_id: formData.get('job_id') as string || null,
        interview_type: formData.get('interview_type') as string || null,
        scheduled_at: formData.get('scheduled_at') as string || null,
        duration_minutes: parseInt(formData.get('duration_minutes') as string) || 60,
        location: formData.get('location') as string || null,
        status: 'scheduled',
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create interview:', err);
    }
  };

  const columns = [
    {
      key: 'candidate_id',
      header: 'Candidate',
      render: (interview: Interview) => (
        <div className="font-medium">{interview.candidate_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'job_id',
      header: 'Job',
      render: (interview: Interview) => (
        <div>{interview.job_id?.slice(0, 8)}...</div>
      ),
    },
    {
      key: 'interview_type',
      header: 'Type',
      render: (interview: Interview) => interview.interview_type || '-',
    },
    {
      key: 'scheduled_at',
      header: 'Scheduled',
      render: (interview: Interview) => formatDateTime(interview.scheduled_at),
    },
    {
      key: 'status',
      header: 'Status',
      render: (interview: Interview) => (
        <Badge className={getStatusColor(interview.status || 'scheduled')}>
          {interview.status || 'Scheduled'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground">Schedule and manage candidate interviews</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
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
                <Label htmlFor="interview_type">Interview Type</Label>
                <Select name="interview_type" defaultValue="phone_screen">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone_screen">Phone Screen</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="panel">Panel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduled_at">Scheduled Date/Time</Label>
                <Input id="scheduled_at" name="scheduled_at" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                <Input id="duration_minutes" name="duration_minutes" type="number" defaultValue="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location / Meeting Link</Label>
                <Input id="location" name="location" placeholder="Office or video link" />
              </div>
              {createMutation.error && (
                <div className="text-sm text-destructive">{createMutation.error.message}</div>
              )}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button type="submit" loading={createMutation.isPending}>Schedule</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="all">All Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              {errorUpcoming ? (
                <div className="text-center py-8 text-destructive">
                  Error loading interviews: {errorUpcoming.message}
                </div>
              ) : loadingUpcoming ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : upcomingData?.data.length === 0 ? (
                <EmptyState
                  icon={<Calendar className="h-12 w-12" />}
                  title="No upcoming interviews"
                  description="Schedule an interview to get started"
                  action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Schedule Interview</Button>}
                />
              ) : (
                <DataTable columns={columns} data={upcomingData?.data || []} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              {errorAll ? (
                <div className="text-center py-8 text-destructive">
                  Error loading interviews: {errorAll.message}
                </div>
              ) : loadingAll ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : allData?.data.length === 0 ? (
                <EmptyState
                  icon={<Calendar className="h-12 w-12" />}
                  title="No interviews found"
                  description="Schedule an interview to get started"
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
