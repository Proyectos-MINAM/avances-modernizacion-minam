export interface HitoCronograma {
  id: string;
  fase: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  avance: number;
  estado: 'Completado' | 'En curso' | 'Programado' | 'Retrasado';
  responsable: string;
}

export interface ArbolProblema {
  mesaId: number;
  mesaNombre: string;
  problemaCentral: string;
  causasDirectas: {
    causa: string;
    causasIndirectas: string[];
  }[];
  efectosDirectos: {
    efecto: string;
    efectosIndirectos: string[];
  }[];
  accionesClave: string[];
}

export interface DiagnosticoItem {
  id: string;
  mesaId: number;
  mesaNombre: string;
  titulo: string;
  organoResponsable: string;
  alcance: string;
  fechaAprobacion: string;
  estado: 'Aprobado' | 'En validación' | 'En redacción';
  archivo: string;
  hallazgosClave: number;
}

export interface CuadroCorrespondenciaItem {
  id: string;
  mesaId: number;
  problemaId: string;
  problema: string;
  competenciaMINAM: string;
  productoModernizacion: string;
  organoResponsable: string;
  tipoIntervencion: 'Normativa' | 'Procesos' | 'Estructura' | 'Tecnología';
  estadoConsenso: 'Aprobado en mesa' | 'En revisión técnica' | 'Propuesta inicial';
}

export interface CooperanteItem {
  id: string;
  nombre: string;
  paisOrganismo: string;
  tipo: 'Bilateral' | 'Multilateral' | 'Agencia de Cooperación';
  ejePrioritario: string;
  cooperacionMonto: string;
  contacto: string;
  proyectosActivos: number;
  estado: 'Activo' | 'En coordinación' | 'Convenio en trámite';
  descripcion: string;
}

export interface ReunionCooperanteItem {
  id: string;
  cooperanteId: string;
  cooperanteNombre: string;
  fecha: string;
  tipoReunion: 'Mesa Bilateral' | 'Comité Técnico' | 'Visita de Misión' | 'Seguimiento de Cartera';
  agenda: string;
  acuerdosPrincipales: string;
  responsableMINAM: string;
  estado: 'Realizada' | 'Programada';
  actaDocumento: string;
}

export interface EspacioDialogoItem {
  id: string;
  nombre: string;
  grupoObjetivo: 'Organismos Adscritos' | 'Gremios Empresariales' | 'Pueblos Indígenas' | 'Academia y Científicos' | 'Sociedad Civil';
  objetivo: string;
  sesionesRealizadas: number;
  entidadesParticipantes: number;
  proximaSesion: string;
  estado: 'Activo' | 'En convocatoria';
  liderMINAM: string;
  compromisosAcordados: number;
}

export const cronogramaFases = [
  {
    fase: 'Fase 1: Diagnóstico Situacional',
    descripcion: 'Mapeo integral de funciones, duplicidades de competencias y revisión de carga operativa.',
    periodo: 'Enero - Mayo 2026',
    avance: 100,
    estado: 'Completado',
  },
  {
    fase: 'Fase 2: Instalación y Sesiones de Mesas Técnicas',
    descripcion: 'Mesas temáticas de trabajo con 11 ejes institucionales y órganos desconcentrados.',
    periodo: 'Junio - Octubre 2026',
    avance: 78,
    estado: 'En curso',
  },
  {
    fase: 'Fase 3: Formulación del Cuadro de Correspondencia',
    descripcion: 'Alineamiento de problemas, procesos sustantivos y productos de modernización.',
    periodo: 'Noviembre - Diciembre 2026',
    avance: 35,
    estado: 'En curso',
  },
  {
    fase: 'Fase 4: Propuesta de Estructura Orgánica y ROF',
    descripcion: 'Aprobación del nuevo ROF, MOP y dimensionamiento del personal en el marco de la PCM.',
    periodo: 'Enero - Marzo 2027',
    avance: 10,
    estado: 'Programado',
  },
];

