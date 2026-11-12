import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  CheckCircle2,
  Move,
  FileText,
  ChefHat,
  Factory,
} from 'lucide-react';
import { LanguageCode, PHASE1_I18N } from '../data/phase1Data';

export interface SupportMessageEntry {
  id: string;
  senderName: string;
  text: string;
  createdAt: string;
}

interface Phase1SupportDrawerProps {
  lang: LanguageCode;
  messages: SupportMessageEntry[];
  onSendMessage: (msg: SupportMessageEntry) => void;
  onQuickNavigate?: (section: string) => void;
}

export const Phase1SupportDrawer: React.FC<Phase1SupportDrawerProps> = ({
  lang,
  messages,
  onSendMessage,
  onQuickNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [messageText, setMessageText] = useState('');
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];

  // Freely draggable x/y coordinates across the entire viewport (touch + mouse pointer)
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    const winW = typeof window !== 'undefined' ? window.innerWidth : 390;
    const winH = typeof window !== 'undefined' ? window.innerHeight : 800;
    return {
      x: Math.max(16, winW - 76),
      y: Math.max(90, winH - 148),
    };
  });

  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    moved: boolean;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
    moved: false,
  });

  // Keep button inside viewport when window resizes
  useEffect(() => {
    const onResize = () => {
      setPos((prev) => ({
        x: Math.min(Math.max(12, prev.x), window.innerWidth - 68),
        y: Math.min(Math.max(68, prev.y), window.innerHeight - 86),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: pos.x,
      origY: pos.y,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragStateRef.current.dragging) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      dragStateRef.current.moved = true;
    }
    const maxX = window.innerWidth - 68;
    const maxY = window.innerHeight - 86;
    const nextX = Math.min(Math.max(12, dragStateRef.current.origX + dx), maxX);
    const nextY = Math.min(Math.max(68, dragStateRef.current.origY + dy), maxY);
    setPos({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const wasTap = !dragStateRef.current.moved;
    dragStateRef.current.dragging = false;
    if (wasTap) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    onSendMessage({
      id: `SUP-${Date.now().toString().slice(-4)}`,
      senderName: senderName.trim() || (isRtl ? 'زائر المنصة' : 'Platform Visitor'),
      text: messageText.trim(),
      createdAt: new Date().toLocaleTimeString(),
    });
    setMessageText('');
  };

  return (
    <>
      {/* Freely Draggable Floating AI & Support Icon across ENTIRE screen */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          touchAction: 'none',
          background: 'linear-gradient(145deg, #FF8A2B 0%, #FF6B00 60%, #DC2626 100%)',
          boxShadow:
            '0 14px 28px -6px rgba(255, 107, 0, 0.55), 0 4px 0 0 #B83E00, inset 0 2px 4px rgba(255, 255, 255, 0.5)',
        }}
        aria-label={t.supportFloatingTitle}
        title={isRtl ? 'اسحب الأيقونة لأي مكان على الشاشة أو اضغط للفتح' : 'Drag anywhere on screen or tap to open'}
        className="fixed z-50 w-14 h-14 rounded-2xl text-white flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none transition-transform hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <Bot className="w-6 h-6 drop-shadow" />
            <span className="text-[8px] font-black tracking-tight leading-none mt-0.5 flex items-center gap-0.5">
              <Move className="w-2.5 h-2.5" />
              <span>AI</span>
            </span>
          </>
        )}
      </button>

      {/* Non-Blocking Floating AI Assistant & Support Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 end-4 sm:end-6 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-3xl bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col">
          <div className="p-4 bg-gradient-to-r from-[#FF6B00] to-orange-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black">{t.supportFloatingTitle}</h4>
                <p className="text-[10px] text-orange-100">
                  {isRtl ? 'يمكنك تحريك الأيقونة بحرية على الشاشة' : 'Freely movable floating assistant'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Assistant Navigation Actions */}
          {onQuickNavigate && (
            <div className="px-3.5 pt-3 pb-1 flex flex-wrap gap-1.5 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  onQuickNavigate('quotation');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3 h-3 text-[#FF6B00]" />
                <span>{t.heroPrimaryCta}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onQuickNavigate('kitchens');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 cursor-pointer"
              >
                <ChefHat className="w-3 h-3 text-[#FF6B00]" />
                <span>{t.nav.kitchens}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onQuickNavigate('service_corporate');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1 cursor-pointer"
              >
                <Factory className="w-3 h-3 text-[#FF6B00]" />
                <span>{isRtl ? 'عروض المصانع' : 'Corporate'}</span>
              </button>
            </div>
          )}

          <div className="p-3.5 max-h-56 overflow-y-auto space-y-2.5 bg-slate-50 dark:bg-slate-950/60">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {t.supportWelcome}
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className="p-2.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-[#FF6B00]">
                  <span>{m.senderName}</span>
                  <span>{m.createdAt}</span>
                </div>
                <p className="text-slate-900 dark:text-slate-100">{m.text}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{isRtl ? 'تم حفظ الاستفسار' : 'Saved for review'}</span>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-2"
          >
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder={isRtl ? 'الاسم أو الجهة (اختياري)' : 'Name (optional)'}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
            />
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                required
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={isRtl ? 'اكتب استفسارك أو طلبك...' : 'Write your question...'}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
              />
              <button
                type="submit"
                aria-label={t.supportSend}
                className="p-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
