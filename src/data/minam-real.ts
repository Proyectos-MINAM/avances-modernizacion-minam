export interface HitoHojaRuta {
  numero: number;
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: 'Realizado' | 'Pendiente';
  entidadResponsable: string;
}

export interface MesaTrabajoReal {
  id: number;
  nombre: string;
  lider: string;
  integrantes: string[];
  cooperante: string;
  estadoTrabajo: string;
  arbolAprobado: boolean;
  diagnosticoPreliminar: boolean;
  imagenArbol?: string;
  imagenActa?: string;
}

export interface SesionMesaReal {
  id: string;
  mesaId: number;
  mesaNombre: string;
  fecha: string;
  tipo: 'Sesión de Mesa' | 'Sesión con Ministro' | 'Validación IDP' | 'Coordinación Cooperante';
  tema: string;
  actaDocumento: string;
  estado: 'Aprobada' | 'Registrada' | 'Programada' | 'Confirmada / Programada';
  participantes: string;
  imagenActa?: string;
}

export interface ArbolProblemaReal {
  id: string;
  mesaId: number;
  mesaNombre: string;
  problemaCentral: string;
  causasDirectas: string[];
  causasIndirectas: string[];
  efectosDirectos: string[];
  efectosIndirectos: string[];
  fechaAprobacion: string;
  imagenUrl?: string;
  estado: 'Aprobado formalmente' | 'Validado por IDP';
}

export interface CorrespondenciaCooperanteMesa {
  mesaId: number;
  mesaNombre: string;
  liderMINAM: string;
  organismoCooperante: 'Banco Mundial' | 'BID' | 'Unión Europea' | 'GIZ' | 'SERVIR';
  profesionalResponsable: string;
  contacto: string;
  alcanceApoyo: string;
  ultimosAvances: string;
}

export interface PerfilCooperante {
  id: string;
  organismo: 'Banco Mundial' | 'BID' | 'Unión Europea' | 'GIZ' | 'SERVIR';
  nombre: string;
  cargo: string;
  correo: string;
  telefono?: string;
  perfilProfesional: string;
  mesasAsignadas: string;
}

export interface ReunionCooperanteReal {
  id: string;
  fecha: string;
  organismo: 'Banco Mundial' | 'BID' | 'Unión Europea' | 'GIZ' | 'SERVIR';
  tipo: 'Mesa Técnica' | 'Bilateral IPI' | 'Reunión de Ensayo' | 'Comité Directivo' | 'Coordinación TDR';
  tema: string;
  acuerdos: string;
  participantesMINAM: string;
  estado: 'Realizada' | 'Confirmada / Programada';
  documentoRef?: string;
}

export interface EspacioDialogoReal {
  id: string;
  grupoActor: string;
  fecha: string;
  objetivo: string;
  facilitacion: string;
  estado: 'Confirmado' | 'En convocatoria';
  participantesEstimados: string;
  modalidad: string;
}

// -------------------------------------------------------------
// 1. CIFRAS OFICIALES DEL PROCESO (Lámina 5 de Presentación IDP)
// -------------------------------------------------------------
export const cifrasOficiales = {
  mesasTrabajo: 11,
  sesionesMesas: 46,
  sesionesMinistro: 11,
  arbolesAprobados: 12, // La mesa 11 aprobó 2 árboles (RR.HH. e Integridad)
  diagnosticosPreliminares: 12,
  cooperantes: 5, // GIZ, BID, Banco Mundial, Unión Europea, SERVIR
  plazoTotalDias: 120,
  decretoSupremo: 'D.S. N.° 012-2026-MINAM',
  fechaInicio: '17/09/2026',
  fechaFin: '15/01/2027',
};

// -------------------------------------------------------------
// 2. HITOS DE LA HOJA DE RUTA (Láminas 3, 4 y 18)
// -------------------------------------------------------------
export const hitosHojaRuta: HitoHojaRuta[] = [
  // Hitos Realizados (1 a 16)
  {
    numero: 1,
    fecha: '2026-07-28',
    titulo: 'Inicio de la Gestión Ministerial',
    descripcion: 'Asunción del nuevo equipo de gestión e inicio de evaluación sectorial.',
    tipo: 'Realizado',
    entidadResponsable: 'Despacho Ministerial',
  },
  {
    numero: 2,
    fecha: '2026-07-31',
    titulo: 'Reporte del Equipo de Transferencia',
    descripcion: 'El Equipo de Transferencia reporta 112 registros de gestión ambiental y administrativa.',
    tipo: 'Realizado',
    entidadResponsable: 'Equipo de Transferencia',
  },
  {
    numero: 3,
    fecha: '2026-08-05',
    titulo: 'Creación de la Comisión de Seguimiento',
    descripcion: 'Formalización mediante Resolución Ministerial N.° 241-2026-MINAM.',
    tipo: 'Realizado',
    entidadResponsable: 'MINAM',
  },
  {
    numero: 4,
    fecha: '2026-09-17',
    titulo: 'Declaración en Modernización del Sector Ambiente',
    descripcion: 'Publicación del Decreto Supremo N.° 012-2026-MINAM que declara en modernización y reorganización al MINAM, sus programas, proyectos especiales y 7 organismos adscritos por 120 días.',
    tipo: 'Realizado',
    entidadResponsable: 'Presidencia de la República / MINAM',
  },
  {
    numero: 5,
    fecha: '2026-09-18',
    titulo: 'Encargo del Proceso a la Secretaría General',
    descripcion: 'El Despacho Ministerial encarga la conducción operativa del proceso de modernización a la Secretaría General y OGPP-OPM.',
    tipo: 'Realizado',
    entidadResponsable: 'Despacho Ministerial / SG',
  },
  {
    numero: 6,
    fecha: '2026-09-19 al 27',
    titulo: 'Diseño de Gobernanza y Temáticas',
    descripcion: 'Definición de las 11 temáticas del proceso y socialización con los viceministerios (VMDERN y VMGA).',
    tipo: 'Realizado',
    entidadResponsable: 'SG / OGPP / Viceministerios',
  },
  {
    numero: 7,
    fecha: '2026-09-28',
    titulo: 'Incorporación de Socios Cooperantes',
    descripcion: 'Inicio formal de articulación con Banco Mundial, BID, GIZ y Unión Europea.',
    tipo: 'Realizado',
    entidadResponsable: 'Oficina de Cooperación / SG',
  },
  {
    numero: 8,
    fecha: '2026-10-05',
    titulo: 'Lineamientos y Plan de Trabajo General',
    descripcion: 'OGPP eleva los Lineamientos y Plan de Trabajo General de Modernización y Reorganización del Sector Ambiental, remitido vía Memorando Múltiple N.° 003-2026-DM y Oficio Múltiple N.° 037-2026-DM.',
    tipo: 'Realizado',
    entidadResponsable: 'OGPP - OPM',
  },
  {
    numero: 9,
    fecha: '2026-10-07',
    titulo: 'Instalación de las 11 Mesas de Trabajo',
    descripcion: 'Instalación formal de las 11 mesas temáticas con emisión del Documento Orientador estandarizado.',
    tipo: 'Realizado',
    entidadResponsable: 'Instancia Directiva del Proceso (IDP)',
  },
  {
    numero: 10,
    fecha: '2026-10-09 al 15',
    titulo: 'Ciclo de 35 Sesiones Técnicas',
    descripcion: 'Desarrollo intensivo de 35 sesiones en las 11 mesas de trabajo para formulación del diagnóstico.',
    tipo: 'Realizado',
    entidadResponsable: 'Líderes de Mesas Técnicas',
  },
  {
    numero: 11,
    fecha: '2026-10-16',
    titulo: 'Aprobación de los 12 Árboles de Problemas',
    descripcion: 'Cierre y aprobación en actas de los 12 árboles de problemas (Mesa 11 formuló 2: Recursos Humanos e Integridad).',
    tipo: 'Realizado',
    entidadResponsable: 'Mesas 1 a 11',
  },
  {
    numero: 12,
    fecha: '2026-10-19 al 21',
    titulo: 'Recolección de Evidencia y TDR de Cooperantes',
    descripcion: 'Recolección de evidencia empírica de causas y conclusión de TDR con Banco Mundial y Unión Europea.',
    tipo: 'Realizado',
    entidadResponsable: 'Mesas Técnicas / OGPP',
  },
  {
    numero: 13,
    fecha: '2026-10-30 al 04/11',
    titulo: 'Elaboración de Diagnósticos Preliminares',
    descripcion: 'Redacción y consolidación de los documentos de diagnóstico preliminar basados en los árboles aprobados.',
    tipo: 'Realizado',
    entidadResponsable: 'Equipos Técnicos de Mesas',
  },
  {
    numero: 14,
    fecha: '2026-11-05 al 06',
    titulo: 'Presentación de Diagnósticos por OGPP',
    descripcion: 'OGPP presenta los diagnósticos preliminares consolidados a cada una de las 11 mesas de trabajo.',
    tipo: 'Realizado',
    entidadResponsable: 'OGPP - OPM',
  },
  {
    numero: 15,
    fecha: '2026-11-06',
    titulo: 'Habilitación de Minisitio Web en gob.pe',
    descripcion: 'Publicación oficial del espacio web del proceso de modernización para recepción de comentarios y transparencia ciudadana.',
    tipo: 'Realizado',
    entidadResponsable: 'MINAM / OTI',
  },
  {
    numero: 16,
    fecha: '2026-11-10',
    titulo: 'Elevación y Validación de los 12 Diagnósticos por IDP',
    descripcion: 'La Instancia Directiva del Proceso (IDP) valida formalmente los 12 diagnósticos preliminares sectoriales.',
    tipo: 'Realizado',
    entidadResponsable: 'Instancia Directiva del Proceso (IDP)',
  },
  // Hitos Pendientes / Próximos (17 a 25)
  {
    numero: 17,
    fecha: '2026-11-17',
    titulo: 'Elevación del Informe de Avance (Primeros 70 Días)',
    descripcion: 'Remisión formal del informe de avance institucional al Despacho Ministerial y PCM.',
    tipo: 'Pendiente',
    entidadResponsable: 'Secretaría General / OGPP',
  },
  {
    numero: 18,
    fecha: '2026-11-17 al 24',
    titulo: 'Ciclo de Espacios de Diálogo Ciudadano y Sectorial',
    descripcion: 'Desarrollo de encuentros de diálogo con juventudes, Poder Ejecutivo, ONGs, sociedad civil, academia y gremios empresariales.',
    tipo: 'Pendiente',
    entidadResponsable: 'MINAM / Facilitación GIZ',
  },
  {
    numero: 19,
    fecha: '2026-12-11',
    titulo: 'Identificación y Selección de Medidas de Reforma',
    descripcion: 'Selección técnica de las medidas normativas, organizacionales y de procesos para la modernización.',
    tipo: 'Pendiente',
    entidadResponsable: 'Mesas Técnicas / Consultores',
  },
  {
    numero: 20,
    fecha: '2026-12-17',
    titulo: 'Validación de Medidas de Reforma por la Instancia',
    descripcion: 'Reunión plenaria de la Instancia Directiva del Proceso (IDP) para validar la matriz de reformas.',
    tipo: 'Pendiente',
    entidadResponsable: 'Instancia Directiva del Proceso (IDP)',
  },
  {
    numero: 21,
    fecha: '2026-12-21',
    titulo: 'Remisión de Informes de Actividades de Líderes a OGPP',
    descripcion: 'Entrega formal de los informes finales de actividades por los líderes de las 11 mesas a la OGPP.',
    tipo: 'Pendiente',
    entidadResponsable: 'Líderes de Mesas 1 a 11',
  },
  {
    numero: 22,
    fecha: '2026-12-30',
    titulo: 'Elaboración del Informe Final Consolidado',
    descripcion: 'OGPP consolida el Informe Final del Proceso de Modernización y Reorganización del Sector Ambiental.',
    tipo: 'Pendiente',
    entidadResponsable: 'OGPP - OPM',
  },
  {
    numero: 23,
    fecha: '2027-01-06',
    titulo: 'Conformidad de Viceministerios y Secretaría General',
    descripcion: 'Revisión y firma de conformidad técnica de VMDERN, VMGA y SG.',
    tipo: 'Pendiente',
    entidadResponsable: 'VMDERN / VMGA / SG',
  },
  {
    numero: 24,
    fecha: '2027-01-15',
    titulo: 'Aprobación del Informe Final de Reorganización',
    descripcion: 'Cierre del plazo de 120 días calendario establecido por el D.S. N.° 012-2026-MINAM y aprobación del expediente final para remisión a PCM.',
    tipo: 'Pendiente',
    entidadResponsable: 'Despacho Ministerial / MINAM',
  },
  {
    numero: 25,
    fecha: '2027',
    titulo: 'Implementación de Medidas y Nuevo Marco Orgánico',
    descripcion: 'Ejecución del cronograma de implementación de la reestructuración y nuevo ROF institucional.',
    tipo: 'Pendiente',
    entidadResponsable: 'MINAM y Organismos Adscritos',
  },
];

