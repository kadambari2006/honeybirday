import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function FloatingBalloonsBackground() {
  // Generate a rich set of continuously rising balloons with staggered paths
  const balloons = useMemo(() => {
    const colors = [
      { body: '#FF6B9E', light: '#FFA3C4', dark: '#E0487D' }, // Strawberry Pink
      { body: '#FF94B8', light: '#FFD1E0', dark: '#E56D94' }, // Baby Pink
      { body: '#C084FC', light: '#E9D5FF', dark: '#9333EA' }, // Lavender
      { body: '#F472B6', light: '#FBCFE8', dark: '#DB2777' }, // Rose Pink
      { body: '#FBBF24', light: '#FEF08A', dark: '#D97706' }, // Warm Gold
      { body: '#FB923C', light: '#FED7AA', dark: '#EA580C' }, // Soft Peach
    ];

    const messages = [
      "I LOVE YOUUUUUUU HONEYYYYYYYYYYYYYYY 💗",
      "My Honey, My Home 🏡💗",
      "Forever My Rathi ✨",
      "I love you so much Honeyyy 🦋",
      "My Home, My Everything 💖",
      "Happy Birthday Honey 🎂",
      "My Independent Beautiful Girl 🌷",
      "I Love You Honeyyyy 💗",
    ];

    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 4) % 92}%`,
      color: colors[i % colors.length],
      size: 52 + (i % 4) * 14, // 52px to 94px
      duration: 14 + (i % 5) * 3, // 14s to 26s
      delay: i * 1.3,
      swayAmount: 18 + (i % 3) * 12,
      message: i % 2 === 0 ? messages[(i / 2) % messages.length] : null,
      scale: 0.85 + (i % 3) * 0.15,
      opacity: 0.72 + (i % 3) * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute flex flex-col items-center"
          style={{
            left: b.left,
            bottom: '-120px',
            opacity: b.opacity,
          }}
          animate={{
            y: ['0vh', '-125vh'],
            x: [-b.swayAmount, b.swayAmount, -b.swayAmount],
            rotate: [-4, 5, -4],
          }}
          transition={{
            y: {
              duration: b.duration,
              repeat: Infinity,
              ease: "linear",
              delay: b.delay,
            },
            x: {
              duration: 4.5 + (b.id % 2),
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {/* Balloon SVG */}
          <div 
            className="relative flex items-center justify-center drop-shadow-md"
            style={{ width: `${b.size}px`, height: `${b.size * 1.25}px` }}
          >
            <svg viewBox="0 0 100 125" className="w-full h-full">
              <defs>
                <radialGradient id={`balloon-grad-${b.id}`} cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor={b.color.light} />
                  <stop offset="60%" stopColor={b.color.body} />
                  <stop offset="100%" stopColor={b.color.dark} />
                </radialGradient>
              </defs>

              {/* Balloon Oval Body */}
              <path
                d="M50 0 C22 0 0 24 0 54 C0 78 28 98 46 108 L44 114 L56 114 L54 108 C72 98 100 78 100 54 C100 24 78 0 50 0 Z"
                fill={`url(#balloon-grad-${b.id})`}
              />

              {/* Sheen Highlight */}
              <ellipse
                cx="30"
                cy="30"
                rx="14"
                ry="22"
                fill="#FFFFFF"
                opacity="0.32"
                transform="rotate(-25 30 30)"
              />

              {/* Balloon String (Wavy Line) */}
              <path
                d="M50 114 Q40 135 55 155 T48 185 T52 210"
                fill="none"
                stroke="#D1A3B8"
                strokeWidth="1.8"
                opacity="0.75"
              />
            </svg>

            {/* Little Heart on Center of Balloon */}
            <div className="absolute inset-0 flex items-center justify-center -translate-y-2 pointer-events-none">
              <span className="text-white/70 text-xs sm:text-sm drop-shadow">💗</span>
            </div>
          </div>

          {/* Attached Ribbon Banner with Message */}
          {b.message && (
            <div className="mt-8 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-pink-300 shadow-md whitespace-nowrap transform -rotate-2">
              <p className="font-['Caveat'] text-xs sm:text-sm font-bold text-[#FF5C93] tracking-wider drop-shadow-xs">
                {b.message}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
