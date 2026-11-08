"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { proposalConfig } from "@/config/proposal";
import { ChevronLeft, ChevronRight, Heart, ArrowRight } from "lucide-react";

interface CoupleGalleryProps {
  onNext: () => void;
}

export function CoupleGallery({ onNext }: CoupleGalleryProps) {
  // Center card initially on meadow (index 1) just like in the screenshot
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const images = proposalConfig.coupleGraphics;
  const total = images.length;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Touch swipe handling for mobile smartphones
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextImage();
    } else if (diff < -40) {
      prevImage();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getCardStyle = (index: number) => {
    const offset = (index - activeIndex + total) % total;

    if (offset === 0) {
      // Active center card
      return {
        zIndex: 20,
        scale: 1,
        opacity: 1,
        x: "0%",
        filter: "brightness(1)",
        border: "border-2 border-rose-400/40 shadow-[0_0_30px_rgba(255,46,126,0.3)]",
      };
    } else if (offset === 1 || (total === 2 && offset === 1)) {
      // Right card
      return {
        zIndex: 10,
        scale: 0.82,
        opacity: 0.55,
        x: "52%",
        filter: "brightness(0.7)",
        border: "border border-white/10",
      };
    } else {
      // Left card
      return {
        zIndex: 10,
        scale: 0.82,
        opacity: 0.55,
        x: "-52%",
        filter: "brightness(0.7)",
        border: "border border-white/10",
      };
    }
  };

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center px-2 xs:px-4 py-2 sm:py-6 text-center select-none overflow-x-hidden">
      {/* Background Soft Purple/Rose Halo - softened */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] sm:h-[420px] sm:w-[420px] rounded-full bg-[#ff2e7e]/10 blur-[85px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-xl flex-col items-center justify-center mx-auto my-auto"
      >
        {/* Coverflow 3-Card Carousel Container */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[250px] xs:h-[295px] sm:h-[370px] flex items-center justify-center mb-3 sm:mb-6"
        >
          {images.map((img, idx) => {
            const style = getCardStyle(idx);
            const isCenter = idx === activeIndex;

            return (
              <motion.div
                key={idx}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.32, 0.72, 0, 1],
                }}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                className={`absolute w-[185px] xs:w-[220px] sm:w-[280px] aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${style.border} bg-zinc-950`}
                style={{
                  filter: style.filter,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 220px, 280px"
                  priority={idx === activeIndex}
                  className="object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Controls matching screenshot */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-6">
          {/* Previous Button */}
          <button
            onClick={prevImage}
            aria-label="Previous graphic"
            className="btn-modern-frosted w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-rose-300 hover:text-white transition-all active:scale-90 touch-target"
          >
            <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
          </button>

          {/* Indicator Dots */}
          <div className="flex items-center gap-1.5 px-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="p-1 touch-manipulation"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 sm:w-7 bg-[#ff2e7e] shadow-[0_0_8px_rgba(255,46,126,0.6)]"
                      : "w-2 bg-white/25"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            aria-label="Next graphic"
            className="btn-modern-frosted w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-rose-300 hover:text-white transition-all active:scale-90 touch-target"
          >
            <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5" />
          </button>
        </div>

        {/* Subtitle in exact romantic italic font */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-romantic italic text-xs xs:text-sm sm:text-base text-rose-300/80 mb-4 sm:mb-6 tracking-wide font-light"
        >
          {proposalConfig.coupleGallerySubtitle}
        </motion.p>

        {/* Action Button: "♥ See My Message →" matching screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={onNext}
            aria-label="See my message"
            className="btn-modern-pink group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full sm:rounded-2xl text-xs xs:text-sm sm:text-base font-bold min-h-[48px] touch-manipulation overflow-hidden"
          >
            {/* Ambient diffuse back-glow */}
            <div className="absolute -inset-1 rounded-full bg-[#ff2a7a]/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

            <Heart className="relative z-10 w-3.5 h-3.5 xs:w-4 xs:h-4 text-white fill-white" />
            <span className="relative z-10 font-bold tracking-wide">{proposalConfig.coupleGalleryButton}</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 xs:w-4 xs:h-4 text-white group-hover:translate-x-1 transition-transform" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

