# High Growth Leader™ V13

Structured production-build foundation for the High Growth Leader adaptive leadership programme. V13 turns the V12 single-page prototype into a small module-based static learner app and defines the service, data, workflow, migration and release seams a developer can extend.

## Start here

Requirements: Node.js 20+ for local checks; any static HTTP server for browser use. From the repository root run `npm test` and `npm run check`, then serve the root directory and open `index.html`. Browser-native modules require HTTP(S), not `file://`.

The default `APP_MODE=demo` uses versioned browser localStorage. This is only a convenience for trying the flow. Do not enter confidential learner or business data. `src/config.js` validates the runtime mode. To select API mode, set `window.__HGL_CONFIG__ = { mode: 'api', apiBaseUrl: 'https://your-api.example' }` before `src/app.js` loads. Browser configuration is public; never put secrets or privileged credentials there.

## Product surfaces

- `index.html` — V13 learner workspace: diagnostic, pathway, module progress, evidence submission, Step-Away challenge and readiness gates.
- `v12.html` — preserved V12 homepage snapshot.
- `v11.html` — preserved V11 homepage.
- `admin.html` — facilitator demonstration only; no access controls or connected learner data.
- `feedback.html` — reviewer experience.
- `course.html`, `course-v9.html`, `step-away-pilot.html` — earlier course prototypes.

## Source layout

- `src/config.js` — demo/API mode and public runtime settings.
- `src/contracts.js` — JSDoc data contracts, dimension names and transition map.
- `src/scoring.js` — validated six-dimension heuristic and versioned route selection.
- `src/workflow.js` — evidence state machine and readiness gate rules.
- `src/service.js` — local demo adapter and API client seam.
- `src/app.js`, `styles.css` — learner interface and responsive presentation.
- `migrations/001_v13_workflow.sql` — PostgreSQL integration starting point.
- `docs/PRODUCTION-FOUNDATION.md` — local setup, API contract, environment separation, migration and release steps.
- `docs/V12-API.md` — existing V12 API/security baseline.

## Workflow and backend contract

Diagnostic answers are integers from 1–5 for dependency, ownership, systems, transfer, scale and continuity. The deterministic route is explicitly heuristic, versioned in each result and not a validated psychometric measure. Evidence moves `submitted → in_review → approved | revise | rejected`; revision/rejection requires a rationale and resubmission returns to `submitted`. Client readiness requires a diagnostic, 12 modules, three approved evidence items, an approved challenge and approved Demo Day. Only a future trusted backend may authorize those states or issue a certificate.

The adapter documents `GET /v1/learner/me`, `PUT /v1/learner/me`, `POST /v1/evidence` and the planned `POST /v1/diagnostics` seam. This repository does not include the API server. See the foundation guide before connecting one.

## Production readiness boundary

This remains a static prototype. Real authentication, authorization, shared persistence, secure evidence storage, server-side facilitator review, AI, payments, email, analytics and certificate issuance are not implemented. The migration is a scaffold and has no production row-level policies. Before using real learner records, select an identity provider and backend, implement verified roles and tenant isolation, private storage, audited state transitions, retention/export/deletion, monitoring and backup/restore. Complete accessibility and security reviews before launch.

## Release

GitHub Pages serves the static frontend. `.github/workflows` runs release checks and Pages deployment. Check both workflow runs after merging to `main`; Pages deployment can finish after the commit is available. See [CHANGELOG.md](./CHANGELOG.md) and [docs/PRODUCTION-FOUNDATION.md](./docs/PRODUCTION-FOUNDATION.md).
