import { DIMENSIONS } from './contracts.js';
export const SCORING_VERSION = 'hgli-1.0';
const ROUTES = Object.freeze({dependency:'system-builder',ownership:'multiplier-leader',systems:'system-builder',transfer:'multiplier-leader',scale:'strategic-leader',continuity:'strategic-leader'});
/** Scores six 1-5 responses and routes the lowest dimension to its pathway. */
export function scoreDiagnostic(answers) {
  const entries = Object.entries(answers ?? {});
  if (entries.length !== DIMENSIONS.length || DIMENSIONS.some(key => !Number.isInteger(answers[key]) || answers[key] < 1 || answers[key] > 5)) throw new TypeError('Answer every diagnostic dimension with an integer from 1 to 5.');
  const dimensions = Object.fromEntries(DIMENSIONS.map(key => [key, answers[key]]));
  const lowest = DIMENSIONS.reduce((a,b) => dimensions[a] <= dimensions[b] ? a : b);
  return { id: crypto.randomUUID(), dimensions, total: Object.values(dimensions).reduce((a,b)=>a+b,0), pathway: ROUTES[lowest], scoringVersion: SCORING_VERSION, completedAt: new Date().toISOString() };
}
