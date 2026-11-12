import React, { useState, useMemo } from 'react';
import {
  Search,
  Bell,
  ShoppingCart,
  ChevronDown,
  Languages,
  X,
  Upload,
  RotateCcw,
  ChefHat,
  UtensilsCrossed,
  FileText,
  Gift,
  MapPin,
  Tag,
  Sun,
  Moon,
} from 'lucide-react';
import {
  CountryCode,
  LanguageCode,
  SearchScope,
  SUPPORTED_COUNTRIES,
  PHASE1_I18N,
  TWELVE_SERVICES,
  THREE_CENTRAL_KITCHENS,
  FOOD_CATEGORIES,
  RoleScope,
} from '../data/phase1Data';
import { OfficialCountryFlag } from './OfficialCountryFlags';
import { PWAInstallButton } from './PWAInstallButton';

export interface NotificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  category: 'order' | 'offer' | 'invoice' | 'message';
  allowedRoles: RoleScope[];
  timeLabel: string;
}

interface Phase1TopBarProps {
  lang: LanguageCode;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  country: CountryCode;
  onSelectCountry: (code: CountryCode) => void;
  role: RoleScope;
  customLogoDataUrl: string | null;
  onUploadLogo: (dataUrl: string) => void;
  onResetLogo: () => void;
  cartCount: number;
  onOpenCart: () => void;
  notifications: NotificationItem[];
  onNavigateSection: (
    section: string,
    kitchenId?: 'hanger_station' | 'mall_al_ain' | 'al_hurriya'
  ) => void;
}

