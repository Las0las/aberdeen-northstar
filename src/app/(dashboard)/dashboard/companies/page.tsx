'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useCompanies, useCreateCompany } from '@/hooks';
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
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { Plus, Search, Building2 } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';
import type { Database } from '@/types/database.types';

type Company = Database['public']['Tables']['companies']['Row'];

export default function CompaniesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const pageSize = 20;

  const { data, isLoading, error } = useCompanies({ page, pageSize });
  const createMutation = useCreateCompany();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createMutation.mutateAsync({
        name: formData.get('name') as string,
        type: formData.get('type') as string || null,
        industry: formData.get('industry') as string || null,
        website: formData.get('website') as string || null,
        phone: formData.get('phone') as string || null,
        email: formData.get('email') as string || null,
        headquarters: formData.get('headquarters') as string || null,
        employee_count: formData.get('employee_count') ? parseInt(formData.get('employee_count') as string) : null,
        status: formData.get('status') as string || 'active',
        notes: formData.get('notes') as string || null,
      });
      setIsCreateOpen(false);
    } catch (err) {
      console.error('Failed to create company:', err);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Company',
      render: (company: Company) => (
        <div>
          <div className="font-medium">{company.name}</div>
          <div className="text-sm text-muted-foreground">{company.industry || 'No industry'}</div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (company: Company) => company.type || '-',
    },
    {
      key: 'headquarters',
      header: 'Location',
      render: (company: Company) => company.headquarters || '-',
    },
    {
      key: 'employee_count',
      header: 'Size',
      render: (company: Company) =>
        company.employee_count ? `${company.employee_count.toLocaleString()} employees` : '-',
    },
    {
      key: 'status',
      header: 'Status',
      render: (company: Company) => (
        <Badge className={getStatusColor(company.status || 'active')}>
          {company.status || 'Active'}
        </Badge>
      ),
    },
    {
      key: 'created_at',
      header: 'Added',
      render: (company: Company) => formatDate(company.created_at),
    },
  ];

  const filteredData = search
    ? data?.data.filter((company) =>
        company.name?.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage client companies and prospects</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select name="type" defaultValue="prospect">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospect">Prospect</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" type="url" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee_count">Employees</Label>
                  <Input id="employee_count" name="employee_count" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headquarters">Headquarters</Label>
                <Input id="headquarters" name="headquarters" />
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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
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
              icon={<Building2 className="h-12 w-12" />}
              title="Error loading companies"
              description="Please try again later"
            />
          ) : filteredData?.length === 0 ? (
            <EmptyState
              icon={<Building2 className="h-12 w-12" />}
              title="No companies found"
              description={search ? 'Try adjusting your search' : 'Add your first company'}
              action={<Button onClick={() => setIsCreateOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Company</Button>}
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
