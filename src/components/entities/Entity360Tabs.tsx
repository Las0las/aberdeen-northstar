'use client';

import * as React from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Textarea,
  Input,
  Skeleton,
} from '@/components/ui';
import { formatDate } from '@/utils/helpers';
import { Clock, FileText, Link as LinkIcon, Shield, Plus, MessageSquare, Pencil, Trash2 } from 'lucide-react';

// API Response Types
interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: { code: string; message: string };
}

interface Activity {
  id: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  action_category?: string;
  description?: string;
  actor_id?: string;
  actor_type?: string;
  actor_name?: string;
  previous_value?: unknown;
  new_value?: unknown;
  changes?: unknown;
  metadata?: unknown;
  organization_id: string;
  ip_address?: string;
  user_agent?: string;
  source?: string;
  created_at: string;
}

interface Note {
  id: string;
  workspace_id: string;
  candidate_id: string;
  application_id?: string;
  title?: string;
  content: string;
  template_id?: string;
  note_type?: string;
  is_internal?: boolean;
  created_by: string;
  created_at: string;
  updated_at?: string;
  organization_id: string;
}

interface AuditLog {
  id: string;
  organization_id: string;
  user_id?: string;
  action: string;
  table_name: string;
  record_id: string;
  old_data?: unknown;
  new_data?: unknown;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

interface RelatedGroup {
  table: string;
  label: string;
  rows: Record<string, unknown>[];
}

interface RelatedData {
  outgoing: RelatedGroup[];
  incoming: RelatedGroup[];
}

interface RelatedEntity {
  label: string;
  href: string;
  count?: number;
}

interface Entity360TabsProps {
  children?: React.ReactNode;
  entityType: string;
  entityId: string;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  overview?: React.ReactNode;
  relatedEntities?: RelatedEntity[];
}

// API fetch helpers
async function fetchActivities(entityType: string, entityId: string): Promise<Activity[]> {
  const res = await fetch(`/api/activities?entity_type=${entityType}&entity_id=${entityId}`);
  const json: ApiResponse<Activity[]> = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Failed to fetch activities');
  return json.data || [];
}

interface NotesResponse {
  notes: Note[];
  supported: boolean;
  reason?: string;
}

async function fetchNotes(entityType: string, entityId: string): Promise<NotesResponse> {
  const res = await fetch(`/api/notes?entity_type=${entityType}&entity_id=${entityId}`);
  const json = await res.json() as ApiResponse<Note[]> & { meta?: { supported?: boolean; reason?: string } };
  if (!json.ok) throw new Error(json.error?.message || 'Failed to fetch notes');
  return {
    notes: json.data || [],
    supported: json.meta?.supported !== false,
    reason: json.meta?.reason,
  };
}

async function createNote(data: { entity_type: string; entity_id: string; title?: string; content: string; note_type?: string; is_internal?: boolean }): Promise<Note> {
  const res = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json: ApiResponse<Note> = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Failed to create note');
  return json.data!;
}

async function updateNote(id: string, data: { title?: string; content?: string; note_type?: string; is_internal?: boolean }): Promise<Note> {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json: ApiResponse<Note> = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Failed to update note');
  return json.data!;
}

async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
  const json: ApiResponse<{ deleted: boolean }> = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Failed to delete note');
}

async function fetchAudit(tableName: string, recordId: string): Promise<AuditLog[]> {
  const res = await fetch(`/api/audit?table_name=${tableName}&record_id=${recordId}`);
  const json: ApiResponse<AuditLog[]> = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Failed to fetch audit');
  return json.data || [];
}

async function fetchRelated(table: string, id: string): Promise<RelatedData> {
  const res = await fetch(`/api/related?table=${table}&id=${id}`);
  const json: ApiResponse<RelatedData> = await res.json();
  if (!json.ok) throw new Error(json.error?.message || 'Failed to fetch related');
  return json.data || { outgoing: [], incoming: [] };
}

