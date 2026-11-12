import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  ChefHat, 
  Flame, 
  Send, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  MessageSquare, 
  Clock, 
  Layers, 
  Building2, 
  Award, 
  PartyPopper,
  Briefcase,
  Gift,
  Tag,
  ArrowRight,
  ShieldCheck,
  FileQuestion,
  Headphones,
  Printer,
  HeartHandshake,
  Heart,
  Ticket,
  Percent,
  Check,
  FileText,
  FileCheck2,
  Receipt,
  Store,
  TrendingUp
} from 'lucide-react';
import { 
  SEASONAL_OFFERS_DATA, 
  SERRATED_COUPONS 
} from '../data/mockOperationalData';
import { 
  TestSampleRequest, 
  CustomMenuProposal, 
  SupportTicket 
} from '../types/dashboard';
import { BrandLogo } from './BrandLogo';
import { CharityReliefHub } from './CharityReliefHub';
import { FullBleedAdvertisingHero } from './FullBleedAdvertisingHero';
import { ThreeDCountryFlags } from './ThreeDCountryFlags';

interface PublicHomeViewProps {
  isRtl: boolean;
  onOpenAdminLogin: () => void;
  onOpenCustomerPortal: () => void;
  onOpenPrintQuotation: (company: string) => void;
  onOpenPrintMenuCatalog?: () => void;
  onOpenPrintCharityDoc?: (recipient?: string) => void;
  onAddTestSample: (sample: TestSampleRequest) => void;
  onAddCustomMenu: (menu: CustomMenuProposal) => void;
  onAddSupportTicket: (ticket: SupportTicket) => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
  onShowToast: (msg: string) => void;
  testSamples: TestSampleRequest[];
  customMenus: CustomMenuProposal[];
  onOpenLegalPaperwork?: () => void;
  onOpenHabeGerman?: () => void;
  onOpenCamelLiverModal?: () => void;
  onOpenEventWeddingModal?: () => void;
  onOpenUniversalDocBuilder?: () => void;
  onOpenDepartmentsHub?: () => void;
}

