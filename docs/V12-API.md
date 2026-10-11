# V12 API contract and production adapter boundary

The V12 website is a deployable static frontend and **demo mode**. It does not claim to authenticate users or transmit learner records. The production contract below is the boundary for a backend (recommended: Supabase Auth + PostgreSQL + private object storage, or equivalent).

## Required server endpoints
- `GET /api/v1/me` — authenticated profile and effective permissions.
- `POST /api/v1/diagnostics` — validate answer schema, score on server, store versioned scores and pathway rationale.
- `GET /api/v1/learner/dashboard` — pathway, progress, next best action, evidence and certification gate summary.
- `POST /api/v1/evidence` — create metadata and issue a short-lived upload URL for private storage.
- `POST /api/v1/evidence/:id/review` — facilitator-only state transition with reason; valid transitions submitted→in_review→approved|revise|rejected.
- `POST /api/v1/demo-day` and `POST /api/v1/demo-day/:id/review` — same server-validated review pattern.
- `GET/POST /api/v1/cohorts`, `GET /api/v1/cohorts/:id/learners` — scoped cohort operations.
- `POST /api/v1/certificates/issue` — server re-checks all gates, idempotently issues certificate and records audit event.
- `GET /api/v1/certificates/verify/:code` — public minimal validity response; never expose private learner data.
- `POST /api/v1/privacy/export`, `POST /api/v1/privacy/delete-request` — authenticated export/deletion workflows.
- `POST /api/v1/consent` — versioned consent recording/withdrawal.

## Evidence and certification rules
- Submitted is not approved; only a facilitator with the assigned-cohort permission can review.
- Review transitions require a reason for revise/reject; all changes include actor, timestamp, prior/new state, request ID and reason in an append-only audit log.
- Certificate issue requires a server-side gate snapshot: completed diagnostic, minimum approved evidence count, approved Demo Day, completed Step-Away challenge, and any programme-specific criteria. A client boolean is never sufficient.
- Store evidence files in a private bucket; issue short-lived signed URLs after authorization. Validate size, MIME type and extension; scan uploads; do not put files or signed URLs in analytics/logs.

## AI personalisation boundary
AI may explain the diagnostic and suggest next actions from validated scores and programme content. It must not invent scores, make employment decisions, issue certificates, override facilitator reviews, or infer sensitive traits. Show the factors used, permit a human-readable explanation, provide a non-AI fallback, and log model/prompt version without storing unnecessary personal data.

## Privacy and retention
- Collect the minimum needed. Keep consent version and timestamps; support withdrawal where processing is consent-based.
- Publish controller/contact, purposes, lawful basis, subprocessors, international transfer information, retention schedule and data-subject request process before real launch.
- Define retention per record class. On verified deletion request, remove or irreversibly anonymise eligible records and files, preserving only records required by law/legitimate obligations.
- No production learner data in GitHub issues, static JSON, localStorage, public Pages, test fixtures or analytics events.

## Release checklist
1. Configure provider auth and enforce server-side RBAC/RLS; test cross-tenant access.
2. Apply SQL migration in a staging database and verify least-privilege policies.
3. Configure private storage, upload limits, malware scanning and signed URLs.
4. Configure secrets only in deployment secret manager; never commit credentials.
5. Test review transitions, audit immutability, certificate gate bypass attempts and privacy requests.
6. Complete DPIA/privacy review where appropriate, accessibility review, penetration test and backup/restore drill.
7. Replace all demo metrics with live scoped queries before launch.