export function Entity360Tabs({
  entityType,
  entityId,
  title,
  actions,
  overview,
  children,
  relatedEntities = [],
}: Entity360TabsProps) {
  const overviewContent = children || overview;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {title}
        {actions}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="related">Related</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {overviewContent}
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ActivityTab entityType={entityType} entityId={entityId} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <NotesTab entityType={entityType} entityId={entityId} />
        </TabsContent>

        <TabsContent value="related" className="mt-6">
          <RelatedTab entityType={entityType} entityId={entityId} relatedEntities={relatedEntities} />
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <AuditTab entityType={entityType} entityId={entityId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Activity Tab - Uses /api/activities
function ActivityTab({ entityType, entityId }: { entityType: string; entityId: string }) {
  const { data: activities = [], isLoading, error } = useQuery({
    queryKey: ['activities', entityType, entityId],
    queryFn: () => fetchActivities(entityType, entityId),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">Failed to load activities</p>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Activity Yet</h3>
          <p className="text-muted-foreground">Activity will appear here as actions are taken.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4 border-l-2 border-muted pl-4 pb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{activity.action_type}</Badge>
                  {activity.actor_name && (
                    <span className="text-sm text-muted-foreground">by {activity.actor_name}</span>
                  )}
                </div>
                {activity.description && (
                  <p className="mt-1 text-sm">{activity.description}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDate(activity.created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Notes Tab - Uses /api/notes with full CRUD (contract-driven support)
function NotesTab({ entityType, entityId }: { entityType: string; entityId: string }) {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [noteTitle, setNoteTitle] = React.useState('');
  const [noteContent, setNoteContent] = React.useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', entityType, entityId],
    queryFn: () => fetchNotes(entityType, entityId),
  });

  const notes = data?.notes || [];
  const notesSupported = data?.supported !== false;
  const unsupportedReason = data?.reason;

  const createMutation = useMutation({
    mutationFn: (formData: { title?: string; content: string }) =>
      createNote({ entity_type: entityType, entity_id: entityId, ...formData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
      setNoteTitle('');
      setNoteContent('');
      setIsAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title?: string; content?: string } }) =>
      updateNote(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
      setEditingId(null);
      setNoteTitle('');
      setNoteContent('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', entityType, entityId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: { title: noteTitle || undefined, content: noteContent } });
    } else {
      createMutation.mutate({ title: noteTitle || undefined, content: noteContent });
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setNoteTitle(note.title || '');
    setNoteContent(note.content);
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNoteTitle('');
    setNoteContent('');
    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">Failed to load notes</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Notes
        </h3>
        {notesSupported && (
          <Button onClick={() => { cancelEdit(); setIsAdding(!isAdding); }} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Note
          </Button>
        )}
      </div>

      {!notesSupported && (
        <Card>
          <CardContent className="py-8 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Notes are not supported for this entity type.
            </p>
            {unsupportedReason && (
              <p className="mt-1 text-xs text-muted-foreground">
                (Contract: {unsupportedReason})
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {notesSupported && isAdding && (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Note title (optional)"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              <Textarea
                placeholder="Write your note..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={!noteContent.trim() || createMutation.isPending || updateMutation.isPending}>
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : editingId ? 'Update Note' : 'Save Note'}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {notesSupported && notes.length === 0 && !isAdding && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Notes Yet</h3>
            <p className="text-muted-foreground">Add notes to track important information.</p>
          </CardContent>
        </Card>
      )}

      {notesSupported && notes.length > 0 && (
        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {note.title && <h4 className="font-medium mb-1">{note.title}</h4>}
                    <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      {note.note_type && <Badge variant="secondary">{note.note_type}</Badge>}
                      <span>{formatDate(note.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(note)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteMutation.mutate(note.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Related Tab - Uses /api/related + static relatedEntities
function RelatedTab({ 
  entityType, 
  entityId, 
  relatedEntities 
}: { 
  entityType: string; 
  entityId: string; 
  relatedEntities: RelatedEntity[];
}) {
  // Map entity type to table name (remove trailing 's' if present for singular)
  const tableName = entityType.endsWith('s') ? entityType : `${entityType}s`;
  
  const { data: related, isLoading, error } = useQuery({
    queryKey: ['related', tableName, entityId],
    queryFn: () => fetchRelated(tableName, entityId),
  });

  const hasStaticRelated = relatedEntities.length > 0;
  const hasDynamicRelated = related && (related.outgoing.length > 0 || related.incoming.length > 0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!hasStaticRelated && !hasDynamicRelated) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <LinkIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Related Records</h3>
          <p className="text-muted-foreground">Related entities will appear here when linked.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Static related entities from props */}
      {hasStaticRelated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {relatedEntities.map((entity) => (
                <Link key={entity.href} href={entity.href}>
                  <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="py-4 flex items-center justify-between">
                      <span className="font-medium">{entity.label}</span>
                      {entity.count !== undefined && (
                        <Badge variant="secondary">{entity.count}</Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dynamic related from API */}
      {hasDynamicRelated && !error && (
        <>
          {related!.outgoing.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Referenced Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {related!.outgoing.map((group) => (
                    <div key={group.table}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">{group.label}</h4>
                      <div className="space-y-2">
                        {group.rows.map((row, idx) => (
                          <div key={idx} className="text-sm p-2 bg-muted/50 rounded">
                            {(row as { name?: string; title?: string; id: string }).name || 
                             (row as { name?: string; title?: string; id: string }).title || 
                             (row as { name?: string; title?: string; id: string }).id}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {related!.incoming.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Referencing Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {related!.incoming.map((group) => (
                    <div key={group.table}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        {group.label} <Badge variant="outline" className="ml-1">{group.rows.length}</Badge>
                      </h4>
                      <div className="space-y-2">
                        {group.rows.slice(0, 5).map((row, idx) => (
                          <div key={idx} className="text-sm p-2 bg-muted/50 rounded">
                            {(row as { name?: string; title?: string; id: string }).name || 
                             (row as { name?: string; title?: string; id: string }).title || 
                             (row as { name?: string; title?: string; id: string }).id}
                          </div>
                        ))}
                        {group.rows.length > 5 && (
                          <p className="text-xs text-muted-foreground">+{group.rows.length - 5} more</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

// Audit Tab - Uses /api/audit
function AuditTab({ entityType, entityId }: { entityType: string; entityId: string }) {
  // Map entity type to table name
  const tableName = entityType.endsWith('s') ? entityType : `${entityType}s`;

  const { data: auditLogs = [], isLoading, error } = useQuery({
    queryKey: ['audit', tableName, entityId],
    queryFn: () => fetchAudit(tableName, entityId),
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-destructive">Failed to load audit trail</p>
        </CardContent>
      </Card>
    );
  }

  if (auditLogs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No Audit Trail</h3>
          <p className="text-muted-foreground">Compliance and audit events will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Audit Trail
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">Action</th>
                <th className="text-left py-2 px-2">User</th>
                <th className="text-left py-2 px-2">Changes</th>
                <th className="text-left py-2 px-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="py-2 px-2">
                    <Badge variant="outline">{log.action}</Badge>
                  </td>
                  <td className="py-2 px-2">{log.user_id || 'System'}</td>
                  <td className="py-2 px-2 text-muted-foreground">
                    {log.old_data || log.new_data ? 'Data changed' : '-'}
                  </td>
                  <td className="py-2 px-2 text-muted-foreground whitespace-nowrap">
                    {formatDate(log.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default Entity360Tabs;
