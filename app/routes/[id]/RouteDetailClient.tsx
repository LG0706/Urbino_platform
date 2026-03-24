
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { visitorsRoutes } from '@/lib/visitorsData';

interface RouteDetailClientProps {
  routeId: string;
}

export default function RouteDetailClient({ routeId }: RouteDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeWaypoint, setActiveWaypoint] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showRouteInfo, setShowRouteInfo] = useState(false);

  const routeData = visitorsRoutes.find(route => route.id === routeId);

  if (!routeData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <i className="ri-map-line text-6xl text-gray-300 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Route Not Found</h2>
            <p className="text-gray-600 mb-6">The route you're looking for doesn't exist.</p>
            <Link 
              href="/visitors"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Routes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const galleryImages = [
    routeData.image,
    routeData.image.replace('&seq=', '&seq=gallery1-'),
    routeData.image.replace('&seq=', '&seq=gallery2-'),
    routeData.image.replace('&seq=', '&seq=gallery3-')
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'challenging': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSuitableFor = (theme: string) => {
    const suitableGroups: { [key: string]: string[] } = {
      'walking': ['Nature lovers', 'Photography enthusiasts', 'Families with children', 'Senior travelers', 'First-time visitors'],
      'heritage': ['Art enthusiasts', 'History buffs', 'Students and researchers', 'Cultural travelers', 'Museum visitors'],
      'religious': ['Spiritual seekers', 'Art and architecture lovers', 'Pilgrims', 'Quiet contemplation seekers', 'Cultural heritage enthusiasts'],
      'cultural': ['Lifelong learners', 'University visitors', 'Local culture enthusiasts', 'Artisan craft lovers', 'Educational groups']
    };
    return suitableGroups[theme] || ['All visitors'];
  };

  const getRouteDetails = (id: string) => {
    const details: { [key: string]: any } = {
      'historic-center-walk': {
        bestTime: 'Morning (9-11 AM) or late afternoon (4-6 PM)',
        startLocation: 'Palazzo Ducale Main Square',
        endLocation: 'Return to Palazzo Ducale',
        terrain: 'Cobblestone streets and gentle slopes',
        accessibility: 'Limited wheelchair accessibility due to historic cobblestones',
        tips: ['Wear comfortable walking shoes', 'Bring a camera for scenic views', 'Visit local shops along the way', 'Stop for gelato at Piazza della Repubblica'],
        seasonalNotes: 'Beautiful in all seasons. Spring and fall offer the most comfortable walking weather.',
        parking: 'Mercatale parking area (5-minute walk to start point)',
        facilities: 'Restrooms available at Palazzo Ducale and along Via Raffaello'
      },
      'countryside-trail': {
        bestTime: 'Early morning (8-10 AM) for best lighting and cooler temperatures',
        startLocation: 'Porta Valbona (Historic City Gate)',
        endLocation: 'Return to Porta Valbona',
        terrain: 'Natural paths, hills, and farm roads',
        accessibility: 'Not suitable for wheelchairs due to uneven terrain',
        tips: ['Bring water and snacks', 'Wear sturdy hiking shoes', 'Check weather conditions', 'Respect private property'],
        seasonalNotes: 'Best in spring (wildflowers) and autumn (harvest season). Summer can be hot.',
        parking: 'Limited parking near Porta Valbona',
        facilities: 'Basic facilities at start/end point only'
      },
      'renaissance-masters-route': {
        bestTime: 'Any time during museum hours, avoid peak tourist times (11 AM - 2 PM)',
        startLocation: 'Palazzo Ducale - National Gallery',
        endLocation: 'Studiolo del Duca',
        terrain: 'Indoor museums and paved city streets',
        accessibility: 'Wheelchair accessible in most locations',
        tips: ['Book museum tickets in advance', 'Allow extra time for art appreciation', 'Photography rules vary by location', 'Consider guided tours for deeper insights'],
        seasonalNotes: 'Indoor route suitable year-round. Less crowded in winter months.',
        parking: 'Mercatale parking area',
        facilities: 'Full facilities at all museum locations'
      },
      'ducal-court-route': {
        bestTime: 'Mid-morning (10 AM - 12 PM) for best natural lighting in palace rooms',
        startLocation: 'Ducal Palace Main Entrance',
        endLocation: 'Hanging Gardens',
        terrain: 'Historic palace floors and courtyards',
        accessibility: 'Partially wheelchair accessible, some stairs required',
        tips: ['Audio guides available in multiple languages', 'Respect photography restrictions', 'Allow 3-4 hours for full experience', 'Combine with National Gallery visit'],
        seasonalNotes: 'Indoor palace areas comfortable year-round. Gardens best in spring/summer.',
        parking: 'Mercatale or Borgo parking areas',
        facilities: 'Restrooms, gift shop, and cafe available'
      },
      'sacred-art-pilgrimage': {
        bestTime: 'Morning hours to avoid afternoon services',
        startLocation: 'Cathedral of Urbino',
        endLocation: 'Cathedral Return',
        terrain: 'City streets and church interiors',
        accessibility: 'Most churches wheelchair accessible via ramps',
        tips: ['Dress modestly for church visits', 'Respect ongoing services', 'Small donations appreciated', 'Silent photography only'],
        seasonalNotes: 'Available year-round. Easter and Christmas seasons offer special ceremonies.',
        parking: 'Cathedral area parking (limited spaces)',
        facilities: 'Basic facilities at major churches'
      },
      'monastic-heritage-route': {
        bestTime: 'Early morning for peaceful contemplation',
        startLocation: 'San Domenico Cloister',
        endLocation: 'Meditation Path',
        terrain: 'Peaceful cloisters and garden paths',
        accessibility: 'Generally wheelchair accessible',
        tips: ['Maintain quiet and respectful behavior', 'Perfect for meditation and reflection', 'Some areas may have restricted access', 'Bring a journal for reflection'],
        seasonalNotes: 'Gardens most beautiful in spring and summer. Winter offers unique contemplative atmosphere.',
        parking: 'Nearby street parking available',
        facilities: 'Limited facilities, carry water'
      },
      'university-intellectual-route': {
        bestTime: 'Weekdays during academic year for campus atmosphere',
        startLocation: "University Rector's Office",
        endLocation: 'Collegio Raffaello',
        terrain: 'University buildings and campus areas',
        accessibility: 'Modern university buildings fully accessible',
        tips: ['Respect ongoing classes and activities', 'Student ID may provide discounts', 'Combine with library visits', 'Interact with international students'],
        seasonalNotes: 'Most active during academic year (September-June). Summer offers quieter exploration.',
        parking: 'University parking areas (visitor permits required)',
        facilities: 'Modern facilities including cafes and libraries'
      },
      'artisan-craft-route': {
        bestTime: 'Weekday mornings when artisans are actively working',
        startLocation: 'Ceramics Workshop',
        endLocation: 'Artisan Market',
        terrain: 'Workshop areas and market streets',
        accessibility: 'Variable accessibility depending on workshop location',
        tips: ['Call ahead to confirm workshop availability', 'Purchase opportunities available', 'Respect working artisans', 'Hands-on experiences possible'],
        seasonalNotes: 'Best during working seasons. Some workshops may close during August holidays.',
        parking: 'Workshop area parking (narrow streets)',
        facilities: 'Basic facilities, workshops may offer refreshments'
      }
    };
    return details[id] || {};
  };

  const details = getRouteDetails(routeData.id);
  const suitableGroups = getSuitableFor(routeData.theme);

  const handleWaypointClick = (index: number) => {
    setActiveWaypoint(activeWaypoint === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/visitors"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Routes
          </Link>

          {/* Hero Section */}
          <div className="relative mb-8">
            <img
              src={routeData.image}
              alt={routeData.title}
              className="w-full h-96 object-cover object-top rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div className="absolute top-6 left-6">
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: routeData.color }}
              >
                {routeData.themeLabel}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white mb-2">{routeData.title}</h1>
              <p className="text-lg text-white/90">{routeData.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Route Overview */}
              <section className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Route Overview</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <i className="ri-time-line text-2xl text-emerald-600 mb-2"></i>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">{routeData.duration}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <i className="ri-footprint-line text-2xl text-emerald-600 mb-2"></i>
                    <div className="text-sm text-gray-600">Distance</div>
                    <div className="font-semibold text-gray-900">{routeData.distance}</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <i className="ri-map-pin-line text-2xl text-emerald-600 mb-2"></i>
                    <div className="text-sm text-gray-600">Stops</div>
                    <div className="font-semibold text-gray-900">{routeData.stops} locations</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <i className="ri-mountain-line text-2xl text-emerald-600 mb-2"></i>
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className={`font-semibold px-2 py-1 rounded text-xs ${getDifficultyColor(routeData.difficulty)}`}>
                      {routeData.difficulty}
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed">{routeData.description}</p>
                </div>
              </section>

              {/* Interactive Route Map */}
              <section className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Route Map</h2>
                
                <div className="relative bg-gray-100 rounded-lg h-96 mb-6">
                  {/* Embedded Google Map */}
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5831.0263335187!2d12.634364!3d43.726149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132d168b8b7e8e21%3A0x132d168dfe7c8b21!2sPalazzo%20Ducale%2C%20Urbino!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus`}
                    width="100%"
                    height="100%"
                    className="border-0 rounded-lg"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Route Map"
                  />
                  
                  {/* 交互式路线点标记 - 绝对定位在地图上 */}
                  {routeData.waypoints.map((waypoint, index) => {
                    const baseX = 80 + (index * 120);
                    const baseY = 150 + Math.sin(index * 0.5) * 60;
                    
                    const x = Math.max(40, Math.min(baseX, 340));
                    const y = Math.max(40, Math.min(baseY, 320));

                    return (
                      <button
                        key={index}
                        onClick={() => handleWaypointClick(index)}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all duration-200 z-30"
                        style={{
                          left: `${x}px`,
                          top: `${y}px`,
                        }}
                      >
                        <div className="relative">
                          {/* 标记圆圈 */}
                          <div
                            className={`w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center transition-all ${activeWaypoint === index ? 'scale-125' : ''}`}
                            style={{ backgroundColor: routeData.color }}
                          >
                            {index === 0 ? (
                              <i className="ri-play-fill text-white text-xs"></i>
                            ) : index === routeData.waypoints.length - 1 ? (
                              <i className="ri-flag-fill text-white text-xs"></i>
                            ) : (
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            )}
                          </div>
                          {/* 标记标签 */}
                          <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-900 shadow-sm">
                              {waypoint.name}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* 路线路径线条 */}
                  <svg 
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{ width: '100%', height: '100%' }}
                  >
                    {routeData.waypoints.map((waypoint, index) => {
                      if (index === routeData.waypoints.length - 1) return null;
                      
                      const currentX = Math.max(40, Math.min(80 + (index * 120), 340));
                      const currentY = Math.max(40, Math.min(150 + Math.sin(index * 0.5) * 60, 320));
                      const nextX = Math.max(40, Math.min(80 + ((index + 1) * 120), 340));
                      const nextY = Math.max(40, Math.min(150 + Math.sin((index + 1) * 0.5) * 60, 320));
                      
                      return (
                        <line
                          key={index}
                          x1={currentX}
                          y1={currentY}
                          x2={nextX}
                          y2={nextY}
                          stroke={routeData.color}
                          strokeWidth="3"
                          strokeDasharray="8,4"
                          opacity="0.8"
                        />
                      );
                    })}
                  </svg>
                  {/* 图例 */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: routeData.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">Route Path</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow flex items-center justify-center">
                        <i className="ri-play-fill text-white text-xs"></i>
                      </div>
                      <span className="text-xs text-gray-700">Start Point</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow flex items-center justify-center">
                        <i className="ri-flag-fill text-white text-xs"></i>
                      </div>
                      <span className="text-xs text-gray-700">End Point</span>
                    </div>
                  </div>

                  {/* 选中停靠点信息弹窗 */}
                  {activeWaypoint !== null && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white rounded-lg shadow-xl border border-gray-200 w-80 p-0 overflow-hidden">
                      <button
                        onClick={() => setActiveWaypoint(null)}
                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                      >
                        <i className="ri-close-line text-gray-600"></i>
                      </button>

                      <div className="relative">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Historic%20${routeData.waypoints[activeWaypoint].name.replace(/[^a-zA-Z0-9\s]/g, '')}%20landmark%20in%20Urbino%20Italy%20Renaissance%20architecture%20tourist%20destination%20beautiful%20scenic%20view%20cultural%20heritage%20site&width=400&height=240&seq=stop-${routeId}-${activeWaypoint}&orientation=landscape`}
                          alt={routeData.waypoints[activeWaypoint].name}
                          className="w-full h-48 object-cover object-top"
                        />
                        <div className="absolute top-3 left-3">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: routeData.color }}
                          >
                            Stop {activeWaypoint + 1}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {routeData.waypoints[activeWaypoint].name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {routeData.waypoints[activeWaypoint].description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-2 rounded">
                            <div className="text-xs text-gray-500 mb-1">Coordinates</div>
                            <div className="text-sm font-medium text-gray-900">
                              {routeData.waypoints[activeWaypoint].lat.toFixed(4)}, {routeData.waypoints[activeWaypoint].lng.toFixed(4)}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <div className="text-xs text-gray-500 mb-1">Visit Duration</div>
                            <div className="text-sm font-medium text-gray-900">15-30 min</div>
                          </div>
                        </div>

                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <i className="ri-play-circle-line mr-2 text-green-600"></i>
                      Start Location
                    </h4>
                    <p className="text-gray-700 text-sm">{details.startLocation}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <i className="ri-flag-line mr-2 text-red-600"></i>
                      End Location
                    </h4>
                    <p className="text-gray-700 text-sm">{details.endLocation}</p>
                  </div>
                </div>
              </section>

              {/* Waypoints & Highlights */}
              <section className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Route Highlights & Stops</h2>
                
                <div className="space-y-4">
                  {routeData.waypoints.map((waypoint, index) => (
                    <div 
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${activeWaypoint === index ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => handleWaypointClick(index)}
                    >
                      <div className="flex items-start space-x-4">
                        <div 
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                          style={{ backgroundColor: routeData.color }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{waypoint.name}</h3>
                            <i className={`ri-${activeWaypoint === index ? 'subtract' : 'add'}-line text-gray-400`}></i>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{waypoint.description}</p>
                          
                          {activeWaypoint === index && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <img
                                src={`https://readdy.ai/api/search-image?query=Historic%20${waypoint.name.replace(/[^a-zA-Z0-9\s]/g, '')}%20landmark%20in%20Urbino%20Italy%20Renaissance%20architecture%20tourist%20destination%20beautiful%20scenic%20view%20cultural%20heritage%20site&width=400&height=240&seq=waypoint${routeId}${index}&orientation=landscape`}
                                alt={waypoint.name}
                                className="w-full h-48 object-cover object-top rounded-lg mb-3"
                              />
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium text-gray-900">Coordinates:</span>
                                  <p className="text-gray-600">{waypoint.lat.toFixed(4)}, {waypoint.lng.toFixed(4)}</p>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">Stop Duration:</span>
                                  <p className="text-gray-600">15-30 minutes</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Photo Gallery */}
              <section className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
                
                <div className="mb-4">
                  <img
                    src={galleryImages[currentImageIndex]}
                    alt={`Gallery ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover object-top rounded-lg"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {galleryImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 ${currentImageIndex === index ? 'ring-2 ring-emerald-500' : ''}`}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${isBookmarked ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                  >
                    <i className={`ri-heart-${isBookmarked ? 'fill' : 'line'}`}></i>
                    <span>{isBookmarked ? 'Bookmarked' : 'Bookmark Route'}</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-download-line"></i>
                    <span>Download PDF Guide</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-share-line"></i>
                    <span>Share Route</span>
                  </button>
                </div>
              </div>

              {/* Route Information */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Route Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-sun-line mr-2 text-yellow-500"></i>
                      Best Time to Visit
                    </h4>
                    <p className="text-sm text-gray-600">{details.bestTime}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-road-line mr-2 text-blue-500"></i>
                      Terrain Type
                    </h4>
                    <p className="text-sm text-gray-600">{details.terrain}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-wheelchair-line mr-2 text-green-500"></i>
                      Accessibility
                    </h4>
                    <p className="text-sm text-gray-600">{details.accessibility}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-car-line mr-2 text-purple-500"></i>
                      Parking
                    </h4>
                    <p className="text-sm text-gray-600">{details.parking}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <i className="ri-service-line mr-2 text-orange-500"></i>
                      Facilities
                    </h4>
                    <p className="text-sm text-gray-600">{details.facilities}</p>
                  </div>
                </div>
              </div>

              {/* Suitable For */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfect For</h3>
                <div className="space-y-2">
                  {suitableGroups.map((group, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <i className="ri-check-line text-emerald-600 text-sm"></i>
                      <span className="text-sm text-gray-700">{group}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips & Recommendations */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-lightbulb-line mr-2 text-amber-500"></i>
                  Helpful Tips
                </h3>
                <ul className="space-y-2">
                  {details.tips?.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <i className="ri-information-line text-amber-600 text-sm mt-0.5 flex-shrink-0"></i>
                      <span className="text-sm text-amber-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Seasonal Information */}
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="ri-calendar-line mr-2 text-blue-500"></i>
                  Seasonal Notes
                </h3>
                <p className="text-sm text-blue-700">{details.seasonalNotes}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
