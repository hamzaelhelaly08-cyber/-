import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Receipt, 
  TrendingUp, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Printer, 
  Download, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart
} from 'lucide-react';
import { ClientTenant } from '../types/dashboard';

interface FinancialInvoice {
  id: string;
  invoiceNumber: string;
  clientNameAr: string;
  clientCode: string;
  billingMonth: string;
  issueDate: string;
  dueDate: string;
  totalMealsCount: number;
  totalAmountEGP: number;
  taxAmountEGP: number; // 14% VAT
  netPayableEGP: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  paidDate?: string;
}

interface SupplierPayable {
  id: string;
  supplierName: string;
  category: string;
  kitchenName: string;
  invoiceNumber: string;
  amountEGP: number;
  dueDate: string;
  status: 'paid' | 'scheduled' | 'pending_approval';
}

const INITIAL_INVOICES: FinancialInvoice[] = [
  {
    id: 'INV-2026-001',
    invoiceNumber: 'CE-INV-112026-08',
    clientNameAr: 'الشركة الألمانية — BAHED / HA-BE MARKET',
    clientCode: 'CLI-BAHED',
    billingMonth: 'نوفمبر 2026',
    issueDate: '2026-11-01',
    dueDate: '2026-11-20',
    totalMealsCount: 18500,
    totalAmountEGP: 684500,
    taxAmountEGP: 95830,
    netPayableEGP: 780330,
    status: 'pending',
    paymentMethod: 'تحويل بنكي دوري'
  },
  {
    id: 'INV-2026-002',
    invoiceNumber: 'CE-INV-102026-44',
    clientNameAr: 'مستشفى القصر العيني الفرنساوي',
    clientCode: 'CLI-QASR',
    billingMonth: 'أكتوبر 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-25',
    totalMealsCount: 24000,
    totalAmountEGP: 890000,
    taxAmountEGP: 124600,
    netPayableEGP: 1014600,
    status: 'paid',
    paymentMethod: 'شيك حكومي معتمد',
    paidDate: '2026-10-22'
  },
  {
    id: 'INV-2026-003',
    invoiceNumber: 'CE-INV-112026-12',
    clientNameAr: 'مستشفى رويال كير التخصصي',
    clientCode: 'CLI-ROYAL',
    billingMonth: 'نوفمبر 2026',
    issueDate: '2026-11-01',
    dueDate: '2026-11-15',
    totalMealsCount: 12400,
    totalAmountEGP: 485000,
    taxAmountEGP: 67900,
    netPayableEGP: 552900,
    status: 'overdue',
    paymentMethod: 'تحويل فوري'
  },
  {
    id: 'INV-2026-004',
    invoiceNumber: 'CE-INV-102026-91',
    clientNameAr: 'مجموعة النساجون الشرقيون — قطاع السجاد',
    clientCode: 'CLI-ORIENT',
    billingMonth: 'أكتوبر 2026',
    issueDate: '2026-10-01',
    dueDate: '2026-10-20',
    totalMealsCount: 31000,
    totalAmountEGP: 1147000,
    taxAmountEGP: 160580,
    netPayableEGP: 1307580,
    status: 'paid',
    paymentMethod: 'تحويل بنكي إلكتروني',
    paidDate: '2026-10-18'
  }
];

const INITIAL_SUPPLIERS: SupplierPayable[] = [
  {
    id: 'SUP-01',
    supplierName: 'مزارع دينا لمنتجات الألبان والأغذية',
    category: 'ألبان وأجبان طازجة',
    kitchenName: 'مطبخ هنجر استيشن المركزي',
    invoiceNumber: 'SUP-DN-994',
    amountEGP: 145000,
    dueDate: '2026-11-25',
    status: 'scheduled'
  },
  {
    id: 'SUP-02',
    supplierName: 'الوطنية للدواجن واللحوم المبردة',
    category: 'دواجن مجمدة ومبردة معتمدة',
    kitchenName: 'مطبخ مول العين بمدينة بدر',
    invoiceNumber: 'WAT-POUL-451',
    amountEGP: 380000,
    dueDate: '2026-11-18',
    status: 'pending_approval'
  },
  {
    id: 'SUP-03',
    supplierName: 'شركة السكر والصناعات التكاملية',
    category: 'مواد جافة وأرز وسكر وزيوت',
    kitchenName: 'مطبخ ريان اللاهون المركزي',
    invoiceNumber: 'SUG-INT-812',
    amountEGP: 210000,
    dueDate: '2026-11-30',
    status: 'scheduled'
  }
];

interface FinancialPortalViewProps {
  isRtl: boolean;
  onOpenPrintReport: () => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
  onShowToast: (msg: string) => void;
}

