'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useTeams, useCreateTeam } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  Badge,
  DataTable,
  Pagination,
  Skeleton,
  EmptyState,
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
import { Plus, UsersRound } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Team = Database['public']['Tables']['teams']['Row'];

export default function TeamsPage() {
  const [page, setPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useTeams({ page, pageSize });
  const createMutation = useCreateTeam();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        name: formData.get('name') as string,
        description: formData.get('description') as string || null,
        status: formData.get('status') as string || 'active',
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create team:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Team Name',
      render: (team: Team) => (
        <div>
          <div className="font-medium">{team.name}</div>
          {team.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">{team.description}</div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (team: Team) => (
        <Badge className={getStatusColor(team.status || 'active')}>
          {team.status || 'Active'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (team: Team) => formatDate(team.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage organization teams</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Team</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={2} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
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
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : error ? (
            <EmptyState
              icon={<UsersRound className="h-12 w-12" />}
              title="Error loading teams"
              description="Please try again later"
            />
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<UsersRound className="h-12 w-12" />}
              title="No teams found"
              description="Create a team to get started"
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Create Team</Button>}
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
