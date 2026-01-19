// AUTO-GENERATED FROM db_contract.frozen.json - DO NOT EDIT
// Generated: 2026-01-17T23:00:17.469Z

import { z } from 'zod';

// Base types
export const UuidSchema = z.string().uuid();
export const TimestampSchema = z.string().datetime();
export const JsonSchema = z.record(z.unknown());

// tags
export const TagsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable(),
  description: z.string().nullable(),
  tag_type: z.string().nullable(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type Tags = z.infer<typeof TagsSchema>;

export const TagsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tag_type: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type TagsInsert = z.infer<typeof TagsInsertSchema>;

export const TagsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  name: z.string().optional(),
  color: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tag_type: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type TagsUpdate = z.infer<typeof TagsUpdateSchema>;

// users
export const UsersSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  email: z.string(),
  full_name: z.string().nullable(),
  role: z.string().nullable(),
  is_active: z.boolean().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  password_hash: z.string().nullable(),
  avatar_url: z.string().nullable(),
  last_login_at: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  permissions: z.record(z.unknown()).nullable(),
});
export type Users = z.infer<typeof UsersSchema>;

export const UsersInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  email: z.string(),
  full_name: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  password_hash: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  last_login_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).nullable().optional(),
});
export type UsersInsert = z.infer<typeof UsersInsertSchema>;

export const UsersUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  email: z.string().optional(),
  full_name: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  password_hash: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  last_login_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).nullable().optional(),
});
export type UsersUpdate = z.infer<typeof UsersUpdateSchema>;

// interview_feedback
export const InterviewFeedbackSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  interview_id: z.string().uuid().nullable(),
  interviewer_id: z.string().uuid().nullable(),
  interviewer_name: z.string().nullable(),
  overall_rating: z.number().int().nullable(),
  recommendation: z.string().nullable(),
  strengths: z.array(z.unknown()).nullable(),
  concerns: z.array(z.unknown()).nullable(),
  notes: z.string().nullable(),
  scorecard: z.record(z.unknown()).nullable(),
  submitted_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type InterviewFeedback = z.infer<typeof InterviewFeedbackSchema>;

export const InterviewFeedbackInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  interview_id: z.string().uuid().nullable().optional(),
  interviewer_id: z.string().uuid().nullable().optional(),
  interviewer_name: z.string().nullable().optional(),
  overall_rating: z.number().int().nullable().optional(),
  recommendation: z.string().nullable().optional(),
  strengths: z.array(z.unknown()).nullable().optional(),
  concerns: z.array(z.unknown()).nullable().optional(),
  notes: z.string().nullable().optional(),
  scorecard: z.record(z.unknown()).nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type InterviewFeedbackInsert = z.infer<typeof InterviewFeedbackInsertSchema>;

export const InterviewFeedbackUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  interview_id: z.string().uuid().nullable().optional(),
  interviewer_id: z.string().uuid().nullable().optional(),
  interviewer_name: z.string().nullable().optional(),
  overall_rating: z.number().int().nullable().optional(),
  recommendation: z.string().nullable().optional(),
  strengths: z.array(z.unknown()).nullable().optional(),
  concerns: z.array(z.unknown()).nullable().optional(),
  notes: z.string().nullable().optional(),
  scorecard: z.record(z.unknown()).nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type InterviewFeedbackUpdate = z.infer<typeof InterviewFeedbackUpdateSchema>;

// user_sessions
export const UserSessionsSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  session_token: z.string(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  expires_at: z.string().datetime(),
  created_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type UserSessions = z.infer<typeof UserSessionsSchema>;

export const UserSessionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  session_token: z.string(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  expires_at: z.string().datetime(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type UserSessionsInsert = z.infer<typeof UserSessionsInsertSchema>;

export const UserSessionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  session_token: z.string().optional(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  expires_at: z.string().datetime().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type UserSessionsUpdate = z.infer<typeof UserSessionsUpdateSchema>;

// saved_searches
export const SavedSearchesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  entity_type: z.string(),
  filters: z.record(z.unknown()),
  user_id: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type SavedSearches = z.infer<typeof SavedSearchesSchema>;

export const SavedSearchesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  entity_type: z.string().optional(),
  filters: z.record(z.unknown()).optional(),
  user_id: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type SavedSearchesInsert = z.infer<typeof SavedSearchesInsertSchema>;

export const SavedSearchesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  entity_type: z.string().optional(),
  filters: z.record(z.unknown()).optional(),
  user_id: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type SavedSearchesUpdate = z.infer<typeof SavedSearchesUpdateSchema>;

// activities
export const ActivitiesSchema = z.object({
  id: z.string().uuid(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  action_type: z.string(),
  action_category: z.string().nullable(),
  description: z.string().nullable(),
  actor_id: z.string().uuid().nullable(),
  actor_type: z.string().nullable(),
  actor_name: z.string().nullable(),
  previous_value: z.record(z.unknown()).nullable(),
  new_value: z.record(z.unknown()).nullable(),
  changes: z.record(z.unknown()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  organization_id: z.string().uuid(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  source: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type Activities = z.infer<typeof ActivitiesSchema>;

export const ActivitiesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  action_type: z.string(),
  action_category: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  actor_id: z.string().uuid().nullable().optional(),
  actor_type: z.string().nullable().optional(),
  actor_name: z.string().nullable().optional(),
  previous_value: z.record(z.unknown()).nullable().optional(),
  new_value: z.record(z.unknown()).nullable().optional(),
  changes: z.record(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  organization_id: z.string().uuid(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ActivitiesInsert = z.infer<typeof ActivitiesInsertSchema>;

export const ActivitiesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  entity_type: z.string().optional(),
  entity_id: z.string().uuid().optional(),
  action_type: z.string().optional(),
  action_category: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  actor_id: z.string().uuid().nullable().optional(),
  actor_type: z.string().nullable().optional(),
  actor_name: z.string().nullable().optional(),
  previous_value: z.record(z.unknown()).nullable().optional(),
  new_value: z.record(z.unknown()).nullable().optional(),
  changes: z.record(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  organization_id: z.string().uuid().optional(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ActivitiesUpdate = z.infer<typeof ActivitiesUpdateSchema>;

// registry_actions
export const RegistryActionsSchema = z.object({
  action_key: z.string(),
  definition: z.record(z.unknown()),
  created_at: z.string().datetime().nullable(),
});
export type RegistryActions = z.infer<typeof RegistryActionsSchema>;

export const RegistryActionsInsertSchema = z.object({
  action_key: z.string(),
  definition: z.record(z.unknown()),
  created_at: z.string().datetime().nullable().optional(),
});
export type RegistryActionsInsert = z.infer<typeof RegistryActionsInsertSchema>;

export const RegistryActionsUpdateSchema = z.object({
  action_key: z.string().optional(),
  definition: z.record(z.unknown()).optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type RegistryActionsUpdate = z.infer<typeof RegistryActionsUpdateSchema>;

// integration_connections
export const IntegrationConnectionsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  provider: z.string(),
  category: z.string(),
  external_id: z.string().nullable(),
  status: z.string(),
  credentials_ref: z.string().nullable(),
  last_sync_at: z.string().datetime().nullable(),
  last_sync_status: z.string().nullable(),
  last_error: z.string().nullable(),
  settings: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type IntegrationConnections = z.infer<typeof IntegrationConnectionsSchema>;

export const IntegrationConnectionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  provider: z.string(),
  category: z.string(),
  external_id: z.string().nullable().optional(),
  status: z.string().optional(),
  credentials_ref: z.string().nullable().optional(),
  last_sync_at: z.string().datetime().nullable().optional(),
  last_sync_status: z.string().nullable().optional(),
  last_error: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type IntegrationConnectionsInsert = z.infer<typeof IntegrationConnectionsInsertSchema>;

export const IntegrationConnectionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  category: z.string().optional(),
  external_id: z.string().nullable().optional(),
  status: z.string().optional(),
  credentials_ref: z.string().nullable().optional(),
  last_sync_at: z.string().datetime().nullable().optional(),
  last_sync_status: z.string().nullable().optional(),
  last_error: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type IntegrationConnectionsUpdate = z.infer<typeof IntegrationConnectionsUpdateSchema>;

// job_board_mappings
export const JobBoardMappingsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  job_id: z.string().uuid(),
  provider: z.string(),
  external_job_id: z.string(),
  external_url: z.string().nullable(),
  status: z.string(),
  posted_at: z.string().datetime().nullable(),
  expires_at: z.string().datetime().nullable(),
  last_sync_at: z.string().datetime().nullable(),
  views_count: z.number().int().nullable(),
  applications_count: z.number().int().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type JobBoardMappings = z.infer<typeof JobBoardMappingsSchema>;

export const JobBoardMappingsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  job_id: z.string().uuid(),
  provider: z.string(),
  external_job_id: z.string(),
  external_url: z.string().nullable().optional(),
  status: z.string().optional(),
  posted_at: z.string().datetime().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  last_sync_at: z.string().datetime().nullable().optional(),
  views_count: z.number().int().nullable().optional(),
  applications_count: z.number().int().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type JobBoardMappingsInsert = z.infer<typeof JobBoardMappingsInsertSchema>;

export const JobBoardMappingsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  external_job_id: z.string().optional(),
  external_url: z.string().nullable().optional(),
  status: z.string().optional(),
  posted_at: z.string().datetime().nullable().optional(),
  expires_at: z.string().datetime().nullable().optional(),
  last_sync_at: z.string().datetime().nullable().optional(),
  views_count: z.number().int().nullable().optional(),
  applications_count: z.number().int().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type JobBoardMappingsUpdate = z.infer<typeof JobBoardMappingsUpdateSchema>;

// webhook_logs
export const WebhookLogsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  provider: z.string(),
  event_type: z.string(),
  external_id: z.string().nullable(),
  payload: z.record(z.unknown()),
  headers: z.record(z.unknown()).nullable(),
  status: z.string(),
  processed_at: z.string().datetime().nullable(),
  error_message: z.string().nullable(),
  retry_count: z.number().int().nullable(),
  received_at: z.string().datetime(),
  created_at: z.string().datetime(),
});
export type WebhookLogs = z.infer<typeof WebhookLogsSchema>;

export const WebhookLogsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  provider: z.string(),
  event_type: z.string(),
  external_id: z.string().nullable().optional(),
  payload: z.record(z.unknown()),
  headers: z.record(z.unknown()).nullable().optional(),
  status: z.string().optional(),
  processed_at: z.string().datetime().nullable().optional(),
  error_message: z.string().nullable().optional(),
  retry_count: z.number().int().nullable().optional(),
  received_at: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
});
export type WebhookLogsInsert = z.infer<typeof WebhookLogsInsertSchema>;

export const WebhookLogsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  provider: z.string().optional(),
  event_type: z.string().optional(),
  external_id: z.string().nullable().optional(),
  payload: z.record(z.unknown()).optional(),
  headers: z.record(z.unknown()).nullable().optional(),
  status: z.string().optional(),
  processed_at: z.string().datetime().nullable().optional(),
  error_message: z.string().nullable().optional(),
  retry_count: z.number().int().nullable().optional(),
  received_at: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
});
export type WebhookLogsUpdate = z.infer<typeof WebhookLogsUpdateSchema>;

// messages
export const MessagesSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  enrollment_id: z.string().uuid().nullable(),
  channel: z.string(),
  direction: z.string(),
  subject: z.string().nullable(),
  body: z.string(),
  status: z.string(),
  provider: z.string().nullable(),
  provider_message_id: z.string().nullable(),
  sent_at: z.string().datetime().nullable(),
  delivered_at: z.string().datetime().nullable(),
  failed_at: z.string().datetime().nullable(),
  error_message: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type Messages = z.infer<typeof MessagesSchema>;

export const MessagesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  enrollment_id: z.string().uuid().nullable().optional(),
  channel: z.string(),
  direction: z.string().optional(),
  subject: z.string().nullable().optional(),
  body: z.string(),
  status: z.string().optional(),
  provider: z.string().nullable().optional(),
  provider_message_id: z.string().nullable().optional(),
  sent_at: z.string().datetime().nullable().optional(),
  delivered_at: z.string().datetime().nullable().optional(),
  failed_at: z.string().datetime().nullable().optional(),
  error_message: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type MessagesInsert = z.infer<typeof MessagesInsertSchema>;

export const MessagesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  enrollment_id: z.string().uuid().nullable().optional(),
  channel: z.string().optional(),
  direction: z.string().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().optional(),
  status: z.string().optional(),
  provider: z.string().nullable().optional(),
  provider_message_id: z.string().nullable().optional(),
  sent_at: z.string().datetime().nullable().optional(),
  delivered_at: z.string().datetime().nullable().optional(),
  failed_at: z.string().datetime().nullable().optional(),
  error_message: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type MessagesUpdate = z.infer<typeof MessagesUpdateSchema>;

// webhook_subscriptions
export const WebhookSubscriptionsSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  url: z.string(),
  secret: z.string(),
  events: z.array(z.unknown()),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type WebhookSubscriptions = z.infer<typeof WebhookSubscriptionsSchema>;

export const WebhookSubscriptionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid(),
  url: z.string(),
  secret: z.string(),
  events: z.array(z.unknown()),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type WebhookSubscriptionsInsert = z.infer<typeof WebhookSubscriptionsInsertSchema>;

export const WebhookSubscriptionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid().optional(),
  url: z.string().optional(),
  secret: z.string().optional(),
  events: z.array(z.unknown()).optional(),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type WebhookSubscriptionsUpdate = z.infer<typeof WebhookSubscriptionsUpdateSchema>;

// workspaces
export const WorkspacesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  settings: z.record(z.unknown()).nullable(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type Workspaces = z.infer<typeof WorkspacesSchema>;

export const WorkspacesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type WorkspacesInsert = z.infer<typeof WorkspacesInsertSchema>;

export const WorkspacesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type WorkspacesUpdate = z.infer<typeof WorkspacesUpdateSchema>;

// import_runs
export const ImportRunsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  file_name: z.string(),
  file_size_bytes: z.number().int().nullable(),
  storage_path: z.string().nullable(),
  job_id: z.string().uuid().nullable(),
  status: z.string(),
  total_rows: z.number().int().nullable(),
  rows_processed: z.number().int().nullable(),
  candidates_created: z.number().int().nullable(),
  candidates_updated: z.number().int().nullable(),
  candidates_skipped: z.number().int().nullable(),
  conflicts_detected: z.number().int().nullable(),
  errors_count: z.number().int().nullable(),
  error_log: z.record(z.unknown()).nullable(),
  uploaded_by: z.string().uuid(),
  started_at: z.string().datetime(),
  completed_at: z.string().datetime().nullable(),
});
export type ImportRuns = z.infer<typeof ImportRunsSchema>;

export const ImportRunsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  file_name: z.string(),
  file_size_bytes: z.number().int().nullable().optional(),
  storage_path: z.string().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  total_rows: z.number().int().nullable().optional(),
  rows_processed: z.number().int().nullable().optional(),
  candidates_created: z.number().int().nullable().optional(),
  candidates_updated: z.number().int().nullable().optional(),
  candidates_skipped: z.number().int().nullable().optional(),
  conflicts_detected: z.number().int().nullable().optional(),
  errors_count: z.number().int().nullable().optional(),
  error_log: z.record(z.unknown()).nullable().optional(),
  uploaded_by: z.string().uuid(),
  started_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().nullable().optional(),
});
export type ImportRunsInsert = z.infer<typeof ImportRunsInsertSchema>;

export const ImportRunsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  file_name: z.string().optional(),
  file_size_bytes: z.number().int().nullable().optional(),
  storage_path: z.string().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  total_rows: z.number().int().nullable().optional(),
  rows_processed: z.number().int().nullable().optional(),
  candidates_created: z.number().int().nullable().optional(),
  candidates_updated: z.number().int().nullable().optional(),
  candidates_skipped: z.number().int().nullable().optional(),
  conflicts_detected: z.number().int().nullable().optional(),
  errors_count: z.number().int().nullable().optional(),
  error_log: z.record(z.unknown()).nullable().optional(),
  uploaded_by: z.string().uuid().optional(),
  started_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().nullable().optional(),
});
export type ImportRunsUpdate = z.infer<typeof ImportRunsUpdateSchema>;

// import_conflicts
export const ImportConflictsSchema = z.object({
  id: z.string().uuid(),
  import_run_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  conflict_type: z.string(),
  confidence_score: z.number().nullable(),
  existing_candidate_id: z.string().uuid(),
  incoming_data: z.record(z.unknown()),
  resolution: z.string().nullable(),
  resolved_by: z.string().uuid().nullable(),
  resolved_at: z.string().datetime().nullable(),
  detected_at: z.string().datetime(),
});
export type ImportConflicts = z.infer<typeof ImportConflictsSchema>;

export const ImportConflictsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  import_run_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  conflict_type: z.string(),
  confidence_score: z.number().nullable().optional(),
  existing_candidate_id: z.string().uuid(),
  incoming_data: z.record(z.unknown()),
  resolution: z.string().nullable().optional(),
  resolved_by: z.string().uuid().nullable().optional(),
  resolved_at: z.string().datetime().nullable().optional(),
  detected_at: z.string().datetime().optional(),
});
export type ImportConflictsInsert = z.infer<typeof ImportConflictsInsertSchema>;

export const ImportConflictsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  import_run_id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  conflict_type: z.string().optional(),
  confidence_score: z.number().nullable().optional(),
  existing_candidate_id: z.string().uuid().optional(),
  incoming_data: z.record(z.unknown()).optional(),
  resolution: z.string().nullable().optional(),
  resolved_by: z.string().uuid().nullable().optional(),
  resolved_at: z.string().datetime().nullable().optional(),
  detected_at: z.string().datetime().optional(),
});
export type ImportConflictsUpdate = z.infer<typeof ImportConflictsUpdateSchema>;

// clients
export const ClientsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  industry: z.string().nullable(),
  website: z.string().nullable(),
  tier: z.string().nullable(),
  status: z.string().nullable(),
  contact_name: z.string().nullable(),
  contact_email: z.string().nullable(),
  contact_phone: z.string().nullable(),
  billing_info: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Clients = z.infer<typeof ClientsSchema>;

export const ClientsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  industry: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  tier: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  contact_name: z.string().nullable().optional(),
  contact_email: z.string().nullable().optional(),
  contact_phone: z.string().nullable().optional(),
  billing_info: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientsInsert = z.infer<typeof ClientsInsertSchema>;

export const ClientsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  industry: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  tier: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  contact_name: z.string().nullable().optional(),
  contact_email: z.string().nullable().optional(),
  contact_phone: z.string().nullable().optional(),
  billing_info: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientsUpdate = z.infer<typeof ClientsUpdateSchema>;

// jobs
export const JobsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  client_id: z.string().uuid().nullable(),
  title: z.string(),
  department: z.string().nullable(),
  location: z.string().nullable(),
  employment_type: z.string().nullable(),
  experience_level: z.string().nullable(),
  salary_min: z.number().int().nullable(),
  salary_max: z.number().int().nullable(),
  salary_currency: z.string().nullable(),
  description: z.string().nullable(),
  requirements: z.string().nullable(),
  benefits: z.string().nullable(),
  status: z.string().nullable(),
  priority: z.string().nullable(),
  openings: z.number().int().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  ats_job_id: z.string().nullable(),
  external_id: z.number().nullable(),
  hiring_project_id: z.number().nullable(),
  hiring_project_title: z.string().nullable(),
  url: z.string().nullable(),
  source: z.string().nullable(),
  currency: z.string().nullable(),
  ai: z.record(z.unknown()),
  job_search_text: z.string().nullable(),
  search_text: z.string().nullable(),
});
export type Jobs = z.infer<typeof JobsSchema>;

export const JobsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  client_id: z.string().uuid().nullable().optional(),
  title: z.string(),
  department: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  employment_type: z.string().nullable().optional(),
  experience_level: z.string().nullable().optional(),
  salary_min: z.number().int().nullable().optional(),
  salary_max: z.number().int().nullable().optional(),
  salary_currency: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  openings: z.number().int().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  ats_job_id: z.string().nullable().optional(),
  external_id: z.number().nullable().optional(),
  hiring_project_id: z.number().nullable().optional(),
  hiring_project_title: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  ai: z.record(z.unknown()).optional(),
  job_search_text: z.string().nullable().optional(),
  search_text: z.string().nullable().optional(),
});
export type JobsInsert = z.infer<typeof JobsInsertSchema>;