export const FinancialPortalView: React.FC<FinancialPortalViewProps> = ({
  isRtl,
  onOpenPrintReport,
  onAddAuditLog,
  onShowToast
}) => {
  const [invoices, setInvoices] = useState<FinancialInvoice[]>(INITIAL_INVOICES);
  const [suppliers, setSuppliers] = useState<SupplierPayable[]>(INITIAL_SUPPLIERS);
  const [invoiceFilter, setInvoiceFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalReceivables = invoices
    .filter((inv) => inv.status !== 'paid')
    .reduce((sum, inv) => sum + inv.netPayableEGP, 0);

  const totalCollected = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.netPayableEGP, 0);

  const totalPayables = suppliers
    .filter((sup) => sup.status !== 'paid')
    .reduce((sum, sup) => sum + sup.amountEGP, 0);

  const filteredInvoices = invoices.filter((inv) => {
    if (invoiceFilter !== 'all' && inv.status !== invoiceFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inv.clientNameAr.toLowerCase().includes(q) ||
      inv.invoiceNumber.toLowerCase().includes(q) ||
      inv.clientCode.toLowerCase().includes(q)
    );
  });

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              status: 'paid',
              paidDate: new Date().toISOString().split('T')[0]
            }
          : inv
      )
    );
    const target = invoices.find((inv) => inv.id === invoiceId);
    onAddAuditLog(
      `تسجيل تحصيل فاتورة: ${target?.invoiceNumber}`,
      `Recorded invoice collection: ${target?.invoiceNumber}`,
      `تم تسجيل استلام سداد الفاتورة بمبلغ ${target?.netPayableEGP.toLocaleString()} ج.م من العميل ${target?.clientNameAr}.`
    );
    onShowToast(`تم تسجيل تحصيل الفاتورة ${target?.invoiceNumber} بنجاح.`);
  };

  const handleApproveSupplierPayment = (supplierId: string) => {
    setSuppliers((prev) =>
      prev.map((sup) =>
        sup.id === supplierId
          ? { ...sup, status: 'scheduled' }
          : sup
      )
    );
    const target = suppliers.find((sup) => sup.id === supplierId);
    onAddAuditLog(
      `اعتماد صرف مستحقات مورد: ${target?.supplierName}`,
      `Approved supplier payment: ${target?.supplierName}`,
      `تمت جدولة صرف مبلغ ${target?.amountEGP.toLocaleString()} ج.م للمورد ${target?.supplierName}.`
    );
    onShowToast(`تمت جدولة صرف المستحقات للمورد ${target?.supplierName}.`);
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      
      {/* Officer Identification & Security Scope Banner */}
      <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-500/40 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center font-black text-xl text-purple-300 shrink-0">
            AR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black">
                {isRtl ? 'البوابة المالية والحسابات العامة — أ/ عبد المجيد الرخاوي' : 'Financial Portal & Accounts — Abdelmegid El Rakhawy'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {isRtl ? 'حساب مالي معتمد' : 'CFO Verified'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isRtl ? 'إدارة الذمم، الفواتير، التحصيلات، ومستحقات الموردين' : 'Accounts Receivable, Invoices, Collections & AP'}
            </p>
          </div>
        </div>

        {/* Strict Security Constraints Notice */}
        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-950/70 border border-purple-500/30 text-[11px] text-slate-300">
          <Lock className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            {isRtl 
              ? 'صلاحيات مخصصة للقسم المالي — الإدارة العليا للمنظومة والهوية بيد م/ مصطفى شعبان'
              : 'Dedicated financial scope — System governance held by Eng. Mostafa Shaaban'}
          </span>
        </div>
      </div>

      {/* KPI Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{isRtl ? 'إجمالي الذمم المدينة (المستحقات)' : 'Accounts Receivable'}</span>
            <ArrowUpRight className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">
            {totalReceivables.toLocaleString()} <span className="text-xs text-slate-500">ج.م</span>
          </p>
          <p className="text-[11px] text-slate-500">
            {isRtl ? 'فواتير قيد التحصيل ومتأخرة' : 'Outstanding invoices'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{isRtl ? 'التحصيلات المحققة (المسددة)' : 'Collected Revenue'}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {totalCollected.toLocaleString()} <span className="text-xs text-slate-500">ج.م</span>
          </p>
          <p className="text-[11px] text-emerald-600 font-bold">
            {isRtl ? 'نسبة التحصيل: 94.2%' : 'Collection Rate: 94.2%'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{isRtl ? 'مستحقات الموردين ومزارع التوريد' : 'Accounts Payable'}</span>
            <ArrowDownLeft className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400">
            {totalPayables.toLocaleString()} <span className="text-xs text-slate-500">ج.م</span>
          </p>
          <p className="text-[11px] text-slate-500">
            {isRtl ? 'لحوم، دواجن، أرز، وزيوت تموينية' : 'Poultry, Meat, Rice, Oil'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>{isRtl ? 'الإقرار الضريبي وضريبة القيمة المضافة' : 'VAT (14%) Tax Ledger'}</span>
            <Receipt className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
            448,910 <span className="text-xs text-slate-500">ج.م</span>
          </p>
          <button
            onClick={onOpenPrintReport}
            className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isRtl ? 'طباعة تقرير الضرائب' : 'Print Tax Report'}</span>
          </button>
        </div>

      </div>

      {/* Main Section: Client Invoices Ledger */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>{isRtl ? 'سجل الفواتير الشهرية ومستحقات العملاء المتعاقدين' : 'Monthly Client Invoices & Billings'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isRtl ? 'متابعة دورات الفوترة، السداد، وإصدار إشعارات التحصيل' : 'Track billing cycles, payments, and invoices'}
            </p>
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={isRtl ? 'بحث باسم العميل أو رقم الفاتورة...' : 'Search invoices...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8 pl-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <select
              value={invoiceFilter}
              onChange={(e) => setInvoiceFilter(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              <option value="all">{isRtl ? 'كافة الحالات' : 'All Statuses'}</option>
              <option value="pending">{isRtl ? 'قيد التحصيل' : 'Pending'}</option>
              <option value="paid">{isRtl ? 'مسددة بالكامل' : 'Paid'}</option>
              <option value="overdue">{isRtl ? 'متأخرة' : 'Overdue'}</option>
            </select>

            <button
              onClick={onOpenPrintReport}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isRtl ? 'طباعة كشف الحساب' : 'Print Statement'}</span>
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                <th className="pb-3 pr-2">{isRtl ? 'رقم الفاتورة' : 'Invoice #'}</th>
                <th className="pb-3">{isRtl ? 'المنشأة المتعاقدة' : 'Client Organization'}</th>
                <th className="pb-3">{isRtl ? 'شهر الاستحقاق' : 'Period'}</th>
                <th className="pb-3">{isRtl ? 'عدد الوجبات' : 'Meals'}</th>
                <th className="pb-3">{isRtl ? 'القيمة قبل الضريبة' : 'Subtotal'}</th>
                <th className="pb-3">{isRtl ? 'شامل الضريبة (14%)' : 'Net (Inc. VAT)'}</th>
                <th className="pb-3">{isRtl ? 'حالة السداد' : 'Status'}</th>
                <th className="pb-3 text-center">{isRtl ? 'الإجراء المالي' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 pr-2 font-mono font-bold text-purple-600 dark:text-purple-400">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                    {inv.clientNameAr}
                    <span className="block text-[10px] text-slate-500 font-mono">{inv.clientCode}</span>
                  </td>
                  <td className="py-3.5 text-slate-600 dark:text-slate-400">
                    {inv.billingMonth}
                  </td>
                  <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">
                    {inv.totalMealsCount.toLocaleString()} {isRtl ? 'وجبة' : 'meals'}
                  </td>
                  <td className="py-3.5 font-mono text-slate-700 dark:text-slate-300">
                    {inv.totalAmountEGP.toLocaleString()} ج.م
                  </td>
                  <td className="py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                    {inv.netPayableEGP.toLocaleString()} ج.م
                  </td>
                  <td className="py-3.5">
                    {inv.status === 'paid' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {isRtl ? 'مسددة بالكامل' : 'Paid'}
                      </span>
                    )}
                    {inv.status === 'pending' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {isRtl ? 'قيد التحصيل' : 'Pending'}
                      </span>
                    )}
                    {inv.status === 'overdue' && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        {isRtl ? 'متأخرة عن الموعد' : 'Overdue'}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    {inv.status !== 'paid' ? (
                      <button
                        onClick={() => handleMarkAsPaid(inv.id)}
                        className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-sm transition-colors cursor-pointer"
                      >
                        {isRtl ? 'تسجيل التحصيل' : 'Mark Paid'}
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">
                        {inv.paidDate}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Supplier & Central Kitchen Procurement Section */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{isRtl ? 'مستحقات الموردين ومزارع الإمداد الغذائي' : 'Supplier Accounts Payable'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isRtl ? 'مراجعة واعتماد أوامر الدفع لموردي اللحوم، الدواجن، ومكونات المطابخ المركزية' : 'Approve payments for raw food ingredients'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {suppliers.map((sup) => (
            <div key={sup.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">{sup.supplierName}</span>
                <span className="text-[10px] font-mono text-slate-500">{sup.invoiceNumber}</span>
              </div>
              <p className="text-[11px] text-slate-500">{sup.category} · {sup.kitchenName}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-black text-purple-600 dark:text-purple-400">{sup.amountEGP.toLocaleString()} ج.م</span>
                {sup.status === 'pending_approval' ? (
                  <button
                    onClick={() => handleApproveSupplierPayment(sup.id)}
                    className="px-2.5 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] cursor-pointer"
                  >
                    {isRtl ? 'اعتماد الصرف' : 'Approve'}
                  </button>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    {isRtl ? 'مجدول للصرف' : 'Scheduled'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
