// Generate self-contained HTML for real popup windows
// These are written via document.write() into window.open() targets

import type { WindowStyle } from './shapes';

export interface PopupConfig {
  title: string;
  content: string;
  color: string;
  style: WindowStyle;
  width: number;
  height: number;
}

export function generatePopupHTML(config: PopupConfig): string {
  switch (config.style) {
    case 'win95':
      return generateWin95(config);
    case 'macos':
      return generateMacOS(config);
    case 'tkinter':
      return generateTkinter(config);
    case 'modern':
      return generateModern(config);
    case 'linux':
      return generateLinux(config);
    default:
      return generateModern(config);
  }
}

function generateWin95(c: PopupConfig): string {
  return `<!DOCTYPE html><html><head><title>${esc(c.title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;font-family:'MS Sans Serif','Microsoft YaHei',sans-serif}
.win{width:100%;height:100%;display:flex;flex-direction:column;border:2px solid;border-color:#fff #808080 #808080 #fff;background:#c0c0c0}
.bar{display:flex;align-items:center;justify-content:space-between;padding:1px 2px;background:linear-gradient(90deg,#000080,#1084d0);color:#fff;font-size:11px;font-weight:bold}
.bar button{width:16px;height:14px;display:flex;align-items:center;justify-content:center;border:2px solid;border-color:#fff #808080 #808080 #fff;background:#c0c0c0;color:#000;font-size:9px;font-weight:bold;cursor:pointer;line-height:1}
.bar button:hover{background:#d4d0c8}
.body{flex:1;display:flex;align-items:center;justify-content:center;border:2px solid;border-color:#808080 #fff #fff #808080;background:#fff;margin:2px}
.body span{font-size:13px;color:#000;font-family:'Microsoft YaHei',sans-serif}
</style></head><body>
<div class="win">
  <div class="bar"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:4px">${esc(c.title)}</span><button onclick="window.close()">&#10005;</button></div>
  <div class="body"><span>${esc(c.content)}</span></div>
</div>
</body></html>`;
}

function generateMacOS(c: PopupConfig): string {
  return `<!DOCTYPE html><html><head><title>${esc(c.title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;font-family:-apple-system,'Helvetica Neue','PingFang SC',sans-serif;background:rgba(255,255,255,0.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.win{width:100%;height:100%;display:flex;flex-direction:column;border-radius:8px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.12)}
.bar{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid rgba(0,0,0,0.06)}
.dot{width:12px;height:12px;border-radius:50%;cursor:pointer}
.dot:hover{filter:brightness(0.85)}
.close{background:#FF5F57}.min{background:#FEBC2E}.max{background:#28C840}
.body{flex:1;display:flex;align-items:center;justify-content:center;padding:4px;background:${esc(c.color)}15}
.body span{font-size:14px;color:rgba(0,0,0,0.75);font-weight:500}
</style></head><body>
<div class="win">
  <div class="bar"><div class="dot close" onclick="window.close()"></div><div class="dot min"></div><div class="dot max"></div></div>
  <div class="body"><span>${esc(c.content)}</span></div>
</div>
</body></html>`;
}

function generateTkinter(c: PopupConfig): string {
  return `<!DOCTYPE html><html><head><title>${esc(c.title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;font-family:'TkDefaultFont','Microsoft YaHei','SimHei',sans-serif}
.win{width:100%;height:100%;display:flex;flex-direction:column;border:1px solid #aaa;background:#d9d9d9}
.bar{display:flex;align-items:center;justify-content:space-between;padding:1px 2px;border-bottom:1px solid #aaa;background:#d9d9d9}
.bar span{font-size:10px;color:#000}
.bar button{width:16px;height:14px;display:flex;align-items:center;justify-content:center;border:1px solid #888;background:#d9d9d9;color:#000;font-size:8px;cursor:pointer}
.bar button:hover{background:#ccc}
.body{flex:1;display:flex;align-items:center;justify-content:center;background:${esc(c.color)}}
.body span{font-size:14px;color:#000;font-weight:bold;font-family:'Microsoft YaHei',sans-serif}
</style></head><body>
<div class="win">
  <div class="bar"><span>${esc(c.title)}</span><button onclick="window.close()">&#10005;</button></div>
  <div class="body"><span>${esc(c.content)}</span></div>
</div>
</body></html>`;
}

function generateModern(c: PopupConfig): string {
  return `<!DOCTYPE html><html><head><title>${esc(c.title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;font-family:'Segoe UI','PingFang SC',sans-serif}
.win{width:100%;height:100%;display:flex;flex-direction:column;border-radius:6px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.2);background:${esc(c.color)}}
.bar{display:flex;align-items:center;gap:4px;padding:4px 8px;background:rgba(0,0,0,0.15)}
.dot{width:10px;height:10px;border-radius:50%;cursor:pointer;transition:background 0.15s}
.close{background:rgba(255,255,255,0.8)}.close:hover{background:#f44}
.dots{background:rgba(255,255,255,0.4)}
.body{flex:1;display:flex;align-items:center;justify-content:center;padding:4px}
.body span{font-size:13px;color:#fff;font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,0.2)}
</style></head><body>
<div class="win">
  <div class="bar"><div class="dot close" onclick="window.close()"></div><div class="dot dots"></div><div class="dot dots"></div></div>
  <div class="body"><span>${esc(c.content)}</span></div>
</div>
</body></html>`;
}

function generateLinux(c: PopupConfig): string {
  return `<!DOCTYPE html><html><head><title>${esc(c.title)}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;font-family:'Cantarell','Ubuntu','PingFang SC',sans-serif}
.win{width:100%;height:100%;display:flex;flex-direction:column;border-radius:6px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.35);background:#2c2c2c}
.bar{display:flex;align-items:center;justify-content:center;padding:6px 8px;border-bottom:1px solid rgba(255,255,255,0.05);position:relative}
.bar span{font-size:11px;color:rgba(255,255,255,0.6);font-weight:500}
.close-btn{position:absolute;left:8px;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#353535;color:rgba(255,255,255,0.5);font-size:9px;cursor:pointer}
.close-btn:hover{background:#404040;color:#fff}
.body{flex:1;display:flex;align-items:center;justify-content:center;background:${esc(c.color)}20;padding:4px}
.body span{font-size:13px;color:rgba(255,255,255,0.85)}
</style></head><body>
<div class="win">
  <div class="bar"><div class="close-btn" onclick="window.close()">&#10005;</div><span>${esc(c.title)}</span></div>
  <div class="body"><span>${esc(c.content)}</span></div>
</div>
</body></html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
