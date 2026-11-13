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

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={`flex items-center gap-1.5 rounded-xl bg-[#852BEB] hover:bg-[#6E1ED1] px-3 py-2 text-xs font-extrabold text-white shadow-md shadow-[#852BEB]/25 transition-all cursor-pointer whitespace-nowrap ${className}`}
        title={isRtl ? 'تثبيت تطبيق BASIT | بسيط' : 'Install BASIT App'}
      >
        <Download className="w-4 h-4 shrink-0 text-[#F4E600]" />
        <span>{compact ? (isRtl ? 'تثبيت' : 'Install') : isRtl ? 'تثبيت التطبيق' : 'Install App'}</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowInstallGuide(true)}
        className={`flex items-center gap-1.5 rounded-xl border border-[#852BEB]/35 bg-[#F8F5FF] hover:bg-[#852BEB] text-[#5B18B0] hover:text-white dark:bg-[#24163D] dark:text-[#E9D5FF] dark:border-[#852BEB]/50 dark:hover:bg-[#852BEB] dark:hover:text-white px-2.5 sm:px-3 py-2 text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap ${className}`}
        title={isRtl ? 'تثبيت تطبيق BASIT على الهاتف' : 'Install BASIT on Mobile'}
      >
        {isIOS ? <Apple className="w-4 h-4 shrink-0" /> : <Download className="w-4 h-4 shrink-0" />}
        <span>{compact ? (isRtl ? 'تثبيت' : 'Install') : isRtl ? 'تثبيت التطبيق' : 'Install App'}</span>
      </button>

      {showInstallGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A132B]/60 backdrop-blur-xs p-4"
          onClick={() => setShowInstallGuide(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-[#FFFEFC] dark:bg-[#1C1430] border border-[#ECE7F6] dark:border-[#852BEB]/40 p-6 shadow-2xl text-[#1A132B] dark:text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE7F6] dark:border-[#852BEB]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#852BEB] text-white flex items-center justify-center shadow-sm">
                  <Smartphone className="w-5 h-5 text-[#F4E600]" />
                </div>
                <div>
                  <h3 className="text-sm font-black">
                    {isRtl ? 'تثبيت تطبيق BASIT | بسيط' : 'Install BASIT App'}
                  </h3>
                  <p className="text-[11px] text-[#6E6485] dark:text-[#B8AED1]">
                    {isRtl ? 'يعمل كتطبيق مستقل على الهاتف والكمبيوتر' : 'Runs standalone on Android, iPhone & Desktop'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="p-1.5 rounded-xl bg-[#F8F7FB] dark:bg-[#2A1F44] text-[#1A132B] dark:text-white hover:bg-[#ECE7F6] cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs leading-relaxed text-[#4A4160] dark:text-[#DDD6FE]">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#852BEB] text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'افتح الرابط في متصفح Safari ثم اضغط على زر المشاركة (Share) بالأسفل.'
                      : 'Open in Safari and tap the Share icon at the bottom bar.'}
                    <Share2 className="inline w-3.5 h-3.5 mx-1 text-[#852BEB]" />
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#852BEB] text-white flex items-center justify-center font-bold shrink-0">2</span>
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
              <div className="space-y-3 text-xs leading-relaxed text-[#4A4160] dark:text-[#DDD6FE]">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#852BEB] text-white flex items-center justify-center font-bold shrink-0">1</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'افتح الرابط في متصفح Chrome على الهاتف، ثم اضغط قائمة النقاط الثلاث بالأعلى.'
                      : 'Open in Chrome on mobile and tap the top-right 3-dots menu.'}
                    <MoreVertical className="inline w-3.5 h-3.5 mx-1 text-[#852BEB]" />
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#852BEB] text-white flex items-center justify-center font-bold shrink-0">2</span>
                  <p className="flex-1">
                    {isRtl
                      ? 'اختر "تثبيت التطبيق" (Install App) أو "الإضافة إلى الشاشة الرئيسية" (Add to Home Screen).'
                      : 'Tap "Install App" or "Add to Home Screen".'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FEFCE8] dark:bg-[#2F2810] border border-[#F4E600]/60 text-[11px] font-semibold text-[#1A132B] dark:text-[#FEF08A]">
                  {isRtl
                    ? 'ملاحظة: إذا كنت تتصفح من داخل نافذة المعاينة المضمنة، افتح رابط التطبيق مباشرة في Chrome أو Safari لتفعيل التثبيت الفوري.'
                    : 'Note: If viewing inside an embedded frame, open the direct URL in Chrome or Safari for native install.'}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowInstallGuide(false)}
              className="w-full rounded-xl bg-[#852BEB] hover:bg-[#6E1ED1] py-3 text-xs font-extrabold text-white shadow-md shadow-[#852BEB]/25 cursor-pointer"
            >
              {isRtl ? 'حسناً' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
