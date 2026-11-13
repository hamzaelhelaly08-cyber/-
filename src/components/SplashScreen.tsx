import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, UtensilsCrossed } from 'lucide-react';
import { LanguageCode } from '../data/phase1Data';
import { BasitBrandMark } from './BasitBrandMark';
import heroPlatformImg from '../assets/images/basit_hero_platform_showcase_1794582817758.jpg';

interface SplashScreenProps {
  lang: LanguageCode;
  customLogoDataUrl: string | null;
  onEnterPlatform: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  lang,
  customLogoDataUrl,
  onEnterPlatform,
}) => {
  const isRtl = lang === 'ar';
  const EnterIcon = isRtl ? ArrowLeft : ArrowRight;
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 2200);

    const doneTimer = window.setTimeout(() => {
      onEnterPlatform();
    }, 2650);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onEnterPlatform]);

  const handleManualEnter = () => {
    setExiting(true);
    window.setTimeout(onEnterPlatform, 240);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-5 transition-opacity duration-500 overflow-hidden ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background:
          'linear-gradient(155deg, #FFFEFC 0%, #F8F5FF 55%, #F2EBFF 100%)',
      }}
    >
      {/* Subtle luminous halos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -start-24 w-96 h-96 rounded-full bg-[#852BEB]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -end-24 w-96 h-96 rounded-full bg-[#F4E600]/22 blur-3xl"
      />

      <div className="relative z-10 max-w-xl w-full text-center space-y-6 ce-splash-fade">
        {/* Centralized Brand Crest */}
        <div className="flex justify-center ce-splash-float">
          <BasitBrandMark
            customLogoDataUrl={customLogoDataUrl}
            size="xl"
            isRtl={isRtl}
          />
        </div>

        {/* BASIT Brand Identity */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4E600] text-[#1A132B] text-xs font-black tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#852BEB]" />
            <span>
              {isRtl
                ? 'منصة التجارة والمطاعم والتوصيل والفرص الدولية'
                : 'Global Dining, Commerce, Delivery & Opportunities'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-[#1A132B] tracking-tight">
            BASIT <span className="text-[#852BEB]">| بسيط</span>
          </h1>

          <p className="text-sm sm:text-base font-extrabold text-[#5B18B0]">
            {isRtl
              ? '« تجربة رقمية عالمية... في متناول يدك. »'
              : '« One luminous global platform for every daily & business need. »'}
          </p>
        </div>

        {/* Visual Lifestyle Card */}
        <div className="mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-[#852BEB]/15 border border-[#ECE7F6] bg-white">
          <div className="relative h-36 sm:h-44 overflow-hidden">
            <img
              src={heroPlatformImg}
              alt="BASIT Platform Showcase"
              className="w-full h-full object-cover brightness-105 contrast-105"
            />
          </div>
          <div className="px-4 py-3 bg-white flex items-center justify-between text-xs font-extrabold text-[#1A132B]">
            <span className="flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-[#852BEB]" />
              <span>
                {isRtl
                  ? 'المطاعم · التسوق · التوصيل · الفرص'
                  : 'Dining · Markets · Delivery · Opportunities'}
              </span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#F8F5FF] text-[#852BEB] font-black">
              {isRtl ? 'مصر · دبي · المملكة المتحدة' : 'EG · UAE · UK'}
            </span>
          </div>
        </div>

        {/* Instant Skip / Enter CTA */}
        <div className="pt-1 flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={handleManualEnter}
            className="px-8 py-3.5 rounded-2xl bg-[#852BEB] hover:bg-[#6E1ED1] text-white text-sm font-black shadow-xl shadow-[#852BEB]/30 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <span>
              {isRtl ? 'ادخل إلى منصة BASIT الآن' : 'Enter BASIT Platform'}
            </span>
            <EnterIcon className="w-4 h-4 text-[#F4E600]" />
          </button>

          <span className="text-[11px] font-bold text-[#6E6485]">
            {isRtl
              ? 'جاري الانتقال تلقائياً خلال لحظات...'
              : 'Entering platform automatically...'}
          </span>
        </div>
      </div>
    </div>
  );
};
