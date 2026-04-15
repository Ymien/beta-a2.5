"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 占位无版权免费音乐 URL
  const audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_2d8fb6165e.mp3?filename=cyberpunk-2099-10701.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="w-14 h-14 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center cursor-pointer shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:w-64 group-hover:rounded-2xl transition-all duration-500 overflow-hidden">
        
        {/* Compact View */}
        <div className={`absolute transition-opacity duration-300 ${isPlaying ? 'animate-spin-slow' : ''} group-hover:opacity-0`}>
          <Music2 className={`w-6 h-6 ${isPlaying ? 'text-cyan-400' : 'text-zinc-400'}`} />
        </div>

        {/* Expanded View */}
        <div className="absolute inset-0 px-4 py-2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex-shrink-0 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
            <div className="w-3 h-3 bg-[#0f172a] rounded-full"></div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate w-full">Cyberpunk 2099</h4>
            <p className="text-[10px] text-zinc-400 truncate w-full">Xyu Mix</p>
            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-cyan-400 hover:bg-white/20 transition-colors flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
          </button>
        </div>

        <audio 
          ref={audioRef}
          src={audioUrl}
          loop
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
}