// -------------------------------------------------------------
// 3. MESAS DE TRABAJO REALES (Documento Mesas_integrantes_cooperantes_estado)
// -------------------------------------------------------------
export const mesasReales: MesaTrabajoReal[] = [
  {
    id: 1,
    nombre: 'Gobernanza ambiental, marcos normativos, sistemas funcionales y descentralización',
    lider: 'Fernández Neciosup, José Ítalo (SG)',
    integrantes: [
      'VMDERN: Lazarte Mariño',
      'VMGA: Soto Torres',
      'DGPIGA: Mendoza Díaz',
      'OGPP: Alemán Saavedra',
      'OGAJ: Sarmiento Rojas',
      'OGASA: Paredes Diez Canseco',
      'DGCCD: Huaranca Rosales',
    ],
    cooperante: 'Banco Mundial',
    estadoTrabajo: 'Banco Mundial: reunión técnica el 29/10; árboles y diagnósticos compartidos el 06/11. El 19/11 se acordaron ámbitos de aporte y plazos de entrega con los expertos del BM.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
    imagenArbol: '/minam-docs/arbol-mesa-1.png',
  },
  {
    id: 2,
    nombre: 'Servicios al ciudadano y simplificación administrativa',
    lider: 'Espinoza Salvatierra, Jerry (SG)',
    integrantes: [
      'OGPP: Flores Menéndez',
      'OPM: Cano Pajuelo',
      'VMDERN: Peña Cucho',
      'DGCCD: Campos García',
      'VMGA: Baraybar Minaya',
    ],
    cooperante: 'BID',
    estadoTrabajo: 'Árbol aprobado. Equipo consultor del BID (Mario Huapaya, Jaime Fernández-Baca, Lina Barbosa) incorporado. Reunión de precisión de TDR realizada el 10/11.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
  },
  {
    id: 3,
    nombre: 'Ciencia, información ambiental y gestión del riesgo',
    lider: 'Santisteban Pérez, César Ricardo (VMDERN)',
    integrantes: [
      'VMGA: Cama Torres',
      'OGASA (UFDNGRD): Morales Ávalos',
      'IGP: Delgado Ortega',
      'IIAP: Revilla Chávez',
      'INAIGEM: Moschella Miloslavich',
      'DGCCD: Céspedes Reyes',
      'DGDB: Neyra Hidalgo',
      'SENAMHI: Ávalos Roldán',
    ],
    cooperante: 'Unión Europea',
    estadoTrabajo: 'Unión Europea: reuniones técnicas el 09/11 y 11/11. Entre el 17 y el 20/11 se realizaron reuniones con SENAMHI, IIAP, INAIGEM e IGP; el 19/11 también con DGOTGIRN, DGCCD y VMGA.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
  },
  {
    id: 4,
    nombre: 'Cierre de brechas sectoriales',
    lider: 'García Torreblanca, Elvis Stevens (VMDERN)',
    integrantes: [
      'VMGA: Rojas Carlotto',
      'DGOTGIRN: Garay Vera',
      'DGGRS: Lao Olivares',
      'DGCCD: Lock Navarro',
      'DGDB: Ricaldi Maita',
      'OGPP: Sicchar Rondinelli',
    ],
    cooperante: 'Banco Mundial',
    estadoTrabajo: 'Árbol y acta de diagnóstico preliminar aprobados. Profesional responsable del Banco Mundial: Eun Joo Allison Yi (Especialista Senior en Medio Ambiente).',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
    imagenActa: '/minam-docs/acta-mesa-4.png',
  },
  {
    id: 5,
    nombre: 'Gestión integrada de programas, proyectos e intervenciones',
    lider: 'Fernández Neciosup, José Ítalo (SG)',
    integrantes: [
      'OGPP: Aspajo Grández',
      'VMGA: Rojas Carlotto',
      'DGCCD: Cerna Rondinel',
      'DGDB: Menéndez Huapaya',
      'VMDERN: Ynga La Plata',
    ],
    cooperante: 'Banco Mundial',
    estadoTrabajo: 'Banco Mundial: reunión el 29/10 y árboles y diagnósticos compartidos el 06/11. El documento también registra una reunión GIZ–OPM con la mesa el 20/11 sobre metodología de alternativas de reforma; requiere confirmar la naturaleza de ese apoyo.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
  },
  {
    id: 6,
    nombre: 'Modernización de tecnologías de información',
    lider: 'Peña Cardoza, Ana (SG)',
    integrantes: [
      'OGTI: Ascencio Zúñiga',
      'DGOTGIRN: Montero Pérez',
      'DGCCD: Cáceres Huisacayna',
      'DGECIA: Álvarez Ramos',
    ],
    cooperante: 'Banco Mundial',
    estadoTrabajo: 'Banco Mundial: acompañamiento de Nagaraja Rao Harshadeep; reunión el 29/10, remisión de árboles y diagnósticos el 06/11 y coordinación de aportes y plazos el 19/11.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
  },
  {
    id: 7,
    nombre: 'Optimización del proceso de certificación ambiental',
    lider: 'Soto Torres, Raquel Hilianova (VMGA)',
    integrantes: [
      'DGPIGA: Mendoza Díaz',
      'SENACE: Cuba Castillo',
      'SG: Espinoza Salvatierra',
      'OGAJ: Palma Encalada',
    ],
    cooperante: 'GIZ / BID',
    estadoTrabajo: 'Asistencia técnica dual: GIZ con Cynthia Arguedas (acciones desde el 26/10; reunión de metodología el 20/11) y BID con el equipo de Mario Huapaya (reunión sobre TDR agendada el 10/11).',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
    imagenArbol: '/minam-docs/arbol-mesa-7.png',
  },
  {
    id: 8,
    nombre: 'Optimización presupuestal y financiera',
    lider: 'Fernández Neciosup, José Ítalo (SG)',
    integrantes: [
      'VMGA: Guerrero Díaz',
      'VMDERN: Aguilar Guevara',
      'OGPP: Gallardo Camacho',
      'OGCAI: Reyes Parra',
    ],
    cooperante: 'Banco Mundial',
    estadoTrabajo: 'Banco Mundial: acompañamiento de Antonio Cusato y Emilia Timmis. Reunión técnica el 29/10, remisión de insumos el 06/11 y coordinación de aportes y plazos el 19/11.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
    imagenActa: '/minam-docs/acta-mesa-8.png',
  },
  {
    id: 9,
    nombre: 'Trabajo articulado contra economías ilegales',
    lider: 'Sáenz Rabanal, Jorge Luis (VMDERN)',
    integrantes: [
      'VMGA: Gallegos Vargas',
      'SG: Peña Cardoza',
      'DGCA: Quispe Estrada',
      'OGASA: Hoyos Villayzán',
      'SERNANP: Castillo Ávila',
    ],
    cooperante: 'Unión Europea',
    estadoTrabajo: 'Unión Europea: equipo de Nicolás Zevallos Trigoso y Fanny Sánchez Torres; reuniones el 10/11, 13/11 y 18/11 para coordinación y criterios de propuestas de medidas de reforma.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
    imagenActa: '/minam-docs/acta-mesa-9.png',
  },
  {
    id: 10,
    nombre: 'Optimización de la fiscalización ambiental',
    lider: 'Oblitas Méndez de Díaz, Jessica Violeta (VMGA)',
    integrantes: [
      'SG: Espinoza Salvatierra',
      'OGAJ: Pareja Cabrejos',
      'OEFA: Fischer Battistini',
    ],
    cooperante: 'BID',
    estadoTrabajo: 'Árbol de problemas aprobado formalmente. Consultoría BID conducida por Mario Huapaya Nava (ex Secretario Técnico del Tribunal de Fiscalización Ambiental de OEFA).',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
    imagenArbol: '/minam-docs/arbol-mesa-10.png',
  },
  {
    id: 11,
    nombre: 'Recursos humanos e integridad pública',
    lider: 'Salardi Bramont, Carmen (SG)',
    integrantes: [
      'OGRH: Portilla Jaén',
      'OII: Medina Campos',
      'OPM: Santamaría Velásquez',
      'VMGA: Baraybar Minaya',
      'VMDERN: Ríos Tejada',
    ],
    cooperante: 'GIZ / SERVIR',
    estadoTrabajo: 'Dos árboles: Recursos Humanos e Integridad Pública. GIZ: Cynthia Arguedas inició acciones el 26/10 y presentó metodología de alternativas el 20/11. SERVIR: apoyo técnico solicitado por SG en reunión del 06/11.',
    arbolAprobado: true,
    diagnosticoPreliminar: true,
  },
];

