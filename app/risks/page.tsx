
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import InteractiveMap from '@/components/InteractiveMap';
import MapSidebar from '@/components/MapSidebar';
import Link from 'next/link';

interface RiskArea {
  id: string;
  name: string;
  type: 'flood' | 'landslide' | 'emergency' | 'shelter' | 'medical';
  description: string;
  image: string;
  position: { lat: number; lng: number };
  severity: 'Low' | 'Medium' | 'High';
  lastUpdated: string;
  capacity?: number;
  contact?: string;
}

interface EvacuationRoute {
  id: string;
  name: string;
  description: string;
  waypoints: { lat: number; lng: number; name: string; description: string }[];
  color: string;
  type: 'primary' | 'secondary' | 'emergency';
  distance: string;
  estimatedTime: string;
}

const riskAreas: RiskArea[] = [
  {
    id: 'flood-zone-1',
    name: 'Metauro River Flood Zone',
    type: 'flood',
    description: 'Potential flood risk area during heavy rainfall. Emergency evacuation routes and safety procedures are established for this zone.',
    image: 'https://readdy.ai/api/search-image?query=Flood%20risk%20area%20with%20river%20valley%2C%20emergency%20warning%20signs%2C%20Italian%20countryside%20landscape%2C%20risk%20management%20infrastructure%2C%20monitoring%20equipment%2C%20safety%20barriers&width=320&height=192&seq=flood1&orientation=landscape',
    position: { lat: 43.7170, lng: 12.6260 },
    severity: 'Medium',
    lastUpdated: 'March 15, 2024'
  },
  {
    id: 'landslide-zone-1',
    name: 'Hill Stability Monitoring Area',
    type: 'landslide',
    description: 'Geological monitoring station for hillside stability control. Regular assessments ensure early warning for potential landslide risks.',
    image: 'https://readdy.ai/api/search-image?query=Hillside%20with%20geological%20monitoring%20equipment%2C%20landslide%20prevention%20systems%2C%20Italian%20hills%2C%20safety%20monitoring%20station%2C%20scientific%20instruments%2C%20slope%20stabilization&width=320&height=192&seq=landslide1&orientation=landscape',
    position: { lat: 43.7340, lng: 12.6200 },
    severity: 'Low',
    lastUpdated: 'March 12, 2024'
  },
  {
    id: 'emergency-station-1',
    name: 'Emergency Services Station',
    type: 'emergency',
    description: 'Emergency services station providing rapid response capabilities for the local area. Equipped with rescue teams and safety equipment.',
    image: 'https://readdy.ai/api/search-image?query=Emergency%20services%20station%20with%20rescue%20vehicles%2C%20safety%20equipment%2C%20professional%20responders%2C%20emergency%20facility%2C%20fire%20trucks%2C%20ambulances%2C%20modern%20building&width=320&height=192&seq=emergency1&orientation=landscape',
    position: { lat: 43.7290, lng: 12.6510 },
    severity: 'High',
    lastUpdated: 'March 18, 2024'
  },
  {
    id: 'shelter-1',
    name: 'Public Evacuation Shelter',
    type: 'shelter',
    description: 'Designated public shelter facility equipped with emergency supplies and accommodation for evacuees during disasters.',
    image: 'https://readdy.ai/api/search-image?query=Emergency%20evacuation%20shelter%20facility%2C%20temporary%20accommodation%2C%20disaster%20relief%20supplies%2C%20community%20center%20setup%2C%20safety%20equipment%2C%20emergency%20provisions&width=320&height=192&seq=shelter1&orientation=landscape',
    position: { lat: 43.7250, lng: 12.6400 },
    severity: 'High',
    lastUpdated: 'March 10, 2024',
    capacity: 500,
    contact: '+39 0722 2615'
  },
  {
    id: 'medical-center-1',
    name: 'Emergency Medical Center',
    type: 'medical',
    description: 'Medical facility with emergency response capabilities, equipped with ambulances and medical staff for disaster situations.',
    image: 'https://readdy.ai/api/search-image?query=Emergency%20medical%20center%20with%20ambulances%2C%20medical%20equipment%2C%20healthcare%20facility%2C%20emergency%20response%20team%2C%20professional%20medical%20staff%2C%20modern%20hospital%20building&width=320&height=192&seq=medical1&orientation=landscape',
    position: { lat: 43.7280, lng: 12.6350 },
    severity: 'High',
    lastUpdated: 'March 20, 2024',
    capacity: 150,
    contact: '+39 0722 301234'
  },
  // 新增Emergency Shelters
  {
    id: 'shelter-2',
    name: 'University Sports Center Shelter',
    type: 'shelter',
    description: 'Large capacity emergency shelter located at the University of Urbino sports complex. Equipped with basic amenities and medical support.',
    image: 'https://readdy.ai/api/search-image?query=University%20sports%20center%20converted%20to%20emergency%20shelter%2C%20large%20gymnasium%20space%2C%20emergency%20cots%2C%20disaster%20relief%20setup%2C%20institutional%20building%2C%20safety%20equipment&width=320&height=192&seq=shelter2&orientation=landscape',
    position: { lat: 43.7220, lng: 12.6480 },
    severity: 'High',
    lastUpdated: 'March 22, 2024',
    capacity: 800,
    contact: '+39 0722 305678'
  },
  {
    id: 'shelter-3',
    name: 'Community Center Safe Zone',
    type: 'shelter',
    description: 'Multi-purpose community center serving as emergency shelter with food distribution and temporary housing capabilities.',
    image: 'https://readdy.ai/api/search-image?query=Community%20center%20emergency%20shelter%20with%20food%20distribution%20area%2C%20temporary%20housing%20setup%2C%20volunteer%20coordination%2C%20emergency%20supplies%2C%20safe%20zone%20signage&width=320&height=192&seq=shelter3&orientation=landscape',
    position: { lat: 43.7320, lng: 12.6300 },
    severity: 'High',
    lastUpdated: 'March 19, 2024',
    capacity: 300,
    contact: '+39 0722 267890'
  },
  {
    id: 'shelter-4',
    name: 'School Emergency Assembly Point',
    type: 'shelter',
    description: 'Primary school facility designated as emergency assembly point and temporary shelter for families with children.',
    image: 'https://readdy.ai/api/search-image?query=School%20building%20emergency%20assembly%20point%2C%20playground%20area%20converted%20to%20shelter%2C%20family-friendly%20emergency%20facility%2C%20child-safe%20environment%2C%20educational%20building&width=320&height=192&seq=shelter4&orientation=landscape',
    position: { lat: 43.7180, lng: 12.6380 },
    severity: 'High',
    lastUpdated: 'March 16, 2024',
    capacity: 400,
    contact: '+39 0722 234567'
  },
  {
    id: 'medical-center-2',
    name: 'Regional Emergency Clinic',
    type: 'medical',
    description: 'Specialized medical facility for emergency treatment and triage during disasters. Equipped with advanced medical equipment and trauma care.',
    image: 'https://readdy.ai/api/search-image?query=Regional%20emergency%20medical%20clinic%2C%20modern%20healthcare%20facility%2C%20emergency%20vehicles%2C%20medical%20equipment%2C%20trauma%20care%20center%2C%20professional%20medical%20building&width=320&height=192&seq=medical2&orientation=landscape',
    position: { lat: 43.7310, lng: 12.6420 },
    severity: 'High',
    lastUpdated: 'March 21, 2024',
    capacity: 200,
    contact: '+39 0722 345678'
  },
  {
    id: 'medical-center-3',
    name: 'Mobile Medical Unit Base',
    type: 'medical',
    description: 'Base station for mobile medical units and emergency medical services. Provides rapid deployment of medical assistance to affected areas.',
    image: 'https://readdy.ai/api/search-image?query=Mobile%20medical%20unit%20base%20station%2C%20emergency%20ambulances%2C%20portable%20medical%20equipment%2C%20rapid%20response%20vehicles%2C%20emergency%20medical%20services%20headquarters&width=320&height=192&seq=medical3&orientation=landscape',
    position: { lat: 43.7200, lng: 12.6450 },
    severity: 'High',
    lastUpdated: 'March 17, 2024',
    capacity: 100,
    contact: '+39 0722 456789'
  }
];

