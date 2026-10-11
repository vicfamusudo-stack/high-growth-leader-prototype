-- High Growth Leader V12 production MVP schema
-- PostgreSQL 15+. Apply through a migration runner; never expose service-role credentials to browsers.
create extension if not exists pgcrypto;

create type app_role as enum ('learner','facilitator','programme_admin','system_admin');
create type pathway_type as enum ('system_builder','multiplier_leader','strategic_leader');
create type evidence_status as enum ('submitted','in_review','approved','revise','rejected');
create type demo_day_status as enum ('submitted','in_review','approved','revise','rejected');
create type consent_kind as enum ('terms','privacy','analytics','ai_processing');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 120),
  job_title text,
  organisation text,
  role app_role not null default 'learner',
  consent_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table cohorts (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 160),
  starts_on date,
  ends_on date,
  status text not null default 'draft' check (status in ('draft','active','completed','archived')),
  created_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);
create table cohort_memberships (
  cohort_id uuid references cohorts(id) on delete cascade,
  learner_id uuid references profiles(id) on delete cascade,
  pathway pathway_type,
  status text not null default 'active' check (status in ('invited','active','paused','completed','withdrawn')),
  joined_at timestamptz not null default now(),
  primary key (cohort_id, learner_id)
);
create table diagnostics (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(id) on delete cascade,
  version text not null,
  scores jsonb not null check (jsonb_typeof(scores) = 'object'),
  overall_score numeric(5,2) check (overall_score between 0 and 100),
  recommended_pathway pathway_type not null,
  rationale jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create table evidence_items (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  module_id text not null,
  evidence_type text not null,
  impact_statement text not null check (char_length(impact_statement) between 10 and 3000),
  note text check (note is null or char_length(note) <= 6000),
  status evidence_status not null default 'submitted',
  storage_key text, -- private object-storage key only; never a public URL
  submitted_at timestamptz not null default now(),
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  review_note text check (review_note is null or char_length(review_note) <= 3000),
  version integer not null default 1
);
create table step_away_challenges (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(id) on delete cascade,
  responsibility text not null,
  named_owner text not null,
  baseline text not null,
  result text,
  status text not null default 'planned' check (status in ('planned','active','submitted','reviewed')),
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
create table demo_day_submissions (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(id) on delete cascade,
  cohort_id uuid references cohorts(id) on delete set null,
  status demo_day_status not null default 'submitted',
  rubric jsonb not null default '{}'::jsonb,
  narrative text not null check (char_length(narrative) between 10 and 8000),
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz,
  review_note text,
  submitted_at timestamptz not null default now()
);
create table certificates (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(id),
  cohort_id uuid references cohorts(id),
  verification_code text not null unique default encode(gen_random_bytes(12),'hex'),
  pathway pathway_type not null,
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  revoked_reason text,
  gate_snapshot jsonb not null
);
create table consent_records (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(id) on delete cascade,
  kind consent_kind not null,
  policy_version text not null,
  granted boolean not null,
  recorded_at timestamptz not null default now(),
  withdrawn_at timestamptz
);
create table audit_events (
  id bigint generated always as identity primary key,
  actor_id uuid references profiles(id) on delete set null,
  subject_id uuid,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  before_state jsonb,
  after_state jsonb,
  reason text,
  request_id text,
  created_at timestamptz not null default now()
);
create index evidence_review_queue_idx on evidence_items(status,submitted_at);
create index demo_review_queue_idx on demo_day_submissions(status,submitted_at);
create index cohort_memberships_learner_idx on cohort_memberships(learner_id);
create index diagnostics_learner_recent_idx on diagnostics(learner_id,created_at desc);
create index audit_subject_recent_idx on audit_events(subject_id,created_at desc);

-- Security notes:
-- Enable RLS on every table before connecting a client.
-- Policies must enforce: learners read/write only their own profile, diagnostics,
-- evidence, challenge and Demo Day rows; cohort members only see cohort data permitted
-- by the programme; facilitators can review only assigned cohorts; programme admins
-- manage programme cohorts; system admins manage platform config. Do not rely on UI role
-- checks. Review/role/issuance actions must be server-side and append audit_events.
