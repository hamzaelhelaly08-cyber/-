import React from 'react';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { LanguageCode, PHASE1_I18N } from '../data/phase1Data';

export interface Phase1CartItem {
  id: string;
  nameAr: string;
  nameEn: string;
  kitchenNameAr: string;
  kitchenNameEn: string;
  approvedPrice: number | null;
  quantity: number;
}

interface Phase1CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
  currencyLabel: string;
  items: Phase1CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onConvertToQuote: () => void;
}

export const Phase1CartDrawer: React.FC<Phase1CartDrawerProps> = ({
  isOpen,
  onClose,
  lang,
  currencyLabel,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onConvertToQuote,
}) => {
  if (!isOpen) return null;

  const isRtl = lang === 'ar';
  const t = PHASE1_I18N[lang];

  const pricedSubtotal = items.reduce((acc, item) => {
    if (typeof item.approvedPrice === 'number') {
      return acc + item.approvedPrice * item.quantity;
    }
    return acc;
  }, 0);

  const hasUnapprovedItems = items.some((i) => i.approvedPrice === null);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-s border-slate-200 dark:border-slate-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center shadow-md shadow-orange-500/25">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {t.cartTitle}
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                {items.reduce((sum, i) => sum + i.quantity, 0)}{' '}
                {isRtl ? 'عنصر محفوظ' : 'saved items'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950/60">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-[#FF6B00] flex items-center justify-center">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-sm font-black text-slate-900 dark:text-white">{t.cartEmpty}</p>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                {isRtl
                  ? 'أضف وجبات من صفحات المطابخ المركزية أو الكتالوج لتعديل الكميات وتحويلها إلى طلب عرض سعر.'
                  : 'Add items from Central Kitchens or Catalog to edit quantities and request a quotation.'}
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">
                      {isRtl ? item.nameAr : item.nameEn}
                    </h4>
                    <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                      {isRtl ? item.kitchenNameAr : item.kitchenNameEn}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title={t.cartRemove}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    {typeof item.approvedPrice === 'number' ? (
                      <span className="text-xs font-extrabold text-[#FF6B00] tabular-nums">
                        {(item.approvedPrice * item.quantity).toLocaleString()} {currencyLabel}
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                        {t.awaitingApproval}
                      </span>
                    )}
                  </div>

                  {/* Quantity Steppers */}
                  <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white hover:bg-[#FF6B00] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center text-xs font-black text-slate-900 dark:text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-white hover:bg-[#FF6B00] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {hasUnapprovedItems && (
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{t.cartUnapprovedNote}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">{t.cartSubtotal}</span>
              <span className="text-base font-black text-slate-900 dark:text-white tabular-nums">
                {pricedSubtotal.toLocaleString()} {currencyLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onConvertToQuote}
                className="flex-1 py-3 px-4 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>{t.cartConvertQuote}</span>
              </button>
              <button
                type="button"
                onClick={onClearCart}
                className="py-3 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-700 dark:text-slate-200 hover:text-rose-600 font-bold text-xs cursor-pointer transition-colors"
                title={isRtl ? 'إفراغ السلة' : 'Clear cart'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
