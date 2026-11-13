import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  UtensilsCrossed,
  Crown,
  Sparkles,
  Ticket,
  Gift,
  FileText,
  Music,
  CheckCircle2,
  Upload,
} from 'lucide-react';
import { LanguageCode, PHASE1_I18N } from '../data/phase1Data';
import {
  AL_AIN_RESTAURANTS,
  AlAinRestaurantItem,
  EXPERIMENTAL_TAG_AR,
  EXPERIMENTAL_TAG_EN,
  MAJLIS_EXPERIENCES,
  OCCASIONS_CAMPAIGNS,
  WATANIYA_COUPONS,
  WELLNESS_SERVICES,
} from '../data/visitorWorldData';
import { Service3DIcon } from './Service3DIcon';
import { VoucherCouponCard } from './VoucherCouponCard';
import kidsCircusImg from '../assets/images/al_ain_kids_circus_fun_1794529872787.jpg';
import oudNightImg from '../assets/images/al_ain_oud_oriental_night_1794529872267.jpg';
import saltSpaImg from '../assets/images/al_ain_salt_spa_wellness_1794529870640.jpg';
import giftBoxesImg from '../assets/images/wataniya_seasonal_gift_boxes_1794529872199.jpg';

interface AlAinVisitorWorldViewProps {
  lang: LanguageCode;
  activeSection: string;
  customLogoDataUrl: string | null;
  onUploadLogo: (dataUrl: string) => void;
  onNavigateSection: (section: string) => void;
}

