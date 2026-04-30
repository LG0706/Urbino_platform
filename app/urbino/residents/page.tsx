
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import InteractiveMap from '@/components/InteractiveMap';
import { mapMarkers } from '@/lib/mapData';
import Link from 'next/link';

export default function ResidentsPage() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [enabledLayers, setEnabledLayers] = useState<string[]>(['stories']);
  const [enabledSublayers, setEnabledSublayers] = useState<string[]>(['resident-stories', 'cultural-traditions']);

  // 过滤出社区故事相关的标记点
  const communityStoryMarkers = mapMarkers.filter(marker => marker.category === 'Community Stories');

  const residentStories = [
    {
      id: 'marias-story',
      title: 'Maria\'s Traditional Bakery: Four Generations of Bread Making',
      author: 'Maria Rossi',
      excerpt: 'The aroma of fresh bread has filled our family bakery for over 80 years. Here\'s how we keep traditions alive while embracing the future.',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20bakery%20interior%20with%20stone%20ovens%20fresh%20bread%20displays%20warm%20lighting%20elderly%20woman%20baker%20in%20apron%20authentic%20artisanal%20atmosphere&width=300&height=200&seq=story1&orientation=landscape',
      date: '2024-03-10',
      markerId: 'marias-story'
    },
    {
      id: 'giuseppe-restoration',
      title: 'Restoring Our Medieval Home: A Labor of Love',
      author: 'Giuseppe Bianchi',
      excerpt: 'When we bought our 14th-century house, it was nearly falling down. Two years later, it\'s a showcase of traditional craftsmanship.',
      image: 'https://readdy.ai/api/search-image?query=Medieval%20stone%20house%20restoration%20project%20traditional%20Italian%20architecture%20craftsmen%20working%20ancient%20walls%20authentic%20materials%20renovation%20in%20progress&width=300&height=200&seq=story2&orientation=landscape',
      date: '2024-03-05',
      markerId: 'giuseppe-restoration'
    },
    {
      id: 'palio-tradition',
      title: 'Annual Palio Festival',
      author: 'Festival Committee',
      excerpt: 'Experience the centuries-old tradition of the Palio, where different neighborhoods compete in historic games and celebrations.',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20festival%20with%20people%20in%20medieval%20costumes%20historic%20competition%20town%20square%20celebration%20colorful%20banners%20community%20gathering&width=300&height=200&seq=story3&orientation=landscape',
      date: '2024-02-28',
      markerId: 'palio-tradition'
    },
    {
      id: 'renaissance-workshops',
      title: 'Renaissance Art Workshops',
      author: 'Elena Marchetti',
      excerpt: 'Local artisans continue Renaissance artistic traditions through hands-on workshops teaching traditional techniques and crafts.',
      image: 'https://readdy.ai/api/search-image?query=Renaissance%20art%20workshop%20with%20artisans%20teaching%20traditional%20techniques%20pottery%20and%20painting%20authentic%20studio%20atmosphere%20cultural%20preservation&width=300&height=200&seq=story4&orientation=landscape',
      date: '2024-02-20',
      markerId: 'renaissance-workshops'
    }
  ];

  const handleMarkerClick = (markerId: string) => {
    setSelectedStoryId(markerId);
    // 滚动到对应的故事卡片
    const storyElement = document.getElementById(`story-${markerId}`);
    if (storyElement) {
      storyElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleLayerToggle = (layers: string[], sublayers: string[]) => {
    setEnabledLayers(layers);
    setEnabledSublayers(sublayers);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section with Background */}
        <section className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=Italian%20historic%20city%20residents%20daily%20life%20scene%20with%20people%20walking%20in%20Renaissance%20streets%20traditional%20buildings%20local%20community%20atmosphere%20warm%20golden%20hour%20lighting%20authentic%20lifestyle&width=1920&height=600&seq=residents-hero&orientation=landscape)'
          }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Residents' Life</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Tools and resources for Urbino residents. Access local services, check zone regulations, 
              register your business, and connect with your community.
            </p>
          </div>
        </section>

        {/* Quick Services Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Quick Services</h2>
            <p className="text-gray-600 text-center mb-12">Essential services for daily life in Urbino</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-government-line text-blue-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Municipal Services</h3>
                <p className="text-gray-600 text-sm mb-4">Access city hall services, permits, and official documents online</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Access Portal →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-recycle-line text-green-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Waste Collection</h3>
                <p className="text-gray-600 text-sm mb-4">Check collection schedules and recycling guidelines</p>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  View Schedule →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-graduation-cap-line text-purple-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Student Services</h3>
                <p className="text-gray-600 text-sm mb-4">Housing assistance, student ID services, and campus resources</p>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Learn More →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-hospital-line text-red-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Healthcare</h3>
                <p className="text-gray-600 text-sm mb-4">Local healthcare services, emergency contacts, and medical centers</p>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Find Services →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-bus-line text-orange-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Public Transport</h3>
                <p className="text-gray-600 text-sm mb-4">Bus schedules, routes, and transportation planning</p>
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  View Routes →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-calendar-event-line text-teal-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Community Events</h3>
                <p className="text-gray-600 text-sm mb-4">Local festivals, cultural events, and community gatherings</p>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  See Events →
                </button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-tools-line text-indigo-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Utilities</h3>
                <p className="text-gray-600 text-sm mb-4">Water, electricity, gas services and emergency reporting</p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Manage Services →
                </button>
              </div>

              <Link href="/urbino/residents/business" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer block">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-store-line text-pink-600 text-xl"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Local Business Owner</h3>
                <p className="text-gray-600 text-sm mb-4">Business registration, permits, and local entrepreneur resources</p>
                <span className="text-pink-600 hover:text-pink-700 font-medium text-sm cursor-pointer whitespace-nowrap">
                  Get Started →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Stories Interactive Map Section - 采用与Visitors Guide相同的布局 */}
        <section className="h-screen flex">
          {/* 左侧地图 */}
          <div className="flex-1 relative">
            <InteractiveMap
              markers={communityStoryMarkers}
              enabledLayers={enabledLayers}
              enabledSublayers={enabledSublayers}
              onMarkerClick={handleMarkerClick}
            />
            
            {/* 地图筛选器 */}
            <div className="absolute top-4 left-4 z-40 bg-white rounded-lg shadow-lg w-80">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Community Stories Filter</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <i className="ri-chat-3-fill text-blue-600 text-lg"></i>
                        <span className="text-sm font-medium text-gray-900">Community Stories</span>
                      </div>
                      <button
                        onClick={() => {
                          const newLayers = enabledLayers.includes('stories') 
                            ? enabledLayers.filter(l => l !== 'stories')
                            : [...enabledLayers, 'stories'];
                          handleLayerToggle(newLayers, enabledSublayers);
                        }}
                        className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${
                          enabledLayers.includes('stories') ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${
                            enabledLayers.includes('stories') ? 'translate-x-5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {enabledLayers.includes('stories') && (
                      <div className="space-y-1 ml-6">
                        {[
                          { id: 'resident-stories', name: 'Resident Stories' },
                          { id: 'cultural-traditions', name: 'Cultural Traditions' }
                        ].map((sublayer) => (
                          <label key={sublayer.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={enabledSublayers.includes(sublayer.id)}
                              onChange={() => {
                                const newSublayers = enabledSublayers.includes(sublayer.id)
                                  ? enabledSublayers.filter(s => s !== sublayer.id)
                                  : [...enabledSublayers, sublayer.id];
                                handleLayerToggle(enabledLayers, newSublayers);
                              }}
                              className="w-3 h-3 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <span className="text-xs text-gray-700">{sublayer.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧故事列表 - 与左侧地图相同长度 */}
          <div className="w-[480px] bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Community Stories</h2>
              <p className="text-sm text-gray-600">Click on map markers or list items to explore resident stories</p>
              <div className="mt-3 text-sm text-gray-500">
                Showing {residentStories.length} featured stories
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {residentStories.map((story) => (
                <div
                  key={story.id}
                  id={`story-${story.markerId}`}
                  className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedStoryId === story.markerId ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedStoryId(story.markerId)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-20 h-20 rounded-lg object-cover object-top flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-2">
                        By {story.author} • {story.date}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-blue-600">
                          Community Story
                        </span>
                        <Link
                          href={`/urbino/sites/${story.markerId}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Read Full Story
                          <i className="ri-arrow-right-line ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 底部额外信息 */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Story</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  Have a story about life in Urbino? We'd love to hear from you! Share your experiences 
                  of living in this historic city.
                </p>
                <p>
                  From family traditions to modern innovations, every resident has a unique perspective 
                  on what makes Urbino special.
                </p>
              </div>
              
              <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                Submit Your Story
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