export const hitosCronograma: HitoCronograma[] = [
  {
    id: 'HIT-01',
    fase: 'Fase 1',
    nombre: 'Aprobación del Plan de Modernización Institucional MINAM 2026-2027',
    fechaInicio: '2026-01-15',
    fechaFin: '2026-02-28',
    avance: 100,
    estado: 'Completado',
    responsable: 'OGPP',
  },
  {
    id: 'HIT-02',
    fase: 'Fase 1',
    nombre: 'Levantamiento de diagnósticos situacionales de las 11 mesas temáticas',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-05-30',
    avance: 100,
    estado: 'Completado',
    responsable: 'Comité de Modernización',
  },
  {
    id: 'HIT-03',
    fase: 'Fase 2',
    nombre: 'Desarrollo de las 33 sesiones programadas de Mesas de Trabajo',
    fechaInicio: '2026-06-01',
    fechaFin: '2026-10-31',
    avance: 92,
    estado: 'En curso',
    responsable: 'Secretaría General / Mesas',
  },
  {
    id: 'HIT-04',
    fase: 'Fase 2',
    nombre: 'Validación técnica de los Árboles de Problemas con órganos adscritos',
    fechaInicio: '2026-08-01',
    fechaFin: '2026-10-15',
    avance: 85,
    estado: 'En curso',
    responsable: 'OGPP - Modernización',
  },
  {
    id: 'HIT-05',
    fase: 'Fase 3',
    nombre: 'Consolidación y aprobación del Cuadro de Correspondencia',
    fechaInicio: '2026-10-15',
    fechaFin: '2026-11-30',
    avance: 40,
    estado: 'En curso',
    responsable: 'OGPP / Asesoría Jurídica',
  },
  {
    id: 'HIT-06',
    fase: 'Fase 3',
    nombre: 'Talleres de consulta con cooperantes internacionales y espacios de diálogo',
    fechaInicio: '2026-11-01',
    fechaFin: '2026-12-15',
    avance: 20,
    estado: 'En curso',
    responsable: 'Oficina de Cooperación / SG',
  },
  {
    id: 'HIT-07',
    fase: 'Fase 4',
    nombre: 'Remisión formal del expediente del nuevo ROF a la Secretaría de Gestión Pública (PCM)',
    fechaInicio: '2027-01-10',
    fechaFin: '2027-02-28',
    avance: 0,
    estado: 'Programado',
    responsable: 'Despacho Ministerial / SG',
  },
];

