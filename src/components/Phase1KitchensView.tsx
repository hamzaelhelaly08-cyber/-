import React from 'react';
import {
  MapPin,
  ChefHat,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building2,
  FileText,
  ShoppingCart,
  AlertCircle,
  ShieldCheck,
  Info,
} from 'lucide-react';
import {
  CentralKitchenProfile,
  LanguageCode,
  PHASE1_I18N,
  THREE_CENTRAL_KITCHENS,
} from '../data/phase1Data';
import { Phase1CartItem } from './Phase1CartDrawer';

interface Phase1KitchensViewProps {
  lang: LanguageCode;
  selectedKitchenId: 'hanger_station' | 'mall_al_ain' | 'al_hurriya' | null;
  onSelectKitchen: (id: 'hanger_station' | 'mall_al_ain' | 'al_hurriya' | null) => void;
  onBackHome: () => void;
  onRequestQuoteForKitchen: (kitchenName: string) => void;
  onAddToCart: (item: Omit<Phase1CartItem, 'quantity'>) => void;
}

export const Phase1KitchensView: React.FC<Phase1KitchensViewProps> = ({
  lang,
  selectedKitchenId,
  onSelectKitchen,
  onBackHome,
  onRequestQuoteForKitchen,
  onAddToCart,
}) => {
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const activeKitchen: CentralKitchenProfile | undefined = selectedKitchenId
    ? THREE_CENTRAL_KITCHENS.find((k) => k.id === selectedKitchenId)
    : undefined;

  // Dedicated Independent Kitchen Detail Page
  if (activeKitchen) {
    return (
      <div className="space-y-6 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelectKitchen(null)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs transition-colors cursor-pointer"
          >
            <BackIcon className="w-4 h-4 text-[#FF6B00]" />
            <span>{t.backToAllKitchens}</span>
          </button>

          {activeKitchen.isHeadquarters && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-extrabold shadow-md shadow-orange-500/25">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.hqLabel}</span>
            </span>
          )}
        </div>

        {/* Dedicated Kitchen Hero */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Pure Vivid Kitchen Image (No cluttered overlaid cards) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative h-64 sm:h-72 lg:flex-1 bg-orange-50 dark:bg-slate-800">
                <img
                  src={activeKitchen.imageUrl}
                  alt={isRtl ? activeKitchen.nameAr : activeKitchen.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-105 contrast-105"
                />
              </div>
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <Info className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                <span>{t.illustrativePhotoNote}</span>
              </div>
            </div>

            {/* Kitchen Core Details */}
            <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B00] font-extrabold">
                    {activeKitchen.codeNameEn}
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {isRtl ? activeKitchen.nameAr : activeKitchen.nameEn}
                  </h1>
                </div>

                {/* Location & Coverage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#FF6B00]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{t.locationLabel}</span>
                    </div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {isRtl ? activeKitchen.locationAr : activeKitchen.locationEn}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#FF6B00]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{t.coverageLabel}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                      {isRtl ? activeKitchen.coverageAr : activeKitchen.coverageEn}
                    </div>
                  </div>
                </div>

                {/* Available Services */}
                <div className="space-y-2.5">
                  <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#FF6B00] text-white flex items-center justify-center">
                      <ChefHat className="w-3.5 h-3.5" />
                    </span>
                    <span>{t.servicesOfferedLabel}</span>
                  </h2>
                  <ul className="space-y-2">
                    {(isRtl ? activeKitchen.servicesAr : activeKitchen.servicesEn).map(
                      (srv, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                          <span>{srv}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Menu Categories */}
                <div className="space-y-2">
                  <div className="text-xs font-extrabold text-slate-600 dark:text-slate-300">
                    {t.menusLabel}:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isRtl ? activeKitchen.menuCategoriesAr : activeKitchen.menuCategoriesEn).map(
                      (cat, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold border border-slate-200 dark:border-slate-700"
                        >
                          {cat}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {isRtl
                      ? 'الأسعار التفصيلية وأرقام التواصل المباشرة للمطبخ: بانتظار اعتماد البيانات'
                      : 'Detailed unit pricing & direct phone numbers: Awaiting Data Approval'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onRequestQuoteForKitchen(
                      isRtl ? activeKitchen.nameAr : activeKitchen.nameEn
                    )
                  }
                  className="px-5 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.requestKitchenQuote}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Operational Menu Templates */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {isRtl
                ? 'نماذج الوجبات المرتبطة بالمطبخ'
                : 'Operational Meal Templates'}
            </h3>
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
              {t.awaitingApproval}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeKitchen.sampleMenuItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between gap-4 hover:border-[#FF6B00] transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-black text-slate-900 dark:text-white">
                      {isRtl ? item.nameAr : item.nameEn}
                    </h4>
                    <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800 shrink-0">
                      {t.awaitingApproval}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isRtl ? item.descAr : item.descEn}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {isRtl ? 'السعر والتقييم بانتظار الاعتماد' : 'Price & rating awaiting approval'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onAddToCart({
                        id: item.id,
                        nameAr: item.nameAr,
                        nameEn: item.nameEn,
                        kitchenNameAr: activeKitchen.nameAr,
                        kitchenNameEn: activeKitchen.nameEn,
                        approvedPrice: item.approvedPrice,
                      })
                    }
                    className="px-3.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm shadow-orange-500/25 cursor-pointer transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t.addToCartTest}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Overview of the 3 Central Kitchens
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs cursor-pointer"
        >
          <BackIcon className="w-4 h-4 text-[#FF6B00]" />
          <span>{t.nav.home}</span>
        </button>

        <button
          type="button"
          onClick={() => onRequestQuoteForKitchen('')}
          className="px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>{t.heroPrimaryCta}</span>
        </button>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {t.kitchensHeading}
        </h2>
        <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
          {t.kitchensSubheading} · {t.illustrativePhotoNote}
        </p>
      </div>

      {/* 3 Independent Central Kitchens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {THREE_CENTRAL_KITCHENS.map((kitchen) => (
          <div
            key={kitchen.id}
            className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#FF6B00] shadow-xs hover:shadow-xl hover:shadow-orange-500/15 overflow-hidden flex flex-col transition-all"
          >
            {/* Pure Vivid Kitchen Image */}
            <div className="relative h-52 bg-orange-50 dark:bg-slate-800 overflow-hidden">
              <img
                src={kitchen.imageUrl}
                alt={isRtl ? kitchen.nameAr : kitchen.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
              />
              {kitchen.isHeadquarters && (
                <span className="absolute top-3 start-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF6B00] text-white text-[10px] font-extrabold shadow-md">
                  <Building2 className="w-3 h-3" />
                  <span>{t.hqLabel}</span>
                </span>
              )}
            </div>

            {/* Body Info Outside Photo */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div>
                  <div className="text-[10px] font-mono text-[#FF6B00] font-extrabold tracking-wider">
                    {kitchen.codeNameEn}
                  </div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug mt-0.5">
                    {isRtl ? kitchen.nameAr : kitchen.nameEn}
                  </h3>
                </div>

                <div className="flex items-start gap-2 text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <span>{isRtl ? kitchen.locationAr : kitchen.locationEn}</span>
                </div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isRtl ? kitchen.coverageAr : kitchen.coverageEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectKitchen(kitchen.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold shadow-sm shadow-orange-500/25 transition-colors cursor-pointer"
                >
                  {t.openKitchenPage}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
