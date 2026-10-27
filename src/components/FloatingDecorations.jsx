import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { playSparkleSound } from '../utils/sound';

export default function FloatingDecorations() {
  // Generate random decorative elements
  const elements = useMemo(() => {
    const emojis = ['💗', '✨', '🌸', '🦋', '⭐', '🌷', '🎀', '🧁', '💕'];
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 19 + 7) % 94}%`,
      top: `${(i * 23 + 5) % 90}%`,
      size: 14 + (i % 5) * 6,
      duration: 5 + (i % 4) * 2,
      delay: (i % 6) * 0.8,
      opacity: 0.35 + (i % 4) * 0.15,
    }));
  }, []);

  const handleClick = (e) => {
    playSparkleSound();
    const target = e.currentTarget;
    target.style.transform = 'scale(1.8) rotate(20deg)';
    setTimeout(() => {
      if (target) target.style.transform = '';
    }, 400);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute cursor-pointer pointer-events-auto select-none transition-transform duration-300"
          style={{
            left: el.left,
            top: el.top,
            fontSize: `${el.size}px`,
            opacity: el.opacity,
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={handleClick}
          title="Tap me for a sparkle! ✨"
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
}
