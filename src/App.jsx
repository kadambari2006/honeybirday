import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import BirthdayCake from './components/BirthdayCake';
import SpecialCards from './components/SpecialCards';
import PhotoScrapbook from './components/PhotoScrapbook';
import FutureWishes from './components/FutureWishes';
import LoveLetter from './components/LoveLetter';
import FinalCelebration from './components/FinalCelebration';
import MusicPlayer from './components/MusicPlayer';
import FloatingDecorations from './components/FloatingDecorations';
import FloatingBalloonsBackground from './components/FloatingBalloonsBackground';
import LoveDeclarationBanner from './components/LoveDeclarationBanner';
import StoryProgress from './components/StoryProgress';

export default function App() {
  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleOpenSurprise = () => {
    setHasOpenedSurprise(true);
    setIsMusicPlaying(true);
  };

  const handleReplayCelebration = () => {
    // Return to the cake interaction smoothly
    const cakeEl = document.getElementById('birthday-cake-section');
    if (cakeEl) {
      cakeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#4A2835] font-['Nunito'] relative selection:bg-pink-200 selection:text-[#FF5C93] overflow-x-hidden">
      {/* Continuous Floating Balloons Moving Behind the Entire Screen */}
      <FloatingBalloonsBackground />

      {/* Floating Interactive Hearts, Stars, Butterflies */}
      <FloatingDecorations />

      {/* Music Player Controller: Love Me Like You Do playing from first to end */}
      <MusicPlayer 
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Story Progress Bar and Chapter Quick-Jump */}
      {hasOpenedSurprise && <StoryProgress />}

      {/* CHAPTER 1: WELCOME SCREEN & COVER PORTRAIT */}
      <div id="welcome-section" className="relative z-10">
        <WelcomeScreen 
          hasOpened={hasOpenedSurprise}
          onOpenSurprise={handleOpenSurprise}
        />
      </div>

      {/* Only show rest of the chapters after she taps "Open Your Surprise, Honey 🦋" */}
      {hasOpenedSurprise && (
        <main className="relative z-10 space-y-12 pb-24">
          {/* CHAPTER 2: THE BIRTHDAY CAKE & WISHES */}
          <BirthdayCake />

          {/* CHAPTER 3: WHY YOU ARE SO SPECIAL */}
          <SpecialCards />

          {/* PASSIONATE LOVE CONFESSION BANNER */}
          <LoveDeclarationBanner />

          {/* CHAPTER 4: PHOTO SCRAPBOOK */}
          <PhotoScrapbook />

          {/* CHAPTER 5: FUTURE WISHES & BLESSINGS */}
          <FutureWishes />

          {/* CHAPTER 6: PERSONAL LETTER & MILLION HUGS */}
          <LoveLetter />

          {/* CHAPTER 7: FINAL CELEBRATION */}
          <FinalCelebration onReplayCelebration={handleReplayCelebration} />
        </main>
      )}
    </div>
  );
}