// -------------------------------------------------------------
// 4. SESIONES OFICIALES CON MESAS DE TRABAJO Y MINISTRO
// -------------------------------------------------------------
export const sesionesReales: SesionMesaReal[] = [
  {
    id: 'SES-01',
    mesaId: 0,
    mesaNombre: 'Plenaria General',
    fecha: '2026-10-07',
    tipo: 'Sesión de Mesa',
    tema: 'Instalación simultánea de las 11 Mesas Técnicas de Trabajo y entrega del Documento Orientador Metodológico.',
    actaDocumento: 'Acta_Instalacion_Mesas_07Oct2026.pdf',
    estado: 'Aprobada',
    participantes: 'Integrantes titulares de las 11 mesas, Secretaría General y OGPP-OPM',
  },
  {
    id: 'SES-02',
    mesaId: 1,
    mesaNombre: 'Gobernanza ambiental y marcos normativos',
    fecha: '2026-10-10',
    tipo: 'Sesión con Ministro',
    tema: 'Sesión de trabajo con el Ministro del Ambiente: Diagnóstico de gobernanza multinivel y rectoría SNGA.',
    actaDocumento: 'Acta_Mesa1_Ministro_10Oct2026.pdf',
    estado: 'Aprobada',
    participantes: 'Ministro del Ambiente, Líder José Ítalo Fernández y equipo técnico Mesa 1',
  },
  {
    id: 'SES-03',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental y gestión del riesgo',
    fecha: '2026-10-12',
    tipo: 'Sesión con Ministro',
    tema: 'Sesión de trabajo con el Ministro del Ambiente: Articulación de institutos de investigación (SENAMHI, IIAP, IGP, INAIGEM).',
    actaDocumento: 'Acta_Mesa3_Ministro_12Oct2026.pdf',
    estado: 'Aprobada',
    participantes: 'Ministro del Ambiente, Líder César Santisteban y titulares de IPIs',
  },
  {
    id: 'SES-04',
    mesaId: 10,
    mesaNombre: 'Optimización de la fiscalización ambiental',
    fecha: '2026-10-14',
    tipo: 'Sesión con Ministro',
    tema: 'Sesión de trabajo con el Ministro del Ambiente: Estrategia de fortalecimiento del SINEFA y rol del OEFA.',
    actaDocumento: 'Acta_Mesa10_Ministro_14Oct2026.pdf',
    estado: 'Aprobada',
    participantes: 'Ministro del Ambiente, Líder Jessica Oblitas y equipo OEFA',
  },
  {
    id: 'SES-05',
    mesaId: 1,
    mesaNombre: 'Gobernanza ambiental y descentralización',
    fecha: '2026-10-16',
    tipo: 'Sesión de Mesa',
    tema: 'Sesión de validación y suscripción de acta de aprobación final del Árbol de Problemas de Gobernanza.',
    actaDocumento: 'Acta_Cierre_Arbol_Mesa1.pdf',
    estado: 'Aprobada',
    participantes: 'VMDERN, VMGA, DGPIGA, OGPP, OGAJ, OGASA, DGCCD',
    imagenActa: '/minam-docs/arbol-mesa-1.png',
  },
  {
    id: 'SES-06',
    mesaId: 7,
    mesaNombre: 'Optimización de la certificación ambiental',
    fecha: '2026-10-16',
    tipo: 'Sesión de Mesa',
    tema: 'Sesión de validación y suscripción de acta de aprobación final del Árbol de Problemas de Certificación.',
    actaDocumento: 'Acta_Cierre_Arbol_Mesa7.pdf',
    estado: 'Aprobada',
    participantes: 'Líder Raquel Soto, SENACE, DGPIGA, SG, OGAJ',
    imagenActa: '/minam-docs/arbol-mesa-7.png',
  },
  {
    id: 'SES-07',
    mesaId: 10,
    mesaNombre: 'Optimización de la fiscalización ambiental',
    fecha: '2026-10-16',
    tipo: 'Sesión de Mesa',
    tema: 'Sesión de validación y suscripción de acta de aprobación final del Árbol de Problemas de Fiscalización.',
    actaDocumento: 'Acta_Cierre_Arbol_Mesa10.pdf',
    estado: 'Aprobada',
    participantes: 'Líder Jessica Oblitas, OEFA, OGAJ, SG',
    imagenActa: '/minam-docs/arbol-mesa-10.png',
  },
  {
    id: 'SES-08',
    mesaId: 4,
    mesaNombre: 'Cierre de brechas sectoriales',
    fecha: '2026-11-04',
    tipo: 'Sesión de Mesa',
    tema: 'Revisión y suscripción formal del Acta de Reunión de Diagnóstico Preliminar de Brechas Sectoriales.',
    actaDocumento: 'Acta_Diagnostico_Mesa4.pdf',
    estado: 'Aprobada',
    participantes: 'Líder Elvis García Torreblanca y directores generales de línea',
    imagenActa: '/minam-docs/acta-mesa-4.png',
  },
  {
    id: 'SES-09',
    mesaId: 8,
    mesaNombre: 'Optimización presupuestal y financiera',
    fecha: '2026-11-04',
    tipo: 'Sesión de Mesa',
    tema: 'Revisión y suscripción formal del Acta de Reunión de Diagnóstico Preliminar Presupuestal y Financiero.',
    actaDocumento: 'Acta_Diagnostico_Mesa8.pdf',
    estado: 'Aprobada',
    participantes: 'Líder José Ítalo Fernández, OGPP, OGCAI, VMGA, VMDERN',
    imagenActa: '/minam-docs/acta-mesa-8.png',
  },
  {
    id: 'SES-10',
    mesaId: 9,
    mesaNombre: 'Trabajo articulado contra economías ilegales',
    fecha: '2026-11-05',
    tipo: 'Sesión de Mesa',
    tema: 'Revisión y suscripción formal del Acta de Reunión de Diagnóstico Preliminar contra Economías Ilegales.',
    actaDocumento: 'Acta_Diagnostico_Mesa9.pdf',
    estado: 'Aprobada',
    participantes: 'Líder Jorge Luis Sáenz Rabanal, SERNANP, DGCA, OGASA',
    imagenActa: '/minam-docs/acta-mesa-9.png',
  },
  {
    id: 'SES-11',
    mesaId: 0,
    mesaNombre: 'Instancia Directiva del Proceso (IDP)',
    fecha: '2026-11-10',
    tipo: 'Validación IDP',
    tema: 'Sesión plenaria de la Instancia Directiva del Proceso: Elevación y validación de los 12 diagnósticos preliminares.',
    actaDocumento: 'Acta_IDP_Validacion_12_Diagnosticos.pdf',
    estado: 'Aprobada',
    participantes: 'Despacho Ministerial, VMDERN, VMGA, Secretaría General, OGPP',
  },
  {
    id: 'SES-12',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental y gestión del riesgo',
    fecha: '2026-11-11',
    tipo: 'Coordinación Cooperante',
    tema: 'Reunión híbrida de presentación del equipo consultor de la Unión Europea conducida por OGPP-OPM y definición de agenda con IPIs.',
    actaDocumento: 'Ayuda_Memoria_Presentacion_UE_Mesa3.pdf',
    estado: 'Aprobada',
    participantes: 'Consultores UE (Marcos Alegre, Nancy Chauca), Líder César Santisteban, IPIs (SENAMHI, IIAP, INAIGEM, IGP)',
  },
  {
    id: 'SES-13',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental / SENAMHI',
    fecha: '2026-11-17',
    tipo: 'Coordinación Cooperante',
    tema: 'Reunión bilateral presencial del equipo consultor de la Unión Europea con la Presidencia Ejecutiva y equipo técnico del SENAMHI (14:00 - 17:00).',
    actaDocumento: 'Acta_Bilateral_UE_SENAMHI.pdf',
    estado: 'Confirmada / Programada',
    participantes: 'Equipo consultor UE y equipo directivo de SENAMHI',
  },
  {
    id: 'SES-14',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental / IIAP',
    fecha: '2026-11-18',
    tipo: 'Coordinación Cooperante',
    tema: 'Reunión bilateral virtual del equipo consultor de la Unión Europea con la Presidencia y científicos del IIAP (10:00 - 13:00).',
    actaDocumento: 'Acta_Bilateral_UE_IIAP.pdf',
    estado: 'Confirmada / Programada',
    participantes: 'Equipo consultor UE y equipo directivo y de investigación de IIAP',
  },
  {
    id: 'SES-15',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental / INAIGEM',
    fecha: '2026-11-19',
    tipo: 'Coordinación Cooperante',
    tema: 'Reunión bilateral híbrida del equipo consultor de la Unión Europea con el equipo técnico del INAIGEM (10:00 - 13:00).',
    actaDocumento: 'Acta_Bilateral_UE_INAIGEM.pdf',
    estado: 'Confirmada / Programada',
    participantes: 'Equipo consultor UE y equipo directivo de INAIGEM',
  },
  {
    id: 'SES-16',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental / Sede Central',
    fecha: '2026-11-19',
    tipo: 'Coordinación Cooperante',
    tema: 'Reuniones bilaterales presenciales en Sala Paracas del MINAM con punto focal DGOTGIRN (14:00), DGCCD (15:00) y VMGA.',
    actaDocumento: 'Acta_Bilateral_UE_SedeCentral.pdf',
    estado: 'Confirmada / Programada',
    participantes: 'Equipo consultor UE, DGOTGIRN, DGCCD y Viceministerio de Gestión Ambiental',
  },
  {
    id: 'SES-17',
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental / IGP',
    fecha: '2026-11-20',
    tipo: 'Coordinación Cooperante',
    tema: 'Reunión bilateral presencial del equipo consultor de la Unión Europea con la Presidencia y equipo del IGP (15:30 - 18:30).',
    actaDocumento: 'Acta_Bilateral_UE_IGP.pdf',
    estado: 'Confirmada / Programada',
    participantes: 'Equipo consultor UE y Presidencia Ejecutiva del IGP',
  },
];

