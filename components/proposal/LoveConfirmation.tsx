"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { proposalConfig } from "@/config/proposal";

interface LoveConfirmationProps {
  onYes: () => void;
}

export function LoveConfirmation({ onYes }: LoveConfirmationProps) {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shiftCount, setShiftCount] = useState<number>(0);

  const handleNoShift = useCallback(() => {
    setShiftCount((prev) => prev + 1);

    // Subtle haptic vibration on smartphones if supported
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(25);
      } catch {}
    }

    // Dynamic safe boundaries for smartphones and desktop
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const maxX = isMobile ? Math.min(window.innerWidth * 0.2, 55) : 110;
    const maxY = isMobile ? 35 : 65;

    // Generate new offset that definitely shifts away from the current spot
    const newX = (Math.random() > 0.5 ? 1 : -1) * (18 + Math.random() * (maxX - 18));
    const newY = (Math.random() > 0.5 ? 1 : -1) * (12 + Math.random() * (maxY - 12));

    setNoPosition({
      x: Math.round(newX),
      y: Math.round(newY),
    });
  }, []);

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-2 sm:py-6 text-center select-none">
      {/* Background Ambient Glow - softened */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[220px] w-[220px] sm:h-[340px] sm:w-[340px] rounded-full bg-[#ff337e]/07 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center justify-center mx-auto my-auto"
      >
        {/* Adorable Cat with Flowers Sticker */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 1.2, -1.2, 0],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-3 sm:mb-5 flex items-center justify-center"
        >
          {/* Glowing Backlight Aura */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-[#ff3b88]/20 blur-lg sm:blur-xl animate-pulse" />

          <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 drop-shadow-[0_0_20px_rgba(255,59,136,0.5)]">
            <Image
              src={proposalConfig.loveCatImage}
              alt="Cat holding bouquet of pink flowers with pink bow"
              fill
              sizes="(max-width: 640px) 128px, 160px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Heading: "One more thing..." */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-romantic text-white font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-tight mb-1.5 sm:mb-2 tracking-tight"
        >
          {proposalConfig.loveTitle}
        </motion.h2>

        {/* Subtitle: "I need to know this 💖" */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xs xs:text-sm sm:text-base text-rose-200/80 mb-2 sm:mb-3 font-normal tracking-wide"
        >
          {proposalConfig.loveSubtitle}
        </motion.p>

        {/* Question: "Do you also love me?" in romantic pink */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="font-romantic text-[#ff2e7e] font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-5 sm:mb-8 drop-shadow-[0_2px_12px_rgba(255,46,126,0.35)]"
        >
          {proposalConfig.loveQuestion}
        </motion.p>

        {/* Buttons Row: Green "Yes, I love you! 💖" and Shifting "No 😳" */}
        <div className="relative w-full max-w-xs min-h-[75px] sm:min-h-[85px] flex items-center justify-center gap-3 xs:gap-4">
          {/* YES, I LOVE YOU Button - Modern Emerald Luminous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={onYes}
            aria-label="Yes, I love you"
            className="btn-modern-green group relative z-20 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full sm:rounded-2xl text-xs xs:text-sm sm:text-base font-bold min-h-[48px] touch-manipulation overflow-hidden whitespace-nowrap flex items-center justify-center"
          >
            {/* Ambient diffuse green glow */}
            <div className="absolute -inset-1 rounded-full bg-[#20bf6b]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

            <span className="relative z-10 flex items-center gap-1.5 font-bold tracking-wide">
              {proposalConfig.loveYesButton}
            </span>

            {/* Subtle light sweep shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>

          {/* NO Button - Modern Frosted Glass Evasive Button */}
          <motion.div
            animate={{
              x: noPosition.x,
              y: noPosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 22,
            }}
            className="z-10"
          >
            <motion.button
              onMouseEnter={handleNoShift}
              onClick={handleNoShift}
              onTouchStart={(e) => {
                e.preventDefault();
                handleNoShift();
              }}
              whileTap={{ scale: 0.9 }}
              aria-label="No option - unavailable"
              className="btn-modern-frosted px-5 py-3.5 sm:px-6 sm:py-4 rounded-full sm:rounded-2xl text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap min-h-[48px] touch-manipulation flex items-center gap-1.5 cursor-not-allowed select-none"
            >
              <span>{proposalConfig.loveNoButton}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Playful hint text if tried clicking No */}
        {shiftCount > 1 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-xs text-rose-300/80 italic font-light px-2"
          >
            He brought you flowers! You have to tap &ldquo;Yes, I love you! 💖&rdquo; 🥰
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

