type CyberLoaderProps = {
  accent: "cyan" | "purple" | "fuchsia";
  label: string;
};

const SPINNER_ACCENT_CLASS: Record<CyberLoaderProps["accent"], string> = {
  cyan: "border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]",
  purple: "border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
  fuchsia: "border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.5)]",
};

const TEXT_ACCENT_CLASS: Record<CyberLoaderProps["accent"], string> = {
  cyan: "text-cyan-400/70",
  purple: "text-purple-400/70",
  fuchsia: "text-fuchsia-400/70",
};

export default function CyberLoader({ accent, label }: CyberLoaderProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${SPINNER_ACCENT_CLASS[accent]}`}
        />
        <p
          className={`text-sm tracking-widest uppercase animate-pulse ${TEXT_ACCENT_CLASS[accent]}`}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
