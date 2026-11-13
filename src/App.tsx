import React, { useState, useEffect, useMemo } from 'react';
import {
  INITIAL_AUDIT_LOGS,
  INITIAL_CLIENT_TENANTS,
} from './data/mockOperationalData';
import {
  AuditLogEntry,
  ClientTenant,
} from './types/dashboard';
import { CustomerPortalView } from './components/CustomerPortalView';
import { HaccpInspectionHub } from './components/HaccpInspectionHub';
import { HabeGermanMarketPortal } from './components/HabeGermanMarketPortal';
import { OfficialLegalPaperworkModal } from './components/OfficialLegalPaperworkModal';
import { DepartmentsHubView } from './components/DepartmentsHubView';
import { RawMaterialsForecastingHub } from './components/RawMaterialsForecastingHub';
import { PrintableReportModal } from './components/PrintableReportModal';
import { UniversalDocumentBuilderModal, UniversalDocType } from './components/UniversalDocumentBuilderModal';
import { CamelLiverVipModal } from './components/CamelLiverVipModal';
import { Phase1TopBar, NotificationItem } from './components/Phase1TopBar';
import { Phase1HomeView } from './components/Phase1HomeView';
import { Phase1KitchensView } from './components/Phase1KitchensView';
import { Phase1ServicesHub, Phase1RfqSubmission } from './components/Phase1ServicesHub';
import { Phase1CartDrawer, Phase1CartItem } from './components/Phase1CartDrawer';
import { SplashScreen } from './components/SplashScreen';
import { AlAinVisitorWorldView } from './components/AlAinVisitorWorldView';
import {
  Phase1AuthAdminView,
  Phase1ActivityItem,
  UnifiedSubmoduleKey,
} from './components/Phase1AuthAdminView';
import { Phase1SupportDrawer, SupportMessageEntry } from './components/Phase1SupportDrawer';
import {
  CountryCode,
  LanguageCode,
  PHASE1_I18N,
  RoleScope,
  SUPPORTED_COUNTRIES,
} from './data/phase1Data';
import {
  ShieldCheck,
  CheckCircle2,
  Home,
  UtensilsCrossed,
  ChefHat,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  FileDown,
  Briefcase,
} from 'lucide-react';
import { FaydEcosystemHub } from './components/fayd/FaydEcosystemHub';

function readStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  // Real Light / Dark Theme State (Default: Pure Radiant Milky-White Light Mode)
  const [isDark, setIsDark] = useState<boolean>(() =>
    readStoredJson<boolean>('ce_theme_dark', false)
  );
  const [isRtl, setIsRtl] = useState<boolean>(() => {
    const saved = readStoredJson<LanguageCode>('ce_phase1_lang', 'ar');
    return saved === 'ar';
  });

  // Unified Single-App Navigation State (Starts with radiant Splash, then directly Home as Visitor — NO blocking login)
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [phase1Country, setPhase1Country] = useState<CountryCode>(() =>
    readStoredJson<CountryCode>('ce_phase1_country', 'EG')
  );
  const [phase1Role, setPhase1Role] = useState<RoleScope>('visitor');
  const [phase1Section, setPhase1Section] = useState<string>('home');
  const [activeSubmodule, setActiveSubmodule] = useState<UnifiedSubmoduleKey | null>(null);
  const [selectedKitchenId, setSelectedKitchenId] = useState<
    'hanger_station' | 'mall_al_ain' | 'al_hurriya' | null
  >(null);
  const [preselectedQuoteKitchen, setPreselectedQuoteKitchen] = useState<string>('');
  const [customLogoDataUrl, setCustomLogoDataUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ce_phase1_logo');
    } catch {
      return null;
    }
  });

  // Cart & Submissions Persistence
  const [cartItems, setCartItems] = useState<Phase1CartItem[]>(() =>
    readStoredJson<Phase1CartItem[]>('ce_phase1_cart', [])
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rfqSubmissions, setRfqSubmissions] = useState<Phase1RfqSubmission[]>(() =>
    readStoredJson<Phase1RfqSubmission[]>('ce_phase1_rfqs', [])
  );
  const [supportMessages, setSupportMessages] = useState<SupportMessageEntry[]>(() =>
    readStoredJson<SupportMessageEntry[]>('ce_phase1_support', [])
  );
  const [phase1Activity, setPhase1Activity] = useState<Phase1ActivityItem[]>(() =>
    readStoredJson<Phase1ActivityItem[]>('ce_phase1_activity', [])
  );

  // Preserved Operational Datasets & Modals inside Unified Shell
  const [tenants] = useState<ClientTenant[]>(INITIAL_CLIENT_TENANTS);
  const [, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [isLegalPaperworkModalOpen, setIsLegalPaperworkModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isUniversalDocBuilderOpen, setIsUniversalDocBuilderOpen] = useState(false);
  const [universalDocType, setUniversalDocType] = useState<UniversalDocType>('quotation');
  const [universalDocCompany, setUniversalDocCompany] = useState<string | undefined>(undefined);
  const [isCamelLiverModalOpen, setIsCamelLiverModalOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync Dark / Light Theme across entire document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('ce_theme_dark', JSON.stringify(isDark));
    } catch {
      // ignore
    }
  }, [isDark]);

  // Sync RTL/LTR direction
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', isRtl ? 'ar' : 'en');
    try {
      localStorage.setItem('ce_phase1_lang', JSON.stringify(isRtl ? 'ar' : 'en'));
    } catch {
      // ignore
    }
  }, [isRtl]);

  useEffect(() => {
    try {
      localStorage.setItem('ce_phase1_country', JSON.stringify(phase1Country));
    } catch {
      // ignore
    }
  }, [phase1Country]);

  useEffect(() => {
    try {
      localStorage.setItem('ce_phase1_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('ce_phase1_rfqs', JSON.stringify(rfqSubmissions));
    } catch {
      // ignore
    }
  }, [rfqSubmissions]);

  useEffect(() => {
    try {
      localStorage.setItem('ce_phase1_support', JSON.stringify(supportMessages));
    } catch {
      // ignore
    }
  }, [supportMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('ce_phase1_activity', JSON.stringify(phase1Activity));
    } catch {
      // ignore
    }
  }, [phase1Activity]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const langCode: LanguageCode = isRtl ? 'ar' : 'en';
  const t1 = PHASE1_I18N[langCode];
  const activeCountryObj =
    SUPPORTED_COUNTRIES.find((c) => c.code === phase1Country) || SUPPORTED_COUNTRIES[0];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const actSeqRef = React.useRef(0);

  const logPhase1Action = (actionAr: string, actionEn: string) => {
    actSeqRef.current += 1;
    setPhase1Activity((prev) => [
      {
        id: `ACT-${Date.now().toString().slice(-5)}-${actSeqRef.current}`,
        actionAr,
        actionEn,
        actorRole: phase1Role,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  const handleAddAuditLog = (actionAr: string, actionEn: string, details: string) => {
    actSeqRef.current += 1;
    setAuditLogs((prev) => [
      {
        id: `AUD-${Date.now().toString().slice(-4)}-${actSeqRef.current}`,
        timestamp: isRtl ? 'الآن' : 'Just now',
        userRole: 'ops_director',
        userName: phase1Role,
        moduleName: 'CATERING EGYPT',
        actionAr,
        actionEn,
        details,
        severity: 'info',
      },
      ...prev,
    ]);
    logPhase1Action(actionAr, actionEn);
  };

  const handlePhase1Navigate = (
    section: string,
    kitchenId?: 'hanger_station' | 'mall_al_ain' | 'al_hurriya'
  ) => {
    setActiveSubmodule(null);

    if (section === 'service_hygiene') {
      // Directly open the integrated HACCP & Quality view inside unified shell or ServicesHub
      setSelectedKitchenId(null);
      setPhase1Section(section);
    } else if (section === 'kitchen_detail' && kitchenId) {
      setSelectedKitchenId(kitchenId);
      setPhase1Section('kitchens');
    } else if (section === 'kitchens') {
      setSelectedKitchenId(null);
      setPhase1Section('kitchens');
    } else {
      setSelectedKitchenId(null);
      setPhase1Section(section);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSubmodule = (key: UnifiedSubmoduleKey) => {
    if (key === 'legal_paperwork') {
      setIsLegalPaperworkModalOpen(true);
      return;
    }
    setActiveSubmodule(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUploadOfficialLogo = (dataUrl: string) => {
    setCustomLogoDataUrl(dataUrl);
    try {
      localStorage.setItem('ce_phase1_logo', dataUrl);
    } catch {
      // ignore
    }
    logPhase1Action('تحديث الشعار الرسمي للمنصة', 'Updated Official Platform Logo');
    showToast(isRtl ? 'تم رفع وحفظ الشعار الرسمي بنجاح.' : 'Official logo uploaded and saved.');
  };

  const handleResetOfficialLogo = () => {
    setCustomLogoDataUrl(null);
    try {
      localStorage.removeItem('ce_phase1_logo');
    } catch {
      // ignore
    }
    showToast(isRtl ? 'تمت استعادة مساحة الشعار الرسمي.' : 'Official logo slot reset.');
  };

  const handleAddToCart = (item: Omit<Phase1CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    logPhase1Action(`إضافة "${item.nameAr}" إلى السلة`, `Added "${item.nameEn}" to cart`);
    showToast(isRtl ? `تمت إضافة "${item.nameAr}" إلى السلة.` : `Added "${item.nameEn}" to cart.`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handlePhase1SubmitRfq = (rfq: Phase1RfqSubmission) => {
    setRfqSubmissions((prev) => [rfq, ...prev]);
    logPhase1Action(
      `إرسال طلب [${rfq.id}] — ${rfq.organizationOrKitchenName}`,
      `Submitted request [${rfq.id}] — ${rfq.organizationOrKitchenName}`
    );
    showToast(
      isRtl
        ? `تم تسجيل طلبك وحفظه برقم: ${rfq.id}`
        : `Request confirmed with tracking ID: ${rfq.id}`
    );
  };

  const phase1Notifications: NotificationItem[] = useMemo(() => {
    const base: NotificationItem[] = [
      {
        id: 'n_public_1',
        titleAr: 'مرحباً بك في تطبيق CATERING EGYPT الموحد',
        titleEn: 'Welcome to the unified CATERING EGYPT app',
        category: 'offer',
        allowedRoles: [
          'visitor',
          'individual',
          'corporate_client',
          'kitchen_manager',
          'system_admin',
        ],
        timeLabel: isRtl ? 'النظام' : 'System',
      },
    ];
    rfqSubmissions.slice(0, 3).forEach((rfq) => {
      base.unshift({
        id: `n_rfq_${rfq.id}`,
        titleAr: `طلب [${rfq.id}]: ${rfq.organizationOrKitchenName} (${rfq.status})`,
        titleEn: `RFQ [${rfq.id}]: ${rfq.organizationOrKitchenName}`,
        category: 'order',
        allowedRoles: ['kitchen_manager', 'system_admin'],
        timeLabel: rfq.createdAt,
      });
    });
    if (cartItems.length > 0) {
      base.push({
        id: 'n_cart_reminder',
        titleAr: `لديك ${cartItems.length} أصناف محفوظة في سلة الطلبات`,
        titleEn: `You have ${cartItems.length} saved items in your cart`,
        category: 'order',
        allowedRoles: [
          'visitor',
          'individual',
          'corporate_client',
          'kitchen_manager',
          'system_admin',
        ],
        timeLabel: isRtl ? 'السلة' : 'Cart',
      });
    }
    return base;
  }, [rfqSubmissions, cartItems.length, isRtl]);

  const isAlAinVisitorSection = phase1Section.startsWith('al_ain_');
  const isServicesSection =
    phase1Section.startsWith('service_') ||
    phase1Section === 'quotation' ||
    phase1Section === 'join_kitchen';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans pb-20 md:pb-6 transition-colors duration-200">
      {/* Stage 3: Radiant Light-Orange Visitor Splash Screen (Auto-enters or instant skip, no forced login) */}
      {showSplash && (
        <SplashScreen
          lang={langCode}
          customLogoDataUrl={customLogoDataUrl}
          onEnterPlatform={() => setShowSplash(false)}
        />
      )}

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 start-4 sm:start-6 z-50 max-w-md bg-slate-900 dark:bg-slate-800 text-white border border-[#FF6B00] rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0" />
            <p className="text-xs font-bold leading-relaxed">{toastMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-300 hover:text-white text-xs p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Unified Top Bar */}
      <Phase1TopBar
        lang={langCode}
        onToggleLang={() => setIsRtl((p) => !p)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((p) => !p)}
        country={phase1Country}
        onSelectCountry={(c) => {
          setPhase1Country(c);
          logPhase1Action(`تغيير الدولة النشطة إلى ${c}`, `Changed active country to ${c}`);
        }}
        role={phase1Role}
        customLogoDataUrl={customLogoDataUrl}
        onUploadLogo={handleUploadOfficialLogo}
        onResetLogo={handleResetOfficialLogo}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        notifications={phase1Notifications}
        onNavigateSection={handlePhase1Navigate}
      />

      {/* Desktop Unified Navigation Bar (Single Consistent Navigation Path) */}
      <nav className="hidden md:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePhase1Navigate('home')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                phase1Section === 'home' && !activeSubmodule
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t1.nav.home}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePhase1Navigate('al_ain_restaurants')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                isAlAinVisitorSection && !activeSubmodule
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRtl ? 'عالم ومطاعم العين' : 'Al Ain World'}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePhase1Navigate('service_meals_offer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                isServicesSection && !activeSubmodule
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{t1.nav.services}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePhase1Navigate('kitchens')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                phase1Section === 'kitchens' && !activeSubmodule
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>{t1.nav.kitchens}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePhase1Navigate('fayd_ecosystem')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                phase1Section === 'fayd_ecosystem' && !activeSubmodule
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isRtl ? 'منظومة FAYD' : 'FAYD Ecosystem'}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePhase1Navigate('admin')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                (phase1Section === 'admin' || !!activeSubmodule)
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t1.nav.admin}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setUniversalDocType('quotation');
              setUniversalDocCompany(undefined);
              setIsUniversalDocBuilderOpen(true);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-[#FF6B00] text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isRtl ? 'مستندات وعروض PDF' : 'PDF Builder'}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-5 sm:pt-7">
        {/* If a preserved operational subsystem is opened inside the unified app, wrap it with a reliable Back Bar */}
        {activeSubmodule ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveSubmodule(null)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-900 dark:text-white shadow-xs cursor-pointer"
              >
                <BackIcon className="w-4 h-4 text-[#FF6B00]" />
                <span>{isRtl ? 'العودة لواجهة الحساب والمنظومة' : 'Back to Unified Hub'}</span>
              </button>
              <button
                type="button"
                onClick={() => handlePhase1Navigate('home')}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                {t1.nav.home}
              </button>
            </div>

            {activeSubmodule === 'raw_materials_forecast' && (
              <RawMaterialsForecastingHub
                tenants={tenants}
                isRtl={isRtl}
                onOpenDocBuilder={(type, company) => {
                  setUniversalDocType(type || 'quotation');
                  setUniversalDocCompany(company);
                  setIsUniversalDocBuilderOpen(true);
                }}
                onAddAuditLog={handleAddAuditLog}
                onShowToast={showToast}
                onClose={() => setActiveSubmodule(null)}
              />
            )}

            {activeSubmodule === 'departments' && (
              <DepartmentsHubView
                isRtl={isRtl}
                onClose={() => setActiveSubmodule(null)}
                onOpenDocBuilder={(type, company) => {
                  setUniversalDocType(type || 'quotation');
                  setUniversalDocCompany(company);
                  setIsUniversalDocBuilderOpen(true);
                }}
                onOpenCamelLiverModal={() => setIsCamelLiverModalOpen(true)}
                onAddAuditLog={handleAddAuditLog}
                onShowToast={showToast}
              />
            )}

            {activeSubmodule === 'haccp' && (
              <HaccpInspectionHub
                isRtl={isRtl}
                onOpenPrintReport={() => setIsPrintModalOpen(true)}
                onAddAuditLog={handleAddAuditLog}
              />
            )}

            {activeSubmodule === 'client_portal' && (
              <CustomerPortalView
                tenants={tenants}
                isRtl={isRtl}
                onOpenSupport={() => handlePhase1Navigate('quotation')}
                onAddAuditLog={handleAddAuditLog}
              />
            )}

            {activeSubmodule === 'habe_german' && (
              <HabeGermanMarketPortal
                isRtl={isRtl}
                onClose={() => setActiveSubmodule(null)}
                onAddAuditLog={handleAddAuditLog}
                onShowToast={showToast}
              />
            )}
          </div>
        ) : (
          <>
            {phase1Section === 'home' && (
              <Phase1HomeView
                lang={langCode}
                country={phase1Country}
                customLogoDataUrl={customLogoDataUrl}
                onUploadLogo={handleUploadOfficialLogo}
                onNavigateSection={handlePhase1Navigate}
                onOpenReportPdf={() => setIsPrintModalOpen(true)}
                onOpenQuotePdf={() => {
                  setUniversalDocType('quotation');
                  setUniversalDocCompany(undefined);
                  setIsUniversalDocBuilderOpen(true);
                }}
              />
            )}

            {isAlAinVisitorSection && (
              <AlAinVisitorWorldView
                lang={langCode}
                activeSection={phase1Section}
                customLogoDataUrl={customLogoDataUrl}
                onUploadLogo={handleUploadOfficialLogo}
                onNavigateSection={handlePhase1Navigate}
              />
            )}

            {phase1Section === 'kitchens' && (
              <Phase1KitchensView
                lang={langCode}
                selectedKitchenId={selectedKitchenId}
                onSelectKitchen={setSelectedKitchenId}
                onBackHome={() => handlePhase1Navigate('home')}
                onRequestQuoteForKitchen={(kName) => {
                  setPreselectedQuoteKitchen(kName);
                  handlePhase1Navigate('quotation');
                }}
                onAddToCart={handleAddToCart}
              />
            )}

            {isServicesSection && (
              <Phase1ServicesHub
                lang={langCode}
                country={phase1Country}
                role={phase1Role}
                activeSection={phase1Section}
                preselectedKitchenName={preselectedQuoteKitchen}
                cartItems={cartItems}
                onNavigateSection={handlePhase1Navigate}
                onAddToCart={handleAddToCart}
                onSubmitRfq={handlePhase1SubmitRfq}
                rfqSubmissions={rfqSubmissions}
                onOpenHaccpHub={() => handleOpenSubmodule('haccp')}
              />
            )}

            {phase1Section === 'fayd_ecosystem' && (
              <FaydEcosystemHub
                lang={langCode}
                countryCode={phase1Country}
                onExportContractPdf={(companyTitle) => {
                  setUniversalDocType('quotation');
                  setUniversalDocCompany(companyTitle);
                  setIsUniversalDocBuilderOpen(true);
                }}
                onShowToast={showToast}
                onBackHome={() => handlePhase1Navigate('home')}
              />
            )}

            {phase1Section === 'admin' && (
              <Phase1AuthAdminView
                lang={langCode}
                country={phase1Country}
                onSelectCountry={setPhase1Country}
                role={phase1Role}
                onChangeRole={(r) => {
                  setPhase1Role(r);
                  logPhase1Action(`تغيير الدور النشط إلى ${r}`, `Switched active role to ${r}`);
                }}
                rfqSubmissions={rfqSubmissions}
                onUpdateRfqStatus={(id, status) => {
                  setRfqSubmissions((prev) =>
                    prev.map((item) => (item.id === id ? { ...item, status } : item))
                  );
                  logPhase1Action(`تحديث حالة الطلب ${id} إلى ${status}`, `Updated RFQ ${id}`);
                }}
                activityLog={phase1Activity}
                onLogAccountRegistration={(type, label) => {
                  logPhase1Action(
                    `تسجيل حساب ${type === 'individual' ? 'أفراد' : 'شركات'}: ${label}`,
                    `Registered ${type} account: ${label}`
                  );
                }}
                onOpenSubmodule={handleOpenSubmodule}
                onOpenFaydEcosystem={() => handlePhase1Navigate('fayd_ecosystem')}
                onBackHome={() => handlePhase1Navigate('home')}
              />
            )}
          </>
        )}
      </main>

      {/* Clean Brand Footer (Requirement VI) */}
      <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center transition-colors">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-wide">
            {t1.footerBrand}
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#FF6B00]">
            {t1.footerRights}
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Tab Bar (Single Unified Path, <= 64px Height) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 px-1">
        <button
          type="button"
          onClick={() => handlePhase1Navigate('home')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-black cursor-pointer ${
            phase1Section === 'home' && !activeSubmodule
              ? 'text-[#FF6B00]'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="truncate">{t1.nav.home}</span>
        </button>

        <button
          type="button"
          onClick={() => handlePhase1Navigate('al_ain_restaurants')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-black cursor-pointer ${
            isAlAinVisitorSection && !activeSubmodule
              ? 'text-[#FF6B00]'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="truncate">{isRtl ? 'عالم العين' : 'Al Ain'}</span>
        </button>

        <button
          type="button"
          onClick={() => handlePhase1Navigate('fayd_ecosystem')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-black cursor-pointer ${
            phase1Section === 'fayd_ecosystem' && !activeSubmodule
              ? 'text-[#FF6B00]'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="truncate">FAYD</span>
        </button>

        <button
          type="button"
          onClick={() => handlePhase1Navigate('kitchens')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-black cursor-pointer ${
            (phase1Section === 'kitchens' || isServicesSection) && !activeSubmodule
              ? 'text-[#FF6B00]'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <ChefHat className="w-5 h-5" />
          <span className="truncate">{t1.nav.kitchens}</span>
        </button>

        <button
          type="button"
          onClick={() => handlePhase1Navigate('admin')}
          className={`flex flex-col items-center justify-center gap-1 text-[10px] font-black cursor-pointer ${
            (phase1Section === 'admin' || !!activeSubmodule)
              ? 'text-[#FF6B00]'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="truncate">{isRtl ? 'حسابي' : 'Account'}</span>
        </button>
      </nav>

      {/* Cart Drawer */}
      <Phase1CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        lang={langCode}
        currencyLabel={isRtl ? activeCountryObj.currencyAr : activeCountryObj.currencyEn}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onConvertToQuote={() => {
          setIsCartOpen(false);
          handlePhase1Navigate('quotation');
        }}
      />

      {/* Freely Draggable Floating AI & Support Icon */}
      <Phase1SupportDrawer
        lang={langCode}
        messages={supportMessages}
        onSendMessage={(msg) => {
          setSupportMessages((prev) => [...prev, msg]);
          logPhase1Action(`إرسال رسالة دعم من ${msg.senderName}`, `Support inquiry logged`);
        }}
        onQuickNavigate={(sec) => handlePhase1Navigate(sec)}
      />

      {/* Preserved Enterprise Modals mounted cleanly inside unified app */}
      <OfficialLegalPaperworkModal
        isOpen={isLegalPaperworkModalOpen}
        onClose={() => setIsLegalPaperworkModalOpen(false)}
        isRtl={isRtl}
        onShowToast={showToast}
        onAddAuditLog={handleAddAuditLog}
      />

      <PrintableReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        initialType="haccp_certificate"
        customData={{ recipientOrg: 'CATERING EGYPT — HACCP Inspection Report' }}
      />

      <UniversalDocumentBuilderModal
        isOpen={isUniversalDocBuilderOpen}
        onClose={() => setIsUniversalDocBuilderOpen(false)}
        isRtl={isRtl}
        initialType={universalDocType}
        recipientCompany={universalDocCompany}
        onAddAuditLog={handleAddAuditLog}
        onShowToast={showToast}
      />

      <CamelLiverVipModal
        isOpen={isCamelLiverModalOpen}
        onClose={() => setIsCamelLiverModalOpen(false)}
        isRtl={isRtl}
        onAddAuditLog={handleAddAuditLog}
        onShowToast={showToast}
      />
    </div>
  );
}
