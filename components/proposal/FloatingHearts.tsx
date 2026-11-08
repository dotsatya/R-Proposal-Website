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
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  color: string;
}

const HEART_COLORS = [
  "rgba(255, 75, 110, 0.4)",
  "rgba(255, 140, 160, 0.45)",
  "rgba(244, 63, 94, 0.35)",
  "rgba(217, 70, 239, 0.35)",
  "rgba(254, 205, 211, 0.4)",
];

export function FloatingHearts() {
  const [ambientHearts, setAmbientHearts] = useState<HeartItem[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const isMobile = window.innerWidth < 640;
    // Mobile uses 8 lightweight hearts; desktop uses 14
    const count = isMobile ? 8 : 14;

    const hearts: HeartItem[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 6 + Math.random() * 88, // Keep within 6% - 94% to prevent any horizontal scroll on mobile
      size: Math.floor(Math.random() * (isMobile ? 12 : 16)) + 10,
      duration: Math.random() * 6 + 10,
      delay: Math.random() * 5,
      color: HEART_COLORS[i % HEART_COLORS.length],
      rotation: Math.floor(Math.random() * 40) - 20,
    }));
    setAmbientHearts(hearts);
  }, []);

  const handleClick = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (!clientX && !clientY) return;

    const newHeart: ClickHeart = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    };

    setClickHearts((prev) => [...prev.slice(-8), newHeart]);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, [handleClick]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden w-full h-full max-w-full">
      {/* Ambient Rising Hearts */}
      {ambientHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute will-change-transform"
          style={{
            left: `${h.x}%`,
            bottom: "-30px",
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: [0, (h.id % 2 === 0 ? 1 : -1) * 16, 0],
            rotate: [h.rotation, h.rotation + 30],
            opacity: [0, 0.6, 0.75, 0],
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
            style={{ filter: "drop-shadow(0 0 6px rgba(244,63,94,0.25))" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Tap Burst Hearts */}
      <AnimatePresence>
        {clickHearts.map((ch) => (
          <motion.div
            key={ch.id}
            initial={{ opacity: 1, scale: 0.5, x: ch.x - 12, y: ch.y - 12 }}
            animate={{
              opacity: 0,
              scale: 1.3,
              y: ch.y - 60,
              x: ch.x - 12 + (Math.random() - 0.5) * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => {
              setClickHearts((prev) => prev.filter((item) => item.id !== ch.id));
            }}
            className="absolute z-10 will-change-transform"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={ch.color}
              style={{ filter: "drop-shadow(0 0 8px rgba(255,75,110,0.7))" }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
