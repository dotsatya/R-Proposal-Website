
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

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export function FloatingHearts() {
  const [ambientHearts, setAmbientHearts] = useState<HeartItem[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Generate more floating hearts
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotionPreference = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    const generateHearts = () => {
      const isMobile = window.innerWidth < 640;

      // More hearts across the screen
      const count = isMobile ? 14 : 22;

      const hearts: HeartItem[] = Array.from(
        { length: count },
        (_, i) => {
          const palette =
            HEART_PALETTES[
              Math.floor(Math.random() * HEART_PALETTES.length)
            ];

          return {
            id: i,
            x: 2 + Math.random() * 96,

            // Mix of tiny and medium hearts
            size: Math.floor(Math.random() * (isMobile ? 12 : 17)) + 8,

            // Different speeds for natural movement
            duration: Math.random() * 9 + 11,
            delay: Math.random() * 15,

            color: palette.color,
            glow: palette.glow,

            rotation: Math.floor(Math.random() * 60) - 30,

            swayDistance:
              (Math.random() > 0.5 ? 1 : -1) *
              (12 + Math.random() * 25),
          };
        }
      );

      setAmbientHearts(hearts);
    };

    generateHearts();

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  // Click and tap heart burst
  const handleClick = useCallback((e: MouseEvent) => {
    const burst: ClickHeart[] = Array.from({ length: 3 }, (_, i) => {
      const palette =
        HEART_PALETTES[
          Math.floor(Math.random() * HEART_PALETTES.length)
        ];

      return {
        id: Date.now() + Math.random() + i,
        x: e.clientX,
        y: e.clientY,
        color: palette.color,
        size: 12 + Math.random() * 8,
        dx: (Math.random() - 0.5) * 65,
        dy: -(25 + Math.random() * 55),
      };
    });

    setClickHearts((prev) => [...prev.slice(-12), ...burst]);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  if (isReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">

      {/* Romantic ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,42,122,0.08) 0%, rgba(244,63,94,0.03) 45%, transparent 75%)",
        }}
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.98, 1.04, 0.98],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating hearts rising from the bottom */}
      {ambientHearts.map((h) => (
        <motion.div
          key={h.id}
          className="pointer-events-none absolute will-change-transform"
          style={{
            left: `${h.x}%`,
            bottom: "-40px",
          }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, h.swayDistance, -h.swayDistance * 0.5, 0],
            rotate: [
              h.rotation,
              h.rotation + 30,
              h.rotation - 20,
              h.rotation,
            ],
            scale: [0.5, 1, 0.85, 1.15, 0.5],
            opacity: [0, 0.5, 0.65, 0.4, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "easeInOut",
            repeatDelay: 0.2,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            style={{
              filter: `drop-shadow(0 0 7px ${h.glow})`,
            }}
          >
            <path d={HEART_PATH} />
          </svg>
        </motion.div>
      ))}

      {/* Additional tiny hearts for depth */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`tiny-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            bottom: "-20px",
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0, 0.35, 0.5, 0],
            scale: [0.5, 1, 0.7],
            rotate: [0, i % 2 === 0 ? 35 : -35],
          }}
          transition={{
            duration: 14 + (i % 5) * 3,
            repeat: Infinity,
            delay: i * 1.7,
            ease: "easeInOut",
          }}
        >
          <svg
            width={7 + (i % 3) * 3}
            height={7 + (i % 3) * 3}
            viewBox="0 0 24 24"
            fill={HEART_PALETTES[i % HEART_PALETTES.length].color}
          >
            <path d={HEART_PATH} />
          </svg>
        </motion.div>
      ))}

      {/* Click and tap heart bursts */}
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
              rotate: [0, ch.id % 2 === 0 ? 25 : -25],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
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
                filter: "drop-shadow(0 0 6px rgba(255,42,122,0.65))",
              }}
            >
              <path d={HEART_PATH} />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
