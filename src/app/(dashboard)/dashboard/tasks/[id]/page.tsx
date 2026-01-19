'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useTask, useDeleteTask } from '@/hooks';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Edit, Trash2, Calendar, User, Clock } from 'lucide-react';
import { formatDate, formatDateTime, getStatusColor } from '@/utils/helpers';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: task, isLoading, error } = useTask(id);
  const deleteTask = useDeleteTask();

  const handleDelete = async () => {
    if (confirm('Delete this task?')) {
      await deleteTask.mutateAsync(id);
      router.push('/dashboard/tasks');
    }
  };

  if (isLoading) return <div className="space-y-6"><Skeleton className="h-8 w-48" /><Skeleton className="h-64 w-full" /></div>;
  if (error || !task) return <div className="space-y-6"><Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button><Card><CardContent className="pt-6"><p className="text-muted-foreground">Task not found</p></CardContent></Card></div>;

  const relatedEntities = [
    ...(task.assigned_to_user_id ? [{ label: 'Assignee', href: `/dashboard/users/${task.assigned_to_user_id}` }] : []),
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          <div><h1 className="text-3xl font-bold tracking-tight">{task.title || 'Task'}</h1><p className="text-muted-foreground">ID: {id.slice(0, 8)}...</p></div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteTask.isPending}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
        </div>
      </div>
      <Entity360Tabs entityType="tasks" entityId={id} relatedEntities={relatedEntities}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card><CardHeader><CardTitle>Details</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Status</span><Badge className={getStatusColor(task.status || 'pending')}>{task.status || 'Pending'}</Badge></div>
            {task.priority && <div className="flex items-center justify-between"><span className="text-muted-foreground">Priority</span><Badge variant="outline">{task.priority}</Badge></div>}
            {task.task_type && <div className="flex items-center justify-between"><span className="text-muted-foreground">Type</span><span>{task.task_type}</span></div>}
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Schedule</CardTitle></CardHeader><CardContent className="space-y-4">
            {task.due_at && <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Due: {formatDateTime(task.due_at)}</span></div>}
            {task.completed_at && <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /><span>Completed: {formatDateTime(task.completed_at)}</span></div>}
          </CardContent></Card>
          {task.description && <Card className="md:col-span-2"><CardHeader><CardTitle>Description</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap">{task.description}</p></CardContent></Card>}
          <Card><CardHeader><CardTitle>Assignment</CardTitle></CardHeader><CardContent className="space-y-4">
            {task.assigned_to_user_id && <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span>Assignee: {task.assigned_to_user_id.slice(0, 8)}...</span></div>}
            {task.related_entity_type && <div className="flex items-center justify-between"><span className="text-muted-foreground">Related To</span><span>{task.related_entity_type}</span></div>}
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Metadata</CardTitle></CardHeader><CardContent><div className="grid gap-4"><div><span className="text-sm text-muted-foreground">Created</span><p>{formatDate(task.created_at)}</p></div><div><span className="text-sm text-muted-foreground">Updated</span><p>{formatDate(task.updated_at)}</p></div></div></CardContent></Card>
        </div>
      </Entity360Tabs>
    </div>
  );
}