// -------------------------------------------------------------
// 5. CUADRO DE CORRESPONDENCIA COOPERANTES ↔ MESAS (Lámina 13)
// -------------------------------------------------------------
export const correspondenciaCooperantesMesas: CorrespondenciaCooperanteMesa[] = [
  {
    mesaId: 1,
    mesaNombre: 'Gobernanza ambiental, marcos normativos, sistemas funcionales y descentralización',
    liderMINAM: 'José Ítalo Fernández Neciosup (SG)',
    organismoCooperante: 'Banco Mundial',
    profesionalResponsable: 'Samuel Garoni (Especialista Senior en Gobernanza)',
    contacto: 'sgaroni@worldbankgroup.org',
    alcanceApoyo: 'Asistencia técnica en reformas de administración pública, descentralización, gobernanza multinivel y rectoría de sistemas funcionales.',
    ultimosAvances: '29/10: reunión con OGPP, SG y OGCAI. 06/11: árboles y diagnósticos compartidos. 19/11: acordados ámbitos de aporte y plazos con expertos del BM.',
  },
  {
    mesaId: 2,
    mesaNombre: 'Servicios al ciudadano y simplificación administrativa',
    liderMINAM: 'Jerry Espinoza Salvatierra (SG)',
    organismoCooperante: 'BID',
    profesionalResponsable: 'Mario Huapaya Nava (Consultor Principal) con Jaime Fernández-Baca y Lina Barbosa',
    contacto: 'mariohuapayaperu@gmail.com / 977106501',
    alcanceApoyo: 'Equipo consultor BID asignado a la mesa de servicios al ciudadano y simplificación administrativa; precisiones a los términos de referencia.',
    ultimosAvances: 'Reunión el 10/11 para precisiones técnicas al TDR del equipo consultor.',
  },
  {
    mesaId: 3,
    mesaNombre: 'Ciencia, información ambiental y gestión del riesgo',
    liderMINAM: 'César Ricardo Santisteban Pérez (VMDERN)',
    organismoCooperante: 'Unión Europea',
    profesionalResponsable: 'Marcos Alegre Chang (Consultor Principal), Nancy Chauca Vásquez, Gisella Aragón Peñaloza y Angela Rosas Zorrilla',
    contacto: 'malegre@grupogea.org.pe / 99946719911',
    alcanceApoyo: 'Acompañamiento a la Mesa 3 mediante reuniones técnicas y bilaterales con SENAMHI, IIAP, INAIGEM e IGP.',
    ultimosAvances: '09/11 y 11/11: reuniones técnicas. 17–20/11: reuniones con SENAMHI, IIAP, INAIGEM e IGP; 19/11: DGOTGIRN, DGCCD y VMGA.',
  },
  {
    mesaId: 4,
    mesaNombre: 'Cierre de brechas sectoriales',
    liderMINAM: 'Elvis Stevens García Torreblanca (VMDERN)',
    organismoCooperante: 'Banco Mundial',
    profesionalResponsable: 'Eun Joo Allison Yi (Especialista Senior en Medio Ambiente)',
    contacto: 'eyi@worldbankgroup.org',
    alcanceApoyo: 'Acompañamiento técnico del Banco Mundial a la Mesa 4 sobre cierre de brechas sectoriales.',
    ultimosAvances: '29/10: reunión con el BM. 06/11: árboles y diagnósticos compartidos. 19/11: acordados aportes y plazos con expertos del BM.',
  },
  {
    mesaId: 5,
    mesaNombre: 'Gestión integrada de programas, proyectos e intervenciones',
    liderMINAM: 'José Ítalo Fernández Neciosup (SG)',
    organismoCooperante: 'Banco Mundial',
    profesionalResponsable: 'Equipo Técnico de Gobernanza y Medio Ambiente del Banco Mundial',
    contacto: 'sgaroni@worldbankgroup.org',
    alcanceApoyo: 'Acompañamiento del Banco Mundial a la Mesa 5 sobre gestión integrada de programas, proyectos e intervenciones.',
    ultimosAvances: '29/10: reunión con el BM. 06/11: árboles y diagnósticos compartidos. 20/11: reunión GIZ–OPM con la mesa sobre metodología de alternativas; relación de apoyo por confirmar.',
  },
  {
    mesaId: 6,
    mesaNombre: 'Modernización de tecnologías de información',
    liderMINAM: 'Ana Peña Cardoza (SG)',
    organismoCooperante: 'Banco Mundial',
    profesionalResponsable: 'Nagaraja Rao Harshadeep (Especialista Líder en IA y Tecnologías Digitales)',
    contacto: 'harsh@worldbankgroup.org',
    alcanceApoyo: 'Acompañamiento del especialista del Banco Mundial en tecnologías digitales, datos y gestión ambiental.',
    ultimosAvances: '29/10: reunión técnica BM. 06/11: árboles y diagnósticos compartidos. 19/11: acordados ámbitos de aporte y plazos.',
  },
  {
    mesaId: 7,
    mesaNombre: 'Optimización del proceso de certificación ambiental',
    liderMINAM: 'Raquel Hilianova Soto Torres (VMGA)',
    organismoCooperante: 'GIZ',
    profesionalResponsable: 'Cynthia Arguedas Gourzong (Consultora GIZ)',
    contacto: '985832319',
    alcanceApoyo: 'Asistencia técnica de GIZ en la Mesa 7 y metodología de alternativas de medidas de reforma y mejora organizacional.',
    ultimosAvances: '26/10: inicio de acciones GIZ. 20/11: GIZ y OPM explicaron metodología de alternativas de reforma a la mesa.',
  },
  {
    mesaId: 7,
    mesaNombre: 'Optimización del proceso de certificación ambiental',
    liderMINAM: 'Raquel Hilianova Soto Torres (VMGA)',
    organismoCooperante: 'BID',
    profesionalResponsable: 'Mario Huapaya Nava (Consultor Principal), Jaime Fernández-Baca y Lina Barbosa',
    contacto: 'mariohuapayaperu@gmail.com / 977106501',
    alcanceApoyo: 'Equipo consultor BID registrado para la Mesa 7; precisiones a los términos de referencia.',
    ultimosAvances: '10/11: reunión con el BID agendada para determinar precisiones al TDR. El documento no confirma su realización.',
  },
  {
    mesaId: 8,
    mesaNombre: 'Optimización presupuestal y financiera',
    liderMINAM: 'José Ítalo Fernández Neciosup (SG)',
    organismoCooperante: 'Banco Mundial',
    profesionalResponsable: 'Antonio Cusato (Economista de País) y Emilia Timmis (Economista Senior)',
    contacto: 'acusatonovell@worldbankgroup.org',
    alcanceApoyo: 'Acompañamiento del equipo de política fiscal y finanzas públicas del Banco Mundial a la Mesa 8.',
    ultimosAvances: '29/10: reunión BM. 06/11: árboles y diagnósticos compartidos. 19/11: acordados aportes y plazos con expertos del BM.',
  },
  {
    mesaId: 9,
    mesaNombre: 'Trabajo articulado contra economías ilegales',
    liderMINAM: 'Jorge Luis Sáenz Rabanal (VMDERN)',
    organismoCooperante: 'Unión Europea',
    profesionalResponsable: 'Nicolás Zevallos Trigoso (Consultor Principal) y Fanny Sánchez Torres',
    contacto: 'nicolas.zevallos@gmail.com / 971272670',
    alcanceApoyo: 'Apoyo técnico de la Unión Europea a la Mesa 9 sobre trabajo articulado contra economías ilegales.',
    ultimosAvances: '06/11: insumos disponibles. 10/11: primera reunión técnica. 13/11: reunión con la mesa y acuerdo de remisión del primer producto. 18/11: unificación de criterios para propuestas de reforma.',
  },
  {
    mesaId: 10,
    mesaNombre: 'Optimización de la fiscalización ambiental',
    liderMINAM: 'Jessica Violeta Oblitas Méndez de Díaz (VMGA)',
    organismoCooperante: 'BID',
    profesionalResponsable: 'Mario Huapaya Nava (Consultor Principal) con Jaime Fernández-Baca y Lina Barbosa',
    contacto: 'mariohuapayaperu@gmail.com / 977106501',
    alcanceApoyo: 'Equipo consultor BID asignado a la Mesa 10 sobre optimización de la fiscalización ambiental; precisiones al TDR.',
    ultimosAvances: '10/11: reunión con el BID agendada para precisar los TDR. No se acredita su realización en el documento recibido.',
  },
  {
    mesaId: 11,
    mesaNombre: 'Recursos humanos e integridad pública',
    liderMINAM: 'Carmen Salardi Bramont (SG)',
    organismoCooperante: 'GIZ',
    profesionalResponsable: 'Cynthia Arguedas Gourzong (Consultora GIZ) con asistencia técnica de SERVIR',
    contacto: '985832319',
    alcanceApoyo: 'Asistencia técnica GIZ en recursos humanos e integridad pública; metodología de alternativas de reforma y mejora organizacional.',
    ultimosAvances: '26/10: inicio de acciones GIZ. 06/11: SG solicitó apoyo técnico a SERVIR. 20/11: GIZ y OPM presentaron metodología de alternativas de reforma.',
  },
  {
    mesaId: 11,
    mesaNombre: 'Recursos humanos e integridad pública',
    liderMINAM: 'Carmen Salardi Bramont (SG)',
    organismoCooperante: 'SERVIR',
    profesionalResponsable: 'Apoyo técnico solicitado por la Secretaría General',
    contacto: '',
    alcanceApoyo: 'Solicitud de asistencia técnica institucional para la Mesa 11; no consta profesional asignado ni entrega en el documento.',
    ultimosAvances: '06/11: reunión con la Presidenta Ejecutiva de SERVIR en la que SG solicitó apoyo técnico.',
  },
];

