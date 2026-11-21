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
- `/acuerdos` — Acuerdos, estado editable, búsqueda, filtros y exportación CSV.
- `/propuestas` — Propuestas y documentos asociados.
- `/sesiones` — Sesiones y actas.
- `/actualizar` — Registro de avance por producto, responsable y observación.
- `/cronograma` — Línea de tiempo interactiva, filtro por mes, búsqueda y ficha de hitos.
- `/arboles-problemas` — Árboles interactivos; cada nodo ofrece un abstract descriptivo y enlaces al expediente de su mesa.
- `/diagnosticos` — Índice de los documentos narrativos de diagnóstico y las actas disponibles en Drive.
- `/gobernanza` — Biblioteca documental de gobernanza, con filtros, búsqueda, versiones y enlaces a los archivos de Drive.

### Trazabilidad de fuentes de la actualización

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
