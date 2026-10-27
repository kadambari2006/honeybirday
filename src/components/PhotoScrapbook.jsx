import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Heart, Sparkles, ZoomIn, Camera, ImagePlus, Trash2 } from 'lucide-react';
import { playPopSound, playSparkleSound } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function PhotoScrapbook() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const { scrapbook } = birthdayData;
  const [photosList, setPhotosList] = useState(scrapbook.photos);

  // Load any extra user-uploaded photos from localStorage
  useEffect(() => {
    try {
      const savedCustom = localStorage.getItem('rathika_custom_photos');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotosList([...scrapbook.photos, ...parsed]);
        }
      }
    } catch (e) {
      // Ignore
    }
  }, [scrapbook.photos]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    playSparkleSound();
    const newPhotos = [];

    Array.from(files).forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoObj = {
          id: Date.now() + idx,
          caption: `My Honey 💗 #${photosList.length + idx + 1}`,
          subCaption: "Beautiful memory of Rathika",
          rotation: `${((idx % 5) - 2) * 1.5}deg`,
          sticker: ['🌸', '✨', '🦋', '🍯', '⭐', '🎀'][idx % 6],
          tapeColor: ['bg-pink-300/80', 'bg-purple-200/80', 'bg-amber-200/80', 'bg-rose-200/80'][idx % 4],
          image: event.target.result,
          date: "Special Moment",
          isCustom: true,
        };

        setPhotosList((current) => {
          const updated = [...current, photoObj];
          try {
            const customOnly = updated.filter(p => p.isCustom);
            localStorage.setItem('rathika_custom_photos', JSON.stringify(customOnly.slice(0, 10)));
          } catch (err) {}
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
    playPopSound();
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    playPopSound();
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % photosList.length);
    playPopSound();
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + photosList.length) % photosList.length);
    playPopSound();
  };

  return (
    <section 
      id="photo-scrapbook-section" 
      className="relative py-20 px-4 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 shadow-sm border border-pink-200 mb-3"
        >
          <Camera className="w-4 h-4 text-[#FF5C93]" />
          <span className="font-['Comfortaa'] text-xs font-bold text-[#FF5C93] uppercase tracking-wider">
            Memories & Smiles
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Fredoka'] text-3xl sm:text-4xl md:text-5xl text-[#FF5C93] font-bold mb-3"
        >
          {scrapbook.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['Nunito'] text-base sm:text-lg text-[#7A4B5D] max-w-lg mx-auto font-semibold"
        >
          {scrapbook.subtitle}
        </motion.p>

        {/* Action button to add more photos directly in the browser */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <label className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 text-[#FF5C93] font-['Comfortaa'] text-xs sm:text-sm font-bold border-2 border-dashed border-pink-300 shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[42px]">
            <ImagePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Add More Photos of Rathika 📸</span>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>

          <span className="text-[11px] font-['Comfortaa'] text-pink-500 bg-pink-100/70 border border-pink-200/60 px-3 py-1 rounded-full">
            💡 Tap any polaroid to zoom in!
          </span>
        </div>
      </div>

      {/* Scrapbook Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-2 sm:px-6">
        {photosList.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex flex-col items-center"
          >
            {/* Polaroid Card */}
            <div
              onClick={() => openLightbox(index)}
              style={{ transform: `rotate(${item.rotation})` }}
              className="polaroid-frame relative w-full max-w-[310px] p-4 pb-6 rounded-2xl cursor-pointer group select-none border border-pink-100"
            >
              {/* Decorative Washi Tape on top */}
              <div 
                className={`washi-tape absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 ${item.tapeColor} rounded-sm -rotate-2 z-10 flex items-center justify-center opacity-85`}
              >
                <span className="text-[11px] font-['Caveat'] text-neutral-600 font-bold">
                  {item.date}
                </span>
              </div>

              {/* Cute Sticker on corner */}
              <div className="absolute -bottom-2 -right-2 text-2xl z-10 drop-shadow-md group-hover:scale-125 transition-transform">
                {item.sticker}
              </div>

              {/* Photo Canvas */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-pink-50 shadow-inner flex items-center justify-center border border-neutral-100">
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = item.fallback || "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80";
                  }}
                />

                {/* Subtle hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-[#FF5C93]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-white/90 rounded-full shadow-lg text-[#FF5C93]">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="mt-4 text-center">
                <p className="font-['Caveat'] text-2xl text-[#4A2835] font-bold tracking-wide">
                  {item.caption}
                </p>
                <p className="font-['Comfortaa'] text-[11px] text-[#7A4B5D] mt-0.5">
                  {item.subCaption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all z-50 cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all z-50 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all z-50 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full shadow-2xl flex flex-col items-center border-4 border-pink-200"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-pink-50 shadow-md">
                <img
                  src={photosList[selectedPhotoIndex]?.image}
                  alt={photosList[selectedPhotoIndex]?.caption}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = photosList[selectedPhotoIndex]?.fallback || "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>

              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#FF5C93] text-xs font-['Comfortaa'] font-bold mb-2">
                  <span>{photosList[selectedPhotoIndex]?.sticker}</span>
                  <span>{photosList[selectedPhotoIndex]?.date}</span>
                </div>
                <h3 className="font-['Caveat'] text-3xl text-[#FF5C93] font-bold">
                  {photosList[selectedPhotoIndex]?.caption}
                </h3>
                <p className="font-['Nunito'] text-sm text-[#7A4B5D] mt-1 font-semibold">
                  {photosList[selectedPhotoIndex]?.subCaption}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between w-full pt-3 border-t border-pink-100 text-xs text-[#7A4B5D] font-['Comfortaa']">
                <span>Memory {selectedPhotoIndex + 1} of {photosList.length}</span>
                <span className="flex items-center gap-1 text-[#FF5C93]">
                  <Heart className="w-3.5 h-3.5 fill-[#FF5C93]" />
                  For Rathika
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