export const JobsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  client_id: z.string().uuid().nullable().optional(),
  title: z.string().optional(),
  department: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  employment_type: z.string().nullable().optional(),
  experience_level: z.string().nullable().optional(),
  salary_min: z.number().int().nullable().optional(),
  salary_max: z.number().int().nullable().optional(),
  salary_currency: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  requirements: z.string().nullable().optional(),
  benefits: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  openings: z.number().int().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  ats_job_id: z.string().nullable().optional(),
  external_id: z.number().nullable().optional(),
  hiring_project_id: z.number().nullable().optional(),
  hiring_project_title: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  ai: z.record(z.unknown()).optional(),
  job_search_text: z.string().nullable().optional(),
  search_text: z.string().nullable().optional(),
});
export type JobsUpdate = z.infer<typeof JobsUpdateSchema>;

// consultants
export const ConsultantsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  status: z.string().nullable(),
  performance_rating: z.number().nullable(),
  availability_date: z.string().nullable(),
  preferred_locations: z.array(z.unknown()).nullable(),
  preferred_roles: z.array(z.unknown()).nullable(),
  preferred_rate_min: z.number().int().nullable(),
  preferred_rate_max: z.number().int().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Consultants = z.infer<typeof ConsultantsSchema>;

export const ConsultantsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  status: z.string().nullable().optional(),
  performance_rating: z.number().nullable().optional(),
  availability_date: z.string().nullable().optional(),
  preferred_locations: z.array(z.unknown()).nullable().optional(),
  preferred_roles: z.array(z.unknown()).nullable().optional(),
  preferred_rate_min: z.number().int().nullable().optional(),
  preferred_rate_max: z.number().int().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ConsultantsInsert = z.infer<typeof ConsultantsInsertSchema>;

export const ConsultantsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  status: z.string().nullable().optional(),
  performance_rating: z.number().nullable().optional(),
  availability_date: z.string().nullable().optional(),
  preferred_locations: z.array(z.unknown()).nullable().optional(),
  preferred_roles: z.array(z.unknown()).nullable().optional(),
  preferred_rate_min: z.number().int().nullable().optional(),
  preferred_rate_max: z.number().int().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ConsultantsUpdate = z.infer<typeof ConsultantsUpdateSchema>;

// notes
export const NotesSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  application_id: z.string().uuid().nullable(),
  title: z.string().nullable(),
  content: z.string(),
  template_id: z.string().uuid().nullable(),
  note_type: z.string().nullable(),
  is_internal: z.boolean().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type Notes = z.infer<typeof NotesSchema>;

export const NotesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  application_id: z.string().uuid().nullable().optional(),
  title: z.string().nullable().optional(),
  content: z.string(),
  template_id: z.string().uuid().nullable().optional(),
  note_type: z.string().nullable().optional(),
  is_internal: z.boolean().nullable().optional(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type NotesInsert = z.infer<typeof NotesInsertSchema>;

export const NotesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  application_id: z.string().uuid().nullable().optional(),
  title: z.string().nullable().optional(),
  content: z.string().optional(),
  template_id: z.string().uuid().nullable().optional(),
  note_type: z.string().nullable().optional(),
  is_internal: z.boolean().nullable().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type NotesUpdate = z.infer<typeof NotesUpdateSchema>;

// compliance
export const ComplianceSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  entity_type: z.string().nullable(),
  entity_id: z.string().uuid().nullable(),
  compliance_type: z.string(),
  requirement: z.string().nullable(),
  status: z.string().nullable(),
  due_date: z.string().nullable(),
  completed_date: z.string().nullable(),
  verified_by: z.string().uuid().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type Compliance = z.infer<typeof ComplianceSchema>;

export const ComplianceInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  compliance_type: z.string(),
  requirement: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  completed_date: z.string().nullable().optional(),
  verified_by: z.string().uuid().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type ComplianceInsert = z.infer<typeof ComplianceInsertSchema>;

export const ComplianceUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  compliance_type: z.string().optional(),
  requirement: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  completed_date: z.string().nullable().optional(),
  verified_by: z.string().uuid().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type ComplianceUpdate = z.infer<typeof ComplianceUpdateSchema>;

// notifications
export const NotificationsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
  channel: z.string(),
  topic: z.string(),
  subject: z.string().nullable(),
  body: z.string(),
  status: z.string(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  sent_at: z.string().datetime().nullable(),
});
export type Notifications = z.infer<typeof NotificationsSchema>;

export const NotificationsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
  channel: z.string(),
  topic: z.string(),
  subject: z.string().nullable().optional(),
  body: z.string(),
  status: z.string().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  sent_at: z.string().datetime().nullable().optional(),
});
export type NotificationsInsert = z.infer<typeof NotificationsInsertSchema>;

export const NotificationsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  channel: z.string().optional(),
  topic: z.string().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().optional(),
  status: z.string().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  sent_at: z.string().datetime().nullable().optional(),
});
export type NotificationsUpdate = z.infer<typeof NotificationsUpdateSchema>;

// assignment_extensions
export const AssignmentExtensionsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  prev_end_date: z.string().nullable(),
  new_end_date: z.string(),
  reason: z.string().nullable(),
  metadata: z.record(z.unknown()),
  extended_by: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type AssignmentExtensions = z.infer<typeof AssignmentExtensionsSchema>;

export const AssignmentExtensionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  prev_end_date: z.string().nullable().optional(),
  new_end_date: z.string(),
  reason: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
  extended_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type AssignmentExtensionsInsert = z.infer<typeof AssignmentExtensionsInsertSchema>;

export const AssignmentExtensionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  assignment_id: z.string().uuid().optional(),
  prev_end_date: z.string().nullable().optional(),
  new_end_date: z.string().optional(),
  reason: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).optional(),
  extended_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type AssignmentExtensionsUpdate = z.infer<typeof AssignmentExtensionsUpdateSchema>;

// import_jobs
export const ImportJobsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  filename: z.string(),
  file_size: z.number().int().nullable(),
  source: z.string().nullable(),
  status: z.string().nullable(),
  total_rows: z.number().int().nullable(),
  processed_rows: z.number().int().nullable(),
  created_count: z.number().int().nullable(),
  updated_count: z.number().int().nullable(),
  skipped_count: z.number().int().nullable(),
  error_count: z.number().int().nullable(),
  errors: z.record(z.unknown()).nullable(),
  warnings: z.record(z.unknown()).nullable(),
  summary: z.record(z.unknown()).nullable(),
  imported_by: z.string().uuid(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
});
export type ImportJobs = z.infer<typeof ImportJobsSchema>;

export const ImportJobsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  filename: z.string(),
  file_size: z.number().int().nullable().optional(),
  source: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  total_rows: z.number().int().nullable().optional(),
  processed_rows: z.number().int().nullable().optional(),
  created_count: z.number().int().nullable().optional(),
  updated_count: z.number().int().nullable().optional(),
  skipped_count: z.number().int().nullable().optional(),
  error_count: z.number().int().nullable().optional(),
  errors: z.record(z.unknown()).nullable().optional(),
  warnings: z.record(z.unknown()).nullable().optional(),
  summary: z.record(z.unknown()).nullable().optional(),
  imported_by: z.string().uuid(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type ImportJobsInsert = z.infer<typeof ImportJobsInsertSchema>;

export const ImportJobsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  filename: z.string().optional(),
  file_size: z.number().int().nullable().optional(),
  source: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  total_rows: z.number().int().nullable().optional(),
  processed_rows: z.number().int().nullable().optional(),
  created_count: z.number().int().nullable().optional(),
  updated_count: z.number().int().nullable().optional(),
  skipped_count: z.number().int().nullable().optional(),
  error_count: z.number().int().nullable().optional(),
  errors: z.record(z.unknown()).nullable().optional(),
  warnings: z.record(z.unknown()).nullable().optional(),
  summary: z.record(z.unknown()).nullable().optional(),
  imported_by: z.string().uuid().optional(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type ImportJobsUpdate = z.infer<typeof ImportJobsUpdateSchema>;

// workspace_members
export const WorkspaceMembersSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: z.string(),
  joined_at: z.string().datetime(),
});
export type WorkspaceMembers = z.infer<typeof WorkspaceMembersSchema>;

export const WorkspaceMembersInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: z.string().optional(),
  joined_at: z.string().datetime().optional(),
});
export type WorkspaceMembersInsert = z.infer<typeof WorkspaceMembersInsertSchema>;

export const WorkspaceMembersUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  role: z.string().optional(),
  joined_at: z.string().datetime().optional(),
});
export type WorkspaceMembersUpdate = z.infer<typeof WorkspaceMembersUpdateSchema>;

// ai_prompts
export const AiPromptsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  version: z.number().int(),
  purpose: z.string(),
  template: z.string(),
  model: z.string().nullable(),
  parameters: z.record(z.unknown()),
  output_schema: z.record(z.unknown()).nullable(),
  is_active: z.boolean(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type AiPrompts = z.infer<typeof AiPromptsSchema>;

export const AiPromptsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  version: z.number().int(),
  purpose: z.string(),
  template: z.string(),
  model: z.string().nullable().optional(),
  parameters: z.record(z.unknown()).optional(),
  output_schema: z.record(z.unknown()).nullable().optional(),
  is_active: z.boolean().optional(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type AiPromptsInsert = z.infer<typeof AiPromptsInsertSchema>;

export const AiPromptsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  name: z.string().optional(),
  version: z.number().int().optional(),
  purpose: z.string().optional(),
  template: z.string().optional(),
  model: z.string().nullable().optional(),
  parameters: z.record(z.unknown()).optional(),
  output_schema: z.record(z.unknown()).nullable().optional(),
  is_active: z.boolean().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type AiPromptsUpdate = z.infer<typeof AiPromptsUpdateSchema>;

// onboarding
export const OnboardingSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  placement_id: z.string().uuid().nullable(),
  checklist: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  start_date: z.string().nullable(),
  completion_date: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type Onboarding = z.infer<typeof OnboardingSchema>;

export const OnboardingInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable().optional(),
  placement_id: z.string().uuid().nullable().optional(),
  checklist: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  completion_date: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type OnboardingInsert = z.infer<typeof OnboardingInsertSchema>;

export const OnboardingUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  placement_id: z.string().uuid().nullable().optional(),
  checklist: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  completion_date: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type OnboardingUpdate = z.infer<typeof OnboardingUpdateSchema>;

// performance_reviews
export const PerformanceReviewsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  employee_id: z.string().uuid().nullable(),
  reviewer_id: z.string().uuid().nullable(),
  review_period_start: z.string().nullable(),
  review_period_end: z.string().nullable(),
  status: z.string().nullable(),
  ratings: z.record(z.unknown()).nullable(),
  comments: z.string().nullable(),
  goals: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
});
export type PerformanceReviews = z.infer<typeof PerformanceReviewsSchema>;

export const PerformanceReviewsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  employee_id: z.string().uuid().nullable().optional(),
  reviewer_id: z.string().uuid().nullable().optional(),
  review_period_start: z.string().nullable().optional(),
  review_period_end: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  ratings: z.record(z.unknown()).nullable().optional(),
  comments: z.string().nullable().optional(),
  goals: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
});
export type PerformanceReviewsInsert = z.infer<typeof PerformanceReviewsInsertSchema>;

export const PerformanceReviewsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  employee_id: z.string().uuid().nullable().optional(),
  reviewer_id: z.string().uuid().nullable().optional(),
  review_period_start: z.string().nullable().optional(),
  review_period_end: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  ratings: z.record(z.unknown()).nullable().optional(),
  comments: z.string().nullable().optional(),
  goals: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
});
export type PerformanceReviewsUpdate = z.infer<typeof PerformanceReviewsUpdateSchema>;

// submissions
export const SubmissionsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  submitted_by: z.string().uuid().nullable(),
  status: z.string().nullable(),
  cover_letter: z.string().nullable(),
  ai_match_score: z.number().int().nullable(),
  ai_analysis: z.record(z.unknown()).nullable(),
  submitted_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Submissions = z.infer<typeof SubmissionsSchema>;

export const SubmissionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  submitted_by: z.string().uuid().nullable().optional(),
  status: z.string().nullable().optional(),
  cover_letter: z.string().nullable().optional(),
  ai_match_score: z.number().int().nullable().optional(),
  ai_analysis: z.record(z.unknown()).nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type SubmissionsInsert = z.infer<typeof SubmissionsInsertSchema>;

export const SubmissionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  submitted_by: z.string().uuid().nullable().optional(),
  status: z.string().nullable().optional(),
  cover_letter: z.string().nullable().optional(),
  ai_match_score: z.number().int().nullable().optional(),
  ai_analysis: z.record(z.unknown()).nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type SubmissionsUpdate = z.infer<typeof SubmissionsUpdateSchema>;

// interviews
export const InterviewsSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  candidate_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  submission_id: z.string().uuid().nullable(),
  interview_type: z.string().nullable(),
  interview_stage: z.string().nullable(),
  interview_round: z.number().int().nullable(),
  scheduled_date: z.string().nullable(),
  scheduled_time: z.string().nullable(),
  scheduled_start_at: z.string().datetime().nullable(),
  scheduled_end_at: z.string().datetime().nullable(),
  duration_minutes: z.number().int().nullable(),
  timezone: z.string().nullable(),
  meeting_platform: z.string().nullable(),
  meeting_link: z.string().nullable(),
  meeting_id: z.string().nullable(),
  meeting_password: z.string().nullable(),
  location: z.string().nullable(),
  interviewers: z.record(z.unknown()).nullable(),
  interviewer_names: z.array(z.unknown()).nullable(),
  candidate_confirmed: z.boolean().nullable(),
  interviewers_confirmed: z.boolean().nullable(),
  status: z.string().nullable(),
  overall_rating: z.number().int().nullable(),
  technical_score: z.number().int().nullable(),
  cultural_fit_score: z.number().int().nullable(),
  communication_score: z.number().int().nullable(),
  strengths: z.string().nullable(),
  weaknesses: z.string().nullable(),
  feedback_notes: z.string().nullable(),
  interviewer_notes: z.string().nullable(),
  internal_notes: z.string().nullable(),
  recommendation: z.string().nullable(),
  recommendation_notes: z.string().nullable(),
  next_steps: z.string().nullable(),
  follow_up_required: z.boolean().nullable(),
  follow_up_date: z.string().nullable(),
  recording_url: z.string().nullable(),
  transcript_url: z.string().nullable(),
  attachments: z.record(z.unknown()).nullable(),
  cancelled_at: z.string().datetime().nullable(),
  cancelled_by: z.string().uuid().nullable(),
  cancellation_reason: z.string().nullable(),
  completed_at: z.string().datetime().nullable(),
  custom_fields: z.record(z.unknown()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  scheduled_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type Interviews = z.infer<typeof InterviewsSchema>;

export const InterviewsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  submission_id: z.string().uuid().nullable().optional(),
  interview_type: z.string().nullable().optional(),
  interview_stage: z.string().nullable().optional(),
  interview_round: z.number().int().nullable().optional(),
  scheduled_date: z.string().nullable().optional(),
  scheduled_time: z.string().nullable().optional(),
  scheduled_start_at: z.string().datetime().nullable().optional(),
  scheduled_end_at: z.string().datetime().nullable().optional(),
  duration_minutes: z.number().int().nullable().optional(),
  timezone: z.string().nullable().optional(),
  meeting_platform: z.string().nullable().optional(),
  meeting_link: z.string().nullable().optional(),
  meeting_id: z.string().nullable().optional(),
  meeting_password: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  interviewers: z.record(z.unknown()).nullable().optional(),
  interviewer_names: z.array(z.unknown()).nullable().optional(),
  candidate_confirmed: z.boolean().nullable().optional(),
  interviewers_confirmed: z.boolean().nullable().optional(),
  status: z.string().nullable().optional(),
  overall_rating: z.number().int().nullable().optional(),
  technical_score: z.number().int().nullable().optional(),
  cultural_fit_score: z.number().int().nullable().optional(),
  communication_score: z.number().int().nullable().optional(),
  strengths: z.string().nullable().optional(),
  weaknesses: z.string().nullable().optional(),
  feedback_notes: z.string().nullable().optional(),
  interviewer_notes: z.string().nullable().optional(),
  internal_notes: z.string().nullable().optional(),
  recommendation: z.string().nullable().optional(),
  recommendation_notes: z.string().nullable().optional(),
  next_steps: z.string().nullable().optional(),
  follow_up_required: z.boolean().nullable().optional(),
  follow_up_date: z.string().nullable().optional(),
  recording_url: z.string().nullable().optional(),
  transcript_url: z.string().nullable().optional(),
  attachments: z.record(z.unknown()).nullable().optional(),
  cancelled_at: z.string().datetime().nullable().optional(),
  cancelled_by: z.string().uuid().nullable().optional(),
  cancellation_reason: z.string().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  custom_fields: z.record(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  scheduled_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type InterviewsInsert = z.infer<typeof InterviewsInsertSchema>;

export const InterviewsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  submission_id: z.string().uuid().nullable().optional(),
  interview_type: z.string().nullable().optional(),
  interview_stage: z.string().nullable().optional(),
  interview_round: z.number().int().nullable().optional(),
  scheduled_date: z.string().nullable().optional(),
  scheduled_time: z.string().nullable().optional(),
  scheduled_start_at: z.string().datetime().nullable().optional(),
  scheduled_end_at: z.string().datetime().nullable().optional(),
  duration_minutes: z.number().int().nullable().optional(),
  timezone: z.string().nullable().optional(),
  meeting_platform: z.string().nullable().optional(),
  meeting_link: z.string().nullable().optional(),
  meeting_id: z.string().nullable().optional(),
  meeting_password: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  interviewers: z.record(z.unknown()).nullable().optional(),
  interviewer_names: z.array(z.unknown()).nullable().optional(),
  candidate_confirmed: z.boolean().nullable().optional(),
  interviewers_confirmed: z.boolean().nullable().optional(),
  status: z.string().nullable().optional(),
  overall_rating: z.number().int().nullable().optional(),
  technical_score: z.number().int().nullable().optional(),
  cultural_fit_score: z.number().int().nullable().optional(),
  communication_score: z.number().int().nullable().optional(),
  strengths: z.string().nullable().optional(),
  weaknesses: z.string().nullable().optional(),
  feedback_notes: z.string().nullable().optional(),
  interviewer_notes: z.string().nullable().optional(),
  internal_notes: z.string().nullable().optional(),
  recommendation: z.string().nullable().optional(),
  recommendation_notes: z.string().nullable().optional(),
  next_steps: z.string().nullable().optional(),
  follow_up_required: z.boolean().nullable().optional(),
  follow_up_date: z.string().nullable().optional(),
  recording_url: z.string().nullable().optional(),
  transcript_url: z.string().nullable().optional(),
  attachments: z.record(z.unknown()).nullable().optional(),
  cancelled_at: z.string().datetime().nullable().optional(),
  cancelled_by: z.string().uuid().nullable().optional(),
  cancellation_reason: z.string().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  custom_fields: z.record(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  scheduled_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type InterviewsUpdate = z.infer<typeof InterviewsUpdateSchema>;

// campaign_enrollments
export const CampaignEnrollmentsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  sequence_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  status: z.string(),
  current_step: z.number().int(),
  enrolled_at: z.string().datetime(),
  stopped_at: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).nullable(),
});
export type CampaignEnrollments = z.infer<typeof CampaignEnrollmentsSchema>;

export const CampaignEnrollmentsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  sequence_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  status: z.string().optional(),
  current_step: z.number().int().optional(),
  enrolled_at: z.string().datetime().optional(),
  stopped_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
});
export type CampaignEnrollmentsInsert = z.infer<typeof CampaignEnrollmentsInsertSchema>;

