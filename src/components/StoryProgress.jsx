import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playPopSound } from '../utils/sound';

export default function StoryProgress({ activeSection }) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollPercent(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'welcome-section', label: 'Surprise', icon: '🎀' },
    { id: 'birthday-cake-section', label: 'Cake', icon: '🎂' },
    { id: 'special-cards-section', label: 'Special You', icon: '💌' },
    { id: 'photo-scrapbook-section', label: 'Memories', icon: '📸' },
    { id: 'future-wishes-section', label: 'Wishes', icon: '🌈' },
    { id: 'love-letter-section', label: 'Letter', icon: '🌹' },
    { id: 'final-celebration-section', label: 'Party', icon: '🎉' },
  ];

  const scrollTo = (id) => {
    playPopSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top subtle pink gradient progress line */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-pink-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#FF5C93] via-[#FF8CB4] to-[#FFA07A] transition-all duration-200"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating Bottom Quick Nav Pill on mobile & desktop */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/90 shadow-lg flex items-center gap-1 sm:gap-2 max-w-[94vw] overflow-x-auto select-none no-scrollbar">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-['Comfortaa'] font-bold text-[#7A4B5D] hover:text-[#FF5C93] hover:bg-pink-50 transition-all whitespace-nowrap min-h-[36px] cursor-pointer"
            title={sec.label}
          >
            <span>{sec.icon}</span>
            <span className="hidden sm:inline text-[11px]">{sec.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
