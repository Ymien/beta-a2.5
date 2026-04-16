"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Music2, Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/components/LangProvider";

export default function MusicPlayer() {
  const { lang } = useLang();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={`overflow-hidden border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.55)] transition-all duration-300 ${
          isOpen ? "w-[min(320px,calc(100vw-2.5rem))] rounded-3xl" : "w-12 rounded-full"
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
                  {lang === "zh" ? "音乐" : "Music"}
                </div>
                <div className="text-[11px] text-white/45">
                  {lang === "zh" ? "点击播放开始" : "Click play to start"}
                </div>
              </div>

              <div className="flex items-center gap-2">
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
              </div>
            </div>

            <div className="mt-3 h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#b45309]" style={{ width: `${Number.isFinite(progress) ? progress : 0}%` }} />
            </div>

            {error && (
              <div className="mt-3 text-[11px] text-[#fecaca]">
                {error}
              </div>
            )}

            <audio
              ref={audioRef}
              src={audioUrl}
              preload="none"
              crossOrigin="anonymous"
              onTimeUpdate={handleTimeUpdate}
              onError={() => setError(lang === "zh" ? "音频加载失败" : "Audio failed to load")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
