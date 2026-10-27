import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { playPopSound, playSparkleSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function SpecialCards() {
  // Track open state for each card independently (do not force open all at once)
  const [openCardId, setOpenCardId] = useState(null);
  const { specialCards } = birthdayData;

  const toggleCard = (id) => {
    if (openCardId === id) {
      setOpenCardId(null);
      playPopSound();
    } else {
      setOpenCardId(id);
      playSparkleSound();
    }
  };

  return (
    <section 
      id="special-cards-section" 
      className="relative py-20 px-4 max-w-4xl mx-auto flex flex-col items-center"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-pink-200 mb-3"
      >
        <span className="text-lg">💌</span>
        <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider">
          From the Deepest Corner of My Heart
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold text-center mb-4"
      >
        Why You Are So Special to Me 💗
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Nunito'] text-base sm:text-lg text-[#7A4B5D] text-center max-w-md mx-auto mb-10 font-semibold"
      >
        Tap each cute card below to unfold what makes you so irreplaceable, Honey.
      </motion.p>

      {/* Grid of Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {specialCards.map((card, index) => {
          const isOpen = openCardId === card.id;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              layout
              className={`cute-card relative rounded-3xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border-2 ${
                isOpen 
                  ? 'border-pink-400 shadow-xl bg-white/95 ring-4 ring-pink-100' 
                  : 'border-pink-200/80 hover:border-pink-300 shadow-md hover:shadow-lg'
              }`}
              onClick={() => toggleCard(card.id)}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 flex items-center justify-center text-2xl shadow-inner border border-pink-200">
                    {card.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-['Comfortaa'] font-bold text-[#FF5C93] uppercase tracking-wider block">
                      {card.tag} • {card.nickname}
                    </span>
                    <h3 className="font-['Fredoka'] text-lg sm:text-xl text-[#4A2835] font-bold">
                      {card.title}
                    </h3>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-[#FF5C93]"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Collapsed Teaser */}
              {!isOpen && (
                <p className="font-['Nunito'] text-sm text-[#7A4B5D] flex items-center justify-between pt-1">
                  <span>{card.teaser}</span>
                  <span className="text-xs font-bold text-[#FF5C93] underline ml-2">Tap to read</span>
                </p>
              )}

              {/* Expanded Full Message */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden pt-3 border-t border-pink-100 mt-2"
                  >
                    <p className="font-['Nunito'] text-base text-[#4A2835] leading-relaxed font-semibold">
                      {card.message}
                    </p>

                    <div className="mt-4 pt-3 flex items-center justify-between text-xs text-[#FF5C93] font-['Comfortaa'] font-bold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-[#FF5C93]" />
                        Always & Forever
                      </span>
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        My Honey
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
