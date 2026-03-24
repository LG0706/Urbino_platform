
'use client';

import { useState } from 'react';

interface MapToolbarProps {
  onBasemapChange?: (basemap: string) => void;
  onSearch?: (query: string) => void;
}

export default function MapToolbar({ onBasemapChange, onSearch }: MapToolbarProps) {
  const [selectedBasemap, setSelectedBasemap] = useState('streets');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBasemapMenu, setShowBasemapMenu] = useState(false);

  // Simplified to only 2 basemaps - both without labels
  const basemaps = [
    { id: 'streets', name: 'Streets', icon: 'ri-road-map-line' },
    { id: 'satellite', name: 'Satellite', icon: 'ri-earth-line' }
  ];

  const handleBasemapChange = (basemapId: string) => {
    setSelectedBasemap(basemapId);
    setShowBasemapMenu(false);
    onBasemapChange?.(basemapId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <div className="absolute top-4 right-4 z-40 flex flex-col space-y-2">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places..."
              className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          <button
            type="submit"
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="relative">
          <button
            onClick={() => setShowBasemapMenu(!showBasemapMenu)}
            className="p-3 flex items-center space-x-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className={`${basemaps.find(b => b.id === selectedBasemap)?.icon} text-gray-700`}></i>
            <span className="text-sm text-gray-700">
              {basemaps.find(b => b.id === selectedBasemap)?.name}
            </span>
            <i className="ri-arrow-down-s-line text-gray-400"></i>
          </button>

          {showBasemapMenu && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[140px]">
              {basemaps.map((basemap) => (
                <button
                  key={basemap.id}
                  onClick={() => handleBasemapChange(basemap.id)}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap ${
                    basemap.id === selectedBasemap ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                  } ${basemap.id === basemaps[0].id ? 'rounded-t-lg' : ''} ${
                    basemap.id === basemaps[basemaps.length - 1].id ? 'rounded-b-lg' : ''
                  }`}
                >
                  <i className={basemap.icon}></i>
                  <span className="text-sm">{basemap.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
