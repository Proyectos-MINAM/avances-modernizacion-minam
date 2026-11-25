import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const file = fs.readFileSync('src/data/dialogue-photos.ts', 'utf8');
const entries = [...file.matchAll(/photo\('([^']+)',\s*'([^']+)'\)/g)].map(m=>({name:m[1],id:m[2]}));
assert.equal(entries.length,15,'Deben estar las 15 fotografías identificadas en Drive');
assert.equal(new Set(entries.map(e=>e.name)).size,15,'Nombres repetidos');
assert.equal(new Set(entries.map(e=>e.id)).size,15,'IDs de Drive repetidos');
const names=fs.readdirSync('public/galerias').filter(n=>n.endsWith('.jpeg'));
assert.equal(names.length,15,'El directorio público debe contener exactamente las 15 fotografías');
for(const {name} of entries){
  const full=path.join('public','galerias',name);
  assert(fs.existsSync(full),'Falta '+name);
  const data=fs.readFileSync(full);
  assert(data.length>1000,'Archivo JPEG vacío '+name);
  assert(data[0]===0xff&&data[1]===0xd8&&data[data.length-2]===0xff&&data[data.length-1]===0xd9,'JPEG inválido '+name);
}
assert.deepEqual([...names].sort(),entries.map(x=>x.name).sort(),'Hay archivos huérfanos o faltantes');
console.log('PASS 15/15 archivos JPEG íntegros, 15 nombres e IDs de Drive únicos, sin huérfanos');
