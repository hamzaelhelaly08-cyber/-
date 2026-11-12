import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Printer, 
  Send, 
  Camera, 
  Video, 
  FileCheck, 
  Globe2, 
  PackageCheck, 
  Award, 
  Flame, 
  Users, 
  Layers, 
  Compass, 
  Heart,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface CharityReliefHubProps {
  isRtl: boolean;
  onOpenPrintCharityDoc: (recipientOrg?: string) => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
  onShowToast: (msg: string) => void;
}

export const CharityReliefHub: React.FC<CharityReliefHubProps> = ({
  isRtl,
  onOpenPrintCharityDoc,
  onAddAuditLog,
  onShowToast
}) => {
  // Preset Feeding Packages
  const [selectedPackage, setSelectedPackage] = useState<'kaffarah10' | 'kaffarah30' | 'feeding50' | 'cartonRelief' | 'haramMeals' | 'disasterRelief'>('kaffarah10');
  
  // Custom meal count
  const [customMealsCount, setCustomMealsCount] = useState<number>(10);
  
  // Distribution Scope: 'general' | 'specific' | 'haram' | 'border_relief'
  const [distributionScope, setDistributionScope] = useState<'general' | 'specific' | 'haram' | 'border_relief'>('general');
  const [customLocationText, setCustomLocationText] = useState<string>('');
  
  // Donor / Requester Info
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [donorNotes, setDonorNotes] = useState<string>('');
  const [wantsMediaProof, setWantsMediaProof] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Pricing constants (Approximate transparent food cost in EGP)
  const MEAL_UNIT_PRICE = 65; // EGP for a hearty cooked religious meal (protein, carbs, bread, fruit/dates)
  const CARTON_UNIT_PRICE = 420; // EGP for comprehensive food relief carton

  const calculateTotalCost = () => {
    switch (selectedPackage) {
      case 'kaffarah10':
        return 10 * MEAL_UNIT_PRICE;
      case 'kaffarah30':
        return 30 * MEAL_UNIT_PRICE;
      case 'feeding50':
        return 50 * MEAL_UNIT_PRICE;
      case 'cartonRelief':
        return customMealsCount * CARTON_UNIT_PRICE;
      case 'haramMeals':
        return customMealsCount * 75; // Specialized vacuum pack + Zamzam & dates
      case 'disasterRelief':
        return customMealsCount * 85; // MRE military/humanitarian spec long-life pouch
      default:
        return customMealsCount * MEAL_UNIT_PRICE;
    }
  };

  const getPackageTitle = () => {
    switch (selectedPackage) {
      case 'kaffarah10':
        return 'كفارة يمين شرعية (إطعام 10 مساكين)';
      case 'kaffarah30':
        return 'إطعام 30 مسكيناً (عذر صيام أو نذر)';
      case 'feeding50':
        return 'إطعام 50 مسكيناً (صدقة جارية ودور أيتام)';
      case 'cartonRelief':
        return 'كرتونة الإغاثة الغذائية المتكاملة للأسر';
      case 'haramMeals':
        return 'إفطار صائم وإطعام زوار الحرم وموسم الحج';
      case 'disasterRelief':
        return 'إغاثة غذائية عاجلة للدول والمناطق المنكوبة';
    }
  };

  const handleSubmitCharityOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) {
      onShowToast(isRtl ? 'يرجى إدخال اسم المتبرع ورقم الهاتف للتنسيق.' : 'Please enter donor name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      onAddAuditLog(
        `تسجيل طلب إطعام وتوكيل خيري: ${getPackageTitle()}`,
        `Registered Charity Feeding Order: ${selectedPackage}`,
        `المتبرع: ${donorName} (${donorPhone}) — نطاق التوزيع: ${distributionScope} — التكلفة: ${calculateTotalCost()} ج.م`
      );
      onShowToast(isRtl ? 'تم تسجيل وتوكيل طلب الإطعام الخيري بنجاح، وتجهيز شهادة التوكيل.' : 'Charity feeding delegation order registered successfully!');
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-orange-500/40 shadow-2xl p-6 sm:p-10 text-white">
      
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-orange-500/30 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 shadow-xl shadow-orange-600/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
              <HeartHandshake className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>إطعام الطعام · كفارة اليمين · الإغاثة الغذائية الدولية</span>
              </span>
              <span className="hidden sm:inline-block text-xs font-bold text-slate-400">
                إشراف م/ مصطفى شعبان
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight">
              قطاع الإطعام الخيري والإغاثة — <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">«وجبتك أمانة وتوزيعها مسؤوليتنا»</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              خدمة توكيل شرعي معتمدة لإعداد وطهي وتوزيع وجبات كفارة اليمين، النذور، الصدقات، كراتين رمضان، إطعام زوار الحرم المكي الشريف، وإغاثة الدول والمناطق المنكوبة بأسطول الوطنية اللوجستية الموثق بالفيديو والصور.
            </p>
          </div>
        </div>

        {/* Print Certificate Button */}
        <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
          <button
            onClick={() => onOpenPrintCharityDoc(donorName ? `السيد المتبرع / ${donorName}` : undefined)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            title="طباعة شهادة التوكيل والإطعام الشرعي PDF"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>طباعة شهادة التوكيل الرسمية</span>
          </button>
        </div>
      </div>

      {/* Main 4 Pillars Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        
        {/* Pillar 1: كفارة اليمين */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400 transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-white">كفارة اليمين الشرعية</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            إطعام 10 مساكين وفق الضوابط الفقهية المعتمدة: وجبات ساخنة مطبوخة مشبعة (بروتين صافي + أرز + خضار + خبز + فاكهة) تبرئ ذمتك بالكامل.
          </p>
        </div>

        {/* Pillar 2: التوكيل والتوزيع نيابة عنك */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-orange-500/30 hover:border-orange-400 transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold">
            <Camera className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-white">توزيع موثق نيابة عنك</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            توكلنا بالطبخ والتوزيع باليد لمستحقيها في القرى ودور الأيتام، ونرسل لك توثيقاً مرئياً بالفيديو والصور وإشعار تسليم رسمي يحفظ كرامة المستحقين.
          </p>
        </div>

        {/* Pillar 3: دعم الدول المنكوبة والإغاثة */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-white">إغاثة الدول المنكوبة والحدود</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            وجبات إغاثة جافة ومعقمة Ready-to-Eat طويلة الصلاحية 12 شهراً، معبأة في أكياس ألومنيوم حرارية مقاومة للصدمات للمتضررين وقوافل الإغاثة.
          </p>
        </div>

        {/* Pillar 4: الحرم وموسم الحج ورمضان */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 transition-all space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-white">إطعام الحرم والمشاعر المقدسة</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            وجبات إفطار صائم وسحور لضيوف الرحمن بالحرم المكي الشريف والمشاعر (منى وعرفات) بالتعاون اللوجستي المعتمد بتمور الواحات ومياه زمزم.
          </p>
        </div>

      </div>

      {/* Interactive Feeding Calculator & Delegation Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Packages & Options (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xs">1</span>
              <span>اختر باقة الإطعام أو برنامج الكفارة:</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              جميع الوجبات تطهى طازجة يومياً في مطابخنا المركزية الثلاثة تحت رقابة صحية صارمة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Package 1: كفارة يمين 10 وجبات */}
            <div
              onClick={() => { setSelectedPackage('kaffarah10'); setCustomMealsCount(10); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedPackage === 'kaffarah10'
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  الواجب الشرعي
                </span>
                <span className="text-xs font-black text-white">
                  {10 * MEAL_UNIT_PRICE} ج.م
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">كفارة يمين (إطعام 10 مساكين)</h4>
              <p className="text-[11px] text-slate-400 mt-1">10 وجبات مشبعة (دجاج/لحم + أرز + خضار + خبز + تمر) مطابقة للفتوى الشرعية.</p>
            </div>

            {/* Package 2: إطعام 30 مسكين */}
            <div
              onClick={() => { setSelectedPackage('kaffarah30'); setCustomMealsCount(30); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedPackage === 'kaffarah30'
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                  عذر صيام أو نذر
                </span>
                <span className="text-xs font-black text-white">
                  {30 * MEAL_UNIT_PRICE} ج.م
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">إطعام 30 مسكيناً (شهر كامل)</h4>
              <p className="text-[11px] text-slate-400 mt-1">30 وجبة طعام كاملة للأسر المتعففة وكفارة الفدية عن شهر كامل.</p>
            </div>

            {/* Package 3: إطعام 50 مسكين */}
            <div
              onClick={() => { setSelectedPackage('feeding50'); setCustomMealsCount(50); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedPackage === 'feeding50'
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  صدقة جارية كبرى
                </span>
                <span className="text-xs font-black text-white">
                  {50 * MEAL_UNIT_PRICE} ج.م
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">إطعام 50 مسكيناً (دور أيتام ومستشفيات)</h4>
              <p className="text-[11px] text-slate-400 mt-1">توزيع شامل لدور الرعاية وعمال اليومية مع توثيق تسليم كامل.</p>
            </div>

            {/* Package 4: كرتونة رمضان والإغاثة */}
            <div
              onClick={() => { setSelectedPackage('cartonRelief'); setCustomMealsCount(10); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedPackage === 'cartonRelief'
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  كرتونة مواد جافة
                </span>
                <span className="text-xs font-black text-white">
                  من 420 ج.م/كرتونة
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">كرتونة الخير الغذائية والإغاثية</h4>
              <p className="text-[11px] text-slate-400 mt-1">أرز، سكر، زيت، سمن، مكرونة، شاي، تمر فاخر تكفي أسرة كاملة أسبوعين.</p>
            </div>

            {/* Package 5: وجبات الحرم والحج */}
            <div
              onClick={() => { setSelectedPackage('haramMeals'); setCustomMealsCount(50); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedPackage === 'haramMeals'
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
                  مواسم الحرم الشريف
                </span>
                <span className="text-xs font-black text-white">
                  75 ج.م/وجبة
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">إفطار زوار الحرم المكي وموسم الحج</h4>
              <p className="text-[11px] text-slate-400 mt-1">وجبات معقمة مفرغة مع ماء زمزم وتمر فاخر للمعتمرين والحجاج بالمشاعر.</p>
            </div>

            {/* Package 6: إغاثة الدول المنكوبة */}
            <div
              onClick={() => { setSelectedPackage('disasterRelief'); setCustomMealsCount(100); }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedPackage === 'disasterRelief'
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                  إغاثة إنسانية دولية
                </span>
                <span className="text-xs font-black text-white">
                  85 ج.م/وجبة طوارئ
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-2">إغاثة غذائية للمناطق والحدود المنكوبة</h4>
              <p className="text-[11px] text-slate-400 mt-1">وجبات طوارئ جافة طويلة الأجل في مظاريف ألومنيوم معقمة صالحة لعام كامل.</p>
            </div>

          </div>

          {/* Core Choice: تسليمك vs هنوزعلك */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base font-black text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center text-xs">2</span>
                <span>اختر آلية الاستلام والتوزيع: «تسليمك» أو «هنوزعلك»</span>
              </span>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                أمانة شرعية 100%
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option A: هنوزعلك */}
              <button
                type="button"
                onClick={() => setDistributionScope('general')}
                className={`p-4 rounded-2xl border text-start transition-all cursor-pointer relative overflow-hidden ${
                  distributionScope === 'general'
                    ? 'bg-gradient-to-br from-orange-600/30 to-amber-600/20 border-orange-500 text-white shadow-lg shadow-orange-950/40 ring-2 ring-orange-500/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-sm">
                      ✨
                    </div>
                    <div>
                      <span className="text-sm font-black text-white">«هنوزعلك» نيابة عنك</span>
                      <p className="text-[10px] text-amber-400 font-bold">بأسطول كاترينج مصر الميداني</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">
                    توثيق فيديو
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed">
                  تتولى فرقنا الميدانية التوزيع المباشر للأسر المتعففة ودور الأيتام مع توثيق مرئي بالفيديو والصور وإحداثيات الموقع (GPS) تبرئ ذمتك بالكامل.
                </p>
              </button>

              {/* Option B: تسليمك */}
              <button
                type="button"
                onClick={() => setDistributionScope('specific')}
                className={`p-4 rounded-2xl border text-start transition-all cursor-pointer relative overflow-hidden ${
                  distributionScope === 'specific'
                    ? 'bg-gradient-to-br from-amber-600/30 to-yellow-600/20 border-amber-500 text-white shadow-lg shadow-amber-950/40 ring-2 ring-amber-500/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm">
                      📦
                    </div>
                    <div>
                      <span className="text-sm font-black text-white">«تسليمك» بموقعك بيدك</span>
                      <p className="text-[10px] text-amber-300 font-bold">تجهيز وتغليف حراري VIP</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                    تسليم عنوانك
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-2.5 leading-relaxed">
                  نطهو الوجبات الساخنة ونغلفها بعلب حرارية مختومة ونسلمها لعنوانك أو جمعيتك أو منشأتك بسيارات مجهزة لتوزعها بمعرفتك الشخصية.
                </p>
              </button>
            </div>

            {distributionScope === 'specific' && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/40 animate-in fade-in space-y-2">
                <label className="block text-xs font-bold text-amber-400">
                  حدد عنوان التسليم أو الجهة المطلوبة بدقة:
                </label>
                <input
                  type="text"
                  value={customLocationText}
                  onChange={(e) => setCustomLocationText(e.target.value)}
                  placeholder="مثال: التجمع الخامس، أو دار أيتام معينة، أو مصنعنا بالعاشر من رمضان..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            )}

            {/* Direct Hotlines Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-950 to-orange-950/40 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-slate-200">الخطوط الساخنة للتنسيق الخيري الفوري (م/ مصطفى شعبان):</span>
              </div>
              <div className="flex items-center gap-3 font-mono font-bold">
                <a href="tel:01010430347" className="text-orange-400 hover:text-orange-300 underline flex items-center gap-1">
                  📞 01010430347
                </a>
                <span className="text-slate-600">|</span>
                <a href="tel:01551411005" className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1">
                  📞 01551411005
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Right: Booking Form & Real-time Delegation Certificate (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-orange-500/30 rounded-2xl p-6 space-y-5 shadow-xl">
          
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-amber-400 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>عقد التوكيل الشرعي وبيانات المتبرع</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              إقرار شرعي بتفويض شركة كاترينج مصر لتجهيز وتوزيع الوجبات نيابة عنك.
            </p>
          </div>

          {orderSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">تقبل الله طاعتكم وبرئت ذمتكم</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                تم تسجيل طلب التوكيل برقم <span className="font-mono font-bold text-emerald-400">KAF-2026-{Math.floor(1000 + Math.random() * 9000)}</span>، وفريق المطبخ المركزي بدأ تجهيز الوجبات وفق الشروط الشرعية.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onOpenPrintCharityDoc(`السيد المتبرع / ${donorName}`)}
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة شهادة التوكيل الآن</span>
                </button>
                <button
                  onClick={() => setOrderSuccess(false)}
                  className="text-xs text-slate-400 hover:text-white underline mt-1"
                >
                  تسجيل طلب كفارة أو إطعام آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitCharityOrder} className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">اسم المتبرع أو صاحب الكفارة</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="الاسم الكريم (أو فاعل خير)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">رقم الهاتف أو الواتساب (لإرسال توثيق التوزيع)</label>
                <input
                  type="tel"
                  required
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">ملاحظات خاصة أو دعاء مطلوب</label>
                <textarea
                  rows={2}
                  value={donorNotes}
                  onChange={(e) => setDonorNotes(e.target.value)}
                  placeholder="مثال: صدقة عن والدي رحمه الله، أو كفارة يمين عاجلة، أو توجيه خاص..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              {/* Media Proof Checkbox */}
              <label className="flex items-center gap-2 p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsMediaProof}
                  onChange={(e) => setWantsMediaProof(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-[11px] text-slate-300 font-medium">
                  أرغب في استلام توثيق مرئي (فيديو وصور) على الواتساب فور التوزيع
                </span>
              </label>

              {/* Cost Summary Box */}
              <div className="p-3 bg-gradient-to-r from-orange-950/60 to-slate-900 border border-orange-500/40 rounded-xl space-y-1.5">
                <div className="flex justify-between items-center text-slate-300">
                  <span>البرنامج المختار:</span>
                  <span className="font-bold text-white text-[11px]">{getPackageTitle()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>عدد الوجبات / الحصص:</span>
                  <span className="font-bold text-white">{customMealsCount} وجبة</span>
                </div>
                <div className="border-t border-slate-800 pt-1.5 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-amber-400">إجمالي قيمة الإطعام:</span>
                  <span className="font-black text-amber-400 text-base">{calculateTotalCost().toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-black text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل التوكيل...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>تأكيد التوكيل والطلب الآن</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                * تطبق الشروط والضوابط الفقهية المقررة من لجان الفتوى الرسمية. يتم الطهي والتوزيع في المواعيد المحددة مع استخراج شهادة توكيل معتمدة.
              </p>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
