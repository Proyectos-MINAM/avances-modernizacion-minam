// Source: institutional Drive folder inventory; access remains governed by Drive.
export const driveFile=(id:string)=>'https://drive.google.com/file/d/'+id+'/view';
export const driveFolder=(id:string)=>'https://drive.google.com/drive/folders/'+id;
export const mesaFolders=["14f4DEPZIuGR8VOlJPQC_1wSU1hti4LrF","1N71nxdGJZ1npSipMmW9TGQHmbMYk9PaL","1svX7_BPuwFqlVYZ_WHu_VB5BhOr51LUS","16tsNcH_t2GZxeX7Dc7KQWyj75tfGopcr","1g0gAQgchPdSTV8jBhagL6nNhIjs7yBw2","1Ca6Kqrahq7QL7hQeTBNNZoQyhxZd_eLW","13V4ak3c3X01bCi8MlNdgVOpty3JyCiyz","1WRzrdhLjnbSzWYeN46DIpl16G2nwHfjx","1cuze-QYvnKYd8_M6Qqh9QJ4tP8OnNo4f","1IQEAzdaFhyNBZ8WwZbXwdI8mvmQcvwm2","13J2fd0BZtlbQu5fvsRtLze7sjomeTSVn"];
export const treeFiles=["1LYJfw2uIbHQbw0HnURzjUjG-sjlxfeaH","1kVb_miB0gr4fElPppouB9NmyUa7CwvL_","1qyVf8Xk7-ClG7aXelcLSdMIzrDTb3U0K","1RhCu91WObeKqnxrZ-UEL0gvIepDfGijr","1rck5We2fhhnW4nZ5KdphAQPQ8pz-VY5X","1P9Da6up8Y3C2R84Q8SrHL5iauzOQP2aw","1fWgGa-BpBgTF5WcTo2YknSI3LHJbwoFb","12UxyLtfQkuW6x0bd9UDowGVnkD6wKSH1","15eTGbXWDCNSGABqfiKrtTM47raDVRtlF","1hcXSmuToxOboF4W44LFHAMVP0h-gb6gf","1fpDZLnKMhBNkiBQxqdXWWLslAML0sw4r","1LV4awdRcdsWZYM_MeFm-igerHZfOApTH"];
export const diagnosisFiles:Record<number,string>={"1":"1zN2Ih43RlmXSBxMf5kJ2z2hppDnc5FLC","3":"1yxCt5WDjntEufH8JlZEQgwJeKoa6CEx2","4":"106w9Vj1ZU_UWaOhKg3-bWmKLwV4n6Hwb","5":"1b6uO3FK6tKec9lo3ikndHVbEsbK5gs47","7":"1Nz83g0dQlxNPKMqiDxlH-FkS-bgN_2dB","8":"13-wL3C4fU8tfkXjWEoze6FEsZwbExXtJ","9":"13MwpYSD9j0uD_6H-CbCHT7YxeOJaOnwd","10":"1e4UxViJnbs7fj_RomXM6RfTdaMbTtKqj","11":"1sVvjg_R_1518KXk2CBIrngUoVEzopnE-"};
export const institutionalDocuments=[["Informe parcial de los 70 días","INFORME-000544-2026-SG-OGPP-OPM","file","1lmGpaz_l-ic8zupPLFvu1MZTw5rdrysV"],["Base legal","Normativa","folder","10qcTRFZMQnzzV-SrwS7yEZEpQh8phN-s"],["Lineamientos y plan de trabajo","01.10.2026","file","1EcNQ6CqNCZPwBHqVn9dVEvFX1knW5Wnd"],["Cronograma detallado","Planificación","file","1hYFIHbGi4QbrjA5tRc2MXgyN8o_Ein2i"],["Reuniones con el ministro","Carpetas por mesa","folder","1hr1BsQ9giMfw5URPkkIwC0beia72KFp6"],["Diagnósticos aprobados","Actas","folder","1e5GA6XIq5u37gu6GSRes6FnaEx1TDU_c"]];
export const meetingCounts=[5,5,6,5,5,5,5,5,5,5,6];
export const diagnosisDates=['06/11/2026','05/11/2026','06/11/2026','05/11/2026','06/11/2026','06/11/2026','05/11/2026','05/11/2026','05/11/2026','06/11/2026','05/11/2026'];
// Cuadro 2, Informe 000544-2026-SG-OGPP-OPM. Separate from operational contacts.
export const diagnosisCooperation=['Banco Mundial','BID','Unión Europea','Banco Mundial','GIZ','Banco Mundial','BID','Banco Mundial','Unión Europea','BID','GIZ / SERVIR'];
export const diagnosisProblems=[
  'Capacidad limitada para conducir la gestión ambiental de manera planificada, preventiva, articulada, predecible y orientada a resultados en los tres niveles de gobierno.',
  'Deficiencias en la prestación y simplificación de los servicios públicos del Sector Ambiental.',
  'Limitada articulación y aprovechamiento de capacidades técnico-científicas, tecnológicas y de información para las políticas públicas y la gestión ambiental y del riesgo.',
  'Débil asociación entre los servicios vinculados a las brechas del sector y los beneficios que recibe la población.',
  'Limitada capacidad de los programas y proyectos del MINAM para ejecutar sus intervenciones.',
  'Servicio de información ambiental fragmentado, no interoperable, de acceso limitado, inseguro y poco útil para la toma de decisiones.',
  'Limitada predictibilidad, calidad y oportunidad en la certificación ambiental.',
  'Limitada disponibilidad y eficiencia en el uso de los recursos del sector.',
  'Limitado abordaje interinstitucional de las economías ilícitas en áreas naturales protegidas y otros ecosistemas.',
  'Brechas en las capacidades del OEFA para prevenir los incumplimientos de mayor riesgo y lograr cambios de conducta.',
  'Limitadas condiciones para desarrollar el talento humano y limitada efectividad y sostenibilidad del Modelo de Integridad.'
];