export const arbolesProblemas: ArbolProblema[] = [
  {
    mesaId: 1,
    mesaNombre: 'Gobernanza y Rectoría Ambiental',
    problemaCentral: 'Limitada articulación y efectividad en el ejercicio de la rectoría ambiental del MINAM en los tres niveles de gobierno.',
    causasDirectas: [
      {
        causa: 'Superposición de competencias entre el MINAM y sectores productivos (Energía y Minas, Producción, Agrario).',
        causasIndirectas: ['Falta de un marco normativo unificado para dirimir controversias de competencia ambiental.', 'Baja adopción de directivas vinculantes emitidas por el MINAM.'],
      },
      {
        causa: 'Débil capacidad de monitoreo y asistencia técnica a los Gobiernos Regionales (GORE) y Locales.',
        causasIndirectas: ['Recursos humanos especializados insuficientes en las Gerencias Regionales de Recursos Naturales y Medio Ambiente.', 'Desconexión entre el SINIA nacional y los SIAR regionales.'],
      },
    ],
    efectosDirectos: [
      {
        efecto: 'Incertidumbre jurídica en la emisión de autorizaciones y títulos ambientales.',
        efectosIndirectos: ['Retrasos en la evaluación de proyectos estratégicos sostenibles.', 'Riesgo de litigios y conflictos socioambientales no prevenidos.'],
      },
      {
        efecto: 'Pérdida de confianza ciudadana en la capacidad rectora del Estado en materia ecológica.',
        efectosIndirectos: ['Aumento de la vulnerabilidad ante eventos de degradación ambiental y cambio climático.'],
      },
    ],
    accionesClave: [
      'Decreto Supremo de actualización de los Lineamientos del Sistema Nacional de Gestión Ambiental (SNGA).',
      'Plataforma Única de Articulación Intergubernamental MINAM-GORE.',
      'Manual de Competencias Ambientales Sinérgicas con Sectores Productivos.',
    ],
  },
  {
    mesaId: 2,
    mesaNombre: 'Fiscalización y Calidad Ambiental',
    problemaCentral: 'Brechas en la cobertura, oportunidad y efectividad de la fiscalización ambiental sobre actividades informales y pasivos críticos.',
    causasDirectas: [
      {
        causa: 'Fragmentación del SINEFA entre el OEFA y las entidades de fiscalización local (EFA).',
        causasIndirectas: ['Falta de interoperabilidad tecnológica en los registros de supervisión.', 'Escaso presupuesto en municipalidades para control de ruido y emisiones locales.'],
      },
      {
        causa: 'Procedimientos sancionadores de prolongada duración y baja cobranza coactiva de multas.',
        causasIndirectas: ['Sobrejudicialización de medidas cautelares.', 'Complejidad en la acreditación probatoria de daños a cuerpos hídricos y suelos.'],
      },
    ],
    efectosDirectos: [
      {
        efecto: 'Persistencia de fuentes contaminantes no remediadas en cuencas prioritarias.',
        efectosIndirectos: ['Afectación a la salud de poblaciones aledañas.', 'Deterioro de la calidad del agua y aire en zonas críticas urbanas e industriales.'],
      },
    ],
    accionesClave: [
      'Integración del expediente sancionador digital interoperable SINEFA-MINAM.',
      'Protocolo sectorial de intervención rápida ante emergencias ambientales.',
      'Mecanismos de fiscalización preventiva con incentivos al cumplimiento verde.',
    ],
  },
  {
    mesaId: 3,
    mesaNombre: 'Conservación y Diversidad Biológica',
    problemaCentral: 'Insuficiente sostenibilidad financiera y presión antrópica sobre las Áreas Naturales Protegidas (ANP) y ecosistemas frágiles.',
    causasDirectas: [
      {
        causa: 'Dependencia presupuestal de recursos ordinarios y volatilidad en fondos fiduciarios.',
        causasIndirectas: ['Baja captación de ingresos por aprovechamiento sostenible de recursos hidrobiológicos y forestales no maderables.'],
      },
      {
        causa: 'Invasiones y actividades ilícitas (minería ilegal, deforestación) en zonas de amortiguamiento.',
        causasIndirectas: ['Limitado patrullaje de guardaparques por extensión geográfica.', 'Falta de titulación de tierras comunales circundantes.'],
      },
    ],
    efectosDirectos: [
      {
        efecto: 'Pérdida irreversible de biodiversidad y servicios ecosistémicos estratégicos para el país.',
        efectosIndirectos: ['Reducción de captura de carbono y vulnerabilidad de cabeceras de cuenca.'],
      },
    ],
    accionesClave: [
      'Fideicomiso Verde Nacional para la Gestión Sostenible de ANP.',
      'Estrategia Nacional de Concesiones de Ecoturismo y Conservación Comunitaria.',
      'Sistema de Monitoreo Satelital en Tiempo Real de Ecosistemas Frágiles.',
    ],
  },
  {
    mesaId: 4,
    mesaNombre: 'Gestión Integral de Residuos Sólidos',
    problemaCentral: 'Bajo porcentaje de valorización y disposición final segura de residuos sólidos a nivel municipal y especial en el Perú.',
    causasDirectas: [
      {
        causa: 'Déficit estructural de infraestructura de rellenos sanitarios y plantas de valorización.',
        causasIndirectas: ['Demoras en la formulación de proyectos en Invierte.pe por parte de municipalidades provinciales.'],
      },
      {
        causa: 'Baja cultura de segregación en la fuente y morosidad en el arbitrio de limpieza pública.',
        causasIndirectas: ['Informalidad en la cadena de reciclaje y ausencia de incentivos tributarios municipales.'],
      },
    ],
    efectosDirectos: [
      {
        efecto: 'Proliferación de botaderos a cielo abierto y contaminación de suelos y napas freáticas.',
        efectosIndirectos: ['Emisión descontrolada de gases de efecto invernadero (metano).'],
      },
    ],
    accionesClave: [
      'Régimen Especial de Asociación Público-Privada para Infraestructura de Residuos.',
      'Programa Nacional de Formalización e Inclusión Social de Recicladores.',
      'Pacto Nacional por la Economía Circular en Envases y Embalajes.',
    ],
  },
  {
    mesaId: 5,
    mesaNombre: 'Cambio Climático y Transición Ecológica',
    problemaCentral: 'Brechas en la implementación territorial de las Medidas de Adaptación y Mitigación (NDC) ante el cambio climático.',
    causasDirectas: [
      {
        causa: 'Falta de incorporación transversal de criterios climáticos en los planes de desarrollo concertado regionales.',
        causasIndirectas: ['Falta de metodologías estandarizadas para medir pérdidas y daños climáticos.'],
      },
      {
        causa: 'Limitado acceso a fondos climáticos internacionales (Green Climate Fund, GEF) por debilidad en la formulación de expedientes bancables.',
        causasIndirectas: ['Falta de una ventanilla única de finanzas climáticas en el sector público.'],
      },
    ],
    efectosDirectos: [
      {
        efecto: 'Mayor vulnerabilidad de comunidades agrarias y zonas costeras ante sequías, huaycos e inundaciones.',
        efectosIndirectos: ['Costos económicos crecientes para la reconstrucción del país.'],
      },
    ],
    accionesClave: [
      'Decreto Supremo que aprueba la Hoja de Ruta de Finanzas Verdes y Climáticas.',
      'Módulo Territorial de Monitoreo de Metas NDC en tiempo real.',
      'Guía Sectorial de Inversión Pública Resiliente al Clima.',
    ],
  },
];

