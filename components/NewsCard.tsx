'use client';

import Link from 'next/link';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export default function NewsCard({ id, title, excerpt, image, date, category }: NewsCardProps) {
  return (
    <Link href={`/news/${id}`} className="block group cursor-pointer">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <i className="ri-calendar-line mr-1"></i>
            {date}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>
          <div className="mt-3 flex items-center text-emerald-600 text-sm font-medium">
            Read more
            <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1 transition-transform"></i>
          </div>
        </div>
      </div>
    </Link>
  );
}