export const AlAinVisitorWorldView: React.FC<AlAinVisitorWorldViewProps> = ({
  lang,
  activeSection,
  customLogoDataUrl,
  onUploadLogo,
  onNavigateSection,
}) => {
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const isSingleRestaurant = activeSection.startsWith('al_ain_restaurant:');
  const activeRestaurantId = isSingleRestaurant
    ? activeSection.replace('al_ain_restaurant:', '')
    : null;
  const activeRestaurant: AlAinRestaurantItem | undefined = activeRestaurantId
    ? AL_AIN_RESTAURANTS.find((r) => r.id === activeRestaurantId)
    : undefined;

  const subTabs = [
    { id: 'al_ain_restaurants', ar: 'مطاعم العين (12)', en: 'Al Ain Restaurants' },
    { id: 'al_ain_majlis', ar: 'مجلس ضيافة العين', en: 'Hospitality Majlis' },
    { id: 'al_ain_wellness', ar: 'العناية وبيت الملح', en: 'Spa & Salt House' },
    { id: 'al_ain_kids', ar: 'Kids Area الأطفال', en: 'Kids Area' },
    { id: 'al_ain_circus', ar: 'السيرك والترفيه', en: 'Circus Shows' },
    { id: 'al_ain_oriental_nights', ar: 'ليالي الطرب الشرقي', en: 'Oriental Nights' },
    { id: 'al_ain_coupons', ar: 'قسائم الخصومات (9)', en: 'Coupons (9)' },
    { id: 'al_ain_occasions', ar: 'المناسبات والاحتفالات', en: 'Occasions' },
  ];

  const handleBoxLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="space-y-6 pb-12">
      {/* Top Back & Section Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() =>
            activeRestaurant
              ? onNavigateSection('al_ain_restaurants')
              : onNavigateSection('home')
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-900 dark:text-white shadow-xs cursor-pointer"
        >
          <BackIcon className="w-4 h-4 text-[#FF6B00]" />
          <span>
            {activeRestaurant
              ? isRtl
                ? 'العودة إلى مطاعم العين'
                : 'Back to Al Ain Restaurants'
              : t.nav.home}
          </span>
        </button>

        <div className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
          {isRtl ? EXPERIMENTAL_TAG_AR : EXPERIMENTAL_TAG_EN}
        </div>
      </div>

      {/* Horizontal Navigation Pills for Al Ain Visitor Experience */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5">
        {subTabs.map((tab) => {
          const selected =
            activeSection === tab.id ||
            (isSingleRestaurant && tab.id === 'al_ain_restaurants');
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigateSection(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selected
                  ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/25'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#FF6B00]'
              }`}
            >
              {isRtl ? tab.ar : tab.en}
            </button>
          );
        })}
      </div>

      {/* 1) SINGLE RESTAURANT DETAIL PAGE */}
      {activeRestaurant && (
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="relative h-60 sm:h-80 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={activeRestaurant.imageUrl}
                alt={isRtl ? activeRestaurant.nameAr : activeRestaurant.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <Service3DIcon iconKey={activeRestaurant.iconKey} size="lg" />
                <div className="space-y-1">
                  <div className="text-xs font-black text-[#FF6B00]">
                    {isRtl
                      ? 'منطقة الزائر — مطاعم العين | عالم من المذاقات'
                      : 'Al Ain Restaurants | World of Flavors'}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {isRtl ? activeRestaurant.nameAr : activeRestaurant.nameEn}
                  </h2>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {isRtl
                      ? activeRestaurant.taglineAr
                      : activeRestaurant.taglineEn}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isRtl
                  ? activeRestaurant.descriptionAr
                  : activeRestaurant.descriptionEn}
              </p>

              <div className="space-y-2.5">
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  {isRtl
                    ? 'عناصر القائمة التوضيحية (تجريبية لحين اعتماد الأسعار):'
                    : 'Sample Menu Highlights (Demo Pending Price Approval):'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(isRtl
                    ? activeRestaurant.sampleHighlightsAr
                    : activeRestaurant.sampleHighlightsEn
                  ).map((hl, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateSection('al_ain_coupons')}
                  className="px-5 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>
                    {isRtl
                      ? 'استعراض كوبون الخصم التجريبي'
                      : 'View Demo Discount Coupon'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateSection('quotation')}
                  className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#FF6B00]" />
                  <span>
                    {isRtl
                      ? 'طلب حجز / عرض مجموعات'
                      : 'Group Booking Inquiry'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2) ALL 12 AL AIN RESTAURANTS HUB */}
      {activeSection === 'al_ain_restaurants' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border border-orange-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-3">
              <Service3DIcon iconKey="utensils" size="md" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {isRtl
                    ? 'مطاعم العين | عالم من المذاقات'
                    : 'Al Ain Restaurants | World of Flavors'}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                  {isRtl
                    ? '12 نشاطاً ومطعماً عاماً لرواد مول العين — كل نشاط يفتح صفحته المستقلة بالصور والأيقونات المخصصة (منفصل تماماً عن مصانع الإعاشة وماركت العاملين).'
                    : '12 dedicated public dining outlets & Grand Market inside Al Ain Mall — completely separate from B2B factories & worker canteens.'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AL_AIN_RESTAURANTS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => onNavigateSection(`al_ain_restaurant:${r.id}`)}
                className="group text-start rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#FF6B00] shadow-sm hover:shadow-xl transition-all flex flex-col cursor-pointer"
              >
                <div className="h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={r.imageUrl}
                    alt={isRtl ? r.nameAr : r.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Service3DIcon iconKey={r.iconKey} size="sm" />
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-[#FF6B00] transition-colors">
                        {isRtl ? r.nameAr : r.nameEn}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                        {isRtl ? r.taglineAr : r.taglineEn}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-extrabold text-[#FF6B00]">
                    <span>
                      {isRtl ? 'فتح صفحة المطعم المستقلة ←' : 'Open Dedicated Page →'}
                    </span>
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3) MAJLIS HOSPITALITY AL AIN */}
      {activeSection === 'al_ain_majlis' && (
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 shadow-lg">
            <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
              <img
                src="/assets/aistudio/________________________________d7d7f115.png"
                alt="مجلس ضيافة العين"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-3">
                <Service3DIcon iconKey="sparkles" size="md" />
                <div>
                  <span className="text-xs font-black text-[#FF6B00]">
                    {isRtl
                      ? 'تجربة ضيافة مستقلة بطابع عربي فخم'
                      : 'Independent Luxury Arabian Hospitality'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {isRtl ? 'مجلس ضيافة العين' : 'Al Ain Hospitality Majlis'}
                  </h2>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                {isRtl
                  ? 'قسم مستقل وفاخر للتجمعات وضيافة كبار الزوار والعائلات — يضم تجربة Taste الكبدة الجمالي، ولائم المندي، جلسات الضيافة الراقية، والعروض الخاصة بالمجلس.'
                  : 'An upscale independent destination for VIP gatherings, Camel Liver culinary tasting, saffron Mandi feasts, and curated lounge hospitality.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MAJLIS_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col"
              >
                <div className="h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={exp.imageUrl}
                    alt={isRtl ? exp.titleAr : exp.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {isRtl ? exp.titleAr : exp.titleEn}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                      {isRtl ? exp.descAr : exp.descEn}
                    </p>
                  </div>
                  <div className="pt-3 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">
                      {isRtl ? 'تجريبي — بانتظار اعتماد الأسعار' : 'Demo Pricing'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigateSection('quotation')}
                      className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold cursor-pointer"
                    >
                      {isRtl ? 'حجز تجربة المجلس' : 'Reserve Majlis'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4) ENTERTAINMENT & PERSONAL CARE + SALT HOUSE */}
      {activeSection === 'al_ain_wellness' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-3.5">
              <Service3DIcon iconKey="salt" size="md" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {isRtl
                    ? 'الترفيه والعناية الشخصية في مول العين'
                    : 'Entertainment & Personal Wellness at Al Ain Mall'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {isRtl
                    ? 'صالون الحلاقة الرجالي الفاخر · حمام البخار · السبا · الحمام المغربي · بيت الملح'
                    : 'Luxury Men’s Salon · Steam Room · Spa · Moroccan Hammam · Salt House'}
                </p>
              </div>
            </div>
          </div>

          {/* Highlighted Dedicated Salt House Banner (Non-medical wellness framing) */}
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20 border border-amber-300 dark:border-amber-800 shadow-md grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 h-60 lg:h-auto overflow-hidden">
              <img
                src={saltSpaImg}
                alt={isRtl ? 'بيت الملح — تجربة استرخاء وعافية' : 'The Salt House Sanctuary'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <Service3DIcon iconKey="salt" size="md" />
                <div>
                  <span className="text-xs font-black text-[#FF6B00]">
                    {isRtl ? 'تجربة استرخاء وعافية فريدة' : 'Calm Wellness Lounge'}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {isRtl ? 'بيت الملح في مول العين' : 'Al Ain Salt House'}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {isRtl
                  ? 'استمتع بجلسة استجمام في غرفة هادئة مكسوة بكتل الملح الطبيعي، مع إضاءة كهرمانية مريحة للعين ومقاعد خشبية مخصصة للاسترخاء وصفاء الذهن بعيداً عن ضوضاء اليوم (تجربة استرخاء ورفاهية فقط دون أي ادعاءات طبية أو علاجية).'
                  : 'Unwind inside a tranquil Himalayan salt-walled lounge illuminated by warm amber light and calm acoustics designed purely for peaceful rest and personal comfort (non-medical wellness experience).'}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigateSection('al_ain_coupons')}
                  className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black cursor-pointer"
                >
                  {isRtl ? 'عرض كوبون بيت الملح التجريبي' : 'View Salt House Voucher'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WELLNESS_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Service3DIcon iconKey={svc.iconKey} size="sm" />
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {isRtl ? svc.titleAr : svc.titleEn}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isRtl ? svc.descAr : svc.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5) KIDS AREA */}
      {activeSection === 'al_ain_kids' && (
        <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-800 shadow-lg">
          <div className="h-64 sm:h-80 overflow-hidden bg-orange-50">
            <img
              src={kidsCircusImg}
              alt="Kids Area — استمتع أنت وأولادك"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-4">
              <Service3DIcon iconKey="kids" size="lg" />
              <div>
                <span className="text-xs font-black text-[#FF6B00]">
                  Kids Area · {isRtl ? 'منطقة العائلة' : 'Family Fun Zone'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {isRtl ? 'استمتع أنت وأولادك' : 'Enjoy Together With Your Kids'}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {[
                isRtl ? 'ألعاب الأطفال الحديثة' : 'Interactive Kids Games',
                isRtl ? 'منطقة لعب آمنة ومجهزة' : 'Safe Soft-Play Arena',
                isRtl ? 'الأنشطة والورش العائلية' : 'Family Activities & Workshops',
                isRtl ? 'عروض وكوبونات خاصة للأطفال' : 'Dedicated Kids Passes',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
                >
                  <Crown className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigateSection('al_ain_coupons')}
              className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-black cursor-pointer"
            >
              {isRtl ? 'تصفح قسائم Kids Area التجريبية' : 'Explore Kids Vouchers'}
            </button>
          </div>
        </div>
      )}

      {/* 6) CIRCUS & ENTERTAINMENT */}
      {activeSection === 'al_ain_circus' && (
        <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 shadow-lg">
          <div className="h-64 sm:h-80 overflow-hidden">
            <img
              src={kidsCircusImg}
              alt={isRtl ? 'السيرك والترفيه في مول العين' : 'Al Ain Circus Pavilion'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-4">
              <Service3DIcon iconKey="circus" size="lg" />
              <div>
                <span className="text-xs font-black text-rose-600">
                  {isRtl ? 'عروض حية وأضواء مبهجة' : 'Live Festive Shows'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {isRtl ? 'السيرك والترفيه بمول العين' : 'Al Ain Circus & Live Entertainment'}
                </h2>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
              {isRtl
                ? 'أجواء خيمة السيرك المضيئة، الألوان المبهجة، العروض الاستعراضية والألعاب الترفيهية للعائلات — مدمجة مع منظومة كوبونات وخصومات الوطنية اللوجستية للعاملين والمتعاقدين عند تفعيل الاتفاقيات.'
                : 'Festive big-top circus marquee with vibrant lighting, stage performances, and games — eligible for contractor & employee voucher discounts upon activation.'}
            </p>
            <button
              type="button"
              onClick={() => onNavigateSection('al_ain_coupons')}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-black cursor-pointer"
            >
              {isRtl ? 'عرض قسيمة السيرك والترفيه' : 'View Circus Discount Coupon'}
            </button>
          </div>
        </div>
      )}

      {/* 7) ORIENTAL TAKHT MUSIC NIGHTS */}
      {activeSection === 'al_ain_oriental_nights' && (
        <div className="rounded-3xl overflow-hidden bg-slate-950 text-white border border-amber-500/40 shadow-2xl">
          <div className="h-64 sm:h-84 overflow-hidden">
            <img
              src={oudNightImg}
              alt="ليالي الطرب الشرقي — التخت الشرقي"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-4">
              <Service3DIcon iconKey="oud" size="lg" />
              <div>
                <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'كل خميس وجمعة' : 'Every Thursday & Friday'}</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {isRtl ? 'ليالي الطرب الشرقي' : 'Oriental Takht Nights'}
                </h2>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {isRtl
                ? 'أمسيات طرب راقية على أنغام العود والتخت الشرقي الأصيل، مع جلسات ضيافة دافئة وإضاءة هادئة فاخرة وعروض خاصة لسهرات الخميس والجمعة.'
                : 'Refined Thursday and Friday evening Oud & classical Oriental lounge experiences paired with signature dining hospitality.'}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigateSection('al_ain_coupons')}
                className="px-5 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-black cursor-pointer"
              >
                {isRtl ? 'عرض كوبون الخميس والجمعة' : 'Thu/Fri Evening Voucher'}
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('quotation')}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-extrabold cursor-pointer"
              >
                {isRtl ? 'حجز طاولة أو مناسبة' : 'Reserve Lounge Table'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8) DISCOUNT VOUCHERS SYSTEM (9 CATEGORIES) */}
      {activeSection === 'al_ain_coupons' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#FF6B00] text-white shadow-xl space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Service3DIcon iconKey="coupon" size="md" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black">
                    {isRtl
                      ? 'عروض وخصومات الوطنية اللوجستية'
                      : 'National Logistics Offers & Vouchers'}
                  </h2>
                  <p className="text-xs sm:text-sm text-orange-100 mt-1">
                    {isRtl
                      ? '9 نماذج كوبونات خصم للعاملين والمتعاقدين — بالشراكة التسويقية المعلنة عند الاعتماد مع مول العين (خانات النسب والصلاحية قابلة للتعديل التجريبي لحين اعتماد الإدارة).'
                      : '9 employee & contractor discount voucher templates across all Al Ain facilities (experimental percentages pending official approval).'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WATANIYA_COUPONS.map((cpn) => (
              <VoucherCouponCard
                key={cpn.id}
                coupon={cpn}
                lang={lang}
                customLogoDataUrl={customLogoDataUrl}
              />
            ))}
          </div>
        </div>
      )}

      {/* 9) OCCASIONS & FESTIVALS CAMPAIGN HUB (10 CATEGORIES) */}
      {activeSection === 'al_ain_occasions' && (
        <div className="space-y-6">
          {/* Packaging & Logo Showcase Banner */}
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-orange-200 dark:border-slate-800 shadow-lg grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 h-60 lg:h-auto overflow-hidden bg-orange-50">
              <img
                src={giftBoxesImg}
                alt="علب وباقات المناسبات — الوطنية اللوجستية"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-3">
                <Service3DIcon iconKey="party" size="md" />
                <div>
                  <span className="text-xs font-black text-[#FF6B00]">
                    {isRtl
                      ? 'حملات المواسم وعبوات الضيافة الفاخرة'
                      : 'Seasonal Campaigns & Luxury Packaging'}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {isRtl
                      ? 'المناسبات والاحتفالات — الوطنية اللوجستية'
                      : 'Occasions & Celebrations — National Logistics'}
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {isRtl
                  ? 'تصميمات مخصصة لرمضان، عيد الفطر، عيد الأضحى، موسم الكحك، الكريسماس، الأفراح، والمؤتمرات — مع مساحة مخصصة لوضع الشعار الرسمي المعتمد للشركة الوطنية اللوجستية على العبوات والصناديق.'
                  : 'Curated hospitality packaging & celebration campaigns carrying National Logistics identity with a dedicated uploadable official logo crest.'}
              </p>

              <label className="inline-flex items-center gap-3 p-3 rounded-2xl border-2 border-dashed border-[#FF6B00]/60 bg-orange-50/50 dark:bg-orange-950/20 cursor-pointer w-fit">
                {customLogoDataUrl ? (
                  <img
                    src={customLogoDataUrl}
                    alt="Official Logo"
                    className="h-10 w-auto object-contain rounded"
                  />
                ) : (
                  <Upload className="w-5 h-5 text-[#FF6B00]" />
                )}
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {customLogoDataUrl
                    ? isRtl
                      ? 'تغيير الشعار الرسمي على العبوات'
                      : 'Change Packaging Crest'
                    : isRtl
                      ? 'مساحة الشعار الرسمي المعتمد (اضغط للرفع)'
                      : 'Official Logo Slot (Tap to Upload)'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBoxLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OCCASIONS_CAMPAIGNS.map((occ) => (
              <div
                key={occ.id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col"
              >
                <div className="h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={occ.imageUrl}
                    alt={isRtl ? occ.titleAr : occ.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Service3DIcon iconKey={occ.iconKey} size="sm" />
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                        {isRtl ? occ.titleAr : occ.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {isRtl ? occ.subtitleAr : occ.subtitleEn}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('quotation')}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-[#FF6B00] hover:text-white text-slate-900 dark:text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>
                      {isRtl
                        ? 'طلب تصميم / عرض باقة (تجريبي)'
                        : 'Request Season Package'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
