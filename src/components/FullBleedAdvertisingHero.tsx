import React, { useState } from 'react';
import { 
  Building2, 
  UtensilsCrossed, 
  ChefHat, 
  Flame, 
  FileText, 
  Tag, 
  Percent, 
  Search, 
  PhoneCall, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  HelpCircle, 
  Printer, 
  FolderPlus, 
  ChevronRight, 
  Check, 
  Star, 
  ArrowUpRight,
  Headphones,
  FileQuestion,
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { openGooglePicker, PickedFile } from '../lib/googlePicker';
import heroMobileImg from '../assets/images/catering_mobile_hero_1794418651611.jpg';
import heroDesktopImg from '../assets/images/catering_hero_commercial_1794418634522.jpg';

interface FullBleedAdvertisingHeroProps {
  isRtl: boolean;
  onOpenServiceTab: (sectionId: string) => void;
  onOpenPrintQuotation: (company: string) => void;
  onOpenPrintMenuCatalog?: () => void;
  onShowToast: (msg: string) => void;
}

export const FullBleedAdvertisingHero: React.FC<FullBleedAdvertisingHeroProps> = ({
  isRtl,
  onOpenServiceTab,
  onOpenPrintQuotation,
  onOpenPrintMenuCatalog,
  onShowToast,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<'EG' | 'AE' | 'SA'>('EG');
  const [pickedDriveDoc, setPickedDriveDoc] = useState<PickedFile | null>(null);
  const [isOpeningPicker, setIsOpeningPicker] = useState<boolean>(false);

  // The 12 Specific Advertisement Services Matching the Reference Style
  const advertisingServices = [
    { id: 'factory_catering', label: 'توريد وجبات المصانع', tab: 'menus', icon: Flame, badge: 'وجبات ساخنة' },
    { id: 'corporate_catering', label: 'توريد وجبات الشركات', tab: 'menus', icon: Building2, badge: 'بوفيهات يومية' },
    { id: 'subsistence_services', label: 'خدمات الإعاشة الغذائية', tab: 'menus', icon: UtensilsCrossed, badge: 'إعاشة متكاملة' },
    { id: 'culinary_menus', label: 'المينيوهات وقوائم الطعام', tab: 'menus', icon: ChefHat, badge: '84 وصفة' },
    { id: 'meal_offers', label: 'عروض الوجبات والخصومات', tab: 'seasonal', icon: Percent, badge: 'خصم معتمد' },
    { id: 'request_quote', label: 'طلب عرض سعر فوري', tab: 'request_quote', icon: FileText, badge: 'عرض رسمي PDF' },
    { id: 'test_sample', label: 'طلب عينة TEST للتذوق', tab: 'test_sample', icon: Star, badge: 'مجاني للشركات' },
    { id: 'propose_menu', label: 'اقتراح منيو خاص بك', tab: 'propose_menu', icon: Sparkles, badge: 'تسعير مخصص' },
    { id: 'track_orders', label: 'متابعة الطلبات والعروض', tab: 'track_order', icon: Search, badge: 'تتبع كود الطلب' },
    { id: 'complaints_suggestions', label: 'الشكاوى والمقترحات', tab: 'support', icon: FileQuestion, badge: 'مباشر للإدارة' },
    { id: 'tech_support', label: 'الدعم الفني 24/7', tab: 'support', icon: Headphones, badge: 'خط ساخن' },
    { id: 'hospitality_events', label: 'الضيافة والمناسبات', tab: 'events', icon: Award, badge: 'مؤتمرات وفعاليات' },
  ];

  const handleBranchClick = (branchCode: 'EG' | 'AE' | 'SA') => {
    if (branchCode === 'EG') {
      setSelectedBranch('EG');
      onShowToast('أنت الآن تتصفح فرع جمهورية مصر العربية — كاترينج مصر المعتمد.');
    } else if (branchCode === 'AE') {
      setSelectedBranch('AE');
      onShowToast('فرع دبي والإمارات: قيد التجهيز والتوسع الإقليمي وسيتم ربطه ببياناته المستقلة فور التدشين.');
    } else {
      setSelectedBranch('SA');
      onShowToast('فرع المملكة العربية السعودية: قيد التجهيز والتوسع وسيرتبط ببياناته المستقلة قريباً.');
    }
  };

  const handleLaunchPicker = async () => {
    setIsOpeningPicker(true);
    try {
      await openGooglePicker(
        (file) => {
          setPickedDriveDoc(file);
          onShowToast(`تم اختيار الملف بنجاح من Google Drive: ${file.name}`);
        },
        (err) => {
          onShowToast('تعذر فتح Google Picker أو تم إلغاء العملية.');
        }
      );
    } catch {
      onShowToast('يرجى تسجيل الدخول بحساب Google لتفعيل أداة Picker.');
    } finally {
      setIsOpeningPicker(false);
    }
  };

  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-500/50 bg-slate-950 text-white select-none my-2">
      
      {/* 1. Full-Bleed Real Commercial Photography Background (Desktop & Mobile) */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full">
          <source 
            media="(max-width: 768px)" 
            srcSet={heroMobileImg} 
          />
          <img 
            src={heroDesktopImg} 
            alt="CATERING EGYPT Commercial Advertisement" 
            className="w-full h-full object-cover object-center lg:object-right filter brightness-90 contrast-105"
          />
        </picture>

        {/* Cinematic Vignette, Fiery Orange & Gold Overlays to match the reference poster */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-orange-950/50 to-transparent opacity-90" />
        <div className="absolute top-0 right-0 w-full h-44 bg-gradient-to-b from-slate-950/90 to-transparent" />
      </div>

      {/* 2. Interactive Foreground Elements Structured in Master Commercial Composition */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-12 py-8 sm:py-12 flex flex-col justify-between min-h-[780px] lg:min-h-[860px]">
        
        {/* Top Header Row: Brand Identity & Country/Branch Selector */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-amber-400/30 pb-5">
          
          {/* Brand Header */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 p-0.5 shadow-lg shadow-orange-600/40 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-amber-400 text-lg">
                CE
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl text-white tracking-tight">
                  CATERING <span className="text-amber-400">EGYPT</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-600/30 text-orange-300 border border-orange-500/40">
                  إحدى شركات الوطنية اللوجستية
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                An ELWATANYA LOGISTICS Company — Food Service Solutions
              </p>
            </div>
          </div>

          {/* Golden Circle Branch Flags Selector (Section 3) */}
          <div className="flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-amber-400/40 shadow-xl self-end sm:self-auto">
            <span className="text-[11px] font-extrabold text-amber-300 hidden md:inline">
              اختر الفرع:
            </span>
            
            {/* Egypt Branch (Active) */}
            <button
              onClick={() => handleBranchClick('EG')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedBranch === 'EG'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md ring-2 ring-amber-300 scale-105'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="فرع جمهورية مصر العربية (النشط)"
            >
              <div className="w-5 h-5 rounded-full border border-amber-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm text-xs">
                🇪🇬
              </div>
              <span>مصر (نشط)</span>
            </button>

            {/* UAE Branch */}
            <button
              onClick={() => handleBranchClick('AE')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBranch === 'AE'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                  : 'text-slate-400 hover:text-amber-300 opacity-70 hover:opacity-100'
              }`}
              title="فرع دبي والإمارات (قريباً)"
            >
              <div className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center overflow-hidden shrink-0 text-xs">
                🇦🇪
              </div>
              <span className="hidden sm:inline">الإمارات</span>
            </button>

            {/* Saudi Arabia Branch */}
            <button
              onClick={() => handleBranchClick('SA')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedBranch === 'SA'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                  : 'text-slate-400 hover:text-amber-300 opacity-70 hover:opacity-100'
              }`}
              title="فرع المملكة العربية السعودية (قريباً)"
            >
              <div className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center overflow-hidden shrink-0 text-xs">
                🇸🇦
              </div>
              <span className="hidden sm:inline">السعودية</span>
            </button>
          </div>

        </div>

        {/* Middle Main Layout: Advertising Headlines, Coupon, Interactive Smartphone Mockup, and Golden Side Menu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
          
          {/* Left/Center Commercial Copy & Prominent Coupon (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Egypt Restriction Tag with Shining Golden Flag Circle */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-950 via-slate-900 to-orange-950 px-4 py-2 rounded-full border-2 border-amber-400/60 shadow-lg shadow-orange-500/20">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 p-0.5 shadow-md flex items-center justify-center">
                <span className="text-sm">🇪🇬</span>
              </div>
              <span className="text-xs font-black text-amber-300 tracking-wide uppercase">
                الاستخدام في مصر فقط — EGYPT BRANCH
              </span>
            </div>

            {/* Big Headline in Reference Poster Typography */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-black text-orange-400 uppercase tracking-widest block drop-shadow-sm">
                المنظومة الوطنية الرائدة لتوريد وجبات المصانع والشركات
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-md">
                استمتع بأفضل عروض الوجبات والإعاشة
              </h1>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-200">
                للمصانع والشركات — من كل أقسام خدماتنا
              </h2>
            </div>

            {/* Prominent Golden Coupon Display (Waffarha Style with Serrated Cutout) */}
            <div className="relative inline-block max-w-lg w-full">
              <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 p-1 rounded-3xl shadow-2xl shadow-orange-600/50 transform hover:scale-[1.01] transition-transform">
                <div className="bg-slate-950/95 backdrop-blur-md rounded-[22px] p-5 sm:p-6 border border-amber-300/40 relative">
                  
                  {/* Floating Circular Badge */}
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-white">
                    كوبون ذهبي معتمد
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-slate-300">
                        كود خصم خاص لعملاء كاترينج مصر
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-2xl sm:text-3xl font-black text-amber-400 tracking-wider">
                          CE-VIP2026
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                          خصم 10% للعقد السنوي
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        * يطبق على عقود التوريد اليومية بعد الاعتماد الرسمي من إدارة العمليات.
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenPrintQuotation('عرض سعر بكود CE-VIP2026')}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-orange-500/40 flex items-center gap-1.5 transition-all self-stretch sm:self-auto justify-center cursor-pointer"
                    >
                      <span>تفعيل بالعرض</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenServiceTab('test_sample')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-orange-600/40 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <ChefHat className="w-4 h-4" />
                <span>اطلب عينة TEST مجانية لمنشأتك</span>
              </button>

              <button
                onClick={() => {
                  if (onOpenPrintMenuCatalog) {
                    onOpenPrintMenuCatalog();
                  } else {
                    onOpenPrintQuotation('كتالوج المنيوهات المعتمدة');
                  }
                }}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border-2 border-amber-400/50 hover:border-amber-400 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>طباعة المنيوهات (84 وجبة) PDF</span>
              </button>

              {/* Google Picker Integration Button */}
              <button
                onClick={handleLaunchPicker}
                disabled={isOpeningPicker}
                className="px-4 py-3.5 rounded-2xl bg-slate-950/90 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
                title="استيراد أو حفظ مستنداتك عبر Google Picker"
              >
                <FolderPlus className="w-4 h-4 text-orange-400" />
                <span>{isOpeningPicker ? 'جاري الفتح...' : 'Google Drive Picker'}</span>
              </button>
            </div>

            {/* Picked Drive File Status Banner if selected */}
            {pickedDriveDoc && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تم ربط ملف Google Drive: <strong>{pickedDriveDoc.name}</strong></span>
                </div>
                <a 
                  href={pickedDriveDoc.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 underline font-bold"
                >
                  معاينة
                </a>
              </div>
            )}

          </div>

          {/* Right Column: Golden Shining Circles + Oval White Ribbons (Exact Reference Advertising Navigation Style) (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="bg-slate-950/80 backdrop-blur-md p-4 rounded-3xl border-2 border-amber-400/40 shadow-2xl space-y-2">
              
              <div className="flex items-center justify-between px-2 pb-2 border-b border-amber-400/30">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>دليل الخدمات المباشرة — اختر قسمك</span>
                </span>
                <span className="text-[10px] bg-orange-600/30 text-orange-300 px-2 py-0.5 rounded font-bold">
                  12 خدمة معتمدة
                </span>
              </div>

              {/* The 12 Distinct Reference-Style Items:
                  - Golden circle with white icon inside
                  - Oval white ribbon badge adjacent with dark text
                  - Warm glow effect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[500px] overflow-y-auto pr-1">
                {advertisingServices.map((srv, idx) => {
                  const Icon = srv.icon;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => onOpenServiceTab(srv.tab)}
                      className="group flex items-center gap-3 p-1.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/40 hover:from-orange-950/60 hover:to-amber-950/40 border border-amber-400/20 hover:border-amber-400/80 transition-all text-start cursor-pointer shadow-sm hover:shadow-md hover:shadow-orange-500/20"
                    >
                      {/* Golden Shining Circle with Pure White Icon Inside */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-600 p-0.5 shadow-md shadow-orange-500/30 shrink-0 group-hover:scale-110 transition-transform">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                          <Icon className="w-5 h-5 text-white drop-shadow-sm" />
                        </div>
                      </div>

                      {/* White Oval Ribbon Badge with Dark Clear Text (Reference Match) */}
                      <div className="flex-1 bg-white hover:bg-amber-50 text-slate-950 px-3.5 py-1.5 rounded-full shadow-md flex items-center justify-between min-w-0 transition-colors">
                        <span className="text-xs font-black truncate">
                          {srv.label}
                        </span>
                        <span className="text-[9px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full shrink-0 hidden sm:inline">
                          {srv.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Strip: Operating Kitchens & ISO Food Safety Compliance */}
        <div className="pt-4 border-t border-amber-400/20 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 مطابخ مركزية عاملة: هنجر استيشن · مول العين بمدينة بدر · ريان اللاهون</span>
          </div>

          <div className="flex items-center gap-4 text-amber-300 font-bold text-[11px]">
            <span>✓ أسطول مبرد بنظام GPS</span>
            <span>✓ رقابة مسحات بيولوجية يومية HACCP</span>
            <span>✓ سريان الاعتماد لعام 2026</span>
          </div>
        </div>

      </div>

    </section>
  );
};
