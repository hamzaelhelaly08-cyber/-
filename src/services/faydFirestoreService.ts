import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  Unsubscribe,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import type { CountryCode } from '../data/phase1Data';
import {
  BOOTSTRAPPED_ADMIN_EMAIL,
  CatalogItemDoc,
  clampText,
  CommercialOrderDoc,
  CommercialOrderStatus,
  CommissionRuleDoc,
  CourierProfileDoc,
  DeliveryRequestDoc,
  FaydOpportunityDoc,
  OnboardingApplicationDoc,
  OnboardingEntityType,
  OnboardingTargetRole,
  OpportunityKind,
  PublicStorefrontDoc,
  sanitizeId,
  SubscriptionPlanDoc,
  TenantEntityType,
  TenantWorkspaceDoc,
  UsufructProposalDoc,
} from '../types/faydEcosystem';

function genId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return sanitizeId(`${prefix}_${Date.now().toString(36)}_${rand}`);
}

export const DEFAULT_SUBSCRIPTION_PLANS: Omit<SubscriptionPlanDoc, 'updatedAt'>[] = [
  {
    planId: 'starter',
    nameAr: 'باقة الانطلاق (الأساسية)',
    nameEn: 'Starter Plan',
    monthlyFeeEGP: 0,
    orderCommissionPct: 12,
    deliveryDiscountPct: 0,
    isActive: true,
  },
  {
    planId: 'growth',
    nameAr: 'باقة النمو للتجار والمطاعم',
    nameEn: 'Growth Merchant Plan',
    monthlyFeeEGP: 1200,
    orderCommissionPct: 8,
    deliveryDiscountPct: 10,
    isActive: true,
  },
  {
    planId: 'enterprise',
    nameAr: 'باقة الشركات والمطابخ المركزية',
    nameEn: 'Enterprise Catering Plan',
    monthlyFeeEGP: 3500,
    orderCommissionPct: 5,
    deliveryDiscountPct: 20,
    isActive: true,
  },
];

export const DEFAULT_COMMISSION_RULE: Omit<CommissionRuleDoc, 'updatedAt'> = {
  ruleId: 'global',
  defaultOrderCommissionPct: 10,
  defaultDeliveryPlatformPct: 20,
  defaultCourierSharePct: 80,
  defaultUsufructPlatformPct: 10,
  minDeliveryFeeEGP: 45,
};

export function isUserBootstrappedAdmin(user: User | null): boolean {
  return Boolean(
    user &&
      user.emailVerified &&
      user.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
  );
}

