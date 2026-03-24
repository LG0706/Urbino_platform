export interface RouteData {
  id: string;
  title: string;
  theme: string;
  themeLabel: string;
  description: string;
  image: string;
  duration: string;
  distance: string;
  stops: number;
  difficulty: string;
  color: string;
  highlights: string[];
  waypoints: { lat: number; lng: number; name: string; description: string }[];
}

export const visitorsRoutes: RouteData[] = [
  // Walking Routes - 蓝色
  {
    id: 'historic-center-walk',
    title: 'Historic Center Discovery Walk',
    theme: 'walking',
    themeLabel: 'Walking Route',
    description: 'A leisurely walk through Urbino\'s cobblestone streets, exploring hidden courtyards, artisan workshops, and panoramic viewpoints. Perfect for first-time visitors wanting to experience the city\'s authentic atmosphere.',
    image: 'https://readdy.ai/api/search-image?query=Tourists%20walking%20through%20historic%20cobblestone%20streets%20of%20Urbino%2C%20Renaissance%20architecture%2C%20stone%20buildings%20with%20arches%2C%20people%20exploring%20medieval%20alleys%2C%20authentic%20Italian%20atmosphere%2C%20golden%20hour%20lighting&width=400&height=200&seq=walking1&orientation=landscape',
    duration: '2-3 hours',
    distance: '3.5 km',
    stops: 8,
    difficulty: 'Easy',
    color: '#2563eb',
    highlights: ['Piazza della Repubblica', 'Artisan Workshops', 'City Walls Views', 'Hidden Courtyards'],
    waypoints: [
      { lat: 43.7261, lng: 12.6364, name: 'Palazzo Ducale', description: 'Starting point at the main square' },
      { lat: 43.7280, lng: 12.6380, name: 'Via Raffaello', description: 'Historic shopping street' },
      { lat: 43.7300, lng: 12.6350, name: 'Fortezza Albornoz', description: 'Panoramic viewpoint' },
      { lat: 43.7320, lng: 12.6400, name: 'Cathedral', description: 'Religious architecture' },
      { lat: 43.7290, lng: 12.6420, name: 'Orto Botanico', description: 'Botanical garden views' },
      { lat: 43.7270, lng: 12.6390, name: 'Via Veterani', description: 'Traditional workshops' },
      { lat: 43.7250, lng: 12.6370, name: 'Mercatale', description: 'Local market area' },
      { lat: 43.7261, lng: 12.6364, name: 'Return to Palazzo', description: 'End at starting point' }
    ]
  },
  {
    id: 'countryside-trail',
    title: 'Countryside and Hills Trail',
    theme: 'walking',
    themeLabel: 'Walking Route',
    description: 'Escape the city walls and explore the rolling hills surrounding Urbino. This scenic route takes you through olive groves, vineyards, and traditional farmhouses with breathtaking views of the Renaissance city.',
    image: 'https://readdy.ai/api/search-image?query=Scenic%20hiking%20trail%20through%20Italian%20countryside%20hills%20around%20Urbino%2C%20olive%20groves%20and%20vineyards%2C%20distant%20view%20of%20historic%20city%2C%20nature%20walking%20path%2C%20peaceful%20landscape%2C%20clear%20blue%20sky&width=400&height=200&seq=walking2&orientation=landscape',
    duration: '3-4 hours',
    distance: '5.2 km',
    stops: 6,
    difficulty: 'Moderate',
    color: '#2563eb',
    highlights: ['Olive Groves', 'Panoramic Views', 'Traditional Farms', 'Wine Tasting'],
    waypoints: [
      { lat: 43.7200, lng: 12.6300, name: 'Porta Valbona', description: 'Historic city gate exit' },
      { lat: 43.7150, lng: 12.6250, name: 'Olive Grove Trail', description: 'Ancient olive trees' },
      { lat: 43.7100, lng: 12.6200, name: 'Vineyard Vista', description: 'Local wine production' },
      { lat: 43.7080, lng: 12.6280, name: 'Farmhouse Stop', description: 'Traditional architecture' },
      { lat: 43.7130, lng: 12.6350, name: 'Panoramic Point', description: 'City views' },
      { lat: 43.7200, lng: 12.6300, name: 'Return Gate', description: 'Back to city center' }
    ]
  },

  // Heritage Routes - 绿色
  {
    id: 'renaissance-masters-route',
    title: 'Renaissance Masters Route',
    theme: 'heritage',
    themeLabel: 'Heritage Route',
    description: 'Follow in the footsteps of Raphael, Piero della Francesca, and other Renaissance masters. Visit their works, studios, and the places that inspired their greatest masterpieces in this UNESCO World Heritage city.',
    image: 'https://readdy.ai/api/search-image?query=Renaissance%20art%20gallery%20interior%20in%20historic%20Urbino%20palace%2C%20tourists%20viewing%20famous%20paintings%2C%20elegant%20architecture%20with%20frescoed%20walls%2C%20museum%20atmosphere%2C%20cultural%20heritage%20display&width=400&height=200&seq=heritage1&orientation=landscape',
    duration: '4-5 hours',
    distance: '2.8 km',
    stops: 7,
    difficulty: 'Easy',
    color: '#059669',
    highlights: ['Palazzo Ducale Gallery', 'Raphael\'s Birthplace', 'Studiolo del Duca', 'Renaissance Frescoes'],
    waypoints: [
      { lat: 43.7261, lng: 12.6364, name: 'Palazzo Ducale', description: 'National Gallery entrance' },
      { lat: 43.7190, lng: 12.6290, name: 'Casa di Raffaello', description: 'Raphael\'s birthplace' },
      { lat: 43.7280, lng: 12.6480, name: 'Palazzo Albani', description: 'Noble residence frescoes' },
      { lat: 43.7300, lng: 12.6420, name: 'Oratorio San Giuseppe', description: 'Renaissance chapel' },
      { lat: 43.7315, lng: 12.6405, name: 'Cathedral Museum', description: 'Religious art collection' },
      { lat: 43.7270, lng: 12.6380, name: 'Via Barocci', description: 'Artist\'s street heritage' },
      { lat: 43.7261, lng: 12.6364, name: 'Studiolo Return', description: 'Final palace visit' }
    ]
  },
  {
    id: 'ducal-court-route',
    title: 'Ducal Court and Nobility Route',
    theme: 'heritage',
    themeLabel: 'Heritage Route',
    description: 'Explore the world of Renaissance nobility and court life. Visit the rooms where Duke Federico da Montefeltro held court, managed his vast library, and entertained scholars, artists, and diplomats from across Europe.',
    image: 'https://readdy.ai/api/search-image?query=Elegant%20Renaissance%20palace%20courtyard%20with%20loggia%20and%20columns%2C%20tourists%20exploring%20noble%20architecture%2C%20refined%20stonework%20details%2C%20ducal%20residence%20atmosphere%2C%20Italian%20Renaissance%20grandeur&width=400&height=200&seq=heritage2&orientation=landscape',
    duration: '3-4 hours',
    distance: '2.1 km',
    stops: 5,
    difficulty: 'Easy',
    color: '#059669',
    highlights: ['Ducal Apartments', 'Historic Library', 'Throne Room', 'Noble Gardens'],
    waypoints: [
      { lat: 43.7261, lng: 12.6364, name: 'Ducal Palace', description: 'Main entrance and courtyard' },
      { lat: 43.7265, lng: 12.6370, name: 'Throne Room', description: 'Ceremonial halls' },
      { lat: 43.7258, lng: 12.6358, name: 'Library Wing', description: 'Historical manuscripts' },
      { lat: 43.7270, lng: 12.6375, name: 'Private Apartments', description: 'Noble living quarters' },
      { lat: 43.7255, lng: 12.6350, name: 'Hanging Gardens', description: 'Renaissance landscape design' }
    ]
  },

  // Religious Routes - 紫色
  {
    id: 'sacred-art-pilgrimage',
    title: 'Sacred Art and Spirituality Route',
    theme: 'religious',
    themeLabel: 'Religious Route',
    description: 'A spiritual journey through Urbino\'s most significant religious sites. Discover centuries of sacred art, architectural marvels, and the deep spiritual traditions that have shaped this holy city.',
    image: 'https://readdy.ai/api/search-image?query=Historic%20Italian%20church%20interior%20with%20beautiful%20frescoes%20and%20religious%20art%2C%20visitors%20appreciating%20sacred%20architecture%2C%20peaceful%20spiritual%20atmosphere%2C%20ornate%20altar%20and%20sculptures&width=400&height=200&seq=religious1&orientation=landscape',
    duration: '3-4 hours',
    distance: '3.2 km',
    stops: 6,
    difficulty: 'Easy',
    color: '#7c3aed',
    highlights: ['Cathedral Treasury', 'Monastic Traditions', 'Sacred Frescoes', 'Pilgrimage History'],
    waypoints: [
      { lat: 43.7315, lng: 12.6405, name: 'Cathedral of Urbino', description: 'Main cathedral and treasury' },
      { lat: 43.7350, lng: 12.6320, name: 'San Bernardino', description: 'Franciscan heritage' },
      { lat: 43.7180, lng: 12.6380, name: 'San Domenico', description: 'Dominican monastery' },
      { lat: 43.7290, lng: 12.6450, name: 'Santa Chiara', description: 'Contemplative tradition' },
      { lat: 43.7250, lng: 12.6320, name: 'San Francesco', description: 'Medieval pilgrimage site' },
      { lat: 43.7315, lng: 12.6405, name: 'Cathedral Return', description: 'Concluding prayers' }
    ]
  },
  {
    id: 'monastic-heritage-route',
    title: 'Monastic Heritage and Contemplation',
    theme: 'religious',
    themeLabel: 'Religious Route',
    description: 'Experience the contemplative side of Urbino by visiting ancient monasteries, peaceful cloisters, and gardens where monks and nuns have practiced spiritual life for centuries.',
    image: 'https://readdy.ai/api/search-image?query=Peaceful%20monastery%20cloister%20with%20arched%20corridors%20and%20garden%20courtyard%2C%20serene%20atmosphere%2C%20stone%20columns%2C%20contemplative%20space%2C%20Italian%20religious%20architecture&width=400&height=200&seq=religious2&orientation=landscape',
    duration: '2-3 hours',
    distance: '2.7 km',
    stops: 4,
    difficulty: 'Easy',
    color: '#7c3aed',
    highlights: ['Cloistered Gardens', 'Manuscript Traditions', 'Contemplative Spaces', 'Monastic Life'],
    waypoints: [
      { lat: 43.7180, lng: 12.6380, name: 'San Domenico Cloister', description: 'Dominican contemplation' },
      { lat: 43.7290, lng: 12.6450, name: 'Santa Chiara Gardens', description: 'Cloistered peaceful gardens' },
      { lat: 43.7200, lng: 12.6350, name: 'Convento dei Cappuccini', description: 'Franciscan simplicity' },
      { lat: 43.7250, lng: 12.6400, name: 'Meditation Path', description: 'Spiritual walking route' }
    ]
  },

  // Cultural Routes - 橙色
  {
    id: 'university-intellectual-route',
    title: 'University and Intellectual Traditions',
    theme: 'cultural',
    themeLabel: 'Cultural Route',
    description: 'Discover Urbino\'s vibrant intellectual life from Renaissance humanism to modern university culture. Visit lecture halls, libraries, and meeting places where scholars have gathered for over 500 years.',
    image: 'https://readdy.ai/api/search-image?query=Historic%20university%20building%20in%20Urbino%20with%20students%20and%20scholars%2C%20Renaissance%20academic%20architecture%2C%20library%20interior%20with%20ancient%20books%2C%20intellectual%20atmosphere%2C%20learning%20environment&width=400&height=200&seq=cultural1&orientation=landscape',
    duration: '3 hours',
    distance: '2.5 km',
    stops: 5,
    difficulty: 'Easy',
    color: '#ea580c',
    highlights: ['Historic University', 'Ancient Library', 'Student Life', 'Academic Traditions'],
    waypoints: [
      { lat: 43.7280, lng: 12.6400, name: 'University Rector\'s Office', description: 'Academic administrative center' },
      { lat: 43.7300, lng: 12.6420, name: 'Historic Library', description: 'Ancient manuscripts collection' },
      { lat: 43.7320, lng: 12.6380, name: 'Philosophy Faculty', description: 'Humanistic traditions' },
      { lat: 43.7290, lng: 12.6350, name: 'Student Quarter', description: 'Modern university life' },
      { lat: 43.7270, lng: 12.6390, name: 'Collegio Raffaello', description: 'Historic student residence' }
    ]
  },
  {
    id: 'artisan-craft-route',
    title: 'Artisan Workshops and Traditional Crafts',
    theme: 'cultural',
    themeLabel: 'Cultural Route',
    description: 'Meet local artisans keeping ancient traditions alive. Visit workshops where pottery, woodworking, bookbinding, and other Renaissance crafts continue to flourish in the modern era.',
    image: 'https://readdy.ai/api/search-image?query=Traditional%20Italian%20artisan%20workshop%20with%20craftspeople%20working%20on%20pottery%20and%20woodcarving%2C%20authentic%20handmade%20products%2C%20cultural%20heritage%20preservation%2C%20workshop%20atmosphere&width=400&height=200&seq=cultural2&orientation=landscape',
    duration: '2-3 hours',
    distance: '1.8 km',
    stops: 6,
    difficulty: 'Easy',
    color: '#ea580c',
    highlights: ['Pottery Studio', 'Bookbinding Art', 'Woodcarving Masters', 'Traditional Techniques'],
    waypoints: [
      { lat: 43.7270, lng: 12.6390, name: 'Ceramics Workshop', description: 'Traditional pottery making' },
      { lat: 43.7250, lng: 12.6370, name: 'Bookbinding Atelier', description: 'Ancient binding techniques' },
      { lat: 43.7280, lng: 12.6350, name: 'Woodworking Studio', description: 'Furniture restoration' },
      { lat: 43.7290, lng: 12.6380, name: 'Textile Arts', description: 'Traditional weaving' },
      { lat: 43.7260, lng: 12.6400, name: 'Stone Carving', description: 'Architectural restoration' },
      { lat: 43.7275, lng: 12.6375, name: 'Artisan Market', description: 'Craft sales and demonstrations' }
    ]
  }
];