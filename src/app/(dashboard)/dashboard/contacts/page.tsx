'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useContacts, useCreateContact } from '@/hooks';
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
import { Plus, Search, Contact } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type ContactType = Database['public']['Tables']['contacts']['Row'];

export default function ContactsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useContacts({ page, pageSize });
  const createMutation = useCreateContact();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        first_name: formData.get('first_name') as string || null,
        last_name: formData.get('last_name') as string || null,
        email: formData.get('email') as string || null,
        phone: formData.get('phone') as string || null,
        title: formData.get('title') as string || null,
        client_id: formData.get('client_id') as string || null,
        status: formData.get('status') as string || 'active',
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create contact:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (contact: ContactType) => (
        <div>
          <div className="font-medium">
            {contact.first_name} {contact.last_name}
          </div>
          <div className="text-sm text-muted-foreground">{contact.email}</div>
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Title',
      render: (contact: ContactType) => contact.title || '-',
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (contact: ContactType) => contact.phone || '-',
    },
    {
      key: 'client_id',
      header: 'Client',
      render: (contact: ContactType) => contact.client_id ? contact.client_id.slice(0, 8) + '...' : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (contact: ContactType) => (
        <Badge className={getStatusColor(contact.status || 'active')}>
          {contact.status || 'Active'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Added',
      render: (contact: ContactType) => formatDate(contact.created_at),
    },
  ];

  const filteredData = search
    ? data?.data.filter((contact) =>
        `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
        contact.email?.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Manage client contacts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input id="first_name" name="first_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input id="last_name" name="last_name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="client_id">Client ID</Label>
                <Input id="client_id" name="client_id" placeholder="UUID of client" />
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
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
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
              icon={<Contact className="h-12 w-12" />}
              title="Error loading contacts"
              description="Please try again later"
            />
          ) : filteredData?.length === 0 ? (
            <EmptyState
              icon={<Contact className="h-12 w-12" />}
              title="No contacts found"
              description={search ? 'Try adjusting your search' : 'Add your first contact'}
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Contact</Button>}
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
