"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useProposal } from "@/hooks/useProposal";
import { useAudio } from "@/hooks/useAudio";
import { FloatingHearts } from "@/components/proposal/FloatingHearts";
import { MusicControl } from "@/components/proposal/MusicControl";
import { WelcomeScreen } from "@/components/proposal/WelcomeScreen";
import { TrustQuestion } from "@/components/proposal/TrustQuestion";
import { LoveConfirmation } from "@/components/proposal/LoveConfirmation";
import { FinalProposal } from "@/components/proposal/FinalProposal";
import { CoupleGallery } from "@/components/proposal/CoupleGallery";
import { SpecialMessage } from "@/components/proposal/SpecialMessage";
import { HeartfeltLetter } from "@/components/proposal/HeartfeltLetter";
import { Celebration } from "@/components/proposal/Celebration";

export default function Home() {
  const {
    currentStep,
    nextStep,
    acceptProposal,
    resetProposal,
  } = useProposal();

  const { isPlaying, isMuted, play, togglePlay, toggleMute } = useAudio();

  const handleStartExperience = () => {
    play();
    nextStep();
  };

  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between overflow-x-hidden pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] px-[max(0.75rem,env(safe-area-inset-left))]">
      {/* Background Floating Hearts Particle System */}
      <FloatingHearts />

      {/* Floating Corner Music Player */}
      <MusicControl
        isPlaying={isPlaying}
        isMuted={isMuted}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
      />

      {/* Animated Scene Router */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto py-2">
        <AnimatePresence mode="wait">
          {/* Screen 1: Welcome (Kitten with Pink Bows) */}
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <WelcomeScreen onStart={handleStartExperience} />
            </motion.div>
          )}

          {/* Screen 2: Trust Question (Crying Cat) */}
          {currentStep === "trust" && (
            <motion.div
              key="trust"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <TrustQuestion onYes={nextStep} />
            </motion.div>
          )}

          {/* Screen 3: Love Confirmation (Kitten with Flowers) */}
          {currentStep === "love" && (
            <motion.div
              key="love"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <LoveConfirmation onYes={nextStep} />
            </motion.div>
          )}

          {/* Screen 4: Final Question (Flork with Hearts + Modal Popup) */}
          {currentStep === "proposal" && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.6 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <FinalProposal onAccept={acceptProposal} />
            </motion.div>
          )}

          {/* Screen 5: Couple Graphics Coverflow Carousel */}
          {currentStep === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <CoupleGallery onNext={nextStep} />
            </motion.div>
          )}

          {/* Screen 6: Special Message Card ("This is just for you... Tap to see what's inside") */}
          {currentStep === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <SpecialMessage onOpen={nextStep} />
            </motion.div>
          )}

          {/* Screen 7: Heartfelt Letter ("I keep coming back to you...") */}
          {currentStep === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <HeartfeltLetter onNext={nextStep} />
            </motion.div>
          )}

          {/* Screen 8: Grand Celebration Screen */}
          {currentStep === "celebration" && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full flex-1 flex items-center justify-center"
            >
              <Celebration onReplay={resetProposal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Right Watermark */}
      <div className="fixed bottom-[max(0.6rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-40 pointer-events-none select-none text-[10px] xs:text-[11px] font-medium text-rose-300/60 tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
        <span>created by RANAJIT</span>
      </div>
    </main>
  );
}
