"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { proposalConfig } from "@/config/proposal";
import { X, Heart, Sparkles } from "lucide-react";

interface FinalProposalProps {
  onAccept: () => void;
}

export function FinalProposal({ onAccept }: FinalProposalProps) {
  const [showThinkModal, setShowThinkModal] = useState<boolean>(false);

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-2 sm:py-6 text-center select-none">
      {/* Background Ambient Glow - softened */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[220px] w-[220px] sm:h-[340px] sm:w-[340px] rounded-full bg-[#ff337e]/12 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-md flex-col items-center justify-center mx-auto my-auto"
      >
        {/* Flork Character Holding Heart Sticker */}
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
          className="relative mb-3 sm:mb-5 flex items-center justify-center"
        >
          {/* Glowing Backlight Aura */}
          <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-[#ff3b88]/20 blur-lg sm:blur-xl animate-pulse" />

          <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 drop-shadow-[0_0_20px_rgba(255,59,136,0.5)]">
            <Image
              src={proposalConfig.finalFlorkImage}
              alt="Flork holding heart with pink hearts floating"
              fill
              sizes="(max-width: 640px) 128px, 160px"
              priority
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Heading: "Last question, I promise!" */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-romantic text-white font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-tight mb-1.5 sm:mb-2 tracking-tight"
        >
          {proposalConfig.finalTitle}
        </motion.h2>

        {/* Subtitle: "This one is the most important 🌟" */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xs xs:text-sm sm:text-base text-rose-200/80 mb-2 sm:mb-3 font-normal tracking-wide"
        >
          {proposalConfig.finalSubtitle}
        </motion.p>

        {/* Question: "Will you be mine forever?" in romantic pink */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="font-romantic text-[#ff2e7e] font-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl mb-5 sm:mb-8 drop-shadow-[0_2px_12px_rgba(255,46,126,0.35)]"
        >
          {proposalConfig.finalQuestion}
        </motion.p>

        {/* Buttons Row: "Yes, forever! 🫀" and "Let me think... 🤔" */}
        <div className="relative w-full max-w-xs min-h-[75px] sm:min-h-[85px] flex items-center justify-center gap-3 xs:gap-4">
          {/* YES, FOREVER Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={onAccept}
            aria-label="Yes, forever!"
            className="btn-modern-green group relative z-20 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full sm:rounded-2xl text-xs xs:text-sm sm:text-base font-bold min-h-[48px] touch-manipulation overflow-hidden whitespace-nowrap flex items-center justify-center"
          >
            {/* Ambient diffuse green glow */}
            <div className="absolute -inset-1 rounded-full bg-[#20bf6b]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

            <span className="relative z-10 flex items-center gap-1.5 font-bold tracking-wide">
              {proposalConfig.finalYesButton}
            </span>

            {/* Subtle light sweep shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>

          {/* LET ME THINK Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowThinkModal(true)}
            aria-label="Let me think..."
            className="btn-modern-frosted px-5 py-3.5 sm:px-6 sm:py-4 rounded-full sm:rounded-2xl text-xs xs:text-sm sm:text-base font-medium whitespace-nowrap min-h-[48px] touch-manipulation flex items-center gap-1.5"
          >
            {proposalConfig.finalThinkButton}
          </motion.button>
        </div>
      </motion.div>

      {/* The Exact "Just Say YES!" Modal Popup */}
      <AnimatePresence>
        {showThinkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowThinkModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full max-w-[330px] xs:max-w-sm rounded-3xl bg-[#180e26]/95 border border-rose-500/30 p-5 xs:p-6 sm:p-7 text-center shadow-[0_0_40px_rgba(255,51,126,0.35)] backdrop-blur-2xl"
            >
              {/* Close Button at Top Right */}
              <button
                onClick={() => setShowThinkModal(false)}
                aria-label="Close popup"
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors touch-target"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gun Cat Sticker with Pink Bow */}
              <div className="relative w-20 h-20 xs:w-24 xs:h-24 mx-auto mb-3 drop-shadow-[0_0_15px_rgba(255,59,136,0.55)]">
                <Image
                  src={proposalConfig.modalGunCatImage}
                  alt="Funny kitten with pink bow pointing toy gun"
                  fill
                  sizes="96px"
                  priority
                  className="object-contain"
                />
              </div>

              {/* Modal Title */}
              <h3 className="font-romantic text-[#ff2e7e] font-bold text-xl xs:text-2xl sm:text-3xl mb-2 drop-shadow-[0_2px_10px_rgba(255,46,126,0.3)]">
                {proposalConfig.modalTitle}
              </h3>

              {/* Modal Text */}
              <p className="text-xs xs:text-sm text-rose-100/90 leading-relaxed font-light mb-4 px-1">
                {proposalConfig.modalText}
              </p>

              {/* Decorative Icons Row */}
              <div className="flex items-center justify-center gap-2 mb-6 text-sm">
                <span>💕</span>
                <span>✨</span>
                <span>💖</span>
                <span>✨</span>
                <span>💕</span>
              </div>

              {/* Modal "Yes, I'll Say YES!" Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  setShowThinkModal(false);
                  onAccept();
                }}
                className="btn-modern-pink group relative w-full py-3.5 sm:py-4 px-6 rounded-full sm:rounded-2xl text-sm xs:text-base font-bold min-h-[48px] touch-manipulation overflow-hidden flex items-center justify-center gap-2"
              >
                {/* Ambient diffuse back-glow */}
                <div className="absolute -inset-1 rounded-full bg-[#ff2a7a]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

                <Heart className="relative z-10 w-4 h-4 text-white fill-white" />
                <span className="relative z-10 font-bold tracking-wide">{proposalConfig.modalButton}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
