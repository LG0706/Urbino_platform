
import { MarkerData } from '@/components/MapMarker';

// 更新地图标记数据，使用新的五大分类系统
export const mapMarkers: MarkerData[] = [
  // Heritage and Environment - 绿色，分散在地图各处
  {
    id: 'palazzo-ducale',
    title: 'Palazzo Ducale',
    category: 'Heritage and Environment',
    subcategory: 'monuments',
    description: 'The magnificent ducal palace, a masterpiece of Renaissance architecture that houses the National Gallery of the Marche and showcases works by Piero della Francesca.',
    image: 'https://readdy.ai/api/search-image?query=Renaissance%20ducal%20palace%20facade%20with%20elegant%20architecture%2C%20Italian%20Renaissance%20style%2C%20stone%20walls%2C%20arched%20windows%2C%20historic%20courtyard%2C%20golden%20hour%20lighting%2C%20detailed%20architectural%20elements&width=320&height=192&seq=palazzo1&orientation=landscape',
    position: { lat: 43.726149, lng: 12.636364 }, // 城市中心
    color: '#059669' // 绿色
  },
  {
    id: 'cathedral-urbino',
    title: 'Cathedral of Urbino',
    category: 'Heritage and Environment',
    subcategory: 'churches',
    description: 'Historic cathedral showcasing centuries of religious art and neoclassical architecture, rebuilt in the 19th century after an earthquake destroyed the original Renaissance structure.',
    image: 'https://readdy.ai/api/search-image?query=Historic%20Italian%20cathedral%20with%20neoclassical%20facade%2C%20religious%20architecture%2C%20stone%20construction%2C%20elegant%20columns%2C%20clear%20blue%20sky%2C%20peaceful%20setting%2C%20detailed%20stonework&width=320&height=192&seq=cathedral1&orientation=landscape',
    position: { lat: 43.7315, lng: 12.6405 }, // 城北区域
    color: '#059669' // 绿色
  },
  {
    id: 'raphael-house',
    title: "Raphael's Birthplace",
    category: 'Heritage and Environment',
    subcategory: 'monuments',
    description: 'Visit the house where the great Renaissance master Raphael Sanzio was born in 1483. Now a museum dedicated to his life and early works.',
    image: 'https://readdy.ai/api/search-image?query=Historic%20Italian%20house%20with%20Renaissance%20architecture%2C%20stone%20walls%2C%20wooden%20shutters%2C%20narrow%20medieval%20street%2C%20authentic%20period%20details%2C%20charming%20facade%2C%20museum%20entrance&width=320&height=192&seq=raphael1&orientation=landscape',
    position: { lat: 43.7190, lng: 12.6290 }, // 城西南区域
    color: '#059669' // 绿色
  },
  {
    id: 'palazzo-albani',
    title: 'Palazzo Albani',
    category: 'Heritage and Environment',
    subcategory: 'palaces',
    description: 'Elegant Renaissance palace featuring beautiful frescoes and architectural details, representing the refined taste of Urbino nobility.',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20Renaissance%20palace%20with%20ornate%20facade%2C%20Italian%20noble%20architecture%2C%20decorative%20elements%2C%20historical%20building%2C%20refined%20stonework%2C%20courtyard%20entrance&width=320&height=192&seq=albani1&orientation=landscape',
    position: { lat: 43.7280, lng: 12.6480 }, // 城东区域
    color: '#059669' // 绿色
  },
  {
    id: 'san-bernardino',
    title: 'Church of San Bernardino',
    category: 'Heritage and Environment',
    subcategory: 'churches',
    description: 'Beautiful church with stunning architecture and historical significance, featuring remarkable artwork and peaceful atmosphere.',
    image: 'https://readdy.ai/api/search-image?query=Historic%20Italian%20church%20with%20beautiful%20facade%2C%20religious%20architecture%2C%20peaceful%20setting%2C%20stone%20construction%2C%20bell%20tower%2C%20clear%20sky%2C%20serene%20atmosphere&width=320&height=192&seq=bernardino1&orientation=landscape',
    position: { lat: 43.7350, lng: 12.6320 }, // 城北偏西
    color: '#059669' // 绿色
  },
  {
    id: 'botanical-garden',
    title: 'Botanical Garden of Urbino',
    category: 'Heritage and Environment',
    subcategory: 'nature',
    description: 'University botanical garden featuring diverse plant species and peaceful walking paths, perfect for nature lovers and students.',
    image: 'https://readdy.ai/api/search-image?query=University%20botanical%20garden%20with%20diverse%20plants%2C%20walking%20paths%2C%20greenhouse%20structures%2C%20peaceful%20natural%20environment%2C%20educational%20displays%2C%20lush%20vegetation&width=320&height=192&seq=botanical1&orientation=landscape',
    position: { lat: 43.7330, lng: 12.6430 }, // 城北偏东
    color: '#059669' // 绿色
  },

  // Community Memories - 蓝色，分散在不同区域，修改为与Community Stories对齐
  {
    id: 'marias-story',
    title: "Maria's Traditional Bakery",
    category: 'Community Memories',
    subcategory: 'resident-stories',
    description: 'Four generations of bread making tradition. Maria Rossi shares how her family bakery has been serving the community for over 80 years.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20bakery%20interior%20with%20stone%20ovens%2C%20fresh%20bread%20displays%2C%20warm%20lighting%2C%20elderly%20woman%20baker%20in%20apron%2C%20authentic%20artisanal%20atmosphere%2C%20family%20tradition&width=320&height=192&seq=maria1&orientation=landscape',
    position: { lat: 43.7160, lng: 12.6350 }, // 城南偏西
    color: '#2563eb'
  },
  {
    id: 'giuseppe-restoration',
    title: 'Medieval Home Restoration',
    category: 'Community Memories',
    subcategory: 'resident-stories',
    description: 'Giuseppe Bianchi documents the restoration of his 14th-century house, showcasing traditional craftsmanship and architectural preservation techniques.',
    image: 'https://readdy.ai/api/search-image?query=Medieval%20stone%20house%20restoration%20project%2C%20traditional%20Italian%20architecture%2C%20craftsmen%20working%2C%20ancient%20walls%2C%20authentic%20materials%2C%20renovation%20in%20progress%2C%20historical%20preservation&width=320&height=192&seq=giuseppe1&orientation=landscape',
    position: { lat: 43.7300, lng: 12.6250 }, // 城西北偏远
    color: '#2563eb'
  },
  {
    id: 'palio-tradition',
    title: 'Annual Palio Festival',
    category: 'Community Memories',
    subcategory: 'cultural-traditions',
    description: 'Experience the centuries-old tradition of the Palio, where different neighborhoods compete in historic games and celebrations.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20festival%20with%20people%20in%20medieval%20costumes%2C%20historic%20competition%2C%20town%20square%20celebration%2C%20colorful%20banners%2C%20community%20gathering%2C%20cultural%20tradition&width=320&height=192&seq=palio1&orientation=landscape',
    position: { lat: 43.7230, lng: 12.6500 }, // 城东南
    color: '#2563eb'
  },
  {
    id: 'renaissance-workshops',
    title: 'Renaissance Art Workshops',
    category: 'Community Memories',
    subcategory: 'cultural-traditions',
    description: 'Local artisans continue Renaissance artistic traditions through hands-on workshops teaching traditional techniques and crafts.',
    image: 'https://readdy.ai/api/search-image?query=Renaissance%20art%20workshop%20with%20artisans%20teaching%20traditional%20techniques%2C%20pottery%20and%20painting%2C%20authentic%20studio%20atmosphere%2C%20cultural%20preservation%2C%20hands-on%20learning&width=320&height=192&seq=workshop1&orientation=landscape',
    position: { lat: 43.7370, lng: 12.6380 }, // 城北偏东
    color: '#2563eb'
  },
  {
    id: 'student-memories',
    title: 'University Student Stories',
    category: 'Community Memories',
    subcategory: 'student-life',
    description: 'Stories from international students about their experiences studying in this historic university town and the lasting friendships formed.',
    image: 'https://readdy.ai/api/search-image?query=International%20university%20students%20in%20historic%20Italian%20setting%2C%20diverse%20group%20of%20young%20people%2C%20academic%20life%2C%20Renaissance%20architecture%20background%2C%20friendship%20and%20learning&width=320&height=192&seq=students1&orientation=landscape',
    position: { lat: 43.7310, lng: 12.6350 }, // 大学区域
    color: '#2563eb'
  },

  // Eat and Sleep - 黄色，分散布局
  {
    id: 'osteria-del-borgo',
    title: 'Osteria del Borgo',
    category: 'Eat and Sleep',
    subcategory: 'restaurants',
    description: 'Traditional osteria serving authentic Marchigian cuisine with locally sourced ingredients. Famous for their homemade pasta and regional wines.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20osteria%20interior%20with%20rustic%20wooden%20tables%2C%20wine%20bottles%2C%20cozy%20atmosphere%2C%20warm%20lighting%2C%20authentic%20Italian%20restaurant%2C%20local%20cuisine%20setting&width=320&height=192&seq=osteria1&orientation=landscape',
    position: { lat: 43.7320, lng: 12.6450 }, // 城东北
    color: '#ca8a04' // 黄色
  },
  {
    id: 'taverna-del-duca',
    title: 'Taverna del Duca',
    category: 'Eat and Sleep',
    subcategory: 'restaurants',
    description: 'Historic tavern in the heart of Urbino offering refined cuisine in a Renaissance setting. Specializes in truffle dishes and local delicacies.',
    image: 'https://readdy.ai/api/search-image?query=Historic%20Italian%20tavern%20with%20stone%20arches%2C%20elegant%20dining%20room%2C%20Renaissance%20ambiance%2C%20truffle%20dishes%2C%20fine%20dining%20atmosphere%2C%20medieval%20architecture%20interior&width=320&height=192&seq=taverna1&orientation=landscape',
    position: { lat: 43.7200, lng: 12.6380 }, // 城南区域
    color: '#ca8a04' // 黄色
  },
  {
    id: 'mercato-centrale',
    title: 'Central Market',
    category: 'Eat and Sleep',
    subcategory: 'markets',
    description: 'Vibrant local market offering fresh produce, regional specialties, and traditional products from local farmers and artisans.',
    image: 'https://readdy.ai/api/search-image?query=Italian%20local%20market%20with%20fresh%20vegetables%2C%20traditional%20products%2C%20colorful%20displays%2C%20vendors%2C%20authentic%20market%20atmosphere%2C%20regional%20specialties%2C%20bustling%20activity&width=320&height=192&seq=market1&orientation=landscape',
    position: { lat: 43.7180, lng: 12.6420 }, // 城南偏东
    color: '#ca8a04' // 黄色
  },
  {
    id: 'hotel-ducale',
    title: 'Hotel Ducale Urbino',
    category: 'Eat and Sleep',
    subcategory: 'accommodation',
    description: 'Charming boutique hotel located in a restored Renaissance palace, offering authentic atmosphere with modern comforts.',
    image: 'https://readdy.ai/api/search-image?query=Boutique%20hotel%20in%20Renaissance%20palace%2C%20elegant%20lobby%20with%20period%20furniture%2C%20luxurious%20accommodation%2C%20historic%20Italian%20interior%20design%2C%20refined%20hospitality&width=320&height=192&seq=hotel1&orientation=landscape',
    position: { lat: 43.7250, lng: 12.6370 }, // 城中心偏南
    color: '#ca8a04' // 黄色
  },
  {
    id: 'bb-raphael',
    title: 'B&B Casa Raphael',
    category: 'Eat and Sleep',
    subcategory: 'accommodation',
    description: 'Cozy bed and breakfast in a historic house near Raphael\'s birthplace, offering personalized service and traditional breakfast.',
    image: 'https://readdy.ai/api/search-image?query=Cozy%20Italian%20bed%20and%20breakfast%20interior%2C%20traditional%20decor%2C%20comfortable%20guest%20room%2C%20warm%20hospitality%20atmosphere%2C%20historic%20house%20setting&width=320&height=192&seq=bb1&orientation=landscape',
    position: { lat: 43.7210, lng: 12.6310 }, // 城西南
    color: '#ca8a04' // 黄色
  },
  {
    id: 'local-producers',
    title: 'Artisan Food Workshop',
    category: 'Eat and Sleep',
    subcategory: 'producers',
    description: 'Traditional food production workshop where local artisans create authentic regional products using time-honored methods.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20food%20workshop%20with%20artisans%20making%20local%20products%2C%20authentic%20production%20methods%2C%20handcrafted%20foods%2C%20traditional%20techniques%2C%20artisan%20workspace&width=320&height=192&seq=producers1&orientation=landscape',
    position: { lat: 43.7340, lng: 12.6280 }, // 城西北
    color: '#ca8a04' // 黄色
  }
];

