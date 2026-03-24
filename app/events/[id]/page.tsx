export async function generateStaticParams() {
  return [
    { id: 'renaissance-festival' },
    { id: 'music-concert' },
    { id: 'art-exhibition' },
    { id: 'farmers-market' },
    { id: 'community-garden' },
    { id: 'youth-workshop' },
    { id: 'heritage-tour' },
    { id: 'cooking-class' },
    { id: 'photography-workshop' },
    { id: 'cycling-tour' },
    { id: 'running-event' },
    { id: 'night-markets' },
    { id: 'wine-festival' },
  ];
}

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Event Details</h1>
        <p className="text-gray-600">Details for event: {params.id}</p>
      </div>
    </div>
  );
}