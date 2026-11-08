"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { proposalConfig } from "@/config/proposal";
import { RotateCcw, Heart } from "lucide-react";

interface CelebrationProps {
  onReplay: () => void;
}

export function Celebration({ onReplay }: CelebrationProps) {
  const triggerConfetti = useCallback(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const count = isMobile ? 50 : 85;

    // Left cannon
    confetti({
      particleCount: count,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.75 },
      colors: ["#ff2e7e", "#ff65a3", "#ffd166", "#ffffff", "#c77dff", "#f72585"],
    });

    // Right cannon
    confetti({
      particleCount: count,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.75 },
      colors: ["#ff2e7e", "#ff65a3", "#ffd166", "#ffffff", "#c77dff", "#f72585"],
    });

    // Center burst
    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 70 : 120,
        spread: 110,
        origin: { y: 0.55 },
        colors: ["#ff1493", "#ff69b4", "#ffb6c1", "#ffd700", "#ff007f"],
      });
    }, 300);
  }, []);

  useEffect(() => {
    // Initial grand celebration fireworks burst
    triggerConfetti();
    const timer1 = setTimeout(() => triggerConfetti(), 800);
    const interval = setInterval(() => {
      triggerConfetti();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearInterval(interval);
    };
  }, [triggerConfetti]);

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-2 sm:py-6 text-center select-none">
      {/* Background Ambient Pink-Violet Spotlight - softened */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] sm:h-[450px] sm:w-[450px] rounded-full bg-[#ff2e7e]/15 blur-[95px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center justify-center mx-auto my-auto"
      >
        {/* Top Decorative Emojis Header matching the reference */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 mb-2 sm:mb-4 text-lg xs:text-xl sm:text-2xl select-none"
        >
          {proposalConfig.celebrationEmojiRow.map((emoji, idx) => (
            <motion.span
              key={idx}
              animate={{
                y: [0, -4, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.2 + idx * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Main Headline: "You made me the happiest!" */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-romantic text-[#ff2e7e] font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-[1.18] tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(255,46,126,0.3)]"
        >
          <span className="block">{proposalConfig.celebrationTitleLine1}</span>
          <span className="block">{proposalConfig.celebrationTitleLine2}</span>
        </motion.h1>

        {/* Subtitle 1: "Thank you for saying yes 💝" */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xs xs:text-sm sm:text-base text-rose-200/90 font-normal tracking-wide mb-1 flex items-center justify-center gap-1.5"
        >
          {proposalConfig.celebrationSubtitle1}
        </motion.p>

        {/* Subtitle 2: "I promise to love you forever and always..." */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-romantic italic text-[11px] xs:text-xs sm:text-sm text-rose-300/80 mb-5 sm:mb-8 font-light tracking-wide"
        >
          {proposalConfig.celebrationSubtitle2}
        </motion.p>

        {/* Central Beating Glowing Pink Heart */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
          className="relative mb-6 sm:mb-9 flex items-center justify-center cursor-pointer"
          onClick={triggerConfetti}
          whileTap={{ scale: 0.92 }}
        >
          {/* Intense Pink Backlight Halo */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-[#ff2e7e]/25 blur-xl sm:blur-2xl animate-pulse" />

          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1.14, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative drop-shadow-[0_0_28px_rgba(255,46,126,0.75)]"
          >
            <svg
              className="w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36"
              viewBox="0 0 24 24"
              fill="#ff2e7e"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Action Buttons: "Replay All ♥" matching reference screenshot */}
        <div className="flex flex-col items-center justify-center gap-2.5 w-full max-w-xs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={onReplay}
            aria-label="Replay entire romantic journey"
            className="btn-modern-outline group w-full xs:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 rounded-full sm:rounded-2xl min-h-[48px] touch-manipulation font-semibold text-xs xs:text-sm sm:text-base tracking-wide"
          >
            <RotateCcw className="w-4 h-4 text-rose-300 group-hover:-rotate-90 transition-transform duration-300" />
            <span className="font-semibold">{proposalConfig.celebrationReplayButton}</span>
            <Heart className="w-3.5 h-3.5 text-[#ff2e7e] fill-[#ff2e7e]" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