// -------------------------------------------------------------
// 6. PERFILES DE COOPERANTES Y CONSULTORES OFICIALES
// -------------------------------------------------------------
export const perfilesCooperantes: PerfilCooperante[] = [
  {
    id: 'BM-GARONI',
    organismo: 'Banco Mundial',
    nombre: 'Samuel Garoni',
    cargo: 'Especialista Senior en Gobernanza',
    correo: 'sgaroni@worldbankgroup.org',
    perfilProfesional: 'Especialista Senior en Gobernanza de la Práctica Global de Gobernanza del Banco Mundial, incorporado en 2018. Especializado en reformas del sector público, prestación de servicios a nivel local, gobernanza multinivel, descentralización y diseño de reformas centradas en las personas.',
    mesasAsignadas: 'Mesa 1 (Gobernanza y Descentralización) y Mesa 5 (Gestión de Programas)',
  },
  {
    id: 'BM-YI',
    organismo: 'Banco Mundial',
    nombre: 'Eun Joo Allison Yi',
    cargo: 'Especialista Senior en Medio Ambiente',
    correo: 'eyi@worldbankgroup.org',
    perfilProfesional: 'Especialista Senior en Medio Ambiente del Banco Mundial con más de 20 años de trayectoria internacional en financiamiento climático, estrategias de crecimiento verde y desarrollo de infraestructura sostenible en América Latina y Asia.',
    mesasAsignadas: 'Mesa 4 (Cierre de Brechas Sectoriales)',
  },
  {
    id: 'BM-HARSH',
    organismo: 'Banco Mundial',
    nombre: 'Nagaraja Rao Harshadeep',
    cargo: 'Especialista Líder en IA y Tecnologías Digitales',
    correo: 'harsh@worldbankgroup.org',
    perfilProfesional: 'Especialista Líder en Medio Ambiente y líder de la agenda de tecnologías digitales e inteligencia artificial del Departamento Global de Medio Ambiente del Banco Mundial. Casi tres décadas de experiencia en observación de la Tierra, análisis geoespacial y analítica digital aplicada a recursos naturales.',
    mesasAsignadas: 'Mesa 6 (Modernización de TI)',
  },
  {
    id: 'BM-CUSATO',
    organismo: 'Banco Mundial',
    nombre: 'Antonio Cusato',
    cargo: 'Economista de País para el Perú',
    correo: 'acusatonovell@worldbankgroup.org',
    perfilProfesional: 'Economista de País del Banco Mundial para el Perú. Especialista en macroeconomía, política fiscal, finanzas públicas y reformas estructurales. Coautor de los principales diagnósticos fiscales del Banco y participante en la preparación del Diagnóstico de País 2027. Ph.D. en Economía por Rutgers University.',
    mesasAsignadas: 'Mesa 8 (Optimización Presupuestal y Financiera)',
  },
  {
    id: 'BM-TIMMIS',
    organismo: 'Banco Mundial',
    nombre: 'Emilia Timmis',
    cargo: 'Economista Senior en Política Fiscal y Crecimiento',
    correo: '',
    perfilProfesional: 'Economista Senior del Banco Mundial y miembro del equipo de Política Fiscal y Crecimiento, con enfoque en el Perú. Especializada en política fiscal, deuda pública, crecimiento económico y reformas estructurales.',
    mesasAsignadas: 'Mesa 8 (Optimización Presupuestal y Financiera)',
  },
  {
    id: 'BID-HUAPAYA',
    organismo: 'BID',
    nombre: 'Mario Huapaya Nava',
    cargo: 'Consultor Principal / Consultor Senior del BID',
    correo: 'mariohuapayaperu@gmail.com',
    telefono: '977106501',
    perfilProfesional: 'Consultor Senior del Grupo Especial de Minería para la región Andina del Banco Interamericano de Desarrollo (BID). Abogado con maestría en Administración Pública por la Maxwell School of Syracuse University (EE.UU.) y maestría en Derecho de la Empresa por la PUCP. Ex Secretario Técnico del Tribunal de Fiscalización Ambiental del OEFA. Amplia experiencia en descentralización, empleo público y sistemas administrativos.',
    mesasAsignadas: 'Mesa 2 (Servicios al Ciudadano), Mesa 7 (Certificación Ambiental) y Mesa 10 (Fiscalización Ambiental)',
  },
  {
    id: 'BID-FERNANDEZ',
    organismo: 'BID',
    nombre: 'Jaime Fernández-Baca',
    cargo: 'Especialista Senior de Cambio Climático y Sostenibilidad',
    correo: '',
    perfilProfesional: 'Especialista Senior en Cambio Climático y Sostenibilidad del BID desde 2012, coordinando operaciones de mitigación y adaptación en el Perú. Experiencia previa en The Nature Conservancy y sectores extractivos. Ingeniero Agrónomo (UC Davis), M.Sc. en Gestión Ambiental (Stirling University) y Magíster en Economía Agrícola (UNALM).',
    mesasAsignadas: 'Mesa 2, Mesa 7 y Mesa 10',
  },
  {
    id: 'BID-BARBOSA',
    organismo: 'BID',
    nombre: 'Lina Barbosa',
    cargo: 'Especialista en Biodiversidad y Capital Natural',
    correo: 'linabar@iadb.org',
    telefono: '+57 318 377 7499',
    perfilProfesional: 'Especialista en Biodiversidad y Capital Natural del BID. Más de 10 años en proyectos ambientales andinos y asesoría técnica en el financiamiento de compromisos climáticos del Acuerdo de París. Bióloga y microbióloga con Máster en Ciencia y Gestión Ambiental por la Universidad de California.',
    mesasAsignadas: 'Mesa 2, Mesa 7 y Mesa 10',
  },
  {
    id: 'UE-ALEGRE',
    organismo: 'Unión Europea',
    nombre: 'Marcos Alegre Chang',
    cargo: 'Consultor Principal UE / Ex Viceministro de Gestión Ambiental',
    correo: 'malegre@grupogea.org.pe',
    telefono: '',
    perfilProfesional: 'Ingeniero Sanitario por la UNI y M.Sc. en Gestión Ambiental por Loughborough University (Reino Unido). Ex Viceministro de Gestión Ambiental del MINAM y exmiembro por concurso público del Consejo Directivo del OEFA. Más de 25 años de experiencia internacional como consultor para el Banco Mundial, OPS, ONUDI y Unión Europea. Director Ejecutivo de Grupo GEA.',
    mesasAsignadas: 'Mesa 3 (Ciencia, Información Ambiental y Gestión del Riesgo)',
  },
  {
    id: 'UE-CHAUCA',
    organismo: 'Unión Europea',
    nombre: 'Nancy Chauca Vásquez',
    cargo: 'Consultora Senior UE / Ex Viceministra de Recursos Naturales',
    correo: 'nancychv@gmail.com',
    telefono: '989077570',
    perfilProfesional: 'Ex Viceministra de Desarrollo Estratégico de los Recursos Naturales del MINAM. Ha sido Directora de Registros Ambientales en el SENACE y Directora General en DGPIGA-MINAM. Más de 20 años de experiencia en gestión pública, planeamiento estratégico y marcos normativos ambientales.',
    mesasAsignadas: 'Mesa 3 (Ciencia, Información Ambiental y Gestión del Riesgo)',
  },
  {
    id: 'UE-ZEVALLOS',
    organismo: 'Unión Europea',
    nombre: 'Nicolás Zevallos Trigoso',
    cargo: 'Consultor Principal UE / Ex Viceministro de Seguridad Pública',
    correo: 'nicolas.zevallos@gmail.com',
    telefono: '971272670',
    perfilProfesional: 'Criminólogo peruano especializado en crimen organizado y economías ilegales en América Latina con más de 20 años de experiencia. Ex Viceministro de Seguridad Pública del Ministerio del Interior y ex Jefe del Gabinete de Asesores del MININTER. Investigador de minería ilegal, tala ilegal y contrabando fronterizo con más de 60 publicaciones.',
    mesasAsignadas: 'Mesa 9 (Trabajo Articulado contra Economías Ilegales)',
  },
  {
    id: 'GIZ-ARGUEDAS',
    organismo: 'GIZ',
    nombre: 'Cynthia Arguedas Gourzong',
    cargo: 'Consultora Especialista en Reforma Institucional',
    correo: '',
    telefono: '985832319',
    perfilProfesional: 'Magíster en Gestión y Políticas Públicas por la Universidad de Chile. Especialista en modernización del Estado, simplificación administrativa, descentralización y herramientas de mejora para la gestión institucional vinculada a sistemas administrativos de recursos humanos y fiscalización.',
    mesasAsignadas: 'Mesa 7 (Certificación Ambiental) y Mesa 11 (Recursos Humanos e Integridad Pública)',
  },
  {
    id: 'GIZ-RODRIGUEZ',
    organismo: 'GIZ',
    nombre: 'José Carlos Rodríguez',
    cargo: 'Director de Oficina de Gestión de Proyectos GIZ',
    correo: '',
    perfilProfesional: 'Director de la Oficina de Gestión para los Proyectos del Área Ambiente, Clima y Ciudades de la GIZ. Figura como punto focal de las mesas de diálogo en el documento recibido.',
    mesasAsignadas: 'Espacios de Diálogo Ciudadano y Sectorial',
  },
  {
    id: 'GIZ-CANCINO',
    organismo: 'GIZ',
    nombre: 'Zorobabel Cancino',
    cargo: 'Consultor Facilitador de Diálogo Multiactor',
    correo: '',
    perfilProfesional: 'Identificado en el documento como responsable de la moderación de los espacios de diálogo con actores del proceso de modernización.',
    mesasAsignadas: 'Espacios de Diálogo Ciudadano y Sectorial',
  },
  {
    id: 'UE-ARAGON',
    organismo: 'Unión Europea',
    nombre: 'Gisella Aragón Peñaloza',
    cargo: 'Consultora de la Mesa 3',
    correo: 'aragon_gs@up.edu.pe',
    telefono: '995691878',
    perfilProfesional: 'Economista especializada en innovación en políticas públicas y sostenibilidad; docente de la Universidad del Pacífico. Experiencia en políticas ambientales y proyectos de agua y saneamiento.',
    mesasAsignadas: 'Mesa 3 (Ciencia, Información Ambiental y Gestión del Riesgo)',
  },
  {
    id: 'UE-ROSAS',
    organismo: 'Unión Europea',
    nombre: 'Angela Romina Rosas Zorrilla',
    cargo: 'Consultora de la Mesa 3',
    correo: 'arosas@grupogea.org.pe',
    telefono: '999611554',
    perfilProfesional: 'Bachiller en Ingeniería Ambiental, con experiencia en instrumentos de política pública y metodología CEPLAN, incluidos árboles de problemas y alternativas de intervención.',
    mesasAsignadas: 'Mesa 3 (Ciencia, Información Ambiental y Gestión del Riesgo)',
  },
  {
    id: 'UE-SANCHEZ',
    organismo: 'Unión Europea',
    nombre: 'Fanny Sánchez Torres',
    cargo: 'Consultora de la Mesa 9',
    correo: '',
    telefono: '992719233',
    perfilProfesional: 'Abogada con maestría en Gestión Pública por la Universidad del Pacífico. Experiencia en el Ministerio del Interior y DEVIDA.',
    mesasAsignadas: 'Mesa 9 (Trabajo articulado contra economías ilegales)',
  },
];