export const diagnosticos: DiagnosticoItem[] = [
  {
    id: 'DIAG-01',
    mesaId: 1,
    mesaNombre: 'Gobernanza y Rectoría Ambiental',
    titulo: 'Diagnóstico de Duplicidades y Vacíos de Competencia en el Sector Ambiental Peruano',
    organoResponsable: 'Oficina General de Planeamiento y Presupuesto (OGPP)',
    alcance: 'Nacional - Multisectorial',
    fechaAprobacion: '2026-04-18',
    estado: 'Aprobado',
    archivo: 'DIAG-01_Rectoría_Competencias_MINAM_2026.pdf',
    hallazgosClave: 12,
  },
  {
    id: 'DIAG-02',
    mesaId: 2,
    mesaNombre: 'Fiscalización y Calidad Ambiental',
    titulo: 'Evaluación del Sistema Nacional de Evaluación y Fiscalización Ambiental (SINEFA)',
    organoResponsable: 'OEFA / Dirección General de Calidad Ambiental',
    alcance: 'Entidades de Fiscalización Ambiental (EFA)',
    fechaAprobacion: '2026-05-12',
    estado: 'Aprobado',
    archivo: 'DIAG-02_Evaluacion_SINEFA_2026.pdf',
    hallazgosClave: 9,
  },
  {
    id: 'DIAG-03',
    mesaId: 3,
    mesaNombre: 'Conservación y Diversidad Biológica',
    titulo: 'Diagnóstico de Sostenibilidad Financiera y Brechas de Gestión en el SINANPE',
    organoResponsable: 'SERNANP / Dirección General de Diversidad Biológica',
    alcance: '76 Áreas Naturales Protegidas',
    fechaAprobacion: '2026-05-28',
    estado: 'Aprobado',
    archivo: 'DIAG-03_Sostenibilidad_SINANPE.pdf',
    hallazgosClave: 8,
  },
  {
    id: 'DIAG-04',
    mesaId: 4,
    mesaNombre: 'Gestión Integral de Residuos Sólidos',
    titulo: 'Línea de Base de la Brecha de Infraestructura de Residuos Sólidos Municipales y No Municipales',
    organoResponsable: 'Dirección General de Gestión de Residuos Sólidos (DGRS)',
    alcance: '196 Provincias a nivel nacional',
    fechaAprobacion: '2026-06-15',
    estado: 'Aprobado',
    archivo: 'DIAG-04_Brecha_Infraestructura_Residuos.pdf',
    hallazgosClave: 14,
  },
  {
    id: 'DIAG-05',
    mesaId: 5,
    mesaNombre: 'Cambio Climático y Transición Ecológica',
    titulo: 'Diagnóstico Institucional del Sistema de Monitoreo de las Contribuciones Determinadas a Nivel Nacional (NDC)',
    organoResponsable: 'Dirección General de Cambio Climático y Desertificación (DGCCD)',
    alcance: 'Sectores Energía, Agricultura, Bosques y Procesos Industriales',
    fechaAprobacion: '2026-07-22',
    estado: 'Aprobado',
    archivo: 'DIAG-05_Monitoreo_NDC_Peru.pdf',
    hallazgosClave: 7,
  },
  {
    id: 'DIAG-06',
    mesaId: 6,
    mesaNombre: 'Investigación e Información Ambiental',
    titulo: 'Evaluación de Capacidades Científicas e Interoperabilidad del SINIA, SENAMHI, IIAP e IGP',
    organoResponsable: 'Dirección General de Investigación e Información Ambiental',
    alcance: 'Organismos Científicos Adscritos',
    fechaAprobacion: '2026-08-30',
    estado: 'En validación',
    archivo: 'DIAG-06_Capacidades_Cientificas_MINAM.pdf',
    hallazgosClave: 11,
  },
  {
    id: 'DIAG-07',
    mesaId: 10,
    mesaNombre: 'Transformación Digital y Procesos',
    titulo: 'Mapeo de la Arquitectura Empresarial, Trámites TUPA y Madurez Digital del MINAM',
    organoResponsable: 'Oficina de Tecnologías de la Información (OTI)',
    alcance: 'Sede Central y Órganos Desconcentrados',
    fechaAprobacion: '2026-09-14',
    estado: 'En validación',
    archivo: 'DIAG-07_Transformacion_Digital_MINAM.pdf',
    hallazgosClave: 15,
  },
  {
    id: 'DIAG-08',
    mesaId: 11,
    mesaNombre: 'Financiamiento y Sostenibilidad Ambiental',
    titulo: 'Diagnóstico de Eficiencia del Gasto Público y Mecanismos de Obras por Impuestos Ambientales',
    organoResponsable: 'Oficina General de Administración (OGA) / OGPP',
    alcance: 'Presupuesto Institucional de Apertura y Modificado',
    fechaAprobacion: '2026-10-05',
    estado: 'En redacción',
    archivo: 'DIAG-08_Eficiencia_Gasto_Ambiental.pdf',
    hallazgosClave: 6,
  },
];

