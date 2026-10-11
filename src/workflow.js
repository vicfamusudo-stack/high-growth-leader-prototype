import { EVIDENCE_TRANSITIONS } from './contracts.js';
export function validateSubmission({artefact,impact}) { return Boolean(artefact?.trim() && impact?.trim() && impact.trim().length >= 20); }
export function transitionEvidence(evidence, next, reviewerNote='') {
  if (!EVIDENCE_TRANSITIONS[evidence?.status]?.includes(next)) throw new Error(`Invalid evidence transition: ${evidence?.status} → ${next}`);
  if (['revise','rejected'].includes(next) && !reviewerNote.trim()) throw new Error('A reviewer note is required for revision or rejection.');
  return {...evidence,status:next,updatedAt:new Date().toISOString(),...(reviewerNote?{reviewerNote:reviewerNote.trim()}:{})};
}
export function certificationGates(record) {
  return { diagnostic:Boolean(record.diagnostic), modules:record.completedModules.length >= 12, approvedEvidence:record.evidence.filter(e=>e.status==='approved').length >= 3, challenge:record.challenge?.status==='approved', demoDay:record.demoDay==='approved' };
}
export function isCertificationReady(record) { return Object.values(certificationGates(record)).every(Boolean); }
