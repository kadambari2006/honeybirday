import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Wind, RotateCcw, Heart, ChevronDown } from 'lucide-react';
import { playBlowSound, playSparkleSound, playPopSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [isBlowing, setIsBlowing] = useState(false);
  const [hasBlownOut, setHasBlownOut] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const { cake } = birthdayData;

  const handleBlowCandles = () => {
    if (isBlowing || hasBlownOut) return;
    setIsBlowing(true);
    playBlowSound();

    // Sequentially extinguish candles
    candlesLit.forEach((_, index) => {
      setTimeout(() => {
        setCandlesLit(prev => {
          const next = [...prev];
          next[index] = false;
          return next;
        });
      }, index * 200);
    });

    // When the last candle goes out:
    setTimeout(() => {
      setShowSmoke(true);
      setHasBlownOut(true);
      setIsBlowing(false);
      playSparkleSound();

      // Confetti burst for Rathika!
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#FF5C93', '#FFD6E7', '#FFC7AD', '#E7DFFF', '#FFD700'],
      });
    }, candlesLit.length * 200 + 100);

    // Hide smoke after 2.5s
    setTimeout(() => {
      setShowSmoke(false);
    }, candlesLit.length * 200 + 2600);
  };

  const handleRelight = () => {
    playPopSound();
    playSparkleSound();
    setCandlesLit([true, true, true, true, true]);
    setHasBlownOut(false);
    setShowSmoke(false);
  };

  const scrollToNext = () => {
    playPopSound();
    const nextEl = document.getElementById('special-cards-section');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="birthday-cake-section" 
      className="relative min-h-[90svh] py-16 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFF8F0] via-[#FFD6E7]/30 to-[#FFF8F0] overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute w-80 h-80 rounded-full bg-pink-100/60 blur-3xl -z-10 pointer-events-none" />

      {/* Section Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-pink-200 mb-4"
      >
        <span className="text-lg">🎂</span>
        <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider">
          {cake.badge}
        </span>
      </motion.div>

      {/* Headings */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold mb-3"
      >
        {cake.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-['Comfortaa'] text-base sm:text-lg text-[#7A4B5D] max-w-md mx-auto mb-10 font-semibold"
      >
        {cake.instruction}
      </motion.p>

      {/* THE INTERACTIVE BIRTHDAY CAKE */}
      <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex flex-col items-center justify-end select-none my-2">
        {/* Cake Stand */}
        <div className="absolute bottom-0 w-64 sm:w-72 h-4 bg-gradient-to-r from-pink-200 via-white to-pink-200 rounded-full shadow-lg border border-pink-300/60 z-0" />
        <div className="absolute -bottom-3 w-32 h-4 bg-gradient-to-b from-pink-100 to-pink-200 rounded-b-xl shadow-md z-0" />

        {/* CANDLES ROW */}
        <div className="absolute top-8 sm:top-6 z-30 flex justify-center items-end gap-5 sm:gap-6 w-full px-8">
          {candlesLit.map((isLit, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* Flame or Smoke */}
              <div className="h-10 flex items-end justify-center relative">
                {isLit ? (
                  <motion.div
                    className="relative"
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1.1],
                      scaleX: [1, 0.9, 1.05, 0.95],
                      rotate: [-1, 2, -2, 1],
                    }}
                    transition={{
                      duration: 0.6 + (i * 0.1),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Glowing outer halo */}
                    <div className="absolute -inset-2 bg-amber-400/40 rounded-full blur-md animate-pulse" />
                    {/* Flame Body */}
                    <div className="relative w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-amber-100 shadow-[0_0_12px_#ffb703] border-t border-amber-100" />
                    {/* Inner Blue Core */}
                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-blue-400/80 rounded-full blur-[0.5px]" />
                  </motion.div>
                ) : (
                  showSmoke && (
                    <div className="relative w-2 h-8">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6 bg-gray-400/40 rounded-full blur-sm animate-smoke" />
                      <div className="text-[10px] text-gray-400 absolute -top-2 left-1/2 -translate-x-1/2 animate-bounce">
                        💨
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Candle Wick */}
              <div className="w-0.5 h-2.5 bg-neutral-700" />

              {/* Candle Stick */}
              <div 
                className="w-3.5 h-12 rounded-t-sm shadow-sm flex flex-col justify-between overflow-hidden border border-pink-300"
                style={{
                  background: i % 2 === 0 
                    ? 'repeating-linear-gradient(45deg, #FF5C93, #FF5C93 4px, #FFFFFF 4px, #FFFFFF 8px)'
                    : 'repeating-linear-gradient(45deg, #A78BFA, #A78BFA 4px, #FFFFFF 4px, #FFFFFF 8px)'
                }}
              />
            </div>
          ))}
        </div>

        {/* TIER 1 (Top Layer) */}
        <div className="relative w-44 sm:w-48 h-18 bg-gradient-to-b from-[#FFF5F8] to-[#FFE0EB] rounded-2xl shadow-md border-2 border-pink-200 z-20 flex flex-col items-center">
          {/* Frosting Drips Top */}
          <div className="w-full flex justify-around px-2 pt-1 text-xs">
            <span>🍓</span>
            <span>✨</span>
            <span>🍓</span>
            <span>✨</span>
            <span>🍓</span>
          </div>
          {/* Wavy Frosting */}
          <div className="absolute -bottom-2 w-full flex justify-between px-1">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-6 h-3 bg-white rounded-b-full shadow-inner border-b border-pink-200" />
            ))}
          </div>
        </div>

        {/* TIER 2 (Bottom Layer) */}
        <div className="relative w-56 sm:w-64 h-24 bg-gradient-to-b from-[#FFF8F0] via-[#FFD6E7] to-[#FFBFD3] rounded-2xl shadow-xl border-2 border-pink-200 z-10 flex flex-col justify-between p-2">
          {/* Sprinkles on cake */}
          <div className="flex justify-around items-center px-4 pt-2">
            <span className="w-1.5 h-3 bg-pink-500 rounded-full rotate-12 inline-block" />
            <span className="w-1.5 h-3 bg-yellow-400 rounded-full -rotate-45 inline-block" />
            <span className="w-1.5 h-3 bg-purple-400 rounded-full rotate-45 inline-block" />
            <span className="w-1.5 h-3 bg-rose-400 rounded-full -rotate-12 inline-block" />
            <span className="w-1.5 h-3 bg-amber-400 rounded-full rotate-90 inline-block" />
            <span className="w-1.5 h-3 bg-indigo-400 rounded-full rotate-30 inline-block" />
          </div>

          {/* Decorative Honey Badge on Cake */}
          <div className="self-center px-4 py-1 rounded-full bg-white/90 shadow-sm border border-pink-200 text-[#FF5C93] font-['Caveat'] text-lg font-bold">
            Honey 💗 Rathi
          </div>

          {/* Bottom Pearls */}
          <div className="flex justify-between px-1">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className="w-5 h-2.5 bg-white/90 rounded-full shadow-sm" />
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE CONTROLS */}
      <div className="mt-8 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!hasBlownOut ? (
            <motion.div
              key="blow-btn-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <button
                onClick={handleBlowCandles}
                disabled={isBlowing}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C93] via-[#FF75A0] to-[#FFA07A] text-white font-['Fredoka'] text-lg sm:text-xl font-bold shadow-xl shadow-pink-400/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer min-h-[50px]"
                aria-label={cake.blowButton}
              >
                <span>{cake.blowButton}</span>
                <Wind className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            /* Wish granted card */
            <motion.div
              key="success-wish-container"
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="cute-card max-w-lg mx-auto p-6 sm:p-8 rounded-3xl text-center shadow-xl border-2 border-pink-200 mt-2"
            >
              {/* Birthday Girl Surprise Wish Photo */}
              <div className="relative w-36 h-36 mx-auto mb-4 rounded-2xl overflow-hidden shadow-md border-4 border-white rotate-2">
                <img
                  src={cake.wishPhoto}
                  alt="Rathika Making a Wish"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1 right-1 text-base">🎈</div>
              </div>

              <h3 className="font-['Fredoka'] text-2xl sm:text-3xl text-[#FF5C93] font-bold mb-3">
                {cake.successHeading}
              </h3>

              <p className="font-['Nunito'] text-base sm:text-lg text-[#4A2835] font-semibold leading-relaxed mb-6">
                {cake.successMessage}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleRelight}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 text-[#7A4B5D] font-['Comfortaa'] text-sm font-bold border border-pink-200 shadow-sm transition-all active:scale-95 min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4 text-[#FF5C93]" />
                  <span>{cake.relightButton}</span>
                </button>

                <button
                  onClick={scrollToNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF5C93] to-[#FF8CB4] text-white font-['Fredoka'] text-base font-bold shadow-md shadow-pink-300/40 hover:scale-105 active:scale-95 transition-all min-h-[44px]"
                >
                  <span>{cake.nextButton}</span>
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
