'use client';

import { useState, useEffect, useRef } from 'react';
import MapMarker, { MarkerData } from './MapMarker';

interface RouteData {
  id: string;
  title: string;
  theme: string;
  themeLabel: string;
  description: string;
  image: string;
  duration: string;
  distance: string;
  stops: number;
  difficulty: string;
  color: string;
  highlights: string[];
  waypoints: { lat: number; lng: number; name: string; description: string }[];
}

interface InteractiveMapProps {
  markers?: MarkerData[];
  routes?: RouteData[];
  enabledLayers?: string[];
  enabledSublayers?: string[];
  selectedBasemap?: string;
  selectedRoute?: string | null;
  showRouteFilters?: boolean;
  onMarkerClick?: (markerId: string) => void;
  onRouteClick?: (routeId: string) => void;
  onFilterChange?: (filters: string[]) => void;
}

interface RiskArea {
  id: string;
  name: string;
  type: 'flood' | 'landslide' | 'emergency';
  subcategory: string;
  coordinates: { lat: number; lng: number }[];
  color: string;
  opacity: number;
  category: string;
}

export default function InteractiveMap({
  markers = [],
  routes = [],
  enabledLayers = [],
  enabledSublayers = [],
  selectedBasemap = 'streets',
  selectedRoute = null,
  showRouteFilters = false,
  onMarkerClick,
  onRouteClick,
  onFilterChange,
}: InteractiveMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [selectedRiskArea, setSelectedRiskArea] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'walking',
    'heritage',
    'religious',
    'cultural',
  ]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const mapCenter = { lat: 43.726149, lng: 12.636364 };
  const mapZoom = 14;
  const mapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Wait for the map div to have real dimensions before rendering markers
  useEffect(() => {
    const checkReady = () => {
      const bounds = mapRef.current?.getBoundingClientRect();
      if (bounds && bounds.width > 0 && bounds.height > 0) {
        setMapReady(true);
      } else {
        setTimeout(checkReady, 100);
      }
    };
    checkReady();

    const handleResize = () => setMapReady(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Re-trigger mapReady after resize settles
  useEffect(() => {
    if (!mapReady) {
      const t = setTimeout(() => setMapReady(true), 150);
      return () => clearTimeout(t);
    }
  }, [mapReady]);

  const getMapUrl = (basemap: string) => {
    const palazzoCoords = '43.726149,12.636364';
    if (basemap === 'satellite') {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.713291786915!2d12.634364!3d${mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${mapZoom}.1!3m3!1m2!1s0x132d168b5f7e8e21%3A0x7a6b5d5d8b5f7e8e!2sPalazzo%20Ducale%2C%20Urbino!5e1!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus&center=${palazzoCoords}&zoom=${mapZoom}`;
    }
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.713291786915!2d12.634364!3d${mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${mapZoom}.1!3m3!1m2!1s0x132d168b5f7e8e21%3A0x7a6b5d5d8b5f7e8e!2sPalazzo%20Ducale%2C%20Urbino!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus&center=${palazzoCoords}&zoom=${mapZoom}`;
  };

  const riskAreas: RiskArea[] = [
    {
      id: 'flood-zone-1',
      name: 'Metauro River Flood Zone',
      type: 'flood',
      subcategory: 'flood-zones',
      coordinates: [
        { lat: 43.717, lng: 12.626 },
        { lat: 43.718, lng: 12.627 },
        { lat: 43.7175, lng: 12.628 },
        { lat: 43.7165, lng: 12.6275 },
      ],
      color: '#dc2626',
      opacity: 0.3,
      category: 'Risk Areas',
    },
    {
      id: 'landslide-zone-1',
      name: 'Hill Stability Monitoring Area',
      type: 'landslide',
      subcategory: 'landslide',
      coordinates: [
        { lat: 43.734, lng: 12.62 },
        { lat: 43.735, lng: 12.621 },
        { lat: 43.7345, lng: 12.622 },
        { lat: 43.7335, lng: 12.6215 },
      ],
      color: '#dc2626',
      opacity: 0.3,
      category: 'Risk Areas',
    },
    {
      id: 'emergency-station-1',
      name: 'Emergency Services Station',
      type: 'emergency',
      subcategory: 'emergency',
      coordinates: [
        { lat: 43.729, lng: 12.651 },
        { lat: 43.7296, lng: 12.6515 },
        { lat: 43.7293, lng: 12.652 },
        { lat: 43.7288, lng: 12.6513 },
      ],
      color: '#dc2626',
      opacity: 0.3,
      category: 'Risk Areas',
    },
    {
      id: 'seismic-zone-1',
      name: 'Seismic Monitoring Zone East',
      type: 'emergency',
      subcategory: 'seismic',
      coordinates: [
        { lat: 43.72, lng: 12.648 },
        { lat: 43.721, lng: 12.649 },
        { lat: 43.7205, lng: 12.65 },
        { lat: 43.7195, lng: 12.6485 },
      ],
      color: '#dc2626',
      opacity: 0.3,
      category: 'Risk Areas',
    },
    {
      id: 'flood-zone-2',
      name: 'Secondary Flood Risk Zone',
      type: 'flood',
      subcategory: 'flood-zones',
      coordinates: [
        { lat: 43.725, lng: 12.645 },
        { lat: 43.726, lng: 12.646 },
        { lat: 43.7255, lng: 12.647 },
        { lat: 43.7245, lng: 12.6465 },
      ],
      color: '#dc2626',
      opacity: 0.3,
      category: 'Risk Areas',
    },
  ];

  const visibleMarkers = markers.filter((marker) => {
    if (enabledLayers.length === 0) {
      return true;
    }

    const getCategoryLayerId = (category: string): string => {
      const categoryMap: { [key: string]: string } = {
        'Heritage Sites': 'heritage-environment',
        'Heritage and Environment': 'heritage-environment',
        'Community Stories': 'community-memories',
        'Community Memories': 'community-memories',
        'Food & Dining': 'eat-sleep',
        'Eat and Sleep': 'eat-sleep',
        'Risk Areas': 'risk-areas',
        'Emergency Shelters': 'risk-areas',
        'Routes and Itineraries': 'routes-itineraries',
        'Cultural Events': 'events',
        'Community Events': 'events',
        'Educational Events': 'events',
        'Sports & Recreation': 'events',
        'Special Events': 'events',
      };
      return categoryMap[category] ?? '';
    };

    const isLayerEnabled = (category: string): boolean => {
      const layerId = getCategoryLayerId(category);
      return enabledLayers.includes(layerId);
    };

    const isSublayerEnabled = (subcategory: string): boolean => {
      return enabledSublayers.length === 0 || enabledSublayers.includes(subcategory);
    };

    return isLayerEnabled(marker.category) && isSublayerEnabled(marker.subcategory);
  });

  const visibleRiskAreas = riskAreas.filter((area) => enabledLayers.includes('risk-areas'));
  const visibleRoutes = routes.filter((route) => enabledLayers.includes('routes-itineraries'));
  const shouldShowEvacuationRoutes =
    enabledLayers.includes('evacuation-routes') && enabledSublayers.includes('primary-routes');

  const latLngToPixel = (lat: number, lng: number) => {
    const mapBounds = mapRef.current?.getBoundingClientRect();
    if (!mapBounds || mapBounds.width === 0) return { x: 0, y: 0 };

    const centerLat = mapCenter.lat;
    const centerLng = mapCenter.lng;

    // Improved: use Mercator-aware scaling at zoom 14
    const TILE_SIZE = 256;
    const scale = TILE_SIZE * Math.pow(2, mapZoom);

    const toWorldX = (lng: number) => ((lng + 180) / 360) * scale;
    const toWorldY = (lat: number) => {
      const sinLat = Math.sin((lat * Math.PI) / 180);
      return ((0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale);
    };

    const worldCenterX = toWorldX(centerLng);
    const worldCenterY = toWorldY(centerLat);
    const worldX = toWorldX(lng);
    const worldY = toWorldY(lat);

    const x = mapBounds.width / 2 + (worldX - worldCenterX);
    const y = mapBounds.height / 2 + (worldY - worldCenterY);

    return { x, y };
  };

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(markerId);
    setSelectedRiskArea(null);
    onMarkerClick?.(markerId);
  };

  const handleRiskAreaClick = (areaId: string) => {
    setSelectedRiskArea(areaId);
    setSelectedMarker(null);
  };

  const handleOverlayClick = () => {
    setSelectedMarker(null);
    setSelectedRiskArea(null);
  };

  const selectedMarkerData = visibleMarkers.find((m) => m.id === selectedMarker);
  const selectedRiskAreaData = visibleRiskAreas.find((area) => area.id === selectedRiskArea);

  const handleFilterToggle = (theme: string) => {
    const newFilters = activeFilters.includes(theme)
      ? activeFilters.filter((f) => f !== theme)
      : [...activeFilters, theme];
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const themeFilters = [
    { id: 'walking', name: 'Walking Routes', icon: 'ri-footprint-line', color: '#2563eb' },
    { id: 'heritage', name: 'Heritage Routes', icon: 'ri-ancient-gate-line', color: '#059669' },
    { id: 'religious', name: 'Religious Routes', icon: 'ri-church-line', color: '#7c3aed' },
    { id: 'cultural', name: 'Cultural Routes', icon: 'ri-book-line', color: '#ea580c' },
  ];

  const drawRoute = (waypoints: RouteData['waypoints'], color: string, isSelected: boolean) => {
    if (waypoints.length < 2) return null;
    return (
      <svg className="absolute inset-0 pointer-events-none z-20" style={{ width: '100%', height: '100%' }}>
        {waypoints.map((waypoint, index) => {
          if (index === waypoints.length - 1) return null;
          const start = latLngToPixel(waypoint.lat, waypoint.lng);
          const end = latLngToPixel(waypoints[index + 1].lat, waypoints[index + 1].lng);
          return (
            <line
              key={index}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke={color}
              strokeWidth={isSelected ? 4 : 3}
              strokeDasharray={isSelected ? '0' : '8,4'}
              opacity={isSelected ? 0.9 : 0.7}
            />
          );
        })}
      </svg>
    );
  };

  const drawRiskPolygon = (coordinates: RiskArea['coordinates'], color: string, opacity: number) => {
    if (coordinates.length < 3) return null;
    const points = coordinates.map((coord) => latLngToPixel(coord.lat, coord.lng));
    const pathData =
      points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + ' Z';
    return (
      <svg className="absolute inset-0 pointer-events-none z-10" style={{ width: '100%', height: '100%' }}>
        <path d={pathData} fill={color} fillOpacity={opacity} stroke={color} strokeWidth={2} strokeOpacity={0.8} />
      </svg>
    );
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      <iframe
        ref={iframeRef}
        src={getMapUrl(selectedBasemap)}
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Urbino Interactive Map"
      />

      <div ref={mapRef} className="absolute inset-0 pointer-events-none" onClick={handleOverlayClick}>
        {mapReady && (
          <>
            {/* Render routes */}
            {visibleRoutes && visibleRoutes.length > 0 && visibleRoutes.map((route) => (
              <div key={route.id} className="pointer-events-auto">
                {drawRoute(route.waypoints, route.color, selectedRoute === route.id)}
                {route.waypoints.map((waypoint, index) => {
                  const position = latLngToPixel(waypoint.lat, waypoint.lng);
                  const mapBounds = mapRef.current?.getBoundingClientRect();
                  if (!mapBounds) return null;
                  const margin = 50;
                  if (
                    position.x < -margin ||
                    position.x > mapBounds.width + margin ||
                    position.y < -margin ||
                    position.y > mapBounds.height + margin
                  ) return null;
                  const isStart = index === 0;
                  const isEnd = index === route.waypoints.length - 1;
                  return (
                    <button
                      key={`${route.id}-${index}`}
                      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform z-30"
                      style={{ left: `${position.x}px`, top: `${position.y}px` }}
                      onClick={(e) => { e.stopPropagation(); onRouteClick?.(route.id); }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-3 border-white shadow-xl flex items-center justify-center ${selectedRoute === route.id ? 'scale-125' : ''}`}
                        style={{ backgroundColor: route.color }}
                      >
                        {isStart && <i className="ri-play-fill text-white text-xs"></i>}
                        {isEnd && <i className="ri-flag-fill text-white text-xs"></i>}
                        {!isStart && !isEnd && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Render risk area polygons */}
            {visibleRiskAreas && visibleRiskAreas.length > 0 && visibleRiskAreas.map((area) => (
              <div key={area.id}>
                {drawRiskPolygon(area.coordinates, area.color, area.opacity)}
                {(() => {
                  const centerLat = area.coordinates.reduce((sum, coord) => sum + coord.lat, 0) / area.coordinates.length;
                  const centerLng = area.coordinates.reduce((sum, coord) => sum + coord.lng, 0) / area.coordinates.length;
                  const centerPosition = latLngToPixel(centerLat, centerLng);
                  const mapBounds = mapRef.current?.getBoundingClientRect();
                  if (!mapBounds) return null;
                  const margin = 50;
                  if (
                    centerPosition.x < -margin ||
                    centerPosition.x > mapBounds.width + margin ||
                    centerPosition.y < -margin ||
                    centerPosition.y > mapBounds.height + margin
                  ) return null;
                  return (
                    <button
                      className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform z-30"
                      style={{ left: `${centerPosition.x}px`, top: `${centerPosition.y}px` }}
                      onClick={(e) => { e.stopPropagation(); handleRiskAreaClick(area.id); }}
                    >
                      <div className="w-8 h-8 rounded-full border-3 border-white shadow-xl flex items-center justify-center" style={{ backgroundColor: area.color }}>
                        <i className="ri-alert-line text-white text-lg"></i>
                      </div>
                    </button>
                  );
                })()}
              </div>
            ))}

            {/* Render all visible markers */}
            {visibleMarkers.map((marker) => {
              const position = latLngToPixel(marker.position.lat, marker.position.lng);
              const mapBounds = mapRef.current?.getBoundingClientRect();
              if (!mapBounds) return null;
              const margin = 50;
              if (
                position.x < -margin ||
                position.x > mapBounds.width + margin ||
                position.y < -margin ||
                position.y > mapBounds.height + margin
              ) return null;
              return (
                <button
                  key={marker.id}
                  className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform z-30"
                  style={{ left: `${position.x}px`, top: `${position.y}px` }}
                  onClick={(e) => { e.stopPropagation(); handleMarkerClick(marker.id); }}
                >
                  <div className="w-10 h-10 rounded-full border-4 border-white shadow-xl flex items-center justify-center" style={{ backgroundColor: marker.color }}>
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </button>
              );
            })}
          </>
        )}
      </div>

      {selectedMarkerData && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto">
          <MapMarker marker={selectedMarkerData} isOpen={true} onClose={() => setSelectedMarker(null)} />
        </div>
      )}

      {selectedRiskAreaData && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 pointer-events-auto">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 p-0 overflow-hidden">
            <button
              onClick={() => setSelectedRiskArea(null)}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-gray-600"></i>
            </button>
            <div className="relative">
              <img
                src={`https://readdy.ai/api/search-image?query=${
                  selectedRiskAreaData.type === 'flood'
                    ? 'Flood risk area with river valley, emergency warning signs, Italian countryside landscape, risk management infrastructure'
                    : selectedRiskAreaData.type === 'landslide'
                    ? 'Hillside with geological monitoring equipment, landslide prevention, Italian hills, safety monitoring station'
                    : 'Emergency services station with rescue vehicles, safety equipment, professional responders, emergency facility'
                }&width=320&height=192&seq=risk-${selectedRiskAreaData.id}&orientation=landscape`}
                alt={selectedRiskAreaData.name}
                className="w-full h-48 object-cover object-top"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-red-600">Risk Area</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedRiskAreaData.name}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {selectedRiskAreaData.type === 'flood'
                  ? 'Potential flood risk area during heavy rainfall. Emergency evacuation routes and safety procedures are established for this zone.'
                  : selectedRiskAreaData.type === 'landslide'
                  ? 'Geological monitoring station for hillside stability control. Regular assessments ensure early warning for potential landslide risks.'
                  : 'Emergency services station providing rapid response capabilities for the local area. Equipped with rescue teams and safety equipment.'}
              </p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: selectedRiskAreaData.color }}>
                  {selectedRiskAreaData.type === 'flood' ? 'Flood Risk' : selectedRiskAreaData.type === 'landslide' ? 'Landslide Risk' : 'Emergency Services'}
                </span>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap">
                  View Details
                  <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
