"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { Play, Pause, Music2, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { useLang } from "@/components/LangProvider";

type Track = {
  title: string;
  artist: string;
  url: string;
};

export default function MusicPlayer() {
  const { lang } = useLang();
  const tracks = useMemo<Track[]>(
    () => [
      {
        title: "Blank Loop",
        artist: "SoundHelix",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
      {
        title: "Soft Static",
        artist: "SoundHelix",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
      {
        title: "Night Draft",
        artist: "SoundHelix",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
    ],
    []
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = tracks[Math.min(trackIndex, tracks.length - 1)] || tracks[0];

  const formatTime = (s: number) => {
    if (!Number.isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      if (isPlaying) {
        setError(null);
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
          setError(lang === "zh" ? "浏览器阻止了自动播放，请点击播放按钮" : "Autoplay is blocked. Click play.");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, lang]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    setError(null);
    setCurrentTime(0);
    setDuration(0);
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        setError(lang === "zh" ? "无法播放该音频源" : "Failed to play this source.");
      });
    }
  }, [track?.url]);

  const seek = (ratio: number) => {
    if (!audioRef.current) return;
    if (!Number.isFinite(duration) || duration <= 0) return;
    const next = Math.max(0, Math.min(duration, duration * ratio));
    audioRef.current.currentTime = next;
    setCurrentTime(next);
  };

  const nextTrack = () => setTrackIndex((i) => (i + 1) % tracks.length);
  const prevTrack = () => setTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={`overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] transition-all duration-300 ${
          isOpen ? "w-[min(360px,calc(100vw-2.5rem))] rounded-3xl" : "w-12 rounded-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center text-white/80 transition hover:text-white"
          aria-label={lang === "zh" ? "打开播放器" : "Open player"}
        >
          <Music2 className="h-5 w-5" />
        </button>

        {isOpen && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-sm font-semibold text-white">
                  {track?.title || (lang === "zh" ? "音乐" : "Music")}
                </div>
                <div className="text-[11px] text-white/45">
                  {track?.artist || "—"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTrack}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                  aria-label={lang === "zh" ? "上一首" : "Previous"}
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted((v) => !v)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                  aria-label={lang === "zh" ? "静音" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((v) => !v)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#e7c7a3] text-[#15130f] transition hover:bg-[#ddb98f]"
                  aria-label={isPlaying ? (lang === "zh" ? "暂停" : "Pause") : (lang === "zh" ? "播放" : "Play")}
                >
                  {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextTrack}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 transition hover:bg-white/[0.1] hover:text-white"
                  aria-label={lang === "zh" ? "下一首" : "Next"}
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden"
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                seek(x / rect.width);
              }}
              aria-label={lang === "zh" ? "拖动进度" : "Seek"}
            >
              <div
                className="h-full bg-[#b45309]"
                style={{
                  width:
                    duration > 0 ? `${Math.min(100, Math.max(0, (currentTime / duration) * 100))}%` : "0%",
                }}
              />
            </button>

            <div className="mt-2 flex items-center justify-between text-[11px] text-white/45 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span>−{formatTime(Math.max(0, duration - currentTime))}</span>
            </div>

            {error && (
              <div className="mt-3 text-[11px] text-[#fecaca]">
                {error}
              </div>
            )}

            <audio
              ref={audioRef}
              src={track?.url}
              preload="none"
              crossOrigin="anonymous"
              onLoadedMetadata={() => {
                if (!audioRef.current) return;
                setDuration(audioRef.current.duration || 0);
              }}
              onTimeUpdate={() => {
                if (!audioRef.current) return;
                setCurrentTime(audioRef.current.currentTime || 0);
              }}
              onEnded={nextTrack}
              onError={() => setError(lang === "zh" ? "音频加载失败（可能被网络拦截）" : "Audio failed to load (network blocked).")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
