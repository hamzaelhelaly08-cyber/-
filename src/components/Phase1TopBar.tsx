import React, { useState, useMemo } from 'react';
import {
  Search,
  Bell,
  ShoppingCart,
  ChevronDown,
  Languages,
  X,
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
import { AL_AIN_RESTAURANTS } from '../data/visitorWorldData';
import { BasitBrandMark } from './BasitBrandMark';

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

  const featuredCountries = SUPPORTED_COUNTRIES.filter((c) => c.isFeatured !== false);
  const extendedCountries = SUPPORTED_COUNTRIES.filter((c) => c.isFeatured === false);

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

    AL_AIN_RESTAURANTS.forEach((r) => {
      items.push({
        id: `al_ain_r_${r.id}`,
        scope: r.id === 'al_ain_grand_market' ? 'places' : 'meals',
        title: isRtl ? r.nameAr : r.nameEn,
        subtitle: isRtl ? `مول العين — ${r.taglineAr}` : `Al Ain Mall — ${r.taglineEn}`,
        section: `al_ain_restaurant:${r.id}`,
      });
    });

    const alAinDestinations = [
      {
        id: 'al_ain_majlis',
        scope: 'places' as const,
        titleAr: 'مجلس ضيافة العين',
        titleEn: 'Al Ain Hospitality Majlis',
        subAr: 'الكبدة الجمالي، المندي، والجلسات الخاصة',
        subEn: 'Camel liver griddle, Mandi feasts & VIP lounge',
        section: 'al_ain_majlis',
      },
      {
        id: 'al_ain_wellness',
        scope: 'places' as const,
        titleAr: 'بيت الملح والسبا والحلاقة',
        titleEn: 'Salt House, Spa & Barber Salon',
        subAr: 'صالون حلاقة، سبا، حمام مغربي وبخار، وبيت الملح',
        subEn: 'Men salon, spa, Moroccan hammam & Salt House',
        section: 'al_ain_wellness',
      },
      {
        id: 'al_ain_kids',
        scope: 'places' as const,
        titleAr: 'منطقة ألعاب الأطفال Kids Area',
        titleEn: 'Kids Area Play Zone',
        subAr: 'ألعاب ترفيهية آمنة للأطفال والعائلات',
        subEn: 'Safe family & kids play zone',
        section: 'al_ain_kids',
      },
      {
        id: 'al_ain_circus',
        scope: 'places' as const,
        titleAr: 'السيرك والترفيه العائلي',
        titleEn: 'Circus & Live Shows',
        subAr: 'عروض بهلوانية وسيرك وترفيه عائلي',
        subEn: 'Acrobatic circus performances & family shows',
        section: 'al_ain_circus',
      },
      {
        id: 'al_ain_oriental_nights',
        scope: 'places' as const,
        titleAr: 'ليالي الطرب الشرقي والتخت والعود',
        titleEn: 'Oriental Takht & Oud Nights',
        subAr: 'أمسيات طرب وموسيقى شرقية بالعود كل خميس وجمعة',
        subEn: 'Live Oud & Oriental evenings every Thu & Fri',
        section: 'al_ain_oriental_nights',
      },
      {
        id: 'al_ain_coupons',
        scope: 'offers' as const,
        titleAr: 'قسائم وعروض التوفير (9 قسائم)',
        titleEn: 'Discount Vouchers & Offers (9)',
        subAr: 'كوبونات المطاعم والمجالس والسبا والترفيه (عرض تجريبي)',
        subEn: 'Dining, Majlis, wellness & entertainment vouchers (Demo)',
        section: 'al_ain_coupons',
      },
      {
        id: 'al_ain_occasions',
        scope: 'gift_cards' as const,
        titleAr: 'عروض المناسبات والاحتفالات والأعياد',
        titleEn: 'Seasonal Occasions & Celebrations',
        subAr: 'رمضان، عيد الفطر والأضحى، الولائم والمناسبات',
        subEn: 'Ramadan, Eids, Mother’s Day & corporate gatherings',
        section: 'al_ain_occasions',
      },
    ];

    alAinDestinations.forEach((d) => {
      items.push({
        id: d.id,
        scope: d.scope,
        title: isRtl ? d.titleAr : d.titleEn,
        subtitle: isRtl ? d.subAr : d.subEn,
        section: d.section,
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
      <header className="sticky top-0 z-40 bg-[#FFFEFC]/95 dark:bg-[#161024]/95 backdrop-blur-md border-b border-[#ECE7F6] dark:border-[#852BEB]/30 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Centralized BASIT Brand Mark + Single-line Wordmark */}
          <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-initial">
            <BasitBrandMark
              customLogoDataUrl={customLogoDataUrl}
              size="sm"
              isRtl={isRtl}
              onUploadLogo={onUploadLogo}
            />

            {customLogoDataUrl && (
              <button
                type="button"
                onClick={onResetLogo}
                className="p-1.5 rounded-lg text-[#6E6485] dark:text-[#C4B5FD] hover:text-[#852BEB] hover:bg-[#F8F5FF] dark:hover:bg-[#24163D] transition-colors hidden sm:inline-flex cursor-pointer"
                title={t.resetLogo}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigateSection('home')}
              className="text-start min-w-0 cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-sm sm:text-lg font-black text-[#1A132B] dark:text-white tracking-tight whitespace-nowrap truncate">
                BASIT
              </span>
              <span className="hidden xs:inline sm:inline text-xs sm:text-sm font-black text-[#852BEB] dark:text-[#F4E600] whitespace-nowrap">
                | بسيط
              </span>
            </button>
          </div>

          {/* Desktop Quick Search Bar */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="hidden md:flex flex-1 max-w-md items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#F8F7FB] dark:bg-[#221738] hover:bg-[#F3EEFF] dark:hover:bg-[#2C1E47] border border-[#ECE7F6] dark:border-[#852BEB]/35 text-[#4A4160] dark:text-[#DDD6FE] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#852BEB] dark:text-[#F4E600] shrink-0" />
            <span className="truncate">{t.searchPlaceholder}</span>
          </button>

          {/* Controls: Market Selector, Theme Toggle, Language, Bell, Cart, PWA Install */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* International Market Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCountryDropdownOpen((p) => !p);
                  setNotifOpen(false);
                }}
                className="min-h-[38px] px-2 sm:px-2.5 py-1 rounded-xl bg-white dark:bg-[#221738] hover:bg-[#F8F5FF] dark:hover:bg-[#2C1E47] border border-[#ECE7F6] dark:border-[#852BEB]/35 flex items-center gap-1.5 transition-colors cursor-pointer"
                aria-label={isRtl ? 'اختيار السوق الدولي' : 'Select International Market'}
              >
                <OfficialCountryFlag country={selectedCountryObj.code} className="w-5 h-3.5 sm:w-6 sm:h-4" />
                <span className="hidden xl:inline text-xs font-extrabold text-[#1A132B] dark:text-white max-w-[110px] truncate">
                  {isRtl ? selectedCountryObj.nameAr : selectedCountryObj.nameEn}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6485] dark:text-[#C4B5FD]" />
              </button>

              {countryDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCountryDropdownOpen(false)}
                  />
                  <div className="absolute end-0 mt-2 w-72 rounded-2xl bg-[#FFFEFC] dark:bg-[#1C1430] border border-[#ECE7F6] dark:border-[#852BEB]/40 shadow-2xl p-2 z-50 space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#852BEB] dark:text-[#F4E600]">
                      {isRtl ? 'الأسواق الدولية المعتمدة' : 'Featured International Markets'}
                    </div>
                    {featuredCountries.map((c) => {
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
                              ? 'bg-[#852BEB] text-white font-extrabold shadow-xs'
                              : 'text-[#1A132B] dark:text-[#EDE9FE] hover:bg-[#F8F5FF] dark:hover:bg-[#2A1E44] font-semibold'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <OfficialCountryFlag country={c.code} className="w-6 h-4" />
                            <span className="truncate">{isRtl ? c.nameAr : c.nameEn}</span>
                          </div>
                          <span
                            className={`font-mono text-[11px] tabular-nums ${active ? 'text-[#F4E600]' : 'text-[#6E6485] dark:text-[#B8AED1]'}`}
                            dir="ltr"
                          >
                            {c.currencyEn}
                          </span>
                        </button>
                      );
                    })}

                    {extendedCountries.length > 0 && (
                      <div className="pt-1.5 mt-1 border-t border-[#ECE7F6] dark:border-[#852BEB]/25">
                        <div className="px-2.5 py-1 text-[10px] font-bold text-[#6E6485] dark:text-[#B8AED1]">
                          {isRtl ? 'أسواق التوسع الإضافية' : 'Expansion Markets'}
                        </div>
                        {extendedCountries.map((c) => {
                          const active = c.code === country;
                          return (
                            <button
                              key={c.code}
                              type="button"
                              onClick={() => {
                                onSelectCountry(c.code);
                                setCountryDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                                active
                                  ? 'bg-[#852BEB] text-white font-extrabold'
                                  : 'text-[#4A4160] dark:text-[#DDD6FE] hover:bg-[#F8F5FF] dark:hover:bg-[#2A1E44] font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <OfficialCountryFlag country={c.code} className="w-6 h-4" />
                                <span className="truncate">{isRtl ? c.nameAr : c.nameEn}</span>
                              </div>
                              <span className="font-mono text-[10px]" dir="ltr">{c.currencyEn}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Light / Dark Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="min-h-[38px] min-w-[38px] rounded-xl bg-white dark:bg-[#221738] hover:bg-[#F8F5FF] dark:hover:bg-[#2C1E47] border border-[#ECE7F6] dark:border-[#852BEB]/35 flex items-center justify-center text-[#1A132B] dark:text-[#F4E600] cursor-pointer transition-colors"
              aria-label={isRtl ? 'تبديل الوضع الليلي والنهاري' : 'Toggle Light/Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#852BEB]" />}
            </button>

            {/* AR/EN Switch */}
            <button
              type="button"
              onClick={onToggleLang}
              className="min-h-[38px] px-2 rounded-xl bg-white dark:bg-[#221738] hover:bg-[#F8F5FF] dark:hover:bg-[#2C1E47] border border-[#ECE7F6] dark:border-[#852BEB]/35 text-xs font-extrabold text-[#1A132B] dark:text-white flex items-center gap-1 transition-colors cursor-pointer"
              aria-label="Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#852BEB] dark:text-[#F4E600]" />
              <span>{isRtl ? 'EN' : 'ع'}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((p) => !p);
                  setCountryDropdownOpen(false);
                }}
                className="relative min-h-[38px] min-w-[38px] rounded-xl bg-white dark:bg-[#221738] hover:bg-[#F8F5FF] dark:hover:bg-[#2C1E47] border border-[#ECE7F6] dark:border-[#852BEB]/35 flex items-center justify-center text-[#1A132B] dark:text-white cursor-pointer transition-colors"
                aria-label={t.notificationsTitle}
              >
                <Bell className="w-4 h-4" />
                {visibleNotifications.length > 0 && (
                  <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-[#F4E600] text-[#1A132B] text-[10px] font-black flex items-center justify-center tabular-nums shadow-xs">
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
                  <div className="absolute end-0 mt-2 w-80 max-w-[90vw] rounded-2xl bg-[#FFFEFC] dark:bg-[#1C1430] border border-[#ECE7F6] dark:border-[#852BEB]/40 shadow-2xl p-3.5 z-50 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#ECE7F6] dark:border-[#852BEB]/25 pb-2">
                      <span className="text-xs font-black text-[#1A132B] dark:text-white">
                        {t.notificationsTitle}
                      </span>
                      <span className="text-[10px] font-black text-[#852BEB] dark:text-[#F4E600]">
                        {role}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6E6485] dark:text-[#B8AED1]">
                      {t.notificationsScopedBy}
                    </p>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {visibleNotifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-[#6E6485] dark:text-[#B8AED1]">
                          {t.noNotifications}
                        </div>
                      ) : (
                        visibleNotifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-2.5 rounded-xl bg-[#F8F7FB] dark:bg-[#24193E] border border-[#ECE7F6] dark:border-[#852BEB]/25 text-xs space-y-1"
                          >
                            <div className="font-bold text-[#1A132B] dark:text-white">
                              {isRtl ? n.titleAr : n.titleEn}
                            </div>
                            <div className="text-[10px] text-[#6E6485] dark:text-[#B8AED1]">
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
              className="relative min-h-[38px] px-2.5 rounded-xl bg-[#852BEB] hover:bg-[#6E1ED1] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#852BEB]/25 transition-all cursor-pointer"
              aria-label={t.cartTitle}
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">{t.cartTitle}</span>
              <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#F4E600] text-[#1A132B] text-[10px] font-black flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            </button>

            <div className="hidden sm:block">
              <PWAInstallButton isRtl={isRtl} />
            </div>
          </div>
        </div>

        {/* Mobile Secondary Quick Row */}
        <div className="md:hidden px-3 pb-2.5 flex items-center gap-2 bg-[#FFFEFC] dark:bg-[#161024]">
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8F7FB] dark:bg-[#221738] border border-[#ECE7F6] dark:border-[#852BEB]/30 text-[#4A4160] dark:text-[#DDD6FE] text-xs font-semibold cursor-pointer min-w-0"
          >
            <Search className="w-4 h-4 text-[#852BEB] dark:text-[#F4E600] shrink-0" />
            <span className="truncate">{t.searchPlaceholder}</span>
          </button>

          <PWAInstallButton isRtl={isRtl} compact className="shrink-0 sm:hidden" />
        </div>
      </header>

      {/* Multi-Scope Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A132B]/55 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#FFFEFC] dark:bg-[#1C1430] rounded-3xl border border-[#ECE7F6] dark:border-[#852BEB]/40 shadow-2xl overflow-hidden mt-6 sm:mt-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#ECE7F6] dark:border-[#852BEB]/25 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#852BEB] dark:text-[#F4E600] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 text-sm text-[#1A132B] dark:text-white placeholder-[#9388AE] focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="p-2 rounded-xl bg-[#F8F7FB] dark:bg-[#2A1E44] hover:bg-[#ECE7F6] text-[#1A132B] dark:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 py-2.5 bg-[#F8F7FB] dark:bg-[#24193E] border-b border-[#ECE7F6] dark:border-[#852BEB]/25 flex items-center gap-1.5 overflow-x-auto">
              {scopeOptions.map((opt) => {
                const active = searchScope === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSearchScope(opt.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#852BEB] text-white shadow-xs'
                        : 'bg-white dark:bg-[#1C1430] text-[#4A4160] dark:text-[#DDD6FE] border border-[#ECE7F6] dark:border-[#852BEB]/30 hover:border-[#852BEB]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-[#ECE7F6] dark:divide-[#852BEB]/20 p-2">
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#6E6485] dark:text-[#B8AED1]">
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
                    className="w-full p-3 rounded-xl hover:bg-[#F8F5FF] dark:hover:bg-[#2A1E44] text-start flex items-center justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#852BEB] text-white flex items-center justify-center shrink-0">
                        {item.scope === 'kitchens' && <ChefHat className="w-4 h-4 text-[#F4E600]" />}
                        {item.scope === 'places' && <MapPin className="w-4 h-4 text-[#F4E600]" />}
                        {item.scope === 'offers' && <Tag className="w-4 h-4 text-[#F4E600]" />}
                        {item.scope === 'invoices' && <FileText className="w-4 h-4 text-[#F4E600]" />}
                        {item.scope === 'gift_cards' && <Gift className="w-4 h-4 text-[#F4E600]" />}
                        {item.scope === 'meals' && <UtensilsCrossed className="w-4 h-4 text-[#F4E600]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-[#1A132B] dark:text-white truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#6E6485] dark:text-[#B8AED1] truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#852BEB] dark:text-[#F4E600] shrink-0">
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
