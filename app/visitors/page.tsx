
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import InteractiveMap from '@/components/InteractiveMap';
import { visitorsRoutes } from '@/lib/visitorsData';
import { mapMarkers } from '@/lib/mapData';
import Link from 'next/link';

export default function VisitorsPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>(['walking', 'heritage', 'religious', 'cultural']);
  const [activeTab, setActiveTab] = useState<'routes' | 'places'>('routes');

  // Places数据来源：主页Eat and Sleep分类的标记点
  const placesData = mapMarkers.filter(marker => marker.category === 'Eat and Sleep');
  const [enabledPlaceTypes, setEnabledPlaceTypes] = useState<string[]>(['restaurants', 'markets', 'accommodation', 'producers']);

  const handleRouteClick = (routeId: string) => {
    setSelectedRoute(routeId);
    setSelectedMarker(null);
    const element = document.getElementById(`route-${routeId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(markerId);
    setSelectedRoute(null);
    const element = document.getElementById(`marker-${markerId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const filteredRoutes = visitorsRoutes.filter(route => 
    activeFilters.includes(route.theme)
  );

  const filteredPlaces = placesData.filter(place => 
    enabledPlaceTypes.includes(place.subcategory)
  );

  // 根据当前选项卡确定显示的标记
  const visibleMarkers = activeTab === 'routes' ? [] : filteredPlaces;
  const visibleRoutes = activeTab === 'routes' ? filteredRoutes : [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Background */}
      <section className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20Urbino%20historic%20center%20with%20Renaissance%20architecture%2C%20cobblestone%20streets%2C%20tourists%20walking%2C%20UNESCO%20world%20heritage%20site%2C%20golden%20hour%20lighting%2C%20Italian%20countryside%20hills%20in%20background%2C%20travel%20destination%20atmosphere&width=1920&height=640&seq=visitors-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Visitor's Guide
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Discover Urbino through carefully curated themed routes and explore the best dining experiences that showcase our Renaissance heritage and cultural treasures.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex h-screen">
        {/* Left Side - Interactive Map */}
        <div className="flex-1 relative">
          <InteractiveMap 
            markers={visibleMarkers}
            routes={visibleRoutes}
            enabledLayers={activeTab === 'routes' ? ['routes-itineraries'] : ['eat-sleep']}
            enabledSublayers={activeTab === 'routes' ? ['heritage-routes', 'scenic-routes', 'cultural-routes', 'food-routes'] : enabledPlaceTypes}
            selectedRoute={selectedRoute}
            onRouteClick={handleRouteClick}
            onMarkerClick={handleMarkerClick}
            showRouteFilters={activeTab === 'routes'}
            onFilterChange={handleFilterChange}
          />
          
          {/* 移动到左上角的Layer Filter */}
          <div className="absolute top-4 left-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Map Layers</h3>
                <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <i className="ri-layers-line text-white text-sm"></i>
                </div>
              </div>

              {/* 两种分类：Routes和Places */}
              <div className="space-y-4">
                {/* Routes分类 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="ri-route-line text-lg text-purple-600"></i>
                        <span className="text-sm font-medium text-gray-900">Routes</span>
                      </div>
                      <button
                        onClick={() => setActiveTab(activeTab === 'routes' ? 'places' : 'routes')}
                        className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${activeTab === 'routes' ? 'bg-emerald-500' : 'bg-gray-300'}`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${activeTab === 'routes' ? 'translate-x-5' : 'translate-x-0.5'}`}
                        />
                      </button>
                    </div>
                  </div>

                  {activeTab === 'routes' && (
                    <div className="p-3 space-y-2 bg-white">
                      {[
                        { id: 'heritage-routes', name: 'Heritage Routes', icon: 'ri-footprint-line' },
                        { id: 'scenic-routes', name: 'Scenic Routes', icon: 'ri-mountain-line' },
                        { id: 'cultural-routes', name: 'Cultural Routes', icon: 'ri-book-line' },
                        { id: 'food-routes', name: 'Food Routes', icon: 'ri-restaurant-line' }
                      ].map((sublayer) => (
                        <div key={sublayer.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <i className={`${sublayer.icon} text-sm text-gray-500`}></i>
                            <span className="text-xs text-gray-700">{sublayer.name}</span>
                          </div>
                          <div className="w-8 h-4 rounded-full bg-emerald-400 relative">
                            <div className="w-3 h-3 bg-white rounded-full shadow absolute top-0.5 translate-x-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Places分类 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="ri-restaurant-2-line text-lg text-yellow-600"></i>
                        <span className="text-sm font-medium text-gray-900">Places</span>
                      </div>
                      <button
                        onClick={() => setActiveTab(activeTab === 'places' ? 'routes' : 'places')}
                        className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${activeTab === 'places' ? 'bg-emerald-500' : 'bg-gray-300'}`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${activeTab === 'places' ? 'translate-x-5' : 'translate-x-0.5'}`}
                        />
                      </button>
                    </div>
                  </div>

                  {activeTab === 'places' && (
                    <div className="p-3 space-y-2 bg-white">
                      {[
                        { id: 'restaurants', name: 'Restaurants', icon: 'ri-restaurant-line' },
                        { id: 'markets', name: 'Markets', icon: 'ri-store-line' },
                        { id: 'accommodation', name: 'Accommodation', icon: 'ri-hotel-line' },
                        { id: 'producers', name: 'Local Producers', icon: 'ri-scissors-cut-line' }
                      ].map((sublayer) => (
                        <div key={sublayer.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <i className={`${sublayer.icon} text-sm text-gray-500`}></i>
                            <span className="text-xs text-gray-700">{sublayer.name}</span>
                          </div>
                          <button
                            onClick={() => {
                              const newEnabledTypes = enabledPlaceTypes.includes(sublayer.id)
                                ? enabledPlaceTypes.filter(id => id !== sublayer.id)
                                : [...enabledPlaceTypes, sublayer.id];
                              setEnabledPlaceTypes(newEnabledTypes);
                            }}
                            className={`w-8 h-4 rounded-full transition-colors cursor-pointer relative ${enabledPlaceTypes.includes(sublayer.id) ? 'bg-emerald-400' : 'bg-gray-200'}`}
                          >
                            <div
                              className={`w-3 h-3 bg-white rounded-full shadow transition-transform absolute top-0.5 ${enabledPlaceTypes.includes(sublayer.id) ? 'translate-x-4' : 'translate-x-0.5'}`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-2">Active Layer</div>
                  <div className="text-sm font-medium text-gray-900">
                    {activeTab === 'routes' ? `Routes (${filteredRoutes.length})` : `Places (${filteredPlaces.length})`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Routes and Places List */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Header with Toggle */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">Explore Urbino</h2>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setActiveTab('routes');
                  setSelectedRoute(null);
                  setSelectedMarker(null);
                }}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'routes'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-route-line mr-1"></i>
                Routes ({filteredRoutes.length})
              </button>
              <button
                onClick={() => {
                  setActiveTab('places');
                  setSelectedRoute(null);
                  setSelectedMarker(null);
                }}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'places'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className="ri-map-pin-line mr-1"></i>
                Places ({filteredPlaces.length})
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'routes' ? (
              <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Themed Routes</h3>
                {filteredRoutes.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="ri-map-line text-4xl text-gray-300 mb-4 block"></i>
                    <p className="text-gray-500">No routes match your current filters</p>
                  </div>
                ) : (
                  filteredRoutes.map((route) => (
                    <div
                      key={route.id}
                      id={`route-${route.id}`}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedRoute === route.id 
                          ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => handleRouteClick(route.id)}
                    >
                      {/* Route Image */}
                      <img
                        src={route.image}
                        alt={route.title}
                        className="w-full h-24 object-cover object-top rounded-lg mb-3"
                      />

                      {/* Route Info */}
                      <div className="space-y-2">
                        {/* Theme Badge and Duration */}
                        <div className="flex items-center justify-between">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: route.color }}
                          >
                            {route.themeLabel}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <i className="ri-time-line mr-1"></i>
                            {route.duration}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {route.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {route.description}
                        </p>

                        {/* Route Details */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center">
                            <i className="ri-map-pin-line mr-1"></i>
                            {route.stops} stops
                          </div>
                          <div className="flex items-center">
                            <i className="ri-footprint-line mr-1"></i>
                            {route.distance}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Highlights</p>
                          <div className="flex flex-wrap gap-1">
                            {route.highlights.slice(0, 2).map((highlight, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-100 text-xs text-gray-700 rounded"
                              >
                                {highlight}
                              </span>
                            ))}
                            {route.highlights.length > 2 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-xs text-gray-700 rounded">
                                +{route.highlights.length - 2}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link 
                          href={`/routes/${route.id}`}
                          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer block text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Places of Interest</h3>
                {filteredPlaces.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="ri-map-pin-line text-4xl text-gray-300 mb-4 block"></i>
                    <p className="text-gray-500">No places match your current filter settings</p>
                  </div>
                ) : (
                  filteredPlaces.map((marker) => (
                    <div
                      key={marker.id}
                      id={`marker-${marker.id}`}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedMarker === marker.id 
                          ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => handleMarkerClick(marker.id)}
                    >
                      {/* Marker Image */}
                      <img
                        src={marker.image}
                        alt={marker.title}
                        className="w-full h-20 object-cover object-top rounded-lg mb-3"
                      />

                      {/* Marker Info */}
                      <div className="space-y-2">
                        {/* Category Badge */}
                        <div className="flex items-center justify-between">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: marker.color }}
                          >
                            {marker.subcategory === 'restaurants' ? 'Restaurant' :
                             marker.subcategory === 'markets' ? 'Market' :
                             marker.subcategory === 'accommodation' ? 'Accommodation' : 'Local Producer'}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                          {marker.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {marker.description}
                        </p>

                        {/* Action Button */}
                        <Link 
                          href={`/sites/${marker.id}`}
                          className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer block text-center"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <i className="ri-building-2-line text-white text-lg"></i>
                </div>
                <span className="text-xl font-bold">Urbino Community</span>
              </div>
              <p className="text-gray-300 text-sm">
                Connecting heritage with modern life in our UNESCO World Heritage city.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tourist Office</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <i className="ri-map-pin-line mt-0.5 text-emerald-400"></i>
                  <div>
                    <p>Via Puccinotti, 35</p>
                    <p>61029 Urbino (PU), Italy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-emerald-400"></i>
                  <p>+39 0722 2613</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-emerald-400"></i>
                  <p>tourism@comune.urbino.pu.it</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="/heritage" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Heritage Sites
                </a>
                <a href="/residents" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Residents' Life
                </a>
                <a href="/risks" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Safety Information
                </a>
                <a href="/news" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Events & News
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Related Sites</h4>
              <div className="space-y-2 text-sm">
                <a href="https://www.uniurb.it" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  University of Urbino
                </a>
                <a href="https://whc.unesco.org" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  UNESCO World Heritage
                </a>
                <a href="https://www.turismo.marche.it" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Marche Tourism
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                2024 Urbino Community. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <i className="ri-facebook-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <i className="ri-twitter-line text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <i className="ri-instagram-line text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
