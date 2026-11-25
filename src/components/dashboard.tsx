'use client';
import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CalendarRange,
  Layers,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  CalendarCheck,
  GitFork,
  TableProperties,
  Handshake,
  Building2,
  Users,
  MessagesSquare,
  Images,
  X,
  Menu,
  Search,
  Download,
  Clock3,
  TrendingUp,
  FilePenLine,
  ExternalLink,
  Target,
  AlertTriangle,
  FileCheck2,
  CalendarDays,
  ClipboardCheck,
  FileText,
  UsersRound,
  Mail,
  Phone,
  Eye,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import {
  cifrasOficiales,
  hitosHojaRuta,
  mesasReales,
  sesionesReales,
  arbolesProblemasReal,
  correspondenciaCooperantesMesas,
  perfilesCooperantes,
  reunionesCooperantesReales,
  espaciosDialogoReales,
} from '@/data/minam-real';
import { cn } from '@/lib/utils';
import { officialTreeFor } from '@/data/official-trees';
import ProblemTreeView from './problem-tree';
import MilestoneTimeline from './milestone-timeline';
import GovernanceLibrary from './governance-library';
import DialogueGallery from './dialogue-gallery';
import { photosForDialogue } from '@/data/dialogue-photos';
import { sourcesForMesa, sourcesForTree } from '@/data/evidence';
import { driveFile, driveFolder, mesaFolders, treeFiles, diagnosisFiles, meetingCounts, diagnosisDates, diagnosisCooperation, diagnosisProblems } from '@/data/documentary';
import { Button, Card, Input, Select, Textarea, Pill } from './ui';

function statusTone(st: string): 'success' | 'warning' | 'danger' | 'neutral' {
  if (/cumplido|aprobada|aprobado|finalizado|entregado|realizada|activo|confirmado/i.test(st)) return 'success';
  if (/vencid|retraso|rojo|retrasado/i.test(st)) return 'danger';
  if (/pendiente|curso|revisi|elaboraci|validaci|programad|ámbar|convocatoria/i.test(st)) return 'warning';
  return 'neutral';
}

function cooperatorBadgeClass(org: string) {
  if (org.includes('Banco Mundial')) return 'bg-[#e8f1fb] text-[#1b5597] border-[#bdd5f2]';
  if (org.includes('BID')) return 'bg-[#e7f7f3] text-[#0d735a] border-[#bfeade]';
  if (org.includes('Unión Europea')) return 'bg-[#fff7e6] text-[#b36b00] border-[#ffe0a3]';
  if (org.includes('GIZ')) return 'bg-[#f5eefc] text-[#6d2f9c] border-[#dec4f7]';
  if (org.includes('SERVIR')) return 'bg-[#fbeeed] text-[#b52d24] border-[#f5c6c2]';
  return 'bg-[#edf4f8] text-[#3b5e71] border-[#cddce4]';
}

function Heading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
      <div>
        <h1 className="text-2xl font-bold text-ink md:text-[26px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Kpi({
  title,
  value,
  detail,
  icon: Icon,
  color = 'green',
}: {
  title: string;
  value: string | number;
  detail?: string;
  icon: typeof TrendingUp;
  color?: 'green' | 'blue' | 'gold' | 'red';
}) {
  return (
    <Card className="relative min-h-[120px] overflow-hidden p-5 border-t-[3px] border-t-pine">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-muted">{title}</span>
        <span
          className={cn(
            'rounded-lg p-2',
            color === 'green'
              ? 'bg-[#e8f5ee] text-pine'
              : color === 'red'
              ? 'bg-[#fcece9] text-[#ad554d]'
              : color === 'gold'
              ? 'bg-[#fff3e1] text-[#a9792d]'
              : 'bg-[#edf4f8] text-ocean'
          )}
        >
          <Icon size={17} />
        </span>
      </div>
      <div className="mt-2 text-2xl font-bold leading-none text-ink md:text-[28px]">{value}</div>
      {detail && <p className="mt-2 text-xs text-muted">{detail}</p>}
    </Card>
  );
}

function Empty({ message = 'No se encontraron registros' }: { message?: string }) {
  return <div className="p-10 text-center text-sm text-muted">{message}</div>;
}

function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="scroll-table">
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const ALL_SECTIONS = [
  'cronograma',
  'ayuda-memoria',
  'mesas',
  'sesiones',
  'arboles-problemas',
  'diagnosticos',
  'cuadro-correspondencia',
  'cooperantes',
  'reuniones-cooperantes',
  'espacios-dialogo',
  'gobernanza',
  'resumen',
  'actualizar',
];

