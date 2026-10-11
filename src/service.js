import { config } from './config.js';
const emptyRecord = () => ({profile:{name:'',role:'',outcome:''},diagnostic:null,completedModules:[],evidence:[],challenge:null,demoDay:'not_submitted',consent:false,updatedAt:new Date().toISOString()});
/** Adapter boundary. Demo writes are browser-local; API mode requires a real backend. */
export function createLearnerService({fetchImpl=fetch, storage=localStorage}={}) {
  const api = async (path, options={}) => { const response=await fetchImpl(`${config.apiBaseUrl}${path}`,{...options,headers:{'Content-Type':'application/json',...options.headers}}); if(!response.ok) throw new Error(`Service request failed (${response.status})`); return response.status===204?null:response.json(); };
  const demoRead=()=>{try{return {...emptyRecord(),...JSON.parse(storage.getItem(config.storageKey)??'{}')}}catch{return emptyRecord()}};
  return {
    mode:config.mode,
    async load(){return config.mode==='demo'?demoRead():api('/v1/learner/me')},
    async save(record){record.updatedAt=new Date().toISOString();if(config.mode==='demo'){storage.setItem(config.storageKey,JSON.stringify(record));return record}return api('/v1/learner/me',{method:'PUT',body:JSON.stringify(record)})},
    async submitEvidence(input){if(config.mode==='demo')return null;return api('/v1/evidence',{method:'POST',body:JSON.stringify(input)})}
  };
}
