import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Building2,
  Eye,
  EyeOff,
  ClipboardCheck,
  Layers,
  Activity,
  Lock,
  ArrowUpRight,
  BarChart3,
  FileCheck2,
  Scale,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import {
  CountryCode,
  LanguageCode,
  PHASE1_AUDIT_REPORT,
  PHASE1_I18N,
  PHASE1_ROLES,
  RoleScope,
  SUPPORTED_COUNTRIES,
} from '../data/phase1Data';
import { OfficialCountryFlag } from './OfficialCountryFlags';
import { Phase1RfqSubmission } from './Phase1ServicesHub';

export interface Phase1ActivityItem {
  id: string;
  actionAr: string;
  actionEn: string;
  actorRole: RoleScope;
  timestamp: string;
}

export type UnifiedSubmoduleKey =
  | 'departments'
  | 'haccp'
  | 'raw_materials_forecast'
  | 'habe_german'
  | 'client_portal'
  | 'legal_paperwork';

interface Phase1AuthAdminViewProps {
  lang: LanguageCode;
  country: CountryCode;
  onSelectCountry: (code: CountryCode) => void;
  role: RoleScope;
  onChangeRole: (role: RoleScope) => void;
  rfqSubmissions: Phase1RfqSubmission[];
  onUpdateRfqStatus: (id: string, status: Phase1RfqSubmission['status']) => void;
  activityLog: Phase1ActivityItem[];
  onLogAccountRegistration: (type: 'individual' | 'corporate', label: string) => void;
  onOpenSubmodule: (key: UnifiedSubmoduleKey) => void;
  onBackHome: () => void;
}

