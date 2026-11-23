'use client';

import { useMemo, useState } from 'react';
import type { HitoHojaRuta } from '@/data/minam-real';
import { ArrowRight, CalendarClock, CalendarDays, CheckCircle2, Clock3, ExternalLink, FilterX, Landmark, Users } from 'lucide-react';
import { driveFile } from '@/data/documentary';

const labels: Record<string, string> = {
  '2026-07': 'Julio 2026', '2026-08': 'Agosto 2026',
  '2026-09': 'Septiembre 2026', '2026-10': 'Octubre 2026',
  '2026-11': 'Noviembre 2026', '2026-12': 'Diciembre 2026',
  '2027-01': 'Enero 2027', '2027': 'Posterior / por definir',
};

const monthKey = (fecha: string) => /^\d{4}-\d{2}/.test(fecha) ? fecha.slice(0, 7) : fecha.slice(0, 4);
const formatDate = (fecha: string) => /^\d{4}-\d{2}-\d{2}$/.test(fecha)
  ? new Date(fecha + 'T12:00:00').toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' })
  : fecha.replace(' al ', '–');
const statusLabel = (tipo: HitoHojaRuta['tipo']) =>
  tipo === 'Realizado' ? 'Realizado' : tipo === 'En Curso' ? 'En Curso' : 'Pendiente / previsto';
const statusDetail = (tipo: HitoHojaRuta['tipo']) =>
  tipo === 'Realizado' ? 'Registrado como realizado' : tipo === 'En Curso' ? 'Registrado en curso' : 'Registrado como pendiente';

export default function MilestoneTimeline({ milestones }: { milestones: HitoHojaRuta[] }) {
  const [month, setMonth] = useState('all');
  const [selected, setSelected] = useState<number | null>(null);
  const months = useMemo(() => Array.from(new Set(milestones.map(h => monthKey(h.fecha)))), [milestones]);
  const visible = useMemo(() => milestones.filter(h => month === 'all' || monthKey(h.fecha) === month), [milestones, month]);
  const current = visible.find(h => h.numero === selected) ?? visible[0];
  const completed = milestones.filter(h => h.tipo === 'Realizado').length;
  const ratio = milestones.length ? Math.round(completed * 100 / milestones.length) : 0;

  return <section className="milestone-shell" aria-label="Línea de Tiempo Proceso de Modernización MINAM">
    <div className="milestone-top">
      <div className="milestone-heading">
        <span className="milestone-eyebrow"><CalendarClock size={14} /> Ruta del proceso</span>
        <h2>Línea de Tiempo Proceso de Modernización MINAM</h2>
        <p>Explora los hitos por mes y selecciona una actividad para revisar su responsable, descripción y estado registrado.</p>
      </div>
      <div className="milestone-progress" aria-label={completed + ' de ' + milestones.length + ' hitos registrados como realizados'}>
        <div><strong>{completed}</strong><span> / {milestones.length} realizados</span></div>
        <div className="milestone-progress-track"><span style={{ width: ratio + '%' }} /></div>
        <small>Estado del registro, no avance físico del proceso</small>
      </div>
    </div>

    <div className="milestone-months" role="group" aria-label="Filtrar por mes">
      <button type="button" aria-pressed={month === 'all'} className={month === 'all' ? 'is-active' : ''} onClick={() => { setMonth('all'); setSelected(null); }}>
        <span>Todos</span><strong>{milestones.length}</strong>
      </button>
      {months.map(key => {
        const count = milestones.filter(h => monthKey(h.fecha) === key).length;
        return <button key={key} type="button" aria-pressed={month === key} className={month === key ? 'is-active' : ''} onClick={() => { setMonth(key); setSelected(null); }}>
          <span>{labels[key] ?? key}</span><strong>{count}</strong>
        </button>;
      })}
    </div>

    {visible.length === 0 ? <div className="milestone-empty"><FilterX size={22} /><p>No hay hitos que coincidan con los filtros actuales.</p></div> :
      <div className="milestone-body">
        <div className="milestone-list" aria-label="Seleccionar hito">
          {visible.map((h, i) => <button
            key={h.numero} type="button" data-hito={h.numero} aria-pressed={current?.numero === h.numero}
            onClick={() => setSelected(h.numero)}
            className={'milestone-event ' + (current?.numero === h.numero ? 'is-selected ' : '') + (h.tipo === 'Realizado' ? 'is-done' : h.tipo === 'En Curso' ? 'is-in-progress' : 'is-upcoming')}
          >
            <span className="milestone-event-track" aria-hidden="true"><span>{h.tipo === 'Realizado' ? <CheckCircle2 size={17} /> : h.tipo === 'En Curso' ? <Clock3 size={17} /> : String(h.numero).padStart(2, '0')}</span>{i < visible.length - 1 && <i />}</span>
            <span className="milestone-event-body">
              <span className="milestone-event-date">{formatDate(h.fecha)} <em>{statusLabel(h.tipo)}</em></span>
              <strong>{h.titulo}</strong>
              <span className="milestone-event-org">{h.entidadResponsable}</span>
            </span>
            <ArrowRight size={17} className="milestone-event-arrow" aria-hidden="true" />
          </button>)}
        </div>

        {current && <article className="milestone-detail" aria-live="polite">
          <div className="milestone-detail-index"><span>HITO {String(current.numero).padStart(2, '0')}</span><span className={current.tipo === 'Realizado' ? 'done' : current.tipo === 'En Curso' ? 'in-progress' : 'pending'}>{statusDetail(current.tipo)}</span></div>
          <div className="milestone-detail-date"><CalendarDays size={17} /> {formatDate(current.fecha)}</div>
          <h3>{current.titulo}</h3>
          <p>{current.descripcion}</p>
          <div className="milestone-detail-org"><Users size={18}/><span><small>Responsable registrado</small><strong>{current.entidadResponsable}</strong></span></div>
          <div className="milestone-detail-source"><Landmark size={17}/><span>Verifica el estado y las fechas con el cronograma oficial.</span></div>
          <a href={driveFile('1EcNQ6CqNCZPwBHqVn9dVEvFX1knW5Wnd')} target="_blank" rel="noopener noreferrer" className="milestone-source-link">
            Consultar lineamientos en Drive <ExternalLink size={15}/>
          </a>
        </article>}
      </div>}
    <p className="milestone-footnote">Las fechas corresponden a los registros de seguimiento. Los hitos previstos no deben interpretarse como ejecutados. El cronograma fuente y los estados operativos requieren conciliación continua.</p>
  </section>;
}
