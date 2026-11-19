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
import { saveCsv, cn } from '@/lib/utils';
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
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
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
    <Card className="relative min-h-[120px] overflow-hidden p-5">
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
  'mesas',
  'sesiones',
  'arboles-problemas',
  'diagnosticos',
  'cuadro-correspondencia',
  'cooperantes',
  'reuniones-cooperantes',
  'espacios-dialogo',
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
  const [mesaFilter, setMesaFilter] = useState('all');
  const [tipoSesionFilter, setTipoSesionFilter] = useState('all');
  const [tipoHitoFilter, setTipoHitoFilter] = useState<'todos' | 'realizados' | 'pendientes'>('todos');

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

  const filteredCorrespondencia = useMemo(() => {
    return correspondenciaCooperantesMesas.filter((c) => {
      if (cooperanteFilter !== 'all' && !c.organismoCooperante.toLowerCase().includes(cooperanteFilter.toLowerCase())) return false;
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
      if (cooperanteFilter !== 'all' && !p.organismo.toLowerCase().includes(cooperanteFilter.toLowerCase())) return false;
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
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        e.grupoActor.toLowerCase().includes(q) ||
        e.objetivo.toLowerCase().includes(q) ||
        e.participantesEstimados.toLowerCase().includes(q)
      );
    });
  }, [search]);

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
        <div className="border-b border-border px-5 py-4 bg-white">
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
              <div className="mt-2 text-xs font-semibold text-pine">
                Modernización Institucional
              </div>
              <div className="text-[11px] text-muted">
                Sistema de Gestión y Seguimiento
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
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={() => saveCsv(hitosHojaRuta, 'cronograma-minam-oficial.csv')}>
                      <Download size={16} /> Exportar Hitos CSV
                    </Button>
                    <Link href="/actualizar">
                      <Button>
                        <FilePenLine size={16} /> Actualizar avance
                      </Button>
                    </Link>
                  </div>
                }
              />

              {/* KPI CARDS CON CIFRAS OFICIALES */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Kpi
                  title="Mesas de Trabajo"
                  value={cifrasOficiales.mesasTrabajo + " instaladas"}
                  detail="SG y Viceministerios"
                  icon={Layers}
                  color="green"
                />
                <Kpi
                  title="Sesiones con Mesas"
                  value={cifrasOficiales.sesionesMesas + " realizadas"}
                  detail="35 diagnóstico + 11 plenarias"
                  icon={CalendarDays}
                  color="blue"
                />
                <Kpi
                  title="Sesiones con Ministro"
                  value={cifrasOficiales.sesionesMinistro + " concluidas"}
                  detail="Validación directa en Despacho"
                  icon={Target}
                  color="green"
                />
                <Kpi
                  title="Árboles y Diagnósticos"
                  value={cifrasOficiales.arbolesAprobados + " aprobados"}
                  detail="100% formalizados en actas"
                  icon={ClipboardCheck}
                  color="gold"
                />
                <Kpi
                  title="Socios Cooperantes"
                  value={cifrasOficiales.cooperantes + " organismos"}
                  detail="BM, BID, UE, GIZ, SERVIR"
                  icon={Handshake}
                  color="blue"
                />
              </div>

              {/* BARRA DE HORIZONTE TEMPORAL (120 DÍAS) */}
              <Card className="mb-7 p-6 bg-white border-border">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <h2 className="text-base font-bold text-ink">Horizonte de 120 Días de la Modernización</h2>
                    <p className="text-xs text-muted">
                      Desde la vigencia del D.S. N.° 012-2026-MINAM hasta la aprobación del Informe Final de Reorganización
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#e6f4ec] px-3 py-1 text-xs font-semibold text-[#28754a]">
                      Día 64 de 120 (53% transcurrido)
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-xs text-muted">
                    <span className="font-semibold text-pine">17 Set 2026 (D.S. 012)</span>
                    <span className="font-medium text-[#2d5c4e]">16 Oct (12 Árboles)</span>
                    <span className="font-medium text-[#0d735a]">17 Nov (70 Días / Diálogo)</span>
                    <span className="font-medium text-[#8a5d14]">17 Dic (Medidas)</span>
                    <span className="font-semibold text-ink">15 Ene 2027 (Informe Final)</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-[#e8efed]">
                    <div className="h-full rounded-full bg-pine transition-all duration-500" style={{ width: '53%' }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted pt-1">
                    <span>Fase 1: Diagnóstico e Instalación</span>
                    <span>Fase 2: Articulación y Validación (Actual)</span>
                    <span>Fase 3: Medidas y Cierre Final</span>
                  </div>
                </div>
              </Card>

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
                    Todos los hitos (25)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoHitoFilter('realizados')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition',
                      tipoHitoFilter === 'realizados' ? 'bg-pine text-white' : 'text-muted hover:text-ink'
                    )}
                  >
                    <CheckCircle2 size={14} /> Hitos Realizados (16)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTipoHitoFilter('pendientes')}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold transition',
                      tipoHitoFilter === 'pendientes' ? 'bg-pine text-white' : 'text-muted hover:text-ink'
                    )}
                  >
                    <Clock3 size={14} /> Próximos / Pendientes (9)
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

              {/* TIMELINE DE TARJETAS */}
              <div className="relative space-y-4 before:absolute before:bottom-3 before:left-5 before:top-3 before:w-0.5 before:bg-[#d6e4df]">
                {filteredHitos.map((h) => (
                  <div key={h.numero} className="relative flex items-start gap-4 pl-1">
                    {/* Indicador numérico */}
                    <div
                      className={cn(
                        'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-xs',
                        h.tipo === 'Realizado'
                          ? 'bg-pine text-white ring-4 ring-[#e7f3ef]'
                          : 'bg-[#fff3e1] text-[#9a641a] ring-4 ring-[#fcf5ea] border border-[#ecd5af]'
                      )}
                    >
                      {h.numero}
                    </div>

                    {/* Tarjeta de hito */}
                    <Card
                      className={cn(
                        'flex-1 p-5 transition hover:border-pine/50',
                        h.tipo === 'Realizado' ? 'border-border bg-white' : 'border-[#fae3c3] bg-[#fffdfa]'
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-pine bg-[#eaf4f0] px-2.5 py-0.5 rounded">
                            {h.fecha}
                          </span>
                          <span className="text-xs text-muted">· {h.entidadResponsable}</span>
                        </div>
                        <Pill tone={h.tipo === 'Realizado' ? 'success' : 'warning'}>
                          {h.tipo === 'Realizado' ? 'Hito Cumplido' : 'Acción Pendiente'}
                        </Pill>
                      </div>

                      <h3 className="mt-2 text-base font-semibold text-ink">{h.titulo}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">{h.descripcion}</p>
                    </Card>
                  </div>
                ))}

                {filteredHitos.length === 0 && <Empty message="No se encontraron hitos con los filtros actuales." />}
              </div>
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
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={() => saveCsv(mesasReales, 'mesas-trabajo-minam.csv')}>
                      <Download size={16} /> Exportar Directorio CSV
                    </Button>
                    <Link href="/actualizar">
                      <Button>
                        <FilePenLine size={16} /> Actualizar avance
                      </Button>
                    </Link>
                  </div>
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

              {/* GRID DE MESAS */}
              <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredMesas.map((m) => (
                  <Card
                    key={m.id}
                    onClick={() => {
                      setSelectedMesaId(m.id);
                      document.getElementById('detalle-mesa-seleccionada')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={cn(
                      'flex cursor-pointer flex-col p-5 transition hover:border-pine/60 hover:shadow-md',
                      selectedMesaId === m.id ? 'border-pine ring-2 ring-pine/20' : 'border-border'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-border pb-3">
                      <span className="rounded bg-[#e8f3ef] px-2 py-0.5 text-xs font-bold text-pine">
                        MESA {String(m.id).padStart(2, '0')}
                      </span>
                      <span className={cn('rounded border px-2 py-0.5 text-[11px] font-semibold', cooperatorBadgeClass(m.cooperante))}>
                        {m.cooperante}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-semibold leading-snug text-ink min-h-[42px]">{m.nombre}</h3>

                    <div className="mt-2 text-xs text-muted">
                      <span className="font-semibold text-[#3b535b]">Líder responsable: </span>
                      {m.lider}
                    </div>

                    <div className="mt-3 rounded-lg border border-[#e5eeec] bg-[#f8faf9] p-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#294c44] mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <UsersRound size={14} /> Integrantes ({m.integrantes.length})
                        </span>
                        <span className="text-[11px] text-muted">Órganos acreditados</span>
                      </div>
                      <div className="flex flex-wrap gap-1 text-[11px] text-[#415e57]">
                        {m.integrantes.slice(0, 4).map((ing, i) => (
                          <span key={i} className="rounded bg-white px-1.5 py-0.5 border border-[#d8e6e3]">
                            {ing.split(':')[0]}
                          </span>
                        ))}
                        {m.integrantes.length > 4 && (
                          <span className="rounded bg-white px-1.5 py-0.5 border border-[#d8e6e3] text-muted">
                            +{m.integrantes.length - 4} más
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-2">
                      {m.estadoTrabajo}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs">
                      <span className="inline-flex items-center gap-1 text-pine font-medium">
                        <CheckCircle2 size={14} /> Árbol Aprobado
                      </span>
                      <span className="font-semibold text-pine flex items-center gap-1 hover:underline">
                        Ver detalle <ChevronRight size={14} />
                      </span>
                    </div>
                  </Card>
                ))}
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
                        <Eye size={15} /> Ver Árbol Oficial (PPT)
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
                        <Eye size={15} /> Ver Acta Oficial (PPT)
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
                subtitle="Registro oficial de las 46 sesiones de trabajo técnico, 11 sesiones con el Ministro y actas de acuerdos formales"
                action={
                  <Button variant="secondary" onClick={() => saveCsv(sesionesReales, 'sesiones-minam-oficial.csv')}>
                    <Download size={16} /> Exportar Bitácora CSV
                  </Button>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Sesiones con Mesas" value={cifrasOficiales.sesionesMesas} detail="35 diagnóstico + 11 plenarias" icon={CalendarDays} color="green" />
                <Kpi title="Sesiones con Ministro" value={cifrasOficiales.sesionesMinistro} detail="Validación directa en Despacho" icon={Target} color="blue" />
                <Kpi title="Actas Formalizadas" value="100%" detail="12 diagnósticos preliminares" icon={FileCheck2} color="green" />
                <Kpi title="Mesas Convocadas" value="11 mesas" detail="Quórum pleno y asistencia" icon={UsersRound} color="gold" />
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
                            <Eye size={13} /> Ver Acta (PPT)
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
                action={
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" onClick={() => saveCsv(arbolesProblemasReal, 'arboles-problemas-minam.csv')}>
                      <Download size={16} /> Exportar Matriz CSV
                    </Button>
                    {currentTree.imagenUrl && (
                      <Button
                        onClick={() =>
                          setPreviewImage({
                            url: currentTree.imagenUrl!,
                            title: "Lámina Oficial: " + currentTree.mesaNombre,
                            subtitle: "Problema: " + currentTree.problemaCentral,
                          })
                        }
                      >
                        <Eye size={16} /> Ver Lámina Oficial (PPT)
                      </Button>
                    )}
                  </div>
                }
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
                    <h2 className="mt-1 text-lg font-bold text-ink">{currentTree.mesaNombre}</h2>
                    <p className="text-xs text-muted mt-1">
                      Fecha de aprobación en acta: {currentTree.fechaAprobacion} · {currentTree.estado}
                    </p>
                  </div>
                  {currentTree.imagenUrl && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setPreviewImage({
                          url: currentTree.imagenUrl!,
                          title: "Diagrama Oficial Aprobado · Mesa " + currentTree.mesaId,
                          subtitle: currentTree.mesaNombre,
                        })
                      }
                    >
                      <Eye size={15} /> Ver Diagrama Oficial (Lámina PPT)
                    </Button>
                  )}
                </div>
              </Card>

              {/* VISUALIZADOR METODOLÓGICO DEL ÁRBOL */}
              <div className="space-y-6">
                {/* 1. EFECTOS E IMPACTOS NEGATIVOS */}
                <Card className="p-6 border-t-4 border-t-[#d97706] bg-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#b45309] uppercase tracking-wide">
                    <AlertTriangle size={18} />
                    Efectos e Impactos Negativos sobre el Sector, la Ciudadanía y el Ambiente
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-[#fde68a] bg-[#fffbeb] p-4">
                      <p className="text-xs font-bold text-[#92400e] uppercase tracking-wider mb-2">Efectos Directos</p>
                      <ul className="space-y-2 text-xs text-[#78350f]">
                        {currentTree.efectosDirectos.map((ef, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold">•</span>
                            <span>{ef}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-[#fde68a] bg-[#fffdf5] p-4">
                      <p className="text-xs font-bold text-[#92400e] uppercase tracking-wider mb-2">Efectos Indirectos</p>
                      <ul className="space-y-2 text-xs text-[#78350f]">
                        {currentTree.efectosIndirectos.map((ind, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold">→</span>
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* 2. PROBLEMA CENTRAL */}
                <div className="relative flex justify-center">
                  <div className="w-full max-w-4xl rounded-xl border-2 border-red-300 bg-red-50/90 p-6 text-center shadow-soft">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3.5 py-1 text-xs font-bold text-red-800 uppercase tracking-wider">
                      <AlertCircle size={15} /> Problema Central Aprobado Formalmente
                    </span>
                    <p className="mt-3 text-base font-bold leading-relaxed text-red-950 md:text-lg">
                      &quot;{currentTree.problemaCentral}&quot;
                    </p>
                  </div>
                </div>

                {/* 3. CAUSAS DIRECTAS E INDIRECTAS */}
                <Card className="p-6 border-t-4 border-t-pine bg-white">
                  <div className="flex items-center gap-2 text-xs font-bold text-pine uppercase tracking-wide">
                    <GitFork size={18} />
                    Causas Directas e Indirectas Determinadas en el Diagnóstico
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-[#cce3dc] bg-[#f4faf7] p-4">
                      <p className="text-xs font-bold text-[#135443] uppercase tracking-wider mb-2">Causas Directas</p>
                      <ul className="space-y-2 text-xs text-[#1e584a]">
                        {currentTree.causasDirectas.map((cd, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold">•</span>
                            <span>{cd}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-[#cce3dc] bg-[#fafdff] p-4">
                      <p className="text-xs font-bold text-[#135443] uppercase tracking-wider mb-2">Causas Indirectas</p>
                      <ul className="space-y-2 text-xs text-[#1e584a]">
                        {currentTree.causasIndirectas.map((ci, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-bold">→</span>
                            <span>{ci}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
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
                action={
                  <Button variant="secondary" onClick={() => saveCsv(mesasReales, 'diagnosticos-minam-oficial.csv')}>
                    <Download size={16} /> Exportar Matriz CSV
                  </Button>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Diagnósticos Preliminares" value="12 concluidos" detail="100% formalizados" icon={FileCheck2} color="green" />
                <Kpi title="Mesas Técnicas" value="11 mesas" detail="SG y Viceministerios" icon={Layers} color="blue" />
                <Kpi title="Sesiones de Formulación" value="35 sesiones" detail="Ciclo 09 al 15 de octubre" icon={CalendarDays} color="green" />
                <Kpi title="Acompañamiento Técnico" value="5 cooperantes" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="gold" />
              </div>

              <Card className="overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <h2 className="text-sm font-bold text-ink">Registro de Diagnósticos Preliminares Formalizados</h2>
                </div>
                <Table headers={['Mesa', 'Eje Temático', 'Líder MINAM', 'Cooperante', 'Diagnóstico y Estado', 'Acta Oficial']}>
                  {mesasReales.map((m) => (
                    <tr key={m.id}>
                      <td className="font-semibold text-pine whitespace-nowrap">Mesa {String(m.id).padStart(2, '0')}</td>
                      <td className="min-w-[260px] font-medium text-xs text-ink">{m.nombre}</td>
                      <td className="min-w-[180px] text-xs text-muted">{m.lider}</td>
                      <td className="whitespace-nowrap">
                        <span className={cn('rounded border px-2 py-0.5 text-[11px] font-semibold', cooperatorBadgeClass(m.cooperante))}>
                          {m.cooperante}
                        </span>
                      </td>
                      <td className="min-w-[260px] text-xs leading-relaxed text-muted">{m.estadoTrabajo}</td>
                      <td className="whitespace-nowrap">
                        {m.imagenActa ? (
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
                            <Eye size={13} /> Ver Acta (PPT)
                          </button>
                        ) : (
                          <Pill tone="success">Aprobada</Pill>
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
                subtitle="Matriz oficial de acompañamiento técnico de organismos internacionales (Lámina 13 de la Presentación IDP)"
                action={
                  <Button variant="secondary" onClick={() => saveCsv(correspondenciaCooperantesMesas, 'correspondencia-cooperantes-minam.csv')}>
                    <Download size={16} /> Exportar Matriz CSV
                  </Button>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Mesas Asistidas" value="11 mesas" detail="100% con cooperante" icon={TableProperties} color="green" />
                <Kpi title="Organismos Cooperantes" value="5 organismos" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="blue" />
                <Kpi title="Especialistas Asignados" value="14 consultores" detail="Expertos temáticos" icon={Users} color="green" />
                <Kpi title="Articulación Técnica" value="100% avance" detail="Insumos y TDR aprobados" icon={CheckCircle2} color="gold" />
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
                </div>
                <Table headers={['Mesa', 'Eje Temático', 'Líder MINAM', 'Organismo Cooperante', 'Profesional Responsable', 'Alcance del Apoyo Técnico', 'Últimos Avances']}>
                  {filteredCorrespondencia.map((c) => (
                    <tr key={c.mesaId}>
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
                subtitle="Perfil profesional, datos de contacto, organismo internacional y mesas asignadas de los expertos de modernización"
                action={
                  <Button variant="secondary" onClick={() => saveCsv(perfilesCooperantes, 'perfiles-cooperantes-minam.csv')}>
                    <Download size={16} /> Exportar Directorio CSV
                  </Button>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Organismos Cooperantes" value="5 agencias" detail="BM, BID, UE, GIZ, SERVIR" icon={Building2} color="green" />
                <Kpi title="Especialistas Acreditados" value={perfilesCooperantes.length} detail="Consultores y puntos focales" icon={Users} color="blue" />
                <Kpi title="Mesas Técnicas Asesoradas" value="11 mesas" detail="Cobertura total del sector" icon={Layers} color="green" />
                <Kpi title="Modalidad de Apoyo" value="Asistencia Técnica" detail="Donación no reembolsable" icon={Handshake} color="gold" />
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
                    value={cooperanteFilter}
                    onChange={(e) => setCooperanteFilter(e.target.value)}
                    className="h-10 text-xs"
                  >
                    <option value="all">Todos los Organismos</option>
                    <option value="Banco Mundial">Banco Mundial</option>
                    <option value="BID">Banco Interamericano de Desarrollo (BID)</option>
                    <option value="Unión Europea">Unión Europea</option>
                    <option value="GIZ">Cooperación Alemana (GIZ)</option>
                    <option value="SERVIR">SERVIR</option>
                  </Select>
                </div>
              </Card>

              {/* GRID DE PERFILES DE COOPERANTES */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredPerfiles.map((p) => (
                  <Card key={p.id} className="flex flex-col p-6 transition hover:border-pine/50">
                    <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
                      <span className={cn('rounded border px-2.5 py-0.5 text-xs font-semibold', cooperatorBadgeClass(p.organismo))}>
                        {p.organismo}
                      </span>
                      <span className="text-[11px] font-semibold text-muted bg-[#f4f7f6] px-2 py-0.5 rounded">
                        {p.mesasAsignadas}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-ink">{p.nombre}</h3>
                    <p className="text-xs font-semibold text-pine mt-0.5">{p.cargo}</p>

                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      {p.perfilProfesional}
                    </p>

                    <div className="mt-auto border-t border-border pt-4 space-y-1.5 text-xs">
                      {p.correo && (
                        <div className="flex items-center gap-2 text-muted">
                          <Mail size={14} className="text-pine shrink-0" />
                          <a href={"mailto:" + p.correo} className="text-pine hover:underline truncate">
                            {p.correo}
                          </a>
                        </div>
                      )}
                      {p.telefono && (
                        <div className="flex items-center gap-2 text-muted">
                          <Phone size={14} className="text-pine shrink-0" />
                          <span>{p.telefono}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
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
                action={
                  <Button variant="secondary" onClick={() => saveCsv(reunionesCooperantesReales, 'reuniones-cooperantes-minam.csv')}>
                    <Download size={16} /> Exportar Bitácora CSV
                  </Button>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Reuniones Registradas" value={reunionesCooperantesReales.length} detail="Sesiones técnicas y bilaterales" icon={CalendarCheck} color="green" />
                <Kpi title="Institutos Articulados" value="4 IPIs" detail="SENAMHI, IIAP, INAIGEM, IGP" icon={Building2} color="blue" />
                <Kpi title="Organismos en Mesa" value="5 entidades" detail="BM, BID, UE, GIZ, SERVIR" icon={Handshake} color="green" />
                <Kpi title="Estado Acuerdos" value="100% al día" detail="Conformidad técnica bilateral" icon={CheckCircle2} color="gold" />
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
                subtitle="Encuentros con actores clave del sector ambiental para recoger expectativas y propuestas de reforma (17 al 24 de noviembre) · Facilitación por GIZ"
                action={
                  <Button variant="secondary" onClick={() => saveCsv(espaciosDialogoReales, 'espacios-dialogo-minam.csv')}>
                    <Download size={16} /> Exportar Espacios CSV
                  </Button>
                }
              />

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi title="Espacios Programados" value={espaciosDialogoReales.length} detail="Encuentros estructurados" icon={MessagesSquare} color="green" />
                <Kpi title="Facilitación Externa" value="GIZ" detail="José C. Rodríguez y Z. Cancino" icon={Handshake} color="blue" />
                <Kpi title="Actores Convocados" value="180+ entidades" detail="Sociedad, gremios y academia" icon={Users} color="green" />
                <Kpi title="Período de Realización" value="17 - 24 Nov" detail="Semana de consulta ciudadana" icon={CalendarDays} color="gold" />
              </div>

              {/* GRID DE ESPACIOS DE DIÁLOGO */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredEspacios.map((e) => (
                  <Card key={e.id} className="flex flex-col p-6 transition hover:border-pine/50">
                    <div className="flex items-start justify-between gap-2 border-b border-border pb-3">
                      <span className="rounded bg-[#ecf5f2] px-2.5 py-0.5 text-xs font-semibold text-pine">
                        {e.id} · {e.modalidad}
                      </span>
                      <Pill tone="success">{e.estado}</Pill>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-ink leading-snug">{e.grupoActor}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{e.objetivo}</p>

                    <div className="my-4 rounded-lg border border-[#e1ece9] bg-[#f8faf9] p-3 text-xs leading-relaxed text-[#355359]">
                      <span className="font-semibold text-pine block mb-1">Entidades y Participantes:</span>
                      {e.participantesEstimados}
                    </div>

                    <div className="mt-auto border-t border-border pt-4">
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span>Fecha de Sesión:</span>
                        <span className="font-bold text-pine">{e.fecha}</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs text-muted">
                        <span>Facilitación:</span>
                        <span className="font-medium text-ink">{e.facilitacion}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* ========================================================= */}
          {/* VISTA 10: ACTUALIZAR AVANCES                              */}
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
                      setFormSaved(true);
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
                      <Button type="submit">
                        <FilePenLine size={16} /> Guardar Registro Oficial
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
              <span>Documento fuente: Presentación IDP_vf1.pptx · Instancia Directiva del Proceso MINAM</span>
              <Button variant="secondary" onClick={() => setPreviewImage(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
