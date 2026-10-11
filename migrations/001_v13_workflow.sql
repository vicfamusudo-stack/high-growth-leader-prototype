-- PostgreSQL integration scaffold. Apply only after choosing an identity provider and reviewing privacy/retention requirements.
CREATE TYPE evidence_status AS ENUM ('submitted','in_review','revise','approved','rejected');
CREATE TABLE learner_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id text NOT NULL UNIQUE,
  profile jsonb NOT NULL DEFAULT '{}'::jsonb, diagnostic jsonb,
  completed_modules text[] NOT NULL DEFAULT '{}', demo_day_status text NOT NULL DEFAULT 'not_submitted',
  consent_version text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE evidence_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), learner_id uuid NOT NULL REFERENCES learner_records(id) ON DELETE CASCADE,
  artefact text NOT NULL, impact text NOT NULL, reflection text NOT NULL DEFAULT '', status evidence_status NOT NULL DEFAULT 'submitted',
  reviewer_id text, reviewer_note text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE step_away_challenges (
  learner_id uuid PRIMARY KEY REFERENCES learner_records(id) ON DELETE CASCADE,
  responsibility text NOT NULL, owner text NOT NULL, baseline text NOT NULL, result text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'draft', updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE workflow_audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor_id text NOT NULL, learner_id uuid NOT NULL REFERENCES learner_records(id),
  entity_type text NOT NULL, entity_id uuid NOT NULL, action text NOT NULL, from_state text, to_state text, reason text,
  occurred_at timestamptz NOT NULL DEFAULT now()
);
-- Production must add RLS policies bound to verified auth claims before enabling learner traffic.
