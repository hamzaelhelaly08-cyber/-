import React, { useState } from 'react';
import { Copy, Check, QrCode, Edit3, ShieldCheck } from 'lucide-react';
import { CouponTemplate, EXPERIMENTAL_TAG_AR, EXPERIMENTAL_TAG_EN } from '../data/visitorWorldData';
import { LanguageCode } from '../data/phase1Data';
import { Service3DIcon } from './Service3DIcon';
import { BasitBrandMark } from './BasitBrandMark';

interface VoucherCouponCardProps {
  coupon: CouponTemplate;
  lang: LanguageCode;
  customLogoDataUrl?: string | null;
}

export const VoucherCouponCard: React.FC<VoucherCouponCardProps> = ({
  coupon,
  lang,
  customLogoDataUrl,
}) => {
  const isRtl = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const [showQrVerifier, setShowQrVerifier] = useState(false);
  const [customDiscountInput, setCustomDiscountInput] = useState('');
  const [isEditingSlot, setIsEditingSlot] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="ce-coupon-notch rounded-3xl overflow-hidden shadow-lg border border-[#ECE7F6] dark:border-[#852BEB]/40 bg-white dark:bg-[#1C1430] flex flex-col">
      {/* Top BASIT Purple Voucher Stub */}
      <div
        className={`bg-gradient-to-br ${coupon.accentGradient} p-4 sm:p-5 text-white relative`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Service3DIcon iconKey={coupon.iconKey} size="sm" />
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#F4E600]">
                {isRtl ? 'BASIT | بسيط · قسائم العروض' : 'BASIT | Offers & Vouchers'}
              </div>
              <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                {isRtl ? coupon.categoryAr : coupon.categoryEn}
              </h4>
              <div className="text-[11px] font-bold text-[#EDE9FE] mt-0.5">
                {isRtl
                  ? 'مساحة عرض تجريبية بانتظار اعتماد القيمة النهائية'
                  : 'Demo voucher template pending final approval'}
              </div>
            </div>
          </div>

          <BasitBrandMark customLogoDataUrl={customLogoDataUrl} size="xs" isRtl={isRtl} />
        </div>

        {/* Editable / Placeholder Discount Display */}
        <div className="mt-4 pt-3 border-t border-dashed border-white/30 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold text-[#EDE9FE] block">
              {isRtl ? 'قيمة / نسبة العرض:' : 'Offer Value:'}
            </span>
            {isEditingSlot ? (
              <input
                type="text"
                value={customDiscountInput}
                onChange={(e) => setCustomDiscountInput(e.target.value)}
                placeholder={isRtl ? 'مثال: عرض تجريبي' : 'e.g. Demo Offer'}
                className="mt-1 px-2.5 py-1 rounded-lg bg-white text-[#1A132B] text-xs font-black w-44 focus:outline-none"
              />
            ) : (
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded-lg bg-[#F4E600] text-[#1A132B] text-xs sm:text-sm font-black shadow-xs">
                {customDiscountInput.trim() ||
                  (isRtl
                    ? coupon.defaultDiscountLabelAr
                    : coupon.defaultDiscountLabelEn)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditingSlot((p) => !p)}
            className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3 h-3 text-[#F4E600]" />
            <span>
              {isEditingSlot
                ? isRtl
                  ? 'حفظ الخانة'
                  : 'Done'
                : isRtl
                  ? 'تعديل تجريبي'
                  : 'Edit Slot'}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Voucher Perforated Body */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#1C1430] flex-1 flex flex-col justify-between gap-4 border-t-2 border-dashed border-[#ECE7F6] dark:border-[#852BEB]/35">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <span className="text-[10px] font-bold text-[#6E6485] dark:text-[#B8AED1] block">
              {isRtl ? 'كود القسيمة التجريبي:' : 'Demo Coupon Code:'}
            </span>
            <div className="mt-1 flex items-center gap-2">
              <code className="px-3 py-1.5 rounded-xl bg-[#F8F5FF] dark:bg-[#2A1E44] border border-[#ECE7F6] dark:border-[#852BEB]/35 text-xs font-mono font-black text-[#5B18B0] dark:text-[#F4E600]">
                {coupon.code}
              </code>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2.5 py-1.5 rounded-xl bg-[#F8F7FB] dark:bg-[#24193E] hover:bg-[#F3EEFF] text-xs font-bold text-[#1A132B] dark:text-white flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#852BEB] dark:text-[#F4E600]" />
                )}
                <span>
                  {copied
                    ? isRtl
                      ? 'تم النسخ'
                      : 'Copied'
                    : isRtl
                      ? 'نسخ'
                      : 'Copy'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowQrVerifier((p) => !p)}
            title={isRtl ? 'عرض / إخفاء رمز التحقق QR' : 'Toggle QR Verification'}
            className="w-14 h-14 rounded-2xl bg-[#F8F7FB] dark:bg-[#24193E] border border-[#ECE7F6] dark:border-[#852BEB]/35 hover:border-[#852BEB] flex flex-col items-center justify-center p-1.5 shrink-0 cursor-pointer transition-colors"
          >
            <QrCode className="w-8 h-8 text-[#1A132B] dark:text-white" />
            <span className="text-[9px] font-black text-[#852BEB] dark:text-[#F4E600]">QR</span>
          </button>
        </div>

        {showQrVerifier && (
          <div className="p-3 rounded-2xl bg-[#F8F5FF] dark:bg-[#24193E] border border-[#ECE7F6] dark:border-[#852BEB]/35 flex items-center gap-3 text-[11px]">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-[#1A132B] dark:text-[#EDE9FE] font-semibold">
              {isRtl
                ? `نموذج رمز تحقق (${coupon.code}) جاهز للربط الفعلي بمسح الباركود عند التفعيل.`
                : `Verification token (${coupon.code}) ready for live QR scanning upon activation.`}
            </div>
          </div>
        )}

        <div className="space-y-1 text-[11px] text-[#4A4160] dark:text-[#C4B5FD]">
          <div>
            <strong className="text-[#1A132B] dark:text-white">
              {isRtl ? 'الصلاحية: ' : 'Validity: '}
            </strong>
            <span>{isRtl ? coupon.validityAr : coupon.validityEn}</span>
          </div>
          <p className="leading-relaxed">
            <strong className="text-[#1A132B] dark:text-white">
              {isRtl ? 'الشروط: ' : 'Terms: '}
            </strong>
            <span>{isRtl ? coupon.termsAr : coupon.termsEn}</span>
          </p>
        </div>

        <div className="text-[10px] font-extrabold text-[#5B18B0] dark:text-[#F4E600] pt-2 border-t border-[#ECE7F6] dark:border-[#852BEB]/25">
          {isRtl ? EXPERIMENTAL_TAG_AR : EXPERIMENTAL_TAG_EN}
        </div>
      </div>
    </div>
  );
};
