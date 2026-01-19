'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import { useCandidates, useCandidateSearch, useCreateCandidate } from '@/hooks';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  Textarea,
} from '@/components/ui';
import { Plus, Search, Users } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Candidate = Database['public']['Tables']['candidates']['Row'];

export default function CandidatesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const isSearching = search.length >= 2;
  const searchResult = useCandidateSearch(isSearching ? search : '', { page, pageSize, enabled: isSearching });
  const listResult = useCandidates({ page, pageSize, enabled: !isSearching });
  
  const { data, isLoading, error } = isSearching ? searchResult : listResult;
  const createMutation = useCreateCandidate();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || null,
        current_title: formData.get('current_title') as string || null,
        current_company: formData.get('current_company') as string || null,
        location: formData.get('location') as string || null,
        notes: formData.get('notes') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create candidate:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (candidate: Candidate) => (
        <Link href={`/dashboard/candidates/${candidate.id}`} className="hover:underline">
          <div className="font-medium">
            {candidate.first_name} {candidate.last_name}
          </div>
          <div className="text-sm text-muted-foreground">{candidate.email}</div>
        </Link>
      ),
    },
    {
      key: 'current_title',
      header: 'Title',
      render: (candidate: Candidate) => candidate.current_title || '-',
    },
    {
      key: 'current_company',
      header: 'Company',
      render: (candidate: Candidate) => candidate.current_company || '-',
    },
    {
      key: 'location',
      header: 'Location',
      render: (candidate: Candidate) => candidate.location || '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (candidate: Candidate) => (
        <Badge className={getStatusColor(candidate.status || 'new')}>
          {candidate.status || 'New'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Added',
      render: (candidate: Candidate) => formatDate(candidate.created_at),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">Manage your candidate pipeline</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input id="first_name" name="first_name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input id="last_name" name="last_name" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_title">Current Title</Label>
                  <Input id="current_title" name="current_title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current_company">Company</Label>
                  <Input id="current_company" name="current_company" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="City, State" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" rows={3} />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={createMutation.isPending}>
                  Create Candidate
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8 text-destructive">
              Error loading candidates: {error.message}
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <EmptyState
              icon={<Users className="h-12 w-12" />}
              title="No candidates found"
              description="Add your first candidate to get started"
              action={
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Candidate
                </Button>
              }
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