export const CampaignEnrollmentsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  sequence_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  status: z.string().optional(),
  current_step: z.number().int().optional(),
  enrolled_at: z.string().datetime().optional(),
  stopped_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
});
export type CampaignEnrollmentsUpdate = z.infer<typeof CampaignEnrollmentsUpdateSchema>;

// workflow_instances
export const WorkflowInstancesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  workflow_id: z.string().uuid().nullable(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  current_stage: z.string().nullable(),
  status: z.string().nullable(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type WorkflowInstances = z.infer<typeof WorkflowInstancesSchema>;

export const WorkflowInstancesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  workflow_id: z.string().uuid().nullable().optional(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  current_stage: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type WorkflowInstancesInsert = z.infer<typeof WorkflowInstancesInsertSchema>;

export const WorkflowInstancesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  workflow_id: z.string().uuid().nullable().optional(),
  entity_type: z.string().optional(),
  entity_id: z.string().uuid().optional(),
  current_stage: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type WorkflowInstancesUpdate = z.infer<typeof WorkflowInstancesUpdateSchema>;

// business_rules
export const BusinessRulesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  rule_name: z.string(),
  rule_type: z.string(),
  conditions: z.record(z.unknown()),
  actions: z.record(z.unknown()),
  priority: z.number().int().nullable(),
  is_active: z.boolean().nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type BusinessRules = z.infer<typeof BusinessRulesSchema>;

export const BusinessRulesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  rule_name: z.string(),
  rule_type: z.string(),
  conditions: z.record(z.unknown()),
  actions: z.record(z.unknown()),
  priority: z.number().int().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type BusinessRulesInsert = z.infer<typeof BusinessRulesInsertSchema>;

export const BusinessRulesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  rule_name: z.string().optional(),
  rule_type: z.string().optional(),
  conditions: z.record(z.unknown()).optional(),
  actions: z.record(z.unknown()).optional(),
  priority: z.number().int().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type BusinessRulesUpdate = z.infer<typeof BusinessRulesUpdateSchema>;

// recruiting_metrics
export const RecruitingMetricsSchema = z.object({
  id: z.string().uuid(),
  metric_date: z.string().nullable(),
  metric_type: z.string().nullable(),
  dimension: z.string().nullable(),
  dimension_value: z.string().nullable(),
  applications: z.number().int().nullable(),
  screens: z.number().int().nullable(),
  submittals: z.number().int().nullable(),
  interviews: z.number().int().nullable(),
  offers: z.number().int().nullable(),
  placements: z.number().int().nullable(),
  screen_rate: z.number().nullable(),
  submittal_rate: z.number().nullable(),
  interview_rate: z.number().nullable(),
  offer_rate: z.number().nullable(),
  placement_rate: z.number().nullable(),
  avg_time_to_screen: z.number().nullable(),
  avg_time_to_submittal: z.number().nullable(),
  avg_time_to_interview: z.number().nullable(),
  avg_time_to_offer: z.number().nullable(),
  avg_time_to_placement: z.number().nullable(),
  created_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type RecruitingMetrics = z.infer<typeof RecruitingMetricsSchema>;

export const RecruitingMetricsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  metric_date: z.string().nullable().optional(),
  metric_type: z.string().nullable().optional(),
  dimension: z.string().nullable().optional(),
  dimension_value: z.string().nullable().optional(),
  applications: z.number().int().nullable().optional(),
  screens: z.number().int().nullable().optional(),
  submittals: z.number().int().nullable().optional(),
  interviews: z.number().int().nullable().optional(),
  offers: z.number().int().nullable().optional(),
  placements: z.number().int().nullable().optional(),
  screen_rate: z.number().nullable().optional(),
  submittal_rate: z.number().nullable().optional(),
  interview_rate: z.number().nullable().optional(),
  offer_rate: z.number().nullable().optional(),
  placement_rate: z.number().nullable().optional(),
  avg_time_to_screen: z.number().nullable().optional(),
  avg_time_to_submittal: z.number().nullable().optional(),
  avg_time_to_interview: z.number().nullable().optional(),
  avg_time_to_offer: z.number().nullable().optional(),
  avg_time_to_placement: z.number().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type RecruitingMetricsInsert = z.infer<typeof RecruitingMetricsInsertSchema>;

export const RecruitingMetricsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  metric_date: z.string().nullable().optional(),
  metric_type: z.string().nullable().optional(),
  dimension: z.string().nullable().optional(),
  dimension_value: z.string().nullable().optional(),
  applications: z.number().int().nullable().optional(),
  screens: z.number().int().nullable().optional(),
  submittals: z.number().int().nullable().optional(),
  interviews: z.number().int().nullable().optional(),
  offers: z.number().int().nullable().optional(),
  placements: z.number().int().nullable().optional(),
  screen_rate: z.number().nullable().optional(),
  submittal_rate: z.number().nullable().optional(),
  interview_rate: z.number().nullable().optional(),
  offer_rate: z.number().nullable().optional(),
  placement_rate: z.number().nullable().optional(),
  avg_time_to_screen: z.number().nullable().optional(),
  avg_time_to_submittal: z.number().nullable().optional(),
  avg_time_to_interview: z.number().nullable().optional(),
  avg_time_to_offer: z.number().nullable().optional(),
  avg_time_to_placement: z.number().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type RecruitingMetricsUpdate = z.infer<typeof RecruitingMetricsUpdateSchema>;

// skills_taxonomy
export const SkillsTaxonomySchema = z.object({
  id: z.string().uuid(),
  skill_name: z.string(),
  skill_category: z.string().nullable(),
  skill_subcategory: z.string().nullable(),
  linkedin_skill_id: z.string().nullable(),
  synonyms: z.array(z.unknown()).nullable(),
  related_skills: z.array(z.unknown()).nullable(),
  proficiency_levels: z.array(z.unknown()).nullable(),
  demand_score: z.number().int().nullable(),
  growth_rate: z.number().nullable(),
  avg_years_to_master: z.number().nullable(),
  certifications: z.array(z.unknown()).nullable(),
  is_active: z.boolean().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type SkillsTaxonomy = z.infer<typeof SkillsTaxonomySchema>;

export const SkillsTaxonomyInsertSchema = z.object({
  id: z.string().uuid().optional(),
  skill_name: z.string(),
  skill_category: z.string().nullable().optional(),
  skill_subcategory: z.string().nullable().optional(),
  linkedin_skill_id: z.string().nullable().optional(),
  synonyms: z.array(z.unknown()).nullable().optional(),
  related_skills: z.array(z.unknown()).nullable().optional(),
  proficiency_levels: z.array(z.unknown()).nullable().optional(),
  demand_score: z.number().int().nullable().optional(),
  growth_rate: z.number().nullable().optional(),
  avg_years_to_master: z.number().nullable().optional(),
  certifications: z.array(z.unknown()).nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type SkillsTaxonomyInsert = z.infer<typeof SkillsTaxonomyInsertSchema>;

export const SkillsTaxonomyUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  skill_name: z.string().optional(),
  skill_category: z.string().nullable().optional(),
  skill_subcategory: z.string().nullable().optional(),
  linkedin_skill_id: z.string().nullable().optional(),
  synonyms: z.array(z.unknown()).nullable().optional(),
  related_skills: z.array(z.unknown()).nullable().optional(),
  proficiency_levels: z.array(z.unknown()).nullable().optional(),
  demand_score: z.number().int().nullable().optional(),
  growth_rate: z.number().nullable().optional(),
  avg_years_to_master: z.number().nullable().optional(),
  certifications: z.array(z.unknown()).nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type SkillsTaxonomyUpdate = z.infer<typeof SkillsTaxonomyUpdateSchema>;

// skill_profiles
export const SkillProfilesSchema = z.object({
  id: z.string().uuid(),
  profile_name: z.string(),
  role_title: z.string().nullable(),
  seniority_level: z.string().nullable(),
  industry: z.string().nullable(),
  required_skills: z.record(z.unknown()).nullable(),
  preferred_skills: z.record(z.unknown()).nullable(),
  years_experience_min: z.number().int().nullable(),
  years_experience_max: z.number().int().nullable(),
  compensation_benchmark: z.record(z.unknown()).nullable(),
  demand_index: z.number().int().nullable(),
  last_updated: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
});
export type SkillProfiles = z.infer<typeof SkillProfilesSchema>;

export const SkillProfilesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  profile_name: z.string(),
  role_title: z.string().nullable().optional(),
  seniority_level: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  required_skills: z.record(z.unknown()).nullable().optional(),
  preferred_skills: z.record(z.unknown()).nullable().optional(),
  years_experience_min: z.number().int().nullable().optional(),
  years_experience_max: z.number().int().nullable().optional(),
  compensation_benchmark: z.record(z.unknown()).nullable().optional(),
  demand_index: z.number().int().nullable().optional(),
  last_updated: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type SkillProfilesInsert = z.infer<typeof SkillProfilesInsertSchema>;

export const SkillProfilesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  profile_name: z.string().optional(),
  role_title: z.string().nullable().optional(),
  seniority_level: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  required_skills: z.record(z.unknown()).nullable().optional(),
  preferred_skills: z.record(z.unknown()).nullable().optional(),
  years_experience_min: z.number().int().nullable().optional(),
  years_experience_max: z.number().int().nullable().optional(),
  compensation_benchmark: z.record(z.unknown()).nullable().optional(),
  demand_index: z.number().int().nullable().optional(),
  last_updated: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type SkillProfilesUpdate = z.infer<typeof SkillProfilesUpdateSchema>;

// communications
export const CommunicationsSchema = z.object({
  id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  sender_id: z.string().uuid().nullable(),
  sender_type: z.string().nullable(),
  channel: z.string().nullable(),
  direction: z.string().nullable(),
  subject: z.string().nullable(),
  body: z.string().nullable(),
  template_id: z.string().nullable(),
  template_variables: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  sent_at: z.string().datetime().nullable(),
  delivered_at: z.string().datetime().nullable(),
  opened_at: z.string().datetime().nullable(),
  external_id: z.string().nullable(),
  tracking_data: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type Communications = z.infer<typeof CommunicationsSchema>;

export const CommunicationsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  sender_id: z.string().uuid().nullable().optional(),
  sender_type: z.string().nullable().optional(),
  channel: z.string().nullable().optional(),
  direction: z.string().nullable().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  template_id: z.string().nullable().optional(),
  template_variables: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  sent_at: z.string().datetime().nullable().optional(),
  delivered_at: z.string().datetime().nullable().optional(),
  opened_at: z.string().datetime().nullable().optional(),
  external_id: z.string().nullable().optional(),
  tracking_data: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type CommunicationsInsert = z.infer<typeof CommunicationsInsertSchema>;

export const CommunicationsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  sender_id: z.string().uuid().nullable().optional(),
  sender_type: z.string().nullable().optional(),
  channel: z.string().nullable().optional(),
  direction: z.string().nullable().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  template_id: z.string().nullable().optional(),
  template_variables: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  sent_at: z.string().datetime().nullable().optional(),
  delivered_at: z.string().datetime().nullable().optional(),
  opened_at: z.string().datetime().nullable().optional(),
  external_id: z.string().nullable().optional(),
  tracking_data: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type CommunicationsUpdate = z.infer<typeof CommunicationsUpdateSchema>;

// candidate_skills
export const CandidateSkillsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  skill_id: z.string().uuid().nullable(),
  skill_name: z.string(),
  proficiency_level: z.string().nullable(),
  years_experience: z.number().nullable(),
  last_used: z.string().nullable(),
  is_primary: z.boolean().nullable(),
  source: z.string().nullable(),
  confidence_score: z.number().nullable(),
  verified: z.boolean().nullable(),
  verified_by: z.string().uuid().nullable(),
  verified_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type CandidateSkills = z.infer<typeof CandidateSkillsSchema>;

export const CandidateSkillsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable().optional(),
  skill_id: z.string().uuid().nullable().optional(),
  skill_name: z.string(),
  proficiency_level: z.string().nullable().optional(),
  years_experience: z.number().nullable().optional(),
  last_used: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
  source: z.string().nullable().optional(),
  confidence_score: z.number().nullable().optional(),
  verified: z.boolean().nullable().optional(),
  verified_by: z.string().uuid().nullable().optional(),
  verified_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateSkillsInsert = z.infer<typeof CandidateSkillsInsertSchema>;

export const CandidateSkillsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  skill_id: z.string().uuid().nullable().optional(),
  skill_name: z.string().optional(),
  proficiency_level: z.string().nullable().optional(),
  years_experience: z.number().nullable().optional(),
  last_used: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
  source: z.string().nullable().optional(),
  confidence_score: z.number().nullable().optional(),
  verified: z.boolean().nullable().optional(),
  verified_by: z.string().uuid().nullable().optional(),
  verified_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateSkillsUpdate = z.infer<typeof CandidateSkillsUpdateSchema>;

// job_skills
export const JobSkillsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  job_id: z.string().uuid().nullable(),
  skill_id: z.string().uuid().nullable(),
  skill_name: z.string(),
  requirement_type: z.string(),
  proficiency_level: z.string().nullable(),
  years_experience: z.number().int().nullable(),
  weight: z.number().int().nullable(),
  created_at: z.string().datetime().nullable(),
});
export type JobSkills = z.infer<typeof JobSkillsSchema>;

export const JobSkillsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  job_id: z.string().uuid().nullable().optional(),
  skill_id: z.string().uuid().nullable().optional(),
  skill_name: z.string(),
  requirement_type: z.string(),
  proficiency_level: z.string().nullable().optional(),
  years_experience: z.number().int().nullable().optional(),
  weight: z.number().int().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type JobSkillsInsert = z.infer<typeof JobSkillsInsertSchema>;

export const JobSkillsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  job_id: z.string().uuid().nullable().optional(),
  skill_id: z.string().uuid().nullable().optional(),
  skill_name: z.string().optional(),
  requirement_type: z.string().optional(),
  proficiency_level: z.string().nullable().optional(),
  years_experience: z.number().int().nullable().optional(),
  weight: z.number().int().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type JobSkillsUpdate = z.infer<typeof JobSkillsUpdateSchema>;

// ai_agents
export const AiAgentsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  agent_name: z.string(),
  agent_type: z.string(),
  description: z.string().nullable(),
  provider: z.string().nullable(),
  model_id: z.string().nullable(),
  temperature: z.number().nullable(),
  max_tokens: z.number().int().nullable(),
  system_prompt: z.string().nullable(),
  configuration: z.record(z.unknown()).nullable(),
  is_active: z.boolean().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type AiAgents = z.infer<typeof AiAgentsSchema>;

export const AiAgentsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  agent_name: z.string(),
  agent_type: z.string(),
  description: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  model_id: z.string().nullable().optional(),
  temperature: z.number().nullable().optional(),
  max_tokens: z.number().int().nullable().optional(),
  system_prompt: z.string().nullable().optional(),
  configuration: z.record(z.unknown()).nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type AiAgentsInsert = z.infer<typeof AiAgentsInsertSchema>;

export const AiAgentsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  agent_name: z.string().optional(),
  agent_type: z.string().optional(),
  description: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  model_id: z.string().nullable().optional(),
  temperature: z.number().nullable().optional(),
  max_tokens: z.number().int().nullable().optional(),
  system_prompt: z.string().nullable().optional(),
  configuration: z.record(z.unknown()).nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type AiAgentsUpdate = z.infer<typeof AiAgentsUpdateSchema>;

// invoices
export const InvoicesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  invoice_number: z.string().nullable(),
  client_id: z.string().uuid().nullable(),
  placement_id: z.string().uuid().nullable(),
  amount: z.number().nullable(),
  line_items: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  due_date: z.string().nullable(),
  paid_date: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type Invoices = z.infer<typeof InvoicesSchema>;

export const InvoicesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  invoice_number: z.string().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  placement_id: z.string().uuid().nullable().optional(),
  amount: z.number().nullable().optional(),
  line_items: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  paid_date: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type InvoicesInsert = z.infer<typeof InvoicesInsertSchema>;

export const InvoicesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  invoice_number: z.string().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  placement_id: z.string().uuid().nullable().optional(),
  amount: z.number().nullable().optional(),
  line_items: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  due_date: z.string().nullable().optional(),
  paid_date: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type InvoicesUpdate = z.infer<typeof InvoicesUpdateSchema>;

// prompt_templates
export const PromptTemplatesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  template_name: z.string(),
  category: z.string().nullable(),
  agent_name: z.string().nullable(),
  prompt_text: z.string(),
  variables: z.record(z.unknown()).nullable(),
  example_output: z.string().nullable(),
  use_case: z.string().nullable(),
  version: z.number().int().nullable(),
  is_active: z.boolean().nullable(),
  usage_count: z.number().int().nullable(),
  avg_rating: z.number().nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type PromptTemplates = z.infer<typeof PromptTemplatesSchema>;

export const PromptTemplatesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  template_name: z.string(),
  category: z.string().nullable().optional(),
  agent_name: z.string().nullable().optional(),
  prompt_text: z.string(),
  variables: z.record(z.unknown()).nullable().optional(),
  example_output: z.string().nullable().optional(),
  use_case: z.string().nullable().optional(),
  version: z.number().int().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  usage_count: z.number().int().nullable().optional(),
  avg_rating: z.number().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type PromptTemplatesInsert = z.infer<typeof PromptTemplatesInsertSchema>;

export const PromptTemplatesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  template_name: z.string().optional(),
  category: z.string().nullable().optional(),
  agent_name: z.string().nullable().optional(),
  prompt_text: z.string().optional(),
  variables: z.record(z.unknown()).nullable().optional(),
  example_output: z.string().nullable().optional(),
  use_case: z.string().nullable().optional(),
  version: z.number().int().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  usage_count: z.number().int().nullable().optional(),
  avg_rating: z.number().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type PromptTemplatesUpdate = z.infer<typeof PromptTemplatesUpdateSchema>;

// ai_executions
export const AiExecutionsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  agent_id: z.string().uuid().nullable(),
  template_id: z.string().uuid().nullable(),
  entity_type: z.string().nullable(),
  entity_id: z.string().uuid().nullable(),
  input_data: z.record(z.unknown()).nullable(),
  output_data: z.record(z.unknown()).nullable(),
  model_used: z.string().nullable(),
  tokens_used: z.number().int().nullable(),
  cost_usd: z.number().nullable(),
  duration_ms: z.number().int().nullable(),
  status: z.string().nullable(),
  error_message: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
});
export type AiExecutions = z.infer<typeof AiExecutionsSchema>;

export const AiExecutionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  agent_id: z.string().uuid().nullable().optional(),
  template_id: z.string().uuid().nullable().optional(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  input_data: z.record(z.unknown()).nullable().optional(),
  output_data: z.record(z.unknown()).nullable().optional(),
  model_used: z.string().nullable().optional(),
  tokens_used: z.number().int().nullable().optional(),
  cost_usd: z.number().nullable().optional(),
  duration_ms: z.number().int().nullable().optional(),
  status: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type AiExecutionsInsert = z.infer<typeof AiExecutionsInsertSchema>;

export const AiExecutionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  agent_id: z.string().uuid().nullable().optional(),
  template_id: z.string().uuid().nullable().optional(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  input_data: z.record(z.unknown()).nullable().optional(),
  output_data: z.record(z.unknown()).nullable().optional(),
  model_used: z.string().nullable().optional(),
  tokens_used: z.number().int().nullable().optional(),
  cost_usd: z.number().nullable().optional(),
  duration_ms: z.number().int().nullable().optional(),
  status: z.string().nullable().optional(),
  error_message: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type AiExecutionsUpdate = z.infer<typeof AiExecutionsUpdateSchema>;

// expenses
export const ExpensesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  employee_id: z.string().uuid().nullable(),
  expense_type: z.string().nullable(),
  amount: z.number().nullable(),
  currency: z.string().nullable(),
  description: z.string().nullable(),
  receipt_path: z.string().nullable(),
  status: z.string().nullable(),
  submitted_at: z.string().datetime().nullable(),
  approved_at: z.string().datetime().nullable(),
  approved_by: z.string().uuid().nullable(),
  reimbursed_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Expenses = z.infer<typeof ExpensesSchema>;

export const ExpensesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  employee_id: z.string().uuid().nullable().optional(),
  expense_type: z.string().nullable().optional(),
  amount: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  receipt_path: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  approved_by: z.string().uuid().nullable().optional(),
  reimbursed_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ExpensesInsert = z.infer<typeof ExpensesInsertSchema>;

export const ExpensesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  employee_id: z.string().uuid().nullable().optional(),
  expense_type: z.string().nullable().optional(),
  amount: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  receipt_path: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  approved_by: z.string().uuid().nullable().optional(),
  reimbursed_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ExpensesUpdate = z.infer<typeof ExpensesUpdateSchema>;

// client_contracts
export const ClientContractsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  client_id: z.string().uuid().nullable(),
  contract_number: z.string().nullable(),
  contract_type: z.string().nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  auto_renew: z.boolean().nullable(),
  payment_terms: z.string().nullable(),
  billing_frequency: z.string().nullable(),
  currency: z.string().nullable(),
  standard_markup_percent: z.number().nullable(),
  standard_fee_percent: z.number().nullable(),
  volume_discounts: z.record(z.unknown()).nullable(),
  document_path: z.string().nullable(),
  signed_document_path: z.string().nullable(),
  status: z.string().nullable(),
  signed_by: z.string().nullable(),
  signed_at: z.string().nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type ClientContracts = z.infer<typeof ClientContractsSchema>;

export const ClientContractsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  contract_number: z.string().nullable().optional(),
  contract_type: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  auto_renew: z.boolean().nullable().optional(),
  payment_terms: z.string().nullable().optional(),
  billing_frequency: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  standard_markup_percent: z.number().nullable().optional(),
  standard_fee_percent: z.number().nullable().optional(),
  volume_discounts: z.record(z.unknown()).nullable().optional(),
  document_path: z.string().nullable().optional(),
  signed_document_path: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  signed_by: z.string().nullable().optional(),
  signed_at: z.string().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientContractsInsert = z.infer<typeof ClientContractsInsertSchema>;

export const ClientContractsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  contract_number: z.string().nullable().optional(),
  contract_type: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  start_date: z.string().optional(),
  end_date: z.string().nullable().optional(),
  auto_renew: z.boolean().nullable().optional(),
  payment_terms: z.string().nullable().optional(),
  billing_frequency: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  standard_markup_percent: z.number().nullable().optional(),
  standard_fee_percent: z.number().nullable().optional(),
  volume_discounts: z.record(z.unknown()).nullable().optional(),
  document_path: z.string().nullable().optional(),
  signed_document_path: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  signed_by: z.string().nullable().optional(),
  signed_at: z.string().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientContractsUpdate = z.infer<typeof ClientContractsUpdateSchema>;

// candidate_notes
export const CandidateNotesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  note_type: z.string(),
  content: z.string(),
  is_private: z.boolean().nullable(),
  visible_to: z.array(z.unknown()).nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type CandidateNotes = z.infer<typeof CandidateNotesSchema>;

export const CandidateNotesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  note_type: z.string(),
  content: z.string(),
  is_private: z.boolean().nullable().optional(),
  visible_to: z.array(z.unknown()).nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateNotesInsert = z.infer<typeof CandidateNotesInsertSchema>;

export const CandidateNotesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  note_type: z.string().optional(),
  content: z.string().optional(),
  is_private: z.boolean().nullable().optional(),
  visible_to: z.array(z.unknown()).nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateNotesUpdate = z.infer<typeof CandidateNotesUpdateSchema>;

// client_contacts
export const ClientContactsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  client_id: z.string().uuid().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  mobile: z.string().nullable(),
  title: z.string().nullable(),
  department: z.string().nullable(),
  is_primary: z.boolean().nullable(),
  is_decision_maker: z.boolean().nullable(),
  is_hiring_manager: z.boolean().nullable(),
  preferred_contact_method: z.string().nullable(),
  timezone: z.string().nullable(),
  is_active: z.boolean().nullable(),
  linkedin_url: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type ClientContacts = z.infer<typeof ClientContactsSchema>;

export const ClientContactsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  mobile: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
  is_decision_maker: z.boolean().nullable().optional(),
  is_hiring_manager: z.boolean().nullable().optional(),
  preferred_contact_method: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientContactsInsert = z.infer<typeof ClientContactsInsertSchema>;

export const ClientContactsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  mobile: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  department: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
  is_decision_maker: z.boolean().nullable().optional(),
  is_hiring_manager: z.boolean().nullable().optional(),
  preferred_contact_method: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  is_active: z.boolean().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientContactsUpdate = z.infer<typeof ClientContactsUpdateSchema>;

// client_projects
export const ClientProjectsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  client_id: z.string().uuid().nullable(),
  contract_id: z.string().uuid().nullable(),
  project_code: z.string().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  hiring_manager_contact_id: z.string().uuid().nullable(),
  billing_code: z.string().nullable(),
  po_number: z.string().nullable(),
  status: z.string().nullable(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type ClientProjects = z.infer<typeof ClientProjectsSchema>;

export const ClientProjectsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  contract_id: z.string().uuid().nullable().optional(),
  project_code: z.string().nullable().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  hiring_manager_contact_id: z.string().uuid().nullable().optional(),
  billing_code: z.string().nullable().optional(),
  po_number: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientProjectsInsert = z.infer<typeof ClientProjectsInsertSchema>;

export const ClientProjectsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  contract_id: z.string().uuid().nullable().optional(),
  project_code: z.string().nullable().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  hiring_manager_contact_id: z.string().uuid().nullable().optional(),
  billing_code: z.string().nullable().optional(),
  po_number: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ClientProjectsUpdate = z.infer<typeof ClientProjectsUpdateSchema>;

// workflows
export const WorkflowsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  workflow_name: z.string(),
  workflow_type: z.string(),
  description: z.string().nullable(),
  trigger_event: z.string().nullable(),
  stages: z.record(z.unknown()),
  is_active: z.boolean().nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Workflows = z.infer<typeof WorkflowsSchema>;

export const WorkflowsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  workflow_name: z.string(),
  workflow_type: z.string(),
  description: z.string().nullable().optional(),
  trigger_event: z.string().nullable().optional(),
  stages: z.record(z.unknown()),
  is_active: z.boolean().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type WorkflowsInsert = z.infer<typeof WorkflowsInsertSchema>;

export const WorkflowsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  workflow_name: z.string().optional(),
  workflow_type: z.string().optional(),
  description: z.string().nullable().optional(),
  trigger_event: z.string().nullable().optional(),
  stages: z.record(z.unknown()).optional(),
  is_active: z.boolean().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type WorkflowsUpdate = z.infer<typeof WorkflowsUpdateSchema>;

// contacts
export const ContactsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  client_id: z.string().uuid().nullable(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  title: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Contacts = z.infer<typeof ContactsSchema>;

export const ContactsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  client_id: z.string().uuid().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ContactsInsert = z.infer<typeof ContactsInsertSchema>;

export const ContactsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  client_id: z.string().uuid().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ContactsUpdate = z.infer<typeof ContactsUpdateSchema>;

// reviews
export const ReviewsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  entity_type: z.string().nullable(),
  entity_id: z.string().uuid().nullable(),
  reviewer_id: z.string().uuid().nullable(),
  rating: z.number().int().nullable(),
  review_text: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  published_at: z.string().datetime().nullable(),
});
export type Reviews = z.infer<typeof ReviewsSchema>;

export const ReviewsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  reviewer_id: z.string().uuid().nullable().optional(),
  rating: z.number().int().nullable().optional(),
  review_text: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  published_at: z.string().datetime().nullable().optional(),
});
export type ReviewsInsert = z.infer<typeof ReviewsInsertSchema>;

export const ReviewsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  reviewer_id: z.string().uuid().nullable().optional(),
  rating: z.number().int().nullable().optional(),
  review_text: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  published_at: z.string().datetime().nullable().optional(),
});
export type ReviewsUpdate = z.infer<typeof ReviewsUpdateSchema>;

// email_logs
export const EmailLogsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  resend_id: z.string().nullable(),
  template: z.string(),
  recipient_email: z.string(),
  recipient_type: z.string().nullable(),
  recipient_id: z.string().uuid().nullable(),
  subject: z.string(),
  application_id: z.string().uuid().nullable(),
  interview_id: z.string().uuid().nullable(),
  offer_id: z.string().uuid().nullable(),
  status: z.string(),
  sent_at: z.string().datetime(),
  delivered_at: z.string().datetime().nullable(),
  bounced_at: z.string().datetime().nullable(),
  opened_at: z.string().datetime().nullable(),
  clicked_at: z.string().datetime().nullable(),
  error_message: z.string().nullable(),
  bounce_type: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type EmailLogs = z.infer<typeof EmailLogsSchema>;

export const EmailLogsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  resend_id: z.string().nullable().optional(),
  template: z.string(),
  recipient_email: z.string(),
  recipient_type: z.string().nullable().optional(),
  recipient_id: z.string().uuid().nullable().optional(),
  subject: z.string(),
  application_id: z.string().uuid().nullable().optional(),
  interview_id: z.string().uuid().nullable().optional(),
  offer_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  sent_at: z.string().datetime().optional(),
  delivered_at: z.string().datetime().nullable().optional(),
  bounced_at: z.string().datetime().nullable().optional(),
  opened_at: z.string().datetime().nullable().optional(),
  clicked_at: z.string().datetime().nullable().optional(),
  error_message: z.string().nullable().optional(),
  bounce_type: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type EmailLogsInsert = z.infer<typeof EmailLogsInsertSchema>;

export const EmailLogsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  resend_id: z.string().nullable().optional(),
  template: z.string().optional(),
  recipient_email: z.string().optional(),
  recipient_type: z.string().nullable().optional(),
  recipient_id: z.string().uuid().nullable().optional(),
  subject: z.string().optional(),
  application_id: z.string().uuid().nullable().optional(),
  interview_id: z.string().uuid().nullable().optional(),
  offer_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  sent_at: z.string().datetime().optional(),
  delivered_at: z.string().datetime().nullable().optional(),
  bounced_at: z.string().datetime().nullable().optional(),
  opened_at: z.string().datetime().nullable().optional(),
  clicked_at: z.string().datetime().nullable().optional(),
  error_message: z.string().nullable().optional(),
  bounce_type: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type EmailLogsUpdate = z.infer<typeof EmailLogsUpdateSchema>;

// contracts
export const ContractsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  contract_number: z.string().nullable(),
  client_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  contract_type: z.string().nullable(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  status: z.string().nullable(),
  terms: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type Contracts = z.infer<typeof ContractsSchema>;

export const ContractsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  contract_number: z.string().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  contract_type: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  terms: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type ContractsInsert = z.infer<typeof ContractsInsertSchema>;

export const ContractsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  contract_number: z.string().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  contract_type: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  terms: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type ContractsUpdate = z.infer<typeof ContractsUpdateSchema>;

// meeting_participants
export const MeetingParticipantsSchema = z.object({
  id: z.string().uuid(),
  meeting_id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  email: z.string(),
  name: z.string().nullable(),
  role: z.string(),
  status: z.string(),
  organization_id: z.string().uuid(),
});
export type MeetingParticipants = z.infer<typeof MeetingParticipantsSchema>;

export const MeetingParticipantsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  meeting_id: z.string().uuid(),
  user_id: z.string().uuid().nullable().optional(),
  email: z.string(),
  name: z.string().nullable().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  organization_id: z.string().uuid(),
});
export type MeetingParticipantsInsert = z.infer<typeof MeetingParticipantsInsertSchema>;

export const MeetingParticipantsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  meeting_id: z.string().uuid().optional(),
  user_id: z.string().uuid().nullable().optional(),
  email: z.string().optional(),
  name: z.string().nullable().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  organization_id: z.string().uuid().optional(),
});
export type MeetingParticipantsUpdate = z.infer<typeof MeetingParticipantsUpdateSchema>;

// meetings
export const MeetingsSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable(),
  title: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  timezone: z.string(),
  location: z.string().nullable(),
  meeting_url: z.string().nullable(),
  status: z.string(),
  calendar_event_id: z.string().nullable(),
  provider: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid().nullable(),
});
export type Meetings = z.infer<typeof MeetingsSchema>;