// 新增路线数据结构，用于"Routes and Itineraries"分类
export interface RouteItinerary {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  duration: string;
  distance: string;
  difficulty: string;
  color: string;
  waypoints: { lat: number; lng: number; name: string; description: string }[];
}

export const routeItineraries: RouteItinerary[] = [
  {
    id: 'renaissance-route',
    title: 'Renaissance Heritage Walk',
    category: 'Routes and Itineraries',
    subcategory: 'heritage-routes',
    description: 'A comprehensive walking tour through Urbino\'s Renaissance masterpieces, including the Ducal Palace, Cathedral, and Raphael\'s birthplace.',
    image: 'https://readdy.ai/api/search-image?query=Renaissance%20walking%20route%20through%20historic%20Urbino%20streets%2C%20tourists%20exploring%20architectural%20marvels%2C%20UNESCO%20heritage%20tour%2C%20guided%20cultural%20experience&width=320&height=192&seq=route1&orientation=landscape',
    duration: '3-4 hours',
    distance: '2.5 km',
    difficulty: 'Easy',
    color: '#8b5cf6', // 紫色
    waypoints: [
      { lat: 43.7261, lng: 12.6363, name: 'Palazzo Ducale', description: 'Start at the magnificent Ducal Palace' },
      { lat: 43.7315, lng: 12.6405, name: 'Cathedral', description: 'Visit the historic cathedral' },
      { lat: 43.7190, lng: 12.6290, name: 'Raphael\'s House', description: 'Explore the birthplace of Raphael' },
      { lat: 43.7280, lng: 12.6480, name: 'Palazzo Albani', description: 'End at the elegant Renaissance palace' }
    ]
  },
  {
    id: 'panoramic-route',
    title: 'Panoramic City Views Circuit',
    category: 'Routes and Itineraries',
    subcategory: 'scenic-routes',
    description: 'Circular route offering spectacular views of Urbino and the surrounding countryside from various viewpoints around the city walls.',
    image: 'https://readdy.ai/api/search-image?query=Panoramic%20viewpoint%20overlooking%20Urbino%20cityscape%2C%20scenic%20walking%20path%20along%20ancient%20city%20walls%2C%20breathtaking%20countryside%20views%2C%20photography%20spots&width=320&height=192&seq=route2&orientation=landscape',
    duration: '2-3 hours',
    distance: '3.2 km',
    difficulty: 'Moderate',
    color: '#f59e0b', // 橙色
    waypoints: [
      { lat: 43.7350, lng: 12.6320, name: 'San Bernardino Viewpoint', description: 'Panoramic views from the church' },
      { lat: 43.7380, lng: 12.6430, name: 'Northern Walls', description: 'Walk along the ancient fortifications' },
      { lat: 43.7300, lng: 12.6500, name: 'Eastern Terrace', description: 'Stunning countryside vistas' },
      { lat: 43.7200, lng: 12.6380, name: 'Southern Gate', description: 'Historic city entrance' }
    ]
  },
  {
    id: 'university-route',
    title: 'University Campus Discovery',
    category: 'Routes and Itineraries',
    subcategory: 'cultural-routes',
    description: 'Explore the vibrant university atmosphere, student areas, libraries, and academic buildings integrated into the historic city fabric.',
    image: 'https://readdy.ai/api/search-image?query=University%20campus%20tour%20in%20historic%20Italian%20city%2C%20students%20walking%20between%20Renaissance%20buildings%2C%20academic%20atmosphere%2C%20educational%20institutions&width=320&height=192&seq=route3&orientation=landscape',
    duration: '1.5-2 hours',
    distance: '1.8 km',
    difficulty: 'Easy',
    color: '#10b981', // 绿色
    waypoints: [
      { lat: 43.7310, lng: 12.6350, name: 'Main Campus', description: 'University of Urbino main building' },
      { lat: 43.7330, lng: 12.6430, name: 'Botanical Garden', description: 'University botanical research area' },
      { lat: 43.7280, lng: 12.6400, name: 'Library Complex', description: 'Historic and modern library facilities' },
      { lat: 43.7250, lng: 12.6370, name: 'Student Quarter', description: 'Popular student gathering areas' }
    ]
  },
  {
    id: 'culinary-route',
    title: 'Traditional Food Trail',
    category: 'Routes and Itineraries',
    subcategory: 'food-routes',
    description: 'A delicious journey through Urbino\'s culinary heritage, visiting traditional restaurants, markets, and food artisans.',
    image: 'https://readdy.ai/api/search-image?query=Italian%20food%20trail%20through%20traditional%20restaurants%20and%20markets%2C%20culinary%20tour%20experience%2C%20local%20specialties%2C%20food%20artisans%20at%20work&width=320&height=192&seq=route4&orientation=landscape',
    duration: '4-5 hours',
    distance: '2.0 km',
    difficulty: 'Easy',
    color: '#dc2626', // 红色
    waypoints: [
      { lat: 43.7180, lng: 12.6420, name: 'Central Market', description: 'Fresh local produce and specialties' },
      { lat: 43.7320, lng: 12.6450, name: 'Osteria del Borgo', description: 'Traditional Marchigian cuisine' },
      { lat: 43.7200, lng: 12.6380, name: 'Taverna del Duca', description: 'Historic tavern with truffle dishes' },
      { lat: 43.7340, lng: 12.6280, name: 'Artisan Workshop', description: 'Traditional food production methods' }
    ]
  }
];

