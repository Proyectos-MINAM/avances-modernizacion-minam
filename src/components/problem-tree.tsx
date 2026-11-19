'use client';
import {useState} from 'react';
import type {ProblemTree,TreeNode} from '@/data/official-trees';
import {ArrowUp,ChevronRight,ChevronDown,X,Maximize2,Minimize2} from 'lucide-react';

const levelName=(n:TreeNode)=>n.level===0?'Problema central':n.level===1?'Causa directa':n.level===2?'Causa indirecta':n.level>2?'Causa raíz':n.level===-1?'Efecto directo':n.level===-2?'Efecto indirecto':'Efecto final';

export default function ProblemTreeView({tree}:{tree:ProblemTree}){
  const [selected,setSelected]=useState<string|null>(null);
  const [expanded,setExpanded]=useState<Set<string>>(new Set());
  const [wide,setWide]=useState(false);
  const byId=new Map(tree.nodes.map(n=>[n.id,n]));
  const root=byId.get(tree.problemaCentralId)!;
  const children=(id:string,side:'cause'|'effect')=>tree.edges.filter(e=>side==='cause'?e.target===id:e.source===id).map(e=>byId.get(side==='cause'?e.source:e.target)).filter((n):n is TreeNode=>!!n&&(side==='cause'?n.level>0:n.level<0));
  const effects=children(root.id,'effect'),causes=children(root.id,'cause');
  const active=selected?byId.get(selected):undefined;
  const toggle=(id:string)=>setExpanded(prev=>{const next=new Set(prev);next.has(id)?next.delete(id):next.add(id);return next});
  function branch(n:TreeNode,side:'cause'|'effect',path:string[],index:number){
    const key=[...path,n.id].join('/'); if(path.includes(n.id))return null;
    const next=children(n.id,side),open=expanded.has(key);
    return <div key={key} className="min-w-0">
      <div className={'tree-card '+side+(selected===n.id?' is-selected':'')}>
        <button className="tree-card-main" onClick={()=>setSelected(n.id)} type="button">
          <span className="tree-card-label">{Math.abs(n.level)===1?(side==='cause'?'C':'E')+String(index+1).padStart(2,'0'):levelName(n)}</span>
          <span className="tree-card-title">{n.label}</span>
        </button>
        {next.length>0&&<button className="tree-card-expand" type="button" aria-expanded={open} onClick={()=>toggle(key)}>{open?<ChevronDown size={15}/>:<ChevronRight size={15}/>} {next.length} {next.length===1?'relación':'relaciones'}</button>}
      </div>
      {open&&next.length>0&&<div className="tree-nested">{next.map((c,i)=>branch(c,side,[...path,n.id],i))}</div>}
    </div>
  }
  function group(nodes:TreeNode[],side:'cause'|'effect'){
    const count=tree.nodes.filter(n=>side==='cause'?n.level>0:n.level<0).length;
    return <div className={'tree-group '+side}>
      <div className="tree-group-header"><span>{side==='cause'?'Causas':'Efectos'}</span><span className="text-xs font-normal text-muted">{nodes.length} directos · {count} nodos</span></div>
      <div className="tree-grid">{nodes.map((n,i)=>branch(n,side,[root.id],i))}</div>
    </div>;
  }
  return <section className={'tree-shell '+(wide?'tree-fullscreen':'')}>
    <div className="tree-toolbar">
      <div><h3 className="text-base font-semibold">Árbol de problemas</h3><p className="text-xs text-muted mt-1">{tree.nodes.length} nodos · {tree.edges.length} relaciones</p></div>
      <div className="flex flex-wrap items-center gap-2"><button className="tree-tool" onClick={()=>{setExpanded(new Set());setSelected(null)}}>Vista general</button><button className="tree-tool" onClick={()=>setWide(v=>!v)} aria-label={wide?'Salir de pantalla completa':'Pantalla completa'}>{wide?<Minimize2 size={16}/>:<Maximize2 size={16}/>} <span className="hidden sm:inline">{wide?'Salir':'Ampliar vista'}</span></button></div>
    </div>
    <div className="tree-layout">
      <div className="tree-diagram">
        {group(effects,'effect')}
        <div className="tree-connector"><ArrowUp size={18}/></div>
        <button className="tree-root" onClick={()=>setSelected(root.id)}><span className="tree-root-label">Problema central</span><span className="block text-base font-semibold leading-relaxed">{tree.problemaCentral}</span>{tree.notaProblemaCentral&&<span className="mt-2 block text-xs font-normal">{tree.notaProblemaCentral}</span>}</button>
        <div className="tree-connector"><ArrowUp size={18}/></div>
        {group(causes,'cause')}
      </div>
      {active&&<div className="tree-detail"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold uppercase text-pine">{levelName(active)}</p><button aria-label="Cerrar detalle" onClick={()=>setSelected(null)}><X size={18}/></button></div><h4 className="mt-3 font-semibold leading-relaxed">{active.description}</h4><dl className="mt-5 space-y-3 text-sm"><div><dt className="text-xs text-muted">Órgano</dt><dd>{active.organo}</dd></div><div><dt className="text-xs text-muted">Eje temático</dt><dd>{active.ejeTematico}</dd></div>{active.evidencia&&<div><dt className="text-xs text-muted">Evidencia</dt><dd>{active.evidencia}</dd></div>}<div><dt className="text-xs text-muted">Fuente</dt><dd>{active.fuente}</dd></div></dl><div className="mt-5 border-t border-border pt-4"><p className="text-xs font-semibold text-muted">Relaciones directas</p><div className="mt-2 space-y-2">{tree.edges.filter(e=>e.source===active.id||e.target===active.id).map(e=>{const other=byId.get(e.source===active.id?e.target:e.source)!;return <button key={e.id} className="block w-full rounded border border-border p-3 text-left text-sm hover:bg-canvas" onClick={()=>setSelected(other.id)}><span className="block text-xs text-muted">{levelName(other)}</span>{other.label}</button>})}</div></div></div>}
    </div>
    <div className="tree-footer">Fuente: {tree.archivoOrigen}.</div>
  </section>
}
