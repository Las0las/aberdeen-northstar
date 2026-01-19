'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useClients, useCreateClient } from '@/hooks';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Plus, Search, UserCircle } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Client = Database['public']['Tables']['clients']['Row'];

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useClients({ page, pageSize });
  const createMutation = useCreateClient();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        name: formData.get('name') as string,
        industry: formData.get('industry') as string || null,
        website: formData.get('website') as string || null,
        tier: formData.get('tier') as string || null,
        status: formData.get('status') as string || 'active',
        contact_name: formData.get('contact_name') as string || null,
        contact_email: formData.get('contact_email') as string || null,
        contact_phone: formData.get('contact_phone') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create client:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Client',
      render: (client: Client) => (
        <div className="font-medium">{client.name}</div>
      ),
    },
    {
      key: 'industry',
      header: 'Industry',
      render: (client: Client) => client.industry || '-',
    },
    {
      key: 'contact_email',
      header: 'Contact',
      render: (client: Client) => client.contact_email || '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (client: Client) => (
        <Badge className={getStatusColor(client.status || 'active')}>
          {client.status || 'Active'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Added',
      render: (client: Client) => formatDate(client.created_at),
    },
  ];

  const filteredData = search
    ? data?.data.filter((client) =>
        client.name?.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tier">Tier</Label>
                  <Select name="tier">
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="mid-market">Mid-Market</SelectItem>
                      <SelectItem value="smb">SMB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" type="url" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_name">Contact Name</Label>
                <Input id="contact_name" name="contact_name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input id="contact_email" name="contact_email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input id="contact_phone" name="contact_phone" type="tel" />
                </div>
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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
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
              icon={<UserCircle className="h-12 w-12" />}
              title="Error loading clients"
              description="Please try again later"
            />
          ) : filteredData?.length === 0 ? (
            <EmptyState
              icon={<UserCircle className="h-12 w-12" />}
              title="No clients found"
              description={search ? 'Try adjusting your search' : 'Add your first client'}
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Client</Button>}
            />
          ) : (
            <>
              <DataTable columns={columns} data={filteredData || []} />
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
