"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/design/motion";

interface VideoPlayerProps {
  src: string;
  title: string;
  provider?: "mux" | "vimeo" | "native";
  maxDurationMinutes?: number;
  onComplete?: () => void;
}

export function VideoPlayer({
  src,
  title,
  provider = "native",
  maxDurationMinutes = 6,
  onComplete,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onComplete?.();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onComplete]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Check if video exceeds recommended duration (6 minutes per PRD)
  const exceedsRecommendedDuration = duration > maxDurationMinutes * 60;

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="glass-effect rounded-2xl overflow-hidden"
    >
      {/* Video Container */}
      <div className="relative aspect-video bg-black group">
        {provider === "native" ? (
          <video
            ref={videoRef}
            className="w-full h-full"
            src={src}
            onClick={togglePlay}
          >
            <track kind="captions" />
          </video>
        ) : provider === "mux" ? (
          <iframe
            src={src}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <iframe
            src={src}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}

        {/* Play Overlay (for native video only) */}
        {provider === "native" && !isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
          >
            <div className="w-20 h-20 rounded-full bg-accent-primary/90 flex items-center justify-center hover:bg-accent-primary transition-colors">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Controls (for native video only) */}
      {provider === "native" && (
        <div className="p-4 space-y-3">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-primary rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-text-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Title & Duration Warning */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {exceedsRecommendedDuration && (
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Exceeds recommended 6min duration</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