export const MeetingsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable().optional(),
  title: z.string(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  timezone: z.string(),
  location: z.string().nullable().optional(),
  meeting_url: z.string().nullable().optional(),
  status: z.string().optional(),
  calendar_event_id: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().nullable().optional(),
});
export type MeetingsInsert = z.infer<typeof MeetingsInsertSchema>;

export const MeetingsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().nullable().optional(),
  title: z.string().optional(),
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  timezone: z.string().optional(),
  location: z.string().nullable().optional(),
  meeting_url: z.string().nullable().optional(),
  status: z.string().optional(),
  calendar_event_id: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().nullable().optional(),
});
export type MeetingsUpdate = z.infer<typeof MeetingsUpdateSchema>;

// availability_windows
export const AvailabilityWindowsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  is_available: z.boolean(),
  created_at: z.string().datetime(),
});
export type AvailabilityWindows = z.infer<typeof AvailabilityWindowsSchema>;

export const AvailabilityWindowsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid(),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  is_available: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type AvailabilityWindowsInsert = z.infer<typeof AvailabilityWindowsInsertSchema>;

export const AvailabilityWindowsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  is_available: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type AvailabilityWindowsUpdate = z.infer<typeof AvailabilityWindowsUpdateSchema>;

// interview_plans
export const InterviewPlansSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable(),
  owner_user_id: z.string().uuid().nullable(),
  status: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type InterviewPlans = z.infer<typeof InterviewPlansSchema>;

export const InterviewPlansInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable().optional(),
  owner_user_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type InterviewPlansInsert = z.infer<typeof InterviewPlansInsertSchema>;

export const InterviewPlansUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().nullable().optional(),
  owner_user_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type InterviewPlansUpdate = z.infer<typeof InterviewPlansUpdateSchema>;

// interview_rounds
export const InterviewRoundsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  interview_plan_id: z.string().uuid(),
  meeting_id: z.string().uuid().nullable(),
  round_order: z.number().int(),
  round_name: z.string(),
  round_type: z.string(),
  status: z.string(),
  created_at: z.string().datetime(),
});
export type InterviewRounds = z.infer<typeof InterviewRoundsSchema>;

export const InterviewRoundsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  interview_plan_id: z.string().uuid(),
  meeting_id: z.string().uuid().nullable().optional(),
  round_order: z.number().int(),
  round_name: z.string(),
  round_type: z.string(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
});
export type InterviewRoundsInsert = z.infer<typeof InterviewRoundsInsertSchema>;

export const InterviewRoundsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  interview_plan_id: z.string().uuid().optional(),
  meeting_id: z.string().uuid().nullable().optional(),
  round_order: z.number().int().optional(),
  round_name: z.string().optional(),
  round_type: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
});
export type InterviewRoundsUpdate = z.infer<typeof InterviewRoundsUpdateSchema>;

// user_audit_log
export const UserAuditLogSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  action: z.string(),
  resource_type: z.string().nullable(),
  resource_id: z.string().nullable(),
  ip_address: z.string().nullable(),
  user_agent: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type UserAuditLog = z.infer<typeof UserAuditLogSchema>;

export const UserAuditLogInsertSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().nullable().optional(),
  action: z.string(),
  resource_type: z.string().nullable().optional(),
  resource_id: z.string().nullable().optional(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type UserAuditLogInsert = z.infer<typeof UserAuditLogInsertSchema>;

export const UserAuditLogUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid().nullable().optional(),
  action: z.string().optional(),
  resource_type: z.string().nullable().optional(),
  resource_id: z.string().nullable().optional(),
  ip_address: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type UserAuditLogUpdate = z.infer<typeof UserAuditLogUpdateSchema>;

// bulk_jobs
export const BulkJobsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  operation: z.string(),
  total_items: z.number().int(),
  processed_items: z.number().int(),
  successful_items: z.number().int(),
  failed_items: z.number().int(),
  status: z.string(),
  params: z.record(z.unknown()).nullable(),
  results: z.record(z.unknown()).nullable(),
  created_by_user_id: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  started_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
});
export type BulkJobs = z.infer<typeof BulkJobsSchema>;

export const BulkJobsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  operation: z.string(),
  total_items: z.number().int().optional(),
  processed_items: z.number().int().optional(),
  successful_items: z.number().int().optional(),
  failed_items: z.number().int().optional(),
  status: z.string().optional(),
  params: z.record(z.unknown()).nullable().optional(),
  results: z.record(z.unknown()).nullable().optional(),
  created_by_user_id: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
});
export type BulkJobsInsert = z.infer<typeof BulkJobsInsertSchema>;

export const BulkJobsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  operation: z.string().optional(),
  total_items: z.number().int().optional(),
  processed_items: z.number().int().optional(),
  successful_items: z.number().int().optional(),
  failed_items: z.number().int().optional(),
  status: z.string().optional(),
  params: z.record(z.unknown()).nullable().optional(),
  results: z.record(z.unknown()).nullable().optional(),
  created_by_user_id: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  started_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
});
export type BulkJobsUpdate = z.infer<typeof BulkJobsUpdateSchema>;

// transcripts
export const TranscriptsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  recording_asset_id: z.string().uuid(),
  provider: z.string(),
  status: z.string(),
  transcript_text: z.string().nullable(),
  transcript_json: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type Transcripts = z.infer<typeof TranscriptsSchema>;

export const TranscriptsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  recording_asset_id: z.string().uuid(),
  provider: z.string(),
  status: z.string().optional(),
  transcript_text: z.string().nullable().optional(),
  transcript_json: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type TranscriptsInsert = z.infer<typeof TranscriptsInsertSchema>;

export const TranscriptsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  recording_asset_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  status: z.string().optional(),
  transcript_text: z.string().nullable().optional(),
  transcript_json: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type TranscriptsUpdate = z.infer<typeof TranscriptsUpdateSchema>;

// scorecard_templates
export const ScorecardTemplatesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  schema: z.record(z.unknown()),
  rubric_version: z.number().int(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
});
export type ScorecardTemplates = z.infer<typeof ScorecardTemplatesSchema>;

export const ScorecardTemplatesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  schema: z.record(z.unknown()),
  rubric_version: z.number().int().optional(),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type ScorecardTemplatesInsert = z.infer<typeof ScorecardTemplatesInsertSchema>;

export const ScorecardTemplatesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  schema: z.record(z.unknown()).optional(),
  rubric_version: z.number().int().optional(),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type ScorecardTemplatesUpdate = z.infer<typeof ScorecardTemplatesUpdateSchema>;

// decision_packets
export const DecisionPacketsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  interview_plan_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable(),
  status: z.string(),
  packet: z.record(z.unknown()).nullable(),
  ai_summary: z.string().nullable(),
  ai_risks: z.record(z.unknown()).nullable(),
  ai_recommendation: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type DecisionPackets = z.infer<typeof DecisionPacketsSchema>;

export const DecisionPacketsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  interview_plan_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  packet: z.record(z.unknown()).nullable().optional(),
  ai_summary: z.string().nullable().optional(),
  ai_risks: z.record(z.unknown()).nullable().optional(),
  ai_recommendation: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type DecisionPacketsInsert = z.infer<typeof DecisionPacketsInsertSchema>;

export const DecisionPacketsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  interview_plan_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().nullable().optional(),
  status: z.string().optional(),
  packet: z.record(z.unknown()).nullable().optional(),
  ai_summary: z.string().nullable().optional(),
  ai_risks: z.record(z.unknown()).nullable().optional(),
  ai_recommendation: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type DecisionPacketsUpdate = z.infer<typeof DecisionPacketsUpdateSchema>;

