
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import InteractiveMap from '@/components/InteractiveMap';
import { eventMarkers, EventMarker } from '@/lib/eventsData';
import Link from 'next/link';

export default function NewsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [enabledCategories, setEnabledCategories] = useState<string[]>([
    'Cultural Events', 
    'Community Events', 
    'Educational Events', 
    'Sports & Recreation', 
    'Special Events'
  ]);

  const handleEventClick = (eventId: string) => {
    setSelectedEvent(eventId);
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCategoryToggle = (category: string) => {
    setEnabledCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredEvents = eventMarkers.filter(event => 
    enabledCategories.includes(event.category)
  );

  // 转换事件数据为地图标记格式
  const mapMarkers = filteredEvents.map(event => ({
    id: event.id,
    title: event.title,
    category: event.category,
    subcategory: event.subcategory,
    description: event.description,
    image: event.image,
    position: event.position,
    color: event.color
  }));

  const newsItems = [
    {
      id: '1',
      title: 'New Archaeological Discovery in Palazzo Ducale',
      excerpt: 'Recent excavations have revealed fascinating Renaissance-era artifacts that provide new insights into daily life during the height of Urbino\'s cultural prominence.',
      image: 'https://readdy.ai/api/search-image?query=Archaeological%20excavation%20in%20Renaissance%20palace%20courtyard%2C%20ancient%20artifacts%20discovery%2C%20historians%20and%20archaeologists%20working%2C%20historic%20Italian%20architecture%2C%20professional%20archaeological%20dig%20site&width=400&height=250&seq=news-arch1&orientation=landscape',
      date: 'March 18, 2024',
      category: 'Heritage'
    },
    {
      id: '2',
      title: 'University Students Launch Sustainability Initiative',
      excerpt: 'Local students partner with the municipality to implement eco-friendly practices across campus and promote environmental awareness in the community.',
      image: 'https://readdy.ai/api/search-image?query=University%20students%20working%20on%20sustainability%20project%2C%20solar%20panels%20and%20recycling%2C%20environmental%20initiative%2C%20young%20people%20collaborating%2C%20green%20technology%20in%20historic%20Italian%20town&width=400&height=250&seq=news-sustain1&orientation=landscape',
      date: 'March 16, 2024',
      category: 'Community'
    },
    {
      id: '3',
      title: 'Historic City Walls Restoration Complete',
      excerpt: 'After three years of careful restoration work, the medieval fortifications surrounding Urbino have been fully restored to their former glory.',
      image: 'https://readdy.ai/api/search-image?query=Restored%20medieval%20city%20walls%20in%20Italian%20town%2C%20ancient%20stone%20fortifications%2C%20conservation%20work%20completed%2C%20historic%20preservation%2C%20beautiful%20stonework%20and%20architecture&width=400&height=250&seq=news-walls1&orientation=landscape',
      date: 'March 14, 2024',
      category: 'Heritage'
    },
    {
      id: '4',
      title: 'Local Artisans Showcase Traditional Crafts',
      excerpt: 'Experience the living heritage of Urbino through demonstrations of traditional pottery, weaving, and woodworking by master craftspeople.',
      image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20artisans%20working%20on%20pottery%20and%20crafts%2C%20master%20craftspeople%20demonstrating%20skills%2C%20workshop%20setting%2C%20authentic%20handmade%20products%2C%20cultural%20heritage%20preservation&width=400&height=250&seq=news-crafts1&orientation=landscape',
      date: 'March 12, 2024',
      category: 'Culture'
    },
    {
      id: '5',
      title: 'Emergency Response Training Program Success',
      excerpt: 'Over 200 residents completed comprehensive emergency preparedness training, strengthening our community\'s resilience and safety protocols.',
      image: 'https://readdy.ai/api/search-image?query=Emergency%20response%20training%20with%20community%20members%2C%20first%20aid%20demonstration%2C%20safety%20equipment%2C%20professional%20instructors%20teaching%2C%20community%20preparedness%20program&width=400&height=250&seq=news-emergency1&orientation=landscape',
      date: 'March 10, 2024',
      category: 'Safety'
    },
    {
      id: '6',
      title: 'Tourism Board Launches Digital Heritage Trail',
      excerpt: 'A new mobile app guides visitors through Urbino\'s historic sites with augmented reality features and interactive storytelling.',
      image: 'https://readdy.ai/api/search-image?query=Tourists%20using%20mobile%20app%20for%20heritage%20trail%2C%20digital%20technology%20in%20historic%20setting%2C%20augmented%20reality%20experience%2C%20visitors%20exploring%20with%20smartphones%2C%20modern%20tourism%20technology&width=400&height=250&seq=news-digital1&orientation=landscape',
      date: 'March 8, 2024',
      category: 'Tourism'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Renaissance Music Concert Series',
      date: 'April 15-17, 2024',
      time: '8:00 PM',
      location: 'Palazzo Ducale Courtyard',
      description: 'Three nights of authentic Renaissance music performed by renowned period instrument ensembles.',
      image: 'https://readdy.ai/api/search-image?query=Renaissance%20music%20concert%20in%20historic%20Italian%20palace%20courtyard%2C%20period%20instruments%20performance%2C%20elegant%20evening%20event%2C%20classical%20musicians%20in%20period%20costumes%2C%20atmospheric%20lighting&width=400&height=200&seq=event-music1&orientation=landscape',
      category: 'Culture'
    },
    {
      id: '2',
      title: 'Artisan Market & Food Festival',
      date: 'April 20-21, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'Piazza della Repubblica',
      description: 'Local artisans and food producers showcase traditional crafts and regional specialties.',
      image: 'https://readdy.ai/api/search-image?query=Italian%20artisan%20market%20in%20historic%20town%20square%2C%20local%20crafts%20and%20food%20stalls%2C%20traditional%20products%2C%20bustling%20market%20atmosphere%2C%20authentic%20local%20culture&width=400&height=200&seq=event-market1&orientation=landscape',
      category: 'Community'
    },
    {
      id: '3',
      title: 'Heritage Photography Workshop',
      date: 'April 25, 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Various Historic Sites',
      description: 'Professional photographers guide participants in capturing Urbino\'s architectural beauty.',
      image: 'https://readdy.ai/api/search-image?query=Photography%20workshop%20in%20historic%20Italian%20city%2C%20professional%20photographers%20teaching%2C%20participants%20with%20cameras%2C%20Renaissance%20architecture%20backdrop%2C%20educational%20cultural%20activity&width=400&height=200&seq=event-photo1&orientation=landscape',
      category: 'Education'
    },
    {
      id: '4',
      title: 'Community Garden Opening Ceremony',
      date: 'May 1, 2024',
      time: '11:00 AM',
      location: 'San Bernardino District',
      description: 'Celebrate the opening of our new community garden with activities for all ages.',
      image: 'https://readdy.ai/api/search-image?query=Community%20garden%20opening%20ceremony%2C%20families%20and%20residents%20celebrating%2C%20organic%20vegetables%20and%20flowers%2C%20ribbon%20cutting%20ceremony%2C%20community%20collaboration%20in%20Italian%20setting&width=400&height=200&seq=event-garden1&orientation=landscape',
      category: 'Community'
    },
    {
      id: '5',
      title: 'Student Art Exhibition',
      date: 'May 10-24, 2024',
      time: '10:00 AM - 7:00 PM',
      location: 'University Gallery',
      description: 'Annual showcase of contemporary artworks by University of Urbino students.',
      image: 'https://readdy.ai/api/search-image?query=University%20art%20gallery%20exhibition%2C%20student%20artworks%20display%2C%20contemporary%20art%20in%20historic%20setting%2C%20visitors%20viewing%20paintings%20and%20sculptures%2C%20academic%20cultural%20event&width=400&height=200&seq=event-art1&orientation=landscape',
      category: 'Education'
    },
    {
      id: '6',
      title: 'Emergency Preparedness Fair',
      date: 'May 15, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'Municipal Building',
      description: 'Learn about emergency procedures, meet first responders, and get safety resources.',
      image: 'https://readdy.ai/api/search-image?query=Emergency%20preparedness%20community%20fair%2C%20safety%20demonstration%20booths%2C%20first%20responders%20with%20equipment%2C%20families%20learning%20about%20emergency%20procedures%2C%20community%20safety%20education&width=400&height=200&seq=event-safety1&orientation=landscape',
      category: 'Safety'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Vibrant%20cultural%20festival%20in%20historic%20Italian%20town%20square%2C%20people%20celebrating%20with%20Renaissance%20architecture%20backdrop%2C%20colorful%20banners%20and%20decorations%2C%20community%20gathering%20atmosphere%2C%20golden%20hour%20lighting%20creating%20warm%20glow&width=1920&height=600&seq=news-hero1&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Events & News
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed">
              Stay connected with the heartbeat of Urbino - from cultural celebrations 
              to community initiatives that shape our vibrant city life.
            </p>
            <Link href="#events-map" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-medium transition-colors cursor-pointer whitespace-nowrap inline-block">
              Explore Events Map
            </Link>
          </div>
        </div>
      </section>

      <main>
        {/* Interactive Events Map Section */}
        <section id="events-map" className="h-screen flex">
          {/* Left Side - Interactive Map */}
          <div className="flex-1 relative">
            <InteractiveMap 
              markers={mapMarkers}
              enabledLayers={['events']}
              enabledSublayers={['festivals', 'concerts', 'exhibitions', 'markets', 'workshops', 'tours', 'sports', 'seasonal']}
              selectedBasemap="streets"
              onMarkerClick={handleEventClick}
            />
            
            {/* Map Filter Sidebar */}
            <div className="absolute top-4 left-4 z-40 bg-white rounded-lg shadow-lg w-80">
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Events Categories</h3>
                <div className="space-y-3">
                  {[ 
                    { id: 'Cultural Events', name: 'Cultural Events', icon: 'ri-music-line', color: '#7c3aed' },
                    { id: 'Community Events', name: 'Community Events', icon: 'ri-group-line', color: '#2563eb' },
                    { id: 'Educational Events', name: 'Educational Events', icon: 'ri-book-line', color: '#059669' },
                    { id: 'Sports & Recreation', name: 'Sports & Recreation', icon: 'ri-run-line', color: '#ea580c' },
                    { id: 'Special Events', name: 'Special Events', icon: 'ri-star-line', color: '#dc2626' }
                  ].map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <i className={`${category.icon} text-lg`} style={{ color: category.color }}></i>
                          <span className="text-sm font-medium text-gray-900">{category.name}</span>
                        </div>
                        <button
                          onClick={() => handleCategoryToggle(category.id)}
                          className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${ 
                            enabledCategories.includes(category.id) ? 'bg-emerald-500' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 bg-white rounded-full shadow transition-transform absolute top-0.5 ${ 
                              enabledCategories.includes(category.id) ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Showing Events</div>
                  <div className="text-sm font-medium text-gray-900">
                    {filteredEvents.length} of {eventMarkers.length} events
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Events List */}
          <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-sm text-gray-600">Click on map markers or list items to explore</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <div 
                  key={event.id}
                  id={`event-${event.id}`}
                  className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${ 
                    selectedEvent === event.id ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''
                  }`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-20 h-20 rounded-lg object-cover object-top flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: event.color }}
                        >
                          {event.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${ 
                          event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-1 text-xs text-gray-500 mb-2">
                        <div className="flex items-center">
                          <i className="ri-calendar-line mr-1"></i>
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <i className="ri-time-line mr-1"></i>
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <i className="ri-map-pin-line mr-1"></i>
                          {event.location}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <Link
                        href={`/events/${event.id}`}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors whitespace-nowrap"
                      >
                        View Details
                        <i className="ri-arrow-right-line ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <i className="ri-calendar-line text-3xl mb-2"></i>
                  <p>No events match your current filter selection.</p>
                  <p className="text-sm mt-1">Try enabling more categories.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h2>
                <p className="text-gray-600">Stay informed about what's happening in Urbino</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm pr-8">
                  <option value="all">All Categories</option>
                  <option value="heritage">Heritage</option>
                  <option value="community">Community</option>
                  <option value="culture">Culture</option>
                  <option value="safety">Safety</option>
                  <option value="tourism">Tourism</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems.map((item) => (
                <NewsCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* Community Announcements Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Community Announcements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                    <i className="ri-notification-3-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Municipal Office Hours</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      Starting April 1st, municipal offices will extend hours on Thursdays until 7:00 PM 
                      to better serve working residents and students.
                    </p>
                    <Link href="/residents" className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center cursor-pointer">
                      More details
                      <i className="ri-arrow-right-line ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <i className="ri-recycle-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Recycling Program Update</h3>
                    <p className="text-gray-700 text-sm mb-3">
                      New organic waste collection starts Monday. Pick up your green bins at 
                      the municipal office and join our sustainability initiative.
                    </p>
                    <Link href="/residents" className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center cursor-pointer">
                      Get your bin
                      <i className="ri-arrow-right-line ml-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl text-gray-300 mb-8">
              Subscribe to our newsletter and never miss important community updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
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
