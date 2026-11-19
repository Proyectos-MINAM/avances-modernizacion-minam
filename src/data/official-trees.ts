import m1 from './trees/m1.json';
import m2 from './trees/m2.json';
import m3 from './trees/m3.json';
import m4 from './trees/m4.json';
import m5 from './trees/m5.json';
import m6 from './trees/m6.json';
import m7 from './trees/m7.json';
import m8 from './trees/m8.json';
import m9 from './trees/m9.json';
import m10 from './trees/m10.json';
import m11rrhh from './trees/m11rrhh.json';
import m11oii from './trees/m11oii.json';
export type TreeNode = {id:string;type:string;level:number;label:string;description:string;organo:string;ejeTematico:string;fuente:string;evidencia?:string;textoOriginal?:string};
export type ProblemTree = {id:string;mesa:string;eje:string;problemaCentral:string;notaProblemaCentral?:string;titulo:string;archivoOrigen:string;problemaCentralId:string;nodes:TreeNode[];edges:{id:string;source:string;target:string;label?:string}[]};
// sergioalayo/arboles-minam, data/arboles.json, blob 1c71facc3fa0da3814fbb23c7fccc40d30338a23
export const officialTrees:ProblemTree[]=[m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11rrhh,m11oii];
export const officialTreeFor=(id:string)=>officialTrees.find(t=>t.id===(id==='ARB-11A'?'m11rrhh':id==='ARB-11B'?'m11oii':'m'+Number(id.replace('ARB-',''))))??officialTrees[0];
export const treeCsv=()=>officialTrees.flatMap(t=>t.nodes.map(n=>({mesa:t.mesa,id:n.id,tipo:n.type,nivel:n.level,descripcion:n.description,organo:n.organo,fuente:n.fuente,conexiones:t.edges.filter(e=>e.source===n.id).map(e=>e.target).join(' | ')})));
