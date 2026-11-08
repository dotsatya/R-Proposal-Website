
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeartItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotation: number;
  swayDistance: number;
  glow: string;
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  dx: number;
  dy: number;
}

const HEART_PALETTES = [
  { color: "rgba(255, 42, 122, 0.72)", glow: "rgba(255, 42, 122, 0.65)" },
  { color: "rgba(244, 63, 94, 0.68)", glow: "rgba(244, 63, 94, 0.55)" },
  { color: "rgba(255, 105, 180, 0.72)", glow: "rgba(255, 105, 180, 0.65)" },
  { color: "rgba(236, 72, 153, 0.68)", glow: "rgba(236, 72, 153, 0.55)" },
  { color: "rgba(255, 140, 160, 0.62)", glow: "rgba(255, 140, 160, 0.45)" },
  { color: "rgba(255, 192, 203, 0.58)", glow: "rgba(255, 192, 203, 0.4)" },
  { color: "rgba(225, 29, 72, 0.62)", glow: "rgba(225, 29, 72, 0.5)" },
];

export function FloatingHearts() {
  const [ambientHearts, setAmbientHearts] = useState<HeartItem[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Generate ambient floating hearts
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();

    mediaQuery.addEventListener("change", updateMotionPreference);

    const isMobile = window.innerWidth < 640;

    // Reduced heart count
    const count = isMobile ? 7 : 12;

    const hearts: HeartItem[] = Array.from({ length: count }).map(
      (_, i) => {
        const palette = HEART_PALETTES[i % HEART_PALETTES.length];

        return {
          id: i,
          x: 4 + Math.random() * 92,

          // Smaller heart sizes
          size: Math.floor(
            Math.random() * (isMobile ? 7 : 9)
          ) + 8,

          // Slower animation
          duration: Math.random() * 5 + 12,
          delay: Math.random() * 8,

          color: palette.color,
          glow: palette.glow,

          rotation: Math.floor(Math.random() * 40) - 20,

          swayDistance:
            (i % 2 === 0 ? 1 : -1) *
            (10 + Math.random() * 12),
        };
      }
    );

    setAmbientHearts(hearts);

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateMotionPreference
      );
    };
  }, []);

  // Handle mouse clicks and mobile taps
  const handleClick = useCallback((e: MouseEvent) => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    const burst: ClickHeart[] = Array.from({ length: 2 }).map(
      (_, i) => ({
        id: Date.now() + Math.random() + i,
        x: clientX,
        y: clientY,

        color:
          HEART_PALETTES[
            Math.floor(Math.random() * HEART_PALETTES.length)
          ].color,

        // Smaller burst hearts
        size: 12 + Math.random() * 5,

        dx: (Math.random() - 0.5) * 45,
        dy: -(25 + Math.random() * 35),
      })
    );

    setClickHearts((prev) => [
      ...prev.slice(-8),
      ...burst,
    ]);
  }, []);

  // Register click listener
  useEffect(() => {
    window.addEventListener("click", handleClick, {
      passive: true,
    });

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  // Respect reduced motion preference
  if (isReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full max-w-full overflow-hidden">

      {/* Ambient Background Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255, 42, 122, 0.06) 0%, rgba(244, 63, 94, 0.02) 45%, transparent 75%)",
        }}
        animate={{
          opacity: [0.35, 0.55, 0.35],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Ambient Floating Hearts */}
      {ambientHearts.map((h) => (
        <motion.div
          key={h.id}
          className="pointer-events-none absolute will-change-transform"
          style={{
            left: `${h.x}%`,
            bottom: "-25px",
          }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, h.swayDistance, -h.swayDistance * 0.5, 0],
            rotate: [
              h.rotation,
              h.rotation + 25,
              h.rotation - 10,
            ],
            scale: [0.85, 1.05, 0.9, 1.05, 0.85],
            opacity: [0, 0.45, 0.55, 0.35, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            style={{
              filter: `drop-shadow(0 0 5px ${h.glow})`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Tap / Click Burst Hearts */}
      <AnimatePresence>
        {clickHearts.map((ch) => (
          <motion.div
            key={ch.id}
            initial={{
              opacity: 1,
              scale: 0.3,
              x: ch.x - ch.size / 2,
              y: ch.y - ch.size / 2,
            }}
            animate={{
              opacity: [1, 0.8, 0],
              scale: [0.3, 1.15, 1.3],
              y: ch.y + ch.dy,
              x: ch.x - ch.size / 2 + ch.dx,
              rotate: [
                0,
                ch.id % 2 === 0 ? 20 : -20,
              ],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setClickHearts((prev) =>
                prev.filter((item) => item.id !== ch.id)
              );
            }}
            className="pointer-events-none absolute z-10 will-change-transform"
          >
            <svg
              width={ch.size}
              height={ch.size}
              viewBox="0 0 24 24"
              fill={ch.color}
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(255,42,122,0.65))",
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
