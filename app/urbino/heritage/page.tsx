
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import InteractiveMap from '@/components/InteractiveMap';
import { mapMarkers } from '@/lib/mapData';
import Link from 'next/link';

export default function HeritagePage() {
  // 仅显示Heritage and Environment分类 - 直接从主页数据对齐
  const heritageMarkers = mapMarkers.filter(marker => marker.category === 'Heritage and Environment');
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [enabledSublayers, setEnabledSublayers] = useState<string[]>(['monuments', 'churches', 'palaces', 'nature']);

  // 处理地图点击事件
  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(markerId);
    // 滚动到右侧列表对应项
    const element = document.getElementById(`site-${markerId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // 根据启用的子层筛选标记
  const filteredMarkers = heritageMarkers.filter(marker => 
    enabledSublayers.includes(marker.subcategory)
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-24 px-6 overflow-hidden"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Panoramic%20view%20of%20Urbino%20UNESCO%20World%20Heritage%20cityscape%20with%20Renaissance%20architecture%2C%20historic%20Palazzo%20Ducale%2C%20ancient%20stone%20walls%20and%20towers%2C%20rolling%20Italian%20hills%2C%20golden%20hour%20lighting%2C%20cultural%20heritage%20atmosphere&width=1920&height=600&seq=heritage-hero&orientation=landscape')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Heritage & Environment
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Discover Urbino's rich cultural heritage and environmental treasures. From Renaissance masterpieces 
              to natural landscapes, explore the elements that make our city a UNESCO World Heritage Site.
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Heritage Overview</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Urbino preserves both tangible and intangible heritage that tells the story of Renaissance innovation and cultural continuity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tangible Heritage</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-building-2-line text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Renaissance Architecture</h4>
                      <p className="text-gray-600">Palazzo Ducale, churches, and palaces representing the pinnacle of Renaissance architectural achievement.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-road-map-line text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Urban Planning</h4>
                      <p className="text-gray-600">Exceptional example of Renaissance urban design integrating natural topography with human settlement.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-landscape-line text-emerald-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Historic Landscape</h4>
                      <p className="text-gray-600">Harmonious relationship between built environment and surrounding Marche countryside.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Renaissance%20Palazzo%20Ducale%20Urbino%20with%20detailed%20architectural%20features%2C%20stone%20facades%2C%20ornate%20windows%2C%20courtyard%20perspective%2C%20UNESCO%20World%20Heritage%20architecture%2C%20Italian%20Renaissance%20masterpiece&width=600&height=400&seq=tangible-heritage&orientation=landscape"
                  alt="Tangible Heritage"
                  className="rounded-lg shadow-lg object-cover object-top w-full h-80"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://readdy.ai/api/search-image?query=Traditional%20Italian%20craftsman%20at%20work%20creating%20Renaissance-style%20pottery%20or%20artwork%2C%20cultural%20traditions%2C%20artisan%20workshop%2C%20intangible%20heritage%20preservation%2C%20skilled%20hands%20working%20with%20traditional%20tools&width=600&height=400&seq=intangible-heritage&orientation=landscape"
                  alt="Intangible Heritage"
                  className="rounded-lg shadow-lg object-cover object-top w-full h-80"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Intangible Heritage</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-graduation-cap-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Educational Traditions</h4>
                      <p className="text-gray-600">Continuous university tradition since 1506, maintaining Urbino's role as a center of learning.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-palette-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Artistic Traditions</h4>
                      <p className="text-gray-600">Living traditions of craftsmanship, ceramics, and artistic techniques passed down through generations.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-community-line text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Community Practices</h4>
                      <p className="text-gray-600">Festivals, markets, and social customs that maintain the living character of the historic city.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UNESCO City Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full mb-6">
                <i className="ri-award-line text-emerald-600 mr-2"></i>
                <span className="text-emerald-700 font-medium">UNESCO World Heritage Site</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">UNESCO Recognition</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Inscribed in 1998, Urbino exemplifies the ideals of the Renaissance city where art and culture seamlessly integrate with urban life.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">1998</div>
                <div className="text-sm text-gray-600 mb-4">Year Inscribed</div>
                <p className="text-gray-700">Recognized for outstanding universal value as an exceptional example of Renaissance urban planning.</p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">C</div>
                <div className="text-sm text-gray-600 mb-4">Cultural Criteria</div>
                <p className="text-gray-700">Meets criteria (ii) and (iv) for architectural and urban planning influence and outstanding ensemble.</p>
              </div>

              <div className="bg-white rounded-lg p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">Core</div>
                <div className="text-sm text-gray-600 mb-4">Protection Status</div>
                <p className="text-gray-700">Core zone encompasses the entire historic center with comprehensive legal protection framework.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Outstanding Universal Value</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Urbino represents a pinnacle of Renaissance culture, where Duke Federico da Montefeltro created an ideal Renaissance court that attracted artists, humanists, and mathematicians from across Europe.
                  </p>
                  <p>
                    The city demonstrates exceptional integration of Renaissance architectural principles with natural topography, creating a harmonious urban landscape that has remained substantially intact.
                  </p>
                  <p>
                    Its influence on urban planning and architectural development extended far beyond Italy, contributing to Renaissance city planning concepts across Europe.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Attributes</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center space-x-2">
                      <i className="ri-check-line text-emerald-600"></i>
                      <span>Renaissance urban layout and street pattern</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-check-line text-emerald-600"></i>
                      <span>Palazzo Ducale architectural complex</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-check-line text-emerald-600"></i>
                      <span>Integration with natural landscape</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <i className="ri-check-line text-emerald-600"></i>
                      <span>Continuous living heritage character</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <img
                  src="https://readdy.ai/api/search-image?query=Aerial%20view%20of%20Urbino%20historic%20center%20showing%20Renaissance%20urban%20planning%2C%20red%20tile%20rooftops%2C%20palace%20complex%2C%20medieval%20walls%2C%20UNESCO%20World%20Heritage%20site%20panoramic%20perspective&width=600&height=300&seq=unesco-aerial&orientation=landscape"
                  alt="UNESCO Urbino Aerial View"
                  className="rounded-lg shadow-lg object-cover object-top w-full h-48"
                />

                <div className="bg-white rounded-lg p-6 border-l-4 border-emerald-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Management Framework</h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start space-x-2">
                      <i className="ri-shield-check-line text-emerald-600 mt-0.5"></i>
                      <span>Protected under Italian national heritage legislation</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <i className="ri-file-list-3-line text-emerald-600 mt-0.5"></i>
                      <span>Comprehensive management plan with regular monitoring</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <i className="ri-group-line text-emerald-600 mt-0.5"></i>
                      <span>Multi-stakeholder approach involving local community</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Conservation Challenges</h4>
                  <p className="text-sm text-gray-700">
                    Balancing preservation of authentic Renaissance character with contemporary urban needs, 
                    managing tourism impacts, and maintaining traditional building techniques and materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="h-screen flex">
          <div className="flex-1 relative">
            <InteractiveMap 
              markers={filteredMarkers}
              enabledLayers={['heritage-environment']}
              enabledSublayers={enabledSublayers}
              selectedBasemap="streets"
              onMarkerClick={handleMarkerClick}
            />
            
            <div className="absolute top-4 left-4 z-40 bg-white rounded-lg shadow-lg w-80">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Heritage Sites Explorer</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <i className="ri-ancient-gate-line text-green-600 text-lg"></i>
                        <span className="text-sm font-medium text-gray-900">Heritage and Environment</span>
                      </div>
                      <div className="w-10 h-5 rounded-full bg-emerald-500 relative">
                        <div className="w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 translate-x-5" />
                      </div>
                    </div>

                    <div className="space-y-1 ml-6">
                      {[ 
                        { id: 'monuments', name: 'Monuments' },
                        { id: 'churches', name: 'Churches' },
                        { id: 'palaces', name: 'Palaces' },
                        { id: 'nature', name: 'Natural Sites' }
                      ].map((sublayer) => (
                        <label key={sublayer.id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabledSublayers.includes(sublayer.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEnabledSublayers([...enabledSublayers, sublayer.id]);
                              } else {
                                setEnabledSublayers(enabledSublayers.filter(id => id !== sublayer.id));
                              }
                            }}
                            className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-xs text-gray-700">{sublayer.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-[480px] bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Heritage Sites</h2>
              <p className="text-sm text-gray-600">Click on map markers or list items to explore</p>
              <div className="mt-3 text-sm text-gray-500">
                Showing {filteredMarkers.length} of {heritageMarkers.length} sites
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredMarkers.map((site) => (
                <div 
                  key={site.id}
                  id={`site-${site.id}`}
                  className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${ 
                    selectedMarker === site.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedMarker(site.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={site.image}
                      alt={site.title}
                      className="w-20 h-20 rounded-lg object-cover object-top flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {site.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {site.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: site.color }}
                        >
                          {site.subcategory === 'monuments' ? 'Monument' : 
                           site.subcategory === 'churches' ? 'Church' : 
                           site.subcategory === 'palaces' ? 'Palace' : 'Natural Site'}
                        </span>
                        <Link
                          href={`/urbino/sites/${site.id}`}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors whitespace-nowrap"
                        >
                          Learn More
                          <i className="ri-arrow-right-line ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredMarkers.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <i className="ri-search-line text-3xl mb-2"></i>
                  <p>No heritage sites match your current filter selection.</p>
                  <p className="text-sm mt-1">Try enabling more categories above.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Environment and Nature Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Environment & Nature</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The natural environment surrounding Urbino is integral to its World Heritage value, creating a harmonious landscape that has inspired artists for centuries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Rolling%20hills%20of%20Marche%20region%20around%20Urbino%20with%20traditional%20Italian%20countryside%2C%20olive%20groves%2C%20vineyards%2C%20scattered%20farmhouses%2C%20natural%20landscape%20integration%20with%20Renaissance%20city%20on%20hilltop&width=600&height=400&seq=marche-landscape&orientation=landscape"
                  alt="Marche Landscape"
                  className="rounded-lg shadow-lg object-cover object-top w-full h-80"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Natural Setting</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-mountain-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Apennine Foothills</h4>
                      <p className="text-gray-600">Urbino sits majestically on twin hills within the gentle slopes of the Marche Apennines, creating dramatic vistas.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-leaf-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Agricultural Landscape</h4>
                      <p className="text-gray-600">Traditional farming practices maintain the historic rural character with olive groves, vineyards, and grain fields.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-water-percent-line text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Water Systems</h4>
                      <p className="text-gray-600">Natural springs and streams have historically supplied the city and shaped the development of neighborhoods.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Ancient%20olive%20trees%20in%20Italian%20countryside%20near%20Urbino%2C%20traditional%20olive%20cultivation%2C%20Mediterranean%20agriculture%2C%20sustainable%20farming%20practices%2C%20heritage%20landscape%20preservation&width=400&height=300&seq=olive-groves&orientation=portrait"
                  alt="Olive Groves"
                  className="rounded-lg shadow-md object-cover object-top w-full h-48 mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Olive Heritage</h4>
                <p className="text-gray-600 text-sm">Ancient olive groves producing high-quality extra virgin olive oil using traditional methods.</p>
              </div>

              <div className="text-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Italian%20vineyard%20terraces%20in%20Marche%20region%20with%20grapevines%2C%20wine%20production%20landscape%2C%20sustainable%20viticulture%2C%20rolling%20hills%20with%20geometric%20patterns%20of%20vine%20rows&width=400&height=300&seq=vineyards&orientation=portrait"
                  alt="Vineyards"
                  className="rounded-lg shadow-md object-cover object-top w-full h-48 mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Wine Terroir</h4>
                <p className="text-gray-600 text-sm">Local vineyards producing distinctive Marche wines in harmony with the historic landscape.</p>
              </div>

              <div className="text-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Protected%20natural%20area%20near%20Urbino%20with%20native%20Mediterranean%20vegetation%2C%20wildlife%20habitat%20conservation%2C%20hiking%20trails%2C%20environmental%20protection%2C%20biodiversity%20preservation&width=400&height=300&seq=protected-areas&orientation=portrait"
                  alt="Protected Areas"
                  className="rounded-lg shadow-md object-cover object-top w-full h-48 mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Conservation Areas</h4>
                <p className="text-gray-600 text-sm">Protected zones maintaining biodiversity and traditional ecological relationships.</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Climate & Sustainability</h3>
                  <p className="text-gray-700 mb-6">
                    Urbino's temperate climate and sustainable practices help preserve both cultural and natural heritage. 
                    The city implements green initiatives while respecting traditional landscape management.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <i className="ri-recycle-line text-green-600"></i>
                      <span className="text-gray-700">Sustainable tourism practices</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="ri-plant-line text-green-600"></i>
                      <span className="text-gray-700">Native species conservation programs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <i className="ri-roadster-line text-green-600"></i>
                      <span className="text-gray-700">Eco-friendly transportation initiatives</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Environmental Data</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">458m</div>
                      <div className="text-gray-600">Average Elevation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">85%</div>
                      <div className="text-gray-600">Green Space</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">15°C</div>
                      <div className="text-gray-600">Annual Average</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-gray-600">Protected Areas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Heritage Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access comprehensive resources for research, education, and documentation of Urbino's heritage and environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-book-open-line text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Papers</h3>
                <p className="text-gray-600 text-sm mb-4">Academic studies on Urbino's heritage, architecture, and conservation.</p>
                <div className="text-2xl font-bold text-blue-600 mb-1">245</div>
                <div className="text-xs text-gray-500">Publications Available</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-image-line text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Photo Archives</h3>
                <p className="text-gray-600 text-sm mb-4">Historical and contemporary photographs documenting heritage sites.</p>
                <div className="text-2xl font-bold text-green-600 mb-1">12.5K</div>
                <div className="text-xs text-gray-500">Images Catalogued</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-video-line text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Content</h3>
                <p className="text-gray-600 text-sm mb-4">Documentaries, virtual tours, and educational videos.</p>
                <div className="text-2xl font-bold text-purple-600 mb-1">89</div>
                <div className="text-xs text-gray-500">Videos Available</div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-map-2-line text-orange-600 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital Maps</h3>
                <p className="text-gray-600 text-sm mb-4">Interactive maps, 3D models, and spatial analysis tools.</p>
                <div className="text-2xl font-bold text-orange-600 mb-1">34</div>
                <div className="text-xs text-gray-500">Map Layers</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Publications</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <img
                        src="https://readdy.ai/api/search-image?query=Academic%20book%20cover%20about%20Renaissance%20architecture%20and%20urban%20planning%20in%20Urbino%2C%20scholarly%20publication%20design%2C%20architectural%20drawings%2C%20UNESCO%20heritage%20documentation&width=80&height=100&seq=research-book-1&orientation=portrait"
                        alt="Research Publication"
                        className="w-16 h-20 rounded object-cover object-top flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Renaissance Urban Planning in Urbino</h4>
                        <p className="text-sm text-gray-600 mb-2">Comprehensive analysis of Federico da Montefeltro's urban vision and its lasting impact.</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">2023 • Dr. Maria Rossi</span>
                          <span className="text-emerald-600 font-medium text-sm cursor-pointer">Download PDF</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <img
                        src="https://readdy.ai/api/search-image?query=Conservation%20science%20book%20cover%20about%20heritage%20preservation%20techniques%2C%20restoration%20methods%2C%20technical%20documentation%2C%20scientific%20research%20publication&width=80&height=100&seq=research-book-2&orientation=portrait"
                        alt="Conservation Study"
                        className="w-16 h-20 rounded object-cover object-top flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Conservation Challenges and Solutions</h4>
                        <p className="text-sm text-gray-600 mb-2">Technical report on preservation methods for Urbino's architectural heritage.</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">2023 • UNESCO Team</span>
                          <span className="text-emerald-600 font-medium text-sm cursor-pointer">View Online</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <img
                        src="https://readdy.ai/api/search-image?query=Environmental%20studies%20publication%20cover%20about%20sustainable%20heritage%20tourism%2C%20ecological%20impact%20assessment%2C%20environmental%20management%20for%20cultural%20sites&width=80&height=100&seq=research-book-3&orientation=portrait"
                        alt="Environmental Study"
                        className="w-16 h-20 rounded object-cover object-top flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">Heritage Landscape Management</h4>
                        <p className="text-sm text-gray-600 mb-2">Sustainable approaches to managing cultural landscapes in the Marche region.</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">2022 • Prof. Giovanni Bianchi</span>
                          <span className="text-emerald-600 font-medium text-sm cursor-pointer">Access Research</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Digital Resources</h3>
                
                <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Virtual Heritage Tour</h4>
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                    <img
                      src="https://readdy.ai/api/search-image?query=Virtual%20reality%20headset%20displaying%203D%20model%20of%20Palazzo%20Ducale%20interior%2C%20digital%20heritage%20experience%2C%20interactive%20museum%20technology%2C%20immersive%20cultural%20tour&width=600&height=300&seq=virtual-tour&orientation=landscape"
                      alt="Virtual Tour Preview"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                        <i className="ri-play-fill text-emerald-600 text-2xl"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">Experience Urbino's heritage through immersive 360° virtual tours of key monuments and spaces.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <i className="ri-database-line text-blue-600 text-xl"></i>
                      <div>
                        <div className="font-medium text-gray-900">Heritage Database</div>
                        <div className="text-sm text-gray-600">Searchable catalog of sites and objects</div>
                      </div>
                    </div>
                    <i className="ri-external-link-line text-gray-400"></i>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <i className="ri-camera-lens-line text-green-600 text-xl"></i>
                      <div>
                        <div className="font-medium text-gray-900">Photo Archive Portal</div>
                        <div className="text-sm text-gray-600">Historical image collection access</div>
                      </div>
                    </div>
                    <i className="ri-external-link-line text-gray-400"></i>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <i className="ri-file-pdf-line text-red-600 text-xl"></i>
                      <div>
                        <div className="font-medium text-gray-900">Management Plans</div>
                        <div className="text-sm text-gray-600">Official conservation documents</div>
                      </div>
                    </div>
                    <i className="ri-external-link-line text-gray-400"></i>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-md flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <i className="ri-graduation-cap-line text-purple-600 text-xl"></i>
                      <div>
                        <div className="font-medium text-gray-900">Educational Materials</div>
                        <div className="text-sm text-gray-600">Resources for schools and universities</div>
                      </div>
                    </div>
                    <i className="ri-external-link-line text-gray-400"></i>
                  </div>
                </div>
              </div>
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
                <Link href="/urbino/heritage" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Heritage & Environment
                </Link>
                <Link href="/urbino/residents" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Residents' Life
                </Link>
                <Link href="/urbino/visitors" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
                  Visitors' Guide
                </Link>
                <Link href="/urbino/risks" className="block text-gray-300 hover:text-emerald-400 transition-colors cursor-pointer">
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