export const Phase1AuthAdminView: React.FC<Phase1AuthAdminViewProps> = ({
  lang,
  country,
  onSelectCountry,
  role,
  onChangeRole,
  rfqSubmissions,
  onUpdateRfqStatus,
  activityLog,
  onLogAccountRegistration,
  onOpenSubmodule,
  onBackHome,
}) => {
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const selectedCountryObj =
    SUPPORTED_COUNTRIES.find((c) => c.code === country) || SUPPORTED_COUNTRIES[0];
  const currentRoleObj =
    PHASE1_ROLES.find((r) => r.id === role) || PHASE1_ROLES[0];

  const [accountTab, setAccountTab] = useState<'individual' | 'corporate'>('individual');
  const [showPass, setShowPass] = useState(false);

  const [indName, setIndName] = useState('');
  const [indPhone, setIndPhone] = useState('');
  const [indPass, setIndPass] = useState('');
  const [indMsg, setIndMsg] = useState<string | null>(null);

  const [corpName, setCorpName] = useState('');
  const [corpContact, setCorpContact] = useState('');
  const [corpTitle, setCorpTitle] = useState('');
  const [corpPhone, setCorpPhone] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [corpSector, setCorpSector] = useState('مصانع وخطوط إنتاج');
  const [corpMsg, setCorpMsg] = useState<string | null>(null);

  const handleIndividualRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!indPhone.trim() || !indPass.trim()) return;
    onChangeRole('individual');
    onLogAccountRegistration(
      'individual',
      `${indName || 'مستخدم أفراد'} (${selectedCountryObj.dialCode} ${indPhone})`
    );
    setIndMsg(
      isRtl
        ? 'تم تسجيل الدخول وتفعيل حساب الأفراد. ملاحظة: التحقق عبر SMS OTP الفعلي بانتظار ربط مزود الرسائل في المرحلة الثانية.'
        : 'Individual session activated locally. Live SMS OTP awaits external provider setup in Phase 2.'
    );
  };

  const handleCorporateRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpName.trim() || !corpContact.trim() || !corpPhone.trim()) return;
    onLogAccountRegistration('corporate', `${corpName} — ${corpContact}`);
    setCorpMsg(
      isRtl
        ? 'تم تسجيل طلب فتح حساب المنشأة بحالة "بانتظار اعتماد الإدارة". لا يتم منح تفعيل تعاقدي تلقائي قبل المراجعة.'
        : 'Corporate account recorded with status "Awaiting Admin Approval".'
    );
    setCorpName('');
    setCorpContact('');
    setCorpTitle('');
    setCorpPhone('');
    setCorpEmail('');
  };

  const unifiedSystems: {
    key: UnifiedSubmoduleKey;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'raw_materials_forecast',
      titleAr: 'توقعات استهلاك الخامات (Recharts)',
      titleEn: 'Raw Materials Monthly Forecasting',
      descAr: 'تحليل التعاقدات الحالية برسوم بيانية تفاعلية لقرارات الشراء',
      descEn: 'Interactive Recharts procurement & raw material consumption forecast',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      key: 'departments',
      titleAr: 'الإدارات التخصصية الـ 6 للشركة',
      titleEn: '6 Specialized Company Departments',
      descAr: 'التغذية، الجودة، المعامل، الزراعة، التوريد والذكاء التشغيلي',
      descEn: 'Nutrition, Quality, Labs, Agri, Supply & Ops Intelligence',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      key: 'haccp',
      titleAr: 'منظومة الجودة وسلامة الغذاء HACCP',
      titleEn: 'HACCP & Food Safety Hub',
      descAr: 'فحوصات المطابخ ودرجات الحرارة والتتبع الغذائي',
      descEn: 'Kitchen inspections, thermal audits & safety compliance',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      key: 'habe_german',
      titleAr: 'بوابة كافيتريا Ha-Be (الأسمنت الألماني)',
      titleEn: 'Ha-Be Employee Market Portal',
      descAr: 'نظام موظفي المصنع لطلبات الكافيتريا والوجبات اليومية',
      descEn: 'Factory employee F&B ordering market module',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      key: 'client_portal',
      titleAr: 'بوابات المنشآت والعملاء المتعاقدين',
      titleEn: 'Contracted Client Portals',
      descAr: 'متابعة التعاقدات القائمة ومؤشرات التزام المواقع',
      descEn: 'Existing corporate sites & service compliance view',
      icon: <FileCheck2 className="w-5 h-5" />,
    },
    {
      key: 'legal_paperwork',
      titleAr: 'أرشيف الأوراق الرسمية والتعريفية للشركة',
      titleEn: 'Official Company Dossier & Certificates',
      descAr: 'السجل التجاري، البطاقة الضريبية، التصدير وشعار التعبئة',
      descEn: 'Commercial registry, tax card, exporter ID & packaging badge',
      icon: <Scale className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs cursor-pointer"
        >
          <BackIcon className="w-4 h-4 text-[#FF6B00]" />
          <span>{t.nav.home}</span>
        </button>
      </div>

      {/* Unified Internal Systems Hub (No Legacy Interface Jump!) */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <span className="text-[11px] font-extrabold text-[#FF6B00]">
            {isRtl ? 'منظومة موحدة داخل التطبيق' : 'Unified Platform Subsystems'}
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {isRtl
              ? 'الوحدات التشغيلية والتقارير المدمجة'
              : 'Integrated Operational Systems'}
          </h2>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
            {isRtl
              ? 'جميع الأنظمة تفتح داخل نفس واجهة التطبيق الموحدة مع زر رجوع مباشر ودون الانتقال لنسخة قديمة.'
              : 'All systems open directly inside the unified app shell with consistent navigation and back controls.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {unifiedSystems.map((sys) => (
            <button
              key={sys.key}
              type="button"
              onClick={() => onOpenSubmodule(sys.key)}
              className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-start flex items-start gap-3 transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20">
                {sys.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-[#FF6B00]">
                    {isRtl ? sys.titleAr : sys.titleEn}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6B00] shrink-0" />
                </div>
                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isRtl ? sys.descAr : sys.descEn}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* RBAC Role Switcher */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t.roleSwitcherLabel}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900 text-xs font-extrabold text-[#FF6B00]">
            {isRtl ? currentRoleObj.nameAr : currentRoleObj.nameEn}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {PHASE1_ROLES.map((r) => {
            const active = r.id === role;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onChangeRole(r.id)}
                className={`p-3 rounded-2xl border text-start transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-md shadow-orange-500/25'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-[#FF6B00]'
                }`}
              >
                <div className="text-xs font-black">
                  {isRtl ? r.nameAr : r.nameEn}
                </div>
                <ul
                  className={`mt-2 space-y-1 text-[10px] font-semibold ${
                    active ? 'text-orange-100' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {(isRtl ? r.permissionsAr : r.permissionsEn).map((p, idx) => (
                    <li key={idx}>• {p}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </section>

      {/* Separate Account Registration / Login Tracks: Individual vs Corporate */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isRtl
              ? 'مسارات تسجيل ودخول العملاء والشركات'
              : 'Individual & Corporate Account Sign-In / Registration'}
          </h3>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setAccountTab('individual')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-colors ${
                accountTab === 'individual'
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{isRtl ? 'حساب الأفراد' : 'Individual'}</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountTab('corporate')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-colors ${
                accountTab === 'corporate'
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isRtl ? 'حساب الشركات والمصانع' : 'Corporate'}</span>
            </button>
          </div>
        </div>

        {accountTab === 'individual' ? (
          <form onSubmit={handleIndividualRegister} className="space-y-4">
            {indMsg && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-200">
                {indMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={indName}
                  onChange={(e) => setIndName(e.target.value)}
                  placeholder={isRtl ? 'الاسم ثلاثي' : 'Your full name'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'الدولة ورقم الهاتف *' : 'Country & Mobile *'}
                </label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-[#FF6B00] overflow-hidden">
                  <select
                    value={country}
                    onChange={(e) => onSelectCountry(e.target.value as CountryCode)}
                    className="px-2 py-2.5 bg-slate-100 dark:bg-slate-700 border-e border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-white focus:outline-none"
                  >
                    {SUPPORTED_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.dialCode} ({c.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={indPhone}
                    onChange={(e) => setIndPhone(e.target.value)}
                    placeholder="10XXXXXXXX"
                    className="flex-1 px-3 py-2.5 text-xs text-slate-900 dark:text-white bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'كلمة المرور *' : 'Password *'}
                </label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-[#FF6B00] px-3">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={indPass}
                    onChange={(e) => setIndPass(e.target.value)}
                    placeholder="••••••••"
                    className="flex-1 py-2.5 text-xs text-slate-900 dark:text-white bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="text-slate-500 hover:text-[#FF6B00] cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <OfficialCountryFlag country={selectedCountryObj.code} className="w-5 h-3.5" />
                <span>
                  {isRtl
                    ? 'التحقق الفعلي بـ SMS OTP بانتظار ربط مزود الرسائل في المرحلة الثانية.'
                    : 'Live SMS OTP requires external provider setup in Phase 2.'}
                </span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/25 cursor-pointer"
              >
                {isRtl ? 'تسجيل / دخول كحساب أفراد' : 'Continue as Individual'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleCorporateRegister} className="space-y-4">
            {corpMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                {corpMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                required
                value={corpName}
                onChange={(e) => setCorpName(e.target.value)}
                placeholder={isRtl ? 'اسم الشركة أو المصنع *' : 'Company / Factory Name *'}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
              />
              <input
                type="text"
                required
                value={corpContact}
                onChange={(e) => setCorpContact(e.target.value)}
                placeholder={isRtl ? 'اسم المسؤول *' : 'Authorized Contact *'}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
              />
              <input
                type="text"
                value={corpTitle}
                onChange={(e) => setCorpTitle(e.target.value)}
                placeholder={isRtl ? 'المسمى الوظيفي' : 'Job Title'}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
              />
              <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                <span
                  className="px-3 py-2.5 bg-slate-100 dark:bg-slate-700 border-e border-slate-200 dark:border-slate-600 text-xs font-mono font-bold text-slate-800 dark:text-white"
                  dir="ltr"
                >
                  {selectedCountryObj.dialCode}
                </span>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  value={corpPhone}
                  onChange={(e) => setCorpPhone(e.target.value)}
                  placeholder="Phone *"
                  className="flex-1 px-3 py-2.5 text-xs text-slate-900 dark:text-white bg-transparent focus:outline-none"
                />
              </div>
              <input
                type="email"
                dir="ltr"
                value={corpEmail}
                onChange={(e) => setCorpEmail(e.target.value)}
                placeholder="corporate@company.com"
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
              />
              <select
                value={corpSector}
                onChange={(e) => setCorpSector(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:border-[#FF6B00] focus:outline-none"
              >
                <option value="مصانع وخطوط إنتاج">{isRtl ? 'مصانع وخطوط إنتاج' : 'Factories & Production'}</option>
                <option value="شركات إدارية وبنوك">{isRtl ? 'شركات إدارية وبنوك' : 'Corporate Offices'}</option>
                <option value="مستشفيات ومراكز طبية">{isRtl ? 'مستشفيات ومراكز طبية' : 'Hospitals'}</option>
                <option value="مدارس وجامعات">{isRtl ? 'مدارس وجامعات' : 'Schools & Universities'}</option>
              </select>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/25 cursor-pointer"
              >
                {isRtl ? 'إرسال طلب فتح حساب شركات (بانتظار الاعتماد)' : 'Submit Corporate Request'}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Admin Quotation Requests Review Queue */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isRtl
              ? 'مراجعة طلبات عروض الأسعار وانضمام المطابخ'
              : 'Quotation & Central Kitchen Applications Queue'}
          </h3>
          <span className="text-xs font-black text-[#FF6B00] tabular-nums">
            {rfqSubmissions.length} {isRtl ? 'طلب' : 'requests'}
          </span>
        </div>

        {!currentRoleObj.canViewAdminPanel ? (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <Lock className="w-5 h-5 text-[#FF6B00] shrink-0" />
            <span>
              {isRtl
                ? 'اعتماد وتغيير حالات الطلبات مقصور على دوري (إدارة المطابخ والطلبات) أو (مدير النظام).'
                : 'Changing approval statuses requires Kitchen Admin or System Admin role.'}
            </span>
          </div>
        ) : rfqSubmissions.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400">
            {isRtl
              ? 'لا توجد طلبات مسجلة حالياً — أرسل طلباً من "طلب عرض سعر" لاختبار المراجعة.'
              : 'No requests logged yet — submit one from Request Quotation to test.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  <th className="py-2.5 px-3 text-start">{isRtl ? 'الكود' : 'ID'}</th>
                  <th className="py-2.5 px-3 text-start">{isRtl ? 'الجهة / المطبخ' : 'Entity'}</th>
                  <th className="py-2.5 px-3 text-start">{isRtl ? 'التواصل' : 'Contact'}</th>
                  <th className="py-2.5 px-3 text-start">{isRtl ? 'النطاق' : 'Service'}</th>
                  <th className="py-2.5 px-3 text-start">{isRtl ? 'الحالة' : 'Status'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rfqSubmissions.map((rfq) => (
                  <tr key={rfq.id}>
                    <td className="py-2.5 px-3 font-mono font-black text-[#FF6B00] whitespace-nowrap">
                      {rfq.id}
                    </td>
                    <td className="py-2.5 px-3 font-extrabold text-slate-900 dark:text-white">
                      {rfq.organizationOrKitchenName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                      {rfq.contactName} · <span dir="ltr">{rfq.dialCode} {rfq.phone}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                      {rfq.serviceCategory}
                    </td>
                    <td className="py-2.5 px-3">
                      <select
                        value={rfq.status}
                        onChange={(e) =>
                          onUpdateRfqStatus(
                            rfq.id,
                            e.target.value as Phase1RfqSubmission['status']
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-xs font-bold text-[#FF6B00] focus:outline-none"
                      >
                        <option value="جديد">جديد</option>
                        <option value="قيد المراجعة">قيد المراجعة</option>
                        <option value="بانتظار اعتماد السعر">بانتظار اعتماد السعر</option>
                        <option value="تم الاعتماد">تم الاعتماد</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Honest 7-Level Audit Report */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-[#FF6B00]" />
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isRtl
              ? 'تقرير جاهزية المرحلة الأولى (سلم التحقق من 7 مستويات)'
              : 'Phase 1 Honest Readiness Audit'}
          </h3>
        </div>

        <div className="space-y-2.5">
          {PHASE1_AUDIT_REPORT.map((item) => {
            const isTested = item.status.startsWith('6.');
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-slate-900 dark:text-white">
                    {isRtl ? item.featureAr : item.featureEn}
                  </div>
                  <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                    {isRtl ? item.notesAr : item.notesEn}
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap self-start sm:self-auto ${
                    isTested
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Activity Log */}
      {activityLog.length > 0 && (
        <section className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FF6B00]" />
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              {isRtl ? 'سجل نشاط الجلسة (Activity Log)' : 'Session Activity Log'}
            </h3>
          </div>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {activityLog.slice(0, 12).map((act) => (
              <div
                key={act.id}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs"
              >
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {isRtl ? act.actionAr : act.actionEn}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                  {act.actorRole} · {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
