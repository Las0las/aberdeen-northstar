'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useCompany, useDeleteCompany } from '@/hooks';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Skeleton,
} from '@/components/ui';
import { Entity360Tabs } from '@/components/entities/Entity360Tabs';
import { ArrowLeft, Edit, Trash2, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { formatDate, formatCurrency, getStatusColor } from '@/utils/helpers';

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: company, isLoading, error } = useCompany(id);
  const deleteCompany = useDeleteCompany();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this company?')) {
      await deleteCompany.mutateAsync(id);
      router.push('/dashboard/companies');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Company not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    { label: 'Contacts', href: `/dashboard/contacts?company_id=${id}` },
    { label: 'Jobs', href: `/dashboard/jobs?company_id=${id}` },
    { label: 'Clients', href: `/dashboard/clients?company_id=${id}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
        <p className="text-muted-foreground">{company.industry || 'No industry'}</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteCompany.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(company.status || 'active')}>
              {company.status || 'Active'}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Type</span>
            <Badge variant="outline">{company.type || 'N/A'}</Badge>
          </div>
          {company.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {company.website}
              </a>
            </div>
          )}
          {company.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{company.phone}</span>
            </div>
          )}
          {company.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{company.email}</span>
            </div>
          )}
          {company.headquarters && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{company.headquarters}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {company.employee_count && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Employees</span>
              <span>{company.employee_count.toLocaleString()}</span>
            </div>
          )}
          {company.annual_revenue && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Annual Revenue</span>
              <span>{formatCurrency(company.annual_revenue)}</span>
            </div>
          )}
          {company.payment_terms && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment Terms</span>
              <span>{company.payment_terms}</span>
            </div>
          )}
          {company.default_bill_rate && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Default Bill Rate</span>
              <span>{formatCurrency(company.default_bill_rate)}/hr</span>
            </div>
          )}
        </CardContent>
      </Card>

      {company.notes && (
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{company.notes}</p>
          </CardContent>
        </Card>
      )}

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <span className="text-sm text-muted-foreground">Created</span>
              <p>{formatDate(company.created_at)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{formatDate(company.updated_at)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{company.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="companies"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
