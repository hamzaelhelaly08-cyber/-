import React from 'react';
import {
  FileText,
  ChefHat,
  Upload,
  MapPin,
  Building2,
  ArrowUpRight,
} from 'lucide-react';
import {
  CountryCode,
  FACTORY_CORPORATE_PHOTO_STRIP,
  LanguageCode,
  MAIN_SERVICES_PHOTO_STRIP,
  OFFERS_PHOTO_STRIP,
  PHASE1_I18N,
  SUPPORTED_COUNTRIES,
  THREE_CENTRAL_KITCHENS,
  TWELVE_SERVICES,
} from '../data/phase1Data';
import { OfficialCountryFlag } from './OfficialCountryFlags';
import { Service3DIcon } from './Service3DIcon';
import { ContinuousPhotoStrip } from './ContinuousPhotoStrip';

interface Phase1HomeViewProps {
  lang: LanguageCode;
  country: CountryCode;
  customLogoDataUrl: string | null;
  onUploadLogo: (dataUrl: string) => void;
  onNavigateSection: (
    section: string,
    kitchenId?: 'hanger_station' | 'mall_al_ain' | 'al_hurriya'
  ) => void;
}

export const Phase1HomeView: React.FC<Phase1HomeViewProps> = ({
  lang,
  country,
  customLogoDataUrl,
  onUploadLogo,
  onNavigateSection,
}) => {
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];
  const selectedCountry =
    SUPPORTED_COUNTRIES.find((c) => c.code === country) || SUPPORTED_COUNTRIES[0];

  const handleHeroLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadLogo(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* HERO BANNER — Gleaming Pure Milky-White Surface + Strong #FF6B00 Primary Orange */}
      <section className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-5 sm:p-8 transition-colors">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#FF6B00]/15 via-red-400/10 to-transparent blur-3xl"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Headline & Direct CTAs */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-extrabold text-slate-700 dark:text-slate-200">
              <span className="text-[#FF6B00]">{t.heroBadge}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="inline-flex items-center gap-1.5">
                <OfficialCountryFlag country={selectedCountry.code} className="w-5 h-3.5" />
                <span>{isRtl ? selectedCountry.nameAr : selectedCountry.nameEn}</span>
                <span className="font-mono text-[#FF6B00]" dir="ltr">
                  {selectedCountry.dialCode}
                </span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigateSection('quotation')}
                className="px-5 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-4 h-4" />
                <span>{t.heroPrimaryCta}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('kitchens')}
                className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-[#FF6B00] text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <ChefHat className="w-4 h-4 text-[#FF6B00]" />
                <span>{t.heroSecondaryCta}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('join_kitchen')}
                className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{t.joinKitchenTitle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF6B00]" />
              </button>
            </div>
          </div>

          {/* Dedicated Uploadable Official Logo Slot */}
          <div className="lg:col-span-4">
            <label className="group block cursor-pointer rounded-3xl border-2 border-dashed border-[#FF6B00]/60 bg-orange-50/40 dark:bg-orange-950/20 hover:bg-orange-50 dark:hover:bg-orange-950/40 p-5 text-center transition-all">
              {customLogoDataUrl ? (
                <div className="space-y-2">
                  <img
                    src={customLogoDataUrl}
                    alt={t.brandName}
                    className="h-28 w-auto mx-auto object-contain rounded-xl"
                  />
                  <span className="inline-block text-xs font-extrabold text-[#FF6B00]">
                    {isRtl ? 'تغيير الشعار الرسمي المرفوع' : 'Change Official Logo'}
                  </span>
                </div>
              ) : (
                <div className="py-3 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B00] text-white mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {t.officialLogoPlaceholder}
                  </div>
                  <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-[220px] mx-auto">
                    {isRtl
                      ? 'اضغط هنا لرفع الشعار الرسمي للشركة الوطنية اللوجستية (PNG / JPG / SVG)'
                      : 'Tap here to upload your official company logo'}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleHeroLogoUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      {/* SECTION: 12 CORE SERVICES WITH TACTILE 3D VOLUMETRIC ICONS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {t.servicesHeading}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
              {t.servicesSubheading}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {TWELVE_SERVICES.map((srv) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => onNavigateSection(srv.targetSection)}
              className={`group text-start p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all cursor-pointer flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-xl hover:shadow-orange-500/15 ${
                srv.highlighted
                  ? 'border-orange-200 dark:border-orange-900/60 hover:border-[#FF6B00]'
                  : 'border-slate-200 dark:border-slate-800 hover:border-[#FF6B00]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <Service3DIcon iconKey={srv.iconKey} size="md" />
                <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-[#FF6B00] transition-colors shrink-0" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#FF6B00] transition-colors">
                  {isRtl ? srv.titleAr : srv.titleEn}
                </h3>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {isRtl ? srv.subtitleAr : srv.subtitleEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* STRIP 1: Pure Auto-Scrolling Central Kitchens & Services Photo Strip (No Text Inside Photos) */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="جولة في المطابخ المركزية والخدمات"
        titleEn="Central Kitchens & Services Showcase"
        subtitleAr="اسحب الشريط أو اضغط على أي صورة للانتقال الفوري للقسم أو المطبخ"
        subtitleEn="Auto-scrolling showcase — swipe or tap any photo to open its section"
        slides={MAIN_SERVICES_PHOTO_STRIP}
        onNavigateSlide={onNavigateSection}
      />

      {/* STRIP 2: Moving Factory & Corporate Catering Strip */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط المصانع والشركات المتحرك"
        titleEn="Factories & Corporate Catering Showcase"
        subtitleAr="تجهيز وتوصيل وجبات المصانع والمنشآت بمعايير سلامة الغذاء"
        subtitleEn="Factory shift meal preparation and corporate logistics dispatch"
        slides={FACTORY_CORPORATE_PHOTO_STRIP}
        onNavigateSlide={onNavigateSection}
        reverseDirection
      />

      {/* STRIP 3: Moving Active Offers & Meals Strip */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط العروض والوجبات المتحرك"
        titleEn="Offers, Meals & Events Showcase"
        subtitleAr="اضغط على أي عرض لاستعراض تفاصيل الخدمة وطلب عرض السعر"
        subtitleEn="Tap any visual to explore offers, banquets, and gift packages"
        slides={OFFERS_PHOTO_STRIP}
        onNavigateSlide={onNavigateSection}
      />

      {/* SECTION: QUICK ACCESS TO THE 3 CENTRAL KITCHENS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {t.kitchensHeading}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {t.illustrativePhotoNote}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateSection('kitchens')}
            className="text-xs font-black text-[#FF6B00] hover:underline cursor-pointer shrink-0"
          >
            {isRtl ? 'عرض كل المطابخ ←' : 'View All Kitchens →'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {THREE_CENTRAL_KITCHENS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => onNavigateSection('kitchen_detail', k.id)}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#FF6B00] shadow-xs hover:shadow-md text-start flex items-center gap-3.5 transition-all cursor-pointer"
            >
              <img
                src={k.imageUrl}
                alt={isRtl ? k.nameAr : k.nameEn}
                referrerPolicy="no-referrer"
                className="w-20 h-16 rounded-xl object-cover brightness-105 contrast-105 shrink-0 bg-orange-50"
              />
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {isRtl ? k.nameAr : k.nameEn}
                  </span>
                  {k.isHeadquarters && (
                    <Building2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF6B00] truncate">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{isRtl ? k.locationAr : k.locationEn}</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 line-clamp-1">
                  {isRtl ? k.coverageAr : k.coverageEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