// 疏散路线数据
export interface EvacuationRoute {
  id: string;
  name: string;
  description: string;
  distance: string;
  duration: string;
  coordinates: Array<{ lat: number; lng: number }>;
  checkpoints: Array<{
    name: string;
    description: string;
    lat: number;
    lng: number;
  }>;
  color: string;
  category: 'Primary Routes' | 'Secondary Routes';
}

export const evacuationRoutes: EvacuationRoute[] = [
  {
    id: 'main-evacuation-route-north',
    name: 'Main Evacuation Route - Northern Corridor',
    description: 'Primary evacuation route from city center to northern safe zone via University area',
    distance: '2.1 km',
    duration: '25-30 minutes walking',
    coordinates: [
      { lat: 43.7261, lng: 12.6363 }, // 起点：市中心
      { lat: 43.7280, lng: 12.6380 }, // 中间点1
      { lat: 43.7310, lng: 12.6390 }, // 中间点2：医疗中心检查点
      { lat: 43.7340, lng: 12.6410 }, // 中间点3
      { lat: 43.7380, lng: 12.6430 }  // 终点：北部安全区域
    ],
    checkpoints: [
      {
        name: 'Medical Center Checkpoint',
        description: 'Emergency medical support and rest area',
        lat: 43.7310,
        lng: 12.6390
      },
      {
        name: 'Community Center Rest Point',
        description: 'Temporary rest area with basic supplies',
        lat: 43.7340,
        lng: 12.6410
      }
    ],
    color: '#dc2626',
    category: 'Primary Routes'
  }
];