export const cuadroCorrespondencia: CuadroCorrespondenciaItem[] = [
  {
    id: 'CC-001',
    mesaId: 1,
    problemaId: 'P-01',
    problema: 'Superposición en la emisión de autorizaciones de impacto ambiental entre MINAM y ministerios sectoriales.',
    competenciaMINAM: 'Ejercer la rectoría y dictar normas vinculantes para el Sistema Nacional de Evaluación del Impacto Ambiental (SEIA).',
    productoModernizacion: 'Decreto Supremo que unifica criterios de prelación técnica del SEIA y clarifica competencias exclusivas.',
    organoResponsable: 'Dirección General de Políticas e Instrumentos de Gestión Ambiental',
    tipoIntervencion: 'Normativa',
    estadoConsenso: 'Aprobado en mesa',
  },
  {
    id: 'CC-002',
    mesaId: 1,
    problemaId: 'P-02',
    problema: 'Débil articulación de las políticas ambientales con los Gobiernos Regionales y Locales.',
    competenciaMINAM: 'Conducir el SNGA y brindar asistencia técnica a las autoridades ambientales subnacionales.',
    productoModernizacion: 'Manual Operativo del Comité Técnico de Coordinación Intergubernamental MINAM-GORE.',
    organoResponsable: 'Secretaría General / Oficina de Enlace Regional',
    tipoIntervencion: 'Estructura',
    estadoConsenso: 'Aprobado en mesa',
  },
  {
    id: 'CC-003',
    mesaId: 2,
    problemaId: 'P-03',
    problema: 'Falta de interoperabilidad entre los registros de infractores del OEFA y las licencias otorgadas por municipalidades.',
    competenciaMINAM: 'Normar y articular los sistemas de información del Sistema Nacional de Fiscalización Ambiental.',
    productoModernizacion: 'Módulo Interoperable SINEFA-MUNI para el bloqueo automático de licencias a reincidentes.',
    organoResponsable: 'OEFA / Oficina de Tecnologías de la Información',
    tipoIntervencion: 'Tecnología',
    estadoConsenso: 'Aprobado en mesa',
  },
  {
    id: 'CC-004',
    mesaId: 3,
    problemaId: 'P-04',
    problema: 'Inestabilidad presupuestal para el mantenimiento y control de las 76 Áreas Naturales Protegidas.',
    competenciaMINAM: 'Garantizar la conservación de la diversidad biológica y la sostenibilidad del SINANPE.',
    productoModernizacion: 'Propuesta de Decreto Legislativo para la creación del Fondo Fiduciario de Capitalización de las ANP.',
    organoResponsable: 'SERNANP / OGPP',
    tipoIntervencion: 'Normativa',
    estadoConsenso: 'En revisión técnica',
  },
  {
    id: 'CC-005',
    mesaId: 4,
    problemaId: 'P-05',
    problema: 'Dispersión de información sobre botaderos ilegales y volumen real de residuos generados por provincia.',
    competenciaMINAM: 'Administrar el Sistema de Información para la Gestión de Residuos Sólidos (SIGERSOL).',
    productoModernizacion: 'Rediseño integral y automatización del SIGERSOL 3.0 con georreferenciación satelital obligatoria.',
    organoResponsable: 'Dirección General de Gestión de Residuos Sólidos',
    tipoIntervencion: 'Tecnología',
    estadoConsenso: 'Aprobado en mesa',
  },
  {
    id: 'CC-006',
    mesaId: 5,
    problemaId: 'P-06',
    problema: 'Lenta absorción de fondos internacionales de cooperación para proyectos de adaptación climática territorial.',
    competenciaMINAM: 'Punto focal ante la Convención Marco de las Naciones Unidas sobre el Cambio Climático (CMNUCC).',
    productoModernizacion: 'Ventanilla Única de Formulación de Proyectos de Finanzas del Clima y Biodiversidad.',
    organoResponsable: 'Dirección General de Cambio Climático / Oficina de Cooperación',
    tipoIntervencion: 'Procesos',
    estadoConsenso: 'En revisión técnica',
  },
  {
    id: 'CC-007',
    mesaId: 10,
    problemaId: 'P-07',
    problema: 'TUPA desactualizado con 45 procedimientos con plazos excesivos y requisitos duplicados.',
    competenciaMINAM: 'Simplificación administrativa y mejora continua de la calidad regulatoria en el sector ambiental.',
    productoModernizacion: 'Texto Único de Procedimientos Administrativos (TUPA) digitalizado y homologado con PCM.',
    organoResponsable: 'Oficina General de Planeamiento y Presupuesto (OGPP)',
    tipoIntervencion: 'Procesos',
    estadoConsenso: 'Aprobado en mesa',
  },
  {
    id: 'CC-008',
    mesaId: 11,
    problemaId: 'P-08',
    problema: 'Baja ejecución en proyectos de inversión pública bajo el mecanismo de Obras por Impuestos para remediación.',
    competenciaMINAM: 'Promover la inversión pública y privada en infraestructura ambiental y remediación de pasivos.',
    productoModernizacion: 'Catálogo Priorizado de Proyectos OxI en Restauración Ecosistémica y Plantas de Residuos.',
    organoResponsable: 'Oficina General de Administración / OPIPP',
    tipoIntervencion: 'Procesos',
    estadoConsenso: 'Propuesta inicial',
  },
];

