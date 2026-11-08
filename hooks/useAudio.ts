"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { proposalConfig } from "@/config/proposal";

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Fallback procedural soft romantic chime synthesizer in case HTML5 audio fails
  const startFallbackSynth = useCallback(() => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!synthCtxRef.current) {
        synthCtxRef.current = new AudioCtx();
      }
      const ctx = synthCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const notes = [261.63, 329.63, 392.0, 523.25, 493.88, 392.0, 329.63, 293.66]; // C, E, G, C5, B, G, E, D
      let noteIdx = 0;

      if (synthTimerRef.current) window.clearInterval(synthTimerRef.current);

      synthTimerRef.current = window.setInterval(() => {
        if (!ctx || ctx.state !== "running") return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[noteIdx % notes.length], now);
        noteIdx++;

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.5);
      }, 700);
    } catch {
      // Ignore synth errors
    }
  }, []);

  const stopFallbackSynth = useCallback(() => {
    if (synthTimerRef.current) {
      window.clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state === "running") {
      synthCtxRef.current.suspend();
    }
  }, []);

  // Initialize HTML5 Audio safely
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.src = proposalConfig.music;
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.55;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      // If .mp3 fails, try fallback
      if (audio.src.includes(".mp3") && proposalConfig.musicFallback) {
        audio.src = proposalConfig.musicFallback;
        audio.load();
        if (hasInteracted) {
          audio.play().catch(() => {
            setAudioError("Audio playback fallback enabled");
            startFallbackSynth();
          });
        }
      } else {
        setAudioError("Audio file unavailable, fallback active");
        startFallbackSynth();
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    audioRef.current = audio;

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.pause();
      stopFallbackSynth();
    };
  }, [hasInteracted, startFallbackSynth, stopFallbackSynth]);

  const play = useCallback(async () => {
    setHasInteracted(true);
    if (!audioRef.current) return;

    try {
      audioRef.current.muted = isMuted;
      await audioRef.current.play();
      setIsPlaying(true);
      setAudioError(null);
    } catch {
      // Browser autoplay policy or missing codec
      startFallbackSynth();
      setIsPlaying(true);
    }
  }, [isMuted, startFallbackSynth]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopFallbackSynth();
    setIsPlaying(false);
  }, [stopFallbackSynth]);

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
      if (audioRef.current) {
        audioRef.current.muted = nextMuted;
      }
      if (nextMuted) {
        stopFallbackSynth();
      } else if (isPlaying) {
        startFallbackSynth();
      }
      return nextMuted;
    });
  }, [isPlaying, startFallbackSynth, stopFallbackSynth]);

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