export const PublicHomeView: React.FC<PublicHomeViewProps> = ({
  isRtl,
  onOpenAdminLogin,
  onOpenCustomerPortal,
  onOpenPrintQuotation,
  onOpenPrintMenuCatalog,
  onOpenPrintCharityDoc,
  onAddTestSample,
  onAddCustomMenu,
  onAddSupportTicket,
  onAddAuditLog,
  onShowToast,
  testSamples,
  customMenus,
  onOpenLegalPaperwork,
  onOpenHabeGerman,
  onOpenCamelLiverModal,
  onOpenEventWeddingModal,
  onOpenUniversalDocBuilder,
  onOpenDepartmentsHub
}) => {
  // Navigation active tab on public home
  const [activeSection, setActiveSection] = useState<
    'menus' | 'charity' | 'test_sample' | 'propose_menu' | 'track_order' | 'events' | 'seasonal' | 'support'
  >('menus');

  // Country branch selection state
  const [selectedBranch, setSelectedBranch] = useState<'EG' | 'AE' | 'SA'>('EG');

  // Form states for Test Sample Request
  const [sampleCompany, setSampleCompany] = useState('');
  const [sampleContact, setSampleContact] = useState('');
  const [samplePhone, setSamplePhone] = useState('');
  const [sampleEmail, setSampleEmail] = useState('');
  const [sampleLocation, setSampleLocation] = useState('');
  const [sampleMealType, setSampleMealType] = useState('وجبات مطبوخة ساخنة (بروتين عالي)');
  const [sampleCount, setSampleCount] = useState(10);
  const [sampleIndustry, setSampleIndustry] = useState('مصانع وقطاع صناعي');
  const [sampleDate, setSampleDate] = useState('2026-11-20');
  const [sampleNotes, setSampleNotes] = useState('');
  const [sampleSuccessId, setSampleSuccessId] = useState<string | null>(null);

  // Form states for Propose Custom Menu
  const [customDishName, setCustomDishName] = useState('');
  const [customCompany, setCustomCompany] = useState('');
  const [customContact, setCustomContact] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customIngredients, setCustomIngredients] = useState('');
  const [customGrams, setCustomGrams] = useState('450 جم');
  const [customDailyVolume, setCustomDailyVolume] = useState(250);
  const [customNotes, setCustomNotes] = useState('');
  const [customMenuSuccessId, setCustomMenuSuccessId] = useState<string | null>(null);

  // Tracking query state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  // Live support ticket states
  const [supportName, setSupportName] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Handle submit Test Sample Request
  const handleSubmitSample = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleCompany.trim() || !sampleContact.trim() || !samplePhone.trim()) return;

    const newId = `TEST-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRequest: TestSampleRequest = {
      id: newId,
      companyName: sampleCompany.trim(),
      contactPerson: sampleContact.trim(),
      phone: samplePhone.trim(),
      email: sampleEmail.trim() || 'contact@company.com',
      location: sampleLocation.trim() || (isRtl ? 'القاهرة' : 'Cairo'),
      mealType: sampleMealType,
      sampleCount: Number(sampleCount) || 10,
      industryType: sampleIndustry,
      proposedDate: sampleDate,
      notes: sampleNotes.trim(),
      status: 'جديد — بانتظار المراجعة',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    onAddTestSample(newRequest);
    setSampleSuccessId(newId);
    setSampleCompany('');
    setSampleContact('');
    setSamplePhone('');
    setSampleNotes('');
  };

  // Handle submit Custom Menu
  const handleSubmitCustomMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDishName.trim() || !customCompany.trim()) return;

    const newId = `PROP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newProposal: CustomMenuProposal = {
      id: newId,
      companyName: customCompany.trim(),
      contactPerson: customContact.trim() || 'المسؤول الإداري',
      phone: customPhone.trim() || '01000000000',
      dishName: customDishName.trim(),
      ingredients: customIngredients.trim() || 'مكونات غذائية متوازنة عالية الجودة',
      portionGramWeight: customGrams.trim() || '450 جم',
      serviceType: 'إعاشة مخصصة',
      expectedDailyVolume: Number(customDailyVolume) || 200,
      nutritionNotes: customNotes.trim(),
      status: 'قيد مراجعة الشيف والتسعير',
      approvedPublicPriceEGP: 155,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddCustomMenu(newProposal);
    setCustomMenuSuccessId(newId);
    setCustomDishName('');
    setCustomIngredients('');
  };

  // Handle submit Live Tech Support Ticket
  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportName.trim() || !supportMessage.trim()) return;

    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: supportName.trim(),
      contactPhone: supportPhone.trim() || '01000000000',
      subject: supportSubject.trim() || 'طلب استفسار وخدمة عامة',
      category: 'دعم فني عام',
      message: supportMessage.trim(),
      status: 'مفتوحة — قيد المتابعة',
      priority: 'عادي',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    onAddSupportTicket(newTicket);
    setSupportSuccess(true);
    setSupportName('');
    setSupportPhone('');
    setSupportMessage('');
    setTimeout(() => setSupportSuccess(false), 4000);
  };

  // Handle tracking query
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const q = trackQuery.trim().toUpperCase();
    if (!q) return;

    const foundSample = testSamples.find((s) => s.id.toUpperCase() === q);
    if (foundSample) {
      setTrackResult(
        `طلب عينة [${foundSample.id}]: الجهة: "${foundSample.companyName}" — الحالة الحالية: [${foundSample.status}] ${foundSample.scheduledTastingDate ? `(موعد التذوق: ${foundSample.scheduledTastingDate})` : ''}`
      );
      return;
    }

    const foundMenu = customMenus.find((m) => m.id.toUpperCase() === q);
    if (foundMenu) {
      setTrackResult(
        `اقتراح منيو [${foundMenu.id}]: الصنف "${foundMenu.dishName}" — الحالة: [${foundMenu.status}] ${foundMenu.approvedPublicPriceEGP ? `(السعر المعتمد: ${foundMenu.approvedPublicPriceEGP} ج.م للوجبة)` : ''}`
      );
      return;
    }

    if (q.startsWith('QUOT') || q.startsWith('OFFER')) {
      setTrackResult(
        `عرض السعر [${q}]: معتمد وسارٍ — جاري التنسيق مع فريق العمليات برئاسة م/ مصطفى شعبان.`
      );
      return;
    }

    setTrackResult(
      `لم يتم العثور على طلب مسجل برقم [${q}]. يرجى التأكد من الرقم أو التواصل مع الدعم الفني.`
    );
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Full-Bleed Commercial Advertising Experience (Waffarha Style with High-Res Photography & 12 Golden Ribbons) */}
      <FullBleedAdvertisingHero
        isRtl={isRtl}
        onOpenServiceTab={(serviceId) => {
          if (serviceId === 'request_quote') {
            onOpenPrintQuotation('عرض توريد غذائي رسمي');
            return;
          }
          if (serviceId === 'factory_catering' || serviceId === 'corporate_catering' || serviceId === 'subsistence_services' || serviceId === 'culinary_menus') {
            setActiveSection('menus');
          } else if (serviceId === 'meal_offers') {
            setActiveSection('seasonal');
          } else if (serviceId === 'test_sample') {
            setActiveSection('test_sample');
          } else if (serviceId === 'propose_menu') {
            setActiveSection('propose_menu');
          } else if (serviceId === 'track_orders') {
            setActiveSection('track_order');
          } else if (serviceId === 'complaints_suggestions' || serviceId === 'tech_support') {
            setActiveSection('support');
          } else if (serviceId === 'hospitality_events') {
            setActiveSection('events');
          } else if (serviceId === 'charity') {
            setActiveSection('charity');
          } else {
            setActiveSection('menus');
          }

          const targetEl = document.getElementById('public-interactive-tabs');
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenPrintQuotation={onOpenPrintQuotation}
        onOpenPrintMenuCatalog={onOpenPrintMenuCatalog}
        onShowToast={onShowToast}
      />

      {/* 3D Entry Flags Section for the 3 Countries (Egypt 🇪🇬, UAE 🇦🇪, Saudi Arabia 🇸🇦) */}
      <section className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 dark:bg-slate-950/90 border-2 border-amber-400/30 shadow-2xl">
        <ThreeDCountryFlags
          selectedCountry={selectedBranch}
          onSelectCountry={(code) => {
            setSelectedBranch(code);
            if (code === 'EG') {
              onShowToast('تم تحديد فرع جمهورية مصر العربية — 3 مطابخ مركزية عاملة ومعتمدة');
            } else if (code === 'AE') {
              onShowToast('فرع الإمارات (دبي وأبوظبي): قيد التوسع الإقليمي والتشغيل لعام 2026');
            } else {
              onShowToast('فرع المملكة العربية السعودية: قيد التوسع الإقليمي والتشغيل لعام 2026');
            }
          }}
          isRtl={isRtl}
        />
      </section>

      {/* 6 Master Operational & Legal Feature Gateways */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-orange-500" />
            <h3 className="text-lg font-black text-white">
              بوابات المنظومة التنفيذية والخدمات الحصرية
            </h3>
          </div>
          <span className="text-xs text-orange-400 font-bold bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
            الشركة الوطنية اللوجستية · كاترينج مصر
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card 1: Official Paperwork & Legal Vault */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40">
                  سجل تجاري 19132
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-amber-400 transition-colors">
                الأوراق الرسمية والملف القانوني
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                استعراض السجل التجاري المعتمد لمكتب العاشر من رمضان المميز، البطاقة الضريبية 725-995-758، وبطاقة قيد المصدرين 600023736 وشعار التعبئة والتغليف.
              </p>
            </div>
            <button
              onClick={onOpenLegalPaperwork}
              className="mt-4 w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>فحص الأوراق والشهادات الرسمية</span>
            </button>
          </div>

          {/* Card 2: Ha-Be German Cement Factory Market Portal */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-red-950/30 border border-red-500/30 hover:border-red-400 transition-all flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full border border-red-500/40">
                  81 موظفاً · Ha-Be
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-red-400 transition-colors">
                وجهة الشركة الألمانية (Ha-Be Market)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                واجهة التطبيق المخصصة لمصنع الأسمنت الألماني، بوفيه الإفطار والوجبات الساخنة، دليل العاملين الـ 81، والدفع المباشر عبر فودافون كاش مع الإقفال المالي.
              </p>
            </div>
            <button
              onClick={onOpenHabeGerman}
              className="mt-4 w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold text-xs rounded-xl border border-red-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <ArrowRight className="w-4 h-4" />
              <span>دخول بوابة Ha-Be الألمانية</span>
            </button>
          </div>

          {/* Card 3: Camel Liver VIP Platter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 border border-orange-500/30 hover:border-orange-400 transition-all flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/40">
                  مول العين · بدر
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-orange-400 transition-colors">
                طاسة الكبدة الجملي والسجق البلدي الفاخر
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                ركن الجملي في مدينة بدر (مول العين) — طاسة الكبدة البلدي الطازجة مع داوود باشا والسجق المتبل، مع إمكانية حجز جلسات VIP خاصة برجال الأعمال والعائلات.
              </p>
            </div>
            <button
              onClick={onOpenCamelLiverModal}
              className="mt-4 w-full py-2.5 px-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 font-bold text-xs rounded-xl border border-orange-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>حجز جلسة VIP وتذوق الكبدة الجملي</span>
            </button>
          </div>

          {/* Card 4: Event & Wedding Buffet Hub */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <PartyPopper className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/40">
                  12 بوفيه مفتوح
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-purple-400 transition-colors">
                وجبات مناسبتك وبوفيه الفرح (فصّل وجبتك)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                «فصّل وجبة فرحك بنفسك وهنسند معاك ونديك السعر اللي يناسبك» — حاسبة سعر حية لطبق العرس، مع كود خصم العائلات «قوتنا في لمتنا» لـ 50 حتى 1000 فرد.
              </p>
            </div>
            <button
              onClick={onOpenEventWeddingModal}
              className="mt-4 w-full py-2.5 px-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-bold text-xs rounded-xl border border-purple-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>تصميم وجبة الفرح واستعراض البوفيه</span>
            </button>
          </div>

          {/* Card 5: Universal Document Builder & ETA E-Invoice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 border border-blue-500/30 hover:border-blue-400 transition-all flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/40">
                  ETA E-Invoice
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                محرر الفاتورة الإلكترونية وعروض الأسعار
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                إنشاء وتعديل وطباعة عروض الأسعار الرسمية، أوامر التوريد التشغيلية، والفاتورة الإلكترونية المعتمدة بمنظومة مصلحة الضرائب المصرية ETA مع تصدير PDF.
              </p>
            </div>
            <button
              onClick={onOpenUniversalDocBuilder}
              className="mt-4 w-full py-2.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 font-bold text-xs rounded-xl border border-blue-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>فتح محرر المستندات والفاتورة</span>
            </button>
          </div>

          {/* Card 6: 6 Corporate Departments & AI Demand Forecasting */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  إدارات 01 — 06
                </span>
              </div>
              <h4 className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
                إدارات المنظومة والذكاء التنبؤي
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                التغذية المركزية، الجودة وHACCP، المعامل والأبحاث، القطاع الزراعي وتمور سيوة، التصدير، والذكاء الاصطناعي للتنبؤ بالطلب والتحليل الموسمي.
              </p>
            </div>
            <button
              onClick={onOpenDepartmentsHub}
              className="mt-4 w-full py-2.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs rounded-xl border border-emerald-500/30 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>استعراض الإدارات الستة والذكاء</span>
            </button>
          </div>

        </div>
      </section>

      {/* Navigation Pills Bar */}
      <div id="public-interactive-tabs" className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-2 border border-slate-800 shadow-md overflow-x-auto scroll-mt-6">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'menus', label: 'المينيوهات والوجبات (84 وصفة)', icon: UtensilsCrossed },
            { id: 'charity', label: 'كفارة اليمين والإطعام الخيري والإغاثة', icon: HeartHandshake, highlight: true },
            { id: 'test_sample', label: 'اطلب عينة TEST', icon: ChefHat },
            { id: 'propose_menu', label: 'اقترح منيو خاص', icon: Sparkles },
            { id: 'track_order', label: 'متابعة الطلبات والعروض', icon: Search },
            { id: 'seasonal', label: 'العروض والكوبونات الذهبية', icon: Flame },
            { id: 'events', label: 'الفعاليات وبوفيهات VIP', icon: PartyPopper },
            { id: 'support', label: 'الدعم الفني والشكاوى', icon: Headphones },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/30'
                    : tab.highlight
                    ? 'text-amber-300 hover:bg-amber-500/10 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION: Charity & Religious Kaffarah Relief Hub (Innovative New Section) */}
      {activeSection === 'charity' && (
        <CharityReliefHub
          isRtl={isRtl}
          onOpenPrintCharityDoc={(recipient) => {
            if (onOpenPrintCharityDoc) {
              onOpenPrintCharityDoc(recipient);
            }
          }}
          onAddAuditLog={onAddAuditLog}
          onShowToast={onShowToast}
        />
      )}

      {/* SECTION: Culinary Menus Showcase with PDF Print Activation */}
      {activeSection === 'menus' && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  قوائم الطعام والوجبات المعتمدة (84 وصفة)
                </h2>
                <span className="text-xs bg-orange-600/20 text-orange-400 font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30">
                  طهي طازج يومياً
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                أطباق متوازنة محضرة وفق مواصفات سلامة الغذاء بمطابخ هنجر استيشن، مول العين ببدر، وريان اللاهون.
              </p>
            </div>

            {/* Prominent Menu Print Button */}
            <button
              onClick={() => {
                if (onOpenPrintMenuCatalog) {
                  onOpenPrintMenuCatalog();
                } else {
                  onOpenPrintQuotation('كتالوج المنيوهات المعتمدة');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة كتالوج المنيوهات والوجبات PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'وجبات المستشفيات والتغذية العلاجية',
                badge: 'قطاع الرعاية الطبية',
                desc: 'حميات دقيقة وموزونة بالجرام لمرضى السكر والضغط والقلب والكلى مع التغليف المعقم المفرغ.',
                items: ['لحم بتلو سوتيه مع خضار', 'فيليه دجاج مشوي قليل الصوديوم', 'شوربات معقمة خفيفة']
              },
              {
                title: 'الوجبات الساخنة للمصانع والورديات',
                badge: 'القطاع الصناعي والإنتاجي',
                desc: 'وجبات غنية بالطاقة والبروتين لعمال المصانع والمواقع الشاقة بنظام التسليم الساخن (+70° م).',
                items: ['دجاج مشوي + أرز بسمتي بالخلطة', 'طواجن لحم بلدي بالخضار', 'كفتة مشوية وسلطات طازجة']
              },
              {
                title: 'إفطار العاملين والموظفين الصباحي',
                badge: 'الشركات والمؤسسات',
                desc: 'وجبات إفطار متكاملة تبدأ من الساعة 06:00 صباحاً مع العيش البلدي الطازج والمشروبات.',
                items: ['فول مدمس بالسمن البلدي', 'أجبان طبيعية معقمة وبيض', 'عسل نحل ومربى وزبادي']
              },
              {
                title: 'الوجبات الجافة وطوارئ المشروعات النائية',
                badge: 'شركات المقاولات والطاقة',
                desc: 'وجبات جافة طويلة الصلاحية معقمة مفرغة من الهواء Flash Vacuum ملائمة للصحراء ومواقع الحفر.',
                items: ['معلبات تونة ولحوم فاخرة', 'أجبان مغلفة ومقرمشات صحية', 'تمور وفاكهة مجففة وعصائر']
              },
              {
                title: 'بوفيهات كبار الزوار والاستشاريين (VIP)',
                badge: 'المديرين والمؤتمرات',
                desc: 'أوبن بوفيه متكامل بمستوى الفنادق 5 نجوم مع أطقم خدمة وأواني تسخين الشافينج ديش الفاخرة.',
                items: ['رستو لحم بارد ومشاوي مشكلة', 'سالمون مشوي وصواني باستا', 'حلويات شرقية وغربية فاخرة']
              },
              {
                title: 'خدمات الكنتين والماركت السريع',
                badge: 'المصانع والمستشفيات',
                desc: 'تشغيل كنتين الموقع وتوفير المشروبات الساخنة والباردة والسناكس والمخبوزات على مدار 24 ساعة.',
                items: ['ساندوتشات جاهزة Fresh Wraps', 'مشروبات وعصائر طبيعية', 'سناكس صحية ومقرمشات']
              }
            ].map((menu, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-orange-500/50 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                    {menu.badge}
                  </span>
                  <h3 className="text-sm font-extrabold text-white mt-2">
                    {menu.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    {menu.desc}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-1">
                    {menu.items.map((it, i) => (
                      <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveSection('test_sample')}
                    className="text-orange-400 font-bold hover:underline"
                  >
                    طلب عينة تذوق لهذا المنيو ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: Request TEST Sample */}
      {activeSection === 'test_sample' && (
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-orange-600/30">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                اطلب عينة TEST مجانية لمنشأتك
              </h2>
              <p className="text-xs text-slate-400">
                تسليم عينات تذوق حقيقية من مطابخنا المركزية لتجربة المذاق والجودة والتغليف قبل التعاقد
              </p>
            </div>
          </div>

          {sampleSuccessId && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>تم إرسال طلب العينة بنجاح برقم: <span className="font-mono underline">{sampleSuccessId}</span></span>
              </div>
              <p className="text-xs leading-relaxed">
                تم توجيه طلبك لمدير العمليات م/ مصطفى شعبان للمراجعة وتحديد موعد التذوق. يمكنك متابعة حالة الطلب في أي وقت باستخدام هذا الرقم.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmitSample} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم المنشأة أو الشركة *</label>
                <input
                  type="text"
                  required
                  value={sampleCompany}
                  onChange={(e) => setSampleCompany(e.target.value)}
                  placeholder="شركة ..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم الشخص المسؤول *</label>
                <input
                  type="text"
                  required
                  value={sampleContact}
                  onChange={(e) => setSampleContact(e.target.value)}
                  placeholder="م/ أو أ/ ..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">رقم الهاتف للتواصل *</label>
                <input
                  type="tel"
                  required
                  value={samplePhone}
                  onChange={(e) => setSamplePhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">نوع المنيو المطلوب تجريبه</label>
                <select
                  value={sampleMealType}
                  onChange={(e) => setSampleMealType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                >
                  <option value="وجبات مطبوخة ساخنة (بروتين عالي)">وجبات مطبوخة ساخنة (بروتين عالي)</option>
                  <option value="وجبات مستشفيات علاجية">وجبات مستشفيات علاجية</option>
                  <option value="وجبات إفطار صباحي">وجبات إفطار صباحي</option>
                  <option value="أصناف بوفيه ومؤتمرات">أصناف بوفيه ومؤتمرات</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">ملاحظات خاصة بالعينة أو الأصناف المفضلة</label>
              <textarea
                rows={3}
                value={sampleNotes}
                onChange={(e) => setSampleNotes(e.target.value)}
                placeholder="أصناف محددة ترغب في تذوقها، عدد أفراد لجنة التقييم..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب العينة المجانية</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* SECTION: Propose Custom Menu */}
      {activeSection === 'propose_menu' && (
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-600/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                اقترح منيو أو وجبة مخصصة لمنشأتك
              </h2>
              <p className="text-xs text-slate-400">
                فريق الشيفات والتسعير سيقوم بدراسة مكوناتك وحساب تكاليفها وتقديم عرض سعر معتمد
              </p>
            </div>
          </div>

          {customMenuSuccessId && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>تم استلام مقترح المنيو بنجاح برقم: <span className="font-mono underline">{customMenuSuccessId}</span></span>
              </div>
              <p className="text-xs leading-relaxed">
                يقوم الشيف العمومي الآن بتقدير تكلفة الصنف وإعداد جدول السعرات تمهيداً لاعتماد السعر العام من الإدارة.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmitCustomMenu} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم الصنف أو الطبق المقترح *</label>
                <input
                  type="text"
                  required
                  value={customDishName}
                  onChange={(e) => setCustomDishName(e.target.value)}
                  placeholder="مثال: طاجن لحم بالعسل والبصل..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">اسم شركتك أو جهتك *</label>
                <input
                  type="text"
                  required
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  placeholder="اسم الشركة أو المؤسسة"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">المكونات المقترحة</label>
                <input
                  type="text"
                  value={customIngredients}
                  onChange={(e) => setCustomIngredients(e.target.value)}
                  placeholder="مثال: لحم بقري صافي، بصل مكرمل، بطاطس..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">رقم الهاتف للتواصل</label>
                <input
                  type="tel"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs shadow-lg shadow-amber-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>إرسال المقترح لإعداد عرض السعر</span>
              </button>
            </div>
          </form>
        </section>
      )}

      {/* SECTION: Track Orders */}
      {activeSection === 'track_order' && (
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/10 text-orange-400 mx-auto flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-white">
              متابعة عروض الأسعار وطلبات عينات TEST
            </h2>
            <p className="text-xs text-slate-400">
              أدخل كود الطلب (مثل TEST-2026-101 أو PROP-2026-501 أو QUOT-2026-904) لمعرفة الحالة لحظياً
            </p>
          </div>

          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              required
              value={trackQuery}
              onChange={(e) => setTrackQuery(e.target.value)}
              placeholder="أدخل كود الطلب هنا..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono font-bold outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 transition-all cursor-pointer"
            >
              استعلام
            </button>
          </form>

          {trackResult && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-semibold">
              {trackResult}
            </div>
          )}
        </section>
      )}

      {/* SECTION: Events */}
      {activeSection === 'events' && (
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-950/60 px-3 py-1 rounded-full border border-orange-500/30">
              الفعاليات الكبرى
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              تنظيم وتجهيز بوفيهات الحفلات والمؤتمرات والأفراح
            </h2>
            <p className="text-xs text-slate-400">
              طواقم ضيافة متكاملة، أواني سيلفر، تشكيلات طعام فاخرة، وتجهيزات احترافية للمناسبات حتى 5,000 فرد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white">المؤتمرات وندوات الشركات</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                كوفي بريك فاخر (قهوة إسبريسو، مخبوزات، كرواسون فرنسي، كانابيهات، ميني تارت) وغداء أوبن بوفيه متكامل للمشاركين.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
                <PartyPopper className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white">حفلات الأفراح والمناسبات الخاصة</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                بوفيه أفراح رويال يشمل المشاوي المشكلة، الرستو، أطباق السي فود، بوفيه الحلو المفتوح، وتورتة العروسين متعددة الأدوار.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black text-white">إفطار وسحور رمضان للشركات</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                خيم رمضانية متكاملة مع طواجن الحمام والموزات والرقاق باللحمة المفرومة، ومشروبات التمر هندي والخروب الطازجة.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: Seasonal Campaigns & Coupons (Reference Style Floating Coupons) */}
      {activeSection === 'seasonal' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                عروض المواسم ومزايا العملاء المتعاقدين
              </h2>
              <p className="text-xs text-slate-400">
                كراتين رمضان، لحوم الأضاحي، كحك العيد، وتمور الواحات بعروض معتمدة لعملاء الشركة
              </p>
            </div>
          </div>

          {/* Serrated Edge Coupons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERRATED_COUPONS.map((cp) => (
              <div
                key={cp.id}
                className="relative bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-2xl border-2 border-dashed border-orange-500/40 shadow-xl overflow-hidden group hover:border-orange-500 transition-all flex flex-col justify-between"
              >
                {/* Circular Notch Cutouts */}
                <div className="absolute -left-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-slate-950 border-r-2 border-dashed border-orange-500/40" />
                <div className="absolute -right-3 top-1/2 -mt-3 w-6 h-6 rounded-full bg-slate-950 border-l-2 border-dashed border-orange-500/40" />

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-orange-600/20 text-orange-400">
                      كوبون ترويجي
                    </span>
                    <span className="text-xs font-black text-amber-400">
                      {cp.discountText}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-white mt-2">
                    {cp.titleAr}
                  </h4>

                  <p className="text-[11px] text-slate-400 mt-1">
                    {cp.siteRestriction}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-orange-400 bg-orange-950/60 px-2 py-1 rounded border border-orange-500/30">
                    {cp.code}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    سارٍ حتى {cp.validUntil}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Seasonal Offers Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {SEASONAL_OFFERS_DATA.map((offer) => (
              <div
                key={offer.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                      {offer.badge}
                    </span>
                    <span className="text-xs font-black text-emerald-400">
                      {offer.discount}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white mt-2">
                    {offer.nameAr}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    {offer.descriptionAr}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-400">{offer.price}</span>
                  <button
                    onClick={() => setActiveSection('charity')}
                    className="text-orange-400 font-bold hover:underline"
                  >
                    حجز للعقد السنوي ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: Support & Contact */}
      {activeSection === 'support' && (
        <section className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-lg max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-600/10 text-orange-400 mx-auto flex items-center justify-center font-bold">
              <Headphones className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-black text-white">
              خدمة العملاء والدعم التشغيلي المباشر
            </h2>
            <p className="text-xs text-slate-400">
              فريق العمليات متواجد على مدار 24 ساعة لاستقبال طلباتكم واستفسارات التوريد
            </p>
          </div>

          {supportSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs text-center font-bold">
              تم إرسال رسالتك لفريق العمليات بنجاح، وسيتواصل معك أحد مسؤولينا فوراً.
            </div>
          )}

          <form onSubmit={handleSubmitSupport} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">اسمك أو اسم المؤسسة *</label>
              <input
                type="text"
                required
                value={supportName}
                onChange={(e) => setSupportName(e.target.value)}
                placeholder="الاسم الكريم"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">رقم الهاتف *</label>
              <input
                type="tel"
                required
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">موضوع الرسالة</label>
              <input
                type="text"
                value={supportSubject}
                onChange={(e) => setSupportSubject(e.target.value)}
                placeholder="استفسار توريد، طلب عينة، شكوى..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">الرسالة أو التفاصيل *</label>
              <textarea
                rows={3}
                required
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="اكتب استفسارك هنا..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-orange-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-600/30 transition-all cursor-pointer"
            >
              إرسال الرسالة للدعم الفني
            </button>
          </form>
        </section>
      )}

    </div>
  );
};
