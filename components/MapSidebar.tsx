
'use client';

import { useState, useEffect } from 'react';

interface MapSidebarProps {
  onLayerToggle: (layers: string[], sublayers: string[]) => void;
}

export default function MapSidebar({ onLayerToggle }: MapSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [enabledLayers, setEnabledLayers] = useState<string[]>(['heritage-environment', 'community-memories', 'eat-sleep']);
  const [isMounted, setIsMounted] = useState(false);
  
  // 防止水化不匹配错误
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 更新为新的五大分类系统
  const layerCategories = [
    {
      id: 'heritage-environment',
      name: 'Heritage and Environment',
      icon: 'ri-ancient-gate-line',
      color: '#059669',
      sublayers: [
        { id: 'monuments', name: 'Monuments', icon: 'ri-building-line' },
        { id: 'churches', name: 'Churches', icon: 'ri-church-line' },
        { id: 'palaces', name: 'Palaces', icon: 'ri-government-line' },
        { id: 'nature', name: 'Natural Sites', icon: 'ri-leaf-line' }
      ]
    },
    {
      id: 'community-memories',
      name: 'Community Memories',
      icon: 'ri-heart-line',
      color: '#2563eb',
      sublayers: [
        { id: 'resident-stories', name: 'Resident Stories', icon: 'ri-user-heart-line' },
        { id: 'cultural-traditions', name: 'Cultural Traditions', icon: 'ri-calendar-event-line' },
        { id: 'student-life', name: 'Student Life', icon: 'ri-graduation-cap-line' }
      ]
    },
    {
      id: 'routes-itineraries',
      name: 'Routes and Itineraries',
      icon: 'ri-route-line',
      color: '#8b5cf6',
      sublayers: [
        { id: 'heritage-routes', name: 'Heritage Routes', icon: 'ri-footprint-line' },
        { id: 'scenic-routes', name: 'Scenic Routes', icon: 'ri-mountain-line' },
        { id: 'cultural-routes', name: 'Cultural Routes', icon: 'ri-book-line' },
        { id: 'food-routes', name: 'Food Routes', icon: 'ri-restaurant-line' }
      ]
    },
    {
      id: 'eat-sleep',
      name: 'Eat and Sleep',
      icon: 'ri-restaurant-2-line',
      color: '#ca8a04',
      sublayers: [
        { id: 'restaurants', name: 'Restaurants', icon: 'ri-restaurant-line' },
        { id: 'markets', name: 'Markets', icon: 'ri-store-line' },
        { id: 'accommodation', name: 'Accommodation', icon: 'ri-hotel-line' },
        { id: 'producers', name: 'Local Producers', icon: 'ri-scissors-cut-line' }
      ]
    },
    {
      id: 'risk-areas',
      name: 'Risk Areas',
      icon: 'ri-alert-line',
      color: '#dc2626',
      sublayers: [
        { id: 'flood-zones', name: 'Flood Zones', icon: 'ri-flood-line' },
        { id: 'landslide', name: 'Landslide Zones', icon: 'ri-mountain-line' },
        { id: 'seismic', name: 'Seismic Zones', icon: 'ri-earthquake-line' },
        { id: 'emergency', name: 'Emergency Services', icon: 'ri-hospital-line' }
      ]
    }
  ];

  const [enabledSublayers, setEnabledSublayers] = useState<string[]>([
    'monuments', 'churches', 'palaces', 'nature',
    'resident-stories', 'cultural-traditions', 'student-life',
    'restaurants', 'markets', 'accommodation', 'producers'
  ]);

  const handleLayerToggle = (layerId: string) => {
    const newEnabledLayers = enabledLayers.includes(layerId)
      ? enabledLayers.filter(id => id !== layerId)
      : [...enabledLayers, layerId];
    
    setEnabledLayers(newEnabledLayers);
    onLayerToggle(newEnabledLayers, enabledSublayers);
  };

  const handleSublayerToggle = (sublayerId: string) => {
    const newEnabledSublayers = enabledSublayers.includes(sublayerId)
      ? enabledSublayers.filter(id => id !== sublayerId)
      : [...enabledSublayers, sublayerId];
    
    setEnabledSublayers(newEnabledSublayers);
    onLayerToggle(enabledLayers, newEnabledSublayers);
  };

  // 在客户端挂载之前返回一个占位符
  if (!isMounted) {
    return (
      <div className="absolute top-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-12">
        <div className="p-4">
          <button
            className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-menu-line text-gray-600 text-lg"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute top-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-gray-900 ${!isOpen && 'hidden'}`}>Map Layers</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            title={isOpen ? 'Close layer controls' : 'Open layer controls'}
          >
            <i className={`ri-${isOpen ? 'close' : 'menu'}-line text-gray-600 text-lg`}></i>
          </button>
        </div>

        {isOpen && (
          <div className="space-y-4">
            {layerCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <i className={`${category.icon} text-lg`} style={{ color: category.color }}></i>
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </div>
                    <button
                      onClick={() => handleLayerToggle(category.id)}
                      className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${enabledLayers.includes(category.id) ? 'bg-emerald-500' : 'bg-gray-300'}`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${enabledLayers.includes(category.id) ? 'translate-x-5' : 'translate-x-0.5'}`}
                      />
                    </button>
                  </div>
                </div>

                {enabledLayers.includes(category.id) && (
                  <div className="p-3 space-y-2 bg-white">
                    {category.sublayers.map((sublayer) => (
                      <div key={sublayer.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <i className={`${sublayer.icon} text-sm text-gray-500`}></i>
                          <span className="text-xs text-gray-700">{sublayer.name}</span>
                        </div>
                        <button
                          onClick={() => handleSublayerToggle(sublayer.id)}
                          className={`w-8 h-4 rounded-full transition-colors cursor-pointer relative ${enabledSublayers.includes(sublayer.id) ? 'bg-emerald-400' : 'bg-gray-200'}`}
                        >
                          <div
                            className={`w-3 h-3 bg-white rounded-full shadow transition-transform absolute top-0.5 ${enabledSublayers.includes(sublayer.id) ? 'translate-x-4' : 'translate-x-0.5'}`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-2">Active Layers</div>
              <div className="text-sm font-medium text-gray-900">
                {enabledLayers.length} of {layerCategories.length} categories
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {enabledSublayers.length} sublayers active
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
