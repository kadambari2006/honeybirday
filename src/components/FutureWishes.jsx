import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ChevronDown, CheckCircle2 } from 'lucide-react';
import { playSparkleSound, playPopSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function FutureWishes() {
  const { futureWishes } = birthdayData;
  const [activeWishId, setActiveWishId] = useState("happiness");

  const handleSelectWish = (id) => {
    setActiveWishId(id);
    playSparkleSound();
  };

  return (
    <section 
      id="future-wishes-section" 
      className="relative py-20 px-4 max-w-5xl mx-auto flex flex-col items-center overflow-hidden"
    >
      {/* Decorative Pastel Rainbow Arc in background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-44 bg-gradient-to-r from-pink-200/40 via-purple-200/40 to-amber-200/40 rounded-t-full blur-2xl -z-10 pointer-events-none" />

      {/* Section Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-pink-200 mb-3"
      >
        <span className="text-lg">🌈</span>
        <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider">
          Blessings & Dreams Ahead
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold text-center mb-3 max-w-2xl"
      >
        {futureWishes.heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Nunito'] text-base sm:text-lg text-[#7A4B5D] text-center max-w-md mx-auto mb-10 font-semibold"
      >
        {futureWishes.subheading}
      </motion.p>

      {/* Interactive Tabs / Cloud Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 max-w-xl">
        {futureWishes.wishes.map((w) => {
          const isSelected = activeWishId === w.id;
          return (
            <button
              key={w.id}
              onClick={() => handleSelectWish(w.id)}
              className={`relative px-4 sm:px-5 py-2.5 rounded-full font-['Comfortaa'] text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer min-h-[44px] ${
                isSelected
                  ? 'bg-gradient-to-r from-[#FF5C93] to-[#FF8CB4] text-white shadow-lg shadow-pink-400/30 scale-105'
                  : 'bg-white/80 hover:bg-white text-[#7A4B5D] border border-pink-200 shadow-sm hover:scale-102'
              }`}
            >
              <span>{w.icon}</span>
              <span>{w.number}</span>
              {w.isSpecial && <span className="text-yellow-200 text-xs">✨</span>}
            </button>
          );
        })}
      </div>

      {/* ACTIVE WISH DISPLAY CARD */}
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {futureWishes.wishes.map((w) => {
            if (w.id !== activeWishId) return null;

            if (w.isSpecial) {
              // WISH 5: Elegant Letter-Style Card for Rathika's Love Story
              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-rose-300 bg-gradient-to-br from-white via-rose-50/70 to-pink-100/60 overflow-hidden"
                >
                  {/* Decorative glowing fairy lights */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300" />
                  <div className="absolute top-4 right-4 flex gap-1 text-rose-300">
                    <Heart className="w-5 h-5 fill-rose-200" />
                    <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-3xl shadow-md border border-rose-200">
                      💍
                    </div>
                    <div>
                      <span className="font-['Comfortaa'] text-xs font-bold text-rose-600 uppercase tracking-widest block">
                        {w.number} • {w.badge}
                      </span>
                      <h3 className="font-['Fredoka'] text-2xl sm:text-3xl text-rose-700 font-bold">
                        {w.title}
                      </h3>
                    </div>
                  </div>

                  {/* Message body formatted with paragraphs */}
                  <div className="font-['Nunito'] text-base sm:text-lg text-[#4A2835] font-semibold leading-relaxed space-y-4 bg-white/60 p-5 sm:p-6 rounded-2xl border border-rose-200/70 shadow-inner">
                    {w.message.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* Footer Seal */}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-rose-200/80">
                    <span className="font-['Caveat'] text-xl text-rose-600 font-bold">
                      With genuine respect & blessings for you, Honey 🌹
                    </span>
                    <span className="text-2xl">💗</span>
                  </div>
                </motion.div>
              );
            }

            // Normal Wish Cards
            return (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.35 }}
                className="cute-card relative rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-pink-200 bg-white/95"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-2xl shadow-inner border border-pink-200">
                    {w.icon}
                  </div>
                  <div>
                    <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider block">
                      {w.number} • {w.badge}
                    </span>
                    <h3 className="font-['Fredoka'] text-2xl sm:text-3xl text-[#FF5C93] font-bold">
                      {w.title}
                    </h3>
                  </div>
                </div>

                <p className="font-['Nunito'] text-base sm:text-lg text-[#4A2835] font-semibold leading-relaxed mb-6">
                  {w.message}
                </p>

                <div className="pt-4 border-t border-pink-100 flex items-center justify-between text-xs text-[#7A4B5D] font-['Comfortaa']">
                  <span className="flex items-center gap-1.5 text-[#FF5C93] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    A Wish for Rathika
                  </span>
                  <span>Tap next wish above ↑</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
