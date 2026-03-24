
'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface MarkerData {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  position: { lat: number; lng: number };
  color: string;
}

interface MapMarkerProps {
  marker: MarkerData;
  isOpen: boolean;
  onClose: () => void;
}

export default function MapMarker({ marker, isOpen, onClose }: MapMarkerProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-80 p-0 overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
      >
        <i className="ri-close-line text-gray-600"></i>
      </button>
      
      <div className="relative">
        <img
          src={marker.image}
          alt={marker.title}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-3 left-3">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: marker.color }}
          >
            {marker.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {marker.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {marker.description}
        </p>
        
        <Link
          href={`/sites/${marker.id}`}
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors cursor-pointer"
        >
          Read more
          <i className="ri-arrow-right-line ml-1"></i>
        </Link>
      </div>
    </div>
  );
}