// -------------------------------------------------------------
// 7. REUNIONES CON COOPERANTES (Bitácora Oficial)
// -------------------------------------------------------------
export const reunionesCooperantesReales: ReunionCooperanteReal[] = [
  {
    id: 'RC-01',
    fecha: '2026-10-29',
    organismo: 'Banco Mundial',
    tipo: 'Mesa Técnica',
    tema: 'Presentación del proceso de modernización y socialización de árboles de problemas de las Mesas 1, 4, 5, 6 y 8.',
    acuerdos: 'Acuerdo de remitir los documentos y diagnósticos en formato digital el 06 de noviembre para revisión por los puntos focales del BM.',
    participantesMINAM: 'OGPP, Secretaría General y Oficina de Cooperación y Asuntos Internacionales (OGCAI)',
    estado: 'Realizada',
  },
  {
    id: 'RC-02',
    fecha: '2026-11-06',
    organismo: 'Banco Mundial',
    tipo: 'Coordinación TDR',
    tema: 'Árboles de problemas y diagnósticos compartidos con los puntos focales del Banco Mundial.',
    acuerdos: 'El documento confirma que se compartieron árboles y diagnósticos el 06/11, sin detallar destinatarios individuales ni acuerdos adicionales.',
    participantesMINAM: 'OGPP-OPM',
    estado: 'Realizada',
  },
  {
    id: 'RC-03',
    fecha: '2026-11-06',
    organismo: 'SERVIR',
    tipo: 'Comité Directivo',
    tema: 'Reunión de alto nivel con la Presidenta Ejecutiva de SERVIR para asistencia técnica en la Mesa 11.',
    acuerdos: 'La Secretaría General solicitó apoyo técnico a SERVIR; el documento no especifica alcances, compromisos ni responsables asignados.',
    participantesMINAM: 'Secretaría General y Líder Carmen Salardi Bramont',
    estado: 'Realizada',
  },
  {
    id: 'RC-04',
    fecha: '2026-11-09',
    organismo: 'Unión Europea',
    tipo: 'Mesa Técnica',
    tema: 'Primera reunión técnica UE – MINAM: Presentación del equipo consultor de la Mesa 3 (Ciencia e Información) y alcances del apoyo.',
    acuerdos: 'Se presentaron los alcances de la Mesa 3, los avances logrados y las expectativas del apoyo de la Unión Europea.',
    participantesMINAM: 'OGPP, VMDERN y Oficina de Cooperación Internacional',
    estado: 'Realizada',
  },
  {
    id: 'RC-05',
    fecha: '2026-11-10',
    organismo: 'BID',
    tipo: 'Coordinación TDR',
    tema: 'Reunión agendada con el BID (16:00) para determinar precisiones al TDR del equipo consultor.',
    acuerdos: 'El documento registra la reunión agendada para precisar los TDR; no consigna acuerdos ni confirma que se realizara.',
    participantesMINAM: 'OGPP-OPM y líderes de las Mesas 2, 7 y 10',
    estado: 'Confirmada / Programada',
  },
  {
    id: 'RC-06',
    fecha: '2026-11-10',
    organismo: 'Unión Europea',
    tipo: 'Mesa Técnica',
    tema: 'Primera reunión técnica UE – MINAM (Mesa 9: Economías Ilegales) con el consultor Nicolás Zevallos.',
    acuerdos: 'Se presentaron los avances de la mesa y las expectativas del apoyo de la Unión Europea.',
    participantesMINAM: 'Líder Jorge Luis Sáenz Rabanal (VMDERN), SERNANP y OGASA',
    estado: 'Realizada',
  },
  {
    id: 'RC-07',
    fecha: '2026-11-10',
    organismo: 'GIZ',
    tipo: 'Reunión de Ensayo',
    tema: 'Reunión de ensayo de la metodología para los Espacios de Diálogo multiactor en la Sala de Secretaría General (15:00).',
    acuerdos: 'El documento indica que se definió la metodología y se coordinó el apoyo del facilitador; la reunión de ensayo se programó para el 10/11.',
    participantesMINAM: 'Secretaría General, OGPP y equipo facilitador de GIZ',
    estado: 'Confirmada / Programada',
  },
  {
    id: 'RC-08',
    fecha: '2026-11-11',
    organismo: 'Unión Europea',
    tipo: 'Mesa Técnica',
    tema: 'Reunión híbrida de presentación del equipo consultor de la Unión Europea a los integrantes de la Mesa 3.',
    acuerdos: 'El equipo consultor presentó el plan de trabajo y remitió ese mismo día el cronograma de reuniones bilaterales con los cuatro institutos.',
    participantesMINAM: 'Líder César Santisteban, representantes de institutos adscritos y equipo consultor UE',
    estado: 'Realizada',
  },
  {
    id: 'RC-09',
    fecha: '2026-11-17',
    organismo: 'Unión Europea',
    tipo: 'Bilateral IPI',
    tema: 'Reunión bilateral presencial del equipo consultor UE con SENAMHI (14:00 - 17:00).',
    acuerdos: 'El documento registra la realización de la reunión con SENAMHI; no detalla acuerdos individuales.',
    participantesMINAM: 'Equipo directivo del SENAMHI y consultores Marcos Alegre y Nancy Chauca',
    estado: 'Realizada',
  },
  {
    id: 'RC-10',
    fecha: '2026-11-18',
    organismo: 'Unión Europea',
    tipo: 'Bilateral IPI',
    tema: 'Reunión bilateral virtual del equipo consultor UE con el IIAP (10:00 - 13:00).',
    acuerdos: 'El documento registra la realización de la reunión con IIAP; no detalla acuerdos individuales.',
    participantesMINAM: 'Presidencia e investigadores del IIAP y equipo consultor UE',
    estado: 'Realizada',
  },
  {
    id: 'RC-11',
    fecha: '2026-11-19',
    organismo: 'Unión Europea',
    tipo: 'Bilateral IPI',
    tema: 'Reunión bilateral híbrida del equipo consultor UE con INAIGEM (10:00 - 13:00).',
    acuerdos: 'El documento registra la realización de la reunión con INAIGEM; no detalla acuerdos individuales.',
    participantesMINAM: 'Equipo de INAIGEM y consultores UE',
    estado: 'Realizada',
  },
  {
    id: 'RC-12',
    fecha: '2026-11-19',
    organismo: 'Unión Europea',
    tipo: 'Mesa Técnica',
    tema: 'Reuniones bilaterales en Sala Paracas del MINAM con punto focal DGOTGIRN (14:00), DGCCD (15:00) y VMGA.',
    acuerdos: 'El documento registra las reuniones con el punto focal DGOTGIRN, DGCCD y VMGA; no detalla acuerdos individuales.',
    participantesMINAM: 'DGOTGIRN, DGCCD, Viceministerio de Gestión Ambiental y consultores UE',
    estado: 'Realizada',
  },
  {
    id: 'RC-13',
    fecha: '2026-11-20',
    organismo: 'Unión Europea',
    tipo: 'Bilateral IPI',
    tema: 'Reunión bilateral presencial del equipo consultor UE con el IGP (15:30 - 18:30).',
    acuerdos: 'El documento registra la realización de la reunión con IGP; no detalla acuerdos individuales.',
    participantesMINAM: 'Presidencia Ejecutiva del IGP y equipo consultor UE',
    estado: 'Realizada',
  },
  {
    id: 'RC-14',
    fecha: '2026-11-19',
    organismo: 'Banco Mundial',
    tipo: 'Mesa Técnica',
    tema: 'Reunión con expertos del Banco Mundial para las Mesas 1, 4, 5, 6 y 8.',
    acuerdos: 'Se acordaron los puntos en los que aportarán los expertos y los plazos de entrega.',
    participantesMINAM: 'Representantes del MINAM y expertos del Banco Mundial',
    estado: 'Realizada',
  },
  {
    id: 'RC-15',
    fecha: '2026-11-13',
    organismo: 'Unión Europea',
    tipo: 'Mesa Técnica',
    tema: 'Reunión de consultores de la Unión Europea con integrantes de la Mesa 9.',
    acuerdos: 'Se acordó enviar el primer producto para aportes y posteriormente usar fichas para recoger alternativas de reforma.',
    participantesMINAM: 'Integrantes de la Mesa 9 y equipo consultor de la Unión Europea',
    estado: 'Realizada',
  },
  {
    id: 'RC-16',
    fecha: '2026-11-18',
    organismo: 'Unión Europea',
    tipo: 'Mesa Técnica',
    tema: 'Unificación de criterios para la fase de propuestas de medidas de reforma y mejora organizacional de la Mesa 9.',
    acuerdos: 'Se unificaron criterios para la fase de propuestas; el documento no detalla compromisos adicionales.',
    participantesMINAM: 'Mesa 9 y equipo consultor de la Unión Europea',
    estado: 'Realizada',
  },
  {
    id: 'RC-17',
    fecha: '2026-11-20',
    organismo: 'GIZ',
    tipo: 'Mesa Técnica',
    tema: 'Reunión de GIZ y OPM con integrantes de las Mesas 5, 7 y 11 según el registro de cada mesa.',
    acuerdos: 'Se presentó y explicó la metodología para generar alternativas de medidas de reforma y mejora organizacional. En la Mesa 5 se mantiene Banco Mundial como cooperante asignado.',
    participantesMINAM: 'OPM e integrantes de las mesas; GIZ',
    estado: 'Realizada',
  },
];