export async function ensureUserProfileAndDefaults(
  user: User,
  countryCode: CountryCode
): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const privateRef = doc(db, 'users', user.uid, 'private_profile', 'main');
  const isBootAdmin = isUserBootstrappedAdmin(user);

  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: clampText(user.displayName || user.email?.split('@')[0] || 'FAYD User', 120),
        role: isBootAdmin ? 'central_super_admin' : 'customer',
        status: 'active',
        countryCode,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    const privSnap = await getDoc(privateRef);
    if (!privSnap.exists()) {
      await setDoc(privateRef, {
        uid: user.uid,
        email: clampText(user.email || 'no-email@fayd.app', 160),
        phone: '',
        nationalOrTaxId: '',
        address: '',
        updatedAt: serverTimestamp(),
      });
    }

    if (isBootAdmin) {
      const adminRef = doc(db, 'admins', user.uid);
      const adminSnap = await getDoc(adminRef);
      if (!adminSnap.exists()) {
        await setDoc(adminRef, {
          uid: user.uid,
          adminLevel: 'central_super_admin',
          label: clampText(user.displayName || 'Central Super Admin', 100),
          grantedBy: user.uid,
          createdAt: serverTimestamp(),
        });
      }

      const ruleRef = doc(db, 'commission_rules', 'global');
      const ruleSnap = await getDoc(ruleRef);
      if (!ruleSnap.exists()) {
        await setDoc(ruleRef, {
          ...DEFAULT_COMMISSION_RULE,
          updatedAt: serverTimestamp(),
        });
      }

      for (const plan of DEFAULT_SUBSCRIPTION_PLANS) {
        const planRef = doc(db, 'subscription_plans', plan.planId);
        const planSnap = await getDoc(planRef);
        if (!planSnap.exists()) {
          await setDoc(planRef, {
            ...plan,
            updatedAt: serverTimestamp(),
          });
        }
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}

export async function appendSecurityAudit(
  actorUid: string,
  actionAr: string,
  actionEn: string,
  targetCollection: string,
  targetId: string,
  details?: string
): Promise<void> {
  const logId = genId('log');
  try {
    await setDoc(doc(db, 'audit_logs', logId), {
      logId,
      actorUid: sanitizeId(actorUid),
      actionAr: clampText(actionAr, 200),
      actionEn: clampText(actionEn, 200),
      targetCollection: clampText(targetCollection, 80),
      targetId: clampText(targetId, 128),
      details: clampText(details || '', 500),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `audit_logs/${logId}`);
  }
}

export async function submitOnboardingApplication(
  user: User,
  payload: {
    targetRole: OnboardingTargetRole;
    entityType: OnboardingEntityType;
    businessName: string;
    contactName: string;
    phone: string;
    countryCode: CountryCode;
    city: string;
    commercialRegRef: string;
    selectedPlanId: string;
    notes?: string;
  }
): Promise<string> {
  const appId = genId('app');
  try {
    await setDoc(doc(db, 'onboarding_applications', appId), {
      appId,
      applicantUid: user.uid,
      targetRole: payload.targetRole,
      entityType: payload.entityType,
      businessName: clampText(payload.businessName, 140),
      contactName: clampText(payload.contactName, 120),
      phone: clampText(payload.phone, 32),
      countryCode: payload.countryCode,
      city: clampText(payload.city, 80),
      commercialRegRef: clampText(payload.commercialRegRef, 80),
      selectedPlanId: sanitizeId(payload.selectedPlanId || 'starter'),
      notes: clampText(payload.notes || '', 600),
      status: 'pending_review',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      user.uid,
      `تقديم طلب انضمام جديد: ${payload.businessName}`,
      `Submitted onboarding application: ${payload.businessName}`,
      'onboarding_applications',
      appId,
      `الدور المطلوب: ${payload.targetRole}`
    );
    return appId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, `onboarding_applications/${appId}`);
  }
}

export async function resubmitOnboardingInfo(
  user: User,
  appId: string,
  updates: {
    businessName: string;
    contactName: string;
    phone: string;
    city: string;
    commercialRegRef: string;
    notes: string;
  }
): Promise<void> {
  try {
    await updateDoc(doc(db, 'onboarding_applications', appId), {
      businessName: clampText(updates.businessName, 140),
      contactName: clampText(updates.contactName, 120),
      phone: clampText(updates.phone, 32),
      city: clampText(updates.city, 80),
      commercialRegRef: clampText(updates.commercialRegRef, 80),
      notes: clampText(updates.notes, 600),
      status: 'pending_review',
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      user.uid,
      `استكمال بيانات طلب الانضمام ${appId}`,
      `Resubmitted onboarding info ${appId}`,
      'onboarding_applications',
      appId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `onboarding_applications/${appId}`);
  }
}

export async function adminApproveOnboardingApplication(
  adminUser: User,
  app: OnboardingApplicationDoc,
  selectedPlan: SubscriptionPlanDoc | undefined,
  adminComment: string
): Promise<string | null> {
  const batch = writeBatch(db);
  const appRef = doc(db, 'onboarding_applications', app.appId);
  const applicantUserRef = doc(db, 'users', app.applicantUid);
  const now = serverTimestamp();

  let createdTenantId: string | null = null;

  try {
    const applicantSnap = await getDoc(applicantUserRef);
    const commissionPct = selectedPlan ? selectedPlan.orderCommissionPct : 10;

    if (app.targetRole === 'merchant_owner' || app.targetRole === 'delivery_client') {
      createdTenantId = genId('ten');
      const tenantEntityType: TenantEntityType =
        app.targetRole === 'delivery_client'
          ? 'delivery_client'
          : app.entityType === 'restaurant' ||
            app.entityType === 'store' ||
            app.entityType === 'central_kitchen' ||
            app.entityType === 'company_factory'
          ? app.entityType
          : 'store';

      batch.set(doc(db, 'tenants', createdTenantId), {
        tenantId: createdTenantId,
        ownerUid: app.applicantUid,
        name: clampText(app.businessName, 140),
        entityType: tenantEntityType,
        countryCode: app.countryCode,
        city: clampText(app.city, 80),
        commercialRegRef: clampText(app.commercialRegRef, 80),
        planId: app.selectedPlanId,
        customCommissionPct: commissionPct,
        deliveryEnabled: true,
        status: 'active',
        createdAt: now,
        updatedAt: now,
      });

      batch.set(doc(db, 'public_storefronts', createdTenantId), {
        tenantId: createdTenantId,
        name: clampText(app.businessName, 140),
        entityType: tenantEntityType,
        countryCode: app.countryCode,
        city: clampText(app.city, 80),
        isActive: app.targetRole === 'merchant_owner',
        updatedAt: now,
      });

      if (applicantSnap.exists()) {
        batch.update(applicantUserRef, {
          role: app.targetRole,
          tenantId: createdTenantId,
          status: 'active',
          updatedAt: now,
        });
      }

      if (selectedPlan && selectedPlan.monthlyFeeEGP > 0) {
        const entryId = genId('led');
        batch.set(doc(db, 'ledger_settlements', entryId), {
          entryId,
          sourceType: 'subscription',
          referenceId: app.appId,
          tenantId: createdTenantId,
          beneficiaryUid: app.applicantUid,
          grossAmountEGP: selectedPlan.monthlyFeeEGP,
          platformRevenueEGP: selectedPlan.monthlyFeeEGP,
          beneficiaryNetEGP: 0,
          settlementStatus: 'accrued',
          createdAt: now,
          updatedAt: now,
        });
      }
    } else if (app.targetRole === 'courier') {
      batch.set(doc(db, 'couriers', app.applicantUid), {
        courierUid: app.applicantUid,
        fullName: clampText(app.contactName, 120),
        vehicleType: 'motorcycle',
        zone: clampText(app.city, 100),
        isOnline: true,
        isApproved: true,
        walletBalanceEGP: 0,
        completedDeliveries: 0,
        createdAt: now,
        updatedAt: now,
      });

      if (applicantSnap.exists()) {
        batch.update(applicantUserRef, {
          role: 'courier',
          status: 'active',
          updatedAt: now,
        });
      }
    } else if (app.targetRole === 'opportunity_partner') {
      if (applicantSnap.exists()) {
        batch.update(applicantUserRef, {
          role: 'opportunity_partner',
          status: 'active',
          updatedAt: now,
        });
      }
    }

    batch.update(appRef, {
      status: 'approved',
      adminComment: clampText(adminComment || 'تم الاعتماد وتفعيل الحساب المستقل', 400),
      reviewedByUid: adminUser.uid,
      ...(createdTenantId ? { createdTenantId } : {}),
      updatedAt: now,
    });

    const logId = genId('log');
    batch.set(doc(db, 'audit_logs', logId), {
      logId,
      actorUid: adminUser.uid,
      actionAr: `اعتماد انضمام "${app.businessName}" بصلاحية ${app.targetRole}`,
      actionEn: `Approved onboarding for ${app.businessName}`,
      targetCollection: 'onboarding_applications',
      targetId: app.appId,
      details: createdTenantId ? `Tenant ID: ${createdTenantId}` : `Courier/Partner UID: ${app.applicantUid}`,
      createdAt: now,
    });

    await batch.commit();
    return createdTenantId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.WRITE, `onboarding_applications/${app.appId}`);
  }
}

export async function adminRejectOrNeedsInfoOnboarding(
  adminUser: User,
  appId: string,
  status: 'needs_info' | 'rejected',
  adminComment: string
): Promise<void> {
  try {
    await updateDoc(doc(db, 'onboarding_applications', appId), {
      status,
      adminComment: clampText(adminComment, 400),
      reviewedByUid: adminUser.uid,
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      status === 'rejected' ? `رفض طلب الانضمام ${appId}` : `طلب استكمال بيانات للطلب ${appId}`,
      `${status} onboarding ${appId}`,
      'onboarding_applications',
      appId,
      adminComment
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `onboarding_applications/${appId}`);
  }
}

export async function saveCatalogItem(
  user: User,
  tenant: TenantWorkspaceDoc,
  payload: {
    itemId?: string;
    title: string;
    category: string;
    priceEGP: number;
    stockQty: number;
    isAvailable: boolean;
  }
): Promise<string> {
  const itemId = payload.itemId ? sanitizeId(payload.itemId) : genId('item');
  const itemRef = doc(db, 'catalog_items', itemId);
  try {
    if (payload.itemId) {
      await updateDoc(itemRef, {
        title: clampText(payload.title, 140),
        category: clampText(payload.category, 64),
        priceEGP: Math.max(1, Math.min(1000000, Number(payload.priceEGP) || 1)),
        stockQty: Math.max(0, Math.min(1000000, Number(payload.stockQty) || 0)),
        isAvailable: payload.isAvailable,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(itemRef, {
        itemId,
        tenantId: tenant.tenantId,
        merchantOwnerUid: user.uid,
        storeName: clampText(tenant.name, 140),
        title: clampText(payload.title, 140),
        category: clampText(payload.category, 64),
        priceEGP: Math.max(1, Math.min(1000000, Number(payload.priceEGP) || 1)),
        stockQty: Math.max(0, Math.min(1000000, Number(payload.stockQty) || 0)),
        isAvailable: payload.isAvailable,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return itemId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.WRITE, `catalog_items/${itemId}`);
  }
}

export async function placeCommercialOrder(
  customerUser: User,
  item: CatalogItemDoc,
  quantity: number,
  commissionPct: number,
  needsDelivery: boolean,
  deliveryFeeEGP: number,
  dropoffAddress: string
): Promise<string> {
  const orderId = genId('ord');
  const qty = Math.max(1, Math.min(500, Math.round(quantity)));
  const subtotalEGP = Math.round(item.priceEGP * qty);
  const platformCommissionEGP = Math.round((subtotalEGP * commissionPct) / 100);
  const appliedDelivery = needsDelivery ? deliveryFeeEGP : 0;
  const netMerchantEGP = Math.max(0, subtotalEGP - platformCommissionEGP);

  try {
    await setDoc(doc(db, 'commercial_orders', orderId), {
      orderId,
      tenantId: item.tenantId,
      merchantOwnerUid: item.merchantOwnerUid,
      customerUid: customerUser.uid,
      customerName: clampText(customerUser.displayName || 'عميل منصة FAYD', 100),
      itemsSummary: clampText(`${item.title} × ${qty} (${item.storeName})`, 500),
      subtotalEGP,
      platformCommissionEGP,
      deliveryFeeEGP: appliedDelivery,
      netMerchantEGP,
      needsDelivery,
      dropoffAddress: clampText(dropoffAddress || 'الاستلام من الفرع', 240),
      status: 'pending_merchant',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      customerUser.uid,
      `إنشاء طلب تجاري ${orderId} لدى ${item.storeName}`,
      `Placed commercial order ${orderId}`,
      'commercial_orders',
      orderId,
      `الإجمالي: ${subtotalEGP} ج.م`
    );
    return orderId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, `commercial_orders/${orderId}`);
  }
}

export async function updateCommercialOrderStatus(
  actorUid: string,
  order: CommercialOrderDoc,
  nextStatus: CommercialOrderStatus
): Promise<void> {
  try {
    await updateDoc(doc(db, 'commercial_orders', order.orderId), {
      status: nextStatus,
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      actorUid,
      `تحديث حالة الطلب ${order.orderId} إلى ${nextStatus}`,
      `Updated order ${order.orderId} to ${nextStatus}`,
      'commercial_orders',
      order.orderId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `commercial_orders/${order.orderId}`);
  }
}

export async function createDeliveryRequest(
  requesterUser: User,
  tenant: TenantWorkspaceDoc,
  rule: CommissionRuleDoc,
  planDiscountPct: number,
  payload: {
    orderId?: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageNote?: string;
    baseDeliveryFeeEGP: number;
  }
): Promise<string> {
  const deliveryId = genId('del');
  const rawFee = Math.max(rule.minDeliveryFeeEGP, Number(payload.baseDeliveryFeeEGP) || rule.minDeliveryFeeEGP);
  const deliveryFeeEGP = Math.round(rawFee * (1 - Math.min(80, Math.max(0, planDiscountPct)) / 100));
  const platformDeliveryFeeEGP = Math.round((deliveryFeeEGP * rule.defaultDeliveryPlatformPct) / 100);
  const courierShareEGP = Math.max(0, deliveryFeeEGP - platformDeliveryFeeEGP);

  try {
    await setDoc(doc(db, 'delivery_requests', deliveryId), {
      deliveryId,
      requesterUid: requesterUser.uid,
      tenantId: tenant.tenantId,
      orderId: clampText(payload.orderId || '', 128),
      pickupLocation: clampText(payload.pickupLocation, 240),
      dropoffLocation: clampText(payload.dropoffLocation, 240),
      packageNote: clampText(payload.packageNote || '', 300),
      deliveryFeeEGP,
      courierShareEGP,
      platformDeliveryFeeEGP,
      assignedCourierUid: '',
      status: 'requested',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      requesterUser.uid,
      `طلب شحن FAYD Delivery رقم ${deliveryId}`,
      `Created delivery request ${deliveryId}`,
      'delivery_requests',
      deliveryId
    );
    return deliveryId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, `delivery_requests/${deliveryId}`);
  }
}

export async function adminAssignCourierToDelivery(
  adminUser: User,
  deliveryId: string,
  courierUid: string
): Promise<void> {
  try {
    await updateDoc(doc(db, 'delivery_requests', deliveryId), {
      assignedCourierUid: sanitizeId(courierUid),
      status: 'assigned',
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      `إسناد الشحنة ${deliveryId} إلى المندوب ${courierUid}`,
      `Assigned delivery ${deliveryId} to courier ${courierUid}`,
      'delivery_requests',
      deliveryId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `delivery_requests/${deliveryId}`);
  }
}

export async function courierAdvanceDeliveryStatus(
  courierUser: User,
  delivery: DeliveryRequestDoc,
  nextStatus: 'picked_up' | 'in_transit' | 'delivered',
  podNote?: string
): Promise<void> {
  try {
    await updateDoc(doc(db, 'delivery_requests', delivery.deliveryId), {
      status: nextStatus,
      ...(podNote ? { podConfirmationNote: clampText(podNote, 200) } : {}),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      courierUser.uid,
      `تحديث مهمة التوصيل ${delivery.deliveryId} إلى ${nextStatus}`,
      `Courier advanced delivery ${delivery.deliveryId} to ${nextStatus}`,
      'delivery_requests',
      delivery.deliveryId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `delivery_requests/${delivery.deliveryId}`);
  }
}

export async function courierToggleOnline(
  courierUser: User,
  isOnline: boolean,
  zone: string
): Promise<void> {
  try {
    await updateDoc(doc(db, 'couriers', courierUser.uid), {
      isOnline,
      zone: clampText(zone, 100),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `couriers/${courierUser.uid}`);
  }
}

export async function submitFaydOpportunity(
  user: User,
  payload: {
    oppKind: OpportunityKind;
    title: string;
    category: string;
    city: string;
    description: string;
    commercialTerms: string;
    costOrInvestmentEGP: number;
  }
): Promise<string> {
  if (!payload.costOrInvestmentEGP || payload.costOrInvestmentEGP <= 0) {
    throw new Error('يجب تحديد التكلفة أو رأس المال أو القيمة الإيجارية/التشغيلية بوضوح (يُمنع افتراض المجانية).');
  }
  const oppId = genId('opp');
  try {
    await setDoc(doc(db, 'opportunities', oppId), {
      oppId,
      ownerUid: user.uid,
      ownerName: clampText(user.displayName || 'شريك FAYD', 120),
      oppKind: payload.oppKind,
      title: clampText(payload.title, 160),
      category: clampText(payload.category, 80),
      city: clampText(payload.city, 80),
      description: clampText(payload.description, 800),
      commercialTerms: clampText(payload.commercialTerms, 500),
      costOrInvestmentEGP: Math.max(1, Math.round(payload.costOrInvestmentEGP)),
      freeResourceBlocked: true,
      approvalStatus: 'pending_admin',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      user.uid,
      `طرح فرصة ${payload.oppKind} للمراجعة: ${payload.title}`,
      `Submitted opportunity ${oppId}`,
      'opportunities',
      oppId
    );
    return oppId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, `opportunities/${oppId}`);
  }
}

export async function adminReviewOpportunity(
  adminUser: User,
  oppId: string,
  approvalStatus: 'approved' | 'rejected' | 'closed'
): Promise<void> {
  try {
    await updateDoc(doc(db, 'opportunities', oppId), {
      approvalStatus,
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      `مراجعة الفرصة ${oppId}: ${approvalStatus}`,
      `Reviewed opportunity ${oppId}: ${approvalStatus}`,
      'opportunities',
      oppId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `opportunities/${oppId}`);
  }
}

export async function submitUsufructProposal(
  proposerUser: User,
  opportunity: FaydOpportunityDoc,
  payload: {
    proposerProfitPct: number;
    siteOwnerProfitPct: number;
    platformUsufructPct: number;
    termsSummary: string;
  }
): Promise<string> {
  const total =
    Math.round(payload.proposerProfitPct) +
    Math.round(payload.siteOwnerProfitPct) +
    Math.round(payload.platformUsufructPct);
  if (total !== 100) {
    throw new Error('مجموع نسب توزيع الأرباح في تقنية الانتفاع يجب أن يساوي 100% بالضبط.');
  }

  const proposalId = genId('prop');
  try {
    await setDoc(doc(db, 'usufruct_proposals', proposalId), {
      proposalId,
      opportunityId: opportunity.oppId,
      opportunityOwnerUid: opportunity.ownerUid,
      proposerUid: proposerUser.uid,
      proposerName: clampText(proposerUser.displayName || 'شريك مشروع', 120),
      proposerProfitPct: Math.round(payload.proposerProfitPct),
      siteOwnerProfitPct: Math.round(payload.siteOwnerProfitPct),
      platformUsufructPct: Math.round(payload.platformUsufructPct),
      termsSummary: clampText(payload.termsSummary, 600),
      proposerAgreed: true,
      siteOwnerAgreed: false,
      adminApproved: false,
      status: 'awaiting_site_owner',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      proposerUser.uid,
      `تقديم مسودة اتفاق انتفاع ${proposalId} على الفرصة ${opportunity.title}`,
      `Submitted usufruct proposal ${proposalId}`,
      'usufruct_proposals',
      proposalId
    );
    return proposalId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.CREATE, `usufruct_proposals/${proposalId}`);
  }
}

export async function siteOwnerRespondUsufruct(
  ownerUser: User,
  proposalId: string,
  accept: boolean
): Promise<void> {
  try {
    await updateDoc(doc(db, 'usufruct_proposals', proposalId), {
      siteOwnerAgreed: accept,
      status: accept ? 'awaiting_admin' : 'rejected',
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      ownerUser.uid,
      accept
        ? `موافقة صاحب الفرصة على مسودة الانتفاع ${proposalId} (بانتظار اعتماد الإدارة)`
        : `رفض مسودة الانتفاع ${proposalId}`,
      `Site owner ${accept ? 'agreed' : 'rejected'} proposal ${proposalId}`,
      'usufruct_proposals',
      proposalId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `usufruct_proposals/${proposalId}`);
  }
}

export async function adminIssueUsufructContract(
  adminUser: User,
  proposal: UsufructProposalDoc
): Promise<string> {
  const contractId = genId('cnt');
  const batch = writeBatch(db);
  const now = serverTimestamp();

  try {
    batch.set(doc(db, 'usufruct_contracts', contractId), {
      contractId,
      proposalId: proposal.proposalId,
      opportunityId: proposal.opportunityId,
      opportunityOwnerUid: proposal.opportunityOwnerUid,
      proposerUid: proposal.proposerUid,
      proposerProfitPct: proposal.proposerProfitPct,
      siteOwnerProfitPct: proposal.siteOwnerProfitPct,
      platformUsufructPct: proposal.platformUsufructPct,
      commercialTerms: clampText(proposal.termsSummary, 600),
      approvedByAdminUid: adminUser.uid,
      contractStatus: 'active',
      createdAt: now,
      updatedAt: now,
    });

    batch.update(doc(db, 'usufruct_proposals', proposal.proposalId), {
      adminApproved: true,
      contractId,
      status: 'contract_issued',
      updatedAt: now,
    });

    const logId = genId('log');
    batch.set(doc(db, 'audit_logs', logId), {
      logId,
      actorUid: adminUser.uid,
      actionAr: `إصدار عقد انتفاع رسمي معتمد رقم ${contractId}`,
      actionEn: `Issued official Usufruct contract ${contractId}`,
      targetCollection: 'usufruct_contracts',
      targetId: contractId,
      details: `Proposal ${proposal.proposalId} | Split: ${proposal.proposerProfitPct}/${proposal.siteOwnerProfitPct}/${proposal.platformUsufructPct}`,
      createdAt: now,
    });

    await batch.commit();
    return contractId;
  } catch (error) {
    return handleFirestoreError(error, OperationType.WRITE, `usufruct_contracts/${contractId}`);
  }
}

export async function adminSaveCommissionRules(
  adminUser: User,
  rule: Omit<CommissionRuleDoc, 'ruleId' | 'updatedAt'>
): Promise<void> {
  const platformPct = Math.max(0, Math.min(80, Math.round(rule.defaultDeliveryPlatformPct)));
  const courierPct = 100 - platformPct;
  try {
    await setDoc(doc(db, 'commission_rules', 'global'), {
      ruleId: 'global',
      defaultOrderCommissionPct: Math.max(0, Math.min(60, Number(rule.defaultOrderCommissionPct) || 0)),
      defaultDeliveryPlatformPct: platformPct,
      defaultCourierSharePct: courierPct,
      defaultUsufructPlatformPct: Math.max(1, Math.min(50, Number(rule.defaultUsufructPlatformPct) || 1)),
      minDeliveryFeeEGP: Math.max(10, Math.min(10000, Number(rule.minDeliveryFeeEGP) || 10)),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      'تحديث قواعد العمولات المركزية للشركة',
      'Updated global commission rules',
      'commission_rules',
      'global'
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'commission_rules/global');
  }
}

export async function adminSaveSubscriptionPlan(
  adminUser: User,
  plan: Omit<SubscriptionPlanDoc, 'updatedAt'>
): Promise<void> {
  const planId = sanitizeId(plan.planId);
  try {
    await setDoc(doc(db, 'subscription_plans', planId), {
      planId,
      nameAr: clampText(plan.nameAr, 100),
      nameEn: clampText(plan.nameEn, 100),
      monthlyFeeEGP: Math.max(0, Number(plan.monthlyFeeEGP) || 0),
      orderCommissionPct: Math.max(0, Math.min(60, Number(plan.orderCommissionPct) || 0)),
      deliveryDiscountPct: Math.max(0, Math.min(100, Number(plan.deliveryDiscountPct) || 0)),
      isActive: plan.isActive,
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      `تحديث باقة الاشتراك ${plan.nameAr}`,
      `Updated subscription plan ${planId}`,
      'subscription_plans',
      planId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `subscription_plans/${planId}`);
  }
}

export async function adminToggleTenantStatus(
  adminUser: User,
  tenant: TenantWorkspaceDoc,
  nextStatus: 'active' | 'suspended',
  customCommissionPct?: number
): Promise<void> {
  const batch = writeBatch(db);
  const now = serverTimestamp();
  try {
    batch.update(doc(db, 'tenants', tenant.tenantId), {
      status: nextStatus,
      ...(typeof customCommissionPct === 'number'
        ? { customCommissionPct: Math.max(0, Math.min(60, customCommissionPct)) }
        : {}),
      updatedAt: now,
    });
    batch.update(doc(db, 'public_storefronts', tenant.tenantId), {
      isActive: nextStatus === 'active' && tenant.entityType !== 'delivery_client',
      updatedAt: now,
    });
    const logId = genId('log');
    batch.set(doc(db, 'audit_logs', logId), {
      logId,
      actorUid: adminUser.uid,
      actionAr: `تعديل حالة الجهة ${tenant.name} إلى ${nextStatus}`,
      actionEn: `Updated tenant ${tenant.tenantId} status to ${nextStatus}`,
      targetCollection: 'tenants',
      targetId: tenant.tenantId,
      createdAt: now,
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `tenants/${tenant.tenantId}`);
  }
}

export async function adminRecordAndSettleOrderRevenue(
  adminUser: User,
  order: CommercialOrderDoc
): Promise<void> {
  const entryId = genId('led');
  try {
    await setDoc(doc(db, 'ledger_settlements', entryId), {
      entryId,
      sourceType: 'order_commission',
      referenceId: order.orderId,
      tenantId: order.tenantId,
      beneficiaryUid: order.merchantOwnerUid,
      grossAmountEGP: order.subtotalEGP,
      platformRevenueEGP: order.platformCommissionEGP,
      beneficiaryNetEGP: order.netMerchantEGP,
      settlementStatus: 'accrued',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      `قيد عمولة الطلب ${order.orderId}`,
      `Recorded order commission ledger ${entryId}`,
      'ledger_settlements',
      entryId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `ledger_settlements/${entryId}`);
  }
}

export async function adminRecordDeliveryLedger(
  adminUser: User,
  delivery: DeliveryRequestDoc
): Promise<void> {
  if (!delivery.assignedCourierUid) return;
  const entryId = genId('led');
  const courierRef = doc(db, 'couriers', delivery.assignedCourierUid);
  const batch = writeBatch(db);
  const now = serverTimestamp();

  try {
    const cSnap = await getDoc(courierRef);
    batch.set(doc(db, 'ledger_settlements', entryId), {
      entryId,
      sourceType: 'delivery_fee',
      referenceId: delivery.deliveryId,
      tenantId: delivery.tenantId,
      beneficiaryUid: delivery.assignedCourierUid,
      grossAmountEGP: delivery.deliveryFeeEGP,
      platformRevenueEGP: delivery.platformDeliveryFeeEGP,
      beneficiaryNetEGP: delivery.courierShareEGP,
      settlementStatus: 'accrued',
      createdAt: now,
      updatedAt: now,
    });

    if (cSnap.exists()) {
      const cData = cSnap.data() as CourierProfileDoc;
      batch.update(courierRef, {
        walletBalanceEGP: Math.round((cData.walletBalanceEGP || 0) + delivery.courierShareEGP),
        completedDeliveries: (cData.completedDeliveries || 0) + 1,
        updatedAt: now,
      });
    }
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `ledger_settlements/${entryId}`);
  }
}

export async function adminSettleLedgerEntry(
  adminUser: User,
  entryId: string
): Promise<void> {
  try {
    await updateDoc(doc(db, 'ledger_settlements', entryId), {
      settlementStatus: 'settled',
      updatedAt: serverTimestamp(),
    });
    await appendSecurityAudit(
      adminUser.uid,
      `تسوية القيد المالي ${entryId}`,
      `Settled ledger entry ${entryId}`,
      'ledger_settlements',
      entryId
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `ledger_settlements/${entryId}`);
  }
}

export function subscribePublicDirectory(callbacks: {
  onStorefronts: (rows: PublicStorefrontDoc[]) => void;
  onCatalogItems: (rows: CatalogItemDoc[]) => void;
  onPlans: (rows: SubscriptionPlanDoc[]) => void;
  onOpportunities: (rows: FaydOpportunityDoc[]) => void;
}): Unsubscribe {
  const unsubs: Unsubscribe[] = [];

  unsubs.push(
    onSnapshot(
      query(collection(db, 'public_storefronts'), where('isActive', '==', true)),
      (snap) => {
        callbacks.onStorefronts(snap.docs.map((d) => d.data() as PublicStorefrontDoc));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'public_storefronts')
    )
  );

  unsubs.push(
    onSnapshot(
      query(collection(db, 'catalog_items'), where('isAvailable', '==', true)),
      (snap) => {
        callbacks.onCatalogItems(snap.docs.map((d) => d.data() as CatalogItemDoc));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'catalog_items')
    )
  );

  unsubs.push(
    onSnapshot(
      query(collection(db, 'subscription_plans'), where('isActive', '==', true)),
      (snap) => {
        const docs = snap.docs.map((d) => d.data() as SubscriptionPlanDoc);
        callbacks.onPlans(docs.length > 0 ? docs : (DEFAULT_SUBSCRIPTION_PLANS as SubscriptionPlanDoc[]));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'subscription_plans')
    )
  );

  unsubs.push(
    onSnapshot(
      query(collection(db, 'opportunities'), where('approvalStatus', '==', 'approved')),
      (snap) => {
        callbacks.onOpportunities(snap.docs.map((d) => d.data() as FaydOpportunityDoc));
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'opportunities')
    )
  );

  return () => unsubs.forEach((u) => u());
}
