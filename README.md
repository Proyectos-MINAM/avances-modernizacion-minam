# MINAM · Sistema de Seguimiento de la Modernización

Aplicación web desarrollada con **Next.js 15, React 19, TypeScript, Tailwind CSS y Apache ECharts**. Interfaz institucional, responsive, centrada en la lectura fácil y actualización simple para responsables de mesa.

## Ejecutar

Requisitos: Node.js 20 o superior y conexión a internet para descargar las dependencias la primera vez.

```bash
npm install
npm run dev
```

Abrir **http://localhost:3000**.

## Pantallas

- `/` — Resumen ejecutivo, gráficos y alertas.
- `/mesas` — 11 mesas, 47 productos, fichas y avances.
- `/acuerdos` — Ruta histórica; la navegación principal no la utiliza.
- `/propuestas` — Propuestas y documentos asociados.
- `/sesiones` — Sesiones y actas.
- `/actualizar` — Registro de avance por producto, responsable y observación.
- `/cronograma` — Línea de tiempo interactiva, filtro por mes, búsqueda y ficha de hitos.
- `/ayuda-memoria` — Vista previa en PDF (5 páginas) y descarga del Word original «Ayuda_Memoria_vff.docx», adjuntado el 25/11/2026 y fechado el 23/11/2026.
- `/arboles-problemas` — Árboles interactivos; cada nodo ofrece un abstract descriptivo y enlaces al expediente de su mesa.
- `/diagnosticos` — Índice de los documentos narrativos de diagnóstico y las actas disponibles en Drive.
- `/gobernanza` — Biblioteca documental de gobernanza, con filtros, búsqueda, versiones y enlaces a los archivos de Drive.

### Trazabilidad de fuentes de la actualización