// recording_assets
export const RecordingAssetsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  meeting_id: z.string().uuid().nullable(),
  provider: z.string(),
  provider_asset_id: z.string().nullable(),
  url: z.string().nullable(),
  asset_type: z.string(),
  status: z.string(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type RecordingAssets = z.infer<typeof RecordingAssetsSchema>;

export const RecordingAssetsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  meeting_id: z.string().uuid().nullable().optional(),
  provider: z.string(),
  provider_asset_id: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  asset_type: z.string(),
  status: z.string().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type RecordingAssetsInsert = z.infer<typeof RecordingAssetsInsertSchema>;

export const RecordingAssetsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  meeting_id: z.string().uuid().nullable().optional(),
  provider: z.string().optional(),
  provider_asset_id: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  asset_type: z.string().optional(),
  status: z.string().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type RecordingAssetsUpdate = z.infer<typeof RecordingAssetsUpdateSchema>;

// timesheets
export const TimesheetsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  assignment_id: z.string().uuid().nullable(),
  consultant_id: z.string().uuid().nullable(),
  client_id: z.string().uuid().nullable(),
  week_start_date: z.string(),
  week_end_date: z.string(),
  total_hours: z.number(),
  regular_hours: z.number(),
  overtime_hours: z.number(),
  billable_hours: z.number(),
  non_billable_hours: z.number(),
  status: z.string(),
  hourly_rate: z.number().nullable(),
  total_amount: z.number().nullable(),
  submitted_at: z.string().datetime().nullable(),
  submitted_by: z.string().uuid().nullable(),
  approved_at: z.string().datetime().nullable(),
  approved_by: z.string().uuid().nullable(),
  rejected_at: z.string().datetime().nullable(),
  rejected_by: z.string().uuid().nullable(),
  rejection_reason: z.string().nullable(),
  notes: z.string().nullable(),
  attachments: z.record(z.unknown()).nullable(),
  time_entries: z.record(z.unknown()).nullable(),
  tags: z.array(z.unknown()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Timesheets = z.infer<typeof TimesheetsSchema>;

export const TimesheetsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  assignment_id: z.string().uuid().nullable().optional(),
  consultant_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  week_start_date: z.string(),
  week_end_date: z.string(),
  total_hours: z.number().optional(),
  regular_hours: z.number().optional(),
  overtime_hours: z.number().optional(),
  billable_hours: z.number().optional(),
  non_billable_hours: z.number().optional(),
  status: z.string().optional(),
  hourly_rate: z.number().nullable().optional(),
  total_amount: z.number().nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  submitted_by: z.string().uuid().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  approved_by: z.string().uuid().nullable().optional(),
  rejected_at: z.string().datetime().nullable().optional(),
  rejected_by: z.string().uuid().nullable().optional(),
  rejection_reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  attachments: z.record(z.unknown()).nullable().optional(),
  time_entries: z.record(z.unknown()).nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type TimesheetsInsert = z.infer<typeof TimesheetsInsertSchema>;

export const TimesheetsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  assignment_id: z.string().uuid().nullable().optional(),
  consultant_id: z.string().uuid().nullable().optional(),
  client_id: z.string().uuid().nullable().optional(),
  week_start_date: z.string().optional(),
  week_end_date: z.string().optional(),
  total_hours: z.number().optional(),
  regular_hours: z.number().optional(),
  overtime_hours: z.number().optional(),
  billable_hours: z.number().optional(),
  non_billable_hours: z.number().optional(),
  status: z.string().optional(),
  hourly_rate: z.number().nullable().optional(),
  total_amount: z.number().nullable().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  submitted_by: z.string().uuid().nullable().optional(),
  approved_at: z.string().datetime().nullable().optional(),
  approved_by: z.string().uuid().nullable().optional(),
  rejected_at: z.string().datetime().nullable().optional(),
  rejected_by: z.string().uuid().nullable().optional(),
  rejection_reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  attachments: z.record(z.unknown()).nullable().optional(),
  time_entries: z.record(z.unknown()).nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type TimesheetsUpdate = z.infer<typeof TimesheetsUpdateSchema>;

// comp_bands
export const CompBandsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  job_id: z.string().uuid().nullable(),
  role_title: z.string().nullable(),
  location: z.string().nullable(),
  employment_type: z.string(),
  currency: z.string(),
  min_amount: z.number(),
  mid_amount: z.number().nullable(),
  max_amount: z.number(),
  unit: z.string(),
  effective_from: z.string(),
  effective_to: z.string().nullable(),
  approvals_required: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type CompBands = z.infer<typeof CompBandsSchema>;

export const CompBandsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  job_id: z.string().uuid().nullable().optional(),
  role_title: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  employment_type: z.string(),
  currency: z.string().optional(),
  min_amount: z.number(),
  mid_amount: z.number().nullable().optional(),
  max_amount: z.number(),
  unit: z.string(),
  effective_from: z.string().optional(),
  effective_to: z.string().nullable().optional(),
  approvals_required: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type CompBandsInsert = z.infer<typeof CompBandsInsertSchema>;

export const CompBandsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  job_id: z.string().uuid().nullable().optional(),
  role_title: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  employment_type: z.string().optional(),
  currency: z.string().optional(),
  min_amount: z.number().optional(),
  mid_amount: z.number().nullable().optional(),
  max_amount: z.number().optional(),
  unit: z.string().optional(),
  effective_from: z.string().optional(),
  effective_to: z.string().nullable().optional(),
  approvals_required: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type CompBandsUpdate = z.infer<typeof CompBandsUpdateSchema>;

// scorecard_responses
export const ScorecardResponsesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  scorecard_instance_id: z.string().uuid(),
  responses: z.record(z.unknown()),
  created_by_user_id: z.string().uuid(),
  created_at: z.string().datetime(),
});
export type ScorecardResponses = z.infer<typeof ScorecardResponsesSchema>;

export const ScorecardResponsesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  scorecard_instance_id: z.string().uuid(),
  responses: z.record(z.unknown()),
  created_by_user_id: z.string().uuid(),
  created_at: z.string().datetime().optional(),
});
export type ScorecardResponsesInsert = z.infer<typeof ScorecardResponsesInsertSchema>;

export const ScorecardResponsesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  scorecard_instance_id: z.string().uuid().optional(),
  responses: z.record(z.unknown()).optional(),
  created_by_user_id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
});
export type ScorecardResponsesUpdate = z.infer<typeof ScorecardResponsesUpdateSchema>;

// onboarding_packets
export const OnboardingPacketsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  start_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  status: z.string(),
  packet: z.record(z.unknown()).nullable(),
  last_error: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type OnboardingPackets = z.infer<typeof OnboardingPacketsSchema>;

export const OnboardingPacketsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  start_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  status: z.string().optional(),
  packet: z.record(z.unknown()).nullable().optional(),
  last_error: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type OnboardingPacketsInsert = z.infer<typeof OnboardingPacketsInsertSchema>;

export const OnboardingPacketsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  start_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  status: z.string().optional(),
  packet: z.record(z.unknown()).nullable().optional(),
  last_error: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type OnboardingPacketsUpdate = z.infer<typeof OnboardingPacketsUpdateSchema>;

// starts
export const StartsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable(),
  start_date: z.string(),
  employment_type: z.string(),
  status: z.string(),
  created_at: z.string().datetime(),
});
export type Starts = z.infer<typeof StartsSchema>;

export const StartsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid().nullable().optional(),
  start_date: z.string(),
  employment_type: z.string(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
});
export type StartsInsert = z.infer<typeof StartsInsertSchema>;

export const StartsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  offer_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().nullable().optional(),
  start_date: z.string().optional(),
  employment_type: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
});
export type StartsUpdate = z.infer<typeof StartsUpdateSchema>;

// esign_envelopes
export const EsignEnvelopesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid(),
  provider: z.string(),
  provider_envelope_id: z.string().nullable(),
  status: z.string(),
  signing_url: z.string().nullable(),
  signed_at: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type EsignEnvelopes = z.infer<typeof EsignEnvelopesSchema>;

export const EsignEnvelopesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid(),
  provider: z.string(),
  provider_envelope_id: z.string().nullable().optional(),
  status: z.string().optional(),
  signing_url: z.string().nullable().optional(),
  signed_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type EsignEnvelopesInsert = z.infer<typeof EsignEnvelopesInsertSchema>;

export const EsignEnvelopesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  offer_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  provider_envelope_id: z.string().nullable().optional(),
  status: z.string().optional(),
  signing_url: z.string().nullable().optional(),
  signed_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type EsignEnvelopesUpdate = z.infer<typeof EsignEnvelopesUpdateSchema>;

// offer_approvals
export const OfferApprovalsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid(),
  step_order: z.number().int(),
  approver_user_id: z.string().uuid(),
  status: z.string(),
  decided_at: z.string().datetime().nullable(),
  decision_note: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type OfferApprovals = z.infer<typeof OfferApprovalsSchema>;

export const OfferApprovalsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid(),
  step_order: z.number().int(),
  approver_user_id: z.string().uuid(),
  status: z.string().optional(),
  decided_at: z.string().datetime().nullable().optional(),
  decision_note: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type OfferApprovalsInsert = z.infer<typeof OfferApprovalsInsertSchema>;

export const OfferApprovalsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  offer_id: z.string().uuid().optional(),
  step_order: z.number().int().optional(),
  approver_user_id: z.string().uuid().optional(),
  status: z.string().optional(),
  decided_at: z.string().datetime().nullable().optional(),
  decision_note: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type OfferApprovalsUpdate = z.infer<typeof OfferApprovalsUpdateSchema>;

// offer_documents
export const OfferDocumentsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid(),
  doc_type: z.string(),
  status: z.string(),
  storage_key: z.string().nullable(),
  url: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type OfferDocuments = z.infer<typeof OfferDocumentsSchema>;

export const OfferDocumentsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid(),
  doc_type: z.string(),
  status: z.string().optional(),
  storage_key: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type OfferDocumentsInsert = z.infer<typeof OfferDocumentsInsertSchema>;

export const OfferDocumentsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  offer_id: z.string().uuid().optional(),
  doc_type: z.string().optional(),
  status: z.string().optional(),
  storage_key: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type OfferDocumentsUpdate = z.infer<typeof OfferDocumentsUpdateSchema>;

// applications
export const ApplicationsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  current_stage_text_old: z.string(),
  stage_history: z.record(z.unknown()).nullable(),
  date_applied: z.string().nullable(),
  linkedin_application_status: z.string().nullable(),
  screening_questions: z.record(z.unknown()).nullable(),
  is_favorite: z.boolean().nullable(),
  is_archived: z.boolean().nullable(),
  assigned_to: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  current_stage: z.unknown(),
  applied_date: z.string().nullable(),
  candidate_email: z.string().nullable(),
  job_external_id: z.number().nullable(),
  screening_data: z.record(z.unknown()).nullable(),
  stage: z.string().nullable(),
  status: z.string().nullable(),
  organization_id: z.string().uuid(),
});
export type Applications = z.infer<typeof ApplicationsSchema>;

export const ApplicationsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  current_stage_text_old: z.string().optional(),
  stage_history: z.record(z.unknown()).nullable().optional(),
  date_applied: z.string().nullable().optional(),
  linkedin_application_status: z.string().nullable().optional(),
  screening_questions: z.record(z.unknown()).nullable().optional(),
  is_favorite: z.boolean().nullable().optional(),
  is_archived: z.boolean().nullable().optional(),
  assigned_to: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  current_stage: z.unknown().optional(),
  applied_date: z.string().nullable().optional(),
  candidate_email: z.string().nullable().optional(),
  job_external_id: z.number().nullable().optional(),
  screening_data: z.record(z.unknown()).nullable().optional(),
  stage: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type ApplicationsInsert = z.infer<typeof ApplicationsInsertSchema>;

export const ApplicationsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  current_stage_text_old: z.string().optional(),
  stage_history: z.record(z.unknown()).nullable().optional(),
  date_applied: z.string().nullable().optional(),
  linkedin_application_status: z.string().nullable().optional(),
  screening_questions: z.record(z.unknown()).nullable().optional(),
  is_favorite: z.boolean().nullable().optional(),
  is_archived: z.boolean().nullable().optional(),
  assigned_to: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  current_stage: z.unknown().optional(),
  applied_date: z.string().nullable().optional(),
  candidate_email: z.string().nullable().optional(),
  job_external_id: z.number().nullable().optional(),
  screening_data: z.record(z.unknown()).nullable().optional(),
  stage: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type ApplicationsUpdate = z.infer<typeof ApplicationsUpdateSchema>;

// templates
export const TemplatesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  template_type: z.string(),
  category: z.string().nullable(),
  content: z.string(),
  subject: z.string().nullable(),
  variables: z.array(z.unknown()).nullable(),
  is_active: z.boolean(),
  is_default: z.boolean(),
  usage_count: z.number().int(),
  last_used_at: z.string().datetime().nullable(),
  owner_id: z.string().uuid().nullable(),
  owner_name: z.string().nullable(),
  tags: z.array(z.unknown()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Templates = z.infer<typeof TemplatesSchema>;

export const TemplatesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  template_type: z.string(),
  category: z.string().nullable().optional(),
  content: z.string(),
  subject: z.string().nullable().optional(),
  variables: z.array(z.unknown()).nullable().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
  usage_count: z.number().int().optional(),
  last_used_at: z.string().datetime().nullable().optional(),
  owner_id: z.string().uuid().nullable().optional(),
  owner_name: z.string().nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type TemplatesInsert = z.infer<typeof TemplatesInsertSchema>;

export const TemplatesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  template_type: z.string().optional(),
  category: z.string().nullable().optional(),
  content: z.string().optional(),
  subject: z.string().nullable().optional(),
  variables: z.array(z.unknown()).nullable().optional(),
  is_active: z.boolean().optional(),
  is_default: z.boolean().optional(),
  usage_count: z.number().int().optional(),
  last_used_at: z.string().datetime().nullable().optional(),
  owner_id: z.string().uuid().nullable().optional(),
  owner_name: z.string().nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type TemplatesUpdate = z.infer<typeof TemplatesUpdateSchema>;

// candidate_embeddings
export const CandidateEmbeddingsSchema = z.object({
  id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  embedding: z.unknown(),
  content_snapshot: z.string().nullable(),
  model_name: z.string(),
  generated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type CandidateEmbeddings = z.infer<typeof CandidateEmbeddingsSchema>;

export const CandidateEmbeddingsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid(),
  embedding: z.unknown(),
  content_snapshot: z.string().nullable().optional(),
  model_name: z.string().optional(),
  generated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type CandidateEmbeddingsInsert = z.infer<typeof CandidateEmbeddingsInsertSchema>;

export const CandidateEmbeddingsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  embedding: z.unknown().optional(),
  content_snapshot: z.string().nullable().optional(),
  model_name: z.string().optional(),
  generated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type CandidateEmbeddingsUpdate = z.infer<typeof CandidateEmbeddingsUpdateSchema>;

// subscriptions
export const SubscriptionsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  stripe_customer_id: z.string(),
  stripe_subscription_id: z.string(),
  plan_id: z.string(),
  status: z.string(),
  current_period_start: z.string().datetime().nullable(),
  current_period_end: z.string().datetime().nullable(),
  trial_start: z.string().datetime().nullable(),
  trial_end: z.string().datetime().nullable(),
  cancel_at_period_end: z.boolean().nullable(),
  canceled_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Subscriptions = z.infer<typeof SubscriptionsSchema>;

export const SubscriptionsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  stripe_customer_id: z.string(),
  stripe_subscription_id: z.string(),
  plan_id: z.string(),
  status: z.string().optional(),
  current_period_start: z.string().datetime().nullable().optional(),
  current_period_end: z.string().datetime().nullable().optional(),
  trial_start: z.string().datetime().nullable().optional(),
  trial_end: z.string().datetime().nullable().optional(),
  cancel_at_period_end: z.boolean().nullable().optional(),
  canceled_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type SubscriptionsInsert = z.infer<typeof SubscriptionsInsertSchema>;

export const SubscriptionsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  stripe_customer_id: z.string().optional(),
  stripe_subscription_id: z.string().optional(),
  plan_id: z.string().optional(),
  status: z.string().optional(),
  current_period_start: z.string().datetime().nullable().optional(),
  current_period_end: z.string().datetime().nullable().optional(),
  trial_start: z.string().datetime().nullable().optional(),
  trial_end: z.string().datetime().nullable().optional(),
  cancel_at_period_end: z.boolean().nullable().optional(),
  canceled_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type SubscriptionsUpdate = z.infer<typeof SubscriptionsUpdateSchema>;

// assignments
export const AssignmentsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  application_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid(),
  state: z.unknown(),
  start_date: z.string().nullable(),
  current_end_date: z.string().nullable(),
  client_name: z.string().nullable(),
  notes: z.string().nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  engagement_type: z.string().nullable(),
  organization_id: z.string().uuid(),
});
export type Assignments = z.infer<typeof AssignmentsSchema>;

export const AssignmentsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  application_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid(),
  state: z.unknown().optional(),
  start_date: z.string().nullable().optional(),
  current_end_date: z.string().nullable().optional(),
  client_name: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  engagement_type: z.string().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type AssignmentsInsert = z.infer<typeof AssignmentsInsertSchema>;

export const AssignmentsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  application_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  state: z.unknown().optional(),
  start_date: z.string().nullable().optional(),
  current_end_date: z.string().nullable().optional(),
  client_name: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  engagement_type: z.string().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type AssignmentsUpdate = z.infer<typeof AssignmentsUpdateSchema>;

// forecasts
export const ForecastsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  forecast_type: z.string(),
  period_type: z.string(),
  period_start: z.string(),
  period_end: z.string(),
  predicted_value: z.number(),
  confidence_level: z.number().int(),
  actual_value: z.number().nullable(),
  variance: z.number().nullable(),
  variance_percent: z.number().nullable(),
  accuracy_score: z.number().int().nullable(),
  status: z.string(),
  methodology: z.string().nullable(),
  assumptions: z.record(z.unknown()).nullable(),
  owner_id: z.string().uuid().nullable(),
  owner_name: z.string().nullable(),
  tags: z.array(z.unknown()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Forecasts = z.infer<typeof ForecastsSchema>;

export const ForecastsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  forecast_type: z.string(),
  period_type: z.string(),
  period_start: z.string(),
  period_end: z.string(),
  predicted_value: z.number(),
  confidence_level: z.number().int().optional(),
  actual_value: z.number().nullable().optional(),
  variance: z.number().nullable().optional(),
  variance_percent: z.number().nullable().optional(),
  accuracy_score: z.number().int().nullable().optional(),
  status: z.string().optional(),
  methodology: z.string().nullable().optional(),
  assumptions: z.record(z.unknown()).nullable().optional(),
  owner_id: z.string().uuid().nullable().optional(),
  owner_name: z.string().nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type ForecastsInsert = z.infer<typeof ForecastsInsertSchema>;

export const ForecastsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  forecast_type: z.string().optional(),
  period_type: z.string().optional(),
  period_start: z.string().optional(),
  period_end: z.string().optional(),
  predicted_value: z.number().optional(),
  confidence_level: z.number().int().optional(),
  actual_value: z.number().nullable().optional(),
  variance: z.number().nullable().optional(),
  variance_percent: z.number().nullable().optional(),
  accuracy_score: z.number().int().nullable().optional(),
  status: z.string().optional(),
  methodology: z.string().nullable().optional(),
  assumptions: z.record(z.unknown()).nullable().optional(),
  owner_id: z.string().uuid().nullable().optional(),
  owner_name: z.string().nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type ForecastsUpdate = z.infer<typeof ForecastsUpdateSchema>;

// action_registry
export const ActionRegistrySchema = z.object({
  action_key: z.string(),
  entity_name: z.string(),
  rpc_name: z.string(),
  valid_states_ref: z.string().nullable(),
  emits_events: z.array(z.unknown()),
  is_idempotent: z.boolean(),
  requires_organization_id: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type ActionRegistry = z.infer<typeof ActionRegistrySchema>;

export const ActionRegistryInsertSchema = z.object({
  action_key: z.string(),
  entity_name: z.string(),
  rpc_name: z.string(),
  valid_states_ref: z.string().nullable().optional(),
  emits_events: z.array(z.unknown()).optional(),
  is_idempotent: z.boolean().optional(),
  requires_organization_id: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type ActionRegistryInsert = z.infer<typeof ActionRegistryInsertSchema>;

export const ActionRegistryUpdateSchema = z.object({
  action_key: z.string().optional(),
  entity_name: z.string().optional(),
  rpc_name: z.string().optional(),
  valid_states_ref: z.string().nullable().optional(),
  emits_events: z.array(z.unknown()).optional(),
  is_idempotent: z.boolean().optional(),
  requires_organization_id: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type ActionRegistryUpdate = z.infer<typeof ActionRegistryUpdateSchema>;

// bench_entries
export const BenchEntriesSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  application_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  assignment_id: z.string().uuid().nullable(),
  state: z.unknown(),
  reason: z.string().nullable(),
  notes: z.string().nullable(),
  bench_started_at: z.string().datetime(),
  bench_ended_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type BenchEntries = z.infer<typeof BenchEntriesSchema>;

export const BenchEntriesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  application_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  assignment_id: z.string().uuid().nullable().optional(),
  state: z.unknown().optional(),
  reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  bench_started_at: z.string().datetime().optional(),
  bench_ended_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type BenchEntriesInsert = z.infer<typeof BenchEntriesInsertSchema>;

export const BenchEntriesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  application_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  assignment_id: z.string().uuid().nullable().optional(),
  state: z.unknown().optional(),
  reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  bench_started_at: z.string().datetime().optional(),
  bench_ended_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type BenchEntriesUpdate = z.infer<typeof BenchEntriesUpdateSchema>;

// teams
export const TeamsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Teams = z.infer<typeof TeamsSchema>;

export const TeamsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type TeamsInsert = z.infer<typeof TeamsInsertSchema>;

export const TeamsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type TeamsUpdate = z.infer<typeof TeamsUpdateSchema>;

// automation_rules
export const AutomationRulesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  trigger_type: z.string().nullable(),
  trigger_config: z.record(z.unknown()).nullable(),
  action_type: z.string().nullable(),
  action_config: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type AutomationRules = z.infer<typeof AutomationRulesSchema>;

export const AutomationRulesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  trigger_type: z.string().nullable().optional(),
  trigger_config: z.record(z.unknown()).nullable().optional(),
  action_type: z.string().nullable().optional(),
  action_config: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type AutomationRulesInsert = z.infer<typeof AutomationRulesInsertSchema>;

export const AutomationRulesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  trigger_type: z.string().nullable().optional(),
  trigger_config: z.record(z.unknown()).nullable().optional(),
  action_type: z.string().nullable().optional(),
  action_config: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type AutomationRulesUpdate = z.infer<typeof AutomationRulesUpdateSchema>;

// integrations
export const IntegrationsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  integration_type: z.string().nullable(),
  config: z.record(z.unknown()).nullable(),
  credentials: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  last_sync_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Integrations = z.infer<typeof IntegrationsSchema>;

export const IntegrationsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  integration_type: z.string().nullable().optional(),
  config: z.record(z.unknown()).nullable().optional(),
  credentials: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  last_sync_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type IntegrationsInsert = z.infer<typeof IntegrationsInsertSchema>;

export const IntegrationsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  integration_type: z.string().nullable().optional(),
  config: z.record(z.unknown()).nullable().optional(),
  credentials: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  last_sync_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type IntegrationsUpdate = z.infer<typeof IntegrationsUpdateSchema>;

// offers
export const OffersSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  submission_id: z.string().uuid().nullable(),
  salary_amount: z.number().int(),
  salary_currency: z.string().nullable(),
  equity_percentage: z.number().nullable(),
  start_date: z.string().nullable(),
  offer_letter_url: z.string().nullable(),
  status: z.string().nullable(),
  sent_at: z.string().datetime().nullable(),
  accepted_at: z.string().datetime().nullable(),
  declined_at: z.string().datetime().nullable(),
  notes: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Offers = z.infer<typeof OffersSchema>;

export const OffersInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  submission_id: z.string().uuid().nullable().optional(),
  salary_amount: z.number().int(),
  salary_currency: z.string().nullable().optional(),
  equity_percentage: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  offer_letter_url: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  sent_at: z.string().datetime().nullable().optional(),
  accepted_at: z.string().datetime().nullable().optional(),
  declined_at: z.string().datetime().nullable().optional(),
  notes: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type OffersInsert = z.infer<typeof OffersInsertSchema>;

export const OffersUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  submission_id: z.string().uuid().nullable().optional(),
  salary_amount: z.number().int().optional(),
  salary_currency: z.string().nullable().optional(),
  equity_percentage: z.number().nullable().optional(),
  start_date: z.string().nullable().optional(),
  offer_letter_url: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  sent_at: z.string().datetime().nullable().optional(),
  accepted_at: z.string().datetime().nullable().optional(),
  declined_at: z.string().datetime().nullable().optional(),
  notes: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type OffersUpdate = z.infer<typeof OffersUpdateSchema>;

// reports
export const ReportsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  report_type: z.string().nullable(),
  config: z.record(z.unknown()).nullable(),
  schedule: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  last_run_at: z.string().datetime().nullable(),
});
export type Reports = z.infer<typeof ReportsSchema>;

export const ReportsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  report_type: z.string().nullable().optional(),
  config: z.record(z.unknown()).nullable().optional(),
  schedule: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  last_run_at: z.string().datetime().nullable().optional(),
});
export type ReportsInsert = z.infer<typeof ReportsInsertSchema>;

export const ReportsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  report_type: z.string().nullable().optional(),
  config: z.record(z.unknown()).nullable().optional(),
  schedule: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  last_run_at: z.string().datetime().nullable().optional(),
});
export type ReportsUpdate = z.infer<typeof ReportsUpdateSchema>;

// dashboards
export const DashboardsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  layout: z.record(z.unknown()).nullable(),
  widgets: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type Dashboards = z.infer<typeof DashboardsSchema>;

export const DashboardsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  layout: z.record(z.unknown()).nullable().optional(),
  widgets: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type DashboardsInsert = z.infer<typeof DashboardsInsertSchema>;

export const DashboardsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  layout: z.record(z.unknown()).nullable().optional(),
  widgets: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type DashboardsUpdate = z.infer<typeof DashboardsUpdateSchema>;

// requirements
export const RequirementsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  client_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  required_skills: z.record(z.unknown()).nullable(),
  preferred_skills: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  priority: z.string().nullable(),
  deadline: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
});
export type Requirements = z.infer<typeof RequirementsSchema>;

