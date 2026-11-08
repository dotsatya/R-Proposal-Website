"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { proposalConfig } from "@/config/proposal";
import { Heart } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onStart();
    }, 700);
  };

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-2 sm:py-6 text-center select-none">
      {/* Background Ambient Violet-Pink Glow - softened */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[220px] w-[220px] sm:h-[340px] sm:w-[340px] rounded-full bg-[#ff337e]/12 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center justify-center mx-auto"
      >
        {/* Adorable Cat Sticker with Pink Bows & White Outline */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 1.2, -1.2, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative mb-4 sm:mb-6 flex items-center justify-center"
        >
          {/* Soft Pink Backlight Aura */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-[#ff3b88]/20 blur-lg sm:blur-xl animate-pulse" />

          <div className="relative w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 drop-shadow-[0_0_20px_rgba(255,59,136,0.55)]">
            <Image
              src={proposalConfig.welcomeCatImage}
              alt="Cute kitten with pink bows"
              fill
              sizes="(max-width: 640px) 144px, 176px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Main Heading matching reference video typography */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-romantic text-[#ff2e7e] font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-[1.18] tracking-tight mb-2 sm:mb-3 drop-shadow-[0_2px_10px_rgba(255,46,126,0.25)]"
        >
          <span className="block">{proposalConfig.welcomeTitleLine1}</span>
          <span className="block">{proposalConfig.welcomeTitleSpecial}</span>
          <span className="block">{proposalConfig.welcomeTitleLine3}</span>
        </motion.h1>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-xs xs:text-sm sm:text-base text-rose-200/80 max-w-[280px] xs:max-w-xs sm:max-w-sm mx-auto mb-6 sm:mb-8 font-normal tracking-wide"
        >
          {proposalConfig.welcomeSubtitle}
        </motion.p>

        {/* The Exact Tap to Begin Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleOpen}
            disabled={isOpening}
            aria-label="Tap to begin the romantic journey"
            className="btn-modern-pink group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full sm:rounded-2xl text-sm xs:text-base font-semibold min-h-[48px] touch-manipulation overflow-hidden"
          >
            {/* Ambient diffuse back-glow */}
            <div className="absolute -inset-1 rounded-full bg-[#ff2a7a]/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

            <Heart className="relative z-10 w-4 h-4 xs:w-5 xs:h-5 text-white stroke-[2.2] fill-white/20 group-hover:scale-115 transition-transform" />
            <span className="relative z-10 font-semibold tracking-wide">
              {isOpening ? "Opening for you..." : proposalConfig.welcomeButton}
            </span>

            {/* Continuous subtle modern shimmer sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