// -------------------------------------------------------------
// 8. ESPACIOS DE DIÁLOGO CIUDADANO (Del 17 al 24 de noviembre)
// -------------------------------------------------------------
export const espaciosDialogoReales: EspacioDialogoReal[] = [
  {
    id: 'ED-01',
    grupoActor: 'Representantes de las Juventudes y Colectivos Ambientales',
    fecha: '2026-11-17',
    objetivo: 'Recoger expectativas, propuestas y prioridades de las juventudes organizadas en torno a la educación, voluntariado y justicia ambiental.',
    facilitacion: 'Facilitadores GIZ (Zorobabel Cancino / José Carlos Rodríguez)',
    estado: 'Confirmado',
    participantesEstimados: '35 delegados juveniles de nivel nacional',
    modalidad: 'Presencial / Híbrida',
  },
  {
    id: 'ED-02',
    grupoActor: 'Entidades del Poder Ejecutivo (Sectores Productivos)',
    fecha: '2026-11-18',
    objetivo: 'Articular competencias sinérgicas y resolver controversias de límites funcionales con MINEM, PRODUCE, MIDAGRI, MTC y PCM.',
    facilitacion: 'Secretaría General MINAM y Facilitación Metodológica GIZ',
    estado: 'Confirmado',
    participantesEstimados: 'Directores generales y asesores ministeriales de 6 sectores',
    modalidad: 'Presencial (Sede Central MINAM)',
  },
  {
    id: 'ED-03',
    grupoActor: 'Organizaciones No Gubernamentales y Sociedad Civil (Grupo 1)',
    fecha: '2026-11-19 al 20',
    objetivo: 'Identificar propuestas de gobernanza ambiental, transparencia, acceso a la información y vigilancia comunitaria.',
    facilitacion: 'GIZ / OGPP',
    estado: 'Confirmado',
    participantesEstimados: '40 representantes de ONGs ambientales',
    modalidad: 'Presencial (Sala Paracas MINAM)',
  },
  {
    id: 'ED-04',
    grupoActor: 'Comunidad Académica y Universidades Científicas',
    fecha: '2026-11-23',
    objetivo: 'Vincular la producción científica universitaria con las necesidades de evidencia técnica para la toma de decisiones ambientales.',
    facilitacion: 'VMDERN y GIZ',
    estado: 'Confirmado',
    participantesEstimados: 'Decanos e investigadores de UNI, UNALM, San Marcos, PUCP y UPCH',
    modalidad: 'Híbrida',
  },
  {
    id: 'ED-05',
    grupoActor: 'Gremios Empresariales y Productivos',
    fecha: '2026-11-24',
    objetivo: 'Levantar opiniones y propuestas sobre simplificación de trámites, calidad regulatoria, economía circular y predictibilidad de licencias.',
    facilitacion: 'Despacho Ministerial / VMGA / GIZ',
    estado: 'Confirmado',
    participantesEstimados: 'Representantes de CONFIEP, SNI, SNMPE, AGAP, ADEX y CCL',
    modalidad: 'Presencial',
  },
  {
    id: 'ED-06',
    grupoActor: 'Organizaciones de la Sociedad Civil y Redes Territoriales (Grupo 2)',
    fecha: '2026-11-24',
    objetivo: 'Cierre del ciclo de diálogo ciudadano: balance de aportes recibidos e integración a las medidas de reforma.',
    facilitacion: 'Secretaría General y GIZ',
    estado: 'Confirmado',
    participantesEstimados: 'Redes regionales de monitoreo ambiental y colegios profesionales',
    modalidad: 'Híbrida',
  },
];