export const RequirementsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  client_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
  required_skills: z.record(z.unknown()).nullable().optional(),
  preferred_skills: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  deadline: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type RequirementsInsert = z.infer<typeof RequirementsInsertSchema>;

export const RequirementsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  client_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  required_skills: z.record(z.unknown()).nullable().optional(),
  preferred_skills: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  priority: z.string().nullable().optional(),
  deadline: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
});
export type RequirementsUpdate = z.infer<typeof RequirementsUpdateSchema>;

// analytics_reports
export const AnalyticsReportsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  query: z.record(z.unknown()).nullable(),
  results: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  published_at: z.string().datetime().nullable(),
});
export type AnalyticsReports = z.infer<typeof AnalyticsReportsSchema>;

export const AnalyticsReportsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  query: z.record(z.unknown()).nullable().optional(),
  results: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  published_at: z.string().datetime().nullable().optional(),
});
export type AnalyticsReportsInsert = z.infer<typeof AnalyticsReportsInsertSchema>;

export const AnalyticsReportsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  query: z.record(z.unknown()).nullable().optional(),
  results: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  published_at: z.string().datetime().nullable().optional(),
});
export type AnalyticsReportsUpdate = z.infer<typeof AnalyticsReportsUpdateSchema>;

// task_rules
export const TaskRulesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  event_topic: z.string(),
  conditions: z.record(z.unknown()).nullable(),
  actions: z.record(z.unknown()),
  priority: z.number().int(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
});
export type TaskRules = z.infer<typeof TaskRulesSchema>;

export const TaskRulesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  event_topic: z.string(),
  conditions: z.record(z.unknown()).nullable().optional(),
  actions: z.record(z.unknown()),
  priority: z.number().int().optional(),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type TaskRulesInsert = z.infer<typeof TaskRulesInsertSchema>;

export const TaskRulesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  event_topic: z.string().optional(),
  conditions: z.record(z.unknown()).nullable().optional(),
  actions: z.record(z.unknown()).optional(),
  priority: z.number().int().optional(),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type TaskRulesUpdate = z.infer<typeof TaskRulesUpdateSchema>;

// campaign_sequences
export const CampaignSequencesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  steps: z.record(z.unknown()),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
});
export type CampaignSequences = z.infer<typeof CampaignSequencesSchema>;

export const CampaignSequencesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  steps: z.record(z.unknown()),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type CampaignSequencesInsert = z.infer<typeof CampaignSequencesInsertSchema>;

export const CampaignSequencesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  steps: z.record(z.unknown()).optional(),
  is_active: z.boolean().optional(),
  created_at: z.string().datetime().optional(),
});
export type CampaignSequencesUpdate = z.infer<typeof CampaignSequencesUpdateSchema>;

// referrals
export const ReferralsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  referred_by_type: z.string(),
  referred_by_id: z.string().uuid().nullable(),
  referral_source: z.string().nullable(),
  referral_fee_amount: z.number().nullable(),
  referral_fee_paid: z.boolean().nullable(),
  referral_fee_paid_at: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Referrals = z.infer<typeof ReferralsSchema>;

export const ReferralsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  referred_by_type: z.string(),
  referred_by_id: z.string().uuid().nullable().optional(),
  referral_source: z.string().nullable().optional(),
  referral_fee_amount: z.number().nullable().optional(),
  referral_fee_paid: z.boolean().nullable().optional(),
  referral_fee_paid_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ReferralsInsert = z.infer<typeof ReferralsInsertSchema>;

export const ReferralsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  referred_by_type: z.string().optional(),
  referred_by_id: z.string().uuid().nullable().optional(),
  referral_source: z.string().nullable().optional(),
  referral_fee_amount: z.number().nullable().optional(),
  referral_fee_paid: z.boolean().nullable().optional(),
  referral_fee_paid_at: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type ReferralsUpdate = z.infer<typeof ReferralsUpdateSchema>;

// audit_log
export const AuditLogSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  user_id: z.string().uuid().nullable(),
  action: z.string(),
  table_name: z.string(),
  record_id: z.string().uuid().nullable(),
  old_data: z.record(z.unknown()).nullable(),
  new_data: z.record(z.unknown()).nullable(),
  ip_address: z.unknown().nullable(),
  user_agent: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;

export const AuditLogInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  user_id: z.string().uuid().nullable().optional(),
  action: z.string(),
  table_name: z.string(),
  record_id: z.string().uuid().nullable().optional(),
  old_data: z.record(z.unknown()).nullable().optional(),
  new_data: z.record(z.unknown()).nullable().optional(),
  ip_address: z.unknown().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type AuditLogInsert = z.infer<typeof AuditLogInsertSchema>;

export const AuditLogUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  user_id: z.string().uuid().nullable().optional(),
  action: z.string().optional(),
  table_name: z.string().optional(),
  record_id: z.string().uuid().nullable().optional(),
  old_data: z.record(z.unknown()).nullable().optional(),
  new_data: z.record(z.unknown()).nullable().optional(),
  ip_address: z.unknown().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type AuditLogUpdate = z.infer<typeof AuditLogUpdateSchema>;

// candidate_work_history
export const CandidateWorkHistorySchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  company_name: z.string(),
  title: z.string().nullable(),
  location: z.string().nullable(),
  employment_type: z.string().nullable(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  is_current: z.boolean().nullable(),
  description: z.string().nullable(),
  achievements: z.array(z.unknown()).nullable(),
  technologies_used: z.array(z.unknown()).nullable(),
  source: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type CandidateWorkHistory = z.infer<typeof CandidateWorkHistorySchema>;

export const CandidateWorkHistoryInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  company_name: z.string(),
  title: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  employment_type: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  is_current: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
  achievements: z.array(z.unknown()).nullable().optional(),
  technologies_used: z.array(z.unknown()).nullable().optional(),
  source: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateWorkHistoryInsert = z.infer<typeof CandidateWorkHistoryInsertSchema>;

export const CandidateWorkHistoryUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  company_name: z.string().optional(),
  title: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  employment_type: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  is_current: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
  achievements: z.array(z.unknown()).nullable().optional(),
  technologies_used: z.array(z.unknown()).nullable().optional(),
  source: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateWorkHistoryUpdate = z.infer<typeof CandidateWorkHistoryUpdateSchema>;

// match_scores
export const MatchScoresSchema = z.object({
  id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  overall_score: z.number().nullable(),
  skills_score: z.number().nullable(),
  experience_score: z.number().nullable(),
  certification_score: z.number().nullable(),
  location_score: z.number().nullable(),
  compensation_score: z.number().nullable(),
  culture_score: z.number().nullable(),
  recency_score: z.number().nullable(),
  adjustments: z.record(z.unknown()).nullable(),
  threshold_result: z.string().nullable(),
  override_by: z.string().uuid().nullable(),
  override_reason: z.string().nullable(),
  model_version: z.string().nullable(),
  scoring_weights: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type MatchScores = z.infer<typeof MatchScoresSchema>;

export const MatchScoresInsertSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  overall_score: z.number().nullable().optional(),
  skills_score: z.number().nullable().optional(),
  experience_score: z.number().nullable().optional(),
  certification_score: z.number().nullable().optional(),
  location_score: z.number().nullable().optional(),
  compensation_score: z.number().nullable().optional(),
  culture_score: z.number().nullable().optional(),
  recency_score: z.number().nullable().optional(),
  adjustments: z.record(z.unknown()).nullable().optional(),
  threshold_result: z.string().nullable().optional(),
  override_by: z.string().uuid().nullable().optional(),
  override_reason: z.string().nullable().optional(),
  model_version: z.string().nullable().optional(),
  scoring_weights: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type MatchScoresInsert = z.infer<typeof MatchScoresInsertSchema>;

export const MatchScoresUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  overall_score: z.number().nullable().optional(),
  skills_score: z.number().nullable().optional(),
  experience_score: z.number().nullable().optional(),
  certification_score: z.number().nullable().optional(),
  location_score: z.number().nullable().optional(),
  compensation_score: z.number().nullable().optional(),
  culture_score: z.number().nullable().optional(),
  recency_score: z.number().nullable().optional(),
  adjustments: z.record(z.unknown()).nullable().optional(),
  threshold_result: z.string().nullable().optional(),
  override_by: z.string().uuid().nullable().optional(),
  override_reason: z.string().nullable().optional(),
  model_version: z.string().nullable().optional(),
  scoring_weights: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type MatchScoresUpdate = z.infer<typeof MatchScoresUpdateSchema>;

// candidate_education
export const CandidateEducationSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  institution: z.string(),
  degree: z.string().nullable(),
  field_of_study: z.string().nullable(),
  location: z.string().nullable(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  graduated: z.boolean().nullable(),
  gpa: z.number().nullable(),
  honors: z.array(z.unknown()).nullable(),
  activities: z.array(z.unknown()).nullable(),
  source: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type CandidateEducation = z.infer<typeof CandidateEducationSchema>;

export const CandidateEducationInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  institution: z.string(),
  degree: z.string().nullable().optional(),
  field_of_study: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  graduated: z.boolean().nullable().optional(),
  gpa: z.number().nullable().optional(),
  honors: z.array(z.unknown()).nullable().optional(),
  activities: z.array(z.unknown()).nullable().optional(),
  source: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateEducationInsert = z.infer<typeof CandidateEducationInsertSchema>;

export const CandidateEducationUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  institution: z.string().optional(),
  degree: z.string().nullable().optional(),
  field_of_study: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  graduated: z.boolean().nullable().optional(),
  gpa: z.number().nullable().optional(),
  honors: z.array(z.unknown()).nullable().optional(),
  activities: z.array(z.unknown()).nullable().optional(),
  source: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateEducationUpdate = z.infer<typeof CandidateEducationUpdateSchema>;

// message_templates
export const MessageTemplatesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  channel: z.string(),
  subject: z.string().nullable(),
  body: z.string(),
  variables: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type MessageTemplates = z.infer<typeof MessageTemplatesSchema>;

export const MessageTemplatesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  channel: z.string(),
  subject: z.string().nullable().optional(),
  body: z.string(),
  variables: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type MessageTemplatesInsert = z.infer<typeof MessageTemplatesInsertSchema>;

export const MessageTemplatesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  channel: z.string().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().optional(),
  variables: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type MessageTemplatesUpdate = z.infer<typeof MessageTemplatesUpdateSchema>;

// documents
export const DocumentsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  file_name: z.string(),
  file_type: z.string().nullable(),
  mime_type: z.string().nullable(),
  file_size_bytes: z.number().int().nullable(),
  storage_path: z.string(),
  storage_bucket: z.string().nullable(),
  parsed_text: z.string().nullable(),
  parsed_data: z.record(z.unknown()).nullable(),
  uploaded_by: z.string().uuid(),
  uploaded_at: z.string().datetime(),
  organization_id: z.string().uuid().nullable(),
  status: z.string().nullable(),
});
export type Documents = z.infer<typeof DocumentsSchema>;

export const DocumentsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  file_name: z.string(),
  file_type: z.string().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  file_size_bytes: z.number().int().nullable().optional(),
  storage_path: z.string(),
  storage_bucket: z.string().nullable().optional(),
  parsed_text: z.string().nullable().optional(),
  parsed_data: z.record(z.unknown()).nullable().optional(),
  uploaded_by: z.string().uuid(),
  uploaded_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  status: z.string().nullable().optional(),
});
export type DocumentsInsert = z.infer<typeof DocumentsInsertSchema>;

export const DocumentsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  file_name: z.string().optional(),
  file_type: z.string().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  file_size_bytes: z.number().int().nullable().optional(),
  storage_path: z.string().optional(),
  storage_bucket: z.string().nullable().optional(),
  parsed_text: z.string().nullable().optional(),
  parsed_data: z.record(z.unknown()).nullable().optional(),
  uploaded_by: z.string().uuid().optional(),
  uploaded_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  status: z.string().nullable().optional(),
});
export type DocumentsUpdate = z.infer<typeof DocumentsUpdateSchema>;

// contact_points
export const ContactPointsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  type: z.string(),
  value: z.string(),
  is_primary: z.boolean(),
  is_dnc: z.boolean(),
  normalized_value: z.string().nullable(),
  created_at: z.string().datetime(),
});
export type ContactPoints = z.infer<typeof ContactPointsSchema>;

export const ContactPointsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  type: z.string(),
  value: z.string(),
  is_primary: z.boolean().optional(),
  is_dnc: z.boolean().optional(),
  normalized_value: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ContactPointsInsert = z.infer<typeof ContactPointsInsertSchema>;

export const ContactPointsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  type: z.string().optional(),
  value: z.string().optional(),
  is_primary: z.boolean().optional(),
  is_dnc: z.boolean().optional(),
  normalized_value: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ContactPointsUpdate = z.infer<typeof ContactPointsUpdateSchema>;

// conversations
export const ConversationsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  channel: z.string(),
  status: z.string(),
  last_message_at: z.string().datetime().nullable(),
  message_count: z.number().int(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type Conversations = z.infer<typeof ConversationsSchema>;

export const ConversationsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  channel: z.string(),
  status: z.string().optional(),
  last_message_at: z.string().datetime().nullable().optional(),
  message_count: z.number().int().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ConversationsInsert = z.infer<typeof ConversationsInsertSchema>;

export const ConversationsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  channel: z.string().optional(),
  status: z.string().optional(),
  last_message_at: z.string().datetime().nullable().optional(),
  message_count: z.number().int().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ConversationsUpdate = z.infer<typeof ConversationsUpdateSchema>;

// inbound_messages
export const InboundMessagesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  provider: z.string(),
  provider_message_id: z.string().nullable(),
  from_address: z.string(),
  to_address: z.string().nullable(),
  subject: z.string().nullable(),
  body: z.string().nullable(),
  received_at: z.string().datetime(),
  processed_at: z.string().datetime().nullable(),
  candidate_id: z.string().uuid().nullable(),
  conversation_id: z.string().uuid().nullable(),
  intent: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
});
export type InboundMessages = z.infer<typeof InboundMessagesSchema>;

export const InboundMessagesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  provider: z.string(),
  provider_message_id: z.string().nullable().optional(),
  from_address: z.string(),
  to_address: z.string().nullable().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  received_at: z.string().datetime(),
  processed_at: z.string().datetime().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  conversation_id: z.string().uuid().nullable().optional(),
  intent: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type InboundMessagesInsert = z.infer<typeof InboundMessagesInsertSchema>;

