import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift, ChevronDown, Music2 } from 'lucide-react';
import { playPopSound, playSparkleSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function WelcomeScreen({ onOpenSurprise, hasOpened }) {
  const [isOpening, setIsOpening] = useState(false);
  const { welcome, recipient } = birthdayData;

  const triggerConfettiBurst = () => {
    const colors = ['#FF5C93', '#FFD6E7', '#E7DFFF', '#FFC7AD', '#FFF8F0', '#FFB6C1', '#FFD700'];
    
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors,
      });
    }, 280);
  };

  const handleOpenClick = () => {
    if (hasOpened || isOpening) return;
    setIsOpening(true);
    playPopSound();
    playSparkleSound();
    triggerConfettiBurst();

    setTimeout(() => {
      onOpenSurprise();
    }, 1100);
  };

  const scrollToCake = () => {
    playPopSound();
    const cakeEl = document.getElementById('birthday-cake-section');
    if (cakeEl) {
      cakeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[100svh] flex flex-col items-center justify-center px-4 py-10 sm:py-16 overflow-hidden bg-gradient-to-b from-[#FFD6E7]/70 via-[#E7DFFF]/40 to-[#FFF8F0]">
      {/* Dreamy Background Aura */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[340px] md:w-[650px] h-[340px] md:h-[650px] bg-gradient-to-tr from-[#FFD6E7] to-[#FFC7AD]/60 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!hasOpened ? (
          <motion.div
            key="gift-box-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative z-20 flex flex-col items-center text-center max-w-lg mx-auto w-full"
          >
            {/* Cute floating badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-pink-200/80 mb-6"
            >
              <span className="text-xl">💌</span>
              <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] tracking-wide uppercase">
                A Special World for Rathika
              </span>
            </motion.div>

            {/* Gift Box / Surprise Container */}
            <div className="relative mb-8 cursor-pointer select-none" onClick={handleOpenClick}>
              {/* Pulsing glow under the gift */}
              <div className="absolute inset-0 bg-[#FF5C93]/25 rounded-full blur-2xl transform scale-125 animate-pulse" />

              <motion.div
                animate={isOpening ? {
                  scale: [1, 1.15, 0.95],
                  rotate: [0, -6, 6, -3, 0],
                } : {
                  y: [0, -10, 0],
                }}
                transition={isOpening ? { duration: 0.9 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-52 h-52 md:w-60 md:h-60 bg-gradient-to-br from-white via-pink-50 to-[#FFD6E7] rounded-3xl p-6 shadow-2xl border-4 border-white flex flex-col items-center justify-center transform group hover:scale-105 transition-all"
              >
                {/* Cute Ribbon across box */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-r from-[#FF5C93] to-[#FF8CB4] shadow-sm flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white text-[#FF5C93] flex items-center justify-center shadow font-bold text-sm">
                    🎀
                  </div>
                </div>
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-b from-[#FF5C93] to-[#FF8CB4] shadow-sm pointer-events-none" />

                {/* Center Bow & Sparkle */}
                <div className="relative z-10 w-22 h-22 rounded-2xl bg-white shadow-md border-2 border-pink-100 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Gift className="w-11 h-11 text-[#FF5C93]" />
                  </motion.div>
                </div>

                <div className="absolute -top-3 -right-3 text-2xl animate-bounce">
                  ✨
                </div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">
                  🌸
                </div>
              </motion.div>
            </div>

            {/* Introductory Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 px-4"
            >
              <h2 className="font-['Fredoka'] text-3xl md:text-4xl text-[#FF5C93] font-bold tracking-tight drop-shadow-sm">
                {welcome.whisper}
              </h2>
              <p className="font-['Comfortaa'] text-base md:text-lg text-[#4A2835] font-semibold leading-relaxed">
                {welcome.line1}
              </p>
              <p className="font-['Nunito'] text-sm md:text-base text-[#7A4B5D] max-w-sm mx-auto leading-relaxed">
                {welcome.line2}
              </p>
            </motion.div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-col items-center"
            >
              <button
                onClick={handleOpenClick}
                disabled={isOpening}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5C93] via-[#FF75A0] to-[#FFA07A] text-white font-['Fredoka'] text-lg md:text-xl font-semibold shadow-xl shadow-pink-400/30 hover:shadow-pink-400/50 hover:scale-105 active:scale-95 transition-all duration-300 min-h-[52px] cursor-pointer"
                aria-label={welcome.buttonText}
              >
                <span>{welcome.buttonText}</span>
                <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
              </button>

              <span className="flex items-center gap-1.5 text-xs text-[#7A4B5D] mt-3 font-['Comfortaa']">
                <Music2 className="w-3.5 h-3.5 text-[#FF5C93]" />
                Plays "Love Me Like You Do" 💗
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* REVEALED HERO WITH RATHIKA'S COVER IMAGE */
          <motion.div
            key="revealed-hero"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto w-full pt-4"
          >
            {/* Crown & Heart Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 shadow-md border border-pink-200 mb-4"
            >
              <span className="text-xl">👑</span>
              <span className="font-['Comfortaa'] text-xs md:text-sm font-bold text-[#FF5C93] tracking-wider uppercase">
                Happy Birthday, Rathika!
              </span>
              <Heart className="w-4 h-4 text-[#FF5C93] fill-[#FF5C93]" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-['Fredoka'] text-4xl sm:text-5xl md:text-6xl text-[#FF5C93] font-bold tracking-tight drop-shadow-sm leading-tight mb-4"
            >
              {welcome.mainHeading}
            </motion.h1>

            {/* RATHIKA'S COVER IMAGE CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="relative my-4 select-none group"
            >
              {/* Outer Glowing Halo */}
              <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition-opacity" />

              {/* Cover Polaroid / Princess Frame */}
              <div className="relative bg-white p-3.5 sm:p-5 rounded-3xl shadow-2xl border-4 border-white max-w-[340px] sm:max-w-[400px] mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                {/* Washi tape on top */}
                <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-pink-200/90 rounded-sm shadow-sm flex items-center justify-center z-10">
                  <span className="text-xs font-['Caveat'] text-pink-700 font-bold">
                    My Honey • Rathika 💗
                  </span>
                </div>

                {/* Floating Corner Badges */}
                <div className="absolute -bottom-3 -right-3 text-3xl drop-shadow-md z-10 animate-bounce">
                  🌸
                </div>
                <div className="absolute -top-3 -left-3 text-3xl drop-shadow-md z-10">
                  🦋
                </div>

                {/* The Photo */}
                <div className="relative aspect-[4/3.8] w-full rounded-2xl overflow-hidden bg-pink-50 shadow-inner border border-pink-100">
                  <img
                    src={recipient.coverImage}
                    alt="Rathika - My Honey"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Shimmer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                  
                  {/* Overlay text on bottom of photo */}
                  <div className="absolute bottom-2 inset-x-0 text-center px-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#FF5C93] font-['Caveat'] text-lg font-bold shadow-md">
                      That beautiful smile 💗
                    </span>
                  </div>
                </div>

                {/* Caption beneath photo */}
                <div className="mt-3 text-center">
                  <p className="font-['Caveat'] text-2xl sm:text-3xl text-[#4A2835] font-bold">
                    {recipient.coverCaption}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Subheading celebrating Rathika */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="font-['Nunito'] text-lg sm:text-xl md:text-2xl text-[#4A2835] font-semibold max-w-xl mx-auto leading-relaxed mb-6 px-2"
            >
              {welcome.subheading}
            </motion.p>

            {/* Quick action pill to scroll down */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col items-center"
            >
              <button
                onClick={scrollToCake}
                className="group flex flex-col items-center gap-2 px-6 py-3 rounded-full bg-white/95 hover:bg-white text-[#FF5C93] font-['Comfortaa'] text-sm md:text-base font-bold shadow-md hover:shadow-lg transition-all border border-pink-200 cursor-pointer min-h-[48px]"
              >
                <span>{welcome.scrollPrompt}</span>
                <ChevronDown className="w-5 h-5 text-[#FF5C93] group-hover:translate-y-1 transition-transform animate-bounce" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