export const cooperantes: CooperanteItem[] = [
  {
    id: 'COOP-GIZ',
    nombre: 'GIZ - Cooperación Alemana al Desarrollo',
    paisOrganismo: 'Alemania (BMZ)',
    tipo: 'Bilateral',
    ejePrioritario: 'Gobernanza Climática, Bosques y Economía Circular (ProAmbiente)',
    cooperacionMonto: '€ 14,500,000 EUR',
    contacto: 'Dr. Michael Schmidt (Director de País)',
    proyectosActivos: 4,
    estado: 'Activo',
    descripcion: 'Asistencia técnica directa al proceso de modernización, desarrollo de instrumentos de economía circular y fortalecimiento de capacidades en gestión de cuencas.',
  },
  {
    id: 'COOP-USAID',
    nombre: 'USAID - Agencia de los Estados Unidos para el Desarrollo',
    paisOrganismo: 'Estados Unidos',
    tipo: 'Bilateral',
    ejePrioritario: 'Combate a Delitos Ambientales y Conservación en la Amazonía (Securing the Future)',
    cooperacionMonto: '$ 18,200,000 USD',
    contacto: 'Lic. Patricia Vargas (Oficial de Medio Ambiente)',
    proyectosActivos: 3,
    estado: 'Activo',
    descripcion: 'Financiamiento de plataformas tecnológicas de alerta temprana satelital, soporte jurídico en delitos contra recursos forestales y fortalecimiento del OEFA y SERNANP.',
  },
  {
    id: 'COOP-BID',
    nombre: 'Banco Interamericano de Desarrollo (BID)',
    paisOrganismo: 'Multilateral',
    tipo: 'Multilateral',
    ejePrioritario: 'Programa Nacional de Inversión y Gestión Integral de Residuos Sólidos',
    cooperacionMonto: '$ 70,000,000 USD',
    contacto: 'Ing. Carlos Mendoza (Especialista Sectorial)',
    proyectosActivos: 2,
    estado: 'Activo',
    descripcion: 'Línea de crédito programática y cooperación técnica no reembolsable para el rediseño de rellenos sanitarios provinciales y fortalecimiento de la DGRS.',
  },
  {
    id: 'COOP-BM',
    nombre: 'Banco Mundial (World Bank)',
    paisOrganismo: 'Multilateral',
    tipo: 'Multilateral',
    ejePrioritario: 'Modernización del Sistema Nacional de Información Ambiental (SINIA II)',
    cooperacionMonto: '$ 25,000,000 USD',
    contacto: 'Dra. Elena Rossi (Líder de Proyecto)',
    proyectosActivos: 2,
    estado: 'Activo',
    descripcion: 'Proyecto de interoperabilidad técnica entre las bases de datos de calidad de aire y agua, y soporte a la arquitectura institucional del nuevo ROF.',
  },
  {
    id: 'COOP-PNUD',
    nombre: 'PNUD - Programa de las Naciones Unidas para el Desarrollo',
    paisOrganismo: 'Naciones Unidas (ONU)',
    tipo: 'Multilateral',
    ejePrioritario: 'Articulación Territorial y Pueblos Indígenas (NDC Support Programme)',
    cooperacionMonto: '$ 6,800,000 USD',
    contacto: 'Mag. Jorge Álvarez (Coordinador de Sostenibilidad)',
    proyectosActivos: 3,
    estado: 'Activo',
    descripcion: 'Facilitación de espacios de diálogo con organizaciones indígenas y asistencia técnica para la métrica de metas de adaptación en comunidades rurales.',
  },
  {
    id: 'COOP-UE',
    nombre: 'Unión Europea en el Perú',
    paisOrganismo: 'Unión Europea',
    tipo: 'Bilateral',
    ejePrioritario: 'Pacto Verde, Transición Ecológica y Comercio Libre de Deforestación',
    cooperacionMonto: '€ 12,000,000 EUR',
    contacto: 'Sr. Vincent Maquet (Agregado de Cooperación)',
    proyectosActivos: 2,
    estado: 'Activo',
    descripcion: 'Apoyo a la trazabilidad de cadenas de valor libres de deforestación (café, cacao) en el marco de los nuevos estándares europeos de importación.',
  },
  {
    id: 'COOP-SECO',
    nombre: 'SECO - Cooperación Suiza',
    paisOrganismo: 'Suiza',
    tipo: 'Bilateral',
    ejePrioritario: 'Eficiencia de Recursos, Ciudades Sostenibles y Huella Hídrica',
    cooperacionMonto: '$ 8,500,000 USD',
    contacto: 'Econ. Martin Peter (Director de Cooperación Económica)',
    proyectosActivos: 1,
    estado: 'Activo',
    descripcion: 'Incentivos para la medición de la huella de carbono en la pequeña y mediana empresa y ecoeficiencia en el sector público.',
  },
];

