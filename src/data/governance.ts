import { driveFile, driveFolder } from './documentary';

export type GovernanceKind = 'Normativa' | 'Lineamientos' | 'Operación' | 'Seguimiento' | 'Actas IDP';
export type GovernanceDocument = {
  id: string;
  title: string;
  kind: GovernanceKind;
  detail: string;
  url: string;
  version?: string;
  note?: string;
};

// Inventario contrastado contra la carpeta Drive de Modernización (noviembre 2026).
// Un archivo disponible en Drive NO implica que haya sido aprobado formalmente.
export const governanceDocuments: GovernanceDocument[] = [
  { id: 'ds012', kind: 'Normativa', title: 'Decreto Supremo N.° 012-2026-MINAM', detail: 'Declara la modernización y reorganización sectorial por 120 días calendario.', version: '17 sep 2026', url: driveFile('1J5p3t69Pn1562qso1W5fOxzZKw0AFiR9') },
  { id: 'legal', kind: 'Normativa', title: 'Base legal del proceso', detail: 'Carpeta institucional que reúne documentos de sustento normativo.', url: driveFolder('10qcTRFZMQnzzV-SrwS7yEZEpQh8phN-s') },
  { id: 'lineamientos', kind: 'Lineamientos', title: 'Lineamientos y Plan de Trabajo General', detail: 'Enfoques, ejes de trabajo, gobernanza, responsabilidades e hitos del proceso.', version: 'Versión en Drive: 01 oct 2026', note: 'Se recibió una versión del 05/10/2026 fuera de esta carpeta; verificar cuál es la vigente antes de sustituirla.', url: driveFile('1EcNQ6CqNCZPwBHqVn9dVEvFX1knW5Wnd') },
  { id: 'orientador', kind: 'Lineamientos', title: 'Documento orientador para las mesas de trabajo', detail: 'Pautas metodológicas para la construcción de árboles, diagnóstico narrativo y medidas de reforma.', version: 'Archivo de trabajo en Drive: 05 oct 2026', note: 'Se recibió PDF versión 01 del 06/10/2026. El archivo del Drive revisado es una versión anterior: validar vigencia.', url: 'https://docs.google.com/document/d/1uoswa1fWOL-DuRv0MkgtxIR5tbMCLLMG/edit' },
  { id: 'cronograma', kind: 'Operación', title: 'Cronograma detallado', detail: 'Matriz de planificación y seguimiento del proceso.', url: 'https://docs.google.com/spreadsheets/d/1hYFIHbGi4QbrjA5tRc2MXgyN8o_Ein2i/edit' },
  { id: 'acta-idp', kind: 'Actas IDP', title: 'Acta de validación de diagnóstico por IDP', detail: 'Acta consolidada incluida entre los anexos del informe parcial.', url: driveFile('1YORoZoGT-3E8ClNQMGFixYiZ0fuCFD0j') },
  { id: 'informe-parcial', kind: 'Seguimiento', title: 'Informe parcial de avance (70 días)', detail: 'INFORME-000544-2026-SG-OGPP-OPM y sus cifras de seguimiento.', url: driveFile('1lmGpaz_l-ic8zupPLFvu1MZTw5rdrysV') },
  { id: 'remision', kind: 'Seguimiento', title: 'Informe de OGPP a SG: remisión de lineamientos', detail: 'Documento de remisión disponible en la carpeta principal del proceso.', url: 'https://docs.google.com/document/d/1L5pGmEEdSlJQUozOuXHi0rxQlk1y2YX1/edit', note: 'Archivo .doc; no se verificó su estado de aprobación.' },
  { id: 'oficio', kind: 'Operación', title: 'Proyecto de oficio múltiple: participación en IDP', detail: 'Documento de trabajo sobre inclusión en la instancia directiva.', version: '28 sep 2026', note: 'Proyecto de oficio; no presentarlo como disposición aprobada.', url: 'https://docs.google.com/document/d/1p9-WEuppvAVly0nHlcX7FJLyFyr_AvyU/edit' },
];

export const idpMeetingActas = [
  '1N9azqsVb5A_noUORbQxV5vbijm8rbYVJ',
  '1QCBmWMLb8pcRMdz4NrNk8OoM4iv8ibuK',
  '1Iag9M9MOhR2kNrI-4YPISydbfpdUiKco',
  '1RCLX-WXksIdlcaJfBzR_lyJ47edgo_FZ',
  '1hsk3TVaKp7fWbVilRPdrVMwCmk1AzE9F',
  '1Jd9xYLQm3y6FSH9wpMHOA7sMtszob0Te',
  '1iBoheA1Z8iSX0_NYD_eNgMpWZ_vr5mhU',
  '1sze3CBDOFK8GGYK9OscqBfR4dTaZrpoB',
  '1EjuZcztjkpdPnBGu5iyxvugevg3HBUi8',
  '19dznNCcSxjh9awb5dWNPMrDKqgzBS1_Y',
  '1FxKViIElZGTha6fIGwWNFMuUzusWNTxo',
].map((id, i): GovernanceDocument => ({
  id: 'idp-m' + (i + 1), title: 'Acta IDP · Mesa ' + (i + 1),
  kind: 'Actas IDP', detail: 'Acta de validación del diagnóstico correspondiente a la mesa de trabajo ' + (i + 1) + '.',
  url: driveFile(id),
}));

export const allGovernanceDocuments = [...governanceDocuments, ...idpMeetingActas];
