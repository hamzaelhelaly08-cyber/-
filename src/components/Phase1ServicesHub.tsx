import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Filter,
  Receipt,
  ShieldAlert,
  Lock,
  ShoppingCart,
  AlertCircle,
  SlidersHorizontal,
  Edit3,
  FileText,
  ChefHat,
  Send,
} from 'lucide-react';
import {
  CountryCode,
  FOOD_CATEGORIES,
  LanguageCode,
  PHASE1_I18N,
  PHASE1_ROLES,
  RoleScope,
  SUPPORTED_COUNTRIES,
  THREE_CENTRAL_KITCHENS,
  TWELVE_SERVICES,
} from '../data/phase1Data';
import { Phase1CartItem } from './Phase1CartDrawer';
import { OfficialCountryFlag } from './OfficialCountryFlags';
import { Service3DIcon } from './Service3DIcon';

export interface Phase1RfqSubmission {
  id: string;
  type: 'quotation' | 'join_kitchen';
  organizationOrKitchenName: string;
  contactName: string;
  country: CountryCode;
  dialCode: string;
  phone: string;
  email: string;
  serviceCategory: string;
  targetKitchen: string;
  estimatedMealsPerDay: string;
  notes: string;
  status: 'جديد' | 'قيد المراجعة' | 'تم الاعتماد' | 'بانتظار اعتماد السعر';
  createdAt: string;
  cartSnapshot?: Phase1CartItem[];
}

interface Phase1ServicesHubProps {
  lang: LanguageCode;
  country: CountryCode;
  role: RoleScope;
  activeSection: string;
  preselectedKitchenName?: string;
  cartItems: Phase1CartItem[];
  onNavigateSection: (
    section: string,
    kitchenId?: 'hanger_station' | 'mall_al_ain' | 'al_hurriya'
  ) => void;
  onAddToCart: (item: Omit<Phase1CartItem, 'quantity'>) => void;
  onSubmitRfq: (rfq: Phase1RfqSubmission) => void;
  rfqSubmissions: Phase1RfqSubmission[];
  onOpenHaccpHub?: () => void;
}