// 疏散路线数据
const evacuationRoutes: EvacuationRoute[] = [
  {
    id: 'evacuation-route-1',
    name: 'Main Evacuation Route - North Corridor',
    description: 'Primary evacuation route leading from city center to northern safe zones and emergency shelters.',
    waypoints: [
      { lat: 43.7260, lng: 12.6365, name: 'City Center Start Point', description: 'Palazzo Ducale area - main starting point' },
      { lat: 43.7280, lng: 12.6350, name: 'Medical Center Checkpoint', description: 'Emergency medical support available' },
      { lat: 43.7300, lng: 12.6330, name: 'Community Center Waypoint', description: 'Rest area and information point' },
      { lat: 43.7320, lng: 12.6300, name: 'Community Center Safe Zone', description: 'Final shelter destination' }
    ],
    color: '#dc2626',
    type: 'primary',
    distance: '2.1 km',
    estimatedTime: '25-30 minutes'
  }
];

export default function RisksPage() {
  const [selectedRiskArea, setSelectedRiskArea] = useState<string | null>(null);
  const [enabledLayers, setEnabledLayers] = useState<string[]>(['risks', 'shelters', 'evacuation-routes']);
  const [enabledSublayers, setEnabledSublayers] = useState<string[]>(['flood-zones', 'landslide-areas', 'emergency-services', 'evacuation-shelters', 'medical-facilities', 'primary-routes']);

  const riskMarkers = riskAreas.map(area => ({
    id: area.id,
    title: area.name,
    category: area.type === 'flood' || area.type === 'landslide' ? 'Risk Areas' : 'Emergency Shelters',
    subcategory: area.type === 'flood' ? 'flood-zones' :
                area.type === 'landslide' ? 'landslide-areas' :
                area.type === 'shelter' ? 'evacuation-shelters' :
                area.type === 'medical' ? 'medical-facilities' : 'emergency-services',
    description: area.description,
    image: area.image,
    position: area.position,
    color: area.type === 'flood' || area.type === 'landslide' ? '#dc2626' : '#059669'
  }));

  const handleLayerToggle = (layers: string[], sublayers: string[]) => {
    setEnabledLayers(layers);
    setEnabledSublayers(sublayers);
  };

  const handleRiskAreaClick = (areaId: string) => {
    setSelectedRiskArea(areaId);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flood': return 'ri-flood-line';
      case 'landslide': return 'ri-mountain-line';
      case 'emergency': return 'ri-alarm-warning-line';
      case 'shelter': return 'ri-home-heart-line';
      case 'medical': return 'ri-hospital-line';
      default: return 'ri-alert-line';
    }
  };

  const visibleRiskAreas = riskAreas.filter(area => {
    const categoryEnabled = (area.type === 'flood' || area.type === 'landslide') ? 
      enabledLayers.includes('risks') : enabledLayers.includes('shelters');
    
    const subcategoryEnabled = area.type === 'flood' ? enabledSublayers.includes('flood-zones') :
                              area.type === 'landslide' ? enabledSublayers.includes('landslide-areas') :
                              area.type === 'shelter' ? enabledSublayers.includes('evacuation-shelters') :
                              area.type === 'medical' ? enabledSublayers.includes('medical-facilities') :
                              enabledSublayers.includes('emergency-services');
    
    return categoryEnabled && subcategoryEnabled;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Alert Registration */}
      <section className="relative h-96 bg-gradient-to-r from-red-600 to-orange-600 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Emergency%20preparedness%20and%20disaster%20management%20scene%20with%20warning%20systems%2C%20safety%20equipment%2C%20monitoring%20stations%2C%20Italian%20landscape%2C%20professional%20emergency%20response%2C%20community%20safety%20infrastructure&width=1920&height=600&seq=risks-hero&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Risks & Actions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Register for our disaster alert system and be the first to receive notifications about hazards and evacuation information!
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-colors cursor-pointer whitespace-nowrap shadow-lg">
              Register My Information
            </button>
          </div>
        </div>
      </section>

      <main className="pb-16">
        {/* Risk Map Section - Full Screen Height */}
        <section className="h-screen relative">
          <div className="absolute inset-0">
            <InteractiveMap 
              markers={riskMarkers}
              routes={evacuationRoutes}
              enabledLayers={enabledLayers}
              enabledSublayers={enabledSublayers}
              onMarkerClick={handleRiskAreaClick}
            />

            {/* Risk Map Sidebar with Filters */}
            <RiskMapSidebar onLayerToggle={handleLayerToggle} />

            {/* Risk Areas List Panel */}
            <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col z-40">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Risk Areas & Facilities</h3>
                <p className="text-sm text-gray-600 mt-1">Click markers to view details</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {visibleRiskAreas.map((area) => (
                  <div 
                    key={area.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedRiskArea === area.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleRiskAreaClick(area.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${getTypeIcon(area.type)} text-red-600`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 mb-1 text-sm">{area.name}</h4>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{area.description}</p>
                        {area.capacity && (
                          <p className="text-xs text-blue-600 mb-1">Capacity: {area.capacity} people</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(area.severity)}`}>
                            {area.type === 'shelter' || area.type === 'medical' ? 'Available' : `${area.severity} Risk`}
                          </span>
                          <Link href={`/sites/${area.id}`} className="text-emerald-600 hover:text-emerald-700 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Risk Preparedness Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Risk Preparedness</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Essential information and resources to help you prepare for potential emergencies and natural disasters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-shield-check-line text-blue-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Kit</h3>
                <p className="text-gray-600 mb-4">
                  Prepare an emergency kit with essential supplies including water, non-perishable food, flashlight, radio, and first aid supplies.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Water (1 gallon per person per day)</li>
                  <li>• Food for 3+ days</li>
                  <li>• Battery-powered radio</li>
                  <li>• Flashlight and extra batteries</li>
                  <li>• First aid kit and medications</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-map-pin-line text-green-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Evacuation Plan</h3>
                <p className="text-gray-600 mb-4">
                  Know your evacuation routes and meeting points. Practice your evacuation plan with all family members regularly.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Identify multiple escape routes</li>
                  <li>• Designate meeting locations</li>
                  <li>• Keep important documents ready</li>
                  <li>• Plan for pets and livestock</li>
                  <li>• Practice evacuation drills</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-notification-line text-orange-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Alert System</h3>
                <p className="text-gray-600 mb-4">
                  Stay informed through official alert systems and emergency communications. Register for local emergency notifications.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Emergency alert registration</li>
                  <li>• Local radio frequencies</li>
                  <li>• Official social media channels</li>
                  <li>• Community warning systems</li>
                  <li>• Mobile emergency apps</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-ancient-gate-line text-purple-600 text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Heritage Protection</h3>
                <p className="text-gray-600 mb-4">
                  Special protocols for protecting Urbino's UNESCO World Heritage sites and cultural artifacts during emergencies.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cultural artifact emergency protocols</li>
                  <li>• Heritage site evacuation procedures</li>
                  <li>• Art collection protection measures</li>
                  <li>• Historical building safety plans</li>
                  <li>• Cultural preservation priorities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Operations Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Emergency Operations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Coordinated emergency response system and operational procedures for effective disaster management and community safety.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Emergency Contacts */}
              <div className="bg-red-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-phone-line text-red-600 mr-3"></i>
                  Emergency Contacts
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">General Emergency</h4>
                        <p className="text-sm text-gray-600">Police, Fire, Medical</p>
                      </div>
                      <span className="text-2xl font-bold text-red-600">112</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Local Emergency Center</h4>
                        <p className="text-sm text-gray-600">Urbino Emergency Operations</p>
                      </div>
                      <span className="text-lg font-bold text-red-600">+39 0722 2613</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">Regional Civil Protection</h4>
                        <p className="text-sm text-gray-600">Marche Region Emergency</p>
                      </div>
                      <span className="text-lg font-bold text-red-600">+39 071 8063470</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Procedures */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="ri-list-check-line text-emerald-600 mr-3"></i>
                  Response Procedures
                </h3>
                <div className="space-y-6">
                  <Link href="/risks/flood-response" className="block border-l-4 border-blue-500 pl-4 hover:bg-blue-50 p-3 rounded-r-lg transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      Flood Response
                      <i className="ri-external-link-line ml-2 text-blue-600"></i>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Move to higher ground immediately. Avoid walking or driving through flood waters. Follow evacuation orders from authorities.
                    </p>
                    <div className="text-xs text-blue-600 font-medium">Response Time: Immediate</div>
                  </Link>
                  
                  <Link href="/risks/landslide-response" className="block border-l-4 border-yellow-500 pl-4 hover:bg-yellow-50 p-3 rounded-r-lg transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      Landslide Alert
                      <i className="ri-external-link-line ml-2 text-yellow-600"></i>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Listen for unusual sounds. Evacuate if ground movement is detected. Stay away from slide areas even after the event.
                    </p>
                    <div className="text-xs text-yellow-600 font-medium">Response Time: 15-30 minutes</div>
                  </Link>
                  
                  <Link href="/risks/general-emergency" className="block border-l-4 border-green-500 pl-4 hover:bg-green-50 p-3 rounded-r-lg transition-colors cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      General Emergency
                      <i className="ri-external-link-line ml-2 text-green-600"></i>
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Call emergency services. Provide clear location and nature of emergency. Follow instructions from emergency responders.
                    </p>
                    <div className="text-xs text-green-600 font-medium">Response Time: 8-12 minutes</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </main>
    </div>
  );
}

// Risk Map Sidebar Component
function RiskMapSidebar({ onLayerToggle }: { onLayerToggle?: (layers: string[], sublayers: string[]) => void }) {
  const [isOpen, setIsOpen] = useState(true);
  const [layerGroups, setLayerGroups] = useState([
    {
      id: 'risks',
      name: 'Risk Areas',
      icon: 'ri-alert-line',
      color: 'text-red-600',
      enabled: true,
      sublayers: [
        { id: 'flood-zones', name: 'Flood Zones', visible: true },
        { id: 'landslide-areas', name: 'Landslide Areas', visible: true },
      ]
    },
    {
      id: 'shelters',
      name: 'Shelters',
      icon: 'ri-shield-check-line',
      color: 'text-green-600',
      enabled: true,
      sublayers: [
        { id: 'emergency-services', name: 'Emergency Services', visible: true },
        { id: 'evacuation-shelters', name: 'Evacuation Shelters', visible: true },
        { id: 'medical-facilities', name: 'Medical Facilities', visible: true },
      ]
    },
    {
      id: 'evacuation-routes',
      name: 'Evacuation Routes',
      icon: 'ri-route-line',
      color: 'text-purple-600',
      enabled: true,
      sublayers: [
        { id: 'primary-routes', name: 'Primary Routes', visible: true },
        { id: 'secondary-routes', name: 'Secondary Routes', visible: false },
      ]
    }
  ]);

  const getEnabledFilters = (groups: typeof layerGroups) => {
    const enabledLayers = groups.filter(group => group.enabled).map(group => group.id);
    const enabledSublayers = groups
      .filter(group => group.enabled)
      .flatMap(group => 
        group.sublayers
          .filter(sublayer => sublayer.visible)
          .map(sublayer => sublayer.id)
      );  

    return { enabledLayers, enabledSublayers };
  };

  const notifyLayerChange = (newGroups: typeof layerGroups) => {
    const { enabledLayers, enabledSublayers } = getEnabledFilters(newGroups);
    onLayerToggle?.(enabledLayers, enabledSublayers);
  };

  const toggleGroup = (groupId: string) => {
    const newGroups = layerGroups.map(group => 
      group.id === groupId 
        ? { ...group, enabled: !group.enabled }
        : group
    );  

    setLayerGroups(newGroups);
    notifyLayerChange(newGroups);
  };

  const toggleSublayer = (groupId: string, sublayerId: string) => {
    const newGroups = layerGroups.map(group =>
      group.id === groupId
        ? {
            ...group,
            sublayers: group.sublayers.map(sublayer =>
              sublayer.id === sublayerId
                ? { ...sublayer, visible: !sublayer.visible }
                : sublayer
            )
          }
        : group
    );  

    setLayerGroups(newGroups);
    notifyLayerChange(newGroups);
  };

  return (
    <div className={`absolute top-4 left-4 z-40 bg-white rounded-lg shadow-lg transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-gray-900 ${!isOpen && 'hidden'}`}>Risk Map Filters</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className={`ri-${isOpen ? 'sidebar-unfold' : 'sidebar-fold'}-line text-gray-600`}></i>
          </button>
        </div>

        {isOpen && (
          <div className="space-y-3">
            {layerGroups.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <i className={`${group.icon} ${group.color} text-lg`}></i>
                    <span className="text-sm font-medium text-gray-900">{group.name}</span>
                  </div>
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${
                      group.enabled ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${
                        group.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {group.enabled && (
                  <div className="space-y-1 ml-6">
                    {group.sublayers.map((sublayer) => (
                      <label key={sublayer.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sublayer.visible}
                          onChange={() => toggleSublayer(group.id, sublayer.id)}
                          className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                        />
                        <span className="text-xs text-gray-700">{sublayer.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Quick Filter</div>
              <div className="text-sm font-medium text-gray-900">
                Risks & Emergency Response
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