export const InboundMessagesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  provider: z.string().optional(),
  provider_message_id: z.string().nullable().optional(),
  from_address: z.string().optional(),
  to_address: z.string().nullable().optional(),
  subject: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  received_at: z.string().datetime().optional(),
  processed_at: z.string().datetime().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  conversation_id: z.string().uuid().nullable().optional(),
  intent: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type InboundMessagesUpdate = z.infer<typeof InboundMessagesUpdateSchema>;

// scorecard_instances
export const ScorecardInstancesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  interview_round_id: z.string().uuid(),
  template_id: z.string().uuid(),
  interviewer_user_id: z.string().uuid(),
  due_at: z.string().datetime().nullable(),
  lock_at: z.string().datetime().nullable(),
  status: z.string(),
  submitted_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
});
export type ScorecardInstances = z.infer<typeof ScorecardInstancesSchema>;

export const ScorecardInstancesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  interview_round_id: z.string().uuid(),
  template_id: z.string().uuid(),
  interviewer_user_id: z.string().uuid(),
  due_at: z.string().datetime().nullable().optional(),
  lock_at: z.string().datetime().nullable().optional(),
  status: z.string().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ScorecardInstancesInsert = z.infer<typeof ScorecardInstancesInsertSchema>;

export const ScorecardInstancesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  interview_round_id: z.string().uuid().optional(),
  template_id: z.string().uuid().optional(),
  interviewer_user_id: z.string().uuid().optional(),
  due_at: z.string().datetime().nullable().optional(),
  lock_at: z.string().datetime().nullable().optional(),
  status: z.string().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
});
export type ScorecardInstancesUpdate = z.infer<typeof ScorecardInstancesUpdateSchema>;

// placements
export const PlacementsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  job_id: z.string().uuid().nullable(),
  start_date: z.string(),
  end_date: z.string().nullable(),
  placement_fee: z.number().int().nullable(),
  fee_currency: z.string().nullable(),
  guarantee_days: z.number().int().nullable(),
  status: z.string().nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Placements = z.infer<typeof PlacementsSchema>;

export const PlacementsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  offer_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  placement_fee: z.number().int().nullable().optional(),
  fee_currency: z.string().nullable().optional(),
  guarantee_days: z.number().int().nullable().optional(),
  status: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type PlacementsInsert = z.infer<typeof PlacementsInsertSchema>;

export const PlacementsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  offer_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  job_id: z.string().uuid().nullable().optional(),
  start_date: z.string().optional(),
  end_date: z.string().nullable().optional(),
  placement_fee: z.number().int().nullable().optional(),
  fee_currency: z.string().nullable().optional(),
  guarantee_days: z.number().int().nullable().optional(),
  status: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type PlacementsUpdate = z.infer<typeof PlacementsUpdateSchema>;

// pipeline
export const PipelineSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  submission_id: z.string().uuid().nullable(),
  stage: z.string(),
  status: z.string().nullable(),
  notes: z.string().nullable(),
  moved_by: z.string().uuid().nullable(),
  moved_at: z.string().datetime().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Pipeline = z.infer<typeof PipelineSchema>;

export const PipelineInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  submission_id: z.string().uuid().nullable().optional(),
  stage: z.string(),
  status: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  moved_by: z.string().uuid().nullable().optional(),
  moved_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type PipelineInsert = z.infer<typeof PipelineInsertSchema>;

export const PipelineUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  submission_id: z.string().uuid().nullable().optional(),
  stage: z.string().optional(),
  status: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  moved_by: z.string().uuid().nullable().optional(),
  moved_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type PipelineUpdate = z.infer<typeof PipelineUpdateSchema>;

// webhook_deliveries
export const WebhookDeliveriesSchema = z.object({
  id: z.string().uuid(),
  subscription_id: z.string().uuid(),
  event_id: z.string().uuid(),
  status: z.string(),
  attempts: z.number().int(),
  last_attempt_at: z.string().datetime().nullable(),
  next_retry_at: z.string().datetime().nullable(),
  response_code: z.number().int().nullable(),
  response_body: z.string().nullable(),
  created_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type WebhookDeliveries = z.infer<typeof WebhookDeliveriesSchema>;

export const WebhookDeliveriesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  subscription_id: z.string().uuid(),
  event_id: z.string().uuid(),
  status: z.string().optional(),
  attempts: z.number().int().optional(),
  last_attempt_at: z.string().datetime().nullable().optional(),
  next_retry_at: z.string().datetime().nullable().optional(),
  response_code: z.number().int().nullable().optional(),
  response_body: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type WebhookDeliveriesInsert = z.infer<typeof WebhookDeliveriesInsertSchema>;

export const WebhookDeliveriesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  subscription_id: z.string().uuid().optional(),
  event_id: z.string().uuid().optional(),
  status: z.string().optional(),
  attempts: z.number().int().optional(),
  last_attempt_at: z.string().datetime().nullable().optional(),
  next_retry_at: z.string().datetime().nullable().optional(),
  response_code: z.number().int().nullable().optional(),
  response_body: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type WebhookDeliveriesUpdate = z.infer<typeof WebhookDeliveriesUpdateSchema>;

// organizations
export const OrganizationsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  settings: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type Organizations = z.infer<typeof OrganizationsSchema>;

export const OrganizationsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  settings: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type OrganizationsInsert = z.infer<typeof OrganizationsInsertSchema>;

export const OrganizationsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type OrganizationsUpdate = z.infer<typeof OrganizationsUpdateSchema>;

// entity_tags
export const EntityTagsSchema = z.object({
  id: z.string().uuid(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  tag_id: z.string().uuid(),
  created_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type EntityTags = z.infer<typeof EntityTagsSchema>;

export const EntityTagsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  entity_type: z.string(),
  entity_id: z.string().uuid(),
  tag_id: z.string().uuid(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type EntityTagsInsert = z.infer<typeof EntityTagsInsertSchema>;

export const EntityTagsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  entity_type: z.string().optional(),
  entity_id: z.string().uuid().optional(),
  tag_id: z.string().uuid().optional(),
  created_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type EntityTagsUpdate = z.infer<typeof EntityTagsUpdateSchema>;

// job_embeddings
export const JobEmbeddingsSchema = z.object({
  id: z.string().uuid(),
  job_id: z.string().uuid(),
  embedding: z.unknown(),
  content_snapshot: z.string().nullable(),
  model_name: z.string(),
  generated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
  model: z.string(),
  dims: z.number().int().nullable(),
  content_sha256: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type JobEmbeddings = z.infer<typeof JobEmbeddingsSchema>;

export const JobEmbeddingsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  job_id: z.string().uuid(),
  embedding: z.unknown(),
  content_snapshot: z.string().nullable().optional(),
  model_name: z.string().optional(),
  generated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
  model: z.string(),
  dims: z.number().int().nullable().optional(),
  content_sha256: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type JobEmbeddingsInsert = z.infer<typeof JobEmbeddingsInsertSchema>;

export const JobEmbeddingsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  embedding: z.unknown().optional(),
  content_snapshot: z.string().nullable().optional(),
  model_name: z.string().optional(),
  generated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
  model: z.string().optional(),
  dims: z.number().int().nullable().optional(),
  content_sha256: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type JobEmbeddingsUpdate = z.infer<typeof JobEmbeddingsUpdateSchema>;

// talent_pools
export const TalentPoolsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  color: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type TalentPools = z.infer<typeof TalentPoolsSchema>;

export const TalentPoolsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  description: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type TalentPoolsInsert = z.infer<typeof TalentPoolsInsertSchema>;

export const TalentPoolsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type TalentPoolsUpdate = z.infer<typeof TalentPoolsUpdateSchema>;

// talent_pool_members
export const TalentPoolMembersSchema = z.object({
  id: z.string().uuid(),
  pool_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  added_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type TalentPoolMembers = z.infer<typeof TalentPoolMembersSchema>;

export const TalentPoolMembersInsertSchema = z.object({
  id: z.string().uuid().optional(),
  pool_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  added_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type TalentPoolMembersInsert = z.infer<typeof TalentPoolMembersInsertSchema>;

export const TalentPoolMembersUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  pool_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  added_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type TalentPoolMembersUpdate = z.infer<typeof TalentPoolMembersUpdateSchema>;

// submittals
export const SubmittalsSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid(),
  application_id: z.string().uuid().nullable(),
  recruiter_id: z.string().uuid(),
  linkedin_url: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  location_text: z.string().nullable(),
  employment_type: z.unknown(),
  comp_unit: z.unknown(),
  comp_value: z.number().nullable(),
  currency_code: z.string(),
  interview_availability: z.record(z.unknown()).nullable(),
  start_availability: z.string().nullable(),
  ai_summary: z.string().nullable(),
  final_summary: z.string().nullable(),
  recruiter_edits_delta: z.record(z.unknown()).nullable(),
  resume_document_id: z.string().uuid().nullable(),
  score_snapshot: z.record(z.unknown()).nullable(),
  risk_flags: z.record(z.unknown()),
  confidence_score: z.number().nullable(),
  state: z.unknown(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  client_channel: z.unknown(),
  organization_id: z.string().uuid(),
});
export type Submittals = z.infer<typeof SubmittalsSchema>;

export const SubmittalsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  job_id: z.string().uuid(),
  application_id: z.string().uuid().nullable().optional(),
  recruiter_id: z.string().uuid(),
  linkedin_url: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  location_text: z.string().nullable().optional(),
  employment_type: z.unknown(),
  comp_unit: z.unknown(),
  comp_value: z.number().nullable().optional(),
  currency_code: z.string().optional(),
  interview_availability: z.record(z.unknown()).nullable().optional(),
  start_availability: z.string().nullable().optional(),
  ai_summary: z.string().nullable().optional(),
  final_summary: z.string().nullable().optional(),
  recruiter_edits_delta: z.record(z.unknown()).nullable().optional(),
  resume_document_id: z.string().uuid().nullable().optional(),
  score_snapshot: z.record(z.unknown()).nullable().optional(),
  risk_flags: z.record(z.unknown()).optional(),
  confidence_score: z.number().nullable().optional(),
  state: z.unknown().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  client_channel: z.unknown().optional(),
  organization_id: z.string().uuid(),
});
export type SubmittalsInsert = z.infer<typeof SubmittalsInsertSchema>;

export const SubmittalsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  job_id: z.string().uuid().optional(),
  application_id: z.string().uuid().nullable().optional(),
  recruiter_id: z.string().uuid().optional(),
  linkedin_url: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  location_text: z.string().nullable().optional(),
  employment_type: z.unknown().optional(),
  comp_unit: z.unknown().optional(),
  comp_value: z.number().nullable().optional(),
  currency_code: z.string().optional(),
  interview_availability: z.record(z.unknown()).nullable().optional(),
  start_availability: z.string().nullable().optional(),
  ai_summary: z.string().nullable().optional(),
  final_summary: z.string().nullable().optional(),
  recruiter_edits_delta: z.record(z.unknown()).nullable().optional(),
  resume_document_id: z.string().uuid().nullable().optional(),
  score_snapshot: z.record(z.unknown()).nullable().optional(),
  risk_flags: z.record(z.unknown()).optional(),
  confidence_score: z.number().nullable().optional(),
  state: z.unknown().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  client_channel: z.unknown().optional(),
  organization_id: z.string().uuid().optional(),
});
export type SubmittalsUpdate = z.infer<typeof SubmittalsUpdateSchema>;

// tasks
export const TasksSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  task_type: z.string(),
  priority: z.string(),
  status: z.string(),
  assigned_to_user_id: z.string().uuid().nullable(),
  related_entity_type: z.string().nullable(),
  related_entity_id: z.string().uuid().nullable(),
  due_at: z.string().datetime().nullable(),
  sla_at: z.string().datetime().nullable(),
  completed_at: z.string().datetime().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type Tasks = z.infer<typeof TasksSchema>;

export const TasksInsertSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  task_type: z.string(),
  priority: z.string().optional(),
  status: z.string().optional(),
  assigned_to_user_id: z.string().uuid().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  related_entity_id: z.string().uuid().nullable().optional(),
  due_at: z.string().datetime().nullable().optional(),
  sla_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type TasksInsert = z.infer<typeof TasksInsertSchema>;

export const TasksUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  task_type: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  assigned_to_user_id: z.string().uuid().nullable().optional(),
  related_entity_type: z.string().nullable().optional(),
  related_entity_id: z.string().uuid().nullable().optional(),
  due_at: z.string().datetime().nullable().optional(),
  sla_at: z.string().datetime().nullable().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type TasksUpdate = z.infer<typeof TasksUpdateSchema>;

// roles
export const RolesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  permissions: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Roles = z.infer<typeof RolesSchema>;

export const RolesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type RolesInsert = z.infer<typeof RolesInsertSchema>;

export const RolesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type RolesUpdate = z.infer<typeof RolesUpdateSchema>;

// settings
export const SettingsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  key: z.string(),
  value: z.record(z.unknown()).nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Settings = z.infer<typeof SettingsSchema>;

export const SettingsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  key: z.string(),
  value: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type SettingsInsert = z.infer<typeof SettingsInsertSchema>;

export const SettingsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  key: z.string().optional(),
  value: z.record(z.unknown()).nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type SettingsUpdate = z.infer<typeof SettingsUpdateSchema>;

// notification_preferences
export const NotificationPreferencesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  notification_type: z.string(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;

export const NotificationPreferencesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid().nullable().optional(),
  notification_type: z.string(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type NotificationPreferencesInsert = z.infer<typeof NotificationPreferencesInsertSchema>;

export const NotificationPreferencesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  user_id: z.string().uuid().nullable().optional(),
  notification_type: z.string().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type NotificationPreferencesUpdate = z.infer<typeof NotificationPreferencesUpdateSchema>;

// bench
export const BenchSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  consultant_id: z.string().uuid().nullable(),
  availability_date: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Bench = z.infer<typeof BenchSchema>;

export const BenchInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  consultant_id: z.string().uuid().nullable().optional(),
  availability_date: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type BenchInsert = z.infer<typeof BenchInsertSchema>;

export const BenchUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  consultant_id: z.string().uuid().nullable().optional(),
  availability_date: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type BenchUpdate = z.infer<typeof BenchUpdateSchema>;

// audit_logs
export const AuditLogsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid().nullable(),
  entity_type: z.string().nullable(),
  entity_id: z.string().uuid().nullable(),
  action: z.string().nullable(),
  changes: z.record(z.unknown()).nullable(),
  ip_address: z.unknown().nullable(),
  user_agent: z.string().nullable(),
  status: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
});
export type AuditLogs = z.infer<typeof AuditLogsSchema>;

export const AuditLogsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  user_id: z.string().uuid().nullable().optional(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  action: z.string().nullable().optional(),
  changes: z.record(z.unknown()).nullable().optional(),
  ip_address: z.unknown().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type AuditLogsInsert = z.infer<typeof AuditLogsInsertSchema>;

export const AuditLogsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  user_id: z.string().uuid().nullable().optional(),
  entity_type: z.string().nullable().optional(),
  entity_id: z.string().uuid().nullable().optional(),
  action: z.string().nullable().optional(),
  changes: z.record(z.unknown()).nullable().optional(),
  ip_address: z.unknown().nullable().optional(),
  user_agent: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
});
export type AuditLogsUpdate = z.infer<typeof AuditLogsUpdateSchema>;

// billing
export const BillingSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  customer_id: z.string().uuid().nullable(),
  customer_name: z.string(),
  customer_email: z.string().nullable(),
  billing_type: z.string(),
  plan_name: z.string(),
  plan_description: z.string().nullable(),
  amount: z.number(),
  currency: z.string(),
  billing_cycle: z.string(),
  status: z.string(),
  subscription_start: z.string().nullable(),
  subscription_end: z.string().nullable(),
  trial_end_date: z.string().nullable(),
  next_billing_date: z.string().nullable(),
  last_billing_date: z.string().nullable(),
  last_payment_date: z.string().nullable(),
  payment_method: z.string().nullable(),
  payment_method_details: z.record(z.unknown()).nullable(),
  total_revenue: z.number(),
  outstanding_balance: z.number(),
  payments_count: z.number().int(),
  last_invoice_id: z.string().uuid().nullable(),
  next_invoice_id: z.string().uuid().nullable(),
  auto_renew: z.boolean(),
  cancel_at_period_end: z.boolean(),
  canceled_at: z.string().datetime().nullable(),
  cancellation_reason: z.string().nullable(),
  usage_data: z.record(z.unknown()).nullable(),
  tags: z.array(z.unknown()).nullable(),
  metadata: z.record(z.unknown()).nullable(),
  notes: z.string().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Billing = z.infer<typeof BillingSchema>;

export const BillingInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  customer_id: z.string().uuid().nullable().optional(),
  customer_name: z.string(),
  customer_email: z.string().nullable().optional(),
  billing_type: z.string(),
  plan_name: z.string(),
  plan_description: z.string().nullable().optional(),
  amount: z.number(),
  currency: z.string().optional(),
  billing_cycle: z.string(),
  status: z.string().optional(),
  subscription_start: z.string().nullable().optional(),
  subscription_end: z.string().nullable().optional(),
  trial_end_date: z.string().nullable().optional(),
  next_billing_date: z.string().nullable().optional(),
  last_billing_date: z.string().nullable().optional(),
  last_payment_date: z.string().nullable().optional(),
  payment_method: z.string().nullable().optional(),
  payment_method_details: z.record(z.unknown()).nullable().optional(),
  total_revenue: z.number().optional(),
  outstanding_balance: z.number().optional(),
  payments_count: z.number().int().optional(),
  last_invoice_id: z.string().uuid().nullable().optional(),
  next_invoice_id: z.string().uuid().nullable().optional(),
  auto_renew: z.boolean().optional(),
  cancel_at_period_end: z.boolean().optional(),
  canceled_at: z.string().datetime().nullable().optional(),
  cancellation_reason: z.string().nullable().optional(),
  usage_data: z.record(z.unknown()).nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type BillingInsert = z.infer<typeof BillingInsertSchema>;

export const BillingUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().nullable().optional(),
  customer_name: z.string().optional(),
  customer_email: z.string().nullable().optional(),
  billing_type: z.string().optional(),
  plan_name: z.string().optional(),
  plan_description: z.string().nullable().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
  billing_cycle: z.string().optional(),
  status: z.string().optional(),
  subscription_start: z.string().nullable().optional(),
  subscription_end: z.string().nullable().optional(),
  trial_end_date: z.string().nullable().optional(),
  next_billing_date: z.string().nullable().optional(),
  last_billing_date: z.string().nullable().optional(),
  last_payment_date: z.string().nullable().optional(),
  payment_method: z.string().nullable().optional(),
  payment_method_details: z.record(z.unknown()).nullable().optional(),
  total_revenue: z.number().optional(),
  outstanding_balance: z.number().optional(),
  payments_count: z.number().int().optional(),
  last_invoice_id: z.string().uuid().nullable().optional(),
  next_invoice_id: z.string().uuid().nullable().optional(),
  auto_renew: z.boolean().optional(),
  cancel_at_period_end: z.boolean().optional(),
  canceled_at: z.string().datetime().nullable().optional(),
  cancellation_reason: z.string().nullable().optional(),
  usage_data: z.record(z.unknown()).nullable().optional(),
  tags: z.array(z.unknown()).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  notes: z.string().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type BillingUpdate = z.infer<typeof BillingUpdateSchema>;

// event_outbox
export const EventOutboxSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  event_type: z.string(),
  aggregate_type: z.string(),
  aggregate_id: z.string().uuid(),
  payload: z.record(z.unknown()),
  metadata: z.record(z.unknown()).nullable(),
  status: z.string(),
  attempts: z.number().int().nullable(),
  max_attempts: z.number().int().nullable(),
  last_error: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  processed_at: z.string().datetime().nullable(),
  scheduled_for: z.string().datetime().nullable(),
});
export type EventOutbox = z.infer<typeof EventOutboxSchema>;

export const EventOutboxInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  event_type: z.string(),
  aggregate_type: z.string(),
  aggregate_id: z.string().uuid(),
  payload: z.record(z.unknown()),
  metadata: z.record(z.unknown()).nullable().optional(),
  status: z.string().optional(),
  attempts: z.number().int().nullable().optional(),
  max_attempts: z.number().int().nullable().optional(),
  last_error: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  processed_at: z.string().datetime().nullable().optional(),
  scheduled_for: z.string().datetime().nullable().optional(),
});
export type EventOutboxInsert = z.infer<typeof EventOutboxInsertSchema>;

export const EventOutboxUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  event_type: z.string().optional(),
  aggregate_type: z.string().optional(),
  aggregate_id: z.string().uuid().optional(),
  payload: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  status: z.string().optional(),
  attempts: z.number().int().nullable().optional(),
  max_attempts: z.number().int().nullable().optional(),
  last_error: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  processed_at: z.string().datetime().nullable().optional(),
  scheduled_for: z.string().datetime().nullable().optional(),
});
export type EventOutboxUpdate = z.infer<typeof EventOutboxUpdateSchema>;

