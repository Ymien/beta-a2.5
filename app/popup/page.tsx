import type { Metadata } from 'next';
import PopupStage from '@/components/popup-stage';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PopupMorph - 弹窗形状动画生成器',
  description: '用弹窗组成形状，创建GIF动画效果，自由调整和编辑',
};

export default function PopupPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href="/" 
          className="text-cyan-400 hover:text-cyan-300 tracking-widest text-sm uppercase transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-cyan-900/50 backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          返回主站 / BACK
        </Link>
      </div>
      <PopupStage />
    </div>
  );
}
