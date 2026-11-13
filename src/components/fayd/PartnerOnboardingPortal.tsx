import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Truck,
  Store,
  Briefcase,
  Send,
  RefreshCw,
} from 'lucide-react';
import type { User } from 'firebase/auth';
import type { CountryCode, LanguageCode } from '../../data/phase1Data';
import type {
  OnboardingApplicationDoc,
  OnboardingEntityType,
  OnboardingTargetRole,
  SubscriptionPlanDoc,
} from '../../types/faydEcosystem';
import {
  resubmitOnboardingInfo,
  submitOnboardingApplication,
} from '../../services/faydFirestoreService';

interface PartnerOnboardingPortalProps {
  lang: LanguageCode;
  countryCode: CountryCode;
  user: User | null;
  onRequireSignIn: () => void;
  plans: SubscriptionPlanDoc[];
  myApplications: OnboardingApplicationDoc[];
  onToast: (msg: string) => void;
}

export const PartnerOnboardingPortal: React.FC<PartnerOnboardingPortalProps> = ({
  lang,
  countryCode,
  user,
  onRequireSignIn,
  plans,
  myApplications,
  onToast,
}) => {
  const isRtl = lang === 'ar';

  const [targetRole, setTargetRole] = useState<OnboardingTargetRole>('merchant_owner');
  const [entityType, setEntityType] = useState<OnboardingEntityType>('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [commercialRegRef, setCommercialRegRef] = useState('');
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans[0]?.planId || 'starter');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // For needs_info resubmission
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [resubmitNote, setResubmitNote] = useState('');

  const roleCards: {
    role: OnboardingTargetRole;
    defaultEntity: OnboardingEntityType;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      role: 'merchant_owner',
      defaultEntity: 'restaurant',
      titleAr: 'تاجر / مطعم / متجر / شركة',
      titleEn: 'Merchant / Restaurant / Store / Company',
      descAr: 'مساحة عمل مستقلة لإدارة المنتجات والطلبات والعمولات',
      descEn: 'Isolated workspace for catalog, orders & payouts',
      icon: <Store className="w-5 h-5" />,
    },
    {
      role: 'delivery_client',
      defaultEntity: 'company_factory',
      titleAr: 'جهة مستفيدة من FAYD Delivery',
      titleEn: 'FAYD Delivery Partner Entity',
      descAr: 'الاستفادة المباشرة من شبكة التوصيل لشحناتك',
      descEn: 'Dispatch & track shipments on FAYD network',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      role: 'courier',
      defaultEntity: 'courier_individual',
      titleAr: 'مندوب توصيل معتمد',
      titleEn: 'Approved Delivery Courier',
      descAr: 'استقبال مهام التوصيل وإدارة المحفظة والمستحقات',
      descEn: 'Accept delivery tasks & manage wallet payouts',
      icon: <Truck className="w-5 h-5" />,
    },
    {
      role: 'opportunity_partner',
      defaultEntity: 'project_owner',
      titleAr: 'شريك فرص وتشغيل (انتفاع)',
      titleEn: 'FAYD Opportunities & Usufruct Partner',
      descAr: 'طرح مشروعات أو مواقع بشروط تعاقدية واضحة',
      descEn: 'Propose operational projects or commercial sites',
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onRequireSignIn();
      return;
    }
    if (!businessName.trim() || !contactName.trim() || !phone.trim() || !city.trim() || !commercialRegRef.trim()) {
      onToast(isRtl ? 'يرجى استكمال جميع الحقول المطلوبة.' : 'Please complete all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const appId = await submitOnboardingApplication(user, {
        targetRole,
        entityType,
        businessName,
        contactName,
        phone,
        countryCode,
        city,
        commercialRegRef,
        selectedPlanId,
        notes,
      });
      onToast(
        isRtl
          ? `تم إرسال طلب الانضمام بنجاح برقم ${appId} بحالة "قيد المراجعة".`
          : `Application ${appId} submitted and awaiting central review.`
      );
      setBusinessName('');
      setPhone('');
      setCity('');
      setCommercialRegRef('');
      setNotes('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResubmit = async (app: OnboardingApplicationDoc) => {
    if (!user) return;
    setSubmitting(true);
    try {
      await resubmitOnboardingInfo(user, app.appId, {
        businessName: app.businessName,
        contactName: app.contactName,
        phone: app.phone,
        city: app.city,
        commercialRegRef: app.commercialRegRef,
        notes: resubmitNote || app.notes || '',
      });
      setEditingAppId(null);
      setResubmitNote('');
      onToast(isRtl ? 'تم إرسال الاستكمال للإدارة بنجاح.' : 'Updated application sent for review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div>
          <span className="text-xs font-extrabold text-[#FF6B00]">
            {isRtl ? 'بوابة التوسع والشركاء — المرحلة الثانية' : 'FAYD Partner Onboarding'}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
            {isRtl
              ? 'انضمام التجار والمطاعم والشركات ومندوبي التوصيل'
              : 'Onboard Merchants, Delivery Partners & Couriers'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            {isRtl
              ? 'كل جهة تحصل بعد موافقة الإدارة المركزية على حساب ومساحة عمل مستقلة ومعزولة بالكامل.'
              : 'Every approved entity receives an isolated workspace provisioned upon Central Admin review.'}
          </p>
        </div>

        {/* Target Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {roleCards.map((card) => {
            const active = targetRole === card.role;
            return (
              <button
                key={card.role}
                type="button"
                onClick={() => {
                  setTargetRole(card.role);
                  setEntityType(card.defaultEntity);
                }}
                className={`p-4 rounded-2xl border text-start transition-all cursor-pointer space-y-2 ${
                  active
                    ? 'bg-orange-50 dark:bg-orange-950/40 border-[#FF6B00] shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-[#FF6B00]'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    active ? 'bg-[#FF6B00] text-white' : 'bg-white dark:bg-slate-900 text-[#FF6B00]'
                  }`}
                >
                  {card.icon}
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white">
                  {isRtl ? card.titleAr : card.titleEn}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isRtl ? card.descAr : card.descEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Onboarding Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'الاسم التجاري / اسم الجهة أو المندوب *' : 'Business / Applicant Name *'}
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={isRtl ? 'مثال: مطاعم النيل / شركة الدلتا للتوريدات' : 'Entity or Courier Name'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'تصنيف النشاط *' : 'Entity Classification *'}
            </label>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value as OnboardingEntityType)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none"
            >
              <option value="restaurant">{isRtl ? 'مطعم / كافيه' : 'Restaurant / Cafe'}</option>
              <option value="store">{isRtl ? 'متجر / سوبر ماركت' : 'Retail Store / Market'}</option>
              <option value="central_kitchen">{isRtl ? 'مطبخ مركزي' : 'Central Kitchen'}</option>
              <option value="company_factory">{isRtl ? 'شركة أو مصنع' : 'Company / Factory'}</option>
              <option value="courier_individual">{isRtl ? 'مندوب توصيل' : 'Individual Courier'}</option>
              <option value="project_owner">{isRtl ? 'صاحب مشروع / خبرة' : 'Project / Expertise Owner'}</option>
              <option value="site_owner">{isRtl ? 'صاحب موقع تجاري' : 'Commercial Site Owner'}</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'اسم الشخص المسؤول *' : 'Contact Person *'}
            </label>
            <input
              type="text"
              required
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'رقم الهاتف للتواصل *' : 'Contact Phone *'}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010XXXXXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'المدينة / نطاق التغطية *' : 'City / Zone *'}
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={isRtl ? 'العاشر من رمضان / بدر / القاهرة' : 'Cairo / Badr / 10th of Ramadan'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'رقم السجل التجاري / الضريبي / البطاقة القومية *' : 'Commercial Registry / National ID *'}
            </label>
            <input
              type="text"
              required
              value={commercialRegRef}
              onChange={(e) => setCommercialRegRef(e.target.value)}
              placeholder={isRtl ? 'مثال: CR-19132 أو الرقم القومي للمندوب' : 'Registry or National ID'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-2">
              {isRtl ? 'اختر باقة الاشتراك (خاضعة للتحكم المركزي)' : 'Select Subscription Plan'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {plans.map((p) => {
                const isSel = selectedPlanId === p.planId;
                return (
                  <button
                    key={p.planId}
                    type="button"
                    onClick={() => setSelectedPlanId(p.planId)}
                    className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer space-y-1 ${
                      isSel
                        ? 'border-[#FF6B00] bg-orange-50 dark:bg-orange-950/30'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950'
                    }`}
                  >
                    <div className="font-black text-slate-900 dark:text-white">
                      {isRtl ? p.nameAr : p.nameEn}
                    </div>
                    <div className="text-sm font-black text-[#FF6B00] tabular-nums">
                      {p.monthlyFeeEGP.toLocaleString()} {isRtl ? 'ج.م / شهر' : 'EGP/mo'}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      {isRtl
                        ? `عمولة طلبات ${p.orderCommissionPct}% · خصم توصيل ${p.deliveryDiscountPct}%`
                        : `${p.orderCommissionPct}% commission · ${p.deliveryDiscountPct}% delivery discount`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">
              {isRtl ? 'ملاحظات إضافية أو وصف الأوراق المتوفرة' : 'Additional Notes'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-[#FF6B00] outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-orange-600 disabled:opacity-60 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-orange-500/25 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {user
                  ? submitting
                    ? isRtl ? 'جاري الإرسال...' : 'Submitting...'
                    : isRtl ? 'إرسال طلب الانضمام للمراجعة' : 'Submit Application'
                  : isRtl ? 'سجّل الدخول بـ Google لإرسال الطلب' : 'Sign in with Google to Submit'}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* My Applications Status Tracker */}
      {user && (
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            {isRtl ? 'متابعة طلبات انضمامي' : 'My Onboarding Applications'} ({myApplications.length})
          </h3>
          {myApplications.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isRtl ? 'لم تقم بتقديم أي طلب انضمام بعد.' : 'No onboarding applications submitted yet.'}
            </p>
          ) : (
            <div className="space-y-3">
              {myApplications.map((app) => (
                <div
                  key={app.appId}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-slate-500">{app.appId}</span>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {app.businessName} ({app.targetRole})
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full font-extrabold text-[11px] flex items-center gap-1 ${
                        app.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : app.status === 'needs_info'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                          : 'bg-orange-100 text-[#FF6B00] dark:bg-orange-950/60'
                      }`}
                    >
                      {app.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {app.status === 'needs_info' && <AlertCircle className="w-3.5 h-3.5" />}
                      {app.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                      {app.status === 'pending_review' && <Clock className="w-3.5 h-3.5" />}
                      <span>{app.status}</span>
                    </span>
                  </div>

                  {app.adminComment && (
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                      <span className="font-bold text-[#FF6B00]">{isRtl ? 'رد الإدارة: ' : 'Admin Note: '}</span>
                      {app.adminComment}
                    </div>
                  )}

                  {app.status === 'needs_info' && (
                    <div className="pt-2 space-y-2">
                      {editingAppId === app.appId ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={resubmitNote}
                            onChange={(e) => setResubmitNote(e.target.value)}
                            placeholder={isRtl ? 'أضف البيانات المستكملة...' : 'Add requested details...'}
                            className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                          <button
                            type="button"
                            onClick={() => handleResubmit(app)}
                            disabled={submitting}
                            className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>{isRtl ? 'إعادة الإرسال' : 'Resubmit'}</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingAppId(app.appId)}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold cursor-pointer"
                        >
                          {isRtl ? 'استكمال البيانات المطلوبة' : 'Provide Requested Info'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