// note_templates
export const NoteTemplatesSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  template_content: z.string(),
  fields: z.record(z.unknown()).nullable(),
  category: z.string().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  organization_id: z.string().uuid(),
});
export type NoteTemplates = z.infer<typeof NoteTemplatesSchema>;

export const NoteTemplatesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  template_content: z.string(),
  fields: z.record(z.unknown()).nullable().optional(),
  category: z.string().nullable().optional(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid(),
});
export type NoteTemplatesInsert = z.infer<typeof NoteTemplatesInsertSchema>;

export const NoteTemplatesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  template_content: z.string().optional(),
  fields: z.record(z.unknown()).nullable().optional(),
  category: z.string().nullable().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  organization_id: z.string().uuid().optional(),
});
export type NoteTemplatesUpdate = z.infer<typeof NoteTemplatesUpdateSchema>;

// submission_packages
export const SubmissionPackagesSchema = z.object({
  id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  candidate_ids: z.array(z.unknown()),
  job_id: z.string().uuid().nullable(),
  submission_data: z.record(z.unknown()),
  redact_email: z.boolean().nullable(),
  redact_phone: z.boolean().nullable(),
  redact_full_name: z.boolean().nullable(),
  redact_address: z.boolean().nullable(),
  share_token: z.string().nullable(),
  share_password_hash: z.string().nullable(),
  share_expires_at: z.string().datetime().nullable(),
  share_view_count: z.number().int().nullable(),
  status: z.string(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  submitted_at: z.string().datetime().nullable(),
  submittal_id: z.string().uuid().nullable(),
  organization_id: z.string().uuid(),
});
export type SubmissionPackages = z.infer<typeof SubmissionPackagesSchema>;

export const SubmissionPackagesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  candidate_ids: z.array(z.unknown()),
  job_id: z.string().uuid().nullable().optional(),
  submission_data: z.record(z.unknown()),
  redact_email: z.boolean().nullable().optional(),
  redact_phone: z.boolean().nullable().optional(),
  redact_full_name: z.boolean().nullable().optional(),
  redact_address: z.boolean().nullable().optional(),
  share_token: z.string().nullable().optional(),
  share_password_hash: z.string().nullable().optional(),
  share_expires_at: z.string().datetime().nullable().optional(),
  share_view_count: z.number().int().nullable().optional(),
  status: z.string().optional(),
  created_by: z.string().uuid(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  submittal_id: z.string().uuid().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type SubmissionPackagesInsert = z.infer<typeof SubmissionPackagesInsertSchema>;

export const SubmissionPackagesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  workspace_id: z.string().uuid().optional(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  candidate_ids: z.array(z.unknown()).optional(),
  job_id: z.string().uuid().nullable().optional(),
  submission_data: z.record(z.unknown()).optional(),
  redact_email: z.boolean().nullable().optional(),
  redact_phone: z.boolean().nullable().optional(),
  redact_full_name: z.boolean().nullable().optional(),
  redact_address: z.boolean().nullable().optional(),
  share_token: z.string().nullable().optional(),
  share_password_hash: z.string().nullable().optional(),
  share_expires_at: z.string().datetime().nullable().optional(),
  share_view_count: z.number().int().nullable().optional(),
  status: z.string().optional(),
  created_by: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  submitted_at: z.string().datetime().nullable().optional(),
  submittal_id: z.string().uuid().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type SubmissionPackagesUpdate = z.infer<typeof SubmissionPackagesUpdateSchema>;

// idempotency_keys
export const IdempotencyKeysSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  key: z.string(),
  request_hash: z.string(),
  response: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime(),
  expires_at: z.string().datetime(),
});
export type IdempotencyKeys = z.infer<typeof IdempotencyKeysSchema>;

export const IdempotencyKeysInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  key: z.string(),
  request_hash: z.string(),
  response: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
});
export type IdempotencyKeysInsert = z.infer<typeof IdempotencyKeysInsertSchema>;

export const IdempotencyKeysUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  key: z.string().optional(),
  request_hash: z.string().optional(),
  response: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().optional(),
  expires_at: z.string().datetime().optional(),
});
export type IdempotencyKeysUpdate = z.infer<typeof IdempotencyKeysUpdateSchema>;

// eeo_data
export const EeoDataSchema = z.object({
  id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  gender: z.string().nullable(),
  race_ethnicity: z.string().nullable(),
  veteran_status: z.string().nullable(),
  disability_status: z.string().nullable(),
  collected_at: z.string().datetime().nullable(),
  collection_method: z.string().nullable(),
  consent_given: z.boolean().nullable(),
  organization_id: z.string().uuid(),
});
export type EeoData = z.infer<typeof EeoDataSchema>;

export const EeoDataInsertSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  gender: z.string().nullable().optional(),
  race_ethnicity: z.string().nullable().optional(),
  veteran_status: z.string().nullable().optional(),
  disability_status: z.string().nullable().optional(),
  collected_at: z.string().datetime().nullable().optional(),
  collection_method: z.string().nullable().optional(),
  consent_given: z.boolean().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type EeoDataInsert = z.infer<typeof EeoDataInsertSchema>;

export const EeoDataUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  gender: z.string().nullable().optional(),
  race_ethnicity: z.string().nullable().optional(),
  veteran_status: z.string().nullable().optional(),
  disability_status: z.string().nullable().optional(),
  collected_at: z.string().datetime().nullable().optional(),
  collection_method: z.string().nullable().optional(),
  consent_given: z.boolean().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type EeoDataUpdate = z.infer<typeof EeoDataUpdateSchema>;

// background_checks
export const BackgroundChecksSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  application_id: z.string().uuid().nullable(),
  provider: z.string(),
  external_id: z.string(),
  package_id: z.string(),
  status: z.string(),
  result: z.string().nullable(),
  adjudication: z.string().nullable(),
  report_url: z.string().nullable(),
  turnaround_time: z.number().int().nullable(),
  initiated_at: z.string().datetime(),
  completed_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type BackgroundChecks = z.infer<typeof BackgroundChecksSchema>;

export const BackgroundChecksInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  application_id: z.string().uuid().nullable().optional(),
  provider: z.string(),
  external_id: z.string(),
  package_id: z.string(),
  status: z.string().optional(),
  result: z.string().nullable().optional(),
  adjudication: z.string().nullable().optional(),
  report_url: z.string().nullable().optional(),
  turnaround_time: z.number().int().nullable().optional(),
  initiated_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type BackgroundChecksInsert = z.infer<typeof BackgroundChecksInsertSchema>;

export const BackgroundChecksUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().optional(),
  application_id: z.string().uuid().nullable().optional(),
  provider: z.string().optional(),
  external_id: z.string().optional(),
  package_id: z.string().optional(),
  status: z.string().optional(),
  result: z.string().nullable().optional(),
  adjudication: z.string().nullable().optional(),
  report_url: z.string().nullable().optional(),
  turnaround_time: z.number().int().nullable().optional(),
  initiated_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
export type BackgroundChecksUpdate = z.infer<typeof BackgroundChecksUpdateSchema>;

// candidate_documents
export const CandidateDocumentsSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  candidate_id: z.string().uuid().nullable(),
  document_type: z.string(),
  file_name: z.string(),
  file_path: z.string().nullable(),
  file_size: z.number().int().nullable(),
  mime_type: z.string().nullable(),
  parsed_data: z.record(z.unknown()).nullable(),
  parsing_status: z.string().nullable(),
  parsed_at: z.string().datetime().nullable(),
  parser_version: z.string().nullable(),
  is_primary: z.boolean().nullable(),
  version: z.number().int().nullable(),
  uploaded_by: z.string().uuid().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type CandidateDocuments = z.infer<typeof CandidateDocumentsSchema>;

export const CandidateDocumentsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  document_type: z.string(),
  file_name: z.string(),
  file_path: z.string().nullable().optional(),
  file_size: z.number().int().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  parsed_data: z.record(z.unknown()).nullable().optional(),
  parsing_status: z.string().nullable().optional(),
  parsed_at: z.string().datetime().nullable().optional(),
  parser_version: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
  version: z.number().int().nullable().optional(),
  uploaded_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateDocumentsInsert = z.infer<typeof CandidateDocumentsInsertSchema>;

export const CandidateDocumentsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().nullable().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  document_type: z.string().optional(),
  file_name: z.string().optional(),
  file_path: z.string().nullable().optional(),
  file_size: z.number().int().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  parsed_data: z.record(z.unknown()).nullable().optional(),
  parsing_status: z.string().nullable().optional(),
  parsed_at: z.string().datetime().nullable().optional(),
  parser_version: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
  version: z.number().int().nullable().optional(),
  uploaded_by: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type CandidateDocumentsUpdate = z.infer<typeof CandidateDocumentsUpdateSchema>;

// parsed_resumes
export const ParsedResumesSchema = z.object({
  id: z.string().uuid(),
  candidate_id: z.string().uuid().nullable(),
  source_document_id: z.string().uuid().nullable(),
  parse_timestamp: z.string().datetime().nullable(),
  parser_version: z.string().nullable(),
  overall_confidence: z.number().nullable(),
  contact_info: z.record(z.unknown()).nullable(),
  work_experience: z.record(z.unknown()).nullable(),
  education: z.record(z.unknown()).nullable(),
  skills: z.record(z.unknown()).nullable(),
  certifications: z.record(z.unknown()).nullable(),
  parse_duration_ms: z.number().int().nullable(),
  fields_requiring_review: z.array(z.unknown()).nullable(),
  raw_text: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  organization_id: z.string().uuid(),
});
export type ParsedResumes = z.infer<typeof ParsedResumesSchema>;

export const ParsedResumesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  source_document_id: z.string().uuid().nullable().optional(),
  parse_timestamp: z.string().datetime().nullable().optional(),
  parser_version: z.string().nullable().optional(),
  overall_confidence: z.number().nullable().optional(),
  contact_info: z.record(z.unknown()).nullable().optional(),
  work_experience: z.record(z.unknown()).nullable().optional(),
  education: z.record(z.unknown()).nullable().optional(),
  skills: z.record(z.unknown()).nullable().optional(),
  certifications: z.record(z.unknown()).nullable().optional(),
  parse_duration_ms: z.number().int().nullable().optional(),
  fields_requiring_review: z.array(z.unknown()).nullable().optional(),
  raw_text: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid(),
});
export type ParsedResumesInsert = z.infer<typeof ParsedResumesInsertSchema>;

export const ParsedResumesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  candidate_id: z.string().uuid().nullable().optional(),
  source_document_id: z.string().uuid().nullable().optional(),
  parse_timestamp: z.string().datetime().nullable().optional(),
  parser_version: z.string().nullable().optional(),
  overall_confidence: z.number().nullable().optional(),
  contact_info: z.record(z.unknown()).nullable().optional(),
  work_experience: z.record(z.unknown()).nullable().optional(),
  education: z.record(z.unknown()).nullable().optional(),
  skills: z.record(z.unknown()).nullable().optional(),
  certifications: z.record(z.unknown()).nullable().optional(),
  parse_duration_ms: z.number().int().nullable().optional(),
  fields_requiring_review: z.array(z.unknown()).nullable().optional(),
  raw_text: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  organization_id: z.string().uuid().optional(),
});
export type ParsedResumesUpdate = z.infer<typeof ParsedResumesUpdateSchema>;

// app_users
export const AppUsersSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  role: z.string().nullable(),
  status: z.string().nullable(),
  permissions: z.record(z.unknown()).nullable(),
  preferences: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
});
export type AppUsers = z.infer<typeof AppUsersSchema>;

export const AppUsersInsertSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  role: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).nullable().optional(),
  preferences: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type AppUsersInsert = z.infer<typeof AppUsersInsertSchema>;

export const AppUsersUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  tenant_id: z.string().uuid().optional(),
  role: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  permissions: z.record(z.unknown()).nullable().optional(),
  preferences: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
});
export type AppUsersUpdate = z.infer<typeof AppUsersUpdateSchema>;

// tenants
export const TenantsSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().nullable(),
  logo_url: z.string().nullable(),
  settings: z.record(z.unknown()).nullable(),
  features: z.record(z.unknown()).nullable(),
  subscription_tier: z.string().nullable(),
  subscription_status: z.string().nullable(),
  billing_email: z.string().nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  deleted_at: z.string().datetime().nullable(),
});
export type Tenants = z.infer<typeof TenantsSchema>;

export const TenantsInsertSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  domain: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  features: z.record(z.unknown()).nullable().optional(),
  subscription_tier: z.string().nullable().optional(),
  subscription_status: z.string().nullable().optional(),
  billing_email: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
});
export type TenantsInsert = z.infer<typeof TenantsInsertSchema>;

export const TenantsUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  domain: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  settings: z.record(z.unknown()).nullable().optional(),
  features: z.record(z.unknown()).nullable().optional(),
  subscription_tier: z.string().nullable().optional(),
  subscription_status: z.string().nullable().optional(),
  billing_email: z.string().nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
});
export type TenantsUpdate = z.infer<typeof TenantsUpdateSchema>;

// candidates
export const CandidatesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  location: z.string().nullable(),
  timezone: z.string().nullable(),
  current_title: z.string().nullable(),
  current_company: z.string().nullable(),
  years_experience: z.number().int().nullable(),
  desired_roles: z.array(z.unknown()).nullable(),
  skills: z.array(z.unknown()).nullable(),
  resume_url: z.string().nullable(),
  status: z.string().nullable(),
  source: z.string().nullable(),
  notes: z.string().nullable(),
  metadata: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  education_degree: z.string().nullable(),
  education_institution: z.string().nullable(),
  experience_years: z.number().int().nullable(),
  headline: z.string().nullable(),
  zip_code: z.string().nullable(),
  stage: z.string().nullable(),
  location_normalized: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  metro_area: z.string().nullable(),
  tags: z.record(z.unknown()).nullable(),
  rating: z.number().int().nullable(),
  preferred_locations: z.record(z.unknown()).nullable(),
  work_authorization: z.string().nullable(),
  willing_to_relocate: z.boolean().nullable(),
  deleted_at: z.string().datetime().nullable(),
  deleted_by: z.string().uuid().nullable(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
  skills_json: z.record(z.unknown()).nullable(),
  desired_roles_json: z.record(z.unknown()).nullable(),
});
export type Candidates = z.infer<typeof CandidatesSchema>;

export const CandidatesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  current_title: z.string().nullable().optional(),
  current_company: z.string().nullable().optional(),
  years_experience: z.number().int().nullable().optional(),
  desired_roles: z.array(z.unknown()).nullable().optional(),
  skills: z.array(z.unknown()).nullable().optional(),
  resume_url: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  education_degree: z.string().nullable().optional(),
  education_institution: z.string().nullable().optional(),
  experience_years: z.number().int().nullable().optional(),
  headline: z.string().nullable().optional(),
  zip_code: z.string().nullable().optional(),
  stage: z.string().nullable().optional(),
  location_normalized: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  metro_area: z.string().nullable().optional(),
  tags: z.record(z.unknown()).nullable().optional(),
  rating: z.number().int().nullable().optional(),
  preferred_locations: z.record(z.unknown()).nullable().optional(),
  work_authorization: z.string().nullable().optional(),
  willing_to_relocate: z.boolean().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
  deleted_by: z.string().uuid().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
  skills_json: z.record(z.unknown()).nullable().optional(),
  desired_roles_json: z.record(z.unknown()).nullable().optional(),
});
export type CandidatesInsert = z.infer<typeof CandidatesInsertSchema>;

export const CandidatesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  current_title: z.string().nullable().optional(),
  current_company: z.string().nullable().optional(),
  years_experience: z.number().int().nullable().optional(),
  desired_roles: z.array(z.unknown()).nullable().optional(),
  skills: z.array(z.unknown()).nullable().optional(),
  resume_url: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  education_degree: z.string().nullable().optional(),
  education_institution: z.string().nullable().optional(),
  experience_years: z.number().int().nullable().optional(),
  headline: z.string().nullable().optional(),
  zip_code: z.string().nullable().optional(),
  stage: z.string().nullable().optional(),
  location_normalized: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  metro_area: z.string().nullable().optional(),
  tags: z.record(z.unknown()).nullable().optional(),
  rating: z.number().int().nullable().optional(),
  preferred_locations: z.record(z.unknown()).nullable().optional(),
  work_authorization: z.string().nullable().optional(),
  willing_to_relocate: z.boolean().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
  deleted_by: z.string().uuid().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
  skills_json: z.record(z.unknown()).nullable().optional(),
  desired_roles_json: z.record(z.unknown()).nullable().optional(),
});
export type CandidatesUpdate = z.infer<typeof CandidatesUpdateSchema>;

// companies
export const CompaniesSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string(),
  type: z.string().nullable(),
  industry: z.string().nullable(),
  website: z.string().nullable(),
  linkedin_url: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  status: z.string().nullable(),
  employee_count: z.number().int().nullable(),
  annual_revenue: z.number().nullable(),
  headquarters: z.string().nullable(),
  billing_address: z.record(z.unknown()).nullable(),
  payment_terms: z.string().nullable(),
  default_bill_rate: z.number().nullable(),
  default_markup: z.number().nullable(),
  notes: z.string().nullable(),
  tags: z.record(z.unknown()).nullable(),
  created_at: z.string().datetime().nullable(),
  updated_at: z.string().datetime().nullable(),
  deleted_at: z.string().datetime().nullable(),
  deleted_by: z.string().uuid().nullable(),
  created_by: z.string().uuid().nullable(),
  updated_by: z.string().uuid().nullable(),
});
export type Companies = z.infer<typeof CompaniesSchema>;

export const CompaniesInsertSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid(),
  name: z.string(),
  type: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  employee_count: z.number().int().nullable().optional(),
  annual_revenue: z.number().nullable().optional(),
  headquarters: z.string().nullable().optional(),
  billing_address: z.record(z.unknown()).nullable().optional(),
  payment_terms: z.string().nullable().optional(),
  default_bill_rate: z.number().nullable().optional(),
  default_markup: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  tags: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
  deleted_by: z.string().uuid().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type CompaniesInsert = z.infer<typeof CompaniesInsertSchema>;

export const CompaniesUpdateSchema = z.object({
  id: z.string().uuid().optional(),
  organization_id: z.string().uuid().optional(),
  name: z.string().optional(),
  type: z.string().nullable().optional(),
  industry: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  linkedin_url: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  employee_count: z.number().int().nullable().optional(),
  annual_revenue: z.number().nullable().optional(),
  headquarters: z.string().nullable().optional(),
  billing_address: z.record(z.unknown()).nullable().optional(),
  payment_terms: z.string().nullable().optional(),
  default_bill_rate: z.number().nullable().optional(),
  default_markup: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  tags: z.record(z.unknown()).nullable().optional(),
  created_at: z.string().datetime().nullable().optional(),
  updated_at: z.string().datetime().nullable().optional(),
  deleted_at: z.string().datetime().nullable().optional(),
  deleted_by: z.string().uuid().nullable().optional(),
  created_by: z.string().uuid().nullable().optional(),
  updated_by: z.string().uuid().nullable().optional(),
});
export type CompaniesUpdate = z.infer<typeof CompaniesUpdateSchema>;

