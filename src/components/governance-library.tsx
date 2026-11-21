'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, FileText, FolderOpen, Search, ShieldCheck, Layers, Clock3, FileCheck2 } from 'lucide-react';
import { allGovernanceDocuments, type GovernanceKind } from '@/data/governance';

const kinds: GovernanceKind[] = ['Normativa', 'Lineamientos', 'Operación', 'Seguimiento', 'Actas IDP'];

export default function GovernanceLibrary() {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<string>('Todos');
  const documents = useMemo(() => allGovernanceDocuments.filter(d => {
    const matchesKind = kind === 'Todos' || d.kind === kind;
    const q = query.toLowerCase().trim();
    return matchesKind && (!q || [d.title, d.detail, d.kind, d.version ?? ''].join(' ').toLowerCase().includes(q));
  }), [query, kind]);

  return <section>
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      <div className="governance-stat"><ShieldCheck/><span><strong>Base normativa</strong><small>Marco del proceso</small></span></div>
      <div className="governance-stat"><Layers/><span><strong>Instrumentos de gestión</strong><small>Lineamientos y programación</small></span></div>
      <div className="governance-stat"><FileCheck2/><span><strong>{allGovernanceDocuments.length} referencias</strong><small>Documentos y actas identificados</small></span></div>
    </div>
    <div className="governance-filterbar">
      <div className="governance-search"><Search size={17}/><input aria-label="Buscar documento de gobernanza" placeholder="Buscar documento o tipo de instrumento..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
      <div className="governance-filters" role="group" aria-label="Filtrar documentos por categoría">
        {['Todos', ...kinds].map(v=><button type="button" aria-pressed={kind===v} key={v} className={kind===v?'is-active':''} onClick={()=>setKind(v)}>{v}</button>)}
      </div>
    </div>
    <div className="governance-list">
      <div className="governance-list-header"><span>Repositorio documental</span><span>{documents.length} referencias</span></div>
      {documents.map(d=><article className="governance-item" key={d.id}>
        <div className="governance-document-icon">{/folders\//.test(d.url)?<FolderOpen size={20}/>:<FileText size={20}/>}</div>
        <div className="governance-document-text">
          <div className="governance-tags"><span>{d.kind}</span>{d.version&&<span>{d.version}</span>}</div>
          <h3>{d.title}</h3>
          <p>{d.detail}</p>
          {d.note&&<p className="governance-caution"><Clock3 size={13}/>{d.note}</p>}
        </div>
        <a href={d.url} target="_blank" rel="noopener noreferrer" aria-label={'Abrir ' + d.title + ' en Drive'}>Abrir en Drive <ExternalLink size={15}/></a>
      </article>)}
      {documents.length===0&&<p className="governance-empty">No hay documentos que coincidan con esta búsqueda.</p>}
    </div>
    <p className="governance-footer">Inventario de enlaces existentes en el Drive institucional. La presencia de un archivo no acredita su aprobación ni su vigencia; los documentos con versiones diferentes están señalados.</p>
  </section>;
}
