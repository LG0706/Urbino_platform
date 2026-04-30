'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Heritage & Environment', href: '/urbino/heritage' },
    { name: "Residents' Life", href: '/urbino/residents' },
    { name: "Visitors' Guide", href: '/urbino/visitors' },
    { name: 'Risks & Actions', href: '/urbino/risks' },
    { name: 'Events & News', href: '/urbino/news' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/urbino" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <i className="ri-building-2-line text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">Urbino Community</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 cursor-pointer"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}