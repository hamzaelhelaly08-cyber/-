import React, { useState } from 'react';
import { 
  Building2, 
  UtensilsCrossed, 
  ShoppingBag, 
  ClipboardList, 
  Tag, 
  User, 
  Bell, 
  QrCode, 
  Settings, 
  Home, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  Phone, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  Lock, 
  Eye, 
  X, 
  Check, 
  Smartphone, 
  Laptop, 
  Users, 
  Flame, 
  Plus, 
  Minus,
  RefreshCw
} from 'lucide-react';
import { GERMAN_CEMENT_81_EMPLOYEES, GermanEmployee } from '../data/habeAndBuffetData';

interface HabeGermanMarketPortalProps {
  isRtl: boolean;
  onClose?: () => void;
  onAddAuditLog: (actionAr: string, actionEn: string, details: string) => void;
  onRecordFinancialTransaction?: (entry: {
    id: string;
    description: string;
    amount: number;
    type: 'income';
    category: 'canteen_sales';
    paymentMethod: 'vodafone_cash';
    referenceNumber: string;
    siteId: string;
    siteName: string;
  }) => void;
  onShowToast: (msg: string) => void;
}

export const HabeGermanMarketPortal: React.FC<HabeGermanMarketPortalProps> = ({
  isRtl,
  onClose,
  onAddAuditLog,
  onRecordFinancialTransaction,
  onShowToast
}) => {
  // Device Frame Mode: 'phone' or 'fluid'
  const [viewMode, setViewMode] = useState<'phone' | 'fluid'>('phone');
  
  // Active Navigation Tab inside Ha-Be App
  const [activeBottomNav, setActiveBottomNav] = useState<'home' | 'notifications' | 'scan' | 'settings'>('home');

  // Sub-view when card is clicked
  const [activeSubView, setActiveSubView] = useState<'hub' | 'meals' | 'market' | 'orders' | 'offers' | 'account'>('hub');

  // Meals Tab: Breakfast vs Hot Meals
  const [mealsCategory, setMealsCategory] = useState<'breakfast' | 'hot_meals'>('breakfast');

  // Active Employee from the 81 German Cement Company staff
  const [currentEmployee, setCurrentEmployee] = useState<GermanEmployee>(GERMAN_CEMENT_81_EMPLOYEES[0]);

  // Modals inside Ha-Be
  const [isStaffDirectoryOpen, setIsStaffDirectoryOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isVipEventModalOpen, setIsVipEventModalOpen] = useState(false);
  const [isVodafoneCashModalOpen, setIsVodafoneCashModalOpen] = useState(false);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);

  // Search filter for 81 employees
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  // Cart & Order state
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [pendingPaymentItem, setPendingPaymentItem] = useState<{ title: string; total: number } | null>(null);
  const [vodafoneSenderPhone, setVodafoneSenderPhone] = useState('01011223344');
  const [vodafoneTrxNumber, setVodafoneTrxNumber] = useState('');
  const [lastCompletedOrder, setLastCompletedOrder] = useState<any>(null);

  // Dynamic Orders List for current employee
  const [employeeOrders, setEmployeeOrders] = useState([
    {
      id: 'ORD-HABE-8821',
      date: 'اليوم — 11:30 ص',
      title: 'وجبة نصف دجاجة مشوية وأرز بسمتي أصفر وسلطات',
      category: 'وجبة ساخنة',
      total: 120,
      paymentMethod: 'بدل وجبة الشركة الألمانية',
      status: 'تم الاستلام بالكنتين',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'ORD-HABE-8814',
      date: 'أمس — 08:15 ص',
      title: 'علبة إفطار صحية (بيض مسلوق، جبن، خيار، توست عسل) + عصير برتقال',
      category: 'إفطار صباحي',
      total: 65,
      paymentMethod: 'فودافون كاش',
      status: 'مكتمل',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
    }
  ]);

  // Canteen / Market Catalog
  const MARKET_ITEMS = [
    { id: 'm1', name: 'عصير برتقال طبيعي معصور طازج 330 مل', category: 'مشروبات وعصائر', price: 25, img: '🍊', inStock: true },
    { id: 'm2', name: 'علبة لبن رايب طبيعي مزارع النيل 400 مل', category: 'ألبان وأجبان', price: 20, img: '🥛', inStock: true },
    { id: 'm3', name: 'ساندوتش جبنة رومي وزيتون بالخبز الفينو البلدي', category: 'مخبوزات وكنتين', price: 30, img: '🥪', inStock: true },
    { id: 'm4', name: 'مياه معدنية طبيعية 600 مل', category: 'مشروبات وعصائر', price: 10, img: '💧', inStock: true },
    { id: 'm5', name: 'علبة كحك وبسكويت فاخر بسمن بلدي (قطعتين)', category: 'حلويات ومخبوزات', price: 25, img: '🍪', inStock: true },
    { id: 'm6', name: 'تمر سيوة عضوي فاخر مغلف 250 جم', category: 'تمور سيوة', price: 35, img: '🌴', inStock: true },
    { id: 'm7', name: 'شاي صعيدي بالنعناع الفريش في كوب حراري', category: 'مشروبات ساخنة', price: 15, img: '☕', inStock: true },
    { id: 'm8', name: 'مشروب طاقة طبيعي وشعير بارد', category: 'مشروبات وعصائر', price: 35, img: '⚡', inStock: true }
  ];

  // Morning Breakfast Catalog
  const BREAKFAST_ITEMS = [
    {
      id: 'bf-1',
      titleAr: 'علبة الإفطار الصحي والنشاط الموزونة (الصورة المعتمدة)',
      descAr: 'بيضتان مسلوقتان طازجتان، شرائح خيار وطماطم طازجة، جبنة بيضاء، زيتون أسود فاخر، بسكويت مقرمش، وخبز توست بزبدة الفول السوداني وعسل النحل.',
      calories: '420 سعرة حرارية',
      priceEGP: 65,
      badge: 'إفطار صحي متوازن',
      icon: '🥚'
    },
    {
      id: 'bf-2',
      titleAr: 'علبة الفول البلدي والبيض بالسمن الطبيعي وسلطة خضراء',
      descAr: 'طبق فول بلدي مدمس بالزيت الحار والليمون والكمون، بيض أومليت بالسمن البلدي، جبنة قريش بالطماطم وزيت الزيتون، و3 أرغفة خبز بلدي ساخن من الفرن.',
      calories: '550 سعرة حرارية',
      priceEGP: 60,
      badge: 'إفطار مصري أصيل',
      icon: '🫓'
    },
    {
      id: 'bf-3',
      titleAr: 'بوكس ساندوتشات الصباح السريعة (3 أصناف)',
      descAr: 'ساندوتش جبنة فيتا وزعتر، ساندوتش حلاوة طحينية بالمكسرات، وساندوتش بيض مسلوق بالمايونيز والخس مع عصير معبأ.',
      calories: '480 سعرة حرارية',
      priceEGP: 55,
      badge: 'سريع لورديات الأفران',
      icon: '🥪'
    }
  ];

  // Hot Meals Catalog
  const HOT_MEAL_ITEMS = [
    {
      id: 'hm-1',
      titleAr: 'وجبة ربع فرخة مشوية على الفحم وأرز بسمتي أصفر',
      descAr: 'ربع دجاجة مشوية بتتبيلة الزبادي والأعشاب، أرز بسمتي بالخلطة والمكسرات، بطاطس فارمز محمرة، وسلطة خضراء وطحينة سمسم نقي.',
      calories: '750 سعرة',
      priceEGP: 110,
      badge: 'الأعلى طلباً بالموقع',
      icon: '🍗'
    },
    {
      id: 'hm-2',
      titleAr: 'طاجن مكرونة بصوص الجبن والكبدة البلدي والسجق',
      descAr: 'مكرونة بيني غنية بصوص الشيدر الأصفر ومغطاة بالكبدة الإسكندراني المتبلة وقطع السجق البلدي المفروم مع مخلل مشكل.',
      calories: '820 سعرة',
      priceEGP: 95,
      badge: 'طاقة مضاعفة',
      icon: '🍝'
    },
    {
      id: 'hm-3',
      titleAr: 'وجبة كفتة الحاتي المشوية وشيش طاووق ومحشي ورق عنب',
      descAr: '3 أصابع كفتة حاتي مشوية على الفحم، قطعتين شيش طاووق متبل، 5 أصابع ورق عنب بالليمون، وأرز أصفر بالزعفران.',
      calories: '800 سعرة',
      priceEGP: 125,
      badge: 'بروتين مشكل فاخر',
      icon: '🍢'
    },
    {
      id: 'hm-4',
      titleAr: 'وجبة ستيك لحم بتلو مشوي صوص المشروم البني',
      descAr: 'شريحتان ستيك بتلو مشوي على الجريل، صوص ديمي جلاس بالمشروم الطازج، أرز أبيض وخضار سوتيه على البخار.',
      calories: '710 سعرة',
      priceEGP: 145,
      badge: 'وجبة الإدارة والمهندسين',
      icon: '🥩'
    }
  ];

  // Filter 81 employees
  const filteredEmployees = GERMAN_CEMENT_81_EMPLOYEES.filter(emp => {
    const matchesSearch = emp.nameAr.includes(staffSearchQuery) || 
                          emp.code.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
                          emp.jobTitle.includes(staffSearchQuery) ||
                          emp.departmentAr.includes(staffSearchQuery);
    const matchesDept = selectedDeptFilter === 'all' || emp.departmentAr.includes(selectedDeptFilter);
    return matchesSearch && matchesDept;
  });

  // Calculate cart total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleAddToCart = (name: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: `cart-${Date.now()}`, name, price, quantity: 1 }];
    });
    onShowToast(`تمت إضافة "${name}" إلى طلبك.`);
  };

  const handleQuickOrder = (title: string, price: number) => {
    setPendingPaymentItem({ title, total: price });
    setIsVodafoneCashModalOpen(true);
  };

  // Complete Vodafone Cash Payment & Dual Financial Sync
  const handleConfirmVodafonePayment = () => {
    const amount = pendingPaymentItem?.total || (cartTotal > 0 ? cartTotal : 95);
    const orderTitle = pendingPaymentItem?.title || (cart.length > 0 ? cart.map(c => `${c.name} (x${c.quantity})`).join(', ') : 'طلب وجبات وماركت');
    const newOrderId = `VDF-${Date.now().toString().slice(-6)}`;
    const trxRef = vodafoneTrxNumber.trim() || `VF-TRX-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: newOrderId,
      date: isRtl ? 'الآن' : 'Just now',
      title: orderTitle,
      category: 'سداد فودافون كاش',
      total: amount,
      paymentMethod: `فودافون كاش (${trxRef})`,
      status: 'تم الاستلام بالكنتين ومطابقة الخزينة',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      employeeName: currentEmployee.nameAr,
      employeeCode: currentEmployee.code
    };

    setEmployeeOrders(prev => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);

    // 1. Audit Log in System
    onAddAuditLog(
      `سداد فودافون كاش في Ha-Be — ${currentEmployee.nameAr} [${currentEmployee.code}]`,
      `Vodafone Cash Payment in Ha-Be — ${currentEmployee.code}`,
      `تم سداد مبلغ ${amount} ج.م عبر فودافون كاش بنجاح. مرجع التحويل: ${trxRef}. تم قيد البيع في كنتين الألمانية ومزامنة الخزينة المركزية مع الحسابات العامة للمدير المالي.`
    );

    // 2. Dual Financial Ledger Sync (سمّع مرتين: في مبيعات الكنتين وتقفيل الخزينة للمدير المالي)
    if (onRecordFinancialTransaction) {
      onRecordFinancialTransaction({
        id: `TX-${newOrderId}`,
        description: `مبيعات كاش فودافون كاش كنتين الألمانية — موظف: ${currentEmployee.nameAr} (${currentEmployee.code})`,
        amount: amount,
        type: 'income',
        category: 'canteen_sales',
        paymentMethod: 'vodafone_cash',
        referenceNumber: trxRef,
        siteId: 'site_german_cement',
        siteName: 'الشركة الألمانية للأسمنت'
      });
    }

    // Reset modals and cart
    setIsVodafoneCashModalOpen(false);
    setCart([]);
    setPendingPaymentItem(null);
    setIsOrderSuccessModalOpen(true);
    onShowToast(`تم تأكيد السداد وإصدار فاتورة إلكترونية لحساب ${currentEmployee.nameAr}.`);
  };

  return (
    <div className="relative min-h-[85vh] py-4 flex flex-col items-center justify-center font-sans">
      
      {/* Viewport Control Bar */}
      <div className="w-full max-w-4xl mx-auto mb-4 flex items-center justify-between px-3 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs font-black text-slate-800 dark:text-white">
            {isRtl ? 'بوابة الشركة الألمانية للأسمنت — نقطة Ha-Be Market' : 'German Cement Company Portal — Ha-Be Market'}
          </span>
          <span className="text-[11px] bg-red-600/10 text-red-600 font-bold px-2 py-0.5 rounded-full border border-red-600/20">
            {GERMAN_CEMENT_81_EMPLOYEES.length} موظف مسجل
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStaffDirectoryOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-red-600" />
            <span>{isRtl ? 'قائمة الـ 81 موظف' : '81 Staff Directory'}</span>
          </button>

          <button
            onClick={() => setIsVipEventModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:bg-orange-600 hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'مقترح الزيارات والإيفنت' : 'VIP Visit Proposal'}</span>
          </button>

          <button
            onClick={() => setIsAdminLoginOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:bg-red-600"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isRtl ? 'دخول الإدارة والكنتين' : 'Admin & Canteen'}</span>
          </button>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* Toggle between Phone Mockup and Fluid Desktop View */}
          <button
            onClick={() => setViewMode(prev => prev === 'phone' ? 'fluid' : 'phone')}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            title={viewMode === 'phone' ? 'عرض على كامل الشاشة' : 'عرض في إطار الموبايل الأصلي'}
          >
            {viewMode === 'phone' ? <Laptop className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            <span className="text-[11px] hidden sm:inline">{viewMode === 'phone' ? 'عرض شاشة كاملة' : 'إطار الموبايل'}</span>
          </button>
        </div>
      </div>

      {/* Main Container: Either Phone Frame or Responsive Fluid */}
      <div className={`transition-all duration-300 ${
        viewMode === 'phone' 
          ? 'w-full max-w-[410px] rounded-[48px] p-3.5 bg-slate-900 border-[8px] border-slate-800 shadow-2xl ring-1 ring-slate-700/50 my-2' 
          : 'w-full max-w-5xl rounded-3xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl'
      }`}>
        
        {/* Phone Speaker & Dynamic Island simulation if in phone mode */}
        {viewMode === 'phone' && (
          <div className="relative w-full flex items-center justify-between px-6 pt-1 pb-2 select-none text-white">
            <span className="text-xs font-bold tracking-tight">9:41</span>
            {/* Dynamic Island pill */}
            <div className="w-24 h-4.5 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold">5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* The Ha-Be Application Canvas */}
        <div className="w-full bg-white text-slate-900 rounded-[36px] overflow-hidden shadow-inner flex flex-col min-h-[700px] relative border border-slate-100">
          
          {/* Ha-Be Brand Header Strip */}
          <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
            {/* Ha-Be Logo with red striped awning icon */}
            <div className="flex items-center gap-2.5">
              {/* Red striped store awning logo */}
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex flex-col items-center justify-center shadow-md shadow-red-600/30">
                <div className="flex gap-0.5 mb-0.5">
                  <span className="w-1 h-2 bg-white rounded-t-sm" />
                  <span className="w-1 h-2 bg-red-800 rounded-t-sm" />
                  <span className="w-1 h-2 bg-white rounded-t-sm" />
                  <span className="w-1 h-2 bg-red-800 rounded-t-sm" />
                </div>
                <span className="text-[10px] font-black tracking-tighter">H</span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-slate-900">Ha-Be</span>
                  <div className="flex gap-0.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                  </div>
                </div>
                <p className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">
                  EMPLOYEE FOOD & BEVERAGE POINT
                </p>
              </div>
            </div>

            {/* Language & Active User pill */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsStaffDirectoryOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 text-[11px] font-bold text-slate-700 hover:text-red-600 transition-all cursor-pointer border border-slate-200"
              >
                <User className="w-3 h-3 text-red-600" />
                <span className="truncate max-w-[85px]">{currentEmployee.nameAr.split(' ')[0]}</span>
              </button>
              <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md">
                AR | EN
              </span>
            </div>
          </div>

          {/* Welcome Slogan & Food Promo Hero Strip */}
          <div className="p-4 bg-gradient-to-b from-red-50/50 to-white flex items-center justify-between gap-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                مرحباً بك <span className="text-red-600 font-bold text-sm">Welcome</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                خدماتك الغذائية والشرائية في مكان واحد
              </p>
              <div className="w-12 h-1 bg-red-600 rounded-full mt-2" />
            </div>

            {/* Mini Food Photo Mock */}
            <div className="w-24 h-16 rounded-2xl overflow-hidden shadow-md shrink-0 border border-slate-200/80 relative">
              <img 
                src="/assets/catering/open_buffet.jpg" 
                alt="Meals" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-1 right-1 text-[9px] font-bold text-white bg-red-600/90 px-1.5 py-0.2 rounded-md">
                طازج اليوم
              </span>
            </div>
          </div>

          {/* Partner & Factory Integration Banner (Matching Image Exactly) */}
          <div className="mx-4 my-2.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="text-center mb-2">
              <span className="text-[10px] text-slate-400 font-medium">بالتعاون مع · Powered & Managed by</span>
              <p className="text-xs font-black text-slate-800">
                National Logistics <span className="text-red-600">|</span> Catering Egypt
              </p>
            </div>

            {/* 3 Step Connected Diagram */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-1">
                  <Building2 className="w-4 h-4 text-slate-700" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">موظفو المصنع</span>
                <span className="text-[8px] text-slate-400">Factory Employees</span>
              </div>

              {/* Dotted Arrow Connector */}
              <div className="flex-1 flex items-center justify-center px-1">
                <div className="w-full border-t border-dashed border-red-300 relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 absolute -top-[3px] left-1/2 -translate-x-1/2" />
                </div>
              </div>

              {/* Ha-Be Center Hub */}
              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 mb-1">
                  <span className="font-black text-xs">Ha-Be</span>
                </div>
                <span className="text-[10px] font-bold text-red-600">نقطة الكنتين</span>
                <span className="text-[8px] text-slate-400">F&B Point</span>
              </div>

              {/* Dotted Arrow Connector */}
              <div className="flex-1 flex items-center justify-center px-1">
                <div className="w-full border-t border-dashed border-red-300 relative">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 absolute -top-[3px] left-1/2 -translate-x-1/2" />
                </div>
              </div>

              {/* National Logistics Fleet */}
              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-1">
                  <UtensilsCrossed className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-800">الوطنية اللوجستية</span>
                <span className="text-[8px] text-slate-400">Catering Egypt</span>
              </div>
            </div>
          </div>

          {/* ACTIVE CONTENT AREA ACCORDING TO USER NAVIGATION */}
          <div className="flex-1 px-4 py-2 overflow-y-auto">

            {/* SUB-VIEW 0: MAIN 5 BIG CARDS HUB (Exact screenshot recreation) */}
            {activeSubView === 'hub' && (
              <div className="space-y-4">
                
                {/* 3 Top Cards (Row 1) */}
                <div className="grid grid-cols-3 gap-2.5">
                  
                  {/* Card 1: الوجبات (Meals) */}
                  <button
                    onClick={() => setActiveSubView('meals')}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <UtensilsCrossed className="w-5 h-5" />
                    </div>
                    <div className="mt-2">
                      <span className="block font-black text-xs text-slate-800">الوجبات</span>
                      <span className="text-[9px] text-slate-400">Meals</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-2 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>

                  {/* Card 2: الماركت (Market) */}
                  <button
                    onClick={() => setActiveSubView('market')}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="mt-2">
                      <span className="block font-black text-xs text-slate-800">الماركت</span>
                      <span className="text-[9px] text-slate-400">Market</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-2 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>

                  {/* Card 3: طلباتي (My Orders) */}
                  <button
                    onClick={() => setActiveSubView('orders')}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <div className="mt-2">
                      <span className="block font-black text-xs text-slate-800">طلباتي</span>
                      <span className="text-[9px] text-slate-400">My Orders</span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-2 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                </div>

                {/* 2 Bottom Cards (Row 2) */}
                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* Card 4: العروض (Offers) */}
                  <button
                    onClick={() => setActiveSubView('offers')}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div className="mt-2">
                      <span className="block font-black text-sm text-slate-800">العروض</span>
                      <span className="text-[10px] text-slate-400">Offers & Coupons</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-2.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {/* Card 5: حسابي (My Account) */}
                  <button
                    onClick={() => setActiveSubView('account')}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-500 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center group cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="mt-2">
                      <span className="block font-black text-sm text-slate-800">حسابي</span>
                      <span className="text-[10px] text-slate-400">My Account</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mt-2.5 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>

                {/* Quick Vodafone Cash Pay Ribbon */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-black block">دفع سريع عبر فودافون كاش</span>
                      <span className="text-[10px] text-red-100">سداد فوري ومزامنة تلقائية مع الخزينة</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPendingPaymentItem({ title: 'شحن رصيد كنتين / سداد سريع', total: 100 });
                      setIsVodafoneCashModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white text-red-600 text-xs font-black shadow-sm hover:bg-red-50 transition-all cursor-pointer"
                  >
                    سداد QR
                  </button>
                </div>

                {/* Slogan Banner */}
                <div className="text-center py-2">
                  <p className="text-xs font-black text-slate-800">معاً .. لبيئة عمل أفضل</p>
                  <p className="text-[9px] text-slate-400">Together for a Better Work Environment</p>
                </div>

              </div>
            )}

            {/* SUB-VIEW 1: الوجبات (MEALS) */}
            {activeSubView === 'meals' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveSubView('hub')}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    ← العودة للقائمة الرئيسية
                  </button>
                  <span className="text-xs font-black text-slate-800">قائمة وجبات المصنع المعتمدة</span>
                </div>

                {/* Category Selector: Breakfast vs Hot Meals */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setMealsCategory('breakfast')}
                    className={`py-2 rounded-lg transition-all cursor-pointer ${
                      mealsCategory === 'breakfast'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🍳 منيو الإفطار الصباحي
                  </button>
                  <button
                    onClick={() => setMealsCategory('hot_meals')}
                    className={`py-2 rounded-lg transition-all cursor-pointer ${
                      mealsCategory === 'hot_meals'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🍗 منيو الوجبات الساخنة
                  </button>
                </div>

                {/* Breakfast Items List */}
                {mealsCategory === 'breakfast' && (
                  <div className="space-y-2.5">
                    {BREAKFAST_ITEMS.map((item) => (
                      <div key={item.id} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-black text-xs text-slate-900">{item.titleAr}</h4>
                                <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                                {item.descAr}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="font-black text-red-600">{item.priceEGP} ج.م</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleQuickOrder(item.titleAr, item.priceEGP)}
                              className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition-colors cursor-pointer"
                            >
                              طلب فوري بفودافون كاش
                            </button>
                            <button
                              onClick={() => handleAddToCart(item.titleAr, item.priceEGP)}
                              className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold hover:bg-slate-200 cursor-pointer"
                            >
                              + السلة
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Hot Meals Items List */}
                {mealsCategory === 'hot_meals' && (
                  <div className="space-y-2.5">
                    {HOT_MEAL_ITEMS.map((item) => (
                      <div key={item.id} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-black text-xs text-slate-900">{item.titleAr}</h4>
                                <span className="text-[9px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded">
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                                {item.descAr}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <span className="font-black text-red-600">{item.priceEGP} ج.م</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleQuickOrder(item.titleAr, item.priceEGP)}
                              className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition-colors cursor-pointer"
                            >
                              طلب فوري بفودافون كاش
                            </button>
                            <button
                              onClick={() => handleAddToCart(item.titleAr, item.priceEGP)}
                              className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold hover:bg-slate-200 cursor-pointer"
                            >
                              + السلة
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* SUB-VIEW 2: الماركت والكنتين (MARKET) */}
            {activeSubView === 'market' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveSubView('hub')}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    ← العودة للقائمة
                  </button>
                  <span className="text-xs font-black text-slate-800">ماركت الكنتين — Ha-Be Point</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {MARKET_ITEMS.map((item) => (
                    <div key={item.id} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div className="text-center">
                        <span className="text-3xl block mb-1">{item.img}</span>
                        <h5 className="font-bold text-xs text-slate-800 line-clamp-2 leading-tight">{item.name}</h5>
                        <span className="text-[9px] text-slate-400 block mt-0.5">{item.category}</span>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-black text-xs text-red-600">{item.price} ج.م</span>
                        <button
                          onClick={() => handleAddToCart(item.name, item.price)}
                          className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center text-xs font-bold hover:bg-red-700 cursor-pointer"
                          title="إضافة للسلة"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: طلباتي (MY ORDERS) */}
            {activeSubView === 'orders' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveSubView('hub')}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    ← العودة للقائمة
                  </button>
                  <span className="text-xs font-black text-slate-800">سجل طلبات: {currentEmployee.nameAr.split(' ')[0]}</span>
                </div>

                <div className="space-y-2.5">
                  {employeeOrders.map((ord) => (
                    <div key={ord.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-mono font-bold text-slate-600">{ord.id}</span>
                        <span>{ord.date}</span>
                      </div>

                      <h4 className="font-bold text-xs text-slate-800 leading-snug">{ord.title}</h4>
                      
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-black text-slate-900">{ord.total} ج.م</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${ord.statusColor}`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 4: العروض والكوبونات (OFFERS) */}
            {activeSubView === 'offers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveSubView('hub')}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    ← العودة للقائمة
                  </button>
                  <span className="text-xs font-black text-slate-800">عروض وكوبونات الألمانية</span>
                </div>

                {/* Serrated Coupon Card 1 */}
                <div className="relative p-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md overflow-hidden border-2 border-dashed border-white/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">كوبون الشركة الحصري</span>
                      <h4 className="font-black text-sm mt-1">خصم 10% للعاملين بمصنع الأسمنت</h4>
                      <p className="text-[10px] text-white/90 mt-0.5">ساري على منتجات الكنتين والوجبات الإضافية</p>
                    </div>
                    <span className="text-2xl font-black">10%</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold bg-white text-red-600 px-2 py-0.5 rounded">GERMAN-10</span>
                    <button 
                      onClick={() => onShowToast('تم نسخ كود الكوبون: GERMAN-10')}
                      className="text-white hover:underline font-bold text-[11px]"
                    >
                      استخدام الكوبون
                    </button>
                  </div>
                </div>

                {/* Ramadan Season Card */}
                <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-md flex items-center gap-3">
                  <img src="/assets/catering/ramadan_box.jpg" alt="Ramadan" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold">عروض المواسم الكبرى</span>
                    <h5 className="font-bold text-xs">كرتونة وشنطة رمضان بشعار الوطنية</h5>
                    <p className="text-[10px] text-slate-300 mt-0.5">حجز مبكر للشركات والعاملين بأسعار المصنع</p>
                    <button 
                      onClick={() => onShowToast('تم تسجيل اهتمامك بكرتونة رمضان.')}
                      className="mt-1.5 text-[10px] font-bold text-red-400 hover:text-white"
                    >
                      طلب حجز مسبق ←
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* SUB-VIEW 5: حسابي (MY ACCOUNT) */}
            {activeSubView === 'account' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveSubView('hub')}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    ← العودة للقائمة
                  </button>
                  <span className="text-xs font-black text-slate-800">الملف الشخصي للموظف</span>
                </div>

                {/* Employee ID Badge Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] text-red-400 font-mono font-bold">{currentEmployee.code}</span>
                      <h3 className="font-black text-base text-white mt-0.5">{currentEmployee.nameAr}</h3>
                      <p className="text-xs text-slate-300 mt-0.5">{currentEmployee.jobTitle}</p>
                      <p className="text-[11px] text-slate-400">{currentEmployee.departmentAr}</p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-bold text-base">
                      {currentEmployee.code.split('-')[1]}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 grid grid-cols-3 gap-2 text-center">
                    <div className="p-1.5 rounded-xl bg-white/5">
                      <span className="text-[9px] text-slate-400 block">البدل اليومي</span>
                      <span className="font-bold text-xs text-white">{currentEmployee.dailyAllowanceEGP} ج.م</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/5">
                      <span className="text-[9px] text-slate-400 block">رصيد الكاش باك</span>
                      <span className="font-bold text-xs text-emerald-400">{currentEmployee.cashbackBalanceEGP} ج.م</span>
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/5">
                      <span className="text-[9px] text-slate-400 block">وجبات الشهر</span>
                      <span className="font-bold text-xs text-orange-400">{currentEmployee.monthlyMealsRemaining} وجبة</span>
                    </div>
                  </div>
                </div>

                {/* Change Employee Button */}
                <button
                  onClick={() => setIsStaffDirectoryOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-red-600" />
                  <span>تبديل الموظف من قائمة الـ 81 عاملاً</span>
                </button>

              </div>
            )}

          </div>

          {/* Cart Floating Strip (if cart has items) */}
          {cart.length > 0 && activeSubView !== 'hub' && (
            <div className="px-4 py-2 bg-slate-900 text-white flex items-center justify-between border-t border-slate-800 animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold">{cart.length} أصناف · {cartTotal} ج.م</span>
              </div>
              <button
                onClick={() => {
                  setPendingPaymentItem({ title: cart.map(c => c.name).join(', '), total: cartTotal });
                  setIsVodafoneCashModalOpen(true);
                }}
                className="px-3 py-1 rounded-xl bg-red-600 text-white text-xs font-black hover:bg-red-700 cursor-pointer"
              >
                دفع فودافون كاش
              </button>
            </div>
          )}

          {/* Ha-Be Bottom Navigation Bar (Matching Mockup Exactly) */}
          <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-center select-none">
            
            {/* 1. الرئيسية Home */}
            <button
              onClick={() => {
                setActiveBottomNav('home');
                setActiveSubView('hub');
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                activeBottomNav === 'home' ? 'text-red-600 font-black' : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px]">الرئيسية</span>
            </button>

            {/* 2. الإشعارات Notifications */}
            <button
              onClick={() => {
                setActiveBottomNav('notifications');
                onShowToast('لديك إشعار جديد: تم اعتماد منيو الأسبوع القادم للوردية الصباحية.');
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors relative ${
                activeBottomNav === 'notifications' ? 'text-red-600 font-black' : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-red-600 absolute top-0 right-1" />
              <span className="text-[10px]">الإشعارات</span>
            </button>

            {/* 3. المسح Scan / QR Pay */}
            <button
              onClick={() => {
                setActiveBottomNav('scan');
                setIsVodafoneCashModalOpen(true);
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                activeBottomNav === 'scan' ? 'text-red-600 font-black' : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              <QrCode className="w-5 h-5" />
              <span className="text-[10px]">المسح</span>
            </button>

            {/* 4. الإعدادات Settings */}
            <button
              onClick={() => {
                setActiveBottomNav('settings');
                onShowToast('إعدادات حساب موقع الشركة الألمانية - مطابقة ISO 22000');
              }}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                activeBottomNav === 'settings' ? 'text-red-600 font-black' : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px]">الإعدادات</span>
            </button>
          </div>

        </div>
      </div>

      {/* ================= MODAL 1: THE 81 FACTORY EMPLOYEES DIRECTORY ================= */}
      {isStaffDirectoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    قائمة الـ 81 موظفاً المعتمدين — الشركة الألمانية للأسمنت
                  </h3>
                  <p className="text-xs text-slate-500">
                    اختر أي موظف لتسجيل الدخول الفوري واستعراض حسابه ومنيوه المخصص
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsStaffDirectoryOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم، الكود، أو الوظيفة..."
                  value={staffSearchQuery}
                  onChange={(e) => setStaffSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-red-600 outline-none"
                />
              </div>

              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-xs text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-red-600 outline-none cursor-pointer"
              >
                <option value="all">كافة الأقسام والورديات (81)</option>
                <option value="أفران">قسم الأفران والكلنكر</option>
                <option value="طواحين">قسم طواحين الأسمنت</option>
                <option value="الصيانة">الصيانة الميكانيكية والكهربائية</option>
                <option value="اللوجستيات">اللوجستيات ومحطة التعبئة</option>
                <option value="الجودة">مختبر الجودة والسلامة HSE</option>
              </select>
            </div>

            {/* Employees List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredEmployees.map((emp) => {
                const isSelected = emp.id === currentEmployee.id;
                return (
                  <div
                    key={emp.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-red-50/70 dark:bg-red-950/40 border-red-500 shadow-sm'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-mono font-black text-xs text-slate-700 dark:text-slate-300">
                        {emp.code.split('-')[1]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">{emp.nameAr}</h4>
                          <span className="text-[10px] font-mono font-bold text-red-600">{emp.code}</span>
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                            {emp.shift}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {emp.jobTitle} · {emp.departmentAr}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left hidden sm:block">
                        <span className="text-[10px] text-slate-400 block">بدل يومي</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{emp.dailyAllowanceEGP} ج.م</span>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentEmployee(emp);
                          setIsStaffDirectoryOpen(false);
                          setActiveSubView('account');
                          onShowToast(`تم تسجيل الدخول كموظف: ${emp.nameAr}`);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-600 hover:text-white'
                        }`}
                      >
                        {isSelected ? 'الموظف النشط ✓' : 'اختيار'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
              إجمالي العاملين المسجلين بالموقع: {GERMAN_CEMENT_81_EMPLOYEES.length} عاملاً وفنياً ومهندساً
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: VODAFONE CASH QR PAYMENT ================= */}
      {isVodafoneCashModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-red-500/40 shadow-2xl p-5 sm:p-6 text-center space-y-4">
            
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-600/30">
              <QrCode className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                واجهة سداد فودافون كاش المعتمدة
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                نقطة بيع كنتين ومطاعم الشركة الألمانية للأسمنت
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-4 rounded-2xl bg-white border-2 border-red-600 shadow-inner max-w-[220px] mx-auto text-center space-y-2">
              {/* Dynamic QR SVG Pattern */}
              <div className="w-40 h-40 bg-slate-950 mx-auto rounded-xl p-2 flex items-center justify-center relative">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                  <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v10H40zM55 10h5v10h-5zM40 30h10v10H40zM70 40h10v10H70zM50 50h20v10H50zM40 70h10v20H40zM70 70h10v10H70zM85 85h15v15H85z" />
                </svg>
                {/* Center Vodafone Cash Logo Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-md">
                    VF
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono font-bold text-slate-800">
                01010430347
              </div>
              <span className="text-[9px] text-red-600 font-bold block">
                امسح الـ QR أو حول للمحفظة
              </span>
            </div>

            {/* Payment Summary */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-right space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">الموظف المستفيد:</span>
                <span className="font-bold text-slate-900 dark:text-white">{currentEmployee.nameAr} ({currentEmployee.code})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">البيان:</span>
                <span className="font-bold text-slate-900 dark:text-white">{pendingPaymentItem?.title || 'طلب كنتين ووجبات'}</span>
              </div>
              <div className="flex justify-between text-sm font-black pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-red-600">المبلغ المطلوب:</span>
                <span className="text-red-600">{pendingPaymentItem?.total || (cartTotal > 0 ? cartTotal : 95)} ج.م</span>
              </div>
            </div>

            {/* Transaction Ref Input */}
            <div className="text-right space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                رقم عملية التحويل (أو سيتم توليد مرجع فوري):
              </label>
              <input
                type="text"
                placeholder="مثال: VF-982143 أو اتركه للتوليد الآلي"
                value={vodafoneTrxNumber}
                onChange={(e) => setVodafoneTrxNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleConfirmVodafonePayment}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تأكيد السداد وقيد الخزينة</span>
              </button>

              <button
                onClick={() => setIsVodafoneCashModalOpen(false)}
                className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 cursor-pointer"
              >
                إلغاء
              </button>
            </div>

            <p className="text-[10px] text-slate-400">
              * بمجرد التأكيد، يسمع المبلغ فوراً في مبيعات الكنتين وحسابات الإغلاق اليومي للمدير المالي.
            </p>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: VIP VISIT & CORPORATE EVENT PROPOSAL ================= */}
      {isVipEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    مقترح الزيارات والفعاليات الرسمية (VIP Events)
                  </h3>
                  <p className="text-xs text-slate-500">
                    باقات مخصصة لضيوف وخبراء الشركة الألمانية ومجالس الإدارة
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsVipEventModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Proposal Options */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">1. بوفيه الوفود الألمانية والدولية (German Delegation Executive)</h4>
                  <span className="text-xs font-black text-orange-600">380 ج.م / فرد</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  سخانات فندقية كاملة تشمل سالمون مدخن، لحوم مشوية، خضار أوروبي طازج، شوربة كريمة، بوفيه حلويات فرنسية، ومشروبات باردة وساخنة مع خدمة ويترز متخصصة.
                </p>
                <button
                  onClick={() => {
                    setIsVipEventModalOpen(false);
                    onShowToast('تم رفع طلب حجز بوفيه الوفود الألمانية لإدارة التشغيل بمطبخ مول العين.');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-all cursor-pointer"
                >
                  طلب اعتماد الباقة للزيارة القادمة
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">2. استراحة الشاي والقهوة واجتماعات مجلس الإدارة (Coffee Break)</h4>
                  <span className="text-xs font-black text-orange-600">120 ج.م / فرد</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  ماكينة قهوة إسبريسو وكابتشينو، شاي سيلاني وأعشاب طبيعية، تشكيلة كانابيهات مالحة، ميني كرواسون، ودونتس طازجة من مخابزنا المركزية.
                </p>
                <button
                  onClick={() => {
                    setIsVipEventModalOpen(false);
                    onShowToast('تم تسجيل طلب استراحة القهوة لاجتماع الإدارة.');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold hover:bg-orange-600 transition-all cursor-pointer"
                >
                  تأكيد حجز استراحة القهوة
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ================= MODAL 4: ADMIN & CANTEEN LOGIN ================= */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 space-y-4 text-center">
            
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-red-500" />
            </div>

            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">
                دخول الإدارة وكاشير الكنتين
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                مخصص لمشرف نقطة Ha-Be ومدير فرع الموقع
              </p>
            </div>

            <div className="space-y-2 text-right">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">اسم المستخدم الإداري:</label>
                <input
                  type="text"
                  defaultValue="german.canteen.admin"
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs text-slate-800 dark:text-slate-200 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">رمز المرور أو PIN:</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border text-xs text-slate-800 dark:text-slate-200 mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  setIsAdminLoginOpen(false);
                  onShowToast('تم تسجيل الدخول بصلاحيات مشرف الكنتين بنجاح.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => setIsAdminLoginOpen(false)}
                className="px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 5: ORDER SUCCESS ================= */}
      {isOrderSuccessModalOpen && lastCompletedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl p-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-black text-base text-slate-900 dark:text-white">
              تم تسجيل الطلب وتأكيد السداد!
            </h3>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs text-right space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">كود الطلب:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-white">{lastCompletedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الموظف:</span>
                <span className="font-bold text-slate-800 dark:text-white">{lastCompletedOrder.employeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">إجمالي المبلغ:</span>
                <span className="font-black text-emerald-600">{lastCompletedOrder.total} ج.م</span>
              </div>
            </div>

            <button
              onClick={() => setIsOrderSuccessModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer"
            >
              تم وإغلاق الإشعار
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
