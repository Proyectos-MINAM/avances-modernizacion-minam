/** Fotografías suministradas en la carpeta Drive «Fotos_ED», revisada el 25/11/2026.
 * Conservamos el nombre original de cada archivo y su ID para trazabilidad.
 * Se sirven copias locales: no dependen de una vista previa externa de Google Drive.
 */
export type DialoguePhoto = {
  src: string;
  name: string;
  driveId: string;
};

const photo = (name: string, driveId: string): DialoguePhoto => ({
  name,
  src: '/galerias/' + name,
  driveId,
});

export const photosByDialogue: Record<string, DialoguePhoto[]> = {
  'ED-01': [
    photo('ED_Juventud_Presencial_20261117_1.jpeg', '1abe_lD-N9zKpn92vX1sS9xolsY8OGnNH'),
    photo('ED_Juventud_Presencial_20261117_2.jpeg', '1UspK8Ec-DUhxP_RB9nhr_n_ztqNTEetz'),
    photo('ED_Juventud_Presencial_20261117_3.jpeg', '13p-TzfUQALpsf9O_dSZkgqZ8cZEQOoxW'),
    photo('ED_Juventud_Presencial_20261117_4.jpeg', '1oRsyDjMyrymmGu0E7h-qsoO7NRVVK9B_'),
    photo('ED_Juventud_Presencial_20261117_5.jpeg', '1Tq5XFJC3F9WWBc7iX3nD9PhyWAtkYMJj'),
  ],
  'ED-02': [
    photo('ED_Juventud_Virtual_20261117_1.jpeg', '1GLVnTH664oPzRfwB2oIvt6-T2_VWFj_b'),
  ],
  'ED-03': [
    photo('ED_ONG-SociedadCivil_Grupo1_Presencial_20261119_1.jpeg', '1hMDSRIdK2uNnS9hcj5dVy81hpc83hb1A'),
    photo('ED_ONG-SociedadCivil_Grupo1_Presencial_20261119_2.jpeg', '1a97E-5t71w7hh1QFledcvVNhdZs2OLHM'),
  ],
  'ED-04': [
    photo('ED_ONG-SociedadCivil_Grupo2_Presencial_20261120_1.jpeg', '17IO5BN8RlFgnJitv60KLSaG6e0QAoXWQ'),
  ],
  'ED-05': [
    photo('ED_EspecialistasMINAM_Presencial_20261123_1.jpeg', '17tV56TvJgeo7v5F8Smz7aa9SmTGgz9Ys'),
    photo('ED_EspecialistasMINAM_Presencial_20261123_2.jpeg', '1oYA6WkRLguXETg-JZSnltdr5f7e6MCfZ'),
    photo('ED_EspecialistasMINAM_Presencial_20261123_3.jpeg', '1rA0Ef13lKDEawGmqr5bSbzJSoUYHJ3Bp'),
    photo('ED_EspecialistasMINAM_Presencial_20261123_4.jpeg', '1s1ee5JJUEJqcWpyPKxjd3xstn6ptpEw3'),
  ],
  'ED-06': [
    photo('ED_Academia_Presencial_20261124_1.jpeg', '1e9GtbRx78m9nPl0kPrCs0HlJj9f9qahQ'),
    photo('ED_Academia_Presencial_20261124_2.jpeg', '1MiWviBfaqDnBm781iryuujbZJju-mooc'),
  ],
};

export const photosForDialogue = (id: string): DialoguePhoto[] => photosByDialogue[id] ?? [];
