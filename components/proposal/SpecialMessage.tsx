"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { proposalConfig } from "@/config/proposal";
import { Sparkles, Heart } from "lucide-react";

interface SpecialMessageProps {
  onOpen: () => void;
}

export function SpecialMessage({ onOpen }: SpecialMessageProps) {
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const handleCardTap = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-2 sm:py-6 text-center select-none">
      {/* Background Ambient Glow - softened */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[240px] w-[240px] sm:h-[380px] sm:w-[380px] rounded-full bg-[#ff337e]/07 blur-[85px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center justify-center mx-auto my-auto"
      >
        {/* Opened Love Envelope Sticker at Top */}
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

          <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 drop-shadow-[0_0_20px_rgba(255,59,136,0.55)]">
            <Image
              src={proposalConfig.secretEnvelopeImage}
              alt="Love letter envelope with heart seal"
              fill
              sizes="(max-width: 640px) 112px, 128px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Heading matching screenshot */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-romantic text-white font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6 tracking-tight"
        >
          {proposalConfig.secretTitleWhite}
          <span className="text-[#ff2e7e] drop-shadow-[0_2px_12px_rgba(255,46,126,0.4)]">
            {proposalConfig.secretTitlePink}
          </span>
        </motion.h2>

        {/* Interactive "Tap to see what's inside" Card matching screenshot */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleCardTap}
          className="group relative w-full max-w-[310px] xs:max-w-sm rounded-3xl border border-rose-400/25 bg-[#1a0e28]/90 backdrop-blur-xl p-6 xs:p-7 sm:p-9 flex flex-col items-center justify-center cursor-pointer hover:border-rose-400/50 transition-all duration-300 shadow-[0_0_30px_rgba(255,46,126,0.2)] hover:shadow-[0_0_40px_rgba(255,46,126,0.45)] touch-manipulation"
        >
          {/* Glowing halo behind card */}
          <div className="absolute -inset-2 rounded-3xl bg-[#ff2e7e]/10 blur-lg group-hover:bg-[#ff2e7e]/20 transition-all" />

          {/* Pointing Cat with Tongue Out */}
          <motion.div
            animate={{
              scale: isOpening ? [1, 1.2, 0.9] : [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: isOpening ? 0.6 : 3,
              repeat: isOpening ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="relative w-24 h-24 xs:w-28 xs:h-28 mb-4 sm:mb-5 drop-shadow-[0_0_20px_rgba(255,59,136,0.55)]"
          >
            <Image
              src={proposalConfig.secretCatImage}
              alt="Cute kitten pointing with tongue out"
              fill
              sizes="(max-width: 640px) 112px, 128px"
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Bottom Card Prompt */}
          <p className="text-xs xs:text-sm text-rose-200/80 font-normal tracking-wide flex items-center gap-1.5 group-hover:text-white transition-colors">
            <span>{isOpening ? "Opening for you..." : proposalConfig.secretCardPrompt}</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          </p>

          {/* Corner decorative heart */}
          <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-80 transition-opacity">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

