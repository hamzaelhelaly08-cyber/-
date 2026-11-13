import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, onSnapshot, query, Unsubscribe, where } from 'firebase/firestore';
import {
  auth,
  db,
  ecosystemGoogleSignIn,
  handleFirestoreError,
  logout,
  OperationType,
  testFirestoreConnection,
} from '../lib/firebase';
import type { CountryCode } from '../data/phase1Data';
import {
  DEFAULT_COMMISSION_RULE,
  DEFAULT_SUBSCRIPTION_PLANS,
  ensureUserProfileAndDefaults,
  isUserBootstrappedAdmin,
  subscribePublicDirectory,
} from '../services/faydFirestoreService';
import type {
  CatalogItemDoc,
  CommercialOrderDoc,
  CommissionRuleDoc,
  CourierProfileDoc,
  DeliveryRequestDoc,
  FaydOpportunityDoc,
  LedgerSettlementDoc,
  OnboardingApplicationDoc,
  PublicStorefrontDoc,
  SecurityAuditLogDoc,
  SubscriptionPlanDoc,
  TenantWorkspaceDoc,
  UserProfileDoc,
  UsufructContractDoc,
  UsufructProposalDoc,
} from '../types/faydEcosystem';

export function useFaydEcosystem(countryCode: CountryCode) {
  const [authReady, setAuthReady] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [dbConnected, setDbConnected] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfileDoc | null>(null);
  const [publicStorefronts, setPublicStorefronts] = useState<PublicStorefrontDoc[]>([]);
  const [publicCatalogItems, setPublicCatalogItems] = useState<CatalogItemDoc[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlanDoc[]>(
    DEFAULT_SUBSCRIPTION_PLANS as SubscriptionPlanDoc[]
  );
  const [commissionRule, setCommissionRule] = useState<CommissionRuleDoc>(
    DEFAULT_COMMISSION_RULE as CommissionRuleDoc
  );
  const [approvedOpportunities, setApprovedOpportunities] = useState<FaydOpportunityDoc[]>([]);

  const [myApplications, setMyApplications] = useState<OnboardingApplicationDoc[]>([]);
  const [allApplications, setAllApplications] = useState<OnboardingApplicationDoc[]>([]);
  const [myTenants, setMyTenants] = useState<TenantWorkspaceDoc[]>([]);
  const [allTenants, setAllTenants] = useState<TenantWorkspaceDoc[]>([]);
  const [myMerchantCatalog, setMyMerchantCatalog] = useState<CatalogItemDoc[]>([]);
  const [myMerchantOrders, setMyMerchantOrders] = useState<CommercialOrderDoc[]>([]);
  const [myCustomerOrders, setMyCustomerOrders] = useState<CommercialOrderDoc[]>([]);
  const [allOrders, setAllOrders] = useState<CommercialOrderDoc[]>([]);

  const [myDeliveryRequests, setMyDeliveryRequests] = useState<DeliveryRequestDoc[]>([]);
  const [myAssignedDeliveries, setMyAssignedDeliveries] = useState<DeliveryRequestDoc[]>([]);
  const [allDeliveries, setAllDeliveries] = useState<DeliveryRequestDoc[]>([]);

  const [myCourierProfile, setMyCourierProfile] = useState<CourierProfileDoc | null>(null);
  const [allCouriers, setAllCouriers] = useState<CourierProfileDoc[]>([]);

  const [myOpportunities, setMyOpportunities] = useState<FaydOpportunityDoc[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<FaydOpportunityDoc[]>([]);

  const [myProposalsAsProposer, setMyProposalsAsProposer] = useState<UsufructProposalDoc[]>([]);
  const [myProposalsAsOwner, setMyProposalsAsOwner] = useState<UsufructProposalDoc[]>([]);
  const [allProposals, setAllProposals] = useState<UsufructProposalDoc[]>([]);

  const [myContractsAsProposer, setMyContractsAsProposer] = useState<UsufructContractDoc[]>([]);
  const [myContractsAsOwner, setMyContractsAsOwner] = useState<UsufructContractDoc[]>([]);
  const [allContracts, setAllContracts] = useState<UsufructContractDoc[]>([]);

  const [myLedgerEntries, setMyLedgerEntries] = useState<LedgerSettlementDoc[]>([]);
  const [allLedgerEntries, setAllLedgerEntries] = useState<LedgerSettlementDoc[]>([]);
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLogDoc[]>([]);

  const isBootAdmin = isUserBootstrappedAdmin(firebaseUser);
  const isAdmin =
    isBootAdmin ||
    userProfile?.role === 'central_super_admin' ||
    userProfile?.role === 'finance_admin';

  // Boot: verify Firestore connection & track Firebase Auth state
  useEffect(() => {
    let active = true;
    testFirestoreConnection().then((ok) => {
      if (active) setDbConnected(ok);
    });

    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!active) return;
      setFirebaseUser(user);
      setAuthReady(true);
      if (user && user.emailVerified) {
        try {
          await ensureUserProfileAndDefaults(user, countryCode);
        } catch (err) {
          console.error('Profile initialization error:', err);
        }
      } else {
        setUserProfile(null);
        setMyApplications([]);
        setAllApplications([]);
        setMyTenants([]);
        setAllTenants([]);
        setMyMerchantCatalog([]);
        setMyMerchantOrders([]);
        setMyCustomerOrders([]);
        setAllOrders([]);
        setMyDeliveryRequests([]);
        setMyAssignedDeliveries([]);
        setAllDeliveries([]);
        setMyCourierProfile(null);
        setAllCouriers([]);
        setMyOpportunities([]);
        setAllOpportunities([]);
        setMyProposalsAsProposer([]);
        setMyProposalsAsOwner([]);
        setAllProposals([]);
        setMyContractsAsProposer([]);
        setMyContractsAsOwner([]);
        setAllContracts([]);
        setMyLedgerEntries([]);
        setAllLedgerEntries([]);
        setAuditLogs([]);
      }
    });

    return () => {
      active = false;
      unsubAuth();
    };
  }, [countryCode]);

  // Public Directory listeners (only attached once authReady, using rule-compliant queries)
  useEffect(() => {
    if (!authReady) return;
    const unsubPublic = subscribePublicDirectory({
      onStorefronts: setPublicStorefronts,
      onCatalogItems: setPublicCatalogItems,
      onPlans: setSubscriptionPlans,
      onOpportunities: setApprovedOpportunities,
    });
    return () => unsubPublic();
  }, [authReady]);

  // Authenticated & Role-Isolated Listeners
  useEffect(() => {
    if (!authReady || !firebaseUser || !firebaseUser.emailVerified) return;

    const uid = firebaseUser.uid;
    const unsubs: Unsubscribe[] = [];

    unsubs.push(
      onSnapshot(
        doc(db, 'users', uid),
        (snap) => {
          setUserProfile(snap.exists() ? (snap.data() as UserProfileDoc) : null);
        },
        (error) => handleFirestoreError(error, OperationType.GET, `users/${uid}`)
      )
    );

    unsubs.push(
      onSnapshot(
        doc(db, 'commission_rules', 'global'),
        (snap) => {
          if (snap.exists()) {
            setCommissionRule(snap.data() as CommissionRuleDoc);
          }
        },
        (error) => handleFirestoreError(error, OperationType.GET, 'commission_rules/global')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'onboarding_applications'), where('applicantUid', '==', uid)),
        (snap) => setMyApplications(snap.docs.map((d) => d.data() as OnboardingApplicationDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'onboarding_applications')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'tenants'), where('ownerUid', '==', uid)),
        (snap) => setMyTenants(snap.docs.map((d) => d.data() as TenantWorkspaceDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'tenants')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'catalog_items'), where('merchantOwnerUid', '==', uid)),
        (snap) => setMyMerchantCatalog(snap.docs.map((d) => d.data() as CatalogItemDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'catalog_items')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'commercial_orders'), where('merchantOwnerUid', '==', uid)),
        (snap) => setMyMerchantOrders(snap.docs.map((d) => d.data() as CommercialOrderDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'commercial_orders')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'commercial_orders'), where('customerUid', '==', uid)),
        (snap) => setMyCustomerOrders(snap.docs.map((d) => d.data() as CommercialOrderDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'commercial_orders')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'delivery_requests'), where('requesterUid', '==', uid)),
        (snap) => setMyDeliveryRequests(snap.docs.map((d) => d.data() as DeliveryRequestDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'delivery_requests')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'delivery_requests'), where('assignedCourierUid', '==', uid)),
        (snap) => setMyAssignedDeliveries(snap.docs.map((d) => d.data() as DeliveryRequestDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'delivery_requests')
      )
    );

    unsubs.push(
      onSnapshot(
        doc(db, 'couriers', uid),
        (snap) => setMyCourierProfile(snap.exists() ? (snap.data() as CourierProfileDoc) : null),
        (error) => handleFirestoreError(error, OperationType.GET, `couriers/${uid}`)
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'opportunities'), where('ownerUid', '==', uid)),
        (snap) => setMyOpportunities(snap.docs.map((d) => d.data() as FaydOpportunityDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'opportunities')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'usufruct_proposals'), where('proposerUid', '==', uid)),
        (snap) => setMyProposalsAsProposer(snap.docs.map((d) => d.data() as UsufructProposalDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'usufruct_proposals')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'usufruct_proposals'), where('opportunityOwnerUid', '==', uid)),
        (snap) => setMyProposalsAsOwner(snap.docs.map((d) => d.data() as UsufructProposalDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'usufruct_proposals')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'usufruct_contracts'), where('proposerUid', '==', uid)),
        (snap) => setMyContractsAsProposer(snap.docs.map((d) => d.data() as UsufructContractDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'usufruct_contracts')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'usufruct_contracts'), where('opportunityOwnerUid', '==', uid)),
        (snap) => setMyContractsAsOwner(snap.docs.map((d) => d.data() as UsufructContractDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'usufruct_contracts')
      )
    );

    unsubs.push(
      onSnapshot(
        query(collection(db, 'ledger_settlements'), where('beneficiaryUid', '==', uid)),
        (snap) => setMyLedgerEntries(snap.docs.map((d) => d.data() as LedgerSettlementDoc)),
        (error) => handleFirestoreError(error, OperationType.LIST, 'ledger_settlements')
      )
    );

    if (isBootAdmin) {
      unsubs.push(
        onSnapshot(
          collection(db, 'onboarding_applications'),
          (snap) => setAllApplications(snap.docs.map((d) => d.data() as OnboardingApplicationDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'onboarding_applications')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'tenants'),
          (snap) => setAllTenants(snap.docs.map((d) => d.data() as TenantWorkspaceDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'tenants')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'commercial_orders'),
          (snap) => setAllOrders(snap.docs.map((d) => d.data() as CommercialOrderDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'commercial_orders')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'couriers'),
          (snap) => setAllCouriers(snap.docs.map((d) => d.data() as CourierProfileDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'couriers')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'delivery_requests'),
          (snap) => setAllDeliveries(snap.docs.map((d) => d.data() as DeliveryRequestDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'delivery_requests')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'opportunities'),
          (snap) => setAllOpportunities(snap.docs.map((d) => d.data() as FaydOpportunityDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'opportunities')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'usufruct_proposals'),
          (snap) => setAllProposals(snap.docs.map((d) => d.data() as UsufructProposalDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'usufruct_proposals')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'usufruct_contracts'),
          (snap) => setAllContracts(snap.docs.map((d) => d.data() as UsufructContractDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'usufruct_contracts')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'ledger_settlements'),
          (snap) => setAllLedgerEntries(snap.docs.map((d) => d.data() as LedgerSettlementDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'ledger_settlements')
        )
      );
      unsubs.push(
        onSnapshot(
          collection(db, 'audit_logs'),
          (snap) => setAuditLogs(snap.docs.map((d) => d.data() as SecurityAuditLogDoc)),
          (error) => handleFirestoreError(error, OperationType.LIST, 'audit_logs')
        )
      );
    }

    return () => unsubs.forEach((u) => u());
  }, [authReady, firebaseUser, isBootAdmin]);

  const signInWithGoogle = async () => {
    setAuthLoading(true);
    try {
      await ecosystemGoogleSignIn();
    } finally {
      setAuthLoading(false);
    }
  };

  const signOutAccount = async () => {
    await logout();
  };

  return {
    authReady,
    firebaseUser,
    dbConnected,
    authLoading,
    signInWithGoogle,
    signOutAccount,
    isAdmin,
    isBootAdmin,
    userProfile,
    publicStorefronts,
    publicCatalogItems,
    subscriptionPlans,
    commissionRule,
    approvedOpportunities,
    myApplications,
    allApplications,
    myTenant: myTenants[0] || null,
    myTenants,
    allTenants,
    myMerchantCatalog,
    myMerchantOrders,
    myCustomerOrders,
    allOrders,
    myDeliveryRequests,
    myAssignedDeliveries,
    allDeliveries,
    myCourierProfile,
    allCouriers,
    myOpportunities,
    allOpportunities,
    myProposalsAsProposer,
    myProposalsAsOwner,
    allProposals,
    myContractsAsProposer,
    myContractsAsOwner,
    allContracts,
    myLedgerEntries,
    allLedgerEntries,
    auditLogs,
  };
}
