import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Printer,
  Download,
  Receipt,
  Plus,
  Trash2,
  QrCode,
  Edit3,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import {
  buildOfficialPdfFilename,
  exportElementsToA4Pdf,
  paginateRowsForA4,
  triggerCleanA4Print,
} from '../lib/pdfExport';

export type UniversalDocType =
  | 'quotation'
  | 'delivery_statement'
  | 'commercial_invoice'
  | 'e_invoice';

interface DocItem {
  id: string;
  description: string;
  portionSpec: string;
  quantity: number;
  unitPrice: number;
}

interface UniversalDocumentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: UniversalDocType;
  recipientCompany?: string;
  isRtl?: boolean;
  onShowToast: (msg: string) => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
}

export const UniversalDocumentBuilderModal: React.FC<
  UniversalDocumentBuilderModalProps
> = ({
  isOpen,
  onClose,
  initialType = 'quotation',
  recipientCompany = 'جهة عملاء تجريبية — للاختبار',
  isRtl = true,
  onShowToast,
  onAddAuditLog,
}) => {
  const [docType, setDocType] = useState<UniversalDocType>(initialType);
  const [isEditing, setIsEditing] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfFeedback, setPdfFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Form Fields
  const [docNumber, setDocNumber] = useState(`QUOT-${Date.now().toString().slice(-6)}`);
  const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);
  const [recipientOrg, setRecipientOrg] = useState(recipientCompany);
  const [recipientContact, setRecipientContact] = useState(
    'مسؤول المشتريات والخدمات (نموذج اختباري)'
  );
  const [recipientTaxId, setRecipientTaxId] = useState('624-918-350');
  const [recipientAddress, setRecipientAddress] = useState(
    'المنطقة الصناعية — مدينة بدر / طريق السويس'
  );
  const [contractReference, setContractReference] = useState(
    'طلب عرض سعر تجريبي — 2026'
  );
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [notes, setNotes] = useState<string>(
    'تنويه: الأسعار والكميات المذكورة أعلاه بيانات اختبارية للتحقق من الطباعة وتنزيل ملف PDF لحين اعتماد التسعير الرسمي من الإدارة.'
  );

  const [items, setItems] = useState<DocItem[]>([
    {
      id: 'it-1',
      description:
        'وجبات غداء ساخنة متكاملة (بروتين + أرز بسمتي + خضار + سلطة + خبز)',
      portionSpec: 'حصة 550 جم معبأة حرارياً',
      quantity: 200,
      unitPrice: 110,
    },
    {
      id: 'it-2',
      description:
        'وجبات إفطار عمالي متكامل (بيض + جبن + مربى + عيش طازج)',
      portionSpec: 'علبة محكمة الإغلاق',
      quantity: 150,
      unitPrice: 65,
    },
    {
      id: 'it-3',
      description:
        'توريدات ضيافة ومشروبات ومخبوزات طازجة للاجتماعات',
      portionSpec: 'باقة ضيافة يومية',
      quantity: 80,
      unitPrice: 45,
    },
  ]);

  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const itemPages = useMemo(() => paginateRowsForA4(items, 7, 12), [items]);

  useEffect(() => {
    if (!isOpen) return;
    setDocType(initialType);
    setPdfFeedback(null);
    setIsEditing(false);
    setDocNumber(
      `${initialType === 'quotation' ? 'QUOT' : initialType === 'e_invoice' ? 'ETA' : 'DOC'}-2026-${Math.floor(100 + Math.random() * 899)}`
    );
    if (recipientCompany) {
      setRecipientOrg(recipientCompany);
    }
  }, [isOpen, initialType, recipientCompany]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `it-${Date.now()}-${prev.length}`,
        description: `بند توريد إضافي رقم ${prev.length + 1}`,
        portionSpec: 'حصة قياسية معتمدة',
        quantity: 100,
        unitPrice: 50,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      onShowToast('يجب وجود بند واحد على الأقل في الوثيقة.');
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdateItem = (
    id: string,
    field: keyof DocItem,
    val: string | number
  ) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: val } : i))
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
    0
  );
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const afterDiscount = subtotal - discountAmount;
  const vatAmount =
    docType === 'commercial_invoice' || docType === 'e_invoice'
      ? Math.round(afterDiscount * 0.14)
      : 0;
  const grandTotal = afterDiscount + vatAmount;

  const getValidPages = (): HTMLElement[] =>
    pageRefs.current.filter((el): el is HTMLDivElement => el !== null);

  const handlePrint = () => {
    setPdfFeedback(null);
    if (isEditing) {
      setIsEditing(false);
    }
    window.setTimeout(() => {
      const els = getValidPages();
      if (els.length === 0) {
        setPdfFeedback({
          type: 'error',
          text: 'تعذر تجهيز صفحات الطباعة. حاول التحويل لوضع المعاينة أولاً.',
        });
        return;
      }
      onAddAuditLog(
        `طباعة وثيقة A4: ${docType} [${docNumber}]`,
        `Printed A4 Document: ${docType} [${docNumber}]`,
        `الجهة: ${recipientOrg} · الإجمالي: ${grandTotal.toLocaleString()} ج.م`
      );
      triggerCleanA4Print(els);
    }, 80);
  };

  const handleDownloadPDF = async () => {
    setPdfFeedback(null);
    if (isEditing) {
      setIsEditing(false);
    }
    setIsExportingPdf(true);

    // Let React render non-input static A4 preview cells first before rasterizing to PDF
    window.setTimeout(async () => {
      try {
        const els = getValidPages();
        const filename = buildOfficialPdfFilename(docType, docNumber, docDate);
        const res = await exportElementsToA4Pdf({
          pageElements: els,
          filename,
        });

        if (res.success) {
          onAddAuditLog(
            `تنزيل PDF حقيقي: ${docType} [${docNumber}]`,
            `Downloaded Real PDF: ${docType} [${docNumber}]`,
            `اسم الملف: ${res.filename}`
          );
          onShowToast(`تم تنزيل ملف PDF: ${res.filename}`);
          setPdfFeedback({
            type: 'success',
            text: `تم إنشاء وتنزيل الملف: ${res.filename} (${res.pageCount} صفحة A4)`,
          });
        } else {
          setPdfFeedback({
            type: 'error',
            text: res.errorMessage || 'تعذر إنشاء ملف PDF.',
          });
        }
      } finally {
        setIsExportingPdf(false);
      }
    }, 120);
  };

  const titles: Record<
    UniversalDocType,
    { ar: string; en: string; badge: string }
  > = {
    quotation: {
      ar: 'عرض سعر تجاري ومواصفات توريد (نموذج PDF معتمد)',
      en: 'Official Commercial Quotation & Specifications',
      badge: 'عرض سعر PDF',
    },
    delivery_statement: {
      ar: 'بيان تشغيل وتوريد وجبات يومي (سند استلام)',
      en: 'Daily Meals Delivery Statement',
      badge: 'بيان تشغيل يومي',
    },
    commercial_invoice: {
      ar: 'فاتورة توريد تجارية ومطالبة مالية',
      en: 'Commercial Supply Invoice',
      badge: 'فاتورة تجارية',
    },
    e_invoice: {
      ar: 'فاتورة إلكترونية ضريبية معتمدة (ETA)',
      en: 'ETA Tax E-Invoice',
      badge: 'فاتورة إلكترونية ETA',
    },
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[94vh] overflow-hidden my-auto">
        {/* Top Control Bar */}
        <div className="p-3 sm:p-4 bg-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center shadow-md">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white">
                منظومة إنشاء وتنزيل عروض الأسعار والفواتير PDF
              </h3>
              <p className="text-[11px] text-slate-300">
                معاينة A4 RTL · تصدير ملف PDF حقيقي · طباعة متعددة الصفحات
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing((p) => !p)}
              className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                isEditing
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-800 text-white hover:bg-slate-700'
              }`}
            >
              {isEditing ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة عرض السعر</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل البنود والبيانات</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExportingPdf}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {isExportingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isExportingPdf ? 'جاري التحميل...' : 'تنزيل PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة A4</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Type Selector Ribbon */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-bold print:hidden">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(
              [
                'quotation',
                'delivery_statement',
                'commercial_invoice',
                'e_invoice',
              ] as UniversalDocType[]
            ).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setDocType(type);
                  setPdfFeedback(null);
                  setDocNumber(
                    `${type === 'quotation' ? 'QUOT' : type === 'e_invoice' ? 'ETA' : 'DOC'}-2026-${Math.floor(
                      100 + Math.random() * 899
                    )}`
                  );
                }}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  docType === type
                    ? 'bg-[#FF6B00] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {titles[type].badge}
              </button>
            ))}
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={handleAddItem}
              className="px-3 py-1.5 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] font-extrabold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة بند للاختبار ({items.length})</span>
            </button>
          )}
        </div>

        {pdfFeedback && (
          <div
            className={`px-4 py-2.5 text-xs font-bold flex items-center justify-between gap-3 border-b ${
              pdfFeedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {pdfFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{pdfFeedback.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setPdfFeedback(null)}
              className="text-xs underline cursor-pointer"
            >
              إخفاء
            </button>
          </div>
        )}

        {/* Paginated A4 Sheets Viewport */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-200/70 dark:bg-slate-950/80 space-y-6"
        >
          {itemPages.map((pageRows, pageIndex) => {
            const isFirstPage = pageIndex === 0;
            const isLastPage = pageIndex === itemPages.length - 1;
            const rowOffset = pageIndex === 0 ? 1 : 8 + (pageIndex - 1) * 12;

            return (
              <div
                key={`ub-a4-${pageIndex}`}
                ref={(el) => {
                  pageRefs.current[pageIndex] = el;
                }}
                dir="rtl"
                className="ce-a4-page mx-auto w-full max-w-[210mm] bg-white text-slate-900 rounded-2xl p-6 sm:p-9 shadow-2xl border border-slate-300 flex flex-col justify-between space-y-5"
                style={{ minHeight: '296mm', fontFamily: 'Cairo, sans-serif' }}
              >
                <div className="space-y-5">
                  {/* Letterhead Header */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#FF6B00] pb-4">
                    <div className="text-right">
                      <h2 className="font-black text-lg sm:text-xl text-slate-950 leading-tight">
                        الشركة الوطنية اللوجستية — CATERING EGYPT
                      </h2>
                      <p className="text-xs font-bold text-[#FF6B00] mt-0.5">
                        {titles[docType].ar}
                      </p>
                      <div className="text-[11px] text-slate-600 space-y-0.5 mt-1 font-medium">
                        <p>
                          سجل تجاري: <strong className="font-mono">19132</strong> ·
                          البطاقة الضريبية:{' '}
                          <strong className="font-mono">725-995-758</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BrandLogo size="md" showGlow={false} />
                      <div className="text-left flex flex-col items-end">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 p-1 border border-slate-300 mb-1">
                          <QrCode className="w-full h-full text-slate-800" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-700">
                          {docNumber}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          صفحة {pageIndex + 1} / {itemPages.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata & Recipient only on Page 1 */}
                  {isFirstPage && (
                    <>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            رقم المستند:
                          </span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={docNumber}
                              onChange={(e) => setDocNumber(e.target.value)}
                              className="font-mono font-black text-xs text-slate-900 bg-white px-2 py-1 rounded border w-full mt-0.5"
                            />
                          ) : (
                            <span className="font-mono font-black text-sm text-[#FF6B00]">
                              {docNumber}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            تاريخ الإصدار:
                          </span>
                          {isEditing ? (
                            <input
                              type="date"
                              value={docDate}
                              onChange={(e) => setDocDate(e.target.value)}
                              className="font-bold text-xs text-slate-900 bg-white px-2 py-1 rounded border w-full mt-0.5"
                            />
                          ) : (
                            <span className="font-mono font-bold text-xs text-slate-900">
                              {docDate}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            المرجع / الطلب:
                          </span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={contractReference}
                              onChange={(e) => setContractReference(e.target.value)}
                              className="font-bold text-xs text-slate-900 bg-white px-2 py-1 rounded border w-full mt-0.5"
                            />
                          ) : (
                            <span className="font-bold text-xs text-slate-900">
                              {contractReference}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white">
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            الجهة المستفيدة / العميل:
                          </span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={recipientOrg}
                              onChange={(e) => setRecipientOrg(e.target.value)}
                              className="font-black text-xs text-slate-900 bg-slate-50 px-2 py-1 rounded border w-full mt-0.5"
                            />
                          ) : (
                            <span className="font-black text-sm text-slate-900">
                              {recipientOrg}
                            </span>
                          )}
                          {isEditing ? (
                            <input
                              type="text"
                              value={recipientContact}
                              onChange={(e) => setRecipientContact(e.target.value)}
                              className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border w-full mt-1"
                            />
                          ) : (
                            <span className="block text-xs text-slate-600 mt-0.5">
                              {recipientContact}
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            السجل / الرقم الضريبي وعنوان التسليم:
                          </span>
                          <span className="font-mono font-bold text-xs text-slate-900 block mt-0.5">
                            {recipientTaxId}
                          </span>
                          {isEditing ? (
                            <input
                              type="text"
                              value={recipientAddress}
                              onChange={(e) => setRecipientAddress(e.target.value)}
                              className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border w-full mt-1"
                            />
                          ) : (
                            <span className="block text-xs text-slate-600 mt-0.5">
                              {recipientAddress}
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Line Items Table */}
                  <div className="border border-slate-300 rounded-xl overflow-hidden">
                    <table className="w-full text-xs text-right border-collapse table-fixed">
                      <thead>
                        <tr className="bg-slate-900 text-white font-bold">
                          <th className="p-2.5 w-9 text-center">م</th>
                          <th className="p-2.5 w-[38%]">بيان الصنف / الخدمة</th>
                          <th className="p-2.5 w-[20%]">المواصفة</th>
                          <th className="p-2.5 w-[11%] text-center">الكمية</th>
                          <th className="p-2.5 w-[13%] text-center">السعر</th>
                          <th className="p-2.5 w-[15%] text-left">الإجمالي (ج.م)</th>
                          {isEditing && <th className="p-2 w-10 text-center">حذف</th>}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {pageRows.map((item, idx) => (
                          <tr key={item.id} className="even:bg-slate-50/70">
                            <td className="p-2.5 text-center font-mono text-slate-500 tabular-nums">
                              {rowOffset + idx}
                            </td>
                            <td className="p-2.5 break-words">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) =>
                                    handleUpdateItem(
                                      item.id,
                                      'description',
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-1 border rounded font-bold text-slate-900 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-slate-900">
                                  {item.description}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 break-words">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={item.portionSpec}
                                  onChange={(e) =>
                                    handleUpdateItem(
                                      item.id,
                                      'portionSpec',
                                      e.target.value
                                    )
                                  }
                                  className="w-full p-1 border rounded text-slate-600 text-xs"
                                />
                              ) : (
                                <span className="text-slate-600">
                                  {item.portionSpec}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-center tabular-nums">
                              {isEditing ? (
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleUpdateItem(
                                      item.id,
                                      'quantity',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full p-1 border rounded text-center font-bold text-slate-900 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-slate-900">
                                  {item.quantity}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-center tabular-nums">
                              {isEditing ? (
                                <input
                                  type="number"
                                  min="0"
                                  value={item.unitPrice}
                                  onChange={(e) =>
                                    handleUpdateItem(
                                      item.id,
                                      'unitPrice',
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-full p-1 border rounded text-center font-bold text-slate-900 text-xs"
                                />
                              ) : (
                                <span className="font-bold text-slate-900">
                                  {item.unitPrice}
                                </span>
                              )}
                            </td>
                            <td className="p-2.5 text-left font-black text-slate-900 tabular-nums">
                              {(item.quantity * item.unitPrice).toLocaleString()}
                            </td>
                            {isEditing && (
                              <td className="p-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals & Signatures on Last Page */}
                  {isLastPage && (
                    <div className="ce-keep-together space-y-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-3 border-t border-slate-200">
                        <div className="w-full sm:w-1/2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <span className="font-bold text-slate-800 block">
                            ملاحظات وشروط التوريد:
                          </span>
                          {isEditing ? (
                            <textarea
                              rows={3}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full p-2 bg-white rounded-lg border text-xs text-slate-700 outline-none"
                            />
                          ) : (
                            <p className="text-slate-600 leading-relaxed">{notes}</p>
                          )}
                        </div>

                        <div className="w-full sm:w-2/5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 tabular-nums">
                          <div className="flex justify-between">
                            <span className="text-slate-600">إجمالي البنود:</span>
                            <span className="font-bold text-slate-900">
                              {subtotal.toLocaleString()} ج.م
                            </span>
                          </div>
                          {isEditing ? (
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">نسبة الخصم %:</span>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={discountRate}
                                onChange={(e) =>
                                  setDiscountRate(Number(e.target.value))
                                }
                                className="w-16 p-1 border rounded text-center bg-white"
                              />
                            </div>
                          ) : (
                            discountRate > 0 && (
                              <div className="flex justify-between text-emerald-700 font-bold">
                                <span>خصم ({discountRate}%):</span>
                                <span>- {discountAmount.toLocaleString()} ج.م</span>
                              </div>
                            )
                          )}
                          {(docType === 'commercial_invoice' ||
                            docType === 'e_invoice') && (
                            <div className="flex justify-between text-blue-700 font-bold">
                              <span>ضريبة القيمة المضافة (14%):</span>
                              <span>+ {vatAmount.toLocaleString()} ج.م</span>
                            </div>
                          )}
                          <div className="flex justify-between font-black text-sm text-slate-950 pt-2 border-t border-slate-300">
                            <span>الإجمالي المستحق:</span>
                            <span className="text-[#FF6B00]">
                              {grandTotal.toLocaleString()} ج.م
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-4 border-t-2 border-slate-900 text-center text-xs">
                        <div>
                          <span className="font-bold text-slate-500 block">
                            إعداد ومراجعة الحسابات
                          </span>
                          <span className="font-black text-slate-900 block mt-2">
                            أ/ عبد المجيد الرخاوي
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-500 block">
                            اعتماد الإدارة المركزية والتشغيل
                          </span>
                          <span className="font-black text-slate-900 block mt-2">
                            م/ مصطفى شعبان عبد العليم
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Page Footer */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                  <span>
                    الشركة الوطنية اللوجستية — CATERING EGYPT | {docNumber}
                  </span>
                  <span>
                    صفحة {pageIndex + 1} من {itemPages.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
