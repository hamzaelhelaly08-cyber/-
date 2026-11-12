import React, { useState } from 'react';
import { X, Printer, Download, CheckCircle2, FileText, ShieldCheck, ChefHat, Calendar } from 'lucide-react';
import { PrintableDocData, PrintableDocType } from '../types/dashboard';
import { BrandLogo } from './BrandLogo';

interface PrintableReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: PrintableDocType;
  customData?: Partial<PrintableDocData>;
}

export const PrintableReportModal: React.FC<PrintableReportModalProps> = ({
  isOpen,
  onClose,
  initialType = 'quotation',
  customData
}) => {
  const [docType, setDocType] = useState<PrintableDocType>(initialType);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getDocContent = (): PrintableDocData => {
    switch (docType) {
      case 'quotation':
        return {
          type: 'quotation',
          titleAr: 'عرض سعر توريد وجبات إعاشة رسمية',
          documentNumber: 'QUOT-2026-904',
          issueDate: '2026-11-11',
          recipientName: 'السادة / لجنة إدارة الخدمات والمشتريات',
          recipientOrg: customData?.recipientOrg || 'مستشفى القصر العيني الفرنساوي — جامعة القاهرة',
          recipientLocation: 'القاهرة — المنيل',
          items: [
            {
              description: 'وجبة غداء مطبوخة ساخنة (بروتين 180 جم + خضار + أرز بسمتي + سلطة + خبز)',
              portionSpec: '450 جم صافي معقمة',
              quantity: '1,200 وجبة/يوم',
              unitPrice: '145.00 ج.م',
              totalPrice: '174,000 ج.م/يوم'
            },
            {
              description: 'وجبة علاجية مقيدة للمرضى (قليلة الصوديوم والدهون لمرضى الباطنة والقلب)',
              portionSpec: '400 جم موزونة بالجرام',
              quantity: '600 وجبة/يوم',
              unitPrice: '135.00 ج.م',
              totalPrice: '81,000 ج.م/يوم'
            },
            {
              description: 'وجبة إفطار صباحي متكامل (جبن معقم، بيض، عسل، زبادي، عيش بلدي ساخن)',
              portionSpec: 'عبوة معقمة مفرغة',
              quantity: '800 وجبة/يوم',
              unitPrice: '65.00 ج.م',
              totalPrice: '52,000 ج.م/يوم'
            }
          ],
          notes: [
            'الأسعار تشمل النقل المبرد في سيارات مجهزة ومعقمة حتى موقع العميل.',
            'التوريد خاضع لرقابة صارمة وفق معايير سلامة الغذاء ومراقبة الهايجين اليومية HACCP.',
            'فترة سريان العرض: 30 يوماً من تاريخ الإصدار.',
            'شروط السداد: مستخلص نصف شهري بفترة ائتمان 15 يوماً.'
          ],
          preparedBy: 'مستر / أحمد ديب (مدير التشغيل والمحتوى)',
          approvedBy: 'م/ مصطفى شعبان (مدير العمليات المركزية)'
        };

      case 'test_sample':
        return {
          type: 'test_sample',
          titleAr: 'إذن صرف وتوريد عينة تذوق فنية (TEST SAMPLE)',
          documentNumber: 'TEST-DSP-2026-08',
          issueDate: '2026-11-11',
          recipientName: 'م/ إبراهيم حلمي (مسؤول الخدمات الإدارية)',
          recipientOrg: customData?.recipientOrg || 'شركة السويدي إلكتريك — العاشر من رمضان',
          recipientLocation: 'المنطقة الصناعية الثالثة — العاشر من رمضان',
          items: [
            {
              description: 'عينة وجبة دجاج جريل مشوي مع أرز بسمتي بالخلطة وخضار سوتيه',
              portionSpec: 'عبوة فحص معقمة',
              quantity: '5 عينات',
              unitPrice: 'مجاني للتذوق',
              totalPrice: '0.00 ج.م'
            },
            {
              description: 'عينة وجبة كفتة بلدي مشوية على الفحم مع طحينة وسلطة خضراء',
              portionSpec: 'عبوة حرارية ساخنة',
              quantity: '5 عينات',
              unitPrice: 'مجاني للتذوق',
              totalPrice: '0.00 ج.م'
            },
            {
              description: 'عينة وجبة علاجية لمرضى السكر (لحم بتلو سوتيه مع بروكلي وأرز بني)',
              portionSpec: 'مع بطاقة تحليل السعرات',
              quantity: '5 عينات',
              unitPrice: 'مجاني للتذوق',
              totalPrice: '0.00 ج.م'
            }
          ],
          notes: [
            'هذه العينة مخصصة لأغراض التذوق والتقييم الفني الداخلي لإدارة المنشأة.',
            'تسلم الوجبات بدرجة حرارة لا تقل عن +68° م في حافظات طعام حرارية مختومة.',
            'لا يعتبر إذن العينة تعاقداً نهائياً أو التزاماً متبادلاً قبل توقيع العقد الرسمي.'
          ],
          preparedBy: 'شيف / عصام الدسوقي (رئيس مطبخ هنجر استيشن)',
          approvedBy: 'م/ مصطفى شعبان (مدير العمليات المركزية)'
        };

      case 'haccp_certificate':
        return {
          type: 'haccp_certificate',
          titleAr: 'تقرير التفتيش ومطابقة سلامة الغذاء والهايجين HACCP',
          documentNumber: 'HACCP-AUD-2026-77',
          issueDate: '2026-11-11',
          recipientName: 'إدارة مراقبة الجودة والمنشآت الصحية',
          recipientOrg: customData?.recipientOrg || 'الشركة الوطنية اللوجستية — المطابخ المركزية',
          recipientLocation: 'المطابخ المركزية: هنجر استيشن، مول العين ببدر، وريان اللاهون',
          items: [
            {
              description: 'معايرة ثلاجات الحفظ وسيارات النقل المبرد (+1° إلى +4° م)',
              portionSpec: 'تتبع حراري رقمي',
              quantity: '18 جهاز فحص',
              unitPrice: 'مطابق للمعايير',
              totalPrice: 'نسبة الالتزام 100%'
            },
            {
              description: 'فحص درجات الطهي المركزي بالمسابر الإلكترونية Core Probe (> +75° م)',
              portionSpec: 'فحص لكل دفعة طهي',
              quantity: '42 وجبة مفحوصة',
              unitPrice: 'مطابق للمعايير',
              totalPrice: 'درجة أمان قصوى'
            },
            {
              description: 'مسحات بيولوجية لأسطح التقطيع الستانلس ستيل ومعدات الطهي',
              portionSpec: 'مختبر ميكروبيولوجي',
              quantity: '24 مسحة عشوائية',
              unitPrice: 'خالية من البكتيريا',
              totalPrice: 'نتيجة سلبية 100%'
            }
          ],
          notes: [
            'تمت مراجعة الاشتراطات الصحية لجميع العاملين وثبوت سريان الشهادات الصحية 100%.',
            'التخزين والتبريد والتعبئة تمت وفق متطلبات سلامة الغذاء المعتمدة للشركة الوطنية اللوجستية.',
            'التقرير صالح لمدة أسبوع من تاريخ التفتيش الدوري.'
          ],
          preparedBy: 'د/ ريهام السعدني (مسؤول الهايجين وسلامة الغذاء)',
          approvedBy: 'م/ مصطفى شعبان (مدير العمليات المركزية)'
        };

      case 'menu_catalog':
        return {
          type: 'menu_catalog',
          titleAr: 'كتالوج قائمة الوجبات والمنيوهات المؤسسية المعتمدة (84 وصفة)',
          documentNumber: 'CAT-MENU-2026-84',
          issueDate: '2026-11-11',
          recipientName: 'السادة / مسؤولو المشتريات والخدمات الإدارية والموارد البشرية',
          recipientOrg: customData?.recipientOrg || 'كافة المنشآت والشركات والمستشفيات والمصانع المتعاقدة',
          recipientLocation: 'القاهرة الكبرى · العاشر من رمضان · العين السخنة · بني سويف',
          items: [
            {
              description: 'وجبة دجاج شواية متبل (220 جم بروتين) + أرز بسمتي بالزعفران والمكسرات + خضار مشكل + سلطة خضراء + خبز ساخن + حلوى',
              portionSpec: '480 جم صافي معقمة',
              quantity: 'متاحة للتعاقد اليومي',
              unitPrice: '135.00 ج.م',
              totalPrice: 'سعر توريد معتمد'
            },
            {
              description: 'وجبة كفتة بلدي مشوية على الفحم (180 جم لحم بقري صافي) + مكرونة بصوص الطماطم الطازجة + طحينة فاخرة + مخلل + خبز',
              portionSpec: '450 جم حرارية',
              quantity: 'متاحة للتعاقد اليومي',
              unitPrice: '140.00 ج.م',
              totalPrice: 'سعر توريد معتمد'
            },
            {
              description: 'وجبة لحم بقري روستو / كباب حلة بالعسل والبصل المكرمل + أرز مصري بالشعرية + خضار سوتيه مقرمش + شوربة',
              portionSpec: '460 جم صافي',
              quantity: 'متاحة للتعاقد اليومي',
              unitPrice: '165.00 ج.م',
              totalPrice: 'سعر توريد معتمد'
            },
            {
              description: 'وجبة سمك فيليه مقلي ذهبي أو جريل صحي (200 جم) + أرز صيادية أحمر بالبصل المحمر + طحينة + سلطة بابا غنوج',
              portionSpec: '440 جم بحرية',
              quantity: 'متاحة للتعاقد اليومي',
              unitPrice: '145.00 ج.م',
              totalPrice: 'سعر توريد معتمد'
            },
            {
              description: 'وجبة حمية علاجية استشفائية (صدور دجاج مسلوقة متبلة بأعشاب طبيعية + أرز بني مسلوق + بروكلي وجزر سوتيه قليل الصوديوم)',
              portionSpec: '400 جم موزونة بالجرامات',
              quantity: 'متاحة للمستشفيات',
              unitPrice: '130.00 ج.م',
              totalPrice: 'سعر توريد معتمد'
            },
            {
              description: 'وجبة إفطار عمالي متكامل (فول بالسمن، بيض بلدي، جبنة بيضاء معقمة، مربى، عيش بلدي طازج مخابزنا المركزية)',
              portionSpec: 'عبوة متكاملة مفرغة',
              quantity: 'متاحة للورديات المبكرة',
              unitPrice: '60.00 ج.م',
              totalPrice: 'سعر توريد معتمد'
            }
          ],
          notes: [
            'اللحوم والدواجن ذبح شرعي محلي طازج 100% مع شهادات فحص بيطري يومية.',
            'التعبئة والتغليف بنظام Flash Heat Sealing في أطباق حرارية مفرغة قابلة للتسخين بالميكروويف.',
            'نظام التوصيل عبر أسطول سيارات مجهزة بثلاجات تبريد رقمية مسجلة بنظام HACCP.',
            'إمكانية تصميم منيو مخصص وضبط الجرامات ونسب البروتين وفقاً لميزانية العميل المعتمدة.'
          ],
          preparedBy: 'شيف / عصام الدسوقي (رئيس المطبخ المركزي)',
          approvedBy: 'م/ مصطفى شعبان (مدير العمليات المركزية)'
        };

      case 'charity_delegation':
        return {
          type: 'charity_delegation',
          titleAr: 'شهادة توكيل إطعام شرعي وتوزيع وجبات كفارة يمين وإغاثة',
          documentNumber: 'WAQALAH-CHARITY-2026-789',
          issueDate: '2026-11-11',
          recipientName: 'المتبرع الكريم / صاحب كفارة اليمين',
          recipientOrg: customData?.recipientOrg || 'قطاع الإطعام الخيري والإغاثة — الوطنية اللوجستية',
          recipientLocation: 'نطاق التوزيع المعتمد (دور الأيتام / قرى الصعيد / المشاعر المقدسة / الإغاثة الحدودية)',
          items: [
            {
              description: 'وجبات إطعام شرعي لكفارة اليمين (أرز بسمتي + ربع دجاجة مشوية + خضار مطبوخ + رغيف خبز + ثمرة فاكهة)',
              portionSpec: 'وجبة طعام مشبعة شرعاً',
              quantity: '10 وجبات (كفارة يمين كاملة)',
              unitPrice: 'مطهية ومعبأة بالكامل',
              totalPrice: 'براءة ذمة شرعية معتمدة'
            },
            {
              description: 'خدمة التوكيل بالتوزيع نيابة عنك والتسليم الميداني لمستحقيها الفعليين باليد',
              portionSpec: 'توثيق فيديو وصور',
              quantity: 'فريق الإطعام الميداني',
              unitPrice: 'خدمة مجانية لوجه الله',
              totalPrice: 'توثيق كامل فوري'
            },
            {
              description: 'تغليف حراري محكم في علب مخصصة لحملات الخير والإطعام لضمان كرامة المستحقين',
              portionSpec: 'كرتونة نظيفة مخصصة',
              quantity: '10 عبوات حرارية',
              unitPrice: 'شامل التوصيل',
              totalPrice: 'مطابق للاشتراطات الصحية'
            }
          ],
          notes: [
            'تم إعداد وطبخ الوجبات في المطابخ المركزية لكاترينج مصر وفق أعلى معايير النظافة والهايجين.',
            'التوزيع يتم باليد للأسر الأشد فقراً والأيتام وعمال اليومية في النطاق المحدد من المتبرع أو النطاق العام.',
            'يتم إرسال رابط التوثيق المرئي للمتبرع فور إتمام عملية التوزيع الميداني.',
            'الشهادة بمثابة إيصال توكيل وإبراء ذمة شرعي معتمد من إدارة الشركة الوطنية اللوجستية.'
          ],
          preparedBy: 'لجنة الإطعام الخيري والإغاثة',
          approvedBy: 'م/ مصطفى شعبان (المسؤول الأعلى للعمليات)'
        };

      case 'operations_order':
      default:
        return {
          type: 'operations_order',
          titleAr: 'أمر تشغيل مطبخ وتوريد موقع معتمد',
          documentNumber: 'OPS-ORD-2026-312',
          issueDate: '2026-11-11',
          recipientName: 'شيف / سامي عبد القوي (مشرف مطبخ بدر)',
          recipientOrg: customData?.recipientOrg || 'موقع الشركة الألمانية للأسمنت — السخنة',
          recipientLocation: 'المنطقة الصناعية — طريق السويس',
          items: [
            {
              description: 'وجبات إفطار وردية الصباح (فول، بيض، جبن، عيش بلدي ساخن، شاي)',
              portionSpec: 'تسليم 06:00 ص',
              quantity: '1,400 وجبة',
              unitPrice: 'أمر تشغيل معتمد',
              totalPrice: 'خط إنتاج بدر'
            },
            {
              description: 'وجبات غداء ساخنة بروتين عالي وردية الظهر (لحوم، خضار، أرز)',
              portionSpec: 'تسليم 13:00 م',
              quantity: '1,400 وجبة',
              unitPrice: 'أمر تشغيل معتمد',
              totalPrice: 'خط إنتاج هنجر'
            }
          ],
          notes: [
            'الالتزام الصارم بمواعيد تسليم السيارات المبردة عند بوابات المصنع.',
            'التأكد من التعبئة الحرارية والإغلاق المحكم لكل وجبة فردية.'
          ],
          preparedBy: 'مستر / أحمد ديب (مدير التشغيل والمحتوى)',
          approvedBy: 'م/ مصطفى شعبان (مدير العمليات المركزية)'
        };
    }
  };

  const doc = getDocContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[95vh] text-slate-900 dark:text-white">
        
        {/* Modal Controls Toolbar (Hidden when actually printed via CSS) */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/80 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">{doc.documentNumber}</span>
            <span className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
              معاينة المستند الرسمي والطباعة PDF
            </span>
          </div>

          {/* Template Switcher */}
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold overflow-x-auto max-w-full">
            <button
              onClick={() => setDocType('quotation')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                docType === 'quotation' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              عرض سعر رسمي
            </button>
            <button
              onClick={() => setDocType('test_sample')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                docType === 'test_sample' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              إذن عينة TEST
            </button>
            <button
              onClick={() => setDocType('haccp_certificate')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                docType === 'haccp_certificate' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              تقرير HACCP
            </button>
            <button
              onClick={() => setDocType('menu_catalog')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                docType === 'menu_catalog' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              كتالوج المنيوهات والوجبات
            </button>
            <button
              onClick={() => setDocType('charity_delegation')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                docType === 'charity_delegation' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              شهادة إطعام وكفارة يمين
            </button>
            <button
              onClick={() => setDocType('operations_order')}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                docType === 'operations_order' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              أمر تشغيل
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-orange-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة فورية / حفظ PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas (A4 Styled Layout) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950/40 flex justify-center">
          <div 
            id="printable-official-document"
            className="w-full max-w-[210mm] bg-white text-slate-900 p-8 sm:p-12 shadow-xl border border-slate-300 rounded-lg relative overflow-hidden"
            style={{ minHeight: '297mm' }}
          >
            {/* Watermark Logo in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <BrandLogo size="hero" showGlow={false} />
            </div>

            {/* Official Header */}
            <div className="flex items-center justify-between border-b-2 border-orange-500 pb-5 mb-6">
              <div className="flex items-center gap-4">
                <BrandLogo size="lg" showGlow={false} />
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    CATERING EGYPT
                  </h1>
                  <p className="text-xs font-bold text-orange-600">
                    الشركة الوطنية اللوجستية — حلول الإعاشة والمطابخ المركزية
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    س.ت: 489201 · ب.ض: 541-890-332 · معايير ISO 22000 & HACCP
                  </p>
                </div>
              </div>

              <div className="text-end text-xs space-y-1 font-mono">
                <div className="font-bold text-slate-900">رقم المستند: <span className="text-orange-600">{doc.documentNumber}</span></div>
                <div className="text-slate-500">التاريخ: {doc.issueDate}</div>
                <div className="inline-block px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold text-[10px]">
                  مستند تشغيلي معتمد
                </div>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center mb-6">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {doc.titleAr}
              </h2>
            </div>

            {/* Recipient Box */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 font-medium">الجهة الموجه إليها:</span>
                <div className="font-extrabold text-slate-900 text-sm mt-0.5">{doc.recipientOrg}</div>
                <div className="text-slate-600 mt-0.5">{doc.recipientName}</div>
              </div>
              <div className="text-end">
                <span className="text-slate-500 font-medium">موقع التسليم والتشغيل:</span>
                <div className="font-bold text-slate-900 mt-0.5">{doc.recipientLocation}</div>
                <div className="text-emerald-700 font-semibold mt-0.5">سلسلة توريد مبردة معتمدة</div>
              </div>
            </div>

            {/* Document Line Items Table */}
            <div className="border border-slate-300 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-start text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                  <tr>
                    <th className="p-3 text-start">م</th>
                    <th className="p-3 text-start">بيان الصنف والمواصفات الفنية</th>
                    <th className="p-3 text-start">المعيار / الوزن</th>
                    <th className="p-3 text-start">الكمية المقررة</th>
                    <th className="p-3 text-end">سعر الوحدة</th>
                    <th className="p-3 text-end">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {doc.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900">{item.description}</td>
                      <td className="p-3 text-slate-600 font-medium">{item.portionSpec || 'معياري'}</td>
                      <td className="p-3 font-bold text-slate-900 tabular-nums">{item.quantity}</td>
                      <td className="p-3 text-end font-mono text-slate-700">{item.unitPrice || '—'}</td>
                      <td className="p-3 text-end font-bold text-orange-600 tabular-nums">{item.totalPrice || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes Section */}
            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-700 mb-2">الملاحظات والاشتراطات الفنية المعتمدة:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {doc.notes.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">{note}</li>
                ))}
              </ul>
            </div>

            {/* Signatures & Seal Section */}
            <div className="border-t-2 border-slate-200 pt-6 mt-8 grid grid-cols-2 gap-8 text-xs text-center">
              <div className="space-y-4">
                <div className="font-bold text-slate-700">إعداد ومراجعة:</div>
                <div className="text-slate-900 font-extrabold">{doc.preparedBy}</div>
                <div className="text-[10px] text-slate-400">التوقيع الإلكتروني معتمد</div>
              </div>

              <div className="space-y-4">
                <div className="font-bold text-slate-700">اعتماد إدارة العمليات المركزية:</div>
                <div className="text-orange-600 font-black text-sm">{doc.approvedBy}</div>
                <div className="text-[10px] text-slate-400">خاتم الشركة الوطنية اللوجستية</div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
              كاترينج مصر — الشركة الوطنية اللوجستية · المركز الرئيسي: القاهرة الجديدة · الخط الساخن: 19820 · www.cateringegypt.com
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
