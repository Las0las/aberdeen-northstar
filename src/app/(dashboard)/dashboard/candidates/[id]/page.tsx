'use client';
export const dynamic = 'force-dynamic';

import { useParams, useRouter } from 'next/navigation';
import { useCandidate, useDeleteCandidate } from '@/hooks';
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
import { ArrowLeft, Edit, Trash2, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { formatDate, getStatusColor } from '@/utils/helpers';

export default function CandidateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: candidate, isLoading, error } = useCandidate(id);
  const deleteCandidate = useDeleteCandidate();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      await deleteCandidate.mutateAsync(id);
      router.push('/dashboard/candidates');
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

  if (error || !candidate) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">Candidate not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const relatedEntities = [
    { label: 'Applications', href: `/dashboard/applications?candidate_id=${id}` },
    { label: 'Interviews', href: `/dashboard/interviews?candidate_id=${id}` },
    { label: 'Submissions', href: `/dashboard/submissions?candidate_id=${id}` },
    { label: 'Offers', href: `/dashboard/offers?candidate_id=${id}` },
  ];

  const title = (
    <div className="flex items-center gap-4">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {candidate.first_name} {candidate.last_name}
        </h1>
        <p className="text-muted-foreground">{candidate.current_title || 'No title'}</p>
      </div>
    </div>
  );

  const actions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <Edit className="mr-2 h-4 w-4" /> Edit
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={deleteCandidate.isPending}>
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </Button>
    </div>
  );

  const overview = (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {candidate.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.email}</span>
            </div>
          )}
          {candidate.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.phone}</span>
            </div>
          )}
          {candidate.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{candidate.location}</span>
            </div>
          )}
          {candidate.linkedin_url && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                LinkedIn Profile
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge className={getStatusColor(candidate.status || 'new')}>
              {candidate.status || 'New'}
            </Badge>
          </div>
          {candidate.current_company && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Current Company</span>
              <span>{candidate.current_company}</span>
            </div>
          )}
          {candidate.years_experience && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Experience</span>
              <span>{candidate.years_experience} years</span>
            </div>
          )}
          {candidate.source && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Source</span>
              <span>{candidate.source}</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Skills & Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {candidate.skills && Array.isArray(candidate.skills) && candidate.skills.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {(candidate.skills as string[]).map((skill, i) => (
                  <Badge key={i} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          )}
          {candidate.desired_roles && Array.isArray(candidate.desired_roles) && candidate.desired_roles.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Desired Roles</h4>
              <div className="flex flex-wrap gap-2">
                {(candidate.desired_roles as string[]).map((role, i) => (
                  <Badge key={i} variant="outline">{role}</Badge>
                ))}
              </div>
            </div>
          )}
          {candidate.notes && (
            <div>
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-muted-foreground">{candidate.notes}</p>
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
              <p>{formatDate(candidate.created_at)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Updated</span>
              <p>{formatDate(candidate.updated_at)}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">ID</span>
              <p className="font-mono text-sm">{candidate.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Entity360Tabs
      entityType="candidate"
      entityId={id}
      title={title}
      actions={actions}
      overview={overview}
      relatedEntities={relatedEntities}
    />
  );
}
