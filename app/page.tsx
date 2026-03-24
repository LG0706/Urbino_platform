
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import MapSidebar from '@/components/MapSidebar';
import MapToolbar from '@/components/MapToolbar';
import NewsCard from '@/components/NewsCard';
import InteractiveMap from '@/components/InteractiveMap';
import { mapMarkers, routeItineraries } from '@/lib/mapData';
import Link from 'next/link';

export default function Home() {
  const [enabledLayers, setEnabledLayers] = useState<string[]>(['heritage-environment', 'community-memories', 'eat-sleep']);
  const [enabledSublayers, setEnabledSublayers] = useState<string[]>(['monuments', 'churches', 'palaces', 'nature', 'resident-stories', 'cultural-traditions', 'student-life', 'restaurants', 'markets', 'accommodation', 'producers']);
  const [selectedBasemap, setSelectedBasemap] = useState<string>('streets');

  const handleLayerToggle = (layers: string[], sublayers: string[]) => {
    setEnabledLayers(layers);
    setEnabledSublayers(sublayers);
  };

  const handleBasemapChange = (basemap: string) => {
    setSelectedBasemap(basemap);
  };

  const newsItems = [
    {
      id: '1',
      title: 'Renaissance Festival Returns to Urbino This Summer',
      excerpt: 'Experience the magic of the Renaissance with authentic performances, traditional crafts, and historic reenactments throughout the old town.',
      image: 'https://readdy.ai/api/search-image?query=Renaissance%20festival%20in%20historic%20Italian%20town%20square%20with%20people%20in%20period%20costumes%2C%20musicians%20and%20artisans%2C%20warm%20golden%20lighting%2C%20authentic%20medieval%20architecture%2C%20festive%20atmosphere&width=400&height=250&seq=news1&orientation=landscape',
      date: 'March 15, 2024',
      category: 'Culture'
    },
    {
      id: '2',
      title: 'New Walking Trail Opens Along Ancient City Walls',
      excerpt: 'Discover Urbino from a new perspective with our newly opened panoramic walking trail that follows the historic fortifications.',
      image: 'https://readdy.ai/api/search-image?query=Scenic%20walking%20trail%20along%20ancient%20stone%20city%20walls%20overlooking%20Italian%20countryside%2C%20mature%20trees%2C%20clear%20blue%20sky%2C%20peaceful%20atmosphere%2C%20well-maintained%20path&width=400&height=250&seq=news2&orientation=landscape',
      date: 'March 12, 2024',
      category: 'Tourism'
    },
    {
      id: '3',
      title: 'Community Garden Project Launches in San Bernardino',
      excerpt: 'Local residents come together to create a sustainable community garden promoting local food production and neighborhood connections.',
      image: 'https://readdy.ai/api/search-image?query=Community%20garden%20with%20raised%20beds%20full%20of%20vegetables%2C%20people%20of%20different%20ages%20working%20together%2C%20Italian%20hillside%20setting%2C%20organic%20farming%2C%20collaborative%20atmosphere&width=400&height=250&seq=news3&orientation=landscape',
      date: 'March 10, 2024',
      category: 'Community'
    },
    {
      id: '4',
      title: 'Emergency Preparedness Workshop This Weekend',
      excerpt: 'Join local emergency services for essential training on disaster preparedness, first aid, and community response protocols.',
      image: 'https://readdy.ai/api/search-image?query=Emergency%20preparedness%20workshop%20with%20people%20learning%20first%20aid%2C%20rescue%20equipment%20displayed%2C%20community%20center%20setting%2C%20professional%20instructors%2C%20safety%20education%20atmosphere&width=400&height=250&seq=news4&orientation=landscape',
      date: 'March 8, 2024',
      category: 'Safety'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Welcome Hero Section */}
      <section className="relative h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20historic%20Urbino%20cityscape%20at%20golden%20hour%2C%20Renaissance%20architecture%2C%20rolling%20Italian%20hills%2C%20UNESCO%20world%20heritage%20site%2C%20dramatic%20sky%2C%20ancient%20city%20walls%20and%20towers%2C%20warm%20atmospheric%20lighting&width=1920&height=1080&seq=hero1&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Come And<br />
              Explore Urbino.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover our UNESCO World Heritage city where Renaissance art meets modern community life. 
              Your gateway to cultural treasures and vibrant local experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#interactive-map" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
                Explore
              </Link>
              <Link href="/heritage" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="ri-arrow-down-line text-2xl"></i>
        </div>
      </section>

      <main>
        <div id="interactive-map" className="relative h-screen bg-gray-100">
          <InteractiveMap 
            markers={mapMarkers} 
            routes={routeItineraries}
            enabledLayers={enabledLayers}
            enabledSublayers={enabledSublayers}
            selectedBasemap={selectedBasemap}
          />

          {/* 将MapSidebar移动到左上角并默认展开 */}
          <div className="absolute top-4 left-4 z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Map Layers</h3>
                <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <i className="ri-layers-line text-white text-sm"></i>
                </div>
              </div>

              <div className="space-y-4">
                {[ 
                  {
                    id: 'heritage-environment',
                    name: 'Heritage and Environment',
                    icon: 'ri-ancient-gate-line',
                    color: '#059669',
                    enabled: enabledLayers.includes('heritage-environment'),
                    sublayers: [
                      { id: 'monuments', name: 'Monuments', icon: 'ri-building-line', enabled: enabledSublayers.includes('monuments') },
                      { id: 'churches', name: 'Churches', icon: 'ri-church-line', enabled: enabledSublayers.includes('churches') },
                      { id: 'palaces', name: 'Palaces', icon: 'ri-government-line', enabled: enabledSublayers.includes('palaces') },
                      { id: 'nature', name: 'Natural Sites', icon: 'ri-leaf-line', enabled: enabledSublayers.includes('nature') }
                    ]
                  },
                  {
                    id: 'community-memories',
                    name: 'Community Memories',
                    icon: 'ri-heart-line',
                    color: '#2563eb',
                    enabled: enabledLayers.includes('community-memories'),
                    sublayers: [
                      { id: 'resident-stories', name: 'Resident Stories', icon: 'ri-user-heart-line', enabled: enabledSublayers.includes('resident-stories') },
                      { id: 'cultural-traditions', name: 'Cultural Traditions', icon: 'ri-calendar-event-line', enabled: enabledSublayers.includes('cultural-traditions') },
                      { id: 'student-life', name: 'Student Life', icon: 'ri-graduation-cap-line', enabled: enabledSublayers.includes('student-life') }
                    ]
                  },
                  {
                    id: 'routes-itineraries',
                    name: 'Routes and Itineraries',
                    icon: 'ri-route-line',
                    color: '#8b5cf6',
                    enabled: enabledLayers.includes('routes-itineraries'),
                    sublayers: [
                      { id: 'heritage-routes', name: 'Heritage Routes', icon: 'ri-footprint-line', enabled: enabledSublayers.includes('heritage-routes') },
                      { id: 'scenic-routes', name: 'Scenic Routes', icon: 'ri-mountain-line', enabled: enabledSublayers.includes('scenic-routes') },
                      { id: 'cultural-routes', name: 'Cultural Routes', icon: 'ri-book-line', enabled: enabledSublayers.includes('cultural-routes') },
                      { id: 'food-routes', name: 'Food Routes', icon: 'ri-restaurant-line', enabled: enabledSublayers.includes('food-routes') }
                    ]
                  },
                  {
                    id: 'eat-sleep',
                    name: 'Eat and Sleep',
                    icon: 'ri-restaurant-2-line',
                    color: '#ca8a04',
                    enabled: enabledLayers.includes('eat-sleep'),
                    sublayers: [
                      { id: 'restaurants', name: 'Restaurants', icon: 'ri-restaurant-line', enabled: enabledSublayers.includes('restaurants') },
                      { id: 'markets', name: 'Markets', icon: 'ri-store-line', enabled: enabledSublayers.includes('markets') },
                      { id: 'accommodation', name: 'Accommodation', icon: 'ri-hotel-line', enabled: enabledSublayers.includes('accommodation') },
                      { id: 'producers', name: 'Local Producers', icon: 'ri-scissors-cut-line', enabled: enabledSublayers.includes('producers') }
                    ]
                  },
                  {
                    id: 'risk-areas',
                    name: 'Risk Areas',
                    icon: 'ri-alert-line',
                    color: '#dc2626',
                    enabled: enabledLayers.includes('risk-areas'),
                    sublayers: [
                      { id: 'flood-zones', name: 'Flood Zones', icon: 'ri-flood-line', enabled: enabledSublayers.includes('flood-zones') },
                      { id: 'landslide', name: 'Landslide Zones', icon: 'ri-mountain-line', enabled: enabledSublayers.includes('landslide') },
                      { id: 'seismic', name: 'Seismic Zones', icon: 'ri-earthquake-line', enabled: enabledSublayers.includes('seismic') },
                      { id: 'emergency', name: 'Emergency Services', icon: 'ri-hospital-line', enabled: enabledSublayers.includes('emergency') }
                    ]
                  }
                ].map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <i className={`${category.icon} text-lg`} style={{ color: category.color }}></i>
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                        <button
                          onClick={() => {
                            const newEnabledLayers = category.enabled
                              ? enabledLayers.filter(id => id !== category.id)
                              : [...enabledLayers, category.id];
                            handleLayerToggle(newEnabledLayers, enabledSublayers);
                          }}
                          className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${category.enabled ? 'bg-emerald-500' : 'bg-gray-300'}`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${category.enabled ? 'translate-x-5' : 'translate-x-0.5'}`}
                          />
                        </button>
                      </div>
                    </div>

                    {category.enabled && (
                      <div className="p-3 space-y-2 bg-white">
                        {category.sublayers.map((sublayer) => (
                          <div key={sublayer.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <i className={`${sublayer.icon} text-sm text-gray-500`}></i>
                              <span className="text-xs text-gray-700">{sublayer.name}</span>
                            </div>
                            <button
                              onClick={() => {
                                const newEnabledSublayers = sublayer.enabled
                                  ? enabledSublayers.filter(id => id !== sublayer.id)
                                  : [...enabledSublayers, sublayer.id];
                                handleLayerToggle(enabledLayers, newEnabledSublayers);
                              }}
                              className={`w-8 h-4 rounded-full transition-colors cursor-pointer relative ${sublayer.enabled ? 'bg-emerald-400' : 'bg-gray-200'}`}
                            >
                              <div
                                className={`w-3 h-3 bg-white rounded-full shadow transition-transform absolute top-0.5 ${sublayer.enabled ? 'translate-x-4' : 'translate-x-0.5'}`}
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
                    {enabledLayers.length} of 5 categories
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {enabledSublayers.length} sublayers active
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MapToolbar onBasemapChange={handleBasemapChange} />

          {/* 更新图例，对应新的五大分类 */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Map Legend</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Heritage and Environment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Community Memories</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Routes and Itineraries</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span className="text-gray-700">Eat and Sleep</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-gray-700">Risk Areas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage & Environment Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Heritage & Environment</h2>
                <p className="text-gray-600">Discover Urbino's UNESCO World Heritage treasures and natural landscapes</p>
              </div>
              <Link href="/heritage" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors cursor-pointer whitespace-nowrap">
                View all
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Renaissance%20ducal%20palace%20facade%20with%20elegant%20architecture%2C%20Italian%20Renaissance%20style%2C%20stone%20walls%2C%20arched%20windows%2C%20historic%20courtyard%2C%20golden%20hour%20lighting%2C%20UNESCO%20heritage%20site&width=400&height=200&seq=heritage1&orientation=landscape"
                  alt="Palazzo Ducale"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Palazzo Ducale</h3>
                  <p className="text-gray-600 text-sm">Masterpiece of Renaissance architecture and home to the National Gallery of the Marche</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Historic%20Raphael%20birthplace%20house%20in%20Urbino%2C%20Renaissance%20architecture%2C%20stone%20walls%2C%20wooden%20shutters%2C%20narrow%20medieval%20street%2C%20authentic%20period%20details%2C%20museum%20entrance&width=400&height=200&seq=heritage2&orientation=landscape"
                  alt="Raphael's Birthplace"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Raphael's Birthplace</h3>
                  <p className="text-gray-600 text-sm">Visit the house where the great Renaissance master was born in 1483</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Rolling%20hills%20and%20olive%20groves%20around%20Urbino%2C%20Italian%20countryside%20landscape%2C%20UNESCO%20protected%20environment%2C%20natural%20heritage%2C%20peaceful%20scenery&width=400&height=200&seq=heritage3&orientation=landscape"
                  alt="Natural Environment"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Environment</h3>
                  <p className="text-gray-600 text-sm">Protected landscapes and olive groves that have inspired artists for centuries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Residents' Life Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Residents' Life</h2>
                <p className="text-gray-600">Resources for residents and students in our vibrant university town</p>
              </div>
              <Link href="/residents" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors cursor-pointer whitespace-nowrap">
                View all
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=University%20students%20studying%20in%20historic%20Italian%20courtyard%2C%20academic%20life%2C%20books%20and%20laptops%2C%20Renaissance%20architecture%20background%2C%20collaborative%20learning%20atmosphere&width=400&height=200&seq=students1&orientation=landscape"
                  alt="Student Life"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Guide</h3>
                  <p className="text-gray-600 text-sm">Essential resources for university students including housing, dining, and study spots</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Community%20activities%20in%20Italian%20town%20square%2C%20local%20residents%20participating%20in%20cultural%20events%2C%20intergenerational%20gathering%2C%20authentic%20community%20life&width=400&height=200&seq=community1&orientation=landscape"
                  alt="Community Activities"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Activities</h3>
                  <p className="text-gray-600 text-sm">Local events, workshops, and social gatherings for residents of all ages</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Local%20services%20office%20in%20Italian%20town%2C%20residents%20receiving%20assistance%2C%20administrative%20building%2C%20community%20support%20center%2C%20helpful%20staff&width=400&height=200&seq=services1&orientation=landscape"
                  alt="Local Services"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Local Services</h3>
                  <p className="text-gray-600 text-sm">Business registration, zone regulations, and administrative services for residents</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visitor's Guide Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Visitor's Guide</h2>
                <p className="text-gray-600">Explore the best of Urbino with our curated travel routes and recommendations</p>
              </div>
              <Link href="/visitors" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors cursor-pointer whitespace-nowrap">
                View all
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Historic%20walking%20route%20through%20Urbino%20medieval%20streets%2C%20tourists%20exploring%2C%20Renaissance%20buildings%2C%20cobblestone%20paths%2C%20guided%20tour%20atmosphere%2C%20beautiful%20architecture&width=400&height=200&seq=walking1&orientation=landscape"
                  alt="Walking Routes"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Historic Walking Routes</h3>
                  <p className="text-gray-600 text-sm">Self-guided tours through Renaissance streets and architectural marvels</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Art%20museums%20and%20galleries%20in%20Urbino%2C%20Renaissance%20masterpieces%2C%20cultural%20exhibitions%2C%20tourists%20viewing%20artwork%2C%20refined%20museum%20interior&width=400&height=200&seq=museums1&orientation=landscape"
                  alt="Museums & Galleries"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Museums & Galleries</h3>
                  <p className="text-gray-600 text-sm">World-class art collections and cultural exhibitions in historic settings</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Traditional%20Italian%20restaurant%20terrace%20in%20Urbino%2C%20tourists%20dining%20outdoors%2C%20local%20cuisine%2C%20wine%20tasting%2C%20authentic%20culinary%20experience%2C%20hillside%20views&width=400&height=200&seq=dining1&orientation=landscape"
                  alt="Dining Experiences"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Culinary Experiences</h3>
                  <p className="text-gray-600 text-sm">Authentic local cuisine, wine tastings, and traditional cooking experiences</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risks & Actions Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Risks & Actions</h2>
                <p className="text-gray-600">Emergency preparedness, risk monitoring, and safety information for our community</p>
              </div>
              <Link href="/risks" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors cursor-pointer whitespace-nowrap">
                View all
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Emergency%20response%20team%20training%20in%20Italian%20town%2C%20first%20responders%20with%20equipment%2C%20safety%20procedures%20demonstration%2C%20professional%20emergency%20services&width=400&height=200&seq=emergency1&orientation=landscape"
                  alt="Emergency Services"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Preparedness</h3>
                  <p className="text-gray-600 text-sm">Emergency contacts, evacuation plans, and safety protocols for residents</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Environmental%20monitoring%20station%20in%20Italian%20hills%2C%20weather%20sensors%2C%20geological%20monitoring%20equipment%2C%20scientific%20instruments%2C%20risk%20assessment%20tools&width=400&height=200&seq=monitoring1&orientation=landscape"
                  alt="Risk Monitoring"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Monitoring</h3>
                  <p className="text-gray-600 text-sm">Real-time monitoring of flood risks, landslide zones, and weather conditions</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <img
                  src="https://readdy.ai/api/search-image?query=Community%20safety%20workshop%20with%20residents%20learning%20emergency%20procedures%2C%20disaster%20preparedness%20education%2C%20safety%20equipment%20demonstration%2C%20community%20resilience&width=400&height=200&seq=safety1&orientation=landscape"
                  alt="Safety Education"
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Safety Education</h3>
                  <p className="text-gray-600 text-sm">Community workshops on disaster preparedness and emergency response training</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events & News Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Events & News</h2>
                <p className="text-gray-600">Stay updated with the latest happenings in Urbino</p>
              </div>
              <Link href="/news" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center transition-colors cursor-pointer whitespace-nowrap">
                View all
                <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newsItems.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>
      </main>

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
              <h4 className="font-semibold mb-4">Info Office</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-start space-x-2">
                  <i className="ri-map-pin-line mt-0.5 text-emerald-400"></i>
                  <div>
                    <p>Piazza della Repubblica, 1</p>
                    <p>61029 Urbino (PU), Italy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-phone-line text-emerald-400"></i>
                  <p>+39 0722 2613</p>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-mail-line text-emerald-400"></i>
                  <p>info@comune.urbino.pu.it</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/heritage" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Heritage & Environment
                </Link>
                <Link href="/residents" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Residents' Life
                </Link>
                <Link href="/visitors" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Visitors' Guide
                </Link>
                <Link href="/risks" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Risks & Actions
                </Link>
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
                <a href="https://www.regione.marche.it" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Marche Region
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
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  <i className="ri-youtube-line text-xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