export const Phase1ServicesHub: React.FC<Phase1ServicesHubProps> = ({
  lang,
  country,
  role,
  activeSection,
  preselectedKitchenName,
  cartItems,
  onNavigateSection,
  onAddToCart,
  onSubmitRfq,
  rfqSubmissions,
  onOpenHaccpHub,
}) => {
  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const selectedCountryObj =
    SUPPORTED_COUNTRIES.find((c) => c.code === country) || SUPPORTED_COUNTRIES[0];
  const roleConfig =
    PHASE1_ROLES.find((r) => r.id === role) || PHASE1_ROLES[0];

  // Quotation / Join Kitchen Form State + Review/Edit step before final submit
  const [formType, setFormType] = useState<'quotation' | 'join_kitchen'>(
    activeSection === 'join_kitchen' ? 'join_kitchen' : 'quotation'
  );
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceCat, setServiceCat] = useState('إعاشة شركات ومصانع');
  const [targetKitchen, setTargetKitchen] = useState(
    preselectedKitchenName || ''
  );
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isReviewingBeforeSend, setIsReviewingBeforeSend] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<Phase1RfqSubmission | null>(null);

  useEffect(() => {
    if (activeSection === 'join_kitchen') setFormType('join_kitchen');
    else if (activeSection === 'quotation') setFormType('quotation');
    setIsReviewingBeforeSend(false);
  }, [activeSection]);

  useEffect(() => {
    if (preselectedKitchenName !== undefined) {
      setTargetKitchen(preselectedKitchenName);
    }
  }, [preselectedKitchenName]);

  // Catalog Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>('all');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<'all' | 'delivery' | 'pickup'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'most_ordered' | 'nearest'>('default');

  // Invoice Tabs
  const [invoiceTab, setInvoiceTab] = useState<'my' | 'due' | 'paid' | 'history'>('my');

  const isFormView =
    activeSection === 'quotation' || activeSection === 'join_kitchen';

  const handleValidateAndPreview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!orgName.trim() || !contactName.trim() || phone.trim().length < 6) {
      setFormError(
        isRtl
          ? 'يرجى إدخال اسم الجهة / المطبخ، واسم المسؤول، ورقم هاتف صحيح قبل المتابعة.'
          : 'Please enter valid organization/kitchen name, contact person, and phone number.'
      );
      return;
    }

    setIsReviewingBeforeSend(true);
  };

  const handleConfirmSendRfq = () => {
    const prefix = formType === 'join_kitchen' ? 'KTC' : 'QT';
    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `${prefix}-2026-${uniqueNum}`;

    const submission: Phase1RfqSubmission = {
      id: orderRef,
      type: formType,
      organizationOrKitchenName: orgName.trim(),
      contactName: contactName.trim(),
      country,
      dialCode: selectedCountryObj.dialCode,
      phone: phone.trim(),
      email: email.trim(),
      serviceCategory: serviceCat,
      targetKitchen:
        targetKitchen || (isRtl ? 'تحديد تلقائي حسب النطاق' : 'Assigned by region'),
      estimatedMealsPerDay: mealsPerDay.trim(),
      notes: notes.trim(),
      status: 'جديد',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      cartSnapshot: cartItems.length > 0 ? [...cartItems] : undefined,
    };

    onSubmitRfq(submission);
    setLastSubmitted(submission);
    setIsReviewingBeforeSend(false);
    setOrgName('');
    setContactName('');
    setPhone('');
    setEmail('');
    setMealsPerDay('');
    setNotes('');
  };

  const catalogEntries = useMemo(() => {
    const entries = THREE_CENTRAL_KITCHENS.flatMap((k) =>
      k.sampleMenuItems.map((m, idx) => ({
        ...m,
        kitchenId: k.id,
        kitchenNameAr: k.nameAr,
        kitchenNameEn: k.nameEn,
        locationAr: k.locationAr,
        locationEn: k.locationEn,
        categoryTag: idx === 0 ? 'full_meals' : 'breakfast',
      }))
    );

    return entries.filter((item) => {
      if (selectedLocationFilter !== 'all' && item.kitchenId !== selectedLocationFilter)
        return false;
      if (selectedCategory !== 'all' && item.categoryTag !== selectedCategory)
        return false;
      return true;
    });
  }, [selectedCategory, selectedLocationFilter]);

  const currentServiceInfo = TWELVE_SERVICES.find(
    (s) => s.targetSection === activeSection
  );

  // 1) Quotation Request & Join Central Kitchen View
  if (isFormView) {
    return (
      <div className="max-w-3xl mx-auto space-y-5 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigateSection('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs cursor-pointer"
          >
            <BackIcon className="w-4 h-4 text-[#FF6B00]" />
            <span>{t.nav.home}</span>
          </button>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => {
                setFormType('quotation');
                setIsReviewingBeforeSend(false);
                setLastSubmitted(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                formType === 'quotation'
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {t.quoteModalTitle}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormType('join_kitchen');
                setIsReviewingBeforeSend(false);
                setLastSubmitted(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                formType === 'join_kitchen'
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {t.joinKitchenTitle}
            </button>
          </div>
        </div>

        {/* Confirmed Order Receipt */}
        {lastSubmitted && (
          <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-black text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>
                {isRtl
                  ? 'تم استلام طلبك وحفظه بنجاح!'
                  : 'Your request has been saved and confirmed!'}
              </span>
            </div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-200 leading-relaxed space-y-1">
              <p>
                {isRtl ? 'رقم المتابعة المرجعي: ' : 'Tracking Code: '}
                <span className="font-mono font-black underline">{lastSubmitted.id}</span>
              </p>
              <p>
                {isRtl
                  ? `الجهة: ${lastSubmitted.organizationOrKitchenName} · المسؤول: ${lastSubmitted.contactName} (${lastSubmitted.dialCode} ${lastSubmitted.phone})`
                  : `Entity: ${lastSubmitted.organizationOrKitchenName} · Contact: ${lastSubmitted.contactName}`}
              </p>
            </div>
          </div>
        )}

        {/* Pre-Send Review & Edit Screen */}
        {isReviewingBeforeSend ? (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-[#FF6B00] shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isRtl
                  ? 'مراجعة وتعديل بيانات الطلب قبل الإرسال النهائي'
                  : 'Review & Edit Request Before Sending'}
              </h3>
              <button
                type="button"
                onClick={() => setIsReviewingBeforeSend(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5 cursor-pointer hover:border-[#FF6B00]"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>{isRtl ? 'تعديل البيانات' : 'Edit Fields'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div className="text-slate-500 dark:text-slate-400 font-bold">
                  {isRtl ? 'الجهة / المطبخ' : 'Organization / Kitchen'}
                </div>
                <div className="font-black text-slate-900 dark:text-white mt-0.5">{orgName}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div className="text-slate-500 dark:text-slate-400 font-bold">
                  {isRtl ? 'المسؤول والهاتف' : 'Contact & Phone'}
                </div>
                <div className="font-black text-slate-900 dark:text-white mt-0.5">
                  {contactName} · <span dir="ltr">{selectedCountryObj.dialCode} {phone}</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div className="text-slate-500 dark:text-slate-400 font-bold">
                  {isRtl ? 'نطاق الخدمة' : 'Service Scope'}
                </div>
                <div className="font-black text-slate-900 dark:text-white mt-0.5">{serviceCat}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <div className="text-slate-500 dark:text-slate-400 font-bold">
                  {isRtl ? 'الكمية / المطبخ' : 'Capacity / Kitchen'}
                </div>
                <div className="font-black text-slate-900 dark:text-white mt-0.5">
                  {mealsPerDay || '—'} · {targetKitchen || (isRtl ? 'حسب النطاق' : 'Auto')}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleConfirmSendRfq}
                className="flex-1 py-3.5 px-5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isRtl ? 'تأكيد وإرسال الطلب الآن' : 'Confirm & Submit Request'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsReviewingBeforeSend(false)}
                className="py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-extrabold cursor-pointer"
              >
                {isRtl ? 'العودة للتعديل' : 'Back to Edit'}
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleValidateAndPreview}
            className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
          >
            <div className="flex items-start gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <Service3DIcon iconKey={formType === 'join_kitchen' ? 'chef' : 'file'} size="sm" />
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {formType === 'join_kitchen' ? t.joinKitchenTitle : t.quoteModalTitle}
                </h2>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                  {isRtl
                    ? 'أدخل بياناتك، راجعها أو عدّلها في الخطوة التالية، ثم أرسل واحصل على رقم متابعة فريد.'
                    : 'Fill in your details, review or edit before sending, and receive a unique tracking code.'}
                </p>
              </div>
            </div>

            {cartItems.length > 0 && formType === 'quotation' && (
              <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 text-xs text-slate-900 dark:text-orange-100 space-y-1">
                <div className="font-black text-[#FF6B00]">
                  {isRtl
                    ? `سيتم إرفاق بنود سلة الطلبات الحالية (${cartItems.length} أصناف):`
                    : `Current Cart Items Included (${cartItems.length} items):`}
                </div>
                <div className="text-[11px] font-bold">
                  {cartItems
                    .map((c) => `${isRtl ? c.nameAr : c.nameEn} (×${c.quantity})`)
                    .join(' · ')}
                </div>
              </div>
            )}

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-700 dark:text-rose-300">
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {formType === 'join_kitchen'
                    ? isRtl
                      ? 'اسم المطبخ / الشركة *'
                      : 'Kitchen / Company Name *'
                    : isRtl
                      ? 'اسم الشركة / الجهة / العميل *'
                      : 'Organization / Client Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder={isRtl ? 'مثال: مصنع النيل الهندسي' : 'e.g. Nile Engineering Co.'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'اسم المسؤول المباشر *' : 'Contact Person *'}
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder={isRtl ? 'الاسم الكامل' : 'Full name'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'رقم الهاتف *' : 'Phone Number *'}
                </label>
                <div className="flex items-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus-within:border-[#FF6B00] overflow-hidden">
                  <div className="px-3 py-2.5 bg-slate-100 dark:bg-slate-700 border-e border-slate-200 dark:border-slate-600 flex items-center gap-1.5 shrink-0">
                    <OfficialCountryFlag country={selectedCountryObj.code} className="w-5 h-3.5" />
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-white" dir="ltr">
                      {selectedCountryObj.dialCode}
                    </span>
                  </div>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10XXXXXXXX"
                    className="flex-1 px-3 py-2.5 text-xs text-slate-900 dark:text-white bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="procurement@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] focus:bg-white dark:focus:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'نطاق الخدمة المطلوب' : 'Service Type'}
                </label>
                <select
                  value={serviceCat}
                  onChange={(e) => setServiceCat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="إعاشة شركات ومصانع">{isRtl ? 'إعاشة شركات ومصانع' : 'Factory & Corporate Catering'}</option>
                  <option value="وجبات يومية">{isRtl ? 'وجبات يومية' : 'Daily Meals'}</option>
                  <option value="بوفيهات وأفراح ومناسبات">{isRtl ? 'بوفيهات وأفراح ومناسبات' : 'Banquets & Weddings'}</option>
                  <option value="بطاقات هدايا ومجالس">{isRtl ? 'بطاقات هدايا ومجالس' : 'Gift Cards & Majlis'}</option>
                  <option value="تأهيل مطبخ مركزي">{isRtl ? 'تأهيل مطبخ مركزي' : 'Central Kitchen Partnership'}</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'المطبخ المركزي المفضل' : 'Preferred Central Kitchen'}
                </label>
                <select
                  value={targetKitchen}
                  onChange={(e) => setTargetKitchen(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="">{isRtl ? 'تحديد تلقائي حسب المنطقة' : 'Auto-assign by coverage'}</option>
                  {THREE_CENTRAL_KITCHENS.map((k) => (
                    <option key={k.id} value={isRtl ? k.nameAr : k.nameEn}>
                      {isRtl ? `${k.nameAr} (${k.locationAr})` : `${k.nameEn} (${k.locationEn})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {formType === 'join_kitchen'
                    ? isRtl
                      ? 'الطاقة الإنتاجية اليومية (وجبة/يوم)'
                      : 'Daily Capacity (meals/day)'
                    : isRtl
                      ? 'عدد الوجبات المتوقع يومياً / للمناسبة'
                      : 'Estimated Daily Meals / Guests'}
                </label>
                <input
                  type="text"
                  value={mealsPerDay}
                  onChange={(e) => setMealsPerDay(e.target.value)}
                  placeholder={isRtl ? 'مثال: 250 وجبة' : 'e.g. 250 meals'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {isRtl ? 'ملاحظات ومواصفات إضافية' : 'Additional Specifications & Notes'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isRtl ? 'الموقع، مواعيد الورديات، متطلبات خاصة' : 'Address, shifts, dietary specs'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-[#FF6B00] text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
            >
              {isRtl ? 'مراجعة الطلب قبل الإرسال ←' : 'Review Before Submitting →'}
            </button>
          </form>
        )}

        {/* Saved Requests History */}
        {rfqSubmissions.length > 0 && (
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              {isRtl ? 'الطلبات المحفوظة' : 'Saved Requests Log'}
            </h3>
            <div className="space-y-2">
              {rfqSubmissions.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <span className="font-mono font-black text-[#FF6B00] me-2">{r.id}</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {r.organizationOrKitchenName}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-bold">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2) Invoices Section (RBAC Guarded & Honest No-Fake-Payment State)
  if (activeSection === 'service_invoices') {
    const invoiceTabs = [
      { id: 'my' as const, ar: 'فواتيري', en: 'My Invoices' },
      { id: 'due' as const, ar: 'المستحقة', en: 'Due' },
      { id: 'paid' as const, ar: 'المدفوعة', en: 'Paid' },
      { id: 'history' as const, ar: 'سجل المدفوعة', en: 'Payment History' },
    ];

    return (
      <div className="space-y-5 pb-10">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigateSection('home')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs cursor-pointer"
          >
            <BackIcon className="w-4 h-4 text-[#FF6B00]" />
            <span>{t.nav.home}</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <Service3DIcon iconKey="receipt" size="sm" />
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                {isRtl ? 'بوابة الفواتير والسداد الإلكتروني' : 'Invoices & Payments Portal'}
              </h2>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                {isRtl
                  ? 'معزولة بالكامل وفق صلاحية الحساب الحالي'
                  : 'Strictly scoped to the active account permissions'}
              </p>
            </div>
          </div>

          {!roleConfig.canViewInvoices ? (
            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center space-y-3">
              <Lock className="w-8 h-8 text-rose-600 mx-auto" />
              <h3 className="text-sm font-black text-rose-900 dark:text-rose-200">
                {isRtl
                  ? 'يتطلب عرض الفواتير تسجيل الدخول بحساب أفراد أو شركات'
                  : 'Invoices Access Requires Individual or Corporate Login'}
              </h3>
              <p className="text-xs font-medium text-rose-700 dark:text-rose-300 max-w-md mx-auto leading-relaxed">
                {isRtl
                  ? 'يمكنك التصفح بحرية كزائر، وعند طلب استعراض الفواتير يرجى الدخول أو اختيار حسابك من تبويب الحساب والصلاحيات.'
                  : 'Browsing as Visitor is open everywhere; sign in via the Account tab to inspect invoices.'}
              </p>
              <button
                type="button"
                onClick={() => onNavigateSection('admin')}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold cursor-pointer"
              >
                {isRtl ? 'الانتقال لتسجيل الدخول والصلاحيات' : 'Go to Account & Permissions'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                {invoiceTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setInvoiceTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                      invoiceTab === tab.id
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-50'
                    }`}
                  >
                    {isRtl ? tab.ar : tab.en}
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0" />
                <div className="space-y-1">
                  <div className="text-sm font-black text-amber-900 dark:text-amber-200">
                    {isRtl
                      ? 'بانتظار الربط المحاسبي وبوابة الدفع الحقيقية'
                      : 'Awaiting Accounting & Live Payment Gateway Integration'}
                  </div>
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-300 leading-relaxed">
                    {isRtl
                      ? 'لا يتم عرض فواتير مالية وهمية أو إتمام عمليات دفع صورية في المرحلة الأولى. سيظهر هنا رصيد وفواتير منشأتك بمجرد اعتماد الربط البنكي في المرحلة القادمة.'
                      : 'No simulated payments are processed in Phase 1. Real invoices populate once payment gateway integration is activated.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3) All 12 Services & Filtered Meals/Offers/Gift Cards/Hygiene Workspace
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigateSection('home')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs cursor-pointer"
        >
          <BackIcon className="w-4 h-4 text-[#FF6B00]" />
          <span>{t.nav.home}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSection('quotation')}
          className="px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold shadow-md shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t.heroPrimaryCta}</span>
        </button>
      </div>

      {/* Active Service Banner with 3D Icon */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-3.5">
          <Service3DIcon iconKey={currentServiceInfo?.iconKey || 'utensils'} size="md" />
          <div>
            <span className="text-[11px] font-extrabold text-[#FF6B00]">
              {t.brandName} — {t.servicesHeading}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {currentServiceInfo
                ? isRtl
                  ? currentServiceInfo.titleAr
                  : currentServiceInfo.titleEn
                : isRtl
                  ? 'كتالوج الوجبات والخدمات الموحد'
                  : 'Unified Meals & Services Catalog'}
            </h2>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
              {currentServiceInfo
                ? isRtl
                  ? currentServiceInfo.subtitleAr
                  : currentServiceInfo.subtitleEn
                : isRtl
                  ? 'استعرض الأقسام الغذائية الـ 15 واطلب عرض سعر فوري لأي خدمة'
                  : 'Browse the 15 food categories and request an official quote'}
            </p>
          </div>
        </div>

        {activeSection === 'service_gifts' && (
          <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 text-xs font-semibold text-slate-800 dark:text-orange-100 leading-relaxed">
            {isRtl
              ? 'تشمل فئة بطاقات الهدايا: الهدايا المؤسسية، منتجات البن المحمص، العسل الطبيعي، العطارة المختارة، والتمور الفاخرة. الأسعار والتوافر لكل باقة: بانتظار اعتماد البيانات.'
              : 'Gift Cards include corporate gift boxes, coffee, natural honey, spices, and premium dates. Final package pricing: Awaiting Data Approval.'}
          </div>
        )}
        {activeSection === 'service_hygiene' && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-900 dark:text-emerald-200 leading-relaxed flex flex-wrap items-center justify-between gap-3">
            <span>
              {isRtl
                ? 'يتم تطبيق معايير HACCP وISO 22000 وفحوصات السحب الحراري والعينات داخل المطابخ المركزية الثلاثة بإشراف إدارات الجودة والسلامة الغذائية.'
                : 'HACCP & ISO 22000 hygiene protocols, temperature tracking, and lab sampling are enforced across all 3 Central Kitchens.'}
            </span>
            {onOpenHaccpHub && (
              <button
                type="button"
                onClick={onOpenHaccpHub}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs shrink-0 cursor-pointer"
              >
                {isRtl ? 'فتح منظومة التفتيش والهاسب HACCP' : 'Open HACCP Inspection Hub'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filters & Sorting Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white">
            <SlidersHorizontal className="w-4 h-4 text-[#FF6B00]" />
            <span>
              {isRtl ? 'الفلاتر والتصنيفات الغذائية (15 تصنيف)' : 'Filters & Food Categories (15)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedLocationFilter}
              onChange={(e) => setSelectedLocationFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="all">{isRtl ? 'كل المناطق والمطابخ' : 'All Kitchens & Locations'}</option>
              {THREE_CENTRAL_KITCHENS.map((k) => (
                <option key={k.id} value={k.id}>
                  {isRtl ? k.locationAr : k.locationEn}
                </option>
              ))}
            </select>

            <select
              value={fulfillmentFilter}
              onChange={(e) => setFulfillmentFilter(e.target.value as 'all' | 'delivery' | 'pickup')}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="all">{isRtl ? 'الكل (توصيل واستلام)' : 'Delivery & Pickup'}</option>
              <option value="delivery">{isRtl ? 'التوصيل للموقع' : 'Site Delivery'}</option>
              <option value="pickup">{isRtl ? 'الاستلام من المطبخ' : 'Kitchen Pickup'}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'most_ordered' | 'nearest')}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="default">{isRtl ? 'الترتيب الافتراضي' : 'Default Sort'}</option>
              <option value="most_ordered">{isRtl ? 'الأكثر طلباً' : 'Most Ordered'}</option>
              <option value="nearest">{isRtl ? 'الأقرب لنطاق الخدمة' : 'Nearest Coverage'}</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#FF6B00] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-orange-50'
            }`}
          >
            {isRtl ? 'كل التصنيفات' : 'All Categories'}
          </button>
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FF6B00] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-orange-50'
              }`}
            >
              {isRtl ? cat.ar : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Results Grid */}
      {catalogEntries.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <Filter className="w-7 h-7 text-[#FF6B00] mx-auto" />
          <p className="text-sm font-black text-slate-900 dark:text-white">
            {isRtl
              ? 'الأصناف التفصيلية لهذا التصنيف بانتظار اعتماد البيانات والأسعار'
              : 'Detailed items for this category are Awaiting Data Approval'}
          </p>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
            {isRtl
              ? 'يمكنك طلب عرض سعر مخصص لهذا التصنيف مباشرةً وسيتولى فريق التشغيل إعداد القائمة المعتمدة.'
              : 'You can submit an official Quotation Request for this category directly.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigateSection('quotation')}
            className="mt-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold cursor-pointer"
          >
            {t.heroPrimaryCta}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalogEntries.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#FF6B00] shadow-xs flex flex-col justify-between gap-4 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {isRtl ? item.nameAr : item.nameEn}
                  </h4>
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800 shrink-0">
                    {t.awaitingApproval}
                  </span>
                </div>
                <p className="text-xs font-extrabold text-[#FF6B00]">
                  {isRtl ? item.kitchenNameAr : item.kitchenNameEn}
                </p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isRtl ? item.descAr : item.descEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isRtl ? 'السعر عند الاعتماد' : 'Price on approval'}</span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onAddToCart({
                      id: item.id,
                      nameAr: item.nameAr,
                      nameEn: item.nameEn,
                      kitchenNameAr: item.kitchenNameAr,
                      kitchenNameEn: item.kitchenNameEn,
                      approvedPrice: item.approvedPrice,
                    })
                  }
                  className="px-3.5 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{t.addToCartTest}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
