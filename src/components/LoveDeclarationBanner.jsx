import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSparkleSound, playHugSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function LoveDeclarationBanner() {
  const { loveBanner } = birthdayData;

  const triggerLoveExplosion = () => {
    playHugSound();
    playSparkleSound();

    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#FF5C93', '#FFD6E7', '#FF8CB4', '#FFC7AD', '#E11D48'],
    });
  };

  return (
    <div className="relative py-8 px-4 max-w-4xl mx-auto my-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={triggerLoveExplosion}
        className="relative group rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FF5C93] via-[#FF75A0] to-[#FFA07A] text-white shadow-2xl shadow-pink-500/25 border-4 border-white cursor-pointer overflow-hidden transform hover:scale-102 transition-all duration-300 text-center"
      >
        {/* Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Floating Heart Badges */}
        <div className="absolute top-3 left-4 text-2xl animate-bounce">
          🎈
        </div>
        <div className="absolute bottom-3 right-4 text-2xl animate-bounce">
          🎈
        </div>
        <div className="absolute top-3 right-5 text-2xl animate-pulse">
          💖
        </div>
        <div className="absolute bottom-3 left-5 text-2xl animate-pulse">
          🏡
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/25 backdrop-blur-md text-xs sm:text-sm font-['Comfortaa'] font-bold mb-3 shadow-inner">
          <Heart className="w-3.5 h-3.5 fill-white text-white animate-pulse" />
          <span>A Special Note From My Heart</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
        </div>

        {/* Big Heartfelt Shoutout */}
        <h2 className="font-['Fredoka'] text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md mb-2 leading-tight">
          {loveBanner.shout}
        </h2>

        {/* "My Honey, My Home" Subtitle */}
        <p className="font-['Caveat'] text-2xl sm:text-3xl text-amber-100 font-bold drop-shadow">
          {loveBanner.tagline}
        </p>

        <p className="font-['Comfortaa'] text-[11px] sm:text-xs text-white/90 mt-3 font-semibold">
          Tap here for a burst of love! 💗
        </p>
      </motion.div>
    </div>
  );
}
