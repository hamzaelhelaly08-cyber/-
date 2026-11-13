import React, { useMemo, useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Truck,
  Scale,
  DollarSign,
  History,
  Lock,
  Building2,
  Save,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import type { User } from 'firebase/auth';
import type { LanguageCode } from '../../data/phase1Data';
import type {
  CommercialOrderDoc,
  CommissionRuleDoc,
  CourierProfileDoc,
  DeliveryRequestDoc,
  FaydOpportunityDoc,
  LedgerSettlementDoc,
  OnboardingApplicationDoc,
  SecurityAuditLogDoc,
  SubscriptionPlanDoc,
  TenantWorkspaceDoc,
  UsufructContractDoc,
  UsufructProposalDoc,
} from '../../types/faydEcosystem';
import {
  adminApproveOnboardingApplication,
  adminAssignCourierToDelivery,
  adminIssueUsufructContract,
  adminRecordAndSettleOrderRevenue,
  adminRecordDeliveryLedger,
  adminRejectOrNeedsInfoOnboarding,
  adminReviewOpportunity,
  adminSaveCommissionRules,
  adminSaveSubscriptionPlan,
  adminSettleLedgerEntry,
  adminToggleTenantStatus,
} from '../../services/faydFirestoreService';
import { AuditLogDrawer } from '../AuditLogDrawer';

interface CentralAdminGovernanceViewProps {
  lang: LanguageCode;
  user: User | null;
  isAdmin: boolean;
  onRequireSignIn: () => void;
  allApplications: OnboardingApplicationDoc[];
  allTenants: TenantWorkspaceDoc[];
  allCouriers: CourierProfileDoc[];
  allDeliveries: DeliveryRequestDoc[];
  allOrders: CommercialOrderDoc[];
  allOpportunities: FaydOpportunityDoc[];
  allProposals: UsufructProposalDoc[];
  allContracts: UsufructContractDoc[];
  subscriptionPlans: SubscriptionPlanDoc[];
  commissionRule: CommissionRuleDoc;
  allLedgerEntries: LedgerSettlementDoc[];
  auditLogs: SecurityAuditLogDoc[];
  onToast: (msg: string) => void;
}

export const CentralAdminGovernanceView: React.FC<CentralAdminGovernanceViewProps> = ({
  lang,
  user,
  isAdmin,
  onRequireSignIn,
  allApplications,
  allTenants,
  allCouriers,
  allDeliveries,
  allOrders,
  allOpportunities,
  allProposals,
  allContracts,
  subscriptionPlans,
  commissionRule,
  allLedgerEntries,
  auditLogs,
  onToast,
}) => {
  const isRtl = lang === 'ar';
  const [adminTab, setAdminTab] = useState<
    'approvals' | 'partners_delivery' | 'usufruct' | 'revenue_engine' | 'audit'
  >('approvals');
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);

  // Commission Engine Form State
  const [orderCommPct, setOrderCommPct] = useState(commissionRule.defaultOrderCommissionPct);
  const [deliveryPlatPct, setDeliveryPlatPct] = useState(commissionRule.defaultDeliveryPlatformPct);
  const [usufructPlatPct, setUsufructPlatPct] = useState(commissionRule.defaultUsufructPlatformPct);
  const [minDeliveryFee, setMinDeliveryFee] = useState(commissionRule.minDeliveryFeeEGP);

  // Plan editor state
  const [editingPlanId, setEditingPlanId] = useState(subscriptionPlans[0]?.planId || 'growth');
  const currentEditingPlan =
    subscriptionPlans.find((p) => p.planId === editingPlanId) || subscriptionPlans[0];
  const [planFee, setPlanFee] = useState(String(currentEditingPlan?.monthlyFeeEGP ?? 1200));
  const [planComm, setPlanComm] = useState(String(currentEditingPlan?.orderCommissionPct ?? 8));
  const [planDisc, setPlanDisc] = useState(String(currentEditingPlan?.deliveryDiscountPct ?? 10));

  // Courier assignment map
  const [courierPick, setCourierPick] = useState<Record<string, string>>({});
  const [commentByApp, setCommentByApp] = useState<Record<string, string>>({});
  const [customCommByTenant, setCustomCommByTenant] = useState<Record<string, string>>({});

  const revenueChartData = useMemo(() => {
    const groups: Record<string, { category: string; platform: number; partnerNet: number }> = {
      order_commission: {
        category: isRtl ? 'عمولات الطلبات' : 'Orders',
        platform: 0,
        partnerNet: 0,
      },
      delivery_fee: {
        category: isRtl ? 'رسوم التوصيل' : 'Delivery',
        platform: 0,
        partnerNet: 0,
      },
      subscription: {
        category: isRtl ? 'الاشتراكات' : 'Subscriptions',
        platform: 0,
        partnerNet: 0,
      },
      usufruct_share: {
        category: isRtl ? 'تقنية الانتفاع' : 'Usufruct',
        platform: 0,
        partnerNet: 0,
      },
    };
    allLedgerEntries.forEach((entry) => {
      const bucket = groups[entry.sourceType];
      if (bucket) {
        bucket.platform += entry.platformRevenueEGP || 0;
        bucket.partnerNet += entry.beneficiaryNetEGP || 0;
      }
    });
    return Object.values(groups);
  }, [allLedgerEntries, isRtl]);

  const totalPlatformRevenue = allLedgerEntries.reduce(
    (sum, e) => sum + (e.platformRevenueEGP || 0),
    0
  );

  if (!user) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
        <Lock className="w-8 h-8 text-[#FF6B00] mx-auto" />
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          {isRtl ? 'لوحة الإدارة المركزية والحوكمة' : 'Central Governance Dashboard'}
        </h3>
        <button
          type="button"
          onClick={onRequireSignIn}
          className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-black cursor-pointer"
        >
          {isRtl ? 'تسجيل الدخول بحساب الإدارة' : 'Sign in as Central Admin'}
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900 text-center space-y-3">
        <ShieldCheck className="w-8 h-8 text-red-600 mx-auto" />
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          {isRtl ? 'صلاحية مقصورة على الإدارة المركزية فقط' : 'Restricted to Central Governance Admins'}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          {isRtl
            ? 'يفرض النظام وقواعد أمان قاعدة البيانات عزلاً كاملاً؛ لا يمكن لغير مدير النظام المركزي اعتماد الشركاء أو تعديل العمولات.'
            : 'Strict RBAC isolates administrative approvals and commission controls exclusively to Central Admin.'}
        </p>
      </div>
    );
  }

  const handleSaveRules = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminSaveCommissionRules(user, {
      defaultOrderCommissionPct: Number(orderCommPct),
      defaultDeliveryPlatformPct: Number(deliveryPlatPct),
      defaultCourierSharePct: 100 - Number(deliveryPlatPct),
      defaultUsufructPlatformPct: Number(usufructPlatPct),
      minDeliveryFeeEGP: Number(minDeliveryFee),
    });
    onToast(isRtl ? 'تم تحديث محرك العمولات والتسعير المركزي بنجاح.' : 'Global commission rules updated.');
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditingPlan) return;
    await adminSaveSubscriptionPlan(user, {
      ...currentEditingPlan,
      monthlyFeeEGP: Number(planFee) || 0,
      orderCommissionPct: Number(planComm) || 0,
      deliveryDiscountPct: Number(planDisc) || 0,
    });
    onToast(isRtl ? `تم تحديث باقة ${currentEditingPlan.nameAr} بنجاح.` : 'Plan updated.');
  };

  const mappedDrawerLogs = auditLogs.map((l) => ({
    id: l.logId,
    timestamp: l.targetCollection,
    userRole: 'ops_director' as const,
    userName: l.actorUid.slice(0, 10),
    moduleName: l.targetId,
    actionAr: l.actionAr,
    actionEn: l.actionEn,
    details: l.details || '',
    severity: 'info' as const,
  }));

  return (
    <div className="space-y-6">
      {/* Admin Top Header & Tabs */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-extrabold text-[#FF6B00]">
              FAYD CENTRAL GOVERNANCE
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {isRtl
                ? 'لوحة الإدارة المركزية — الاعتمادات ومحرك الإيرادات والعمولات'
                : 'Central Management, Approvals & Revenue Engine'}
            </h2>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900 text-xs">
            <span className="text-slate-600 dark:text-slate-300">
              {isRtl ? 'إجمالي إيرادات المنصة المقيدة: ' : 'Platform Revenue: '}
            </span>
            <span className="font-black text-[#FF6B00] tabular-nums">
              {totalPlatformRevenue.toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              ['approvals', isRtl ? `طابور الاعتمادات (${allApplications.length})` : `Approvals (${allApplications.length})`],
              ['partners_delivery', isRtl ? `الشركاء والتوصيل (${allTenants.length}/${allDeliveries.length})` : 'Partners & Delivery'],
              ['usufruct', isRtl ? `عقود الانتفاع (${allProposals.length})` : 'Usufruct Contracts'],
              ['revenue_engine', isRtl ? 'الإيرادات والعمولات والاشتراكات' : 'Revenue & Commissions'],
              ['audit', isRtl ? `سجل التدقيق (${auditLogs.length})` : `Audit (${auditLogs.length})`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setAdminTab(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer ${
                adminTab === key
                  ? 'bg-[#FF6B00] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: ONBOARDING & OPPORTUNITY APPROVALS */}
      {adminTab === 'approvals' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {isRtl ? 'طلبات انضمام التجار والجهات والمندوبين' : 'Partner Onboarding Queue'}
            </h3>
            {allApplications.length === 0 ? (
              <p className="text-xs text-slate-500">{isRtl ? 'لا توجد طلبات انضمام حالياً.' : 'No onboarding applications.'}</p>
            ) : (
              allApplications.map((app) => (
                <div
                  key={app.appId}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] text-slate-500">{app.appId} · {app.targetRole}</span>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {app.businessName} — {app.city} ({app.commercialRegRef})
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {app.contactName} · {app.phone} · Plan: {app.selectedPlanId}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-[#FF6B00]">
                      {app.status}
                    </span>
                  </div>

                  {app.status !== 'approved' && app.status !== 'rejected' && (
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={commentByApp[app.appId] || ''}
                        onChange={(e) =>
                          setCommentByApp((prev) => ({ ...prev, [app.appId]: e.target.value }))
                        }
                        placeholder={isRtl ? 'ملاحظة الإدارة (أو سبب الرفض / الاستكمال)...' : 'Admin note...'}
                        className="flex-1 min-w-[200px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          const plan = subscriptionPlans.find((p) => p.planId === app.selectedPlanId);
                          await adminApproveOnboardingApplication(
                            user,
                            app,
                            plan,
                            commentByApp[app.appId] || ''
                          );
                          onToast(isRtl ? `تم اعتماد وتفعيل ${app.businessName}.` : 'Approved and provisioned.');
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'اعتماد وتفعيل المساحة' : 'Approve & Provision'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          adminRejectOrNeedsInfoOnboarding(
                            user,
                            app.appId,
                            'needs_info',
                            commentByApp[app.appId] || 'يرجى استكمال مستندات السجل التجاري'
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'استكمال' : 'Needs Info'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          adminRejectOrNeedsInfoOnboarding(
                            user,
                            app.appId,
                            'rejected',
                            commentByApp[app.appId] || 'غير مستوفٍ للشروط'
                          )
                        }
                        className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'رفض' : 'Reject'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Opportunities Review */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {isRtl ? 'اعتماد فرص FAYD Opportunities والتحقق من الشروط' : 'Opportunities Commercial Review'}
            </h3>
            {allOpportunities.map((opp) => (
              <div
                key={opp.oppId}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-black text-slate-900 dark:text-white">
                    {opp.title} — {opp.costOrInvestmentEGP.toLocaleString()} ج.م
                  </div>
                  <div className="text-slate-500">{opp.commercialTerms}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#FF6B00]">{opp.approvalStatus}</span>
                  {opp.approvalStatus === 'pending_admin' && (
                    <>
                      <button
                        type="button"
                        onClick={() => adminReviewOpportunity(user, opp.oppId, 'approved')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer"
                      >
                        {isRtl ? 'نشر واعتماد' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        onClick={() => adminReviewOpportunity(user, opp.oppId, 'rejected')}
                        className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold cursor-pointer"
                      >
                        {isRtl ? 'رفض' : 'Reject'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TENANTS, ORDERS & COURIER DISPATCH */}
      {adminTab === 'partners_delivery' && (
        <div className="space-y-5">
          {/* Tenants Management */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#FF6B00]" />
              <span>{isRtl ? 'الجهات والمساحات المستقلة المفعّلة' : 'Provisioned Isolated Workspaces'}</span>
            </h3>
            {allTenants.map((ten) => (
              <div
                key={ten.tenantId}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-black text-slate-900 dark:text-white">
                    {ten.name} ({ten.entityType}) — {ten.city}
                  </div>
                  <div className="text-slate-500">
                    ID: {ten.tenantId} · Status: {ten.status} · Commission: {ten.customCommissionPct}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={customCommByTenant[ten.tenantId] ?? String(ten.customCommissionPct)}
                    onChange={(e) =>
                      setCustomCommByTenant((p) => ({ ...p, [ten.tenantId]: e.target.value }))
                    }
                    className="w-20 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      adminToggleTenantStatus(
                        user,
                        ten,
                        ten.status === 'active' ? 'suspended' : 'active',
                        Number(customCommByTenant[ten.tenantId] ?? ten.customCommissionPct)
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-[#FF6B00] text-white font-bold cursor-pointer"
                  >
                    {ten.status === 'active'
                      ? isRtl ? 'تحديث / تجميد' : 'Update / Suspend'
                      : isRtl ? 'تفعيل' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Dispatch & Courier Assignment */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#FF6B00]" />
              <span>{isRtl ? 'إدارة شبكة FAYD Delivery وإسناد المندوبين' : 'Delivery Dispatch & Courier Assignment'}</span>
            </h3>
            {allDeliveries.map((del) => (
              <div
                key={del.deliveryId}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {del.deliveryId} — {del.pickupLocation} ← {del.dropoffLocation}
                  </div>
                  <div className="text-slate-500">
                    Status: <span className="font-bold text-[#FF6B00]">{del.status}</span> · Fee: {del.deliveryFeeEGP} ج.م
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {del.status === 'requested' && (
                    <>
                      <select
                        value={courierPick[del.deliveryId] || allCouriers[0]?.courierUid || ''}
                        onChange={(e) =>
                          setCourierPick((p) => ({ ...p, [del.deliveryId]: e.target.value }))
                        }
                        className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                      >
                        <option value="">{isRtl ? 'اختر مندوباً...' : 'Select Courier...'}</option>
                        {allCouriers.map((c) => (
                          <option key={c.courierUid} value={c.courierUid}>
                            {c.fullName} ({c.zone})
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const picked = courierPick[del.deliveryId] || allCouriers[0]?.courierUid;
                          if (!picked) {
                            onToast(isRtl ? 'لا يوجد مندوب معتمد متاح.' : 'No approved courier available.');
                            return;
                          }
                          adminAssignCourierToDelivery(user, del.deliveryId, picked);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#FF6B00] text-white font-bold cursor-pointer"
                      >
                        {isRtl ? 'إسناد للمندوب' : 'Assign'}
                      </button>
                    </>
                  )}
                  {del.status === 'delivered' && (
                    <button
                      type="button"
                      onClick={() => adminRecordDeliveryLedger(user, del)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer"
                    >
                      {isRtl ? 'ترحيل قيد التوصيل والمحفظة' : 'Post Delivery Ledger'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Orders Revenue Posting */}
          {allOrders.length > 0 && (
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                {isRtl ? 'ترحيل عمولات الطلبات المكتملة' : 'Post Completed Order Commissions'}
              </h3>
              {allOrders
                .filter((o) => o.status === 'completed')
                .map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
                  >
                    <span>
                      {ord.orderId} · {ord.itemsSummary} ({ord.platformCommissionEGP} ج.م عمولة)
                    </span>
                    <button
                      type="button"
                      onClick={() => adminRecordAndSettleOrderRevenue(user, ord)}
                      className="px-3 py-1 rounded-lg bg-[#FF6B00] text-white font-bold cursor-pointer"
                    >
                      {isRtl ? 'قيد بالدفتر' : 'Post Ledger'}
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: USUFRUCT LEGAL CONTRACT ISSUANCE */}
      {adminTab === 'usufruct' && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#FF6B00]" />
            <span>{isRtl ? 'اعتماد وإصدار عقود تقنية الانتفاع' : 'Central Approval & Usufruct Contract Issuance'}</span>
          </h3>
          {allProposals.map((p) => (
            <div
              key={p.proposalId}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="font-black text-slate-900 dark:text-white">
                  {p.proposalId} — {p.proposerName} ({p.proposerProfitPct}% / {p.siteOwnerProfitPct}% / {p.platformUsufructPct}%)
                </div>
                <div className="text-slate-600 dark:text-slate-300">{p.termsSummary}</div>
                <div className="text-[11px] font-bold text-[#FF6B00] mt-1">
                  {isRtl
                    ? `الحالة: ${p.status} | موافقة صاحب الفرصة: ${p.siteOwnerAgreed ? 'نعم' : 'لا'}`
                    : `Status: ${p.status}`}
                </div>
              </div>
              {p.status === 'awaiting_admin' && p.siteOwnerAgreed && p.proposerAgreed && (
                <button
                  type="button"
                  onClick={async () => {
                    const cid = await adminIssueUsufructContract(user, p);
                    onToast(isRtl ? `تم إصدار عقد الانتفاع الرسمي ${cid}.` : `Contract ${cid} issued.`);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black cursor-pointer"
                >
                  {isRtl ? 'اعتماد وإصدار عقد الانتفاع الرسمي' : 'Issue Official Contract'}
                </button>
              )}
            </div>
          ))}
          {allContracts.length > 0 && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {isRtl ? `إجمالي عقود الانتفاع السارية والموثقة: ${allContracts.length}` : `Active Contracts: ${allContracts.length}`}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REVENUE, COMMISSIONS & SUBSCRIPTIONS ENGINE */}
      {adminTab === 'revenue_engine' && (
        <div className="space-y-5">
          {/* Interactive Recharts Revenue Chart */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#FF6B00]" />
              <span>{isRtl ? 'تحليل إيرادات المنصة مقابل صافي الشركاء (ج.م)' : 'Platform Revenue vs Partner Payouts'}</span>
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar
                    dataKey="platform"
                    name={isRtl ? 'إيراد FAYD' : 'FAYD Revenue'}
                    fill="#FF6B00"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="partnerNet"
                    name={isRtl ? 'صافي الشركاء/المندوبين' : 'Partner Net'}
                    fill="#10B981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Global Commission Controls */}
            <form
              onSubmit={handleSaveRules}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs"
            >
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {isRtl ? 'ضبط نسب العمولات الافتراضية' : 'Global Commission Controls'}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'عمولة الطلبات %' : 'Order Comm %'}</label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={orderCommPct}
                    onChange={(e) => setOrderCommPct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'نسبة المنصة بالتوصيل %' : 'Delivery Plat %'}</label>
                  <input
                    type="number"
                    min={0}
                    max={80}
                    value={deliveryPlatPct}
                    onChange={(e) => setDeliveryPlatPct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'نسبة الانتفاع للمنصة %' : 'Usufruct %'}</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={usufructPlatPct}
                    onChange={(e) => setUsufructPlatPct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'أقل رسوم توصيل ج.م' : 'Min Delivery EGP'}</label>
                  <input
                    type="number"
                    min={10}
                    value={minDeliveryFee}
                    onChange={(e) => setMinDeliveryFee(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white font-black flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isRtl ? 'حفظ قواعد العمولات' : 'Save Rules'}</span>
              </button>
            </form>

            {/* Subscription Plans Editor */}
            <form
              onSubmit={handleSavePlan}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs"
            >
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {isRtl ? 'إدارة باقات الاشتراك' : 'Subscription Plan Controls'}
              </h4>
              <select
                value={editingPlanId}
                onChange={(e) => {
                  const pid = e.target.value;
                  setEditingPlanId(pid);
                  const found = subscriptionPlans.find((p) => p.planId === pid);
                  if (found) {
                    setPlanFee(String(found.monthlyFeeEGP));
                    setPlanComm(String(found.orderCommissionPct));
                    setPlanDisc(String(found.deliveryDiscountPct));
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
              >
                {subscriptionPlans.map((p) => (
                  <option key={p.planId} value={p.planId}>
                    {isRtl ? p.nameAr : p.nameEn}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'الرسوم/شهر' : 'Fee EGP'}</label>
                  <input
                    type="number"
                    min={0}
                    value={planFee}
                    onChange={(e) => setPlanFee(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'العمولة %' : 'Comm %'}</label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={planComm}
                    onChange={(e) => setPlanComm(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">{isRtl ? 'خصم شحن %' : 'Ship Disc %'}</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={planDisc}
                    onChange={(e) => setPlanDisc(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تحديث الباقة' : 'Update Plan'}</span>
              </button>
            </form>
          </div>

          {/* Ledger Settlements Table */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {isRtl ? 'دفتر التسويات والقيود المالية' : 'Revenue & Settlement Ledger'}
            </h4>
            {allLedgerEntries.map((entry) => (
              <div
                key={entry.entryId}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold">{entry.sourceType}</span> · {entry.referenceId}
                </div>
                <div className="flex items-center gap-3">
                  <span>{isRtl ? `منصة: ${entry.platformRevenueEGP} ج.م` : `Platform: ${entry.platformRevenueEGP}`}</span>
                  {entry.settlementStatus === 'accrued' ? (
                    <button
                      type="button"
                      onClick={() => adminSettleLedgerEntry(user, entry.entryId)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold cursor-pointer"
                    >
                      {isRtl ? 'اعتماد التسوية' : 'Mark Settled'}
                    </button>
                  ) : (
                    <span className="text-emerald-600 font-bold">{entry.settlementStatus}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT TRAIL */}
      {adminTab === 'audit' && (
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-4 h-4 text-[#FF6B00]" />
              <span>{isRtl ? 'سجل الحوكمة والتدقيق غير القابل للتعديل' : 'Immutable Security Audit Log'}</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAuditDrawerOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-black cursor-pointer"
            >
              {isRtl ? 'فتح درج التدقيق الجانبي' : 'Open Audit Drawer'}
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto text-xs">
            {auditLogs.map((l) => (
              <div
                key={l.logId}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
              >
                <div className="font-bold text-slate-900 dark:text-white">
                  {isRtl ? l.actionAr : l.actionEn}
                </div>
                <div className="text-[11px] text-slate-500">
                  {l.targetCollection}/{l.targetId} {l.details ? `— ${l.details}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AuditLogDrawer
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
        logs={mappedDrawerLogs}
        onClearLogs={() =>
          onToast(
            isRtl
              ? 'السجل السحابي محمي بقواعد الأمان وغير قابل للمسح.'
              : 'Cloud audit logs are immutable.'
          )
        }
        isRtl={isRtl}
      />
    </div>
  );
};
