import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles, Heart } from 'lucide-react';
import { proceduralPlayer } from '../utils/sound';
import { birthdayData } from '../data/birthdayContent';

export default function MusicPlayer({ isMusicPlaying, setIsMusicPlaying }) {
  const [volume, setVolume] = useState(0.55);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  // Initialize single continuous audio track: "Love Me Like You Do"
  useEffect(() => {
    const audio = new Audio(birthdayData.music.file);
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      proceduralPlayer.stop();
    };
  }, []);

  // Handle play/pause and volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const effectiveVolume = isMuted ? 0 : volume;
    audio.volume = effectiveVolume;

    if (isMusicPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fall back to soothing synthesizer if autoplay is blocked
          proceduralPlayer.setVolume(effectiveVolume);
          proceduralPlayer.start('emotional');
        });
      }
    } else {
      audio.pause();
      proceduralPlayer.stop();
    }
  }, [isMusicPlaying, volume, isMuted]);

  const togglePlay = () => {
    setIsMusicPlaying(prev => !prev);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <div 
        className={`cute-card flex items-center transition-all duration-300 rounded-full px-3 py-1.5 shadow-lg border border-pink-200/90 bg-white/95 backdrop-blur-md ${
          isExpanded ? 'max-w-xs' : 'max-w-[210px]'
        }`}
      >
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5C93] to-[#FF8CB4] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform cursor-pointer shrink-0"
          title={isMusicPlaying ? "Pause 'Love Me Like You Do'" : "Play 'Love Me Like You Do'"}
          aria-label="Toggle Music"
        >
          {isMusicPlaying ? (
            <Disc3 className="w-4 h-4 animate-spin" />
          ) : (
            <Music className="w-4 h-4" />
          )}
        </button>

        <div 
          className="ml-2 flex flex-col cursor-pointer overflow-hidden select-none"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-[#FF5C93] tracking-wide whitespace-nowrap font-['Comfortaa'] truncate">
              {isMusicPlaying ? "Love Me Like You Do 💗" : "Music Paused"}
            </span>
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse shrink-0" />
          </div>
          <span className="text-[9px] text-[#7A4B5D] whitespace-nowrap truncate">
            {isMusicPlaying ? "Ellie Goulding • For Honey" : "Tap play for Rathika's song"}
          </span>
        </div>

        {isExpanded && (
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-pink-200">
            <button 
              onClick={toggleMute}
              className="text-[#7A4B5D] hover:text-[#FF5C93] transition-colors cursor-pointer"
              aria-label="Mute or Unmute"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 accent-[#FF5C93] h-1.5 cursor-pointer rounded-lg bg-pink-100"
              aria-label="Volume Slider"
            />
          </div>
        )}
      </div>
    </div>
  );
}