// -------------------------------------------------------------
// 9. ÁRBOLES DE PROBLEMAS REALES (12 árboles aprobados)
// -------------------------------------------------------------
export const arbolesProblemasReal: ArbolProblemaReal[] = [
  {
    "id": "ARB-01",
    "mesaId": 1,
    "mesaNombre": "Gobernanza ambiental, marcos normativos, sistemas funcionales y descentralización",
    "problemaCentral": "Débil rectoría del MINAM y fragmentación de los marcos normativos y sistemas funcionales ambientales, limitando la articulación intersectorial y la descentralización efectiva.",
    "causasDirectas": [
      "Dispersión y superposición de competencias ambientales entre sectores nacionales y niveles de gobierno regional y local.",
      "Insuficientes mecanismos de articulación y exigibilidad en los sistemas funcionales ambientales (SNGRH, SINIA, SNGA).",
      "Brecha de capacidades técnicas y operativas en los gobiernos regionales y locales para el ejercicio de funciones transferidas."
    ],
    "causasIndirectas": [
      "Marcos regulatorios sectoriales desactualizados y desarticulados con la Ley General del Ambiente.",
      "Escasos incentivos de coordinación y gobernanza multinivel entre ministerios.",
      "Rotación excesiva de personal técnico en gerencias regionales de recursos naturales."
    ],
    "efectosDirectos": [
      "Conflictos de competencia e ineficacia en la gestión de políticas públicas ambientales a nivel nacional.",
      "Baja capacidad de respuesta oportuna ante contingencias y degradación ambiental territorial.",
      "Pérdida de legitimidad y confianza ciudadana en la rectoría del Ministerio del Ambiente."
    ],
    "efectosIndirectos": [
      "Incentivos a la informalidad y degradación impune de ecosistemas vulnerables.",
      "Falta de predictibilidad jurídica para inversiones públicas y privadas sostenibles."
    ],
    "fechaAprobacion": "2026-10-16",
    "imagenUrl": "/minam-docs/arbol-mesa-1.png",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-02",
    "mesaId": 2,
    "mesaNombre": "Servicios al ciudadano y simplificación administrativa",
    "problemaCentral": "Procesos y trámites administrativos ambientales lentos, complejos y poco orientados a las necesidades del administrado y del ciudadano.",
    "causasDirectas": [
      "Elevada dispersión de procedimientos en TUPA y requisitos no interoperables entre direcciones y adscritos.",
      "Escasa digitalización de ventanilla única y trazabilidad en tiempo real de los expedientes.",
      "Asimetría de información y canales de orientación insuficientes para el ciudadano y administrado."
    ],
    "causasIndirectas": [
      "Silos informáticos heredados y falta de estandarización documental entre áreas.",
      "Mecanismos de consulta y atención ciudadana presencialistas con cobertura limitada en regiones."
    ],
    "efectosDirectos": [
      "Sobrecostos y demoras críticas en los trámites ambientales para emprendimientos y ciudadanos.",
      "Informalidad administrativa e incentivos perversos para eludir la regulación ambiental.",
      "Insatisfacción generalizada con la calidad de atención del Sector Ambiente."
    ],
    "efectosIndirectos": [
      "Barreras de acceso a autorizaciones ambientales formales para pequeños productores.",
      "Desgaste en la percepción pública de la eficacia institucional del MINAM."
    ],
    "fechaAprobacion": "2026-10-16",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-03",
    "mesaId": 3,
    "mesaNombre": "Ciencia, información ambiental y gestión del riesgo",
    "problemaCentral": "Fragmentación de la información científica y ambiental producida por los IPIs (SENAMHI, IIAP, INAIGEM, IGP) y limitada integración para la toma de decisiones estratégicas.",
    "causasDirectas": [
      "Repositorios de datos y plataformas tecnológicas desarticuladas entre los cuatro institutos de investigación (IPIs).",
      "Escasa estandarización de protocolos para la interoperabilidad de datos geoespaciales y climáticos.",
      "Financiamiento disperso y limitada vinculación de la investigación científica con prioridades de política pública."
    ],
    "causasIndirectas": [
      "Gobernanza institucional aislada de cada adscrito de investigación sin una agenda científica unificada.",
      "Deficiencias en infraestructura computacional para procesamiento masivo de datos climáticos."
    ],
    "efectosDirectos": [
      "Duplicidad de esfuerzos e ineficiencia en el gasto público de investigación ambiental.",
      "Información técnica no disponible en tiempo real para la prevención de desastres y gestión del riesgo climático.",
      "Decisiones de política pública tomadas sin suficiente evidencia científica integrada."
    ],
    "efectosIndirectos": [
      "Mayor vulnerabilidad de poblaciones ante eventos hidrometeorológicos extremos.",
      "Pérdida de oportunidades para acceder a fondos globales de financiamiento climático."
    ],
    "fechaAprobacion": "2026-10-16",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-04",
    "mesaId": 4,
    "mesaNombre": "Cierre de brechas sectoriales",
    "problemaCentral": "Persistencia de brechas críticas en infraestructura, equipamiento, pasivos ambientales y servicios ambientales prioritarios en las zonas más vulnerables del país.",
    "causasDirectas": [
      "Cuellos de botella en la formulación, viabilidad técnica y ejecución de proyectos de inversión pública en el Invierte.pe.",
      "Deficiente priorización sectorial de brechas de residuos sólidos, aguas residuales y remediación de sitios impactados.",
      "Limitada articulación con carteras de inversión de otros ministerios (Vivienda, Energía y Minas, Producción)."
    ],
    "causasIndirectas": [
      "Capacidades técnicas deficientes en formulación de proyectos en municipios de tipo D y E.",
      "Insuficientes incentivos para la participación del sector privado mediante Asociaciones Público-Privadas u Obras por Impuestos."
    ],
    "efectosDirectos": [
      "Acumulación de pasivos ambientales sin remediación que ponen en riesgo la salud pública.",
      "Desigualdad en el acceso a servicios ambientales de calidad en regiones periféricas.",
      "Baja tasa de ejecución y pérdida de fondos de inversión sectorial."
    ],
    "efectosIndirectos": [
      "Incremento de costos de remediación futura por deterioro acumulado del suelo y agua.",
      "Riesgos sanitarios crónicos en comunidades aledañas a botaderos a cielo abierto."
    ],
    "fechaAprobacion": "2026-10-16",
    "imagenUrl": "/minam-docs/acta-mesa-4.png",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-05",
    "mesaId": 5,
    "mesaNombre": "Gestión integrada de programas, proyectos e intervenciones",
    "problemaCentral": "Ausencia de un modelo unificado de gobernanza y seguimiento para la cartera de programas y proyectos de inversión y cooperación técnica del MINAM.",
    "causasDirectas": [
      "Unidades ejecutoras y proyectos especiales operando de manera aislada con metodologías heterogéneas.",
      "Débil monitoreo centralizado del ciclo de vida de los proyectos y de sus metas físicas y financieras.",
      "Demoras administrativas en las fases de licitación, contratación y liquidación de intervenciones."
    ],
    "causasIndirectas": [
      "Falta de un sistema informático unificado de seguimiento y control de gestión de inversiones.",
      "Dispersión normativa interna y duplicidad de comités directivos de proyectos."
    ],
    "efectosDirectos": [
      "Ampliaciones recurrentes de plazos y sobrecostos en la ejecución de proyectos ambientales.",
      "Baja sostenibilidad operativa y técnica de las inversiones una vez culminadas las obras.",
      "Dificultades para reportar impactos sectoriales consolidados a cooperantes internacionales y MEF."
    ],
    "efectosIndirectos": [
      "Pérdida de credibilidad ante agencias de cooperación bilateral y multilateral.",
      "Retraso en el cumplimiento de compromisos ambientales internacionales (NDC, ODS)."
    ],
    "fechaAprobacion": "2026-10-16",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-06",
    "mesaId": 6,
    "mesaNombre": "Modernización de tecnologías de información",
    "problemaCentral": "Infraestructura tecnológica, arquitecturas de datos y sistemas de información obsoletos y fragmentados, que dificultan la transformación digital del sector ambiental.",
    "causasDirectas": [
      "Silos informáticos heredados y falta de una plataforma centralizada en la nube con altos estándares de ciberseguridad.",
      "Carencia de herramientas analíticas avanzadas, interoperabilidad basada en API y uso de inteligencia artificial para gestión ambiental.",
      "Brecha presupuestal y de talento humano especializado en tecnologías de información y gobernanza digital."
    ],
    "causasIndirectas": [
      "Planes de Gobierno Digital desarticulados entre el MINAM y sus siete organismos adscritos.",
      "Contratos de infraestructura tecnológica dispersos con proveedores heterogéneos."
    ],
    "efectosDirectos": [
      "Vulnerabilidad informática e interrupción recurrente de servicios digitales a nivel sectorial.",
      "Imposibilidad de cruzar datos en tiempo real entre fiscalización, certificación y monitoreo ambiental.",
      "Dependencia de procesos manuales y papel, con altos costos operativos y lentitud administrativa."
    ],
    "efectosIndirectos": [
      "Riesgos de fuga o pérdida de información confidencial y expedientes regulatorios.",
      "Desaprovechamiento de analítica geoespacial para alertas tempranas de deforestación y contaminación."
    ],
    "fechaAprobacion": "2026-10-16",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-07",
    "mesaId": 7,
    "mesaNombre": "Optimización del proceso de certificación ambiental",
    "problemaCentral": "Ineficiencia, plazos excesivos y fragmentación en la evaluación y otorgamiento de la certificación ambiental, generando incertidumbre jurídica y riesgos de desprotección.",
    "causasDirectas": [
      "Dispersión de criterios técnicos entre el SENACE, direcciones de línea del MINAM y entidades opinantes vinculantes.",
      "Complejidad innecesaria en la clasificación anticipada y en la elaboración de Términos de Referencia estandarizados.",
      "Falta de un sistema integrado de ventanilla única de certificación con plazos predecibles y alertas tempranas."
    ],
    "causasIndirectas": [
      "Reglamentos sectoriales de protección ambiental no armonizados entre minería, energía, transportes y agricultura.",
      "Demoras en la emisión de opiniones técnicas por parte de SERFOR, ANA y SERNANP."
    ],
    "efectosDirectos": [
      "Paralización y demoras críticas en proyectos de inversión pública y privada estratégicos para el país.",
      "Desconfianza ciudadana y comunitaria respecto a la rigurosidad y transparencia de los estudios de impacto ambiental.",
      "Riesgos de conflictividad socioambiental y judicialización de autorizaciones ambientales."
    ],
    "efectosIndirectos": [
      "Fuga de inversiones sostenibles hacia jurisdicciones más predecibles.",
      "Debilitamiento de la fiscalización posterior por vacíos en los instrumentos aprobados."
    ],
    "fechaAprobacion": "2026-10-16",
    "imagenUrl": "/minam-docs/arbol-mesa-7.png",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-08",
    "mesaId": 8,
    "mesaNombre": "Optimización presupuestal y financiera",
    "problemaCentral": "Rigidez, baja articulación presupuestal y débil capacidad para captar y ejecutar mecanismos financieros innovadores en el Sector Ambiente.",
    "causasDirectas": [
      "Estructura programática presupuestal tradicional desconectada de los objetivos e indicadores de la Política Nacional del Ambiente al 2030.",
      "Desaprovechamiento de instrumentos financieros alternativos (bonos verdes, canjes de deuda, fondos climáticos y obras por impuestos).",
      "Escasa coordinación oportuna con el MEF en la programación multianual y asignación de techos presupuestales."
    ],
    "causasIndirectas": [
      "Falta de un equipo especializado en estructuración financiera verde y finanzas del carbono en el MINAM.",
      "Reglas fiscales rígidas que limitan la reinversión de recursos directamente recaudados."
    ],
    "efectosDirectos": [
      "Déficit crónico de financiamiento para operaciones básicas de conservación, fiscalización y monitoreo ambiental.",
      "Alta dependencia de donaciones coyunturales con baja previsibilidad de mediano y largo plazo.",
      "Subestimación del aporte del capital natural a la economía nacional en el presupuesto general de la República."
    ],
    "efectosIndirectos": [
      "Vulnerabilidad financiera ante recortes presupuestales del tesoro público.",
      "Imposibilidad de apalancar inversiones privadas de impacto positivo en la biodiversidad."
    ],
    "fechaAprobacion": "2026-10-16",
    "imagenUrl": "/minam-docs/acta-mesa-8.png",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-09",
    "mesaId": 9,
    "mesaNombre": "Trabajo articulado contra economías ilegales",
    "problemaCentral": "Inadecuada articulación interinstitucional e insuficiente capacidad sectorial para prevenir, fiscalizar y contrarrestar los impactos de las economías ambientales ilegales.",
    "causasDirectas": [
      "Falta de una estrategia unificada de inteligencia ambiental, monitoreo satelital en tiempo real e interoperabilidad con Mininter, Minjus y FF.AA.",
      "Vacíos normativos en la trazabilidad de la cadena de suministro de insumos químicos, oro y productos maderables.",
      "Escasa presencia física y limitaciones operativas del sector ambiental en territorios de alta conflictividad (Amazonía, Madre de Dios)."
    ],
    "causasIndirectas": [
      "Corrupción en eslabones locales de fiscalización y transporte de recursos naturales.",
      "Insuficiente protección física a los defensores ambientales y líderes indígenas amenazados."
    ],
    "efectosDirectos": [
      "Destrucción acelerada de ecosistemas frágiles, bosques primarios y fuentes hídricas por mercurio y deforestación.",
      "Amenaza directa a la seguridad y vida de defensores ambientales y comunidades indígenas.",
      "Pérdida de soberanía territorial e informalidad extendida con severos costos sociales y económicos."
    ],
    "efectosIndirectos": [
      "Proliferación de redes criminales transnacionales en zonas de frontera.",
      "Deterioro irreparable de la reputación internacional del Perú en tratados comerciales y de derechos humanos."
    ],
    "fechaAprobacion": "2026-10-16",
    "imagenUrl": "/minam-docs/acta-mesa-9.png",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-10",
    "mesaId": 10,
    "mesaNombre": "Optimización de la fiscalización ambiental",
    "problemaCentral": "Dispersión, baja predictibilidad y falta de articulación entre los niveles de fiscalización ambiental (OEFA y Entidades de Fiscalización Ambiental - EFAs).",
    "causasDirectas": [
      "Falta de estandarización en la supervisión ambiental a cargo de gobiernos subnacionales y sectores no transferidos.",
      "Enfoque predominantemente sancionador punitivo con escasos incentivos preventivos y de subsanación voluntaria.",
      "Retrasos procesales en la tramitación de expedientes sancionadores y ejecución coactiva de multas."
    ],
    "causasIndirectas": [
      "Insuficiente articulación entre los sistemas de monitoreo de calidad ambiental y los planes de supervisión directa.",
      "Complejidad probatoria en delitos ambientales y escasa coordinación con el Ministerio Público (FEMA)."
    ],
    "efectosDirectos": [
      "Impunidad frente a infracciones ambientales graves y reincidencia de infractores.",
      "Sobrecarga procesal en el Tribunal de Fiscalización Ambiental y judicialización de medidas administrativas.",
      "Daño ambiental irreversible sin remediación oportuna ni compensación efectiva al ecosistema."
    ],
    "efectosIndirectos": [
      "Sensación ciudadana de ineficacia del Sistema Nacional de Evaluación y Fiscalización Ambiental (SINEFA).",
      "Desincentivo para empresas formales que cumplen rigurosamente con los compromisos ambientales."
    ],
    "fechaAprobacion": "2026-10-16",
    "imagenUrl": "/minam-docs/arbol-mesa-10.png",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-11A",
    "mesaId": 11,
    "mesaNombre": "Recursos humanos en el Sector Ambiente",
    "problemaCentral": "Régimen laboral fragmentado, alta rotación del personal técnico calificado y debilidades en la gestión del talento humano por competencias en el Sector Ambiente.",
    "causasDirectas": [
      "Convivencia de múltiples regímenes laborales (D.L. 276, 728, 1057-CAS y LOC) con disparidad remunerativa e inestabilidad laboral.",
      "Retraso en el tránsito hacia el Régimen del Servicio Civil (Ley SERVIR) y falta de perfiles de puesto actualizados a las nuevas demandas ambientales.",
      "Inexistencia de una carrera pública ambiental y programas continuos de capacitación especializada."
    ],
    "causasIndirectas": [
      "Limitaciones presupuestales para la nivelación de escalas remunerativas del sector.",
      "Procesos de selección lentos y burocráticos con perfiles genéricos no adaptados a la alta especialización requerida."
    ],
    "efectosDirectos": [
      "Fuga de especialistas ambientales de alta calificación hacia el sector privado o agencias internacionales.",
      "Desmotivación laboral, baja productividad y demoras en la ejecución de metas institucionales.",
      "Pérdida recurrente de memoria institucional y discontinuidad en proyectos estratégicos."
    ],
    "efectosIndirectos": [
      "Sobrecarga operativa sobre los equipos permanentes del ministerio.",
      "Dificultad para atraer jóvenes profesionales de excelencia a la administración pública ambiental."
    ],
    "fechaAprobacion": "2026-10-16",
    "estado": "Aprobado formalmente"
  },
  {
    "id": "ARB-11B",
    "mesaId": 11,
    "mesaNombre": "Integridad pública y lucha contra la corrupción",
    "problemaCentral": "Riesgos de integridad, vulnerabilidad ética y limitaciones en la aplicación de controles preventivos en los procesos de mayor discrecionalidad del Sector Ambiente.",
    "causasDirectas": [
      "Falta de un sistema automatizado de identificación y mitigación de riesgos de corrupción en trámites de permisos, certificaciones y fiscalización.",
      "Mecanismos de denuncia y protección al denunciante poco difundidos y con baja percepción de anonimato seguro.",
      "Cultura de integridad débilmente institucionalizada en las interacciones público-privadas de los organismos adscritos."
    ],
    "causasIndirectas": [
      "Insuficiente articulación entre la Oficina de Integridad Institucional y los órganos de línea decisorios.",
      "Escasa capacitación práctica en gestión de conflictos de interés y declaraciones juradas de intereses."
    ],
    "efectosDirectos": [
      "Riesgos de captura regulatoria y decisiones discrecionales no apegadas al interés público ambiental.",
      "Daño reputacional severo al Ministerio del Ambiente y sus organismos técnicos especializados.",
      "Sanciones disciplinarias y desconfianza ciudadana en los procesos sectoriales."
    ],
    "efectosIndirectos": [
      "Judicialización de actos administrativos y nulidad de resoluciones emitidas.",
      "Afectación a la moral colectiva de los servidores públicos honestos del sector."
    ],
    "fechaAprobacion": "2026-10-16",
    "estado": "Aprobado formalmente"
  }
];
