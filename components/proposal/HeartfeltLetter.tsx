"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { proposalConfig } from "@/config/proposal";
import { Heart, Sparkles } from "lucide-react";

interface HeartfeltLetterProps {
  onNext: () => void;
}

export function HeartfeltLetter({ onNext }: HeartfeltLetterProps) {
  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-2 xs:px-4 py-2 sm:py-6 text-center select-none overflow-x-hidden">
      {/* Background Ambient Glow - softened */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] sm:h-[450px] sm:w-[450px] rounded-full bg-[#ff2e7e]/12 blur-[90px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md sm:max-w-lg flex-col items-center justify-center mx-auto my-auto"
      >
        {/* Main Heartfelt Letter Card matching the screenshot with smartphone scroll containment */}
        <div className="relative w-full rounded-3xl border border-rose-400/25 bg-[#1b0e2b]/90 backdrop-blur-2xl p-4 xs:p-6 sm:p-8 shadow-[0_0_35px_rgba(255,46,126,0.2)] max-h-[85dvh] overflow-y-auto custom-scrollbar flex flex-col items-center">
          {/* Subtle Corner Sparkles */}
          <div className="absolute top-3.5 left-3.5 text-rose-400/40 select-none text-xs">✧</div>
          <div className="absolute top-3.5 right-3.5 text-rose-400/40 select-none text-xs">✧</div>

          {/* Blushing Kitten with Floating Hearts Crown */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 1.2, -1.2, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 mb-2 sm:mb-4 flex items-center justify-center drop-shadow-[0_0_20px_rgba(255,59,136,0.55)]"
          >
            {/* Glowing Backlight Halo */}
            <div className="absolute -inset-3 rounded-full bg-[#ff3b88]/20 blur-lg sm:blur-xl animate-pulse" />

            <Image
              src={proposalConfig.letterCatImage}
              alt="Cute blushing kitten with floating hearts crown"
              fill
              sizes="(max-width: 640px) 96px, 128px"
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-2.5 xs:space-y-3 sm:space-y-4 text-[11px] xs:text-xs sm:text-sm text-rose-100/90 leading-relaxed font-light text-center px-1 sm:px-2">
            <p>{proposalConfig.letterParagraph1}</p>

            <p>{proposalConfig.letterParagraph2}</p>

            {/* Bold Emphasized Statement */}
            <p className="font-semibold text-rose-200 tracking-wide pt-0.5">
              <strong className="text-white drop-shadow-[0_1px_8px_rgba(255,46,126,0.4)]">
                {proposalConfig.letterHighlight}
              </strong>
            </p>

            <p className="text-[11px] xs:text-xs sm:text-sm text-rose-200/80 pt-0.5 leading-relaxed">
              {proposalConfig.letterParagraph3}
            </p>
          </div>

          {/* Decorative Pink Hearts Divider */}
          <div className="flex items-center justify-center gap-3 my-3 sm:my-5 w-full max-w-xs">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-rose-400/40" />
            <div className="flex items-center gap-1 text-xs xs:text-sm text-[#ff2e7e]">
              <span>💕</span>
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-rose-400/40" />
          </div>

          {/* Bottom Action Button: "♥ Yes, I'm Yours Forever! ♥" */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            onClick={onNext}
            aria-label="Accept and continue to celebration"
            className="btn-modern-pink group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full sm:rounded-2xl text-xs xs:text-sm sm:text-base font-bold min-h-[48px] touch-manipulation overflow-hidden whitespace-nowrap"
          >
            {/* Ambient diffuse back-glow */}
            <div className="absolute -inset-1 rounded-full bg-[#ff2a7a]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

            <Heart className="relative z-10 w-3.5 h-3.5 xs:w-4 xs:h-4 text-white fill-white" />
            <span className="relative z-10 font-bold tracking-wide">{proposalConfig.letterButton}</span>
            <Sparkles className="relative z-10 w-3.5 h-3.5 xs:w-4 xs:h-4 text-amber-200" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

