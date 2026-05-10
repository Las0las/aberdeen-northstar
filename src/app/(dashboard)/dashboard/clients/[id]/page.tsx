'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useClient, useDeleteClient } from '@/hooks';
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
import { ArrowLeft, Edit, Trash2, Globe, Building, Mail, Phone, User } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: client, isLoading, error } = useClient(id);
  const deleteClient = useDeleteClient();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this client?')) {
      await deleteClient.mutateAsync(id);
      router.push('/dashboard/clients');
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

  if (error || !client) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Client not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    { label: 'Jobs', href: `/dashboard/jobs?client_id=${id}` },
    { label: 'Contacts', href: `/dashboard/contacts?client_id=${id}` },
    { label: 'Placements', href: `/dashboard/placements?client_id=${id}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
        <p className="text-muted-foreground">{client.industry || 'Client'}</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteClient.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Client Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{client.name}</span>
          </div>
          {client.status && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
            </div>
          )}
          {client.tier && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tier</span>
              <Badge variant="outline">{client.tier}</Badge>
            </div>
          )}
          {client.industry && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Industry</span>
              <span>{client.industry}</span>
            </div>
          )}
          {client.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {client.website}
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Primary Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {client.contact_name && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{client.contact_name}</span>
            </div>
          )}
          {client.contact_email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${client.contact_email}`} className="text-primary hover:underline">
                {client.contact_email}
              </a>
            </div>
          )}
          {client.contact_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.contact_phone}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Metadata</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <span className="text-sm text-muted-foreground">Created</span>
              <p>{client.created_at ? formatDate(client.created_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{client.updated_at ? formatDate(client.updated_at) : 'N/A'}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{client.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="clients"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
