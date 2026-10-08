# High Growth Leader™ V11

Commercial validation and product-architecture prototype for the High Growth Leader™ adaptive leadership development system.

## V11 experience

### Learner
- Six-dimension High Growth Leadership Index™
- Evidence-based pathway recommendation: System Builder, Multiplier Leader, Strategic Leader
- Local persistent learner state using browser localStorage
- Profile, role, company and measurable growth outcome
- Personalised dashboard
- 12-module adaptive academy
- Evidence submission and evidence status
- Step-Away Challenge™ workflow
- In-house Demo Day submission
- Certification gates
- Learner-record JSON export

### Facilitator / Admin
- admin.html provides a cohort-level demonstration console
- Pathway distribution
- Evidence review queue
- Demo Day pipeline
- Certification governance model
- Permission model for learner, facilitator, programme admin and system admin

### Reviewer
- feedback.html provides an external validation experience focused on proposition, diagnosis, personalisation, evidence governance, facilitation and commercial viability.

## Important prototype boundary

V11 is intentionally static and backend-free.

The learner record is persisted only in the browser using localStorage. No learner data is transmitted to a server. The facilitator console uses demonstration data and is not connected to individual learner records.

This makes V11 safe for demonstrations while keeping the product architecture clear.

## V12 production boundary

The next production layer should introduce:
1. Authentication and role-based access control
2. Secure database-backed learner, cohort and pathway records
3. Secure evidence/file storage
4. Facilitator approval / revise / reject workflow
5. Audit trail for evidence and certification decisions
6. Real cohort management
7. Email and calendar integrations
8. Analytics and outcome measurement
9. Payment / subscription infrastructure
10. Certificate issuance and verification
11. AI-powered diagnostic explanation and personalised recommendations
12. Privacy, consent, retention and deletion controls
13. Accessibility and security testing

## Static deployment

index.html is the learner entry point.

admin.html is the facilitator/admin demonstration.

feedback.html is the external reviewer experience.

The existing GitHub Pages workflow deploys the repository as a static site.
