"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX, Music, Disc3 } from "lucide-react";

interface MusicControlProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

export function MusicControl({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: MusicControlProps) {
  return (
    <div className="fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] z-50 flex items-center gap-2">
      {/* Equalizer Wave Indicator (Hidden on small mobile to save space) */}
      {isPlaying && !isMuted && (
        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-romantic text-xs text-rose-200">
          <span className="text-[11px] font-medium tracking-wide">Playing Our Song</span>
          <div className="flex items-end gap-[3px] h-3.5 ml-1.5">
            {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
              <motion.span
                key={i}
                className="w-[2px] bg-rose-400 rounded-full"
                animate={{
                  height: ["20%", `${h * 100}%`, "20%"],
                }}
                transition={{
                  duration: 0.8 + i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Music Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Pause romantic music" : "Play romantic music"}
        className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 touch-target touch-manipulation ${
          isPlaying
            ? "bg-[#ff2a7a]/25 border border-rose-400/60 text-rose-200 shadow-[0_0_20px_rgba(255,42,122,0.45)] ring-2 ring-rose-400/30 backdrop-blur-xl"
            : "btn-modern-frosted text-rose-200/80 hover:text-white"
        }`}
      >
        {isPlaying ? (
          <Disc3 className="w-5 h-5 animate-spin-slow text-rose-300 drop-shadow-[0_0_8px_rgba(255,42,122,0.8)]" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </motion.button>

      {/* Quick Mute / Unmute Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        className="btn-modern-frosted flex items-center justify-center w-11 h-11 rounded-full text-rose-200/80 hover:text-white transition-all duration-300 touch-target touch-manipulation"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-rose-400" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </motion.button>
    </div>
  );
}
