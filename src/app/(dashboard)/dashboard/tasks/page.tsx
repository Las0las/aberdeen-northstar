'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useTasks, usePendingTasks, useUpdateTask, useCurrentUser, useCreateTask } from '@/hooks';
import { getDevOrganizationId } from '@/config/devAuth';
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
import { Plus, CheckSquare, Check } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Task = Database['public']['Tables']['tasks']['Row'];

export default function TasksPage() {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('pending');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data: user } = useCurrentUser();
  const { data: pendingData, isLoading: loadingPending } = usePendingTasks({ page, pageSize });
  const { data: allData, isLoading: loadingAll } = useTasks({ page, pageSize });
  const updateTask = useUpdateTask();
  const createMutation = useCreateTask();

  const handleComplete = (taskId: string) => {
    updateTask.mutate({ id: taskId, data: { status: 'completed' } });
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const orgId = getDevOrganizationId() || '';
    try {
      await createMutation.mutateAsync({
        title: formData.get('title') as string,
        description: formData.get('description') as string || null,
        task_type: formData.get('task_type') as string,
        priority: formData.get('priority') as string || 'p2',
        status: 'open',
        due_at: formData.get('due_at') as string || null,
        tenant_id: orgId,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const columns = [
    {
      key: 'title',
      header: 'Task',
      render: (task: Task) => (
        <div>
          <div className="font-medium">{task.title}</div>
          {task.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">{task.description}</div>
          )}
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (task: Task) => {
        const priorityColors: Record<string, string> = {
          p1: 'bg-red-100 text-red-800',
          p2: 'bg-yellow-100 text-yellow-800',
          p3: 'bg-green-100 text-green-800',
        };
        return (
          <Badge className={priorityColors[task.priority || 'p2'] || 'bg-gray-100 text-gray-800'}>
            {task.priority || 'P2'}
          </Badge>
        );
      },
    },
    {
      key: 'due_at',
      header: 'Due Date',
      render: (task: Task) => formatDate(task.due_at),
    },
    {
      key: 'status',
      header: 'Status',
      render: (task: Task) => (
        <Badge className={getStatusColor(task.status || 'open')}>
          {task.status || 'Open'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (task: Task) => (
        task.status !== 'completed' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleComplete(task.id);
            }}
            disabled={updateTask.isPending}
          >
            <Check className="h-4 w-4" />
          </Button>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and to-dos</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="task_type">Type *</Label>
                  <Select name="task_type" defaultValue="follow_up">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follow_up">Follow Up</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" defaultValue="p2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p1">P1 - High</SelectItem>
                      <SelectItem value="p2">P2 - Medium</SelectItem>
                      <SelectItem value="p3">P3 - Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_at">Due Date</Label>
                <Input id="due_at" name="due_at" type="datetime-local" />
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
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingPending ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : pendingData?.data.length === 0 ? (
                <EmptyState
                  icon={<CheckSquare className="h-12 w-12" />}
                  title="No pending tasks"
                  description="All caught up! Add a new task to get started."
                  action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Task</Button>}
                />
              ) : (
                <>
                  <DataTable columns={columns} data={pendingData?.data || []} />
                  {pendingData && pendingData.totalPages > 1 && (
                    <Pagination page={page} totalPages={pendingData.totalPages} onPageChange={setPage} />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingAll ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : allData?.data.length === 0 ? (
                <EmptyState
                  icon={<CheckSquare className="h-12 w-12" />}
                  title="No tasks found"
                  description="Add a task to get started"
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
