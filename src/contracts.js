/** @typedef {'system-builder'|'multiplier-leader'|'strategic-leader'} PathwayId */
/** @typedef {{id:string, dimensions:Record<string,number>, total:number, pathway:PathwayId, scoringVersion:string, completedAt:string}} Diagnostic */
/** @typedef {'submitted'|'in_review'|'revise'|'approved'|'rejected'} EvidenceStatus */
/** @typedef {{id:string, artefact:string, impact:string, reflection:string, status:EvidenceStatus, createdAt:string, updatedAt:string, reviewerNote?:string}} Evidence */
/** @typedef {{id:string, responsibility:string, owner:string, baseline:string, result:string, status:'draft'|'submitted'|'in_review'|'approved'|'revise'}} Challenge */
/** @typedef {{profile:{name:string,role:string,outcome:string}, diagnostic:Diagnostic|null, completedModules:string[], evidence:Evidence[], challenge:Challenge|null, demoDay:'not_submitted'|'submitted'|'approved', consent:boolean, updatedAt:string}} LearnerRecord */
export const DIMENSIONS = Object.freeze(['dependency','ownership','systems','transfer','scale','continuity']);
export const EVIDENCE_TRANSITIONS = Object.freeze({submitted:['in_review'],in_review:['approved','revise','rejected'],revise:['submitted'],approved:[],rejected:['submitted']});
