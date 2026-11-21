import Dashboard from '@/components/dashboard';

export function generateStaticParams() {
  return [
    'cronograma',
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
    'acuerdos',
    'propuestas',
    'actualizar',
  ].map((section) => ({ section }));
}

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  return <Dashboard section={section} />;
}
