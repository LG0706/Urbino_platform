export interface EventMarker {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  position: { lat: number; lng: number };
  color: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export const eventMarkers: EventMarker[] = [
  // Cultural Events - 紫色
  {
    id: 'renaissance-festival',
    title: 'Renaissance Festival 2024',
    category: 'Cultural Events',
    subcategory: 'festivals',
    description: 'Experience authentic Renaissance life with period performances, traditional crafts, and historic reenactments in the heart of Urbino.',
    image: 'https://readdy.ai/api/search-image?query=Renaissance%20festival%20in%20historic%20Italian%20town%20square%20with%20people%20in%20period%20costumes%2C%20traditional%20music%20and%20dance%20performances%2C%20artisans%20demonstrating%20crafts%2C%20colorful%20banners%20and%20decorations&width=320&height=192&seq=event-renaissance&orientation=landscape',
    position: { lat: 43.726149, lng: 12.636364 },
    color: '#7c3aed',
    date: 'June 15-17, 2024',
    time: '10:00 AM - 10:00 PM',
    location: 'Historic Center',
    status: 'upcoming'
  },
  {
    id: 'music-concert',
    title: 'Classical Music Concert Series',
    category: 'Cultural Events',
    subcategory: 'concerts',
    description: 'Internationally renowned chamber orchestra performs masterpieces in the stunning acoustics of Palazzo Ducale courtyard.',
    image: 'https://readdy.ai/api/search-image?query=Classical%20music%20concert%20in%20historic%20Italian%20palace%20courtyard%20with%20orchestra%20performing%2C%20elegant%20evening%20lighting%2C%20sophisticated%20audience%2C%20Renaissance%20architecture%20backdrop&width=320&height=192&seq=event-concert&orientation=landscape',
    position: { lat: 43.7280, lng: 12.6350 },
    color: '#7c3aed',
    date: 'April 20, 2024',
    time: '8:30 PM',
    location: 'Palazzo Ducale Courtyard',
    status: 'upcoming'
  },
  {
    id: 'art-exhibition',
    title: 'Contemporary Art in Renaissance Spaces',
    category: 'Cultural Events',
    subcategory: 'exhibitions',
    description: 'Modern artists create dialogue with historic spaces through innovative installations and multimedia works.',
    image: 'https://readdy.ai/api/search-image?query=Contemporary art exhibition in Renaissance palace interior, modern sculptures and installations, visitors viewing art, historic architecture with modern art integration&width=320&hide=192&seq=event-art&orientation=landscape',
    position: { lat: 43.7200, lng: 12.6420 },
    color: '#7c3aed',
    date: 'May 1-31, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'University Gallery',
    status: 'upcoming'
  },

  // Community Events - 蓝色
  {
    id: 'farmers-market',
    title: 'Weekly Farmers Market',
    category: 'Community Events',
    subcategory: 'markets',
    description: 'Fresh local produce, artisanal foods, and handmade crafts from regional producers in a vibrant community gathering.',
    image: 'https://readdy.ai/api/search-image?query=Italian%20farmers%20market%20with%20fresh%20vegetables%20and%20local%20products%2C%20vendors%20and%20customers%2C%20colorful%20stalls%2C%20community%20atmosphere%2C%20authentic%20local%20food%20culture&width=320&height=192&seq=event-market&orientation=landscape',
    position: { lat: 43.7180, lng: 12.6380 },
    color: '#2563eb',
    date: 'Every Saturday',
    time: '8:00 AM - 2:00 PM',
    location: 'Piazza San Francesco',
    status: 'ongoing'
  },
  {
    id: 'community-garden',
    title: 'Community Garden Opening',
    category: 'Community Events',
    subcategory: 'workshops',
    description: 'Join neighbors in celebrating our new shared growing space with planting activities and sustainable living demonstrations.',
    image: 'https://readdy.ai/api/search-image?query=Community%20garden%20opening%20ceremony%20with%20families%20planting%20vegetables%2C%20sustainable%20gardening%20demonstration%2C%20neighborhood%20collaboration%2C%20green%20community%20initiative&width=320&height=192&seq=event-garden&orientation=landscape',
    position: { lat: 43.7340, lng: 12.6280 },
    color: '#2563eb',
    date: 'April 22, 2024',
    time: '10:00 AM - 4:00 PM',
    location: 'San Bernardino District',
    status: 'upcoming'
  },
  {
    id: 'youth-workshop',
    title: 'Youth Digital Skills Workshop',
    category: 'Community Events',
    subcategory: 'workshops',
    description: 'Interactive technology workshops for young people, bridging traditional culture with digital innovation.',
    image: 'https://readdy.ai/api/search-image?query=Youth%20technology%20workshop%20with%20teenagers%20learning%20digital%20skills%2C%20computers%20and%20tablets%2C%20instructor%20teaching%2C%20modern%20educational%20environment%2C%20young%20people%20collaborating&width=320&height=192&seq=event-youth&orientation=landscape',
    position: { lat: 43.7310, lng: 12.6450 },
    color: '#2563eb',
    date: 'April 27, 2024',
    time: '2:00 PM - 6:00 PM',
    location: 'Community Center',
    status: 'upcoming'
  },

  // Educational Events - 绿色
  {
    id: 'heritage-tour',
    title: 'Guided Heritage Walking Tour',
    category: 'Educational Events',
    subcategory: 'tours',
    description: 'Expert historians lead visitors through Urbino\'s UNESCO World Heritage sites with fascinating stories and hidden details.',
    image: 'https://readdy.ai/api/search-image?query=Historical%20walking%20tour%20in%20Urbino%20with%20guide%20explaining%20Renaissance%20architecture%20to%20tourists%2C%20group%20of%20visitors%20listening%2C%20historic%20buildings%20backdrop%2C%20educational%20tourism&width=320&height=192&seq=event-tour&orientation=landscape',
    position: { lat: 43.7250, lng: 12.6300 },
    color: '#059669',
    date: 'Daily',
    time: '10:00 AM & 3:00 PM',
    location: 'Palazzo Ducale Entrance',
    status: 'ongoing'
  },
  {
    id: 'cooking-class',
    title: 'Traditional Cooking Masterclass',
    category: 'Educational Events',
    subcategory: 'workshops',
    description: 'Learn authentic Marchigian recipes from local chefs using ingredients sourced from regional producers.',
    image: 'https://readdy.ai/api/search-image?query=Italian%20cooking%20class%20with%20chef%20teaching%20traditional%20recipes%2C%20participants%20preparing%20pasta%20and%20regional%20dishes%2C%20professional%20kitchen%20setting%2C%20culinary%20education&width=320&height=192&seq=event-cooking&orientation=landscape',
    position: { lat: 43.7160, lng: 12.6340 },
    color: '#059669',
    date: 'April 25, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Culinary Institute',
    status: 'upcoming'
  },
  {
    id: 'photography-workshop',
    title: 'Architecture Photography Workshop',
    category: 'Educational Events',
    subcategory: 'workshops',
    description: 'Professional photographers teach techniques for capturing Renaissance architecture and urban landscapes.',
    image: 'https://readdy.ai/api/search-image?query=Photography%20workshop%20in%20historic%20Italian%20city%20with%20professional%20photographer%20teaching%20composition%20techniques%2C%20participants%20with%20cameras%2C%20Renaissance%20architecture%20subjects&width=320&height=192&seq=event-photo&orientation=landscape',
    position: { lat: 43.7300, lng: 12.6400 },
    color: '#059669',
    date: 'May 5, 2024',
    time: '9:00 AM - 1:00 PM',
    location: 'Various Historic Sites',
    status: 'upcoming'
  },

  // Sports & Recreation - 橙色
  {
    id: 'cycling-tour',
    title: 'Hills Cycling Adventure',
    category: 'Sports & Recreation',
    subcategory: 'sports',
    description: 'Explore the beautiful countryside surrounding Urbino on guided cycling routes for all skill levels.',
    image: 'https://readdy.ai/api/search-image?query=Cycling%20group%20on%20scenic%20Italian%20hills%20around%20Urbino%2C%20cyclists%20with%20mountain%20bikes%20on%20country%20roads%2C%20beautiful%20countryside%20landscape%2C%20recreational%20outdoor%20activity&width=320&height=192&seq=event-cycling&orientation=landscape',
    position: { lat: 43.7380, lng: 12.6320 },
    color: '#ea580c',
    date: 'April 28, 2024',
    time: '9:00 AM - 4:00 PM',
    location: 'Starting from City Gate',
    status: 'upcoming'
  },
  {
    id: 'running-event',
    title: 'Historic Center Fun Run',
    category: 'Sports & Recreation',
    subcategory: 'sports',
    description: 'Family-friendly running event through Urbino\'s historic streets with distances for all ages and abilities.',
    image: 'https://readdy.ai/api/search-image?query=Fun%20run%20event%20in%20historic%20Italian%20town%20with%20families%20and%20runners%20of%20all%20ages%2C%20colorful%20running%20gear%2C%20historic%20architecture%20backdrop%2C%20community%20sports%20event&width=320&height=192&seq=event-running&orientation=landscape',
    position: { lat: 43.7220, lng: 12.6480 },
    color: '#ea580c',
    date: 'May 12, 2024',
    time: '8:00 AM',
    location: 'Piazza della Repubblica',
    status: 'upcoming'
  },

  // Special Events - 红色
  {
    id: 'night-markets',
    title: 'Summer Night Markets',
    category: 'Special Events',
    subcategory: 'seasonal',
    description: 'Extended evening shopping and dining with live music, artisan demonstrations, and special cultural performances.',
    image: 'https://readdy.ai/api/search-image?query=Evening%20night%20market%20in%20historic%20Italian%20town%20square%20with%20atmospheric%20lighting%2C%20food%20stalls%2C%20live%20music%20performance%2C%20people%20enjoying%20nighttime%20shopping%20and%20dining&width=320&height=192&seq=event-night&orientation=landscape',
    position: { lat: 43.7190, lng: 12.6300 },
    color: '#dc2626',
    date: 'July 1 - August 31',
    time: '6:00 PM - 11:00 PM',
    location: 'Historic Center Streets',
    status: 'upcoming'
  },
  {
    id: 'wine-festival',
    title: 'Regional Wine & Food Festival',
    category: 'Special Events',
    subcategory: 'festivals',
    description: 'Celebrate local viticulture with tastings from regional wineries paired with traditional Marchigian cuisine.',
    image: 'https://readdy.ai/api/search-image?query=Wine%20festival%20in%20Italian%20countryside%20setting%20with%20wine%20tasting%20booths%2C%20local%20food%20vendors%2C%20people%20enjoying%20wine%20and%20food%2C%20vineyard%20atmosphere%2C%20cultural%20celebration&width=320&height=192&seq=event-wine&orientation=landscape',
    position: { lat: 43.7260, lng: 12.6250 },
    color: '#dc2626',
    date: 'September 15-16, 2024',
    time: '11:00 AM - 8:00 PM',
    location: 'Municipal Park',
    status: 'upcoming'
  }
];