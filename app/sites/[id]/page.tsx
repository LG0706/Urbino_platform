
import SiteDetailClient from './SiteDetailClient';
import { mapMarkers } from '@/lib/mapData';

export async function generateStaticParams() {
  // 从mapMarkers中动态生成所有可能的ID参数，确保完全匹配
  const staticParams = mapMarkers.map(marker => ({
    id: marker.id
  }));
  
  return staticParams;
}

export default function SiteDetailPage({ params }: { params: { id: string } }) {
  return <SiteDetailClient siteId={params.id} />;
}
