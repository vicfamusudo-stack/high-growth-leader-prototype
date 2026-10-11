import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const html=await readFile('index.html','utf8');
assert.match(html,/<html lang="en">/);assert.match(html,/src\/app\.js/);assert.match(html,/Skip to main content/);assert.match(html,/Demo mode/);
for(const id of ['diagnostic','pathway','evidence','certification'])assert.match(html,new RegExp(`id="${id}"`));
for(const path of ['src/config.js','src/contracts.js','src/scoring.js','src/workflow.js','src/service.js'])await readFile(path,'utf8');
for(const path of ['src/app.js','src/config.js','src/contracts.js','src/scoring.js','src/workflow.js','src/service.js']){
  const {spawnSync}=await import('node:child_process');const result=spawnSync(process.execPath,['--check',path],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);
}
console.log('V13 structure and accessible entry points verified');
