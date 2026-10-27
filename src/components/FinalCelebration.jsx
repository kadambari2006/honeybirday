import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowUp, PartyPopper, Cake } from 'lucide-react';
import { playSparkleSound, playPopSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function FinalCelebration({ onReplayCelebration }) {
  const { finalCelebration } = birthdayData;

  const launchFireworks = () => {
    playSparkleSound();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF5C93', '#FFD6E7', '#FFD700', '#E7DFFF'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF5C93', '#FFD6E7', '#FFD700', '#E7DFFF'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleCelebrateAgain = () => {
    playPopSound();
    launchFireworks();
    if (onReplayCelebration) {
      onReplayCelebration();
    }
  };

  const scrollToTop = () => {
    playPopSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      id="final-celebration-section" 
      className="relative min-h-[90svh] py-24 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFF8F0] via-[#E7DFFF]/40 to-[#FFD6E7]/70 overflow-hidden"
    >
      {/* Floating Pastel Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎈', '🌸', '✨', '🎈', '💖', '🎈'].map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute text-4xl sm:text-5xl opacity-40 select-none"
            style={{
              left: `${10 + idx * 16}%`,
              bottom: '-10%',
            }}
            animate={{
              y: [-20, -700],
              x: [-15, 15, -15],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 12 + idx * 2.5,
              repeat: Infinity,
              delay: idx * 2,
              ease: "linear",
            }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="cute-card relative z-20 max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl text-center shadow-2xl border-2 border-pink-200/90 bg-white/95"
      >
        {/* Crown Badge */}
        <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-6 shadow-inner border border-pink-200 animate-bounce">
          👑
        </div>

        {/* Big Playful Heading */}
        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold tracking-tight mb-6 drop-shadow-sm leading-tight">
          {finalCelebration.heading}
        </h2>

        {/* Loving Blessing Quote */}
        <p className="font-['Comfortaa'] text-lg sm:text-xl md:text-2xl text-[#4A2835] font-bold leading-relaxed mb-6">
          “{finalCelebration.quote}”
        </p>

        {/* Heartfelt Closing Note */}
        <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 border border-pink-200/80 mb-8 shadow-inner">
          <p className="font-['Caveat'] text-2xl sm:text-3xl text-[#FF5C93] font-bold">
            {finalCelebration.closing}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCelebrateAgain}
            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C93] via-[#FF75A0] to-[#FFA07A] text-white font-['Fredoka'] text-lg font-bold shadow-xl shadow-pink-400/30 hover:scale-105 active:scale-95 transition-all duration-300 min-h-[52px] cursor-pointer"
          >
            <span>{finalCelebration.replayButton}</span>
            <PartyPopper className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-pink-50 text-[#7A4B5D] font-['Comfortaa'] text-sm font-bold border border-pink-200 shadow-md transition-all active:scale-95 min-h-[52px] cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-[#FF5C93]" />
            <span>{finalCelebration.backToTopButton}</span>
          </button>
        </div>
      </motion.div>

      {/* Sweet Footer Signature */}
      <div className="relative z-10 mt-12 text-center text-xs font-['Comfortaa'] text-[#7A4B5D] font-semibold">
        <p className="flex items-center justify-center gap-1">
          Crafted with boundless affection for Rathika (My Honey) 💗
        </p>
      </div>
    </section>
  );
}
