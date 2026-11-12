import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  ShieldCheck, 
  Microscope, 
  Sprout, 
  Truck, 
  Cpu, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  BarChart3, 
  Building2, 
  FileText, 
  Layers, 
  ArrowRight,
  RefreshCw,
  Calendar,
  Thermometer,
  Boxes
} from 'lucide-react';
import { SIX_CORPORATE_DEPARTMENTS, CorporateDepartment } from '../data/habeAndBuffetData';
import { ClientTenant } from '../types/dashboard';
import { INITIAL_CLIENT_TENANTS } from '../data/mockOperationalData';
import { RawMaterialsForecastingHub } from './RawMaterialsForecastingHub';

interface DepartmentsHubViewProps {
  isRtl: boolean;
  onClose?: () => void;
  onSelectDepartment?: (deptId: string) => void;
  onOpenDocBuilder?: (type: any, company?: string) => void;
  onOpenCamelLiverModal?: () => void;
  onShowToast: (msg: string) => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
  tenants?: ClientTenant[];
}

export const DepartmentsHubView: React.FC<DepartmentsHubViewProps> = ({
  isRtl,
  onClose,
  onSelectDepartment,
  onOpenDocBuilder,
  onOpenCamelLiverModal,
  onShowToast,
  onAddAuditLog,
  tenants = INITIAL_CLIENT_TENANTS
}) => {
  const [activeDeptId, setActiveDeptId] = useState<string>('dept_01');
  const [isGeneratingAiInsights, setIsGeneratingAiInsights] = useState(false);
  const [aiInsightsGenerated, setAiInsightsGenerated] = useState(false);

  const activeDept = SIX_CORPORATE_DEPARTMENTS.find(d => d.id === activeDeptId) || SIX_CORPORATE_DEPARTMENTS[0];

  // AI Demand Forecasting & Seasonal Insights Engine (Department 06)
  const handleGenerateAiForecast = () => {
    setIsGeneratingAiInsights(true);
    setTimeout(() => {
      setIsGeneratingAiInsights(false);
      setAiInsightsGenerated(true);
      onAddAuditLog(
        'تشغيل محرك الذكاء الاصطناعي للتنبؤ بالطلب والأنماط الموسمية',
        'AI Demand Forecasting & Seasonal Analysis Executed',
        'تم تحليل 84 سجلاً تشغيلياً وأرقام استهلاك الوجبات بالمواقع. تم رصد نمط ارتفاع الطلب على الشوربات والوجبات الساخنة بنسبة 35% خلال الشتاء، وتحديث مخزون تمور سيوة لموسم رمضان.'
      );
      onShowToast('تم تحديث التقرير التحليلي الموسمي بالذكاء الاصطناعي بنجاح!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
              التقسيم المؤسسي والتنظيمي المعتمد
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            إدارات منظومة CATERING EGYPT الستة (01 — 06)
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            بيئات عمل متخصصة ومستقلة لكل قطاع تشغيلي تضمن حوكمة البيانات، جودة الإنتاج، التتبع من المزرعة للمستهلك، والتحليل التنبؤي الذكي.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold border border-slate-700 text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>
          )}
          <span className="px-3.5 py-1.5 rounded-xl bg-white/10 text-xs font-bold border border-white/20 text-orange-300">
            6 إدارات مستقلة
          </span>
          <span className="px-3.5 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold">
            HACCP & NFSA
          </span>
        </div>
      </div>

      {/* Department Tabs Bar (01 to 06) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {SIX_CORPORATE_DEPARTMENTS.map((dept) => {
          const isSelected = dept.id === activeDeptId;
          return (
            <button
              key={dept.id}
              onClick={() => setActiveDeptId(dept.id)}
              className={`p-3 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/30 ring-2 ring-orange-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono font-black text-xs px-2 py-0.5 rounded-md ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-orange-600'
                }`}>
                  {dept.number}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
              </div>

              <div className="mt-2">
                <h4 className="font-bold text-xs line-clamp-2 leading-tight">
                  {dept.titleAr.replace('المركزية', '').replace('والحاصلات', '')}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Department Active Workspace Dashboard */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Dept Header & Lead Officer Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 flex items-center justify-center font-black text-xl border border-orange-200 dark:border-orange-800 shrink-0">
              {activeDept.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {activeDept.titleAr}
                </h3>
                <span className="text-[10px] font-mono text-slate-400">({activeDept.code})</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{activeDept.titleEn}</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-right">
            <span className="text-[10px] text-slate-400 block">المسؤول والمشرف العام:</span>
            <span className="font-black text-slate-900 dark:text-white">{activeDept.leadOfficerAr}</span>
          </div>
        </div>

        {/* Dept Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activeDept.metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-center">
              <span className="text-2xl font-black text-orange-600 block">{m.value}</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 block">{m.labelAr}</span>
            </div>
          ))}
        </div>

        {/* Operational Scope Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
            نطاق الاختصاص ومسؤوليات الإدارة:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeDept.scopeListAr.map((scope, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{scope}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SPECIAL SUB-PANEL FOR DEPARTMENT 01: CENTRAL KITCHENS DETAILS */}
        {activeDept.id === 'dept_01' && (
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-orange-600" />
              <span>المطابخ المركزية الثلاثة المستقلة:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* 1. مطبخ هنجر استيشن */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-black text-slate-900 dark:text-white">1. مطبخ هنجر استيشن</h5>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">نشط 100%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  الطاقة: 8,500 وجبة يومياً · خطوط طهي آلي للبخار والشواء · تغذية مستشفيات ومصانع
                </p>
                <div className="text-[10px] text-slate-400 border-t pt-2">
                  المسؤول: شيف/ حاتم البشبيشي · الهايجين: 99.8%
                </div>
              </div>

              {/* 2. مطبخ مول العين - مدينة بدر */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-orange-500/50 shadow-sm space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h5 className="font-black text-slate-900 dark:text-white">2. مطبخ مول العين (مدينة بدر)</h5>
                  <span className="text-[10px] text-orange-600 font-bold bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">ركن الجملي VIP</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  الطاقة: 6,000 وجبة يومياً · يشمل ركن الكبدة الجملي والسجق ومخبوزات هابي ماركت
                </p>
                <button
                  onClick={onOpenCamelLiverModal}
                  className="w-full mt-2 py-1.5 rounded-xl bg-orange-600 text-white font-bold text-[11px] hover:bg-orange-700 cursor-pointer"
                >
                  استعراض صينية الكبدة الجملي والقعدات VIP ←
                </button>
              </div>

              {/* 3. مطبخ الريان - اللاهون، بني سويف */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-black text-slate-900 dark:text-white">3. مطبخ الريان (اللاهون - بني سويف)</h5>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">نشط 100%</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  الطاقة: 4,000 وجبة يومياً · إعاشة مواقع الصعيد ومحطات الطاقة والمشروعات القومية
                </p>
                <div className="text-[10px] text-slate-400 border-t pt-2">
                  المسؤول: شيف/ محمود السويسي · الهايجين: 99.4%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL SUB-PANEL FOR DEPARTMENT 04: AGRICULTURAL & SIWA DATES */}
        {activeDept.id === 'dept_04' && (
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>محاصيل تمور سيوة والوادي الجديد والمجدول الملكي (إنتاج مزارعنا المباشر):</span>
              </h4>
              <span className="text-xs text-emerald-600 font-bold">بدون وسيط — أسعار التصدير والمزرعة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block">تمر سيوة الصعيدي العضوي</span>
                <span className="text-orange-600 font-black text-sm block my-1">85 ج.م / كجم</span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  مجفف طبيعياً بنقاء واحة سيوة ومناسب لمواسم رمضان وتغذية المدارس والشركات.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/50 shadow-sm">
                <span className="font-bold text-slate-900 dark:text-white block">تمر المجدول الملكي (سوبر جامبو)</span>
                <span className="text-orange-600 font-black text-sm block my-1">195 ج.م / كجم</span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  كافة المقاسات متاحة (سوبر جامبو، جامبو، لارج) مطابقة لاعتمادات التصدير الأوروبي.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block">تمر الواحات الخارجة والداخلة</span>
                <span className="text-orange-600 font-black text-sm block my-1">75 ج.م / كجم</span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  محصول أراضي الوادي الجديد البكر بمياه الآبار العميقة بنسبة سكريات متوازنة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL SUB-PANEL FOR DEPARTMENT 06: AI DEMAND FORECASTING & SEASONAL CONSUMPTION */}
        {activeDept.id === 'dept_06' && (
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border border-orange-500/30 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-base text-white">
                    نظام الذكاء الاصطناعي للتنبؤ بالطلب والأنماط الموسمية (AI Demand Forecasting)
                  </h4>
                  <p className="text-xs text-orange-200">
                    تحليل أنماط الاستهلاك التاريخية، سجلات التدقيق، وسلوك الوجبات عبر الفصول
                  </p>
                </div>
              </div>

              <button
                onClick={handleGenerateAiForecast}
                disabled={isGeneratingAiInsights}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAiInsights ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAiInsights ? 'جاري التحليل والمعالجة...' : 'تحديث التحليل الذكي الآن'}</span>
              </button>
            </div>

            {/* AI Predictions Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-orange-400">
                  <span className="font-bold">الموسم الشتوي الحالي</span>
                  <span className="font-mono text-[10px]">+32% طلب</span>
                </div>
                <h5 className="font-black text-white text-xs">تحول الطلب نحو الوجبات الساخنة والشوربات</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  توصية النظام: زيادة حصص الأرز واللحوم المطبوخة بمصنع الأسمنت ومستشفى رويال وتقليل الوجبات الجافة بنسبة 18%.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-amber-400">
                  <span className="font-bold">موسم رمضان القادم</span>
                  <span className="font-mono text-[10px]">استعداد استراتيجي</span>
                </div>
                <h5 className="font-black text-white text-xs">حجز تمور سيوة وكراتين الخير المؤسسية</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  توقع طلب 45,000 كرتونة رمضان ووجبات إفطار خيام الشركات، مع تجهيز التمور المجدولة وتخزينها بمطبخ بدر.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="font-bold">مؤشر كفاءة الهالك</span>
                  <span className="font-mono text-[10px]">0.8% فقط</span>
                </div>
                <h5 className="font-black text-white text-xs">ربط التنبؤ اللحظي مع أوامر الطهي</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  تم توفير 140,000 ج.م شهرياً من خلال التنبؤ بعدد الحضور الفعلي بالورديات قبل الطهي بـ 4 ساعات.
                </p>
              </div>
            </div>

            {/* Embedded Recharts Raw Materials Forecasting Engine */}
            <div className="pt-4">
              <RawMaterialsForecastingHub
                tenants={tenants}
                isRtl={isRtl}
                onOpenDocBuilder={onOpenDocBuilder}
                onAddAuditLog={onAddAuditLog}
                onShowToast={onShowToast}
              />
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span>إحدى منظومات الشركة الوطنية اللوجستية لتوريدات المواد الغذائية — سجل 19132</span>
          </div>

          <button
            onClick={() => {
              if (onOpenDocBuilder) onOpenDocBuilder('quotation', activeDept.titleAr);
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 hover:bg-orange-600 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>إصدار تقرير رسمي أو بيان توريد لهذه الإدارة</span>
          </button>
        </div>

      </div>

    </div>
  );
};
