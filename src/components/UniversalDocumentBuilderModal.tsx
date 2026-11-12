import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  FileText, 
  Receipt, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Sparkles, 
  Edit3, 
  Save, 
  X,
  FileCheck2,
  Calendar,
  Layers,
  Stamp
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type UniversalDocType = 'quotation' | 'delivery_statement' | 'commercial_invoice' | 'e_invoice';

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

export const UniversalDocumentBuilderModal: React.FC<UniversalDocumentBuilderModalProps> = ({
  isOpen,
  onClose,
  initialType = 'e_invoice',
  recipientCompany = 'الشركة الألمانية للأسمنت',
  isRtl = true,
  onShowToast,
  onAddAuditLog
}) => {
  const [docType, setDocType] = useState<UniversalDocType>(initialType);
  const [isEditing, setIsEditing] = useState(true);

  // Form Fields
  const [docNumber, setDocNumber] = useState(`ETA-INV-${Date.now().toString().slice(-6)}`);
  const [docDate, setDocDate] = useState(new Date().toISOString().split('T')[0]);
  const [recipientOrg, setRecipientOrg] = useState(recipientCompany);
  const [recipientContact, setRecipientContact] = useState('م/ سامح قاسم (مدير الخدمات)');
  const [recipientTaxId, setRecipientTaxId] = useState('624-918-350');
  const [recipientAddress, setRecipientAddress] = useState('المنطقة الصناعية — طريق السويس - العين السخنة');
  const [contractReference, setContractReference] = useState('عقد الإعاشة السنوي المعتمد 2026/2025');
  const [discountRate, setDiscountRate] = useState<number>(10); // 10%
  const [notes, setNotes] = useState<string>('الأسعار شاملة التعبئة في علب حرارية معقمة والتوصيل لمواقع العمل. السداد بشيك أو تحويل بنكي / فودافون كاش خلال 15 يوماً من تاريخ المطالبة.');

  // Items List
  const [items, setItems] = useState<DocItem[]>([
    {
      id: 'it-1',
      description: 'وجبات ساخنة مطبوخة (نصف دجاجة مشوية + أرز بسمتي بالخلطة + سلطة + خبز)',
      portionSpec: 'حصة 550 جم معبأة حرارياً',
      quantity: 1200,
      unitPrice: 110
    },
    {
      id: 'it-2',
      description: 'وجبات إفطار عمالي متكامل (بيض مسلوق + جبن + مربى + زبدة فول سوداني + خيار + عيش)',
      portionSpec: 'علبة متكاملة صحية',
      quantity: 800,
      unitPrice: 65
    },
    {
      id: 'it-3',
      description: 'توريدات كانتين وعصائر ومخبوزات طازجة (فرع Ha-Be Market)',
      portionSpec: 'أصناف متنوعة يومية',
      quantity: 450,
      unitPrice: 25
    }
  ]);

  if (!isOpen) return null;

  // Add Item
  const handleAddItem = () => {
    const newItem: DocItem = {
      id: `it-${Date.now()}`,
      description: 'صنف وجبة أو توريد جديد',
      portionSpec: 'حصة قياسية معتمدة',
      quantity: 100,
      unitPrice: 50
    };
    setItems([...items, newItem]);
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) {
      onShowToast('يجب وجود بند واحد على الأقل في الوثيقة.');
      return;
    }
    setItems(items.filter((i) => i.id !== id));
  };

  // Update item field
  const handleUpdateItem = (id: string, field: keyof DocItem, val: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unitPrice)), 0);
  const discountAmount = Math.round((subtotal * discountRate) / 100);
  const afterDiscount = subtotal - discountAmount;
  // Egyptian VAT 14% on Commercial Invoices & E-Invoices
  const vatAmount = docType === 'commercial_invoice' || docType === 'e_invoice' ? Math.round(afterDiscount * 0.14) : 0;
  const grandTotal = afterDiscount + vatAmount;

  // Print Action
  const handlePrint = () => {
    onAddAuditLog(
      `طباعة وثيقة مالية/تشغيلية: ${docType} [${docNumber}]`,
      `Printed Document: ${docType} [${docNumber}]`,
      `الجهة المستفيدة: ${recipientOrg} · إجمالي المبلغ: ${grandTotal.toLocaleString()} ج.م.`
    );
    onShowToast('تم إرسال الوثيقة للطباعة.');
    window.print();
  };

  // Download PDF simulation / JSON
  const handleDownloadPDF = () => {
    onAddAuditLog(
      `تنزيل وتحميل وثيقة PDF: ${docType} [${docNumber}]`,
      `Downloaded PDF: ${docType} [${docNumber}]`,
      `تم استخراج نسخة PDF المعتمدة للجهة: ${recipientOrg}.`
    );
    onShowToast(`تم تحميل ملف PDF لوثيقة [${docNumber}] بنجاح.`);
    window.print();
  };

  const titles: Record<UniversalDocType, { ar: string; en: string; badge: string }> = {
    quotation: {
      ar: 'عرض سعر تجاري ومواصفات توريد معتمدة',
      en: 'Official Commercial Quotation & Specifications',
      badge: 'عرض سعر معتمد'
    },
    delivery_statement: {
      ar: 'بيان تشغيل وتوريد وجبات يومي (سند استلام موقع)',
      en: 'Daily Meals Delivery & Dispatch Statement',
      badge: 'بيان تشغيل يومي'
    },
    commercial_invoice: {
      ar: 'فاتورة توريد تجارية ومطالبة مالية',
      en: 'Commercial Supply Invoice & Financial Claim',
      badge: 'فاتورة تجارية'
    },
    e_invoice: {
      ar: 'فاتورة إلكترونية ضريبية معتمدة (منظومة الضرائب المصرية ETA)',
      en: 'Official ETA Egyptian Tax Authority E-Invoice',
      badge: 'فاتورة إلكترونية ETA'
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[94vh] overflow-hidden my-auto">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white">
                منظومة إنشاء وتحرير الوثائق والفواتير الإلكترونية المعتمدة
              </h3>
              <p className="text-[11px] text-slate-400">
                واجهة متكاملة للتعديل والتحميل PDF والطباعة الرسمية الفورية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isEditing
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'وضع التعديل المباشر نشط' : 'معاينة جاهزة للطباعة'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Type Selector Ribbon */}
        <div className="px-6 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {(['e_invoice', 'commercial_invoice', 'delivery_statement', 'quotation'] as UniversalDocType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setDocType(type);
                onShowToast(`تم تحويل القالب إلى: ${titles[type].badge}`);
              }}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                docType === type
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <span>{titles[type].badge}</span>
            </button>
          ))}
        </div>

        {/* Printable/Editable Document Viewport (The Document Sheet) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/50 dark:bg-slate-950/80 flex justify-center">
          
          {/* A4 Paper Simulation Canvas */}
          <div className="w-full max-w-4xl bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-300 relative space-y-6">
            
            {/* Top Official Letterhead */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
              
              {/* Right Side: Arabic Corporate Identity */}
              <div className="text-right">
                <h2 className="font-black text-xl text-slate-950 leading-tight">
                  الشركة الوطنية اللوجستية لتوريدات المواد الغذائية
                </h2>
                <p className="text-xs font-bold text-orange-600 mt-0.5">
                  كاترينج مصر — منصة التقنية والتشغيل الغذائي والزراعي
                </p>
                <div className="text-[11px] text-slate-600 space-y-0.5 mt-1 font-medium">
                  <p>سجل تجاري: <strong className="font-mono">19132</strong> (مكتب العاشر من رمضان المميز)</p>
                  <p>البطاقة الضريبية: <strong className="font-mono">725-995-758</strong> (كود النشاط: 4711)</p>
                  <p>بطاقة سجل المصدرين: <strong className="font-mono">600023736</strong> (GOEIC)</p>
                </div>
              </div>

              {/* Center Official Pyramidal Eagle Emblem */}
              <div className="flex flex-col items-center text-center">
                <BrandLogo size="lg" showGlow={false} />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 mt-1">
                  OFFICIAL SEAL
                </span>
              </div>

              {/* Left Side: English Identity & QR Code */}
              <div className="text-left flex flex-col items-end">
                <div className="w-16 h-16 rounded-xl bg-slate-100 p-1 border border-slate-300 shadow-xs mb-1">
                  <QrCode className="w-full h-full text-slate-800" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  ETA-UUID: {docNumber}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                  {titles[docType].badge}
                </span>
              </div>
            </div>

            {/* Document Header & Metadata Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">رقم الوثيقة / الفاتورة:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="font-mono font-black text-sm text-slate-900 bg-white px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="font-mono font-black text-sm text-slate-900">{docNumber}</span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">تاريخ الإصدار / التحرير:</span>
                {isEditing ? (
                  <input
                    type="date"
                    value={docDate}
                    onChange={(e) => setDocDate(e.target.value)}
                    className="font-bold text-xs text-slate-900 bg-white px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="font-bold text-xs text-slate-900">{docDate}</span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">مرجع العقد / أمر التوريد:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={contractReference}
                    onChange={(e) => setContractReference(e.target.value)}
                    className="font-bold text-xs text-slate-900 bg-white px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="font-bold text-xs text-slate-900">{contractReference}</span>
                )}
              </div>
            </div>

            {/* Recipient Client Details Box */}
            <div className="p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">الجهة المستفيدة / العميل:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipientOrg}
                    onChange={(e) => setRecipientOrg(e.target.value)}
                    className="font-black text-sm text-slate-900 bg-slate-50 px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="font-black text-sm text-slate-900">{recipientOrg}</span>
                )}
                
                <span className="text-[10px] text-slate-400 font-bold block mt-2">المسؤول والمفوض بالاستلام:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipientContact}
                    onChange={(e) => setRecipientContact(e.target.value)}
                    className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="text-xs text-slate-700">{recipientContact}</span>
                )}
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">رقم التسجيل الضريبي للمنشأة:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipientTaxId}
                    onChange={(e) => setRecipientTaxId(e.target.value)}
                    className="font-mono font-bold text-xs text-slate-900 bg-slate-50 px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="font-mono font-bold text-xs text-slate-900">{recipientTaxId}</span>
                )}

                <span className="text-[10px] text-slate-400 font-bold block mt-2">عنوان موقع التسليم والتوريد:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border w-full mt-0.5"
                  />
                ) : (
                  <span className="text-xs text-slate-700">{recipientAddress}</span>
                )}
              </div>
            </div>

            {/* Editable Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold">
                    <th className="p-2.5 rounded-tr-xl">م</th>
                    <th className="p-2.5">بيان الصنف / الوجبة</th>
                    <th className="p-2.5">المواصفة والوزن</th>
                    <th className="p-2.5 text-center">الكمية</th>
                    <th className="p-2.5 text-center">سعر الوحدة</th>
                    <th className="p-2.5 text-left">الإجمالي (ج.م)</th>
                    {isEditing && <th className="p-2.5 text-center rounded-tl-xl">حذف</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold font-mono text-slate-400">{idx + 1}</td>
                      
                      <td className="p-2.5">
                        {isEditing ? (
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            className="w-full p-1 border rounded font-bold text-slate-900 text-xs"
                          />
                        ) : (
                          <span className="font-bold text-slate-900">{item.description}</span>
                        )}
                      </td>

                      <td className="p-2.5">
                        {isEditing ? (
                          <input
                            type="text"
                            value={item.portionSpec}
                            onChange={(e) => handleUpdateItem(item.id, 'portionSpec', e.target.value)}
                            className="w-full p-1 border rounded text-slate-600 text-xs"
                          />
                        ) : (
                          <span className="text-slate-600">{item.portionSpec}</span>
                        )}
                      </td>

                      <td className="p-2.5 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                            className="w-20 p-1 border rounded text-center font-bold text-slate-900 text-xs"
                          />
                        ) : (
                          <span className="font-bold text-slate-900">{item.quantity}</span>
                        )}
                      </td>

                      <td className="p-2.5 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                            className="w-20 p-1 border rounded text-center font-bold text-slate-900 text-xs"
                          />
                        ) : (
                          <span className="font-bold text-slate-900">{item.unitPrice}</span>
                        )}
                      </td>

                      <td className="p-2.5 text-left font-black text-slate-900">
                        {(item.quantity * item.unitPrice).toLocaleString()}
                      </td>

                      {isEditing && (
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {isEditing && (
                <button
                  onClick={handleAddItem}
                  className="mt-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة بند توريد جديد</span>
                </button>
              )}
            </div>

            {/* Totals & Tax Calculation Breakdown */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4 border-t-2 border-slate-200">
              
              {/* Notes & Terms Box */}
              <div className="w-full sm:w-1/2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">شروط التوريد والملاحظات الرسمية:</span>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl border text-xs text-slate-700 outline-none"
                  />
                ) : (
                  <p className="text-slate-600 leading-relaxed">{notes}</p>
                )}
              </div>

              {/* Summary Numbers */}
              <div className="w-full sm:w-1/3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">إجمالي البنود:</span>
                  <span className="font-bold text-slate-900">{subtotal.toLocaleString()} ج.م</span>
                </div>

                <div className="flex justify-between items-center text-emerald-700">
                  <span className="font-bold">خصم التعاقد ({discountRate}%):</span>
                  <span>- {discountAmount.toLocaleString()} ج.م</span>
                </div>

                {/* Show VAT 14% on Invoices */}
                {(docType === 'commercial_invoice' || docType === 'e_invoice') && (
                  <div className="flex justify-between text-blue-700 font-bold">
                    <span>ضريبة القيمة المضافة (14%):</span>
                    <span>+ {vatAmount.toLocaleString()} ج.م</span>
                  </div>
                )}

                <div className="flex justify-between font-black text-base text-slate-950 pt-2 border-t-2 border-slate-300">
                  <span>المبلغ الإجمالي المستحق:</span>
                  <span className="text-orange-600">{grandTotal.toLocaleString()} ج.م</span>
                </div>
              </div>
            </div>

            {/* Official Signatures & ETA Tax Stamp Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t-2 border-slate-900 text-center text-xs">
              <div className="space-y-6">
                <span className="font-bold text-slate-500 block">إعداد ومراجعة الحسابات</span>
                <span className="font-bold text-slate-900 block">أ/ عبد المجيد الرخاوي</span>
                <span className="text-[10px] text-slate-400">المدير المالي ورئيس الحسابات</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                {/* Official National Logistics Circular Stamp */}
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-600 flex flex-col items-center justify-center p-1 text-red-600 select-none transform rotate-[-8deg]">
                  <span className="text-[8px] font-black">الوطنية اللوجستية</span>
                  <span className="text-[7px]">سجل تجاري 19132</span>
                  <span className="text-[8px] font-bold">مصلحة الضرائب ETA</span>
                  <span className="text-[7px]">معتمد رسمياً</span>
                </div>
              </div>

              <div className="space-y-6">
                <span className="font-bold text-slate-500 block">اعتماد الإدارة المركزية والتشغيل</span>
                <span className="font-black text-slate-900 block">م/ مصطفى شعبان عبد العليم</span>
                <span className="text-[10px] text-slate-400">مدير العمليات المركزية والمفوض العام</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
