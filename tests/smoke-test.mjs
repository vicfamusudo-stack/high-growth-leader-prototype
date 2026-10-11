// Dependency-free smoke checks for the public V12 static experience.
// Run: node tests/smoke-test.mjs
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = p => readFileSync(new URL('../'+p, import.meta.url), 'utf8');
for (const p of ['index.html','admin.html','feedback.html','v11.html','README.md','backend/schema.sql','docs/V12-API.md']) assert.ok(existsSync(new URL('../'+p,import.meta.url)), 'Missing '+p);
const html=read('index.html');
for (const token of ['V12','assessment','evidence','consent','demo mode','localStorage','review']) assert.ok(html.toLowerCase().includes(token.toLowerCase()), 'Main experience missing '+token);
assert.ok(!/supabaseKey\s*[:=]\s*['"][^'"]+/.test(html), 'Possible committed API key');
const schema=read('backend/schema.sql');
for (const token of ['evidence_items','audit_events','certificates','consent_records','cohort_memberships']) assert.ok(schema.includes(token), 'Schema missing '+token);
const admin=read('admin.html');
assert.ok(admin.includes('V12') || admin.includes('V11'), 'Admin page should be version-labelled');
console.log('V12 smoke checks passed: routes/assets, demo disclosure, evidence, privacy, schema and secret-pattern checks.');
