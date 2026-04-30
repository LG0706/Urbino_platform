
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { mapMarkers } from '@/lib/mapData';

interface SiteDetailClientProps {
  siteId: string;
}

export default function SiteDetailClient({ siteId }: SiteDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    title: '',
    story: '',
    photo: null as File | null
  });

  const siteData = mapMarkers.find(marker => marker.id === siteId);

  if (!siteData) {
    return <div>Site not found</div>;
  }

  const isStory = siteData.category === 'Community Memories' || siteData.category === 'Community Stories';

  const galleryImages = [
    siteData.image,
    siteData.image.replace('&seq=', '&seq=gallery1-'),
    siteData.image.replace('&seq=', '&seq=gallery2-'),
    siteData.image.replace('&seq=', '&seq=gallery3-')
  ];

  const relatedSites = mapMarkers
    .filter(marker => marker.category === siteData.category && marker.id !== siteData.id)
    .slice(0, 3);

  const getSiteDetails = (id: string) => {
    const details: { [key: string]: any } = {
      'palazzo-ducale': {
        openingHours: 'Tuesday-Sunday: 8:30-19:15 | Monday: 8:30-14:00',
        ticketPrice: 'Full: €12 | Reduced: €6 | EU Students: €2',
        address: 'Piazza Duca Federico, 61029 Urbino PU',
        description: 'The Palazzo Ducale of Urbino is one of the most important monuments of the Italian Renaissance. Built by Duke Federico da Montefeltro in the 15th century, it represents the ideal of the Renaissance palace. The palace houses the National Gallery of the Marche with masterpieces by Piero della Francesca, Raphael, and Paolo Uccello.',
        transportInfo: 'Bus lines 46, 75 stop at Piazza della Repubblica (2-minute walk)'
      },
      'marias-story': {
        date: 'March 10, 2024',
        author: 'Maria Rossi',
        commentsCount: 12,
        subtitle: 'Four Generations of Tradition in the Heart of Urbino',
        tags: ['Family Business', 'Traditional Craft', 'Local Heritage'],
        fullStory: `In 1943, during the height of World War II, my great-grandmother Nonna Elena opened a small bakery in what was then a struggling neighborhood of Urbino. With nothing but a wood-fired oven and her grandmother's recipes, she began what would become an 80-year legacy.

The bakery started as more than just a business—it was a lifeline for the community. During the war, Nonna Elena would often bake bread for families who couldn't afford it, accepting payment in vegetables from their gardens or simply a promise to pay when times got better.

My grandmother Francesca took over in the 1960s, adding traditional focaccia and expanding the morning offerings. She was the one who started the tradition of teaching neighborhood children how to knead dough—a practice we continue today.

When my mother Rosa joined in the 1980s, she brought innovation while respecting tradition. She introduced organic flours and began sourcing ingredients from local farms. The relationships she built with farmers continue to supply our bakery today.

Now, as the fourth generation, I'm faced with the challenge of keeping traditions alive while meeting modern expectations. We've added gluten-free options and started delivering to elderly customers who can no longer make the walk to our shop.

But some things never change: every morning at 4 AM, I light the same wood-fired oven that Nonna Elena used. The recipes are the same, written in her careful handwriting on cards yellowed with age. And every evening, as I close the shop, I can still smell the lingering aroma that has defined our corner of Urbino for eight decades.`,
        pastImage: 'https://readdy.ai/api/search-image?query=Historical%20black%20and%20white%20photograph%20of%20traditional%20Italian%20bakery%20from%201940s%20vintage%20bread%20making%20scene%20old%20stone%20ovens%20women%20in%20traditional%20clothing%20baking%20bread%20wartime%20community%20bakery%20nostalgic%20sepia%20tones%20authentic%20historical%20atmosphere&width=400&height=300&seq=mariapast43&orientation=landscape',
        presentImage: 'https://readdy.ai/api/search-image?query=Modern%20traditional%20Italian%20bakery%20interior%20with%20stone%20ovens%20fresh%20bread%20displays%20warm%20lighting%20elderly%20woman%20baker%20in%20apron%20authentic%20artisanal%20atmosphere%20family%20tradition%20contemporary%20setting&width=400&height=300&seq=mariatoday24&orientation=landscape'
      },
      'giuseppe-restoration': {
        date: 'March 5, 2024',
        author: 'Giuseppe Bianchi',
        commentsCount: 8,
        subtitle: 'Bringing a 14th Century Home Back to Life',
        tags: ['Historic Preservation', 'Architecture', 'Restoration'],
        fullStory: `When my wife and I first saw the house on Via del Barozzo, it was love at first sight—despite the fact that it was practically falling down. Built in 1347, this medieval gem had been abandoned for nearly thirty years.

The restoration has been a journey of discovery. Behind layers of modern paint, we found original frescoes. Under damaged floorboards, we discovered beautiful terracotta tiles. Each room revealed new treasures and new challenges.

Working with local craftsmen has been essential. Master mason Antonio taught me traditional lime mortar techniques that have been used in Urbino for centuries. Maria, a local artisan, helped restore the original window frames using methods passed down through her family.

The most challenging part was the roof. Medieval roofs weren't designed for modern weather patterns, and we had to find a balance between historical accuracy and practical waterproofing. We ended up using traditional terracotta tiles with a modern membrane system hidden beneath.

Two years later, our home is a living piece of Urbino's history. We host workshops on traditional building techniques and welcome architecture students from the university. The house has become not just our home, but a teaching tool for preserving our city's architectural heritage.`,
        pastImage: 'https://readdy.ai/api/search-image?query=Abandoned%20medieval%20stone%20house%20in%20deteriorating%20condition%20crumbling%20walls%20damaged%20roof%20tiles%20overgrown%20vegetation%20broken%20windows%20architectural%20decay%20before%20restoration%20historical%20building%20in%20disrepair%20weathered%20stone%20facade&width=400&height=300&seq=giuseppepast47&orientation=landscape',
        presentImage: 'https://readdy.ai/api/search-image?query=Beautifully%20restored%20medieval%20stone%20house%20with%20perfect%20stonework%20new%20roof%20tiles%20clean%20facade%20well%20maintained%20garden%20traditional%20architecture%20renovation%20completed%20pristine%20historical%20building%20restoration&width=400&height=300&seq=giuseppetoday24&orientation=landscape'
      },
      'palio-tradition': {
        date: 'February 25, 2024',
        author: 'Community Heritage Team',
        commentsCount: 15,
        subtitle: 'Centuries of Tradition in Modern Times',
        tags: ['Cultural Festival', 'Community Tradition', 'Historical Event'],
        fullStory: `The Palio of Urbino has been celebrated for over 400 years, bringing together neighborhoods in friendly competition and shared celebration. What started as a medieval tournament has evolved into one of our most cherished community traditions.

Each neighborhood, or contrada, prepares for months leading up to the annual festival. Teams practice traditional games, artisans create elaborate costumes, and families pass down stories of past victories and defeats.

The competition includes historical games like the crossbow contest, flag throwing, and the famous barrel race through the narrow streets of the old town. But beyond the competition, the Palio is about community - neighbors who might not speak all year come together to support their contrada.

In recent years, we've worked to include university students and new residents in our traditions. Young people from around the world now participate alongside families who have lived here for generations. It's beautiful to see how tradition can adapt and grow while maintaining its essential spirit.

The festival culminates in a great feast in Piazza della Repubblica, where all contrade celebrate together. Winners are honored, but everyone shares in the joy of preserving our heritage and strengthening community bonds.`,
        pastImage: 'https://readdy.ai/api/search-image?query=Historical%20black%20and%20white%20photograph%20of%20medieval%20Palio%20festival%20in%20Italian%20town%20square%20from%20early%201900s%20people%20in%20period%20costumes%20traditional%20games%20vintage%20community%20celebration%20sepia%20tones%20authentic%20historical%20atmosphere&width=400&height=300&seq=paliopast20&orientation=landscape',
        presentImage: 'https://readdy.ai/api/search-image?query=Modern%20Palio%20festival%20celebration%20in%20Urbino%20town%20square%20colorful%20medieval%20costumes%20community%20gathering%20traditional%20games%20competition%20vibrant%20banners%20contemporary%20festival%20atmosphere&width=400&height=300&seq=paliotoday24&orientation=landscape'
      },
      'renaissance-workshops': {
        date: 'February 15, 2024',
        author: 'Elena Marchetti',
        commentsCount: 18,
        subtitle: 'Preserving Artistic Traditions Through Teaching',
        tags: ['Art Education', 'Renaissance Techniques', 'Cultural Heritage'],
        fullStory: `For thirty years, I taught art history at the local high school, watching generations of students discover the beauty of Renaissance masters. When I retired three years ago, I couldn't bear the thought of letting that passion fade away.

So I transformed my garden studio into a workshop space where I teach traditional Renaissance techniques to anyone willing to learn. From fresco painting to tempera preparation, from gold leaf application to manuscript illumination, we explore the methods that created some of history's greatest masterpieces.

My students range from curious tourists to serious art students from the university. There's something magical about seeing a child's eyes light up when they successfully mix their first tempera paint using egg yolk and pigments, just as Raphael did five centuries ago.

We use authentic materials whenever possible. The pigments come from the same quarries that supplied medieval artists. The wooden panels are prepared using traditional gesso techniques. Even our brushes are made from squirrel and sable hair, crafted by hand.

The workshop has become more than just an art class—it's a living connection to our artistic heritage. Students don't just learn techniques; they understand the patience, skill, and dedication that Renaissance masters brought to their craft.

Last month, one of my students, a young woman from Japan, completed her first small fresco using techniques unchanged since Giotto's time. As we unveiled her work together, I felt the same pride I imagine the great masters felt when guiding their apprentices centuries ago.`,
        pastImage: 'https://readdy.ai/api/search-image?query=Historical%20Renaissance%20art%20studio%20from%201400s%20with%20master%20artists%20teaching%20apprentices%20traditional%20painting%20techniques%20medieval%20workshop%20authentic%20period%20atmosphere%20tempera%20preparation%20fresco%20work%20historical%20accuracy&width=400&height=300&seq=workshoppast15&orientation=landscape',
        presentImage: 'https://readdy.ai/api/search-image?query=Modern%20Renaissance%20art%20workshop%20with%20teacher%20instructing%20students%20in%20traditional%20techniques%20beautiful%20garden%20studio%20setting%20authentic%20materials%20authentic%20artistic%20atmosphere%20cultural%20preservation%20contemporary%20learning&width=400&height=300&seq=workshoptoday24&orientation=landscape'
      }
    };
    return details[id] || {
      openingHours: 'Please contact for current hours',
      ticketPrice: 'Varies',
      address: 'Urbino, Italy',
      description: siteData.description,
      transportInfo: 'Located in Urbino historic center'
    };
  };

  const details = getSiteDetails(siteData.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for sharing your story! It will be reviewed and may be featured on our community page.');
    setCommentForm({
      name: '',
      email: '',
      title: '',
      story: '',
      photo: null
    });
    setIsCommentsExpanded(false);
  };

  const mockComments = [
    {
      id: 1,
      name: 'Paolo Ferretti',
      date: '2024-03-12',
      comment: 'I remember buying bread from Nonna Elena as a child. The smell of her bakery could be detected three streets away! Thank you for keeping this tradition alive.'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      date: '2024-03-11',
      comment: 'As a tourist, visiting Maria\'s bakery was the highlight of my trip to Urbino. The focaccia is absolutely incredible, and Maria\'s stories about her family made it so special.'
    },
    {
      id: 3,
      name: 'Lucia Santini',
      date: '2024-03-10',
      comment: 'My grandmother used to tell me stories about helping Elena during the war. It\'s beautiful to see how this family has preserved not just recipes, but the spirit of community.'
    }
  ];

  if (isStory) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-8">
          <div className="max-w-7xl mx-auto px-6 flex gap-8">
            {/* Fixed Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">Navigate Story</h4>
                  <nav className="space-y-2">
                    <a href="#comparison" className="block text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">Past & Present</a>
                    <a href="#story" className="block text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">Story</a>
                    <a href="#gallery" className="block text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">Photo Gallery</a>
                    <a href="#comments" className="block text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">Community Comments</a>
                    <a href="#explore" className="block text-sm text-gray-600 hover:text-emerald-600 cursor-pointer">Explore More</a>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <Link 
                href="/"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 cursor-pointer"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Back to Map
              </Link>

              {/* Image Comparison Section */}
              <section id="comparison" className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Past and Present</h2>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                  <div className="relative h-96">
                    {/* Past Image */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                      }}
                    >
                      <img
                        src={details.pastImage}
                        alt="Past"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium text-white bg-gray-800/80">
                          1940s
                        </span>
                      </div>
                    </div>

                    {/* Present Image */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
                      }}
                    >
                      <img
                        src={details.presentImage}
                        alt="Present"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium text-white bg-emerald-600/80">
                          Today
                        </span>
                      </div>
                    </div>

                    {/* Slider Control */}
                    <div className="absolute inset-0 flex items-center">
                      <div 
                        className="absolute w-1 bg-white shadow-lg cursor-ew-resize z-10"
                        style={{ 
                          left: `${sliderPosition}%`, 
                          height: '100%', 
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <i className="ri-drag-move-line text-gray-600"></i>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Story Body Section */}
              <section id="story" className="mb-12">
                <div className="mb-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span 
                      className="px-4 py-2 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: siteData.color }}
                    >
                      {siteData.category}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{details.date}</span>
                      <span>•</span>
                      <span>By {details.author}</span>
                      <span>•</span>
                      <span>{details.commentsCount} comments</span>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{siteData.title}</h1>
                  <p className="text-xl text-gray-600 mb-6">{details.subtitle}</p>

                  <div className="flex items-center space-x-4 mb-8">
                    <div className="flex items-center space-x-2">
                      {details.tags?.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-heart-line"></i>
                      <span>Favorite</span>
                    </button>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700">
                  {details.fullStory?.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6">{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Gallery Section */}
              <section id="gallery" className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

              {/* Comments Section */}
              <section id="comments" className="mb-12">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Community Comments</h3>
                    <button
                      onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}
                      className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className={`ri-${isCommentsExpanded ? 'subtract' : 'add'}-line`}></i>
                      <span>{isCommentsExpanded ? 'Hide Form' : 'Share Your Story'}</span>
                    </button>
                  </div>

                  {/* Existing Comments */}
                  <div className="space-y-4 mb-6">
                    {mockComments.map((comment) => (
                      <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Comment Form */}
                  {isCommentsExpanded && (
                    <form onSubmit={handleCommentSubmit} className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Share Your Memory</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={commentForm.name}
                            onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Your name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
                          <input
                            type="email"
                            name="email"
                            value={commentForm.email}
                            onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                        <input
                          type="text"
                          name="title"
                          value={commentForm.title}
                          onChange={(e) => setCommentForm({...commentForm, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Give your story a title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
                        <textarea
                          name="story"
                          value={commentForm.story}
                          onChange={(e) => setCommentForm({...commentForm, story: e.target.value})}
                          maxLength={500}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                          placeholder="Share your memory or connection to this story..."
                        />
                        <p className="text-xs text-gray-500 mt-1">{commentForm.story.length}/500 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Photo (optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                          <i className="ri-camera-line text-2xl text-gray-400 mb-2"></i>
                          <p className="text-gray-600 text-sm">Click to upload a photo</p>
                          <p className="text-xs text-gray-500 mt-1">Uncollectable</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <p className="text-sm text-amber-700">
                          <i className="ri-information-line mr-2"></i>
                          Your submission will be reviewed by the municipality before being displayed publicly.
                        </p>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Submit Story
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsCommentsExpanded(false)}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </section>

              {/* Explore More Section */}
              <section id="explore">
                {relatedSites.length > 0 && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">Explore More Stories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {relatedSites.map((site) => (
                        <Link
                          key={site.id}
                          href={`/urbino/sites/${site.id}`}
                          className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <img
                            src={site.image}
                            alt={site.title}
                            className="w-full h-32 rounded-lg object-cover object-top mb-3"
                          />
                          <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{site.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-3">{site.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const details_heritage = getSiteDetails(siteData.id);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6 cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Back to Map
          </Link>

          <div className="relative mb-8">
            <img
              src={siteData.image}
              alt={siteData.title}
              className="w-full h-96 object-cover object-top rounded-lg"
            />
            <div className="absolute top-4 left-4">
              <span 
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: siteData.color }}
              >
                {siteData.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{siteData.title}</h1>

              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p>{details_heritage.description}</p>
              </div>

              {siteData.category === 'Heritage Sites' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                      <i className="ri-time-line mr-2 text-blue-600"></i>
                      Opening Hours
                    </h3>
                    <p className="text-gray-700">{details_heritage.openingHours}</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                      <i className="ri-ticket-line mr-2 text-green-600"></i>
                      Ticket Prices
                    </h3>
                    <p className="text-gray-700">{details_heritage.ticketPrice}</p>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                  <i className="ri-map-pin-line mr-2 text-emerald-600"></i>
                  Getting There
                </h3>
                <p className="text-sm text-gray-700 mb-4">{details_heritage.address}</p>
                <div className="h-48 bg-gray-200 rounded-lg mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2917.123!2d12.636108!3d43.726149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132d168b5f7e8e21%3A0x7a6b5d5d8b5f7e8e!2sUrbino%2C%20PU%2C%20Italy!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    className="border-0 rounded-lg"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                </div>
                <p className="text-xs text-gray-600">{details_heritage.transportInfo}</p>
              </div>

              {relatedSites.length > 0 && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Places</h3>
                  <div className="space-y-3">
                    {relatedSites.map((site) => (
                      <Link
                        key={site.id}
                        href={`/urbino/sites/${site.id}`}
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={site.image}
                            alt={site.title}
                            className="w-12 h-12 rounded-lg object-cover object-top"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-1">{site.title}</h4>
                            <p className="text-xs text-gray-600 line-clamp-2">{site.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
