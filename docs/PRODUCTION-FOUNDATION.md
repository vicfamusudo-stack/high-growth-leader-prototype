# V13 production-build foundation

## Layout and local workflow

The homepage is delivered as browser-native ES modules from `src/`; no bundler or third-party runtime is required. Run `npm test` for domain checks and `npm run check` for structure/HTML checks. Serve the repository root over HTTP (ES modules do not load reliably from `file://`).

`src/config.js` owns public runtime configuration. The default is `demo`; demo records live in localStorage under a versioned key and are not secure persistence. Set `window.__HGL_CONFIG__ = {mode:'api', apiBaseUrl:'https://your-api.example'}` before loading the entry module to select API mode. Never ship credentials in browser config. Separate local/staging/production origins, secrets, identity settings, CORS, callback URLs and database credentials in the hosting platform.

## Service boundary and contract

`src/service.js` is the adapter seam. API mode expects `GET /v1/learner/me`, `PUT /v1/learner/me`, `POST /v1/evidence`, and `POST /v1/diagnostics`. The implementation currently includes the first two and evidence submission seams; the backend is not present. Requests must use a verified session, enforce object-level authorization, validate payloads server-side, rate-limit writes, and return stable JSON errors. Shared contracts live in `src/contracts.js`; all scores include a scoring version.

Evidence states are `submitted → in_review → approved | revise | rejected`. A revised submission returns to `submitted`; each decision must create an audit event. Challenge and Demo Day approval are separate server-authoritative gates. Certification eligibility is previewed client-side only and must be recomputed by a trusted backend.

## Data and migrations

`migrations/001_v13_workflow.sql` is a PostgreSQL starting point, not a turnkey secure schema. Choose the identity provider before applying it. Add tenant/cohort tables, foreign keys to provider identities, RLS policies, migration rollback strategy, backup/restore tests, retention jobs and private object storage before real learner use. Never store evidence files in this static repository.

## Release / deploy

1. Set `APP_MODE=demo` for public preview. API mode requires HTTPS backend, allowlisted origin and provider-managed auth before release.
2. Run `npm test` and `npm run check`; inspect GitHub Actions smoke and Pages deploy runs.
3. Deploy the static shell to Pages; deploy backend and migrations independently through a protected environment.
4. Before real records: validate accessibility with keyboard and screen reader, verify responsive layouts, test tenant isolation and certification bypass attempts, document privacy/retention, and test restore/deletion.

No live auth, database persistence, AI, payments, file upload, email or certificate issuance is included in V13.
