import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Eye, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playSparkleSound, playHugSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function LoveLetter({ onMoodChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [hugBursts, setHugBursts] = useState([]);

  const { personalLetter } = birthdayData;
  const paragraphs = personalLetter.paragraphs;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    playPopSound();
    playSparkleSound();
    if (onMoodChange) onMoodChange('emotional');

    // Gradual paragraph reveal
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealedParagraphs(count);
      if (count >= paragraphs.length) {
        clearInterval(interval);
        setIsFullyRevealed(true);
      }
    }, 750);
  };

  const handleRevealAll = (e) => {
    e.stopPropagation();
    setRevealedParagraphs(paragraphs.length);
    setIsFullyRevealed(true);
    playSparkleSound();
  };

  const handleSendHugs = () => {
    playHugSound();

    // Trigger visual confetti of hearts
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      shapes: ['star'],
      colors: ['#FF5C93', '#FFD6E7', '#FF8CB4', '#FFC7AD'],
    });

    // Spawn floating hug emojis on screen
    const newHugs = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      y: 60 + Math.random() * 20,
      emoji: i % 2 === 0 ? '🫂' : '💗',
    }));

    setHugBursts(prev => [...prev, ...newHugs]);

    setTimeout(() => {
      setHugBursts(prev => prev.filter(h => !newHugs.includes(h)));
    }, 2500);
  };

  return (
    <section 
      id="love-letter-section" 
      className="relative py-20 px-4 max-w-3xl mx-auto flex flex-col items-center"
    >
      {/* Flying hugs overlay */}
      {hugBursts.map((hug) => (
        <motion.div
          key={hug.id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 1.8, y: -240 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          style={{ left: `${hug.x}%` }}
          className="fixed bottom-20 z-50 pointer-events-none text-4xl select-none"
        >
          {hug.emoji}
        </motion.div>
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-pink-200 mb-3"
      >
        <span className="text-lg">💌</span>
        <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider">
          {personalLetter.badge}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold text-center mb-3"
      >
        {personalLetter.teaserTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Comfortaa'] text-base sm:text-lg text-[#7A4B5D] text-center max-w-md mx-auto mb-10 font-semibold"
      >
        {personalLetter.teaserSubtitle}
      </motion.p>

      {/* SEALED ENVELOPE / OPENED LETTER CONTAINER */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* SEALED ENVELOPE */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              onClick={handleOpenEnvelope}
              className="relative w-full max-w-md mx-auto bg-gradient-to-br from-[#FFEAF2] to-[#FFD6E7] rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-white cursor-pointer group flex flex-col items-center text-center select-none transform hover:scale-102 transition-all duration-300"
            >
              {/* Envelope Flap Triangle Representation */}
              <div className="absolute top-0 inset-x-0 h-28 bg-[#FFC5DC] rounded-t-3xl shadow-sm clip-triangle flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF5C93] to-[#E11D48] text-white flex items-center justify-center shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 fill-white" />
                </div>
              </div>

              <div className="mt-28 space-y-3">
                <span className="font-['Comfortaa'] text-xs uppercase tracking-widest text-[#FF5C93] font-bold">
                  Wax Heart Seal Attached
                </span>
                <h3 className="font-['Caveat'] text-3xl sm:text-4xl text-[#4A2835] font-bold">
                  For Honey, With All My Care
                </h3>
                <p className="font-['Nunito'] text-sm text-[#7A4B5D] font-semibold">
                  {personalLetter.envelopeLabel}
                </p>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#FF5C93] font-['Fredoka'] text-sm font-bold shadow-md group-hover:shadow-lg transition-all min-h-[44px]">
                <Mail className="w-4 h-4" />
                <span>Open Rathika's Letter 💌</span>
              </div>
            </motion.div>
          ) : (
            /* OPENED LETTER EXPERIENCE */
            <motion.div
              key="opened-letter-sheet"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-pink-200 text-[#4A2835] overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(#FFEAF2 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Decorative top ribbon */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-pink-100">
                <div className="flex items-center gap-2 text-rose-500 font-['Caveat'] text-2xl font-bold">
                  <span>🌸</span>
                  <span>A Letter For My Rathi</span>
                </div>
                {!isFullyRevealed && (
                  <button
                    onClick={handleRevealAll}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#FF5C93] font-['Comfortaa'] text-xs font-bold transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read All Now</span>
                  </button>
                )}
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-5 font-['Nunito'] text-base sm:text-lg leading-relaxed font-semibold text-[#3D202C]">
                {paragraphs.map((p, idx) => {
                  const isVisible = idx < revealedParagraphs;
                  if (!isVisible) return null;

                  return (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={
                        idx === 0 
                          ? "font-['Caveat'] text-3xl sm:text-4xl text-[#FF5C93] font-bold" 
                          : idx === paragraphs.length - 1
                          ? "font-['Caveat'] text-2xl sm:text-3xl text-rose-600 font-bold pt-4 whitespace-pre-line"
                          : ""
                      }
                    >
                      {p}
                    </motion.p>
                  );
                })}
              </div>

              {/* Million Hugs Button */}
              <div className="mt-12 pt-6 border-t border-pink-200/80 flex flex-col items-center">
                <button
                  onClick={handleSendHugs}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5C93] via-[#FF75A0] to-[#FFA07A] text-white font-['Fredoka'] text-base sm:text-lg font-bold shadow-lg shadow-pink-400/30 hover:scale-105 active:scale-95 transition-all duration-300 min-h-[48px] cursor-pointer"
                >
                  <span>{personalLetter.hugButtonText}</span>
                  <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
                </button>
                <span className="text-[11px] font-['Comfortaa'] text-[#7A4B5D] mt-2 font-semibold">
                  Tap repeatedly for endless hugs & hearts! 💗
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
