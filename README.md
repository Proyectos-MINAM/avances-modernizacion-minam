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
