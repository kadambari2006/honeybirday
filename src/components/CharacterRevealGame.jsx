import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, CheckCircle2, RotateCcw, PartyPopper, Award } from 'lucide-react';
import { playPopSound, playSparkleSound, playHugSound } from '../utils/sound';

export default function CharacterRevealGame() {
  const traits = [
    {
      id: 1,
      title: "You Are Wonderfully Kind 🌹",
      subtitle: "A Heart of Pure Gold",
      hint: "What makes Honey so deeply loved by everyone?",
      characterText: "You are genuinely kind, thoughtful, and tender-hearted. You care for people with complete sincerity, and your sweetness leaves an unforgettable mark on everyone who knows you.",
      balloonColor: {
        body: "#FF5C93",
        light: "#FFA3C4",
        border: "border-pink-300",
        badge: "bg-pink-100 text-[#FF5C93]",
      },
      emoji: "🌹",
      image: "/photos/rathika-game-1.jpg",
      photoCaption: "My Kind & Sweet Honey 💗",
      photoSub: "Holding roses, but you are the sweetest flower",
    },
    {
      id: 2,
      title: "You Are Pure Sunshine ☀️",
      subtitle: "Radiant & Uplifting Energy",
      hint: "Why does the room light up whenever Honey arrives?",
      characterText: "You have a natural radiance that brightens up even the cloudiest days. Your optimism, warm aura, and vibrant spirit bring so much cheer and happiness into the world.",
      balloonColor: {
        body: "#F59E0B",
        light: "#FDE68A",
        border: "border-amber-300",
        badge: "bg-amber-100 text-amber-700",
      },
      emoji: "☀️",
      image: "/photos/rathika-game-2.jpg",
      photoCaption: "Golden Sunshine Rathi ✨",
      photoSub: "A smile brighter than a summer morning",
    },
    {
      id: 3,
      title: "You Are Peaceful & Graceful 🕊️",
      subtitle: "Comfort That Feels Like Home",
      hint: "What is Honey's quiet, calming superpower?",
      characterText: "You carry a serene peace inside you. Being near you feels relaxing, safe, and honest. You don't need to try — your poise, grace, and grounded energy feel like a warm hug for the soul.",
      balloonColor: {
        body: "#8B5CF6",
        light: "#DDD6FE",
        border: "border-purple-300",
        badge: "bg-purple-100 text-purple-700",
      },
      emoji: "🕊️",
      image: "/photos/rathika-game-3.jpg",
      photoCaption: "Serene & Beautiful 💗",
      photoSub: "My Honey, my peace, my home",
    },
    {
      id: 4,
      title: "Your Laughter Is Pure Magic 🎂",
      subtitle: "Joy That Cannot Be Contained",
      hint: "What is the sweetest sound in the whole world?",
      characterText: "Your laugh is completely infectious! When you laugh freely with sparkling eyes and a wide smile, it is impossible not to smile with you. You make life feel like a celebration.",
      balloonColor: {
        body: "#EC4899",
        light: "#FBCFE8",
        border: "border-rose-300",
        badge: "bg-rose-100 text-rose-700",
      },
      emoji: "🎉",
      image: "/photos/rathika-game-4.jpg",
      photoCaption: "Unstoppable Birthday Joy ✨",
      photoSub: "Sparklers, cake & endless happiness",
    },
    {
      id: 5,
      title: "You Are Fun-Loving & Real 🍕",
      subtitle: "Genuinely & Unapologetically YOU",
      hint: "What makes Honey so wonderfully special to be around?",
      characterText: "You love good food, good laughs, and genuine moments. You never pretend to be someone you're not. You are authentic, delightfully playful, and living life on your own terms.",
      balloonColor: {
        body: "#10B981",
        light: "#A7F3D0",
        border: "border-emerald-300",
        badge: "bg-emerald-100 text-emerald-700",
      },
      emoji: "🍕",
      image: "/photos/rathika-game-5.jpg",
      photoCaption: "The Cutest Foodie Smile 💗",
      photoSub: "Pizza, happy memories & the real you",
    },
  ];

  const [activeTrait, setActiveTrait] = useState(null); // When reading the trait card
  const [poppedIds, setPoppedIds] = useState([]); // Array of popped trait IDs

  const handleSelectBalloon = (trait) => {
    playSparkleSound();
    setActiveTrait(trait);
  };

  const handlePopBalloon = (trait) => {
    playPopSound();
    playHugSound();

    if (!poppedIds.includes(trait.id)) {
      setPoppedIds((prev) => [...prev, trait.id]);
    }

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FF5C93', '#FFD6E7', '#FBBF24', '#C084FC', '#34D399'],
    });
  };

  const handleResetGame = () => {
    playPopSound();
    setPoppedIds([]);
    setActiveTrait(null);
  };

  const progressPercent = Math.round((poppedIds.length / traits.length) * 100);

  return (
    <section 
      id="honey-traits-game" 
      className="relative py-20 px-4 max-w-5xl mx-auto flex flex-col items-center"
    >
      {/* Game Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 shadow-sm border border-pink-200 mb-3"
      >
        <PartyPopper className="w-4 h-4 text-[#FF5C93]" />
        <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider">
          Honey's Interactive Pop Game 🎈
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold text-center mb-3"
      >
        Pop to Discover: What Makes Honey Special? 💗
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-['Nunito'] text-base sm:text-lg text-[#7A4B5D] text-center max-w-lg mx-auto mb-6 font-semibold"
      >
        Tap each mystery balloon below to discover a special truth about your character, then pop it to reveal the memory photo!
      </motion.p>

      {/* Progress tracker */}
      <div className="w-full max-w-md bg-white/90 p-3 rounded-2xl shadow-sm border border-pink-200 mb-10 flex items-center gap-3">
        <span className="text-sm font-['Comfortaa'] font-bold text-[#FF5C93] whitespace-nowrap">
          {poppedIds.length} / {traits.length} Popped
        </span>
        <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#FF5C93] to-[#FFA07A] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {poppedIds.length === traits.length ? (
          <span className="text-xl animate-bounce">🏆</span>
        ) : (
          <span className="text-base">🎈</span>
        )}
      </div>

      {/* BALLOONS ROW / GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 w-full mb-8">
        {traits.map((t, index) => {
          const isPopped = poppedIds.includes(t.id);
          const isSelected = activeTrait?.id === t.id;

          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelectBalloon(t)}
              className={`relative cursor-pointer group flex flex-col items-center p-3 rounded-3xl transition-all duration-300 ${
                isSelected 
                  ? 'scale-105 bg-pink-50/90 shadow-lg ring-2 ring-pink-400' 
                  : 'hover:scale-102 hover:bg-white/70'
              }`}
            >
              {/* Balloon Graphic */}
              <div className="relative w-24 h-32 flex flex-col items-center justify-center">
                {!isPopped ? (
                  /* UNPOPPED BALLOON */
                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 3 + (index * 0.4),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-20 h-24 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-white"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${t.balloonColor.light}, ${t.balloonColor.body})`,
                    }}
                  >
                    <span className="text-2xl drop-shadow">{t.emoji}</span>
                    <div className="absolute -bottom-1 w-2.5 h-2 bg-pink-400/80 rounded-b-sm" />
                    <div className="absolute -bottom-4 w-0.5 h-4 bg-gray-400/60" />
                  </motion.div>
                ) : (
                  /* POPPED BALLOON WITH PHOTO PREVIEW */
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="relative w-22 h-26 rounded-2xl overflow-hidden shadow-md border-2 border-white ring-2 ring-pink-300"
                  >
                    <img 
                      src={t.image} 
                      alt={t.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 right-1 bg-white/90 rounded-full p-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Balloon Label */}
              <div className="mt-2 text-center">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-['Comfortaa'] font-bold ${t.balloonColor.badge} mb-1`}>
                  {isPopped ? "Unlocked ✨" : "Tap Me 🎈"}
                </span>
                <p className="font-['Comfortaa'] text-xs font-bold text-[#4A2835] line-clamp-1">
                  {t.title.split(' ')[2] || t.title}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ACTIVE MODAL / REVEAL CARD */}
      <AnimatePresence mode="wait">
        {activeTrait && (
          <motion.div
            key={activeTrait.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl cute-card rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-300 bg-white/98 text-center relative"
          >
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-[#FF5C93] text-xs font-['Comfortaa'] font-bold mb-4">
              <span>{activeTrait.emoji}</span>
              <span>{activeTrait.subtitle}</span>
            </div>

            {/* Character Trait Title */}
            <h3 className="font-['Fredoka'] text-2xl sm:text-3xl text-[#FF5C93] font-bold mb-3">
              {activeTrait.title}
            </h3>

            {/* The Touching Character Description */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 mb-6 text-left">
              <p className="font-['Nunito'] text-base sm:text-lg text-[#4A2835] font-semibold leading-relaxed">
                “{activeTrait.characterText}”
              </p>
            </div>

            {/* POP BUTTON OR POPPED PHOTO REVEAL */}
            {!poppedIds.includes(activeTrait.id) ? (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handlePopBalloon(activeTrait)}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5C93] via-[#FF75A0] to-[#FFA07A] text-white font-['Fredoka'] text-lg font-bold shadow-xl shadow-pink-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[48px]"
                >
                  <span>Pop Balloon to Reveal Memory! 🎈</span>
                  <Sparkles className="w-5 h-5 text-yellow-200 group-hover:rotate-12 transition-transform" />
                </button>
                <span className="text-xs text-[#7A4B5D] mt-2 font-['Comfortaa']">
                  Tap to pop with confetti!
                </span>
              </div>
            ) : (
              /* THE REVEALED PHOTO */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                {/* Polaroid Frame */}
                <div className="polaroid-frame relative p-3 sm:p-4 pb-5 rounded-2xl bg-white shadow-xl border border-pink-200 max-w-[280px] sm:max-w-[320px] mx-auto transform -rotate-1">
                  <div className="washi-tape absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/90 rounded-sm flex items-center justify-center">
                    <span className="text-[10px] font-['Caveat'] text-pink-700 font-bold">
                      Memory Unlocked 💗
                    </span>
                  </div>

                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-pink-50 shadow-inner">
                    <img 
                      src={activeTrait.image} 
                      alt={activeTrait.photoCaption} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-3 text-center">
                    <p className="font-['Caveat'] text-2xl text-[#FF5C93] font-bold">
                      {activeTrait.photoCaption}
                    </p>
                    <p className="font-['Comfortaa'] text-xs text-[#7A4B5D] mt-0.5">
                      {activeTrait.photoSub}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs font-['Comfortaa'] text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Trait Unlocked & Added to Memories!</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Trophy when all 5 are popped */}
      {poppedIds.length === traits.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-pink-100 via-rose-100 to-amber-100 border-2 border-pink-300 text-center max-w-md shadow-lg"
        >
          <div className="text-4xl mb-2 animate-bounce">👑</div>
          <h4 className="font-['Fredoka'] text-2xl text-[#FF5C93] font-bold">
            All 5 Superpowers Unlocked!
          </h4>
          <p className="font-['Nunito'] text-sm sm:text-base text-[#4A2835] font-semibold mt-1">
            Rathika, you are kind, radiant, peaceful, full of joy, and beautifully real. Never change, Honey! 💗
          </p>
          <button
            onClick={handleResetGame}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#7A4B5D] hover:text-[#FF5C93] font-['Comfortaa'] text-xs font-bold border border-pink-200 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Again</span>
          </button>
        </motion.div>
      )}
    </section>
  );
}
