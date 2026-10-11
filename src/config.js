/** @typedef {{mode:'demo'|'api', apiBaseUrl:string, storageKey:string}} AppConfig */
const mode = globalThis.__HGL_CONFIG__?.mode ?? 'demo';
const apiBaseUrl = globalThis.__HGL_CONFIG__?.apiBaseUrl ?? '';
if (!['demo', 'api'].includes(mode)) throw new Error('APP_MODE must be demo or api');
if (mode === 'api' && !apiBaseUrl) throw new Error('API_BASE_URL is required in api mode');
export const config = Object.freeze({ mode, apiBaseUrl, storageKey: 'hgl.v13.demo.v1' });
