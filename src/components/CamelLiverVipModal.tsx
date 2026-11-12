import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Users, 
  Clock, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  UtensilsCrossed, 
  X,
  Calendar,
  Share2
} from 'lucide-react';

interface CamelLiverVipModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl?: boolean;
  onShowToast: (msg: string) => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
}

export const CamelLiverVipModal: React.FC<CamelLiverVipModalProps> = ({
  isOpen,
  onClose,
  isRtl = true,
  onShowToast,
  onAddAuditLog
}) => {
  const [traySize, setTraySize] = useState<'1kg' | '2kg' | 'vip_feast'>('2kg');
  const [reservationName, setReservationName] = useState('');
  const [reservationPhone, setReservationPhone] = useState('');
  const [guestCount, setGuestCount] = useState(6);
  const [reservedDate, setReservedDate] = useState('2026-11-20');
  const [reservationTime, setReservationTime] = useState('07:00 م');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName.trim() || !reservationPhone.trim()) {
      onShowToast('يرجى ملء الاسم ورقم الهاتف لإتمام الحجز.');
      return;
    }

    const bookingRef = `VIP-CAMEL-${Math.floor(1000 + Math.random() * 9000)}`;
    setIsSuccess(true);

    onAddAuditLog(
      `حجز طاسة الكبدة الجملي VIP — ركن الجملي بمول العين [${bookingRef}]`,
      `VIP Camel Liver Feast Reserved [${bookingRef}]`,
      `العميل: ${reservationName} (${reservationPhone}) · عدد الضيوف: ${guestCount} أفراد · الصينية: ${traySize} · الموعد: ${reservedDate} ${reservationTime}`
    );

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      onShowToast(`تم تأكيد حجز القعدة الخاصة بركن الجملي بكود [${bookingRef}]. شيف المطبخ بانتظاركم!`);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-orange-500/40 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Hero Image Banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
          <img
            src="/assets/catering/camel_liver_tray.jpg"
            alt="طاسة الكبدة الجملي والسجق البلدي"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>

          {/* Badge over image */}
          <div className="absolute bottom-4 right-4 z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600 text-white text-[11px] font-black shadow-lg mb-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-current" />
              <span>ركن الجملي الفاخر — قعدات خاصة لكبار الزوار والعزائم</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              طاسة الكبدة الجملي والسجق البلدي والكفتة
            </h3>
            <p className="text-xs text-orange-200 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>مطبخ مول العين — مدينة بدر (صالة كبار الزوار والغرف الخاصة)</span>
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Highlights Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 text-center">
              <span className="text-xs font-bold text-slate-500 block">مصدر اللحوم</span>
              <span className="font-black text-sm text-orange-600">كبدة جملي بلدي طازجة 100%</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">ذبح اليوم تحت إشراف بيطري</span>
            </div>

            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 text-center">
              <span className="text-xs font-bold text-slate-500 block">طريقة التجهيز</span>
              <span className="font-black text-sm text-orange-600">تشويح فوري بالسمن البلدي والثوم</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">أمام الضيوف في صواني استانلس ونحاس</span>
            </div>

            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 text-center">
              <span className="text-xs font-bold text-slate-500 block">الخصوصية</span>
              <span className="font-black text-sm text-orange-600">جلسات عربية وقاعات VIP</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">تتسع من 4 إلى 30 فرداً</span>
            </div>
          </div>

          {/* Form / Booking */}
          {!isSuccess ? (
            <form onSubmit={handleBookTable} className="space-y-4">
              <h4 className="font-black text-sm text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                اختر حجم الطاسة وتفاصيل حجز القعدة:
              </h4>

              {/* Tray Size Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setTraySize('1kg')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                    traySize === '1kg'
                      ? 'bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-500/30'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="font-black text-sm block">صينية 1 كجم مشكل</span>
                  <span className="text-xs opacity-90 block mt-0.5">تكفي 3 — 4 أفراد</span>
                  <span className="font-black text-sm block mt-2">680 ج.م</span>
                </div>

                <div
                  onClick={() => setTraySize('2kg')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-center relative ${
                    traySize === '2kg'
                      ? 'bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-500/30'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="absolute -top-2.5 right-1/2 translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                    الأكثر طلباً
                  </span>
                  <span className="font-black text-sm block">صينية 2 كجم ملكية (الصورة)</span>
                  <span className="text-xs opacity-90 block mt-0.5">تكفي 6 — 8 أفراد</span>
                  <span className="font-black text-sm block mt-2">1,280 ج.م</span>
                </div>

                <div
                  onClick={() => setTraySize('vip_feast')}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                    traySize === 'vip_feast'
                      ? 'bg-orange-600 text-white border-orange-600 shadow-md ring-2 ring-orange-500/30'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="font-black text-sm block">صينية العزائم والوفود VIP</span>
                  <span className="text-xs opacity-90 block mt-0.5">تكفي 12 — 15 فرداً</span>
                  <span className="font-black text-sm block mt-2">2,450 ج.م</span>
                </div>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">اسم المسؤول / الضيف:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: م/ أحمد عبد الرحمن"
                    value={reservationName}
                    onChange={(e) => setReservationName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">رقم الهاتف للتواصل وتأكيد الحجز:</label>
                  <input
                    type="tel"
                    required
                    placeholder="010xxxxxxxx"
                    value={reservationPhone}
                    onChange={(e) => setReservationPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">تاريخ العزومة:</label>
                  <input
                    type="date"
                    value={reservedDate}
                    onChange={(e) => setReservedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">عدد الضيوف والحضور:</label>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد حجز القعدة بركن الجملي (مول العين)</span>
                </button>

                <a
                  href="tel:01010430347"
                  className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span>اتصال مباشر</span>
                </a>
              </div>
            </form>
          ) : (
            <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl border border-emerald-500/40">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-lg text-emerald-800 dark:text-emerald-300">
                تم استلام طلب حجز القعدة الخاصة بركن الجملي بنجاح!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                سيقوم مدير التشغيل بمطبخ مول العين بمدينة بدر بالتواصل معكم فوراً لتأكيد وصول المكونات الطازجة وضبط موعد الاستقبال.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
