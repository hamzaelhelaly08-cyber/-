import type { Timestamp } from 'firebase/firestore';
import type { CountryCode } from '../data/phase1Data';

export type FaydRole =
  | 'visitor'
  | 'customer'
  | 'merchant_owner'
  | 'merchant_staff'
  | 'delivery_client'
  | 'courier'
  | 'opportunity_partner'
  | 'finance_admin'
  | 'central_super_admin';

export type OnboardingTargetRole =
  | 'merchant_owner'
  | 'delivery_client'
  | 'courier'
  | 'opportunity_partner';

export type OnboardingEntityType =
  | 'restaurant'
  | 'store'
  | 'central_kitchen'
  | 'company_factory'
  | 'courier_individual'
  | 'project_owner'
  | 'site_owner';

export type TenantEntityType =
  | 'restaurant'
  | 'store'
  | 'central_kitchen'
  | 'company_factory'
  | 'delivery_client';

export type OnboardingStatus = 'pending_review' | 'needs_info' | 'approved' | 'rejected';
export type CommercialOrderStatus =
  | 'pending_merchant'
  | 'accepted_preparing'
  | 'ready_for_pickup'
  | 'in_delivery'
  | 'completed'
  | 'cancelled';

export type DeliveryStatus =
  | 'requested'
  | 'assigned'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type OpportunityKind = 'project_expertise' | 'commercial_site';
export type OpportunityApprovalStatus = 'pending_admin' | 'approved' | 'rejected' | 'closed';

export type UsufructProposalStatus =
  | 'awaiting_site_owner'
  | 'awaiting_admin'
  | 'contract_issued'
  | 'rejected';

export type LedgerSourceType =
  | 'order_commission'
  | 'delivery_fee'
  | 'subscription'
  | 'usufruct_share';

export const BOOTSTRAPPED_ADMIN_EMAIL = 'hamzaelhelaly08@gmail.com';
export const SAFE_ID_REGEX = /^[a-zA-Z0-9_-]{1,128}$/;

export function sanitizeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
}

export function clampText(raw: string, maxLen: number): string {
  return raw.trim().slice(0, maxLen);
}

export interface UserProfileDoc {
  uid: string;
  displayName: string;
  role: FaydRole;
  tenantId?: string;
  status: 'active' | 'pending' | 'suspended';
  countryCode: CountryCode;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface UserPrivateProfileDoc {
  uid: string;
  email: string;
  phone?: string;
  nationalOrTaxId?: string;
  address?: string;
  updatedAt?: Timestamp;
}

export interface OnboardingApplicationDoc {
  appId: string;
  applicantUid: string;
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
  status: OnboardingStatus;
  adminComment?: string;
  reviewedByUid?: string;
  createdTenantId?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TenantWorkspaceDoc {
  tenantId: string;
  ownerUid: string;
  name: string;
  entityType: TenantEntityType;
  countryCode: CountryCode;
  city: string;
  commercialRegRef: string;
  planId: string;
  customCommissionPct: number;
  deliveryEnabled: boolean;
  status: 'active' | 'suspended';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface PublicStorefrontDoc {
  tenantId: string;
  name: string;
  entityType: TenantEntityType;
  countryCode: CountryCode;
  city: string;
  isActive: boolean;
  updatedAt?: Timestamp;
}

export interface CatalogItemDoc {
  itemId: string;
  tenantId: string;
  merchantOwnerUid: string;
  storeName: string;
  title: string;
  category: string;
  priceEGP: number;
  stockQty: number;
  isAvailable: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CommercialOrderDoc {
  orderId: string;
  tenantId: string;
  merchantOwnerUid: string;
  customerUid: string;
  customerName: string;
  itemsSummary: string;
  subtotalEGP: number;
  platformCommissionEGP: number;
  deliveryFeeEGP: number;
  netMerchantEGP: number;
  needsDelivery: boolean;
  dropoffAddress: string;
  status: CommercialOrderStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CourierProfileDoc {
  courierUid: string;
  fullName: string;
  vehicleType: 'motorcycle' | 'car' | 'chilled_van' | 'truck';
  zone: string;
  isOnline: boolean;
  isApproved: boolean;
  walletBalanceEGP: number;
  completedDeliveries: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface DeliveryRequestDoc {
  deliveryId: string;
  requesterUid: string;
  tenantId: string;
  orderId?: string;
  pickupLocation: string;
  dropoffLocation: string;
  packageNote?: string;
  deliveryFeeEGP: number;
  courierShareEGP: number;
  platformDeliveryFeeEGP: number;
  assignedCourierUid: string;
  podConfirmationNote?: string;
  status: DeliveryStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface FaydOpportunityDoc {
  oppId: string;
  ownerUid: string;
  ownerName: string;
  oppKind: OpportunityKind;
  title: string;
  category: string;
  city: string;
  description: string;
  commercialTerms: string;
  costOrInvestmentEGP: number;
  freeResourceBlocked: true;
  approvalStatus: OpportunityApprovalStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface UsufructProposalDoc {
  proposalId: string;
  opportunityId: string;
  opportunityOwnerUid: string;
  proposerUid: string;
  proposerName: string;
  proposerProfitPct: number;
  siteOwnerProfitPct: number;
  platformUsufructPct: number;
  termsSummary: string;
  proposerAgreed: boolean;
  siteOwnerAgreed: boolean;
  adminApproved: boolean;
  contractId?: string;
  status: UsufructProposalStatus;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface UsufructContractDoc {
  contractId: string;
  proposalId: string;
  opportunityId: string;
  opportunityOwnerUid: string;
  proposerUid: string;
  proposerProfitPct: number;
  siteOwnerProfitPct: number;
  platformUsufructPct: number;
  commercialTerms: string;
  approvedByAdminUid: string;
  contractStatus: 'active' | 'completed' | 'terminated';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface SubscriptionPlanDoc {
  planId: string;
  nameAr: string;
  nameEn: string;
  monthlyFeeEGP: number;
  orderCommissionPct: number;
  deliveryDiscountPct: number;
  isActive: boolean;
  updatedAt?: Timestamp;
}

export interface CommissionRuleDoc {
  ruleId: string;
  defaultOrderCommissionPct: number;
  defaultDeliveryPlatformPct: number;
  defaultCourierSharePct: number;
  defaultUsufructPlatformPct: number;
  minDeliveryFeeEGP: number;
  updatedAt?: Timestamp;
}

export interface LedgerSettlementDoc {
  entryId: string;
  sourceType: LedgerSourceType;
  referenceId: string;
  tenantId?: string;
  beneficiaryUid: string;
  grossAmountEGP: number;
  platformRevenueEGP: number;
  beneficiaryNetEGP: number;
  settlementStatus: 'accrued' | 'settled';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface SecurityAuditLogDoc {
  logId: string;
  actorUid: string;
  actionAr: string;
  actionEn: string;
  targetCollection: string;
  targetId: string;
  details?: string;
  createdAt?: Timestamp;
}
