# High Growth Leader™ V11 + V9 Deep Learning Academy + V8 Portal

Commercial validation and product-architecture prototype for the High Growth Leader™ adaptive leadership development system.

## V9 — Deep Learning Academy

A new expanded learning experience is available at **[course-v9.html](./course-v9.html)**.

V9 raises the teaching standard with full concept explanations, realistic worked examples, guided workplace application, common failure modes, knowledge checks with rationales, and evidence capture across 42 lessons. It retains the original 12 leadership modules and adds a complete 13th module: **Design, Build and Scale Your Digital Learning System**.

The new module teaches learners to convert classroom courses and professional development workshops into effective digital/blended learning, map modules to observable outcomes, compare learner-platform options, design immersive interactions, build assessment and quality-assurance pipelines, operate learner support, measure workplace transfer, and assess commercial sustainability.

## New pilot — Step-Away Test lesson

The first lesson using the lighter, learner-first visual system is available at **[step-away-pilot.html](./step-away-pilot.html)**.

The pilot includes:
- Warm light backgrounds, high-contrast text and restrained teal accents
- Clear learning outcomes and a concise concept explanation
- Four risk categories: People, Process, Decisions and Knowledge
- Cross-industry worked example
- Animated faceless pen-writing style demonstration
- Editable risk register with impact × dependency scoring
- Scenario-based knowledge check with feedback
- Seven-day workplace transfer experiment
- Local browser saving and JSON export of learner work

Companion Canva assets:
- **[Module 13: Build Your Digital Learning System](https://canva.link/a00qanweybuflzi)**
- **[Step-Away Test teaching deck](https://canva.link/8d4y9ayqai8io5i)**
- **[Step-Away Risk Register worksheet](https://canva.link/o992919lxlgwf85)**

The separate MP4 companion is currently a downloadable prototype asset; the inline animation on the pilot lesson is the version hosted in the academy. The MP4 has not yet been uploaded to the public website.

The V9 page and pilot are static prototypes: progress and notes are saved locally in the browser; they are not a production LMS or an accredited learning service.

## V8 — Adaptive Course Portal

A dedicated learner course experience is available at **[course.html](./course.html)**.

V8 course portal features:
- Diagnostic questionnaire and pathway recommendation
- Adaptive pathways: System Builder, AI-Powered Leader, People Multiplier and Scale Leader
- Full 12-module / 36-lesson academy map
- Lesson viewer with teaching, workplace application and AI practice
- Learner evidence capture and lesson completion
- Locally saved learner progress
- Evidence portfolio
- 30-Day Step-Away Challenge™ checkpoints
- Demo Day structure and System Builder rubric
- Learner-record JSON export

## V11 — Main platform prototype

The main site at `index.html` remains the V11 product architecture and commercial validation experience.

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
- `admin.html` provides a cohort-level demonstration console
- Pathway distribution
- Evidence review queue
- Demo Day pipeline
- Certification governance model
- Permission model for learner, facilitator, programme admin and system admin

### Reviewer
- `feedback.html` provides an external validation experience focused on proposition, diagnosis, personalisation, evidence governance, facilitation and commercial viability.

## Important prototype boundary

V8 course portal, V9 academy, pilot lesson and V11 platform are static, backend-free prototypes. Learner state is stored only in the current browser using localStorage. No learner data is transmitted to a server. The facilitator console uses demonstration data and is not connected to individual learner records.

Do not use these static prototypes for real learner records, sensitive data or live certification decisions.

## Production boundary

A production release still needs:
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
14. Target-LMS mapping and course import testing

## Static deployment

- `index.html` — main V11 learner/product prototype
- `course-v9.html` — V9 deep learning academy with 13 modules / 42 lessons
- `step-away-pilot.html` — light-theme pilot lesson with interactive practice and faceless animation
- `course.html` — V8 adaptive course portal
- `admin.html` — facilitator/admin demonstration
- `feedback.html` — external reviewer experience

The existing GitHub Pages workflow deploys the repository as a static site.
