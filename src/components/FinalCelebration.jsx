import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowUp, PartyPopper } from 'lucide-react';
import { playSparkleSound, playPopSound, playHugSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function FinalCelebration({ onReplayCelebration }) {
  const { finalCelebration } = birthdayData;
  const [kissBursts, setKissBursts] = useState([]);

  const launchFireworks = () => {
    playSparkleSound();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF5C93', '#FFD6E7', '#FFD700', '#E7DFFF', '#E11D48'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF5C93', '#FFD6E7', '#FFD700', '#E7DFFF', '#E11D48'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handlePhotoKissClick = () => {
    playHugSound();
    playSparkleSound();

    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FF5C93', '#FF8CB4', '#E11D48', '#FFC7AD'],
    });

    const newKisses = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70,
      y: 60 + Math.random() * 20,
      emoji: ['💋', '😘', '💗', '💖', '🥰'][i % 5],
    }));

    setKissBursts((prev) => [...prev, ...newKisses]);
    setTimeout(() => {
      setKissBursts((prev) => prev.filter((k) => !newKisses.includes(k)));
    }, 2400);
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
      className="relative min-h-[100svh] py-20 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#FFF8F0] via-[#E7DFFF]/40 to-[#FFD6E7]/80 overflow-hidden"
    >
      {/* Floating Kisses & Hearts Overlay */}
      {kissBursts.map((kiss) => (
        <motion.div
          key={kiss.id}
          initial={{ opacity: 1, scale: 0.6, y: 0 }}
          animate={{ opacity: 0, scale: 2, y: -260 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          style={{ left: `${kiss.x}%` }}
          className="fixed bottom-24 z-50 pointer-events-none text-4xl sm:text-5xl select-none"
        >
          {kiss.emoji}
        </motion.div>
      ))}

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
        className="cute-card relative z-20 max-w-2xl mx-auto p-6 sm:p-12 rounded-3xl text-center shadow-2xl border-2 border-pink-200/90 bg-white/95"
      >
        {/* Crown Badge */}
        <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-3xl mb-5 shadow-inner border border-pink-200 animate-bounce">
          👑
        </div>

        {/* Big Playful Heading */}
        <h2 className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold tracking-tight mb-4 drop-shadow-sm leading-tight">
          {finalCelebration.heading}
        </h2>

        {/* Loving Blessing Quote */}
        <p className="font-['Comfortaa'] text-base sm:text-lg md:text-xl text-[#4A2835] font-bold leading-relaxed mb-6">
          “{finalCelebration.quote}”
        </p>

        {/* SPECIAL GRAND FINALE: RATHIKA & KADAMBARI'S PHOTO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={handlePhotoKissClick}
          className="relative group my-6 cursor-pointer select-none"
        >
          {/* Glowing Aura Behind Photo */}
          <div className="absolute -inset-2.5 bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 rounded-3xl blur-xl opacity-65 group-hover:opacity-90 transition-opacity" />

          {/* Polaroid Frame */}
          <div className="polaroid-frame relative p-4 sm:p-5 pb-6 rounded-3xl bg-white shadow-2xl border-4 border-white max-w-[320px] sm:max-w-[380px] mx-auto transform hover:scale-102 transition-all duration-300">
            {/* Washi tape on top */}
            <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-7 bg-pink-300/90 rounded-sm shadow-sm flex items-center justify-center z-10">
              <span className="text-xs font-['Caveat'] text-pink-800 font-bold">
                Rathika & Kadambari 💗
              </span>
            </div>

            {/* Corner Badges */}
            <div className="absolute -bottom-3 -right-3 text-3xl z-10 animate-bounce">
              💋
            </div>
            <div className="absolute -top-3 -left-3 text-3xl z-10">
              💖
            </div>

            {/* Photo Canvas */}
            <div className="relative aspect-[3.8/4.5] w-full rounded-2xl overflow-hidden bg-pink-50 shadow-inner border border-pink-100">
              <img
                src={finalCelebration.ourPhoto}
                alt="Kadambari and Rathika"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay with tap hint */}
              <div className="absolute bottom-2 inset-x-0 text-center px-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#FF5C93] font-['Caveat'] text-base sm:text-lg font-bold shadow-md">
                  Tap for sweet kisses! 💋😘
                </span>
              </div>
            </div>

            {/* Passionate Dedication & Kissing Emojis */}
            <div className="mt-4 text-center space-y-1">
              <p className="font-['Fredoka'] text-2xl sm:text-3xl text-rose-600 font-bold tracking-tight">
                {finalCelebration.loveDeclaration}
              </p>
              <p className="font-['Caveat'] text-2xl sm:text-3xl text-[#FF5C93] font-bold">
                {finalCelebration.signature}
              </p>
            </div>
          </div>
        </motion.div>

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
      <div className="relative z-10 mt-10 text-center text-xs font-['Comfortaa'] text-[#7A4B5D] font-semibold space-y-1">
        <p className="flex items-center justify-center gap-1.5 text-sm font-bold text-[#FF5C93]">
          Made with all my heart for Honey 💗 By Kadambari 💋
        </p>
        <p className="text-[11px] text-[#7A4B5D]">
          Forever & Always • 2026
        </p>
      </div>
    </section>
  );
}