export default function Dashboard({ section = 'cronograma' }: { section?: string }) {
  const active = ALL_SECTIONS.includes(section) ? section : 'cronograma';

  const [menuOpen, setMenuOpen] = useState(false);
  const [mesasOpen, setMesasOpen] = useState(true);
  const [cooperantesOpen, setCooperantesOpen] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [cooperanteFilter, setCooperanteFilter] = useState('all');
  const [dialogoFilter, setDialogoFilter] = useState<'todos' | 'realizados' | 'proximos'>('todos');
  const [galleryEventId, setGalleryEventId] = useState<string | null>(null);
  const [mesaFilter, setMesaFilter] = useState('all');
  const [tipoSesionFilter, setTipoSesionFilter] = useState('all');
  const [tipoHitoFilter, setTipoHitoFilter] = useState<'todos' | 'realizados' | 'en-curso' | 'pendientes'>('todos');

  // Selected entities
  const [selectedMesaId, setSelectedMesaId] = useState(1);
  const [selectedTreeId, setSelectedTreeId] = useState('ARB-01');

  // Image viewer modal for PPT slides (Árboles y Actas)
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  // Form submission state
  const [formSaved, setFormSaved] = useState(false);

  const isMesaSub = ['mesas', 'sesiones', 'arboles-problemas', 'diagnosticos', 'cuadro-correspondencia'].includes(active);
  const isCoopSub = ['cooperantes', 'reuniones-cooperantes'].includes(active);

  // Filtered lists
  const filteredHitos = useMemo(() => {
    return hitosHojaRuta.filter((h) => {
      if (tipoHitoFilter === 'realizados') return h.tipo === 'Realizado';
      if (tipoHitoFilter === 'en-curso') return h.tipo === 'En Curso';
      if (tipoHitoFilter === 'pendientes') return h.tipo === 'Pendiente';
      return true;
    }).filter((h) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return h.titulo.toLowerCase().includes(q) || h.descripcion.toLowerCase().includes(q) || h.entidadResponsable.toLowerCase().includes(q);
    });
  }, [tipoHitoFilter, search]);

  const filteredMesas = useMemo(() => {
    return mesasReales.filter((m) => {
      if (cooperanteFilter !== 'all' && !m.cooperante.toLowerCase().includes(cooperanteFilter.toLowerCase())) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        m.nombre.toLowerCase().includes(q) ||
        m.lider.toLowerCase().includes(q) ||
        m.integrantes.some((ing) => ing.toLowerCase().includes(q)) ||
        m.cooperante.toLowerCase().includes(q)
      );
    });
  }, [cooperanteFilter, search]);

  const selectedMesa = useMemo(() => {
    return mesasReales.find((m) => m.id === selectedMesaId) || mesasReales[0];
  }, [selectedMesaId]);

  const filteredSesiones = useMemo(() => {
    return sesionesReales.filter((s) => {
      if (mesaFilter !== 'all' && s.mesaId !== Number(mesaFilter)) return false;
      if (tipoSesionFilter !== 'all' && s.tipo !== tipoSesionFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return s.tema.toLowerCase().includes(q) || s.mesaNombre.toLowerCase().includes(q) || s.participantes.toLowerCase().includes(q);
    });
  }, [mesaFilter, tipoSesionFilter, search]);

  const currentTree = useMemo(() => {
    return arbolesProblemasReal.find((a) => a.id === selectedTreeId) || arbolesProblemasReal[0];
  }, [selectedTreeId]);
  const officialTree = officialTreeFor(currentTree.id);

  const filteredCorrespondencia = useMemo(() => {
    return correspondenciaCooperantesMesas.filter((c) => {
      if (cooperanteFilter !== 'all' && c.organismoCooperante !== cooperanteFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        c.mesaNombre.toLowerCase().includes(q) ||
        c.profesionalResponsable.toLowerCase().includes(q) ||
        c.liderMINAM.toLowerCase().includes(q) ||
        c.alcanceApoyo.toLowerCase().includes(q)
      );
    });
  }, [cooperanteFilter, search]);

  const filteredPerfiles = useMemo(() => {
    return perfilesCooperantes.filter((p) => {
      // BID está disponible en reuniones y correspondencia, pero no en el directorio.
      // Si se navegó aquí con BID seleccionado en otra vista, mostrar el directorio completo.
      if (cooperanteFilter !== 'all' && cooperanteFilter !== 'BID' && !p.organismo.toLowerCase().includes(cooperanteFilter.toLowerCase())) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        p.nombre.toLowerCase().includes(q) ||
        p.cargo.toLowerCase().includes(q) ||
        p.perfilProfesional.toLowerCase().includes(q) ||
        p.mesasAsignadas.toLowerCase().includes(q)
      );
    });
  }, [cooperanteFilter, search]);

  const filteredReuniones = useMemo(() => {
    return reunionesCooperantesReales.filter((r) => {
      if (cooperanteFilter !== 'all' && !r.organismo.toLowerCase().includes(cooperanteFilter.toLowerCase())) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        r.tema.toLowerCase().includes(q) ||
        r.acuerdos.toLowerCase().includes(q) ||
        r.participantesMINAM.toLowerCase().includes(q) ||
        r.tipo.toLowerCase().includes(q)
      );
    });
  }, [cooperanteFilter, search]);

  const filteredEspacios = useMemo(() => {
    return espaciosDialogoReales.filter((e) => {
      if (dialogoFilter === 'realizados' && e.estado !== 'Realizado') return false;
      if (dialogoFilter === 'proximos' && e.estado !== 'Programado') return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        e.grupoActor.toLowerCase().includes(q) ||
        e.objetivo.toLowerCase().includes(q) ||
        e.participantes.toLowerCase().includes(q) ||
        e.fecha.includes(q)
      );
    });
  }, [dialogoFilter, search]);

  return (
    <div className="flex min-h-screen bg-canvas font-sans text-ink">
      {/* Mobile overlay */}
      {menuOpen && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ========================================================= */}
      {/* SIDEBAR INSTITUCIONAL                                     */}
      {/* ========================================================= */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-border bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header con Logo MINAM oficial */}
        <div className="border-b border-border px-5 py-6 bg-white">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="group block focus:outline-none" onClick={() => setMenuOpen(false)}>
              <Image
                src="/minam.jpg"
                alt="Ministerio del Ambiente - MINAM"
                width={195}
                height={42}
                priority
                className="h-auto w-full max-w-[190px] object-contain transition-opacity group-hover:opacity-90"
              />
              <div className="mt-4 text-sm font-semibold text-ink">
                Modernización Institucional
              </div>
            </Link>
            <button
              className="ml-auto rounded-lg p-1 text-muted hover:bg-canvas lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4">
          {/* GRUPO 1: CRONOGRAMA */}
          <div>
            <p className="px-2 pb-1.5 text-[11px] font-semibold text-muted uppercase">
              Planificación
            </p>
            <Link
              href="/cronograma"
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition',
                active === 'cronograma' || active === 'resumen'
                  ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                  : 'border-l-[3px] border-transparent font-medium text-[#42555b] hover:bg-[#f1f6f5] hover:text-ink'
              )}
            >
              <CalendarRange size={17} />
              <span>Cronograma</span>
            </Link>
            <div className="ml-3.5 mt-1 border-l-2 border-[#dbe6e4] pl-2.5">
              <Link
                href="/ayuda-memoria"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                  active === 'ayuda-memoria'
                    ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                    : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                )}
              >
                <FileText size={15} />
                <span>Ayuda Memoria</span>
              </Link>
            </div>
          </div>

          {/* GRUPO 2: MESAS DE TRABAJO (ACORDEÓN) */}
          <div>
            <p className="px-2 pb-1.5 text-[11px] font-semibold text-muted uppercase">
              Mesas Técnicas
            </p>

            <button
              type="button"
              onClick={() => setMesasOpen((o) => !o)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition',
                isMesaSub ? 'bg-[#f0f6f4] text-pine font-semibold' : 'text-[#42555b] hover:bg-[#f1f6f5] hover:text-ink'
              )}
            >
              <div className="flex items-center gap-2.5">
                <Layers size={17} />
                <span>Mesas de trabajo</span>
              </div>
              {mesasOpen ? <ChevronDown size={15} className="text-muted" /> : <ChevronRight size={15} className="text-muted" />}
            </button>

            {mesasOpen && (
              <div className="ml-3.5 mt-1 space-y-0.5 border-l-2 border-[#dbe6e4] pl-2.5">
                <Link
                  href="/mesas"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                    active === 'mesas'
                      ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                      : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                  )}
                >
                  <LayoutGrid size={15} />
                  <span>Información General</span>
                </Link>

                <Link
                  href="/sesiones"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                    active === 'sesiones'
                      ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                      : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                  )}
                >
                  <CalendarCheck size={15} />
                  <span>Sesiones</span>
                </Link>

                <Link
                  href="/arboles-problemas"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                    active === 'arboles-problemas'
                      ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                      : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                  )}
                >
                  <GitFork size={15} />
                  <span>Árboles de Problemas</span>
                </Link>

                <Link
                  href="/cuadro-correspondencia"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                    active === 'cuadro-correspondencia'
                      ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                      : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                  )}
                >
                  <TableProperties size={15} />
                  <span>Cuadro de Correspondencia</span>
                </Link>
              </div>
            )}
          </div>

          {/* GRUPO 3: COOPERANTES (ACORDEÓN) */}
          <div>
            <p className="px-2 pb-1.5 text-[11px] font-semibold text-muted uppercase">
              Cooperación
            </p>

            <button
              type="button"
              onClick={() => setCooperantesOpen((o) => !o)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-medium transition',
                isCoopSub ? 'bg-[#f0f6f4] text-pine font-semibold' : 'text-[#42555b] hover:bg-[#f1f6f5] hover:text-ink'
              )}
            >
              <div className="flex items-center gap-2.5">
                <Handshake size={17} />
                <span>Cooperantes</span>
              </div>
              {cooperantesOpen ? <ChevronDown size={15} className="text-muted" /> : <ChevronRight size={15} className="text-muted" />}
            </button>

            {cooperantesOpen && (
              <div className="ml-3.5 mt-1 space-y-0.5 border-l-2 border-[#dbe6e4] pl-2.5">
                <Link
                  href="/cooperantes"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                    active === 'cooperantes'
                      ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                      : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                  )}
                >
                  <Building2 size={15} />
                  <span>Listado de Cooperantes</span>
                </Link>

                <Link
                  href="/reuniones-cooperantes"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-2 text-[12.5px] transition',
                    active === 'reuniones-cooperantes'
                      ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                      : 'border-l-[3px] border-transparent font-medium text-[#4f646a] hover:bg-[#f1f6f5] hover:text-ink'
                  )}
                >
                  <Users size={15} />
                  <span>Reuniones con Cooperantes</span>
                </Link>
              </div>
            )}
          </div>

          {/* GRUPO 4: ESPACIOS DE DIÁLOGO */}
          <div>
            <p className="px-2 pb-1.5 text-[11px] font-semibold text-muted uppercase">
              Participación
            </p>
            <Link
              href="/espacios-dialogo"
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition',
                active === 'espacios-dialogo'
                  ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                  : 'border-l-[3px] border-transparent font-medium text-[#42555b] hover:bg-[#f1f6f5] hover:text-ink'
              )}
            >
              <MessagesSquare size={17} />
              <span>Espacios de Diálogo</span>
            </Link>
          </div>

          {/* DOCUMENTOS DE GOBERNANZA DEL PROCESO */}
          <div>
            <p className="px-2 pb-1.5 text-[11px] font-semibold text-muted uppercase">
              Documentos de Gobernanza de Proceso
            </p>
            <Link
              href="/gobernanza"
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition',
                active === 'gobernanza'
                  ? 'border-l-[3px] border-pine bg-[#e7f3ef] font-semibold text-pine'
                  : 'border-l-[3px] border-transparent font-medium text-[#42555b] hover:bg-[#f1f6f5] hover:text-ink'
              )}
            >
              <FileCheck2 size={17} />
              <span>Documentos de Gobernanza</span>
            </Link>
          </div>

          {/* ACTUALIZAR AVANCES */}
          <div className="pt-2">
            <Link
              href="/actualizar"
              onClick={() => setMenuOpen(false)}
              className={cn(
                'flex items-center gap-2.5 rounded-lg border border-[#dce7e4] bg-[#fafcfc] px-3 py-2 text-[12.5px] transition hover:border-pine/40',
                active === 'actualizar' ? 'border-pine bg-[#e7f3ef] font-semibold text-pine' : 'font-medium text-[#3d5359]'
              )}
            >
              <FilePenLine size={16} className="text-pine" />
              <span>Actualizar avances</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* CONTENIDO PRINCIPAL                                       */}
      {/* ========================================================= */}
      <div className="min-w-0 flex-1">
        {/* Header superior limpio */}
        <header className="sticky top-0 z-20 flex min-h-[64px] items-center justify-between border-b border-border bg-white px-5 md:px-9">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-canvas lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
              <Menu size={22} />
            </button>
            <div>
              <p className="text-[11px] font-medium text-muted">
                Ministerio del Ambiente · Modernización Institucional
              </p>
              <p className="text-sm font-semibold text-ink">
                {active === 'cronograma' || active === 'resumen'
                  ? 'Cronograma Institucional y Hoja de Ruta'
                  : active === 'mesas'
                  ? 'Mesas de Trabajo: Información General'
                  : active === 'sesiones'
                  ? 'Mesas de Trabajo: Sesiones Realizadas'
                  : active === 'arboles-problemas'
                  ? 'Mesas de Trabajo: Árboles de Problemas'
                  : active === 'diagnosticos'
                  ? 'Mesas de Trabajo: Diagnósticos Preliminares'
                  : active === 'cuadro-correspondencia'
                  ? 'Cuadro de Correspondencia: Mesas y Cooperantes'
                  : active === 'cooperantes'
                  ? 'Cooperantes: Directorio de Especialistas'
                  : active === 'reuniones-cooperantes'
                  ? 'Cooperantes: Registro de Reuniones'
                  : active === 'espacios-dialogo'
                  ? 'Espacios de Diálogo Multiactor'
                  : active === 'gobernanza'
                  ? 'Documentos de Gobernanza de Proceso'
                  : active === 'ayuda-memoria'
                  ? 'Ayuda Memoria del Proceso de Modernización'
                  : 'Registro y Actualización de Avance'}
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1510px] px-5 pb-14 pt-7 md:px-9">
          {/* ========================================================= */}
          {/* VISTA 1: CRONOGRAMA                                       */}
          {/* ========================================================= */}
          {(active === 'cronograma' || active === 'resumen') && (
            <>
              <Heading
                title="Cronograma de Modernización e Hitos del Sector Ambiente"
                subtitle="Decreto Supremo N.° 012-2026-MINAM · Plazo total de 120 días calendario (17/09/2026 al 15/01/2027)"
                action={
                  <Link href="/actualizar">
                    <Button><FilePenLine size={16} /> Actualizar avance</Button>
                  </Link>
                }
              />

              {/* KPI CARDS CON CIFRAS OFICIALES */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Kpi
                  title="Mesas de Trabajo"
                  value={cifrasOficiales.mesasTrabajo}
                  detail="SG y Viceministerios"
                  icon={Layers}
                  color="green"
                />
                <Kpi
                  title="Reuniones del proceso"
                  value={57}
                  detail="35 formulación · 11 ministro · 11 aprobación"
                  icon={CalendarDays}
                  color="blue"
                />
                <Kpi
                  title="Sesiones con Ministro"
                  value={cifrasOficiales.sesionesMinistro}
                  detail="Validación directa en Despacho"
                  icon={Target}
                  color="green"
                />
                <Kpi
                  title="Árboles y Diagnósticos"
                  value={cifrasOficiales.arbolesAprobados}
                  detail="100% formalizados en actas"
                  icon={ClipboardCheck}
                  color="gold"
                />
                <Kpi
                  title="Socios Cooperantes"
                  value={cifrasOficiales.cooperantes}
                  detail="BM, BID, UE, GIZ, SERVIR"
                  icon={Handshake}
                  color="blue"
                />
              </div>

              {/* CRONOGRAMA INTERACTIVO: FILTRO POR REALIZADOS Y PENDIENTES */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-lg border border-border bg-white p-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setTipoHitoFilter('todos')}
                    className={cn(
                      'rounded-md px-3.5 py-1.5 text-xs font-semibold transition',
                      tipoHitoFilter === 'todos' ? 'bg-pine text-white' : 'text-muted hover:text-ink'
                    )}
                  >
                    Todos los hitos ({hitosHojaRuta.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoHitoFilter('realizados')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition',
                      tipoHitoFilter === 'realizados' ? 'bg-pine text-white' : 'text-muted hover:text-ink'
                    )}
                  >
                    <CheckCircle2 size={14} /> Hitos realizados ({hitosHojaRuta.filter(h => h.tipo === 'Realizado').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoHitoFilter('en-curso')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition',
                      tipoHitoFilter === 'en-curso' ? 'bg-pine text-white' : 'text-muted hover:text-ink'
                    )}
                  >
                    <Clock3 size={14} /> En curso ({hitosHojaRuta.filter(h => h.tipo === 'En Curso').length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoHitoFilter('pendientes')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition',
                      tipoHitoFilter === 'pendientes' ? 'bg-pine text-white' : 'text-muted hover:text-ink'
                    )}
                  >
                    <Clock3 size={14} /> Pendientes ({hitosHojaRuta.filter(h => h.tipo === 'Pendiente').length})
                  </button>
                </div>

                <div className="relative w-full max-w-xs">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar hito o responsable..."
                    className="pl-9 h-9 text-xs"
                  />
                </div>
              </div>

              <MilestoneTimeline milestones={filteredHitos} />
            </>
          )}

          {/* ========================================================= */}
          {/* DOCUMENTO DE SEGUIMIENTO: AYUDA MEMORIA                   */}
          {/* ========================================================= */}
          {active === 'ayuda-memoria' && (
            <>
              <Heading
                title="Ayuda Memoria"
                subtitle="Reorganización MINAM · Estado de avance · Lima, 23 de noviembre de 2026"
              />
              <Card className="overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5 md:p-6">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="rounded-lg bg-[#eaf4f0] p-3 text-pine"><FileText size={22}/></div>
                    <div>
                      <h2 className="text-base font-semibold text-ink">Ayuda Memoria · Reorganización MINAM</h2>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        Documento recibido en formato Word. Vista previa íntegra de 5 páginas en PDF.
                      </p>
                      <p className="mt-1 text-xs text-muted">Última versión proporcionada: 25/11/2026</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a href="/documentos/ayuda-memoria-23-11-2026.docx"
                      download="Ayuda_Memoria_vff.docx"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pine px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest">
                      <Download size={16} /> Descargar Word
                    </a>
                    <a href="/documentos/ayuda-memoria-23-11-2026.pdf"
                      download="Ayuda_Memoria_23-11-2026.pdf"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-canvas">
                      <Download size={16} /> Descargar PDF
                    </a>
                  </div>
                </div>
                <div className="bg-[#f3f6f5] px-3 py-4 md:px-6 md:py-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#36554a]">Vista previa del documento</span>
                    <a href="/documentos/ayuda-memoria-23-11-2026.pdf" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-pine underline-offset-2 hover:underline">
                      Abrir PDF en otra pestaña <ExternalLink size={14}/>
                    </a>
                  </div>
                  <iframe
                    src="/documentos/ayuda-memoria-23-11-2026.pdf#view=FitH"
                    title="Vista previa de Ayuda Memoria, 23 de noviembre de 2026"
                    className="h-[68vh] min-h-[430px] w-full rounded-md border border-[#d8e3de] bg-white md:h-[79vh]"
                    loading="lazy"
                  />
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    Si tu navegador no permite visualizar el PDF integrado, ábrelo en otra pestaña o descarga el archivo Word original.
                  </p>
                </div>
              </Card>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 2: MESAS DE TRABAJO - INFORMACIÓN GENERAL           */}
          {/* ========================================================= */}
          {active === 'mesas' && (
            <>
              <Heading
                title="Mesas de Trabajo: Información General"
                subtitle="Ejes temáticos, directores y líderes responsables, integrantes acreditados por órgano y acompañamiento técnico internacional"
                action={
                  <Link href="/actualizar">
                    <Button>
                      <FilePenLine size={16} /> Actualizar avance
                    </Button>
                  </Link>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Mesas Técnicas" value={mesasReales.length} detail="Ejes temáticos en operación" icon={Layers} color="green" />
                <Kpi title="Árboles de Problemas" value="12 aprobados" detail="Mesa 11 cuenta con 2 árboles" icon={GitFork} color="blue" />
                <Kpi title="Diagnósticos Preliminares" value="12 concluidos" detail="100% formalizados en actas" icon={FileCheck2} color="green" />
                <Kpi title="Cooperantes Asignados" value="5 organismos" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="gold" />
              </div>

              {/* Filtros */}
              <Card className="mb-6 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por mesa, líder o integrante..."
                      className="pl-9 h-10 text-xs"
                    />
                  </div>
                  <Select
                    value={cooperanteFilter}
                    onChange={(e) => setCooperanteFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todos los Cooperantes</option>
                    <option value="Banco Mundial">Banco Mundial</option>
                    <option value="BID">Banco Interamericano de Desarrollo (BID)</option>
                    <option value="Unión Europea">Unión Europea</option>
                    <option value="GIZ">Cooperación Alemana (GIZ)</option>
                    <option value="SERVIR">SERVIR</option>
                  </Select>
                </div>
              </Card>

              <div className="record-list mb-8">
                <div className="record-list-head"><span>Mesas de trabajo</span><span>{filteredMesas.length} registros</span></div>
                {filteredMesas.map(m => (
                  <div key={m.id} className={cn('record-strip mesa-strip', selectedMesaId===m.id && 'record-active')}>
                    <div className="record-number"><span>MESA</span><strong>{String(m.id).padStart(2,'0')}</strong></div>
                    <div className="record-main">
                      <h3>{m.nombre}</h3>
                      <p className="record-meta">Líder: {m.lider}</p>
                      <p className="record-summary">{m.estadoTrabajo}</p>
                    </div>
                    <div className="record-side">
                      <span className="record-label">Cooperante</span><span className="font-medium">{m.cooperante}</span>
                      <span className="record-meta mt-2 inline-flex items-center gap-1"><UsersRound size={14}/> {m.integrantes.length} integrantes</span>
                      <span className="record-meta inline-flex items-center gap-1 text-pine"><CheckCircle2 size={14}/> Árbol aprobado</span>
                    </div>
                    <button type="button" className="record-action" aria-pressed={selectedMesaId===m.id} onClick={()=>{setSelectedMesaId(m.id);document.getElementById('detalle-mesa-seleccionada')?.scrollIntoView({behavior:'smooth',block:'start'});}}>Ver detalle <ChevronRight size={16}/></button>
                  </div>
                ))}
                {filteredMesas.length===0 && <Empty/>}
              </div>

              {/* DETALLE AMPLIADO DE LA MESA SELECCIONADA */}
              <Card id="detalle-mesa-seleccionada" className="scroll-mt-24 p-6 bg-white border-2 border-[#d5e7e1]">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <span className="rounded bg-pine text-white px-2.5 py-0.5 text-xs font-bold">
                      FICHA TÉCNICA · MESA {selectedMesa.id}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-ink">{selectedMesa.nombre}</h2>
                    <p className="mt-1 text-xs text-muted">
                      Líder del MINAM: <strong className="text-ink">{selectedMesa.lider}</strong>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={cn('rounded border px-3 py-1 text-xs font-semibold', cooperatorBadgeClass(selectedMesa.cooperante))}>
                      Cooperante: {selectedMesa.cooperante}
                    </span>
                    {selectedMesa.imagenArbol && (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setPreviewImage({
                            url: selectedMesa.imagenArbol!,
                            title: `Árbol de Problemas Aprobado · Mesa ${selectedMesa.id}`,
                            subtitle: selectedMesa.nombre,
                          })
                        }
                      >
                        <Eye size={15} /> Ver árbol
                      </Button>
                    )}
                    {selectedMesa.imagenActa && (
                      <Button
                        variant="secondary"
                        onClick={() =>
                          setPreviewImage({
                            url: selectedMesa.imagenActa!,
                            title: `Acta de Reunión y Diagnóstico · Mesa ${selectedMesa.id}`,
                            subtitle: selectedMesa.nombre,
                          })
                        }
                      >
                        <Eye size={15} /> Ver acta
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                      Integrantes y Órganos Acreditados ({selectedMesa.integrantes.length})
                    </h3>
                    <ul className="mt-3 space-y-2 text-xs">
                      {selectedMesa.integrantes.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 rounded-lg bg-[#f9fbfa] border border-[#e4eeec] px-3 py-2 text-ink">
                          <span className="h-2 w-2 rounded-full bg-pine shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                      Estado Oficial de los Trabajos y Acuerdos
                    </h3>
                    <div className="mt-3 rounded-lg border border-[#e0ece8] bg-[#fbfdfc] p-4 text-xs leading-relaxed text-[#26443c]">
                      {selectedMesa.estadoTrabajo}
                      <p className="mt-3 border-t border-border pt-3"><strong>Problema identificado:</strong> {diagnosisProblems[selectedMesa.id-1]}</p>
                      <p className="mt-2"><strong>Aprobación del diagnóstico:</strong> {diagnosisDates[selectedMesa.id-1]}</p>
                      <p className="mt-2"><strong>Reuniones del proceso:</strong> {meetingCounts[selectedMesa.id-1]}</p>
                      <p className="mt-2"><strong>Cooperante según informe parcial:</strong> {diagnosisCooperation[selectedMesa.id-1]}</p>
                      <p className="mt-2 text-muted">Fuente: Informe N.° 000544-2026-SG-OGPP-OPM.</p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-border p-3">
                        <span className="text-[11px] text-muted">Árbol de Problemas</span>
                        <p className="mt-1 text-sm font-bold text-pine flex items-center gap-1.5">
                          <CheckCircle2 size={16} /> Aprobado en Acta
                        </p>
                      </div>
                      <div className="rounded-lg border border-border p-3">
                        <span className="text-[11px] text-muted">Diagnóstico Preliminar</span>
                        <p className="mt-1 text-sm font-bold text-pine flex items-center gap-1.5">
                          <CheckCircle2 size={16} /> Concluido y Elevado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 3: MESAS DE TRABAJO - SESIONES                      */}
          {/* ========================================================= */}
          {active === 'sesiones' && (
            <>
              <Heading
                title="Mesas de Trabajo: Sesiones Realizadas"
                subtitle="Resumen del informe parcial y registros disponibles de las sesiones"
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Reuniones del proceso" value={57} detail="Informe parcial de los 70 días" icon={CalendarDays} color="green" />
                <Kpi title="Formulación de árboles" value={35} icon={GitFork} color="blue" />
                <Kpi title="Reuniones con el ministro" value={11} icon={Target} color="green" />
                <Kpi title="Aprobación de diagnósticos" value={11} icon={FileCheck2} color="gold" />
              </div>

              {/* Filtros */}
              <Card className="mb-6 p-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por tema o participante..."
                      className="pl-9 h-10 text-xs"
                    />
                  </div>

                  <Select
                    value={mesaFilter}
                    onChange={(e) => setMesaFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todas las Mesas</option>
                    {mesasReales.map((m) => (
                      <option key={m.id} value={m.id}>
                        Mesa {m.id}: {m.nombre.slice(0, 40)}...
                      </option>
                    ))}
                  </Select>

                  <Select
                    value={tipoSesionFilter}
                    onChange={(e) => setTipoSesionFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todos los Tipos de Sesión</option>
                    <option value="Sesión de Mesa">Sesión de Mesa</option>
                    <option value="Sesión con Ministro">Sesión con Ministro</option>
                    <option value="Validación IDP">Validación IDP</option>
                    <option value="Coordinación Cooperante">Coordinación Cooperante</option>
                  </Select>
                </div>
              </Card>

              {/* TABLA DE SESIONES */}
              <Card className="overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-bold text-ink">Registro Cronológico de Sesiones Oficiales</h2>
                </div>
                <Table headers={['Código', 'Mesa / Instancia', 'Fecha', 'Tipo de Sesión', 'Tema Principal de la Sesión', 'Participantes', 'Estado / Documento']}>
                  {filteredSesiones.map((s) => (
                    <tr key={s.id}>
                      <td className="font-semibold text-pine whitespace-nowrap">{s.id}</td>
                      <td className="whitespace-nowrap font-medium text-xs">
                        {s.mesaId === 0 ? s.mesaNombre : "Mesa " + s.mesaId}
                      </td>
                      <td className="whitespace-nowrap text-xs text-muted">{s.fecha}</td>
                      <td className="whitespace-nowrap text-xs">
                        <span
                          className={cn(
                            'rounded px-2 py-0.5 text-[11px] font-semibold',
                            s.tipo === 'Sesión con Ministro'
                              ? 'bg-[#fbeeed] text-[#b52d24]'
                              : s.tipo === 'Coordinación Cooperante'
                              ? 'bg-[#e8f1fb] text-[#1b5597]'
                              : 'bg-[#edf5f1] text-[#1c644f]'
                          )}
                        >
                          {s.tipo}
                        </span>
                      </td>
                      <td className="min-w-[280px] text-xs leading-relaxed text-ink">{s.tema}</td>
                      <td className="min-w-[180px] text-xs text-muted">{s.participantes}</td>
                      <td className="whitespace-nowrap">
                        {s.imagenActa ? (
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewImage({
                                url: s.imagenActa!,
                                title: "Acta Oficial · " + s.mesaNombre,
                                subtitle: s.tema,
                              })
                            }
                            className="inline-flex items-center gap-1 rounded bg-[#eaf4f0] px-2.5 py-1 text-xs font-semibold text-pine hover:bg-pine hover:text-white transition"
                          >
                            <Eye size={13} /> Ver acta
                          </button>
                        ) : (
                          <Pill tone={statusTone(s.estado)}>{s.estado}</Pill>
                        )}
                      </td>
                    </tr>
                  ))}
                </Table>
                {filteredSesiones.length === 0 && <Empty />}
              </Card>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 4: MESAS DE TRABAJO - ÁRBOLES DE PROBLEMAS          */}
          {/* ========================================================= */}
          {active === 'arboles-problemas' && (
            <>
              <Heading
                title="Árboles de Problemas por Mesa Técnica"
                subtitle="Diagnóstico metodológico causa-efecto de los 12 árboles aprobados formalmente en actas para la modernización del MINAM"
              />

              {/* Selector de Árboles (12 árboles) */}
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="mr-2 text-xs font-semibold text-muted uppercase">Árbol aprobado:</span>
                {arbolesProblemasReal.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedTreeId(a.id)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                      selectedTreeId === a.id
                        ? 'bg-pine text-white shadow-xs'
                        : 'border border-border bg-white text-muted hover:bg-canvas hover:text-ink'
                    )}
                  >
                    Mesa {a.mesaId} {a.id.includes('11') ? (a.id.endsWith('A') ? '(RRHH)' : '(Integridad)') : ''}
                  </button>
                ))}
              </div>

              {/* Encabezado del Árbol seleccionado */}
              <Card className="mb-6 p-5 border-l-4 border-l-pine bg-white">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-pine uppercase tracking-wider">
                      MESA {currentTree.mesaId} · {currentTree.id}
                    </span>
                    <h2 className="mt-1 text-lg font-bold text-ink">{officialTree.titulo}</h2>
                    <p className="text-xs text-muted mt-1">
                      Fecha de aprobación en acta: {currentTree.fechaAprobacion} · {currentTree.estado}
                    </p>
                  </div>
                  <a href={driveFile(treeFiles[currentTree.mesaId === 11 && !currentTree.id.endsWith('A') ? 11 : currentTree.mesaId-1])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-pine"><ExternalLink size={15}/> Ver documento</a>
                </div>
              </Card>

              <ProblemTreeView key={officialTree.id} tree={officialTree} sources={sourcesForTree(officialTree.id)} />
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 5: MESAS DE TRABAJO - DIAGNÓSTICOS                  */}
          {/* ========================================================= */}
          {active === 'diagnosticos' && (
            <>
              <Heading
                title="Mesas de Trabajo: Diagnósticos Preliminares"
                subtitle="Informes oficiales aprobados en actas de sesión para la modernización institucional y nuevo ROF"
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Diagnósticos Preliminares" value="12" detail="Aprobados por las mesas" icon={FileCheck2} color="green" />
                <Kpi title="Mesas Técnicas" value="11 mesas" detail="SG y Viceministerios" icon={Layers} color="blue" />
                <Kpi title="Sesiones de Formulación" value="35 sesiones" detail="Ciclo 09 al 15 de octubre" icon={CalendarDays} color="green" />
                <Kpi title="Acompañamiento Técnico" value="5 cooperantes" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="gold" />
              </div>

              <Card className="overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-bold text-ink">Registro de diagnósticos preliminares</h2>
                  <p className="mt-1 text-xs text-muted">Fuente: Informe N.° 000544-2026-SG-OGPP-OPM, cuadro 2.</p>
                </div>
                <Table headers={['Mesa', 'Eje Temático', 'Líder MINAM', 'Cooperante según informe', 'Problema identificado', 'Aprobación', 'Diagnóstico', 'Acta Oficial']}>
                  {mesasReales.map((m) => (
                    <tr key={m.id}>
                      <td className="font-semibold text-pine whitespace-nowrap">Mesa {String(m.id).padStart(2, '0')}</td>
                      <td className="min-w-[260px] font-medium text-xs text-ink">{m.nombre}</td>
                      <td className="min-w-[180px] text-xs text-muted">{m.lider}</td>
                      <td className="whitespace-nowrap">
                        <span className="text-sm font-medium text-ink">
                          {diagnosisCooperation[m.id-1]}
                        </span>
                      </td>
                      <td className="min-w-[260px] text-xs leading-relaxed text-muted">{diagnosisProblems[m.id-1]}</td>
                      <td className="whitespace-nowrap">{diagnosisDates[m.id-1]}</td>
                      <td className="whitespace-nowrap">
                        {sourcesForMesa(m.id) && (
                          <a href={sourcesForMesa(m.id)!.narrative} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-pine"><ExternalLink size={14}/> Ver diagnóstico</a>
                        )}
                      </td>
                      <td className="whitespace-nowrap">
                        {diagnosisFiles[m.id] ? (
                          <a href={driveFile(diagnosisFiles[m.id])} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-pine"><ExternalLink size={14}/> Ver acta</a>
                        ) : m.imagenActa ? (
                          <button
                            type="button"
                            onClick={() =>
                              setPreviewImage({
                                url: m.imagenActa!,
                                title: "Acta Oficial · Mesa " + m.id,
                                subtitle: m.nombre,
                              })
                            }
                            className="inline-flex items-center gap-1 rounded bg-[#eaf4f0] px-2.5 py-1 text-xs font-semibold text-pine hover:bg-pine hover:text-white transition"
                          >
                            <Eye size={13} /> Ver acta
                          </button>
                        ) : (
                          <a href={driveFolder(mesaFolders[m.id-1])} target="_blank" rel="noopener noreferrer" className="text-pine underline">Consultar carpeta</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 6: CUADRO DE CORRESPONDENCIA                        */}
          {/* ========================================================= */}
          {active === 'cuadro-correspondencia' && (
            <>
              <Heading
                title="Cuadro de Correspondencia entre Cooperantes y Mesas"
                subtitle="Correspondencia por mesa y organismo, actualizada con el documento de integrantes, cooperantes y estado recibido el 21/11/2026"
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Mesas Asistidas" value="11 mesas" detail="100% con cooperante" icon={TableProperties} color="green" />
                <Kpi title="Organismos Cooperantes" value="5 organismos" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="blue" />
                <Kpi title="Vínculos de Cooperación" value={correspondenciaCooperantesMesas.length} detail="Incluye apoyos múltiples en mesas 7 y 11" icon={Users} color="green" />
                <Kpi title="Corte Documental" value="20/11/2026" detail="Últimos avances consignados" icon={CalendarDays} color="gold" />
              </div>

              {/* Filtro */}
              <Card className="mb-6 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por mesa, consultor o alcance..."
                      className="pl-9 h-10 text-xs"
                    />
                  </div>
                  <Select
                    value={cooperanteFilter}
                    onChange={(e) => setCooperanteFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todos los Cooperantes</option>
                    <option value="Banco Mundial">Banco Mundial (5 mesas)</option>
                    <option value="BID">BID (3 mesas)</option>
                    <option value="Unión Europea">Unión Europea (2 mesas)</option>
                    <option value="GIZ">GIZ (2 mesas + diálogo)</option>
                    <option value="SERVIR">SERVIR (Mesa 11)</option>
                  </Select>
                </div>
              </Card>

              {/* TABLA DE CORRESPONDENCIA */}
              <Card className="overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-bold text-ink">Matriz de Asignación y Acompañamiento Técnico Internacional</h2>
                  <p className="mt-1 text-xs text-muted">Fuente: «Mesas de trabajo: integrantes, cooperantes y estado» (archivo recibido el 21/11/2026, con registros hasta el 20/11). Las Mesas 7 y 11 tienen dos organismos; el apoyo metodológico de GIZ a la Mesa 5 no se presenta como reasignación formal.</p>
                </div>
                <Table headers={['Mesa', 'Eje Temático', 'Líder MINAM', 'Organismo Cooperante', 'Profesional Responsable', 'Alcance del Apoyo Técnico', 'Últimos Avances']}>
                  {filteredCorrespondencia.map((c) => (
                    <tr key={c.mesaId + '-' + c.organismoCooperante}>
                      <td className="font-semibold text-pine whitespace-nowrap">Mesa {c.mesaId}</td>
                      <td className="min-w-[220px] font-medium text-xs text-ink">{c.mesaNombre}</td>
                      <td className="min-w-[170px] text-xs text-muted">{c.liderMINAM}</td>
                      <td className="whitespace-nowrap">
                        <span className={cn('rounded border px-2.5 py-0.5 text-xs font-semibold', cooperatorBadgeClass(c.organismoCooperante))}>
                          {c.organismoCooperante}
                        </span>
                      </td>
                      <td className="min-w-[190px] text-xs font-semibold text-ink">
                        {c.profesionalResponsable}
                        {c.contacto && <span className="block font-normal text-muted text-[11px] mt-0.5">{c.contacto}</span>}
                      </td>
                      <td className="min-w-[260px] text-xs leading-relaxed text-muted">{c.alcanceApoyo}</td>
                      <td className="min-w-[240px] text-xs leading-relaxed text-[#214c40] bg-[#f9fcfb]">{c.ultimosAvances}</td>
                    </tr>
                  ))}
                </Table>
                {filteredCorrespondencia.length === 0 && <Empty />}
              </Card>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 7: COOPERANTES - LISTADO                            */}
          {/* ========================================================= */}
          {active === 'cooperantes' && (
            <>
              <Heading
                title="Cooperantes: Directorio de Consultores y Especialistas"
                subtitle="Directorio de especialistas del Banco Mundial, Unión Europea y GIZ. Los integrantes del BID se consultan mediante su registro de reuniones."
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Organismos en Directorio" value="3 organismos" detail="Banco Mundial, UE y GIZ" icon={Building2} color="green" />
                <Kpi title="Especialistas Registrados" value={perfilesCooperantes.length} detail="Consultores y puntos focales del documento" icon={Users} color="blue" />
                <Kpi title="Mesas Técnicas Asesoradas" value="11 mesas" detail="Cobertura total del sector" icon={Layers} color="green" />
                <Kpi title="Modalidad de Apoyo" value="Asistencia Técnica" detail="Consultoría y coordinación institucional" icon={Handshake} color="gold" />
              </div>

              {/* Filtros */}
              <Card className="mb-6 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por especialista, cargo o especialidad..."
                      className="pl-9 h-10 text-xs"
                    />
                  </div>
                  <Select
                    value={cooperanteFilter === 'BID' ? 'all' : cooperanteFilter}
                    onChange={(e) => setCooperanteFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todos los Organismos</option>
                    <option value="Banco Mundial">Banco Mundial</option>
                    <option value="Unión Europea">Unión Europea</option>
                    <option value="GIZ">Cooperación Alemana (GIZ)</option>
                    <option value="SERVIR">SERVIR</option>
                  </Select>
                </div>
              </Card>

              <div className="record-list">
                <div className="record-list-head"><span>Directorio de especialistas</span><span>{filteredPerfiles.length} registros</span></div>
                {filteredPerfiles.map(p=>(
                  <details key={p.id} className="record-disclosure">
                    <summary className="record-strip profile-strip">
                      <div className="record-icon"><Users size={22}/></div>
                      <div className="record-main"><h3>{p.nombre}</h3><p className="record-meta">{p.cargo}</p></div>
                      <div className="record-side"><span className="record-label">Organismo</span><span className="font-medium">{p.organismo}</span><span className="record-meta">{p.mesasAsignadas}</span></div>
                      <span className="record-action">Ver detalle <ChevronDown size={16}/></span>
                    </summary>
                    <div className="record-expanded"><p className="text-sm leading-relaxed">{p.perfilProfesional}</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">{p.correo&&<a className="inline-flex items-center gap-2 text-pine underline" href={'mailto:'+p.correo}><Mail size={15}/>{p.correo}</a>}{p.telefono&&<span className="inline-flex items-center gap-2"><Phone size={15}/>{p.telefono}</span>}</div></div>
                  </details>
                ))}
                {filteredPerfiles.length===0&&<Empty/>}
              </div>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 8: COOPERANTES - REUNIONES                          */}
          {/* ========================================================= */}
          {active === 'reuniones-cooperantes' && (
            <>
              <Heading
                title="Cooperantes: Registro de Reuniones de Coordinación"
                subtitle="Bitácora cronológica de reuniones técnicas, mesas bilaterales con IPIs, ensayos y comités con organismos cooperantes"
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Reuniones Registradas" value={reunionesCooperantesReales.length} detail="Sesiones técnicas y bilaterales" icon={CalendarCheck} color="green" />
                <Kpi title="Institutos Articulados" value="4 IPIs" detail="SENAMHI, IIAP, INAIGEM, IGP" icon={Building2} color="blue" />
                <Kpi title="Organismos en Mesa" value="5 entidades" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="green" />
                <Kpi title="Corte Documental" value="20/11/2026" detail="Último avance consignado" icon={CalendarDays} color="gold" />
              </div>

              {/* Filtro */}
              <Card className="mb-6 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por tema, IPI o participantes..."
                      className="pl-9 h-10 text-xs"
                    />
                  </div>
                  <Select
                    value={cooperanteFilter}
                    onChange={(e) => setCooperanteFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todos los Organismos</option>
                    <option value="Banco Mundial">Banco Mundial</option>
                    <option value="BID">BID</option>
                    <option value="Unión Europea">Unión Europea</option>
                    <option value="GIZ">GIZ</option>
                    <option value="SERVIR">SERVIR</option>
                  </Select>
                </div>
              </Card>

              {/* TABLA DE REUNIONES CON COOPERANTES */}
              <Card className="overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-bold text-ink">Registro Detallado de Reuniones con la Cooperación</h2>
                </div>
                <Table headers={['Código', 'Fecha', 'Cooperante', 'Tipo de Reunión', 'Agenda / Tema Tratado', 'Acuerdos Principales', 'Representantes MINAM', 'Estado']}>
                  {filteredReuniones.map((r) => (
                    <tr key={r.id}>
                      <td className="font-semibold text-pine whitespace-nowrap">{r.id}</td>
                      <td className="whitespace-nowrap text-xs text-muted">{r.fecha}</td>
                      <td className="whitespace-nowrap">
                        <span className={cn('rounded border px-2 py-0.5 text-[11px] font-semibold', cooperatorBadgeClass(r.organismo))}>
                          {r.organismo}
                        </span>
                      </td>
                      <td className="whitespace-nowrap text-xs">
                        <span className="rounded bg-[#edf4f8] px-2 py-0.5 font-medium text-ocean">{r.tipo}</span>
                      </td>
                      <td className="min-w-[260px] text-xs leading-relaxed text-ink font-medium">{r.tema}</td>
                      <td className="min-w-[280px] text-xs leading-relaxed text-[#214c40] bg-[#f9fcfb]">{r.acuerdos}</td>
                      <td className="min-w-[180px] text-xs text-muted">{r.participantesMINAM}</td>
                      <td className="whitespace-nowrap">
                        <Pill tone={statusTone(r.estado)}>{r.estado}</Pill>
                      </td>
                    </tr>
                  ))}
                </Table>
                {filteredReuniones.length === 0 && <Empty />}
              </Card>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 9: ESPACIOS DE DIÁLOGO                              */}
          {/* ========================================================= */}
          {active === 'espacios-dialogo' && (
            <>
              <Heading
                title="Espacios de Diálogo Multiactor"
                subtitle="Agenda y resultados del 17 de noviembre al 11 de diciembre de 2026 · Facilitación por GIZ"
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Encuentros Realizados" value={espaciosDialogoReales.filter(e => e.estado === 'Realizado').length} detail="17, 19 y 20 de noviembre" icon={MessagesSquare} color="green" />
                <Kpi title="Próximos Encuentros" value={espaciosDialogoReales.filter(e => e.estado === 'Programado').length} detail="23 de noviembre al 11 de diciembre" icon={CalendarDays} color="blue" />
                <Kpi title="Asistentes Reportados" value="55" detail="41 jóvenes y 14 de sociedad civil" icon={Users} color="green" />
                <Kpi title="Facilitación" value="GIZ" detail="OGASA coordina grupos indígenas" icon={Handshake} color="gold" />
              </div>

              <Card className="mb-5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar espacios de diálogo por estado">
                    {([
                      ['todos', 'Todos', espaciosDialogoReales.length],
                      ['realizados', 'Realizados', espaciosDialogoReales.filter(e => e.estado === 'Realizado').length],
                      ['proximos', 'Próximos', espaciosDialogoReales.filter(e => e.estado === 'Programado').length],
                    ] as const).map(([value, label, count]) => (
                      <button type="button" key={value} aria-pressed={dialogoFilter === value}
                        onClick={() => setDialogoFilter(value)}
                        className={cn('rounded-md border px-3 py-2 text-xs font-semibold transition',
                          dialogoFilter === value ? 'border-pine bg-pine text-white' : 'border-border bg-white text-muted hover:bg-canvas hover:text-ink'
                        )}>{label} ({count})</button>
                    ))}
                  </div>
                  <div className="relative w-full sm:max-w-xs">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <Input value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Buscar actor o fecha..." aria-label="Buscar espacios de diálogo" className="h-9 pl-9 text-xs" />
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  Fuente: Ayuda Memoria del 23 de noviembre de 2026, sección «Etapa participativa externa».
                  Los 14 asistentes de sociedad civil corresponden al total conjunto del 19 y 20 de noviembre.
                  Los espacios futuros se muestran como programados, no como realizados.
                </p>
              </Card>

              <div className="record-list">
                <div className="record-list-head"><span>Agenda de encuentros</span><span>{filteredEspacios.length} registros</span></div>
                {filteredEspacios.map(e=>(
                  <div key={e.id} className="dialogue-entry">
                    <details className="record-disclosure">
                      <summary className="record-strip dialogue-strip">
                        <div className="record-date"><CalendarDays size={19}/><strong>{e.fecha}</strong><span>{e.modalidad}</span></div>
                        <div className="record-main"><h3>{e.grupoActor}</h3><p className="record-summary">{e.objetivo}</p></div>
                        <div className="record-side"><Pill tone={statusTone(e.estado)}>{e.estado}</Pill><span className="record-label mt-2">Facilitación</span><span>{e.facilitacion}</span></div>
                        <span className="record-action">Ver detalle <ChevronDown size={16}/></span>
                      </summary>
                      <div className="record-expanded"><p className="record-label mb-1">Participantes y coordinación</p><p className="text-sm leading-relaxed">{e.participantes}</p><p className="mt-3 record-label">Descripción del espacio</p><p className="text-sm leading-relaxed">{e.objetivo}</p></div>
                    </details>
                    <div className="dialogue-gallery-actions">
                      <button
                        type="button"
                        data-dialogue-gallery={e.id}
                        onClick={() => setGalleryEventId(e.id)}
                        className="dialogue-gallery-button"
                        aria-label={'Abrir galería de ' + e.grupoActor}
                      >
                        <Images size={16} />
                        <span>Galería</span>
                        <span className="dialogue-gallery-count">
                          {photosForDialogue(e.id).length
                            ? photosForDialogue(e.id).length + (photosForDialogue(e.id).length === 1 ? ' foto' : ' fotos')
                            : 'Sin fotografías'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
                {filteredEspacios.length===0&&<Empty/>}
              </div>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 10: DOCUMENTOS DE GOBERNANZA                       */}
          {/* ========================================================= */}
          {active === 'gobernanza' && (
            <>
              <Heading
                title="Documentos de Gobernanza de Proceso"
                subtitle="Base normativa, lineamientos, instrumentos de gestión, actas de la Instancia Directiva y seguimiento documental del proceso"
              />
              <GovernanceLibrary />
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 11: ACTUALIZAR AVANCES                              */}
          {/* ========================================================= */}
          {active === 'actualizar' && (
            <div className="max-w-2xl mx-auto">
              <Heading
                title="Registro y Actualización de Avance"
                subtitle="Formulario institucional para consignar avances de mesas, acuerdos y sesiones técnicas"
              />

              <Card className="p-6 md:p-8 bg-white">
                {formSaved ? (
                  <div className="rounded-xl border border-[#cbe4dc] bg-[#f2faf7] p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e1f4ed] text-pine mb-3">
                      <CheckCircle2 size={24} />
                    </div>
                    <h2 className="text-base font-bold text-[#144b3c]">Registro Actualizado con Éxito</h2>
                    <p className="mt-1 text-xs text-muted">
                      El informe de avance ha sido registrado en el sistema local y se consolidará en el próximo reporte de 70 días.
                    </p>
                    <Button className="mt-5" onClick={() => setFormSaved(false)}>
                      Registrar otro avance
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e: FormEvent) => {
                      e.preventDefault();
                      setFormSaved(false);
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Mesa Técnica de Trabajo</label>
                      <Select defaultValue="1" required>
                        {mesasReales.map((m) => (
                          <option key={m.id} value={m.id}>
                            Mesa {m.id}: {m.nombre}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">Tipo de Evento o Avance</label>
                        <Select defaultValue="sesion">
                          <option value="sesion">Sesión Técnica de Mesa</option>
                          <option value="acuerdo">Acuerdo Formal con Acta</option>
                          <option value="cooperante">Reunión con Cooperante</option>
                          <option value="reforma">Propuesta de Medida de Reforma</option>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">Fecha del Registro</label>
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Título o Tema Principal</label>
                      <Input placeholder="Ej. Aprobación de matriz de duplicidades institucionales" required />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Descripción Detallada y Acuerdos Adoptados</label>
                      <Textarea placeholder="Describa el contenido técnico, los acuerdos suscritos y los próximos pasos..." required />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink mb-1.5">Responsable del Registro (MINAM / Órgano)</label>
                      <Input placeholder="Ej. Dirección General de Políticas e Instrumentos de Gestión Ambiental" required />
                    </div>

                    <div className="border-t border-border pt-5 flex items-center justify-end gap-3">
                      <Link href="/cronograma">
                        <Button variant="secondary" type="button">
                          Cancelar
                        </Button>
                      </Link>
                      <Button type="submit" disabled>
                        <FilePenLine size={16} /> Registro no habilitado
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL DE VISUALIZACIÓN DE LÁMINAS OFICIALES (PPTX)         */}
      {/* ========================================================= */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl overflow-hidden animate-in fade-in">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-white">
              <div>
                <h3 className="text-base font-bold text-ink">{previewImage.title}</h3>
                {previewImage.subtitle && (
                  <p className="text-xs text-muted mt-0.5">{previewImage.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink transition"
                  title="Abrir imagen en nueva pestaña"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="rounded-lg p-2 text-muted hover:bg-canvas hover:text-ink transition"
                  title="Cerrar visor"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal body: image container */}
            <div className="flex-1 overflow-auto bg-[#1b2529] p-4 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[75vh] w-auto max-w-full rounded object-contain shadow-lg"
              />
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between border-t border-border px-6 py-3 bg-white text-xs text-muted">
              <span>Fuente: Presentación de la Instancia Directiva del Proceso MINAM</span>
            </div>
          </div>
        </div>
      )}
      {galleryEventId && espaciosDialogoReales.find(e => e.id === galleryEventId) && (
        <DialogueGallery
          key={galleryEventId}
          title={espaciosDialogoReales.find(e => e.id === galleryEventId)!.grupoActor}
          date={espaciosDialogoReales.find(e => e.id === galleryEventId)!.fecha}
          photos={photosForDialogue(galleryEventId)}
          onClose={() => setGalleryEventId(null)}
        />
      )}
    </div>
  );
}