export const reunionesCooperantes: ReunionCooperanteItem[] = [
  {
    id: 'REU-C01',
    cooperanteId: 'COOP-GIZ',
    cooperanteNombre: 'GIZ (Alemania)',
    fecha: '2026-10-24',
    tipoReunion: 'Comité Técnico',
    agenda: 'Revisión del avance de los consultores de apoyo a la Mesa 1 (Gobernanza) y Mesa 10 (Digitalización).',
    acuerdosPrincipales: 'Aprobación del plan de trabajo para el diseño de la Plataforma de Articulación MINAM-GORE y entrega de informe preliminar el 30 de noviembre.',
    responsableMINAM: 'Secretaría General / OGPP',
    estado: 'Realizada',
    actaDocumento: 'Acta_Bilateral_GIZ_24Oct2026.pdf',
  },
  {
    id: 'REU-C02',
    cooperanteId: 'COOP-USAID',
    cooperanteNombre: 'USAID (Estados Unidos)',
    fecha: '2026-10-18',
    tipoReunion: 'Mesa Bilateral',
    agenda: 'Coordinación sobre financiamiento para el centro de respuesta a delitos ambientales y monitoreo satelital.',
    acuerdosPrincipales: 'USAID dotará de equipamiento tecnológico e imágenes de alta resolución satelital a las fiscalías especializadas y MINAM para el primer trimestre de 2027.',
    responsableMINAM: 'Dirección General de Diversidad Biológica',
    estado: 'Realizada',
    actaDocumento: 'Acuerdo_USAID_MINAM_18Oct2026.pdf',
  },
  {
    id: 'REU-C03',
    cooperanteId: 'COOP-BID',
    cooperanteNombre: 'Banco Interamericano de Desarrollo (BID)',
    fecha: '2026-10-10',
    tipoReunion: 'Visita de Misión',
    agenda: 'Evaluación intermedia del Programa de Inversión en Residuos Sólidos (Mesa 4).',
    acuerdosPrincipales: 'Aceleración de los desembolsos para 4 rellenos sanitarios priorizados en Cusco, Ica, Piura y San Martín.',
    responsableMINAM: 'DGRS / Unidad Ejecutora 003',
    estado: 'Realizada',
    actaDocumento: 'Mision_Supervision_BID_Oct2026.pdf',
  },
  {
    id: 'REU-C04',
    cooperanteId: 'COOP-PNUD',
    cooperanteNombre: 'PNUD (Naciones Unidas)',
    fecha: '2026-09-29',
    tipoReunion: 'Seguimiento de Cartera',
    agenda: 'Resultados del ciclo de talleres preparatorios para los Espacios de Diálogo con Pueblos Indígenas.',
    acuerdosPrincipales: 'Financiamiento de los costos de traslado y traducción en lenguas originarias (Quechua, Awajún, Shipibo) para la sesión plenaria de noviembre.',
    responsableMINAM: 'Oficina de Cooperación Internacional',
    estado: 'Realizada',
    actaDocumento: 'Ayuda_Memoria_PNUD_29Set2026.pdf',
  },
  {
    id: 'REU-C05',
    cooperanteId: 'COOP-BM',
    cooperanteNombre: 'Banco Mundial',
    fecha: '2026-11-28',
    tipoReunion: 'Comité Técnico',
    agenda: 'Presentación del modelo de arquitectura institucional para el nuevo ROF elaborado con asistencia del banco.',
    acuerdosPrincipales: 'Presentar el borrador consolidado a los viceministros de Gestión Ambiental y Desarrollo Estratégico de Recursos Naturales.',
    responsableMINAM: 'OGPP - Modernización',
    estado: 'Programada',
    actaDocumento: 'Convocatoria_BM_28Nov2026.pdf',
  },
];