- **Galerías de diálogo (25/11/2026):** se copiaron 15 JPEG de la carpeta compartida [Fotos_ED](https://drive.google.com/drive/folders/1lLVJcw64UvqznhYAIdF6eWNf-_BQk4Lf). Se conservan los nombres y los IDs de Drive en `src/data/dialogue-photos.ts`, agrupados por **fecha y actor según el nombre del archivo**: cinco jóvenes presenciales (17/11), uno juvenil virtual (17/11), dos ONG grupo 1 (19/11), uno ONG grupo 2 (20/11), cuatro especialistas MINAM (23/11), dos academia (24/11). Se muestran desde `public/galerias/` para que las imágenes se vean directamente en la plataforma, sin depender del visor de Drive. Los otros cinco espacios todavía no tienen fotografías en la carpeta consultada: su galería muestra un estado vacío explícito. **No se ha inferido un cambio del estado “Programado” a “Realizado” para 23 y 24/11** a partir de los nombres de fotografías; requiere actualización de seguimiento autorizada. Las fotos son visibles para cualquier persona con acceso a esta plataforma web.

- **Actualización 25/11/2026:** el listado de especialistas deja de incluir los tres perfiles del BID, sin alterar las reuniones con el BID ni la asignación de cooperantes por mesa. Se retiran todos los botones de exportación CSV y el código que los generaba. La descarga de la Ayuda Memoria es exclusivamente documental (PDF y DOCX).

- **Espacios de diálogo (23/11/2026):** agenda reconstruida con la «Ayuda Memoria_vf.docx», apartado «Etapa participativa externa: espacios de diálogo» (páginas 4-5). Se registran 4 jornadas realizadas: 2 con jóvenes el 17/11 (21 presenciales y 20 virtuales) y 2 jornadas con ONG y sociedad civil el 19 y 20/11 (14 representantes **en conjunto**, sin desglose diario); y 7 jornadas próximas: 23 y 24/11, 30/11, 02, 04, 07 y 11/12. La reunión del 23/11 figura como programada, no ejecutada, al corte de ese documento. No se atribuyen asistentes, instituciones concretas ni modalidad cuando la fuente no lo especifica.

- **Cronograma (22/11/2026, actualización directa de la SG):** informe de avance de 70 días realizado; espacios de diálogo en curso desde 2026-11-17; identificación y selección de medidas en curso; validación de medidas reprogramada a 2026-11-27; retiro del hito de remisión de informes de líderes. La fecha prevista 2026-12-11 de identificación no se alteró; aunque es posterior a la validación del 27/11, ambas fechas se mantienen según las instrucciones recibidas hasta su conciliación.

- **Cooperantes (21/11/2026):** actualizado con el archivo recibido «Mesas_integrantes_cooperantes_estado (2).docx» (28 páginas). Incluye 11 mesas, 13 vínculos organismo–mesa (la Mesa 7 registra GIZ y BID; la Mesa 11 registra GIZ y SERVIR), consultores y reuniones documentadas hasta el 20/11. El documento muestra una fecha de composición «21 de octubre», pero incluye actualizaciones posteriores; la plataforma indica la fecha del último avance, no atribuye todo el contenido al 21/10.
- **Ambigüedad Mesa 5:** el cuadro identifica al Banco Mundial como cooperante, pero su estado registra una reunión de GIZ y OPM el 20/11. Se preserva la asignación BM y se consigna la intervención GIZ como evento, sin deducir un cambio de cooperante.
- **Validación de reuniones:** una reunión «agendada» no se marca como «realizada» sin confirmación explícita. Los datos de contacto no presentes en el documento se omiten. Los detalles de acuerdos no documentados se señalan como tales.

- `src/data/evidence.ts` cataloga las carpetas reales de diagnósticos y evidencias por mesa de trabajo. **La asociación de una evidencia concreta a cada causa o efecto sigue pendiente de cotejo individual**; la interfaz no afirma que los archivos de una carpeta sustenten automáticamente todos sus nodos.
- Los abstracts mostrados al seleccionar un nodo son **extractos descriptivos del texto del árbol**; no sustituyen las narrativas técnicas firmadas ni constituyen hechos nuevos verificados.
- `src/data/governance.ts` cataloga documentos hallados en el Drive del proceso. Se conservan las versiones y el estado de borrador donde aplica; una URL de Drive no implica aprobación administrativa.
- Se recibieron versiones más recientes de **Lineamientos (05/10/2026)** y **Documento Orientador (06/10/2026)** como archivos adjuntos de revisión, pero las versiones localizadas en el Drive examinado son anteriores. Antes de presentarlas como vigentes en la plataforma debe incorporarse el documento final aprobado al Drive y reemplazarse su enlace.
- La plataforma no proporciona backend de edición, autenticación institucional ni control de acceso propio. El acceso a los documentos depende de las ACL vigentes de Drive.

## Fuentes

Los registros iniciales provienen del archivo `Base_Tablero_VF.xlsx` dentro del proyecto Power BI suministrado. Corte **16 de octubre de 2026**. Se incluye un archivo `src/data/seed.json` con las tablas extraídas y normalizadas para lectura en el frontend.

**Nota de reconciliación:** el documento de validación del Power BI indica 83 acuerdos y 34 sesiones, mientras que el libro `Base_Tablero_VF.xlsx` utilizado contiene 81 acuerdos y 33 sesiones con datos importables. El prototipo presenta las filas encontradas en el archivo, sin inventar las faltantes. Debe conciliarse la base oficial antes de producción.

## Persistencia del prototipo

- Los cambios de avances y estados de acuerdos se conservan en `localStorage` **en el navegador del usuario**. Se mantienen al recargar, pero no se comparten entre equipos ni se registran en un servidor.
- Se incluye `prisma/schema.prisma` como modelo de datos **preparatorio** para PostgreSQL. No está conectado al frontend ni ejecuta migraciones.
- No incluye autenticación, aprobación, carga de archivos, auditoría de servidor ni permisos. Esas características requieren backend y aprobación de arquitectura por OGTI antes de usarse con información institucional operativa.
- No subir información confidencial al entorno de demostración.

## Continuidad técnica

1. Definir el proveedor de identidad autorizado y perfiles SG / Ministro / Coordinador / Responsable / Administrador.
2. Implementar API de escritura autenticada, validaciones de datos, transacciones e historial de cambios en PostgreSQL.
3. Implementar adjuntos en almacenamiento aprobado por la entidad y flujo de revisión / aprobación.
4. Conciliar indicadores con DAX de Power BI, fijar reglas de ponderación, corte, avance esperado y estados de plazo.
5. Realizar evaluación de seguridad, privacidad, accesibilidad y despliegue con OGTI.

## Estructura

```
src/app/                App Router de Next.js
src/components/         Dashboard y componentes compartidos
src/data/seed.json      Base histórica importada
src/lib/                Modelos y funciones utilitarias
prisma/schema.prisma    Modelo propuesto PostgreSQL
```
