import React from 'react';
import {
  FileText,
  ChefHat,
  Upload,
  MapPin,
  Building2,
  ArrowUpRight,
  Sparkles,
  FileDown,
  Ticket,
  Crown,
  UtensilsCrossed,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import {
  CountryCode,
  LanguageCode,
  PHASE1_I18N,
  SUPPORTED_COUNTRIES,
  THREE_CENTRAL_KITCHENS,
  TWELVE_SERVICES,
} from '../data/phase1Data';
import {
  AL_AIN_RESTAURANTS,
  EXPERIMENTAL_TAG_AR,
  EXPERIMENTAL_TAG_EN,
  STRIP_1_HERO_CAMPAIGNS,
  STRIP_2_AL_AIN_RESTAURANTS,
  STRIP_3_COUPONS_OFFERS,
  STRIP_4_ENTERTAINMENT_WELLNESS,
  STRIP_5_OCCASIONS_FESTIVALS,
  STRIP_6_CORPORATE_OPERATIONS,
} from '../data/visitorWorldData';
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
  onOpenReportPdf?: () => void;
  onOpenQuotePdf?: () => void;
}

export const Phase1HomeView: React.FC<Phase1HomeViewProps> = ({
  lang,
  country,
  customLogoDataUrl,
  onUploadLogo,
  onNavigateSection,
  onOpenReportPdf,
  onOpenQuotePdf,
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

  const visitorDestinations = [
    {
      section: 'al_ain_restaurants',
      iconKey: 'utensils',
      titleAr: 'مطاعم العين | عالم من المذاقات',
      titleEn: 'Al Ain Restaurants (12 Outlets)',
      descAr: '12 منفذاً ومطعماً: بيتزا العين، كوشري، مندي، مشويات، سوشي، هندي، تركي، باستا، حلويات، والمزيد.',
      descEn: '12 dining destinations including Pizza, Mandi, Grills, Sushi, Indian, Turkish, Pasta & Market.',
      badgeAr: '12 مطعماً',
      badgeEn: '12 Venues',
    },
    {
      section: 'al_ain_majlis',
      iconKey: 'banquet',
      titleAr: 'مجلس ضيافة العين',
      titleEn: 'Majlis Al Ain Hospitality',
      descAr: 'تجربة الكبدة الجمالي الحية، صواني المندي، جلسات الضيافة الشرقية وعروض المجلس.',
      descEn: 'Camel Liver live experience, royal Mandi platters & curated Arabic lounge hospitality.',
      badgeAr: 'تجربة خاصة',
      badgeEn: 'Signature',
    },
    {
      section: 'al_ain_wellness',
      iconKey: 'salt',
      titleAr: 'الترفيه والعناية الشخصية + بيت الملح',
      titleEn: 'Wellness, Men Salon & Salt House',
      descAr: 'صالون حلاقة رجالي فاخر، سبا وحمام مغربي وبخار، وتجربة الاسترخاء في بيت الملح.',
      descEn: 'Luxury barber salon, Moroccan bath, steam spa & calm backlit crystal Salt House.',
      badgeAr: 'استرخاء وسبا',
      badgeEn: 'Wellness',
    },
    {
      section: 'al_ain_kids',
      iconKey: 'kids',
      titleAr: 'Kids Area — استمتع أنت وأولادك',
      titleEn: 'Kids Area & Family Play',
      descAr: 'مساحات ألعاب آمنة وممتعة للأطفال وتجمعات العائلات مع قسائم وباقات عائلية.',
      descEn: 'Safe interactive indoor games arena and family packages.',
      badgeAr: 'عائلي',
      badgeEn: 'Family Fun',
    },
    {
      section: 'al_ain_circus',
      iconKey: 'circus',
      titleAr: 'السيرك والترفيه',
      titleEn: 'Circus & Live Shows',
      descAr: 'عروض بهلوانية ومسرحية وأضواء احتفالية متكاملة مع نظام كوبونات الوطنية اللوجستية.',
      descEn: 'Festive circus marquee shows integrated with National Logistics discount coupons.',
      badgeAr: 'عروض حية',
      badgeEn: 'Live Shows',
    },
    {
      section: 'al_ain_oriental_nights',
      iconKey: 'oud',
      titleAr: 'ليالي الطرب الشرقي',
      titleEn: 'Oriental Music Nights',
      descAr: 'أمسيات العود والتخت الشرقي الهادئة مساء الخميس والجمعة مع ضيافة شرقية راقية.',
      descEn: 'Thursday & Friday evening Oud and classical Arabic takht lounge sessions.',
      badgeAr: 'الخميس والجمعة',
      badgeEn: 'Thu & Fri',
    },
    {
      section: 'al_ain_coupons',
      iconKey: 'coupon',
      titleAr: 'عروض وخصومات الوطنية اللوجستية',
      titleEn: 'National Logistics Discount Coupons',
      descAr: '9 قسائم خصم بمساحة تعديل تجريبية ورمز QR تفاعلي للمطاعم والسبا والسيرك والمناسبات.',
      descEn: '9 perforated ticket vouchers with copyable codes, terms & interactive QR verification.',
      badgeAr: '9 كوبونات',
      badgeEn: '9 Vouchers',
    },
    {
      section: 'al_ain_occasions',
      iconKey: 'party',
      titleAr: 'المناسبات والاحتفالات والعبوات',
      titleEn: 'Occasions, Seasons & Packaging',
      descAr: '10 مواسم واحتفالات (رمضان، الأعياد، الكحك، الأفراح، بوفيهات VIP، علب الهدايا).',
      descEn: '10 seasonal celebrations & luxury packaging boxes branded for National Logistics.',
      badgeAr: '10 مواسم',
      badgeEn: '10 Seasons',
    },
  ];

  return (
    <div className="space-y-9 pb-8">
      {/* HERO BANNER — Radiant White Milky Surface + #FF6B00 Primary Orange */}
      <section className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-5 sm:p-8 transition-colors">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -end-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#FF6B00]/15 via-red-400/10 to-transparent blur-3xl"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Headline & Direct Visitor + PDF CTAs */}
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
                onClick={() => onNavigateSection('al_ain_restaurants')}
                className="px-5 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-orange-500/30 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isRtl ? 'عالم مطاعم وترفيه العين' : 'Al Ain Visitor World'}</span>
              </button>

              <button
                type="button"
                onClick={() => (onOpenQuotePdf ? onOpenQuotePdf() : onNavigateSection('quotation'))}
                className="px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-[#FF6B00] text-white border border-slate-800 dark:border-slate-700 text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <FileDown className="w-4 h-4" />
                <span>{isRtl ? 'عروض الأسعار PDF' : 'Quote Builder PDF'}</span>
              </button>

              <button
                type="button"
                onClick={() => (onOpenReportPdf ? onOpenReportPdf() : onNavigateSection('kitchens'))}
                className="px-4 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-[#FF6B00] text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-4 h-4 text-[#FF6B00]" />
                <span>{isRtl ? 'التقارير A4 PDF' : 'Reports A4 PDF'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('kitchens')}
                className="px-4 py-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-950/50 text-[#FF6B00] border border-orange-200 dark:border-orange-900/60 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <ChefHat className="w-4 h-4" />
                <span>{t.heroSecondaryCta}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateSection('fayd_ecosystem')}
                className="px-4 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4 text-[#FF6B00]" />
                <span>{isRtl ? 'منظومة FAYD للشركاء والتوصيل والفرص' : 'FAYD Partners & Delivery Hub'}</span>
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

      {/* STRIP 1: Hero & Campaign Highlights Photo Strip (Zero Text Inside Photos) */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط الحملات والتجارب الرئيسية"
        titleEn="Featured Dining & Hospitality Highlights"
        subtitleAr="اسحب الشريط أو اضغط على أي صورة للانتقال المباشر للتجربة"
        subtitleEn="Auto-scrolling showcase — swipe or tap any visual to enter"
        slides={STRIP_1_HERO_CAMPAIGNS}
        onNavigateSlide={onNavigateSection}
      />

      {/* STAGE 4: PUBLIC VISITOR & ENTERTAINMENT WORLD — AL AIN MALL & MAJLIS */}
      <section className="space-y-5">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-orange-950/20 border border-orange-200/80 dark:border-orange-900/50 p-5 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[#FF6B00]">
                <Crown className="w-4 h-4" />
                <span>
                  {isRtl
                    ? 'تجربة الزوار والضيافة العامة — مول العين ومجالس الضيافة'
                    : 'Public Visitor Hospitality — Al Ain Mall & Majlis'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {isRtl
                  ? 'كل لحظة ضيافة... تبدأ من اختيارك'
                  : 'Every Hospitality Moment Begins With Your Choice'}
              </h2>

              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {isRtl
                  ? 'عالم متكامل لزوار المطاعم والترفيه في مول العين ومجلس الضيافة: 12 مطعماً ومنفذاً، سبا وبيت الملح، صالون رجالي، Kids Area، السيرك، ليالي الطرب الشرقي، قسائم الخصومات والمناسبات.'
                  : 'Complete visitor showcase for Al Ain dining, wellness, Salt House, Kids Area, Circus, Oriental music nights, discount vouchers, and seasonal gift hampers.'}
              </p>

              <div className="inline-block text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 px-3 py-1 rounded-lg">
                {isRtl ? EXPERIMENTAL_TAG_AR : EXPERIMENTAL_TAG_EN}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigateSection('al_ain_restaurants')}
                  className="px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'استعراض 12 مطعماً بالعين' : 'Explore 12 Outlets'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('al_ain_coupons')}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-red-600/20 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>{isRtl ? '9 كوبونات خصم تجريبية' : '9 Demo Coupons'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <button
                type="button"
                onClick={() => onNavigateSection('al_ain_majlis')}
                className="group relative block w-full rounded-2xl overflow-hidden border border-orange-200 dark:border-slate-700 shadow-lg cursor-pointer"
                title={isRtl ? 'افتح مجلس ضيافة العين' : 'Open Majlis Al Ain'}
              >
                <img
                  src="/assets/aistudio/________________________________d7d7f115.png"
                  alt={isRtl ? 'مجلس ضيافة العين — ملتقى الأكيلة' : 'Majlis Al Ain Hospitality'}
                  className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </div>
          </div>
        </div>

        {/* 8 Visitor World Destination Cards with Tactile 3D Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {visitorDestinations.map((dest) => (
            <button
              key={dest.section}
              type="button"
              onClick={() => onNavigateSection(dest.section)}
              className="group text-start p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#FF6B00] shadow-xs hover:shadow-xl hover:shadow-orange-500/15 transition-all cursor-pointer flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <Service3DIcon iconKey={dest.iconKey} size="md" />
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950/40 text-[#FF6B00] border border-orange-200/70 dark:border-orange-900/60">
                  {isRtl ? dest.badgeAr : dest.badgeEn}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#FF6B00] transition-colors flex items-center justify-between gap-1">
                  <span>{isRtl ? dest.titleAr : dest.titleEn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-[#FF6B00]" />
                </h3>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {isRtl ? dest.descAr : dest.descEn}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Direct 12 Al Ain Restaurants Showcase Grid (1-Tap to Dedicated Outlet Page) */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                {isRtl ? 'أ) مطاعم العين | عالم من المذاقات (12 منفذاً)' : 'Al Ain Restaurants — 12 Dedicated Venues'}
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {isRtl
                  ? 'اضغط على أي مطعم لفتح صفحته المستقلة واستعراض العناصر التجريبية'
                  : 'Select any outlet to open its dedicated page'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateSection('al_ain_restaurants')}
              className="text-xs font-black text-[#FF6B00] hover:underline cursor-pointer"
            >
              {isRtl ? 'عرض صفحة المطاعم الكاملة ←' : 'View Full Directory →'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {AL_AIN_RESTAURANTS.map((rest) => (
              <button
                key={rest.id}
                type="button"
                onClick={() => onNavigateSection(`al_ain_restaurant:${rest.id}`)}
                className="group p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 hover:bg-orange-50 dark:hover:bg-orange-950/30 border border-slate-200/80 dark:border-slate-700/80 hover:border-[#FF6B00] text-center flex flex-col items-center gap-2 transition-all cursor-pointer"
              >
                <Service3DIcon iconKey={rest.iconKey} size="sm" />
                <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-[#FF6B00] leading-tight">
                  {isRtl ? rest.nameAr : rest.nameEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STRIP 2: Al Ain Restaurants Food Strip */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط مطاعم العين وأطباق الضيافة"
        titleEn="Al Ain Dining & Specialty Dishes"
        subtitleAr="بيتزا العين، المندي، المشويات، الكبدة الجمالي، والمحمصة"
        subtitleEn="Auto-scrolling showcase of our 12 Al Ain Mall culinary destinations"
        slides={STRIP_2_AL_AIN_RESTAURANTS}
        onNavigateSlide={onNavigateSection}
        reverseDirection
      />

      {/* STRIP 3: Offers & Discount Coupons Strip */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط العروض وقسائم الخصومات (الوطنية اللوجستية)"
        titleEn="Offers & Discount Vouchers Showcase"
        subtitleAr="اضغط على أي شريحة لاستعراض قسائم الخصومات التسع وتجربة التحقق QR"
        subtitleEn="Tap any visual to inspect our 9 perforated ticket vouchers & QR verification"
        slides={STRIP_3_COUPONS_OFFERS}
        onNavigateSlide={onNavigateSection}
      />

      {/* STRIP 4: Entertainment, Spa, Salt House, Kids & Oriental Nights Strip */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط الترفيه والعناية الشخصية وبيت الملح والسيرك"
        titleEn="Entertainment, Salt House, Kids & Oriental Nights"
        subtitleAr="Kids Area، السيرك والترفيه، صالون الحلاقة الفاخر، بيت الملح، وليالي الطرب الشرقي"
        subtitleEn="Wellness spa, backlit crystal Salt House, circus marquee & Takht nights"
        slides={STRIP_4_ENTERTAINMENT_WELLNESS}
        onNavigateSlide={onNavigateSection}
        reverseDirection
      />

      {/* STRIP 5: Occasions, Celebrations & Branded Gift Packaging Strip */}
      <ContinuousPhotoStrip
        lang={lang}
        titleAr="شريط المناسبات والاحتفالات وعبوات الوطنية اللوجستية"
        titleEn="Occasions, Festivals & Branded Gift Packaging"
        subtitleAr="رمضان، العيدين، موسم الكحك، حفلات الزواج، وبوكسات الهدايا الموسمية"
        subtitleEn="Seasonal celebration sets & luxury packaging boxes for Wataniya Logistics"
        slides={STRIP_5_OCCASIONS_FESTIVALS}
        onNavigateSlide={onNavigateSection}
      />

      {/* ========================================================================
          STAGE 8: STRICT SEPARATION ZONE — INDUSTRIAL & CORPORATE SUBSISTENCE OPS
          Cleanly delineated from Public Visitor Dining & Entertainment above
         ======================================================================== */}
      <section className="pt-4 space-y-6 border-t-2 border-dashed border-slate-300 dark:border-slate-700">
        <div className="rounded-3xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 p-5 sm:p-6 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-black text-orange-400">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isRtl
                  ? 'قطاع منفصل تماماً: الإعاشة الصناعية وتوريدات المصانع — الوطنية اللوجستية'
                  : 'Strictly Separated Sector: Industrial & B2B Corporate Subsistence'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {isRtl
                ? 'منظومة المطابخ المركزية، إعاشة المصانع، ماركت Ha-Be للعاملين، والوثائق PDF'
                : 'Central Kitchens, Factory Catering, Worker Ha-Be Market & PDF Docs'}
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {isRtl
                ? 'هذا القطاع خاص بعقود المصانع والشركات والمستشفيات وماركت العاملين الصناعي، ومفصول بالكامل عن مطاعم رواد مول العين والماركت الكبير العام للزوار.'
                : 'Dedicated strictly to B2B factory contracts, hospital catering, worker Ha-Be Market, HACCP logs, and A4 PDF document automation.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => (onOpenReportPdf ? onOpenReportPdf() : onNavigateSection('admin'))}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-orange-50 text-xs font-black flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#FF6B00]" />
              <span>{isRtl ? 'تقارير الجودة PDF' : 'HACCP Report PDF'}</span>
            </button>
            <button
              type="button"
              onClick={() => (onOpenQuotePdf ? onOpenQuotePdf() : onNavigateSection('quotation'))}
              className="px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>{isRtl ? 'منشئ عروض الأسعار PDF' : 'Quote PDF Builder'}</span>
            </button>
          </div>
        </div>

        {/* STRIP 6: Strictly Corporate & Industrial Catering Operations Strip */}
        <ContinuousPhotoStrip
          lang={lang}
          titleAr="شريط التشغيل الصناعي والمطابخ المركزية وتغذية المصانع"
          titleEn="Industrial Catering, Central Kitchens & Corporate Operations"
          subtitleAr="خطوط إنتاج الوجبات الساخنة، مطبخ هنجر استيشن، مطبخ مول العين ببدر، ومطبخ الحرية"
          subtitleEn="Central kitchen dispatch lines, factory shift meal production & corporate ops"
          slides={STRIP_6_CORPORATE_OPERATIONS}
          onNavigateSlide={onNavigateSection}
          reverseDirection
        />

        {/* SECTION: 12 CORE INDUSTRIAL / CORPORATE SERVICES WITH TACTILE 3D VOLUMETRIC ICONS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {t.servicesHeading}
              </h3>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
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
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug group-hover:text-[#FF6B00] transition-colors">
                    {isRtl ? srv.titleAr : srv.titleEn}
                  </h4>
                  <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {isRtl ? srv.subtitleAr : srv.subtitleEn}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION: QUICK ACCESS TO THE 3 CENTRAL KITCHENS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {t.kitchensHeading}
              </h3>
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
        </div>
      </section>
    </div>
  );
};

