"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proposalConfig } from "@/config/proposal";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);

  // Initialize Audio once on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.src = proposalConfig.music;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.65;
    audio.muted = isMutedRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.warn("Audio loading error:", e);
      // Try fallback if defined and different
      if (proposalConfig.musicFallback && audio.src !== proposalConfig.musicFallback) {
        audio.src = proposalConfig.musicFallback;
        audio.load();
        if (!userPausedRef.current) {
          audio.play().catch(() => {});
        }
      } else {
        setAudioError("Audio playback error");
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    audioRef.current = audio;

    // Optional: unlock audio on first touch if not explicitly paused
    const handleFirstGesture = () => {
      if (audioRef.current && !userPausedRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, []);

  const play = useCallback(async () => {
    userPausedRef.current = false;
    if (!audioRef.current) return;

    try {
      audioRef.current.muted = isMutedRef.current;
      await audioRef.current.play();
      setIsPlaying(true);
      setAudioError(null);
    } catch (err) {
      console.warn("Audio play blocked or waiting for user gesture:", err);
    }
  }, []);

  const pause = useCallback(() => {
    userPausedRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      isMutedRef.current = nextMuted;
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
      }
      return nextMuted;
    });
  }, []);

  return {
    isPlaying,
    isMuted,
    audioError,
    play,
    pause,
    togglePlay,
    toggleMute,
  };
}
