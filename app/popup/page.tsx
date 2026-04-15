import type { Metadata } from 'next';
import PopupStage from '@/components/popup-stage';
import SiteHeader from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'PopupMorph - 弹窗形状动画生成器',
  description: '用弹窗组成形状，创建GIF动画效果，自由调整和编辑',
};

export default function PopupPage() {
  return (
    <div className="min-h-screen bg-[#f7f2e8]">
      <SiteHeader active="popup" />
      <div className="relative">
        <PopupStage />
      </div>
    </div>
  );
}