export const espaciosDialogo: EspacioDialogoItem[] = [
  {
    id: 'ED-01',
    nombre: 'Mesa de Coordinación Interinstitucional con Organismos Adscritos',
    grupoObjetivo: 'Organismos Adscritos',
    objetivo: 'Alinear las funciones de OEFA, SERNANP, SENAMHI, IIAP, IGP y SENACE con la nueva propuesta orgánica del MINAM.',
    sesionesRealizadas: 6,
    entidadesParticipantes: 6,
    proximaSesion: '2026-11-25',
    estado: 'Activo',
    liderMINAM: 'Secretaría General',
    compromisosAcordados: 18,
  },
  {
    id: 'ED-02',
    nombre: 'Mesa de Diálogo Técnico con Gremios Productivos y Empresariales',
    grupoObjetivo: 'Gremios Empresariales',
    objetivo: 'Recoger aportes de la CONFIEP, SNI, SNMPE, AGAP y CCL sobre simplificación de trámites, calidad regulatoria y economía circular.',
    sesionesRealizadas: 4,
    entidadesParticipantes: 12,
    proximaSesion: '2026-12-02',
    estado: 'Activo',
    liderMINAM: 'Viceministerio de Gestión Ambiental',
    compromisosAcordados: 9,
  },
  {
    id: 'ED-03',
    nombre: 'Espacio de Consulta y Concertación con Organizaciones de Pueblos Indígenas',
    grupoObjetivo: 'Pueblos Indígenas',
    objetivo: 'Garantizar el enfoque intercultural y la gobernanza territorial ambiental con representantes de AIDESEP, CONAP, CNA y CCP.',
    sesionesRealizadas: 3,
    entidadesParticipantes: 8,
    proximaSesion: '2026-11-28',
    estado: 'Activo',
    liderMINAM: 'Viceministerio de Desarrollo Estratégico de Recursos Naturales',
    compromisosAcordados: 11,
  },
  {
    id: 'ED-04',
    nombre: 'Red de Diálogo con la Academia y Centros Científicos de Investigación',
    grupoObjetivo: 'Academia y Científicos',
    objetivo: 'Articular la investigación científica universitaria con las necesidades de evidencia para la toma de decisiones ambientales.',
    sesionesRealizadas: 3,
    entidadesParticipantes: 14,
    proximaSesion: '2026-12-10',
    estado: 'Activo',
    liderMINAM: 'Dirección General de Investigación e Información Ambiental',
    compromisosAcordados: 6,
  },
  {
    id: 'ED-05',
    nombre: 'Foro Permanente de Participación con la Sociedad Civil y ONGs Ambientales',
    grupoObjetivo: 'Sociedad Civil',
    objetivo: 'Fomentar la vigilancia ciudadana, la transparencia activa y la rendición de cuentas del proceso de modernización institucional.',
    sesionesRealizadas: 2,
    entidadesParticipantes: 22,
    proximaSesion: '2026-12-16',
    estado: 'Activo',
    liderMINAM: 'Oficina de Comunicaciones e Imagen / OGPP',
    compromisosAcordados: 5,
  },
];

