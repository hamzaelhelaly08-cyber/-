import React, { useState } from 'react';
import {
  UserPlus,
  Store,
  Truck,
  Navigation,
  Briefcase,
  ShieldCheck,
  LogIn,
  LogOut,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import type { CountryCode, LanguageCode } from '../../data/phase1Data';
import { useFaydEcosystem } from '../../hooks/useFaydEcosystem';
import { PartnerOnboardingPortal } from './PartnerOnboardingPortal';
import { MerchantWorkspaceView } from './MerchantWorkspaceView';
import { FaydDeliveryPartnerView } from './FaydDeliveryPartnerView';
import { CourierPortalView } from './CourierPortalView';
import { FaydOpportunitiesUsufructView } from './FaydOpportunitiesUsufructView';
import { CentralAdminGovernanceView } from './CentralAdminGovernanceView';

export type FaydPortalTab =
  | 'onboarding'
  | 'merchant'
  | 'delivery'
  | 'courier'
  | 'opportunities'
  | 'central_admin';

interface FaydEcosystemHubProps {
  lang: LanguageCode;
  countryCode: CountryCode;
  onExportContractPdf: (companyTitle: string) => void;
  onShowToast: (msg: string) => void;
  onBackHome: () => void;
}

export const FaydEcosystemHub: React.FC<FaydEcosystemHubProps> = ({
  lang,
  countryCode,
  onExportContractPdf,
  onShowToast,
  onBackHome,
}) => {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const [activePortal, setActivePortal] = useState<FaydPortalTab>('onboarding');

  const eco = useFaydEcosystem(countryCode);

  const handleRequireSignIn = async () => {
    try {
      await eco.signInWithGoogle();
      onShowToast(
        isRtl
          ? 'تم تسجيل الدخول وربط الجلسة بقاعدة البيانات السحابية بنجاح.'
          : 'Signed in and connected to cloud database.'
      );
    } catch {
      onShowToast(
        isRtl
          ? 'تعذر إتمام تسجيل الدخول عبر Google، يرجى المحاولة مرة أخرى.'
          : 'Google sign-in was cancelled or failed.'
      );
    }
  };

  const portalTabs: {
    id: FaydPortalTab;
    labelAr: string;
    labelEn: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'onboarding',
      labelAr: 'بوابة الانضمام',
      labelEn: 'Partner Onboarding',
      icon: <UserPlus className="w-4 h-4" />,
    },
    {
      id: 'merchant',
      labelAr: 'المتاجر ومساحة التاجر',
      labelEn: 'Merchant Workspace',
      icon: <Store className="w-4 h-4" />,
    },
    {
      id: 'delivery',
      labelAr: 'FAYD Delivery للجهات',
      labelEn: 'FAYD Delivery',
      icon: <Truck className="w-4 h-4" />,
    },
    {
      id: 'courier',
      labelAr: 'بوابة المندوبين',
      labelEn: 'Courier Portal',
      icon: <Navigation className="w-4 h-4" />,
    },
    {
      id: 'opportunities',
      labelAr: 'الفرص والانتفاع',
      labelEn: 'Opportunities & Usufruct',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'central_admin',
      labelAr: 'الإدارة والعمولات',
      labelEn: 'Central Admin & Revenue',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-5 pb-12">
      {/* Top Action & Auth Identity Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#FF6B00] text-xs font-extrabold text-slate-800 dark:text-white shadow-xs cursor-pointer"
        >
          <BackIcon className="w-4 h-4 text-[#FF6B00]" />
          <span>{isRtl ? 'العودة للرئيسية' : 'Back Home'}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {eco.firebaseUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
              <div className="min-w-0">
                <span className="font-black text-slate-900 dark:text-white block truncate max-w-[160px]">
                  {eco.firebaseUser.displayName || eco.firebaseUser.email}
                </span>
                <span className="text-[10px] font-bold text-[#FF6B00]">
                  {eco.isAdmin
                    ? 'Central Admin'
                    : eco.userProfile?.role || 'customer'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => eco.signOutAccount()}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-red-600 cursor-pointer"
                title={isRtl ? 'تسجيل الخروج' : 'Sign Out'}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              disabled={eco.authLoading}
              onClick={handleRequireSignIn}
              className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>
                {eco.authLoading
                  ? isRtl ? 'جاري الاتصال...' : 'Signing in...'
                  : isRtl ? 'دخول بحساب Google للمنظومة' : 'Sign in with Google'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Dedicated Isolated Workspace Selector */}
      <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {portalTabs.map((tab) => {
            const active = activePortal === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePortal(tab.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#FF6B00] text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-800 hover:text-[#FF6B00]'
                }`}
              >
                {tab.icon}
                <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Workspace Screen */}
      {activePortal === 'onboarding' && (
        <PartnerOnboardingPortal
          lang={lang}
          countryCode={countryCode}
          user={eco.firebaseUser}
          onRequireSignIn={handleRequireSignIn}
          plans={eco.subscriptionPlans}
          myApplications={eco.myApplications}
          onToast={onShowToast}
        />
      )}

      {activePortal === 'merchant' && (
        <MerchantWorkspaceView
          lang={lang}
          user={eco.firebaseUser}
          onRequireSignIn={handleRequireSignIn}
          onGoToOnboarding={() => setActivePortal('onboarding')}
          myTenant={eco.myTenant}
          myMerchantCatalog={eco.myMerchantCatalog}
          myMerchantOrders={eco.myMerchantOrders}
          myCustomerOrders={eco.myCustomerOrders}
          myLedgerEntries={eco.myLedgerEntries}
          publicStorefronts={eco.publicStorefronts}
          publicCatalogItems={eco.publicCatalogItems}
          plans={eco.subscriptionPlans}
          commissionRule={eco.commissionRule}
          onToast={onShowToast}
        />
      )}

      {activePortal === 'delivery' && (
        <FaydDeliveryPartnerView
          lang={lang}
          user={eco.firebaseUser}
          onRequireSignIn={handleRequireSignIn}
          onGoToOnboarding={() => setActivePortal('onboarding')}
          myTenant={eco.myTenant}
          myDeliveryRequests={eco.myDeliveryRequests}
          commissionRule={eco.commissionRule}
          plans={eco.subscriptionPlans}
          onToast={onShowToast}
        />
      )}

      {activePortal === 'courier' && (
        <CourierPortalView
          lang={lang}
          user={eco.firebaseUser}
          onRequireSignIn={handleRequireSignIn}
          onGoToOnboarding={() => setActivePortal('onboarding')}
          myCourierProfile={eco.myCourierProfile}
          myAssignedDeliveries={eco.myAssignedDeliveries}
          onToast={onShowToast}
        />
      )}

      {activePortal === 'opportunities' && (
        <FaydOpportunitiesUsufructView
          lang={lang}
          user={eco.firebaseUser}
          onRequireSignIn={handleRequireSignIn}
          approvedOpportunities={eco.approvedOpportunities}
          myOpportunities={eco.myOpportunities}
          myProposalsAsProposer={eco.myProposalsAsProposer}
          myProposalsAsOwner={eco.myProposalsAsOwner}
          myContractsAsProposer={eco.myContractsAsProposer}
          myContractsAsOwner={eco.myContractsAsOwner}
          commissionRule={eco.commissionRule}
          onExportContractPdf={onExportContractPdf}
          onToast={onShowToast}
        />
      )}

      {activePortal === 'central_admin' && (
        <CentralAdminGovernanceView
          lang={lang}
          user={eco.firebaseUser}
          isAdmin={eco.isAdmin}
          onRequireSignIn={handleRequireSignIn}
          allApplications={eco.allApplications}
          allTenants={eco.allTenants}
          allCouriers={eco.allCouriers}
          allDeliveries={eco.allDeliveries}
          allOrders={eco.allOrders}
          allOpportunities={eco.allOpportunities}
          allProposals={eco.allProposals}
          allContracts={eco.allContracts}
          subscriptionPlans={eco.subscriptionPlans}
          commissionRule={eco.commissionRule}
          allLedgerEntries={eco.allLedgerEntries}
          auditLogs={eco.auditLogs}
          onToast={onShowToast}
        />
      )}
    </div>
  );
};
