import React, { useState } from 'react';
import {
  Store,
  Plus,
  Package,
  ShoppingBag,
  Wallet,
  Lock,
  Truck,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import type { User } from 'firebase/auth';
import type { LanguageCode } from '../../data/phase1Data';
import type {
  CatalogItemDoc,
  CommercialOrderDoc,
  CommercialOrderStatus,
  CommissionRuleDoc,
  LedgerSettlementDoc,
  PublicStorefrontDoc,
  SubscriptionPlanDoc,
  TenantWorkspaceDoc,
} from '../../types/faydEcosystem';
import {
  createDeliveryRequest,
  placeCommercialOrder,
  saveCatalogItem,
  updateCommercialOrderStatus,
} from '../../services/faydFirestoreService';

interface MerchantWorkspaceViewProps {
  lang: LanguageCode;
  user: User | null;
  onRequireSignIn: () => void;
  onGoToOnboarding: () => void;
  myTenant: TenantWorkspaceDoc | null;
  myMerchantCatalog: CatalogItemDoc[];
  myMerchantOrders: CommercialOrderDoc[];
  myCustomerOrders: CommercialOrderDoc[];
  myLedgerEntries: LedgerSettlementDoc[];
  publicStorefronts: PublicStorefrontDoc[];
  publicCatalogItems: CatalogItemDoc[];
  plans: SubscriptionPlanDoc[];
  commissionRule: CommissionRuleDoc;
  onToast: (msg: string) => void;
}

export const MerchantWorkspaceView: React.FC<MerchantWorkspaceViewProps> = ({
  lang,
  user,
  onRequireSignIn,
  onGoToOnboarding,
  myTenant,
  myMerchantCatalog,
  myMerchantOrders,
  myCustomerOrders,
  myLedgerEntries,
  publicStorefronts,
  publicCatalogItems,
  plans,
  commissionRule,
  onToast,
}) => {
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'storefront_market' | 'my_workspace'>(
    myTenant ? 'my_workspace' : 'storefront_market'
  );
  const [wsSubTab, setWsSubTab] = useState<'catalog' | 'orders' | 'settlements'>('catalog');

  // New Catalog Item Form (for isolated merchant tenant)
  const [itemTitle, setItemTitle] = useState('');
  const [itemCategory, setItemCategory] = useState('وجبات وتغذية');
  const [itemPrice, setItemPrice] = useState('120');
  const [itemStock, setItemStock] = useState('50');
  const [savingItem, setSavingItem] = useState(false);

  // Customer order modal/drawer state
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [needsDelivery, setNeedsDelivery] = useState(true);

  const activePlan = plans.find((p) => p.planId === myTenant?.planId);
  const effectiveCommission =
    myTenant?.customCommissionPct ?? activePlan?.orderCommissionPct ?? commissionRule.defaultOrderCommissionPct;

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !myTenant) return;
    if (!itemTitle.trim()) return;
    setSavingItem(true);
    try {
      await saveCatalogItem(user, myTenant, {
        title: itemTitle,
        category: itemCategory,
        priceEGP: Number(itemPrice) || 50,
        stockQty: Number(itemStock) || 10,
        isAvailable: true,
      });
      setItemTitle('');
      onToast(isRtl ? 'تمت إضافة الصنف إلى مساحة متجرك المستقلة.' : 'Catalog item added to your isolated workspace.');
    } finally {
      setSavingItem(false);
    }
  };

  const handleToggleItem = async (item: CatalogItemDoc) => {
    if (!user || !myTenant) return;
    await saveCatalogItem(user, myTenant, {
      itemId: item.itemId,
      title: item.title,
      category: item.category,
      priceEGP: item.priceEGP,
      stockQty: item.stockQty,
      isAvailable: !item.isAvailable,
    });
  };

  const handleCustomerOrder = async (item: CatalogItemDoc) => {
    if (!user) {
      onRequireSignIn();
      return;
    }
    const addr = dropoffAddress.trim() || (isRtl ? 'الاستلام أو التوصيل للعنوان المسجل' : 'Registered address');
    const orderId = await placeCommercialOrder(
      user,
      item,
      1,
      commissionRule.defaultOrderCommissionPct,
      needsDelivery,
      commissionRule.minDeliveryFeeEGP,
      addr
    );
    onToast(
      isRtl
        ? `تم تسجيل طلبك رقم ${orderId} وإرساله مباشرة لمساحة التاجر "${item.storeName}".`
        : `Order ${orderId} sent directly to "${item.storeName}".`
    );
  };

  const handleOrderProgress = async (order: CommercialOrderDoc, nextStatus: CommercialOrderStatus) => {
    if (!user) return;
    await updateCommercialOrderStatus(user.uid, order, nextStatus);
    onToast(isRtl ? `تم تحديث الطلب إلى: ${nextStatus}` : `Order updated to ${nextStatus}`);
  };

  const handleDispatchOrderDelivery = async (order: CommercialOrderDoc) => {
    if (!user || !myTenant) return;
    const deliveryId = await createDeliveryRequest(
      user,
      myTenant,
      commissionRule,
      activePlan?.deliveryDiscountPct || 0,
      {
        orderId: order.orderId,
        pickupLocation: `${myTenant.name} — ${myTenant.city}`,
        dropoffLocation: order.dropoffAddress,
        packageNote: order.itemsSummary,
        baseDeliveryFeeEGP: order.deliveryFeeEGP || commissionRule.minDeliveryFeeEGP,
      }
    );
    await updateCommercialOrderStatus(user.uid, order, 'in_delivery');
    onToast(
      isRtl
        ? `تم إرسال شحنة التوصيل ${deliveryId} إلى شبكة FAYD Delivery.`
        : `Dispatched delivery ${deliveryId} to FAYD Delivery.`
    );
  };

  const filteredPublicCatalog =
    selectedStoreId === 'all'
      ? publicCatalogItems
      : publicCatalogItems.filter((i) => i.tenantId === selectedStoreId);

  return (
    <div className="space-y-5">
      {/* Sub-navigation between Marketplace Storefronts & Isolated Merchant Workspace */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('my_workspace')}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'my_workspace'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>{isRtl ? 'مساحة عملي المستقلة (التاجر/الجهة)' : 'My Isolated Merchant Workspace'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('storefront_market')}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'storefront_market'
              ? 'bg-[#FF6B00] text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>
            {isRtl ? `سوق المتاجر والمنتجات (${publicCatalogItems.length})` : `Public Storefronts (${publicCatalogItems.length})`}
          </span>
        </button>
      </div>

      {/* TAB 1: ISOLATED MERCHANT WORKSPACE */}
      {activeTab === 'my_workspace' && (
        <>
          {!user ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Lock className="w-8 h-8 text-[#FF6B00] mx-auto" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isRtl ? 'سجّل الدخول للوصول إلى مساحة عمل جهتك المعزولة' : 'Sign in to access your isolated workspace'}
              </h3>
              <button
                type="button"
                onClick={onRequireSignIn}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-black cursor-pointer"
              >
                {isRtl ? 'تسجيل الدخول بحساب Google' : 'Sign in with Google'}
              </button>
            </div>
          ) : !myTenant ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
              <Store className="w-8 h-8 text-[#FF6B00] mx-auto" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isRtl ? 'لا توجد مساحة عمل تاجر مفعّلة لهذا الحساب بعد' : 'No active Merchant Workspace linked yet'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                {isRtl
                  ? 'للحصول على مساحة عمل معزولة خاصة بمتجرك أو مطعمك أو شركتك، قدّم طلب الانضمام ليتم اعتماده من الإدارة المركزية.'
                  : 'Submit an onboarding application to unlock your isolated workspace upon Central Admin approval.'}
              </p>
              <button
                type="button"
                onClick={onGoToOnboarding}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B00] text-white text-xs font-black cursor-pointer"
              >
                {isRtl ? 'الانتقال إلى بوابة الانضمام' : 'Go to Partner Onboarding'}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Isolated Tenant Header Card */}
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF6B00]">
                      Tenant ID: {myTenant.tenantId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                      {myTenant.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                    {myTenant.name} — {myTenant.city}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {isRtl
                      ? `الباقة: ${activePlan?.nameAr || myTenant.planId} · نسبة عمولة المنصة المطبقة: ${effectiveCommission}%`
                      : `Plan: ${activePlan?.nameEn || myTenant.planId} · Commission: ${effectiveCommission}%`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(['catalog', 'orders', 'settlements'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setWsSubTab(tab)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${
                        wsSubTab === tab
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {tab === 'catalog'
                        ? isRtl ? `المنتجات (${myMerchantCatalog.length})` : `Catalog (${myMerchantCatalog.length})`
                        : tab === 'orders'
                        ? isRtl ? `الطلبات (${myMerchantOrders.length})` : `Orders (${myMerchantOrders.length})`
                        : isRtl ? `التسويات (${myLedgerEntries.length})` : `Settlements (${myLedgerEntries.length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Workspace Sub-Tab 1: Catalog */}
              {wsSubTab === 'catalog' && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <form onSubmit={handleCreateItem} className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                    <input
                      type="text"
                      required
                      value={itemTitle}
                      onChange={(e) => setItemTitle(e.target.value)}
                      placeholder={isRtl ? 'اسم الصنف أو الوجبة *' : 'Product / Meal Title *'}
                      className="sm:col-span-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="text"
                      value={itemCategory}
                      onChange={(e) => setItemCategory(e.target.value)}
                      placeholder={isRtl ? 'التصنيف' : 'Category'}
                      className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="number"
                      min={1}
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      placeholder={isRtl ? 'السعر ج.م' : 'Price EGP'}
                      className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="submit"
                      disabled={savingItem}
                      className="px-4 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-black flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isRtl ? 'إضافة صنف' : 'Add Item'}</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {myMerchantCatalog.map((item) => (
                      <div
                        key={item.itemId}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs"
                      >
                        <div>
                          <div className="font-black text-slate-900 dark:text-white">{item.title}</div>
                          <div className="text-[11px] text-slate-500">
                            {item.category} · <span className="text-[#FF6B00] font-bold">{item.priceEGP} ج.م</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleItem(item)}
                          className="text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {item.isAvailable ? (
                            <ToggleRight className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-slate-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workspace Sub-Tab 2: Incoming Orders */}
              {wsSubTab === 'orders' && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  {myMerchantOrders.length === 0 ? (
                    <p className="text-xs text-slate-500">{isRtl ? 'لا توجد طلبات واردة لمتجرك حتى الآن.' : 'No orders yet.'}</p>
                  ) : (
                    myMerchantOrders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-mono text-[10px] text-slate-500">
                            {ord.orderId} · {ord.status}
                          </div>
                          <div className="font-black text-slate-900 dark:text-white">{ord.itemsSummary}</div>
                          <div className="text-slate-600 dark:text-slate-300">
                            {ord.customerName} — {ord.dropoffAddress}
                          </div>
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                            {isRtl
                              ? `إجمالي ${ord.subtotalEGP} ج.م · عمولة ${ord.platformCommissionEGP} ج.م · صافي التاجر ${ord.netMerchantEGP} ج.م`
                              : `Subtotal ${ord.subtotalEGP} EGP · Net ${ord.netMerchantEGP} EGP`}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {ord.status === 'pending_merchant' && (
                            <button
                              type="button"
                              onClick={() => handleOrderProgress(ord, 'accepted_preparing')}
                              className="px-3 py-1.5 rounded-xl bg-[#FF6B00] text-white font-bold cursor-pointer"
                            >
                              {isRtl ? 'قبول وتجهيز' : 'Accept'}
                            </button>
                          )}
                          {ord.status === 'accepted_preparing' && (
                            <button
                              type="button"
                              onClick={() => handleDispatchOrderDelivery(ord)}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>{isRtl ? 'طلب توصيل FAYD' : 'Dispatch Delivery'}</span>
                            </button>
                          )}
                          {ord.status === 'in_delivery' && (
                            <button
                              type="button"
                              onClick={() => handleOrderProgress(ord, 'completed')}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer"
                            >
                              {isRtl ? 'إتمام التسليم' : 'Complete'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Workspace Sub-Tab 3: Net Settlements */}
              {wsSubTab === 'settlements' && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                    <Wallet className="w-4 h-4 text-[#FF6B00]" />
                    <span>{isRtl ? 'كشف حساب المستحقات والعمولات المعزول' : 'Isolated Merchant Settlements'}</span>
                  </div>
                  {myLedgerEntries.length === 0 ? (
                    <p className="text-xs text-slate-500">{isRtl ? 'لا توجد تسويات مسجلة بعد.' : 'No ledger entries yet.'}</p>
                  ) : (
                    myLedgerEntries.map((entry) => (
                      <div
                        key={entry.entryId}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {entry.sourceType} ({entry.referenceId})
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {isRtl
                              ? `إجمالي: ${entry.grossAmountEGP} · حصة المنصة: ${entry.platformRevenueEGP}`
                              : `Gross: ${entry.grossAmountEGP} · Platform: ${entry.platformRevenueEGP}`}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="font-black text-emerald-600">{entry.beneficiaryNetEGP} ج.م</div>
                          <span className="text-[10px] font-bold">{entry.settlementStatus}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* TAB 2: PUBLIC MARKETPLACE & CUSTOMER ORDERS */}
      {activeTab === 'storefront_market' && (
        <div className="space-y-5">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {isRtl ? 'الجهات والمتاجر والمطاعم المعتمدة' : 'Approved Partner Storefronts'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isRtl ? 'تصفح واطلب مباشرة من أي جهة منضمة' : 'Browse & place commercial orders directly'}
                </p>
              </div>
              <select
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-bold"
              >
                <option value="all">{isRtl ? 'كل المتاجر والمطاعم' : 'All Storefronts'}</option>
                {publicStorefronts.map((s) => (
                  <option key={s.tenantId} value={s.tenantId}>
                    {s.name} ({s.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl">
              <input
                type="text"
                value={dropoffAddress}
                onChange={(e) => setDropoffAddress(e.target.value)}
                placeholder={isRtl ? 'عنوان التوصيل المطلوب للطلب...' : 'Delivery dropoff address...'}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
              <label className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsDelivery}
                  onChange={(e) => setNeedsDelivery(e.target.checked)}
                />
                <span>
                  {isRtl
                    ? `شامل توصيل FAYD (${commissionRule.minDeliveryFeeEGP} ج.م)`
                    : `Include FAYD Delivery (${commissionRule.minDeliveryFeeEGP} EGP)`}
                </span>
              </label>
            </div>

            {filteredPublicCatalog.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                {isRtl
                  ? 'لا توجد أصناف معروضة حالياً. يمكن لأي تاجر معتمد إضافة أصنافه من مساحة عمله المستقلة.'
                  : 'No active storefront items yet.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredPublicCatalog.map((item) => (
                  <div
                    key={item.itemId}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#FF6B00]">{item.storeName}</span>
                      <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.category}</div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                        {item.priceEGP} {isRtl ? 'ج.م' : 'EGP'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCustomerOrder(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-black cursor-pointer"
                      >
                        {isRtl ? 'اطلب الآن' : 'Order'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {user && myCustomerOrders.length > 0 && (
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-[#FF6B00]" />
                <span>{isRtl ? 'طلباتي التجارية' : 'My Commercial Orders'}</span>
              </h3>
              <div className="space-y-2">
                {myCustomerOrders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{ord.itemsSummary}</div>
                      <div className="text-[11px] text-slate-500">{ord.orderId} · {ord.dropoffAddress}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF6B00] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {ord.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
