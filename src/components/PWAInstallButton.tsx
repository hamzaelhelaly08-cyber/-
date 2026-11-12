import React, { useState } from 'react';
import { Download, Smartphone, X, Check, Apple, Share2, MoreVertical } from 'lucide-react';
import { usePWAInstall } from '../lib/usePWAInstall';

interface PWAInstallButtonProps {
  isRtl?: boolean;
  className?: string;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  isRtl = true,
  className = '',
  compact = false,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  // If already running inside standalone installed PWA window, hide
  if (isInstalled) {
    return null;
  }

  // Native Chromium / Android beforeinstallprompt ready
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`flex items-center gap-1.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 px-3 py-2 text-xs font-extrabold text-white shadow-md shadow-orange-500/30 transition-all cursor-pointer whitespace-nowrap ${className}`}
        title={isRtl ? 'تثبيت تطبيق CATERING EGYPT' : 'Install Catering Egypt App'}
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>{compact ? (isRtl ? 'تثبيت' : 'Install') : isRtl ? 'تثبيت التطبيق' : 'Install App'}</span>
      </button>
    );
  }

  // Fallback Modal Guide (No window.alert! Works cleanly on Android Chrome, iOS Safari, and Desktop)
  return (
    <>
      <button
        type="button"
        onClick={() => setShowInstallGuide(true)}
        className={`flex items-center gap-1.5 rounded-xl border border-[#FF6B00] bg-orange-50 hover:bg-[#FF6B00] text-[#FF6B00] hover:text-white dark:bg-orange-950/50 dark:text-orange-300 dark:hover:bg-[#FF6B00] dark:hover:text-white px-2.5 sm:px-3 py-2 text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap ${className}`}
        title={isRtl ? 'تثبيت التطبيق على الهاتف' : 'Install App on Mobile'}
      >
        {isIOS ? <Apple className="w-4 h-4 shrink-0" /> : <Download className="w-4 h-4 shrink-0" />}
        <span>{compact ? (isRtl ? 'تثبيت' : 'Install') : isRtl ? 'تثبيت التطبيق' : 'Install App'}</span>
      </button>

      {showInstallGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
          onClick={() => setShowInstallGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-6 shadow-2xl text-slate-900 dark:text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black">
                    {isRtl ? 'تثبيت تطبيق CATERING EGYPT' : 'Install CATERING EGYPT App'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {isRtl ? 'يعمل كتطبيق مستقل على الهاتف والكمبيوتر' : 'Runs standalone on Android, iPhone & Desktop'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'افتح الرابط في متصفح Safari ثم اضغط على زر المشاركة (Share) بالأسفل.'
                      : 'Open in Safari and tap the Share icon at the bottom bar.'}
                    <Share2 className="inline w-3.5 h-3.5 mx-1 text-[#FF6B00]" />
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).'
                      : 'Scroll down and choose "Add to Home Screen".'}
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <p className="flex-1">
                    {isRtl
                      ? 'اضغط "إضافة" ليظهر التطبيق مباشرة على شاشة هاتفك الرئيسية.'
                      : 'Tap "Add" to place the app icon directly on your home screen.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'افتح الرابط في متصفح Chrome على الهاتف، ثم اضغط قائمة النقاط الثلاث بالأعلى.'
                      : 'Open in Chrome on mobile and tap the top-right 3-dots menu.'}
                    <MoreVertical className="inline w-3.5 h-3.5 mx-1 text-[#FF6B00]" />
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'اختر "تثبيت التطبيق" (Install App) أو "الإضافة إلى الشاشة الرئيسية" (Add to Home Screen).'
                      : 'Tap "Install App" or "Add to Home Screen".'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-200">
                  {isRtl
                    ? 'ملاحظة: إذا كنت تتصفح من داخل نافذة المعاينة المضمنة (iFrame)، افتح رابط التطبيق مباشرة في Chrome أو Safari لتفعيل التثبيت الفوري.'
                    : 'Note: If viewing inside an embedded preview frame, open the direct app URL in Chrome or Safari for native install prompt.'}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowInstallGuide(false)}
              className="w-full rounded-xl bg-[#FF6B00] hover:bg-orange-600 py-3 text-xs font-extrabold text-white shadow-md shadow-orange-500/25 cursor-pointer"
            >
              {isRtl ? 'حسناً' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