export const Phase1TopBar: React.FC<Phase1TopBarProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  country,
  onSelectCountry,
  role,
  customLogoDataUrl,
  onUploadLogo,
  onResetLogo,
  cartCount,
  onOpenCart,
  notifications,
  onNavigateSection,
}) => {
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<SearchScope>('all');
  const [notifOpen, setNotifOpen] = useState(false);

  const selectedCountryObj =
    SUPPORTED_COUNTRIES.find((c) => c.code === country) || SUPPORTED_COUNTRIES[0];

  const visibleNotifications = useMemo(() => {
    return notifications.filter((n) => n.allowedRoles.includes(role));
  }, [notifications, role]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const items: {
      id: string;
      scope: Exclude<SearchScope, 'all'>;
      title: string;
      subtitle: string;
      section: string;
      kitchenId?: 'hanger_station' | 'mall_al_ain' | 'al_hurriya';
    }[] = [];

    THREE_CENTRAL_KITCHENS.forEach((k) => {
      items.push({
        id: `k_${k.id}`,
        scope: 'kitchens',
        title: isRtl ? k.nameAr : k.nameEn,
        subtitle: isRtl ? k.coverageAr : k.coverageEn,
        section: 'kitchen_detail',
        kitchenId: k.id,
      });
      items.push({
        id: `pl_${k.id}`,
        scope: 'places',
        title: isRtl ? k.locationAr : k.locationEn,
        subtitle: isRtl ? k.nameAr : k.nameEn,
        section: 'kitchen_detail',
        kitchenId: k.id,
      });
    });

    TWELVE_SERVICES.forEach((s) => {
      let mappedScope: Exclude<SearchScope, 'all'> = 'offers';
      if (s.id === 'pay_invoices' || s.id === 'request_quotation') mappedScope = 'invoices';
      else if (s.id === 'gift_cards' || s.id === 'wedding_occasion_cards')
        mappedScope = 'gift_cards';
      else if (s.id === 'order_meals_offer' || s.id === 'catering_requests')
        mappedScope = 'meals';

      items.push({
        id: `srv_${s.id}`,
        scope: mappedScope,
        title: isRtl ? s.titleAr : s.titleEn,
        subtitle: isRtl ? s.subtitleAr : s.subtitleEn,
        section: s.targetSection,
      });
    });

    FOOD_CATEGORIES.forEach((cat) => {
      items.push({
        id: `cat_${cat.id}`,
        scope: 'meals',
        title: isRtl ? cat.ar : cat.en,
        subtitle: isRtl
          ? 'تصنيف وجبات — بانتظار اعتماد الأسعار'
          : 'Food category — Awaiting pricing data',
        section: 'service_meals_offer',
      });
    });

    return items.filter((item) => {
      const matchesScope = searchScope === 'all' || item.scope === searchScope;
      if (!matchesScope) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, searchScope, isRtl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const scopeOptions: { id: SearchScope; label: string }[] = [
    { id: 'all', label: t.scopes.all },
    { id: 'offers', label: t.scopes.offers },
    { id: 'places', label: t.scopes.places },
    { id: 'invoices', label: t.scopes.invoices },
    { id: 'gift_cards', label: t.scopes.gift_cards },
    { id: 'meals', label: t.scopes.meals },
    { id: 'kitchens', label: t.scopes.kitchens },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        {/* Main Row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2">
          {/* Brand Logo Slot + Name */}
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <label
              className="relative cursor-pointer flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-dashed border-[#FF6B00] bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 transition-colors overflow-hidden shrink-0"
              title={t.uploadLogoHint}
            >
              {customLogoDataUrl ? (
                <img
                  src={customLogoDataUrl}
                  alt={t.brandName}
                  className="w-full h-full object-contain p-0.5"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span className="text-[7px] font-black text-[#FF6B00] leading-none mt-0.5">
                    {isRtl ? 'شعار' : 'LOGO'}
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {customLogoDataUrl && (
              <button
                type="button"
                onClick={onResetLogo}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#FF6B00] hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors hidden sm:inline-flex cursor-pointer"
                title={t.resetLogo}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigateSection('home')}
              className="text-start min-w-0 cursor-pointer"
            >
              <span className="block text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap truncate">
                {t.brandName}
              </span>
            </button>
          </div>

          {/* Desktop Quick Search Bar */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex flex-1 max-w-md items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#FF6B00] shrink-0" />
            <span className="truncate">{t.searchPlaceholder}</span>
          </button>

          {/* Interactive Controls (Country, Theme Toggle, Language, Bell, Cart, PWA Install) */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Country & Rectangular Official Flag Selector (NO Circle!) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCountryDropdownOpen((p) => !p);
                  setNotifOpen(false);
                }}
                className="min-h-[40px] px-2 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                aria-label={isRtl ? 'اختيار الدولة' : 'Select Country'}
              >
                <OfficialCountryFlag country={selectedCountryObj.code} className="w-6 h-4" />
                <span
                  className="hidden lg:inline text-xs font-extrabold text-slate-800 dark:text-slate-100 tabular-nums"
                  dir="ltr"
                >
                  {selectedCountryObj.dialCode}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              </button>

              {countryDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCountryDropdownOpen(false)}
                  />
                  <div className="absolute end-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-1.5 z-50">
                    {SUPPORTED_COUNTRIES.map((c) => {
                      const active = c.code === country;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            onSelectCountry(c.code);
                            setCountryDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                            active
                              ? 'bg-orange-50 dark:bg-orange-950/60 text-[#FF6B00] font-extrabold'
                              : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <OfficialCountryFlag country={c.code} className="w-6 h-4" />
                            <span>{isRtl ? c.nameAr : c.nameEn}</span>
                          </div>
                          <span
                            className="font-mono text-[11px] text-slate-600 dark:text-slate-300 tabular-nums"
                            dir="ltr"
                          >
                            {c.dialCode}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Real Light / Dark Theme Toggle Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="min-h-[40px] min-w-[40px] rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-amber-400 cursor-pointer transition-colors"
              aria-label={isRtl ? 'تبديل الوضع الليلي والنهاري' : 'Toggle Light/Dark Mode'}
              title={isRtl ? 'تغيير الإضاءة (فاتح / داكن)' : 'Toggle Light / Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Full RTL/LTR Language Switch */}
            <button
              type="button"
              onClick={onToggleLang}
              className="min-h-[40px] px-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1 transition-colors cursor-pointer"
              aria-label="Switch Language"
            >
              <Languages className="w-4 h-4 text-[#FF6B00]" />
              <span className="whitespace-nowrap">{isRtl ? 'EN' : 'ع'}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((p) => !p);
                  setCountryDropdownOpen(false);
                }}
                className="relative min-h-[40px] min-w-[40px] rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-100 cursor-pointer transition-colors"
                aria-label={t.notificationsTitle}
              >
                <Bell className="w-4 h-4" />
                {visibleNotifications.length > 0 && (
                  <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-[#FF6B00] text-white text-[10px] font-black flex items-center justify-center tabular-nums">
                    {visibleNotifications.length}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotifOpen(false)}
                  />
                  <div className="absolute end-0 mt-2 w-80 max-w-[90vw] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl p-3.5 z-50 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {t.notificationsTitle}
                      </span>
                      <span className="text-[10px] font-bold text-[#FF6B00]">
                        {role}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      {t.notificationsScopedBy}
                    </p>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {visibleNotifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                          {t.noNotifications}
                        </div>
                      ) : (
                        visibleNotifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-1"
                          >
                            <div className="font-bold text-slate-900 dark:text-white">
                              {isRtl ? n.titleAr : n.titleEn}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {n.timeLabel}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative min-h-[40px] px-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-orange-500/30 transition-all cursor-pointer"
              aria-label={t.cartTitle}
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">{t.cartTitle}</span>
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#FF6B00] text-[10px] font-black flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Visible PWA Install Button on BOTH Desktop & Tablet/Mobile */}
            <div className="hidden sm:block">
              <PWAInstallButton isRtl={isRtl} />
            </div>
          </div>
        </div>

        {/* Mobile Secondary Quick Row: Full Search Bar + Visible Mobile PWA Install */}
        <div className="md:hidden px-3 pb-2.5 flex items-center gap-2 bg-white dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer min-w-0"
          >
            <Search className="w-4 h-4 text-[#FF6B00] shrink-0" />
            <span className="truncate">{t.searchPlaceholder}</span>
          </button>

          <PWAInstallButton isRtl={isRtl} compact className="shrink-0 sm:hidden" />
        </div>
      </header>

      {/* Multi-Scope Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden mt-6 sm:mt-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#FF6B00] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
              {scopeOptions.map((opt) => {
                const active = searchScope === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSearchScope(opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 p-2">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                  {isRtl ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching results found'}
                </div>
              ) : (
                searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigateSection(item.section, item.kitchenId);
                      setSearchModalOpen(false);
                    }}
                    className="w-full p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 text-start flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0">
                        {item.scope === 'kitchens' && <ChefHat className="w-4 h-4" />}
                        {item.scope === 'places' && <MapPin className="w-4 h-4" />}
                        {item.scope === 'offers' && <Tag className="w-4 h-4" />}
                        {item.scope === 'invoices' && <FileText className="w-4 h-4" />}
                        {item.scope === 'gift_cards' && <Gift className="w-4 h-4" />}
                        {item.scope === 'meals' && <UtensilsCrossed className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#FF6B00] shrink-0">
                      {t.scopes[item.scope]}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
