
import RouteDetailClient from './RouteDetailClient';
import { visitorsRoutes } from '@/lib/visitorsData';

export async function generateStaticParams() {
  // Generate all possible ID parameters from visitorsRoutes
  const staticParams = visitorsRoutes.map(route => ({
    id: route.id
  }));
  
  return staticParams;
}

export default function RouteDetailPage({ params }: { params: { id: string } }) {
  return <RouteDetailClient routeId={params.id} />;
}
