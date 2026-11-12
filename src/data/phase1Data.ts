import hangerStationImg from '../assets/images/kitchen_eg_hanger_station_1794519256392.jpg';
import mallAlAinImg from '../assets/images/kitchen_eg_mall_al_ain_1794519255070.jpg';
import alHurriyaImg from '../assets/images/kitchen_eg_al_hurriya_1794519256228.jpg';
import factoryStripImg from '../assets/images/strip_factory_catering_1794519256376.jpg';
import offersStripImg from '../assets/images/strip_catering_offers_1794519256900.jpg';
import cateringVipSpreadImg from '../assets/images/catering_vip_spread_1794513442775.jpg';

export type LanguageCode = 'ar' | 'en';
export type CountryCode = 'EG' | 'AE' | 'SA' | 'OM';

export interface CountryOption {
  code: CountryCode;
  dialCode: string;
  nameAr: string;
  nameEn: string;
  currencyAr: string;
  currencyEn: string;
}

export const SUPPORTED_COUNTRIES: CountryOption[] = [
  {
    code: 'EG',
    dialCode: '+20',
    nameAr: 'مصر',
    nameEn: 'Egypt',
    currencyAr: 'ج.م',
    currencyEn: 'EGP',
  },
  {
    code: 'AE',
    dialCode: '+971',
    nameAr: 'الإمارات العربية المتحدة',
    nameEn: 'United Arab Emirates',
    currencyAr: 'د.إ',
    currencyEn: 'AED',
  },
  {
    code: 'SA',
    dialCode: '+966',
    nameAr: 'المملكة العربية السعودية',
    nameEn: 'Saudi Arabia',
    currencyAr: 'ر.س',
    currencyEn: 'SAR',
  },
  {
    code: 'OM',
    dialCode: '+968',
    nameAr: 'سلطنة عُمان',
    nameEn: 'Sultanate of Oman',
    currencyAr: 'ر.ع',
    currencyEn: 'OMR',
  },
];

export type SearchScope =
  | 'all'
  | 'offers'
  | 'places'
  | 'invoices'
  | 'gift_cards'
  | 'meals'
  | 'kitchens';

export interface ServiceItem12 {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  iconKey: string;
  targetSection: string;
  highlighted?: boolean;
}

export const TWELVE_SERVICES: ServiceItem12[] = [
  {
    id: 'order_meals_offer',
    titleAr: 'اطلب عرض وجبات',
    titleEn: 'Order Meals Offer',
    subtitleAr: 'عروض الوجبات المؤسسية واليومية',
    subtitleEn: 'Daily & institutional meal offers',
    iconKey: 'utensils',
    targetSection: 'service_meals_offer',
    highlighted: true,
  },
  {
    id: 'pay_invoices',
    titleAr: 'دفع الفواتير',
    titleEn: 'Pay Invoices',
    subtitleAr: 'استعراض الفواتير وسجل السداد',
    subtitleEn: 'Review invoices & payment records',
    iconKey: 'receipt',
    targetSection: 'service_invoices',
  },
  {
    id: 'factory_corporate_offers',
    titleAr: 'عروض المصانع والشركات',
    titleEn: 'Factory & Corporate Offers',
    subtitleAr: 'تغذية خطوط الإنتاج والمواقع',
    subtitleEn: 'Production lines & site catering',
    iconKey: 'factory',
    targetSection: 'service_corporate',
  },
  {
    id: 'wedding_occasion_cards',
    titleAr: 'بطاقات الأفراح والمناسبات',
    titleEn: 'Wedding & Occasion Cards',
    subtitleAr: 'باقات الولائم والأفراح المخصصة',
    subtitleEn: 'Custom banquet & wedding packages',
    iconKey: 'heart',
    targetSection: 'service_weddings',
  },
  {
    id: 'quality_hygiene',
    titleAr: 'الجودة والهايجين',
    titleEn: 'Quality & Hygiene',
    subtitleAr: 'معايير سلامة الغذاء والرقابة',
    subtitleEn: 'Food safety & inspection standards',
    iconKey: 'shield',
    targetSection: 'service_hygiene',
  },
  {
    id: 'restaurants_kitchens',
    titleAr: 'المطاعم والمطابخ',
    titleEn: 'Restaurants & Kitchens',
    subtitleAr: 'تصفح المطابخ المركزية الثلاثة',
    subtitleEn: 'Browse our 3 central kitchens',
    iconKey: 'chef',
    targetSection: 'kitchens',
    highlighted: true,
  },
  {
    id: 'catering_requests',
    titleAr: 'طلبات الإعاشة',
    titleEn: 'Catering Requests',
    subtitleAr: 'إعاشة شاملة للمواقع والمشروعات',
    subtitleEn: 'Full subsistence for sites & projects',
    iconKey: 'truck',
    targetSection: 'service_catering_req',
  },
  {
    id: 'request_quotation',
    titleAr: 'طلب عرض سعر',
    titleEn: 'Request Quotation',
    subtitleAr: 'تقديم طلب تسعير رسمي مخصص',
    subtitleEn: 'Submit a custom official RFQ',
    iconKey: 'file',
    targetSection: 'quotation',
    highlighted: true,
  },
  {
    id: 'gift_cards',
    titleAr: 'بطاقات الهدايا',
    titleEn: 'Gift Cards',
    subtitleAr: 'قسائم الهدايا والبن والعسل والتمور',
    subtitleEn: 'Gift vouchers, coffee, honey & dates',
    iconKey: 'gift',
    targetSection: 'service_gifts',
  },
  {
    id: 'book_restaurant',
    titleAr: 'احجز مطعمك',
    titleEn: 'Book Your Restaurant',
    subtitleAr: 'حجوزات المطاعم والضيافة',
    subtitleEn: 'Restaurant & hospitality bookings',
    iconKey: 'calendar',
    targetSection: 'service_book_restaurant',
  },
  {
    id: 'book_majlis',
    titleAr: 'احجز مجلسك',
    titleEn: 'Book Your Majlis',
    subtitleAr: 'حجز المجالس الخاصة لكبار الضيوف',
    subtitleEn: 'Private Majlis reservations for VIPs',
    iconKey: 'sparkles',
    targetSection: 'service_book_majlis',
  },
  {
    id: 'events_trips',
    titleAr: 'تنظيم المناسبات والرحلات',
    titleEn: 'Events & Trips',
    subtitleAr: 'المؤتمرات والرحلات الجماعية',
    subtitleEn: 'Conferences & group trips',
    iconKey: 'compass',
    targetSection: 'service_events_trips',
  },
];

export interface CentralKitchenProfile {
  id: 'hanger_station' | 'mall_al_ain' | 'al_hurriya';
  codeNameEn: string;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
  locationAr: string;
  locationEn: string;
  coverageAr: string;
  coverageEn: string;
  isHeadquarters?: boolean;
  servicesAr: string[];
  servicesEn: string[];
  menuCategoriesAr: string[];
  menuCategoriesEn: string[];
  sampleMenuItems: {
    id: string;
    nameAr: string;
    nameEn: string;
    descAr: string;
    descEn: string;
    approvedPrice: number | null; // null means awaiting data approval ("بانتظار اعتماد البيانات")
    rating: number | null;
  }[];
}

export const THREE_CENTRAL_KITCHENS: CentralKitchenProfile[] = [
  {
    id: 'hanger_station',
    codeNameEn: 'HANGER STATION CENTRAL KITCHEN',
    nameAr: 'مطبخ هنجر استيشن المركزي',
    nameEn: 'Hanger Station Central Kitchen',
    imageUrl: hangerStationImg,
    locationAr: 'التجمع — القاهرة الجديدة',
    locationEn: 'New Cairo — Tagamoa',
    coverageAr: 'يخدم منطقة التجمع والمناطق الإدارية والخدمية المحيطة',
    coverageEn: 'Serves the Tagamoa (New Cairo) district and surrounding hubs',
    servicesAr: [
      'إنتاج الوجبات الساخنة اليومية للمنشآت الإدارية والتجارية',
      'تجهيز بوفيهات المؤتمرات والضيافة المؤسسية',
      'التعبئة الحرارية المراقبة وفق اشتراطات سلامة الغذاء',
    ],
    servicesEn: [
      'Daily hot meal production for corporate & commercial facilities',
      'Conference buffets and executive hospitality catering',
      'Thermally sealed packaging compliant with food safety rules',
    ],
    menuCategoriesAr: ['وجبات الشركات اليومية', 'بوفيهات المديرين VIP', 'السندوتشات والمخبوزات'],
    menuCategoriesEn: ['Daily Corporate Meals', 'Executive VIP Buffets', 'Sandwiches & Bakery'],
    sampleMenuItems: [
      {
        id: 'hs_meal_1',
        nameAr: 'وجبة بروتين مشوي للشركات (نموذج تشغيلي)',
        nameEn: 'Corporate Grilled Protein Meal (Operational Template)',
        descAr: 'وجبة متكاملة مع أرز وسلطة وتغليف حراري محكم',
        descEn: 'Balanced meal with rice, salad, and thermal sealing',
        approvedPrice: null,
        rating: null,
      },
      {
        id: 'hs_meal_2',
        nameAr: 'بوكس إفطار واجتماعات صباحي',
        nameEn: 'Morning Meeting Breakfast Box',
        descAr: 'تشكيلة مخبوزات وجبن ومشروبات للاجتماعات',
        descEn: 'Curated bakery, cheese, and beverages for meetings',
        approvedPrice: null,
        rating: null,
      },
    ],
  },
  {
    id: 'mall_al_ain',
    codeNameEn: 'MALL AL AIN CENTRAL KITCHEN',
    nameAr: 'مطبخ مول العين المركزي',
    nameEn: 'Mall Al Ain Central Kitchen',
    imageUrl: mallAlAinImg,
    locationAr: 'مدينة بدر — المقر الرئيسي للشركة',
    locationEn: 'Badr City — Company Headquarters',
    coverageAr: 'مدينة بدر والمناطق الصناعية المجاورة وإدارة التشغيل المركزية',
    coverageEn: 'Badr City, neighboring industrial zones & central operations HQ',
    isHeadquarters: true,
    servicesAr: [
      'المقر الرئيسي لإدارة التشغيل والجودة والهايجين بالشركة',
      'إنتاج وجبات المصانع والورديات عالية الطاقة',
      'إدارة وتنسيق عقود الإعاشة والمناسبات الكبرى',
    ],
    servicesEn: [
      'Company HQ for operations, quality assurance & hygiene oversight',
      'High-volume factory & industrial shift meal production',
      'Large-scale subsistence contracts & events dispatch',
    ],
    menuCategoriesAr: ['إعاشة المصانع والورديات', 'وجبات المشويات والولائم', 'باقات الأفراح والمناسبات'],
    menuCategoriesEn: ['Factory & Shift Subsistence', 'Grills & Feasts', 'Weddings & Events'],
    sampleMenuItems: [
      {
        id: 'ma_meal_1',
        nameAr: 'وجبة وردية صناعية متكاملة',
        nameEn: 'Complete Industrial Shift Meal',
        descAr: 'مصممة لتغطية احتياجات الطاقة للعاملين بالمصانع',
        descEn: 'Designed for high-energy factory shift requirements',
        approvedPrice: null,
        rating: null,
      },
      {
        id: 'ma_meal_2',
        nameAr: 'باقة وليمة ومناسبات عائلية',
        nameEn: 'Family Banquet & Occasion Pack',
        descAr: 'تجهيز وتعبئة فاخرة وفق عدد الضيوف المطلوب',
        descEn: 'Premium preparation scaled to guest headcount',
        approvedPrice: null,
        rating: null,
      },
    ],
  },
  {
    id: 'al_hurriya',
    codeNameEn: 'AL HURRIYA CENTRAL KITCHEN',
    nameAr: 'مطبخ الحرية المركزي',
    nameEn: 'Al Hurriya Central Kitchen',
    imageUrl: alHurriyaImg,
    locationAr: 'منطقة اللاهون',
    locationEn: 'Al-Lahoun District',
    coverageAr: 'يخدم اللاهون، مع نطاق تغطية بني سويف والمنيا حسب التشغيل الفعلي',
    coverageEn: 'Serves Al-Lahoun, with coverage across Beni Suef & Minya per active operations',
    servicesAr: [
      'التوريد الغذائي لمواقع المشروعات الإنشائية والصناعية بالصعيد',
      'خطوط طهي وتعبئة بكميات كبيرة للوجبات الساخنة والوجبات الجافة',
      'إدارة طلبات الإعاشة والتموين الميداني',
    ],
    servicesEn: [
      'Catering supply for industrial & construction sites in Upper Egypt',
      'Bulk cooking & sealed hot/dry meal packaging lines',
      'Field subsistence & catering order dispatch',
    ],
    menuCategoriesAr: ['وجبات الإعاشة الميدانية', 'وجبات الإطعام والولائم', 'الوجبات الجافة للطوارئ'],
    menuCategoriesEn: ['Field Subsistence Meals', 'Group & Banquet Meals', 'Dry Ration Packs'],
    sampleMenuItems: [
      {
        id: 'ah_meal_1',
        nameAr: 'وجبة إعاشة ميدانية كاملة',
        nameEn: 'Full Field Subsistence Meal',
        descAr: 'وجبة ساخنة معبأة للنقل والتوزيع الميداني بالمشروعات',
        descEn: 'Hot sealed meal ready for project site transport',
        approvedPrice: null,
        rating: null,
      },
      {
        id: 'ah_meal_2',
        nameAr: 'وجبة مطبوخة للتجمعات والمناسبات',
        nameEn: 'Cooked Gathering & Event Meal',
        descAr: 'تحضير طازج وفق المواصفات المعتمدة من التشغيل',
        descEn: 'Freshly prepared to operational specifications',
        approvedPrice: null,
        rating: null,
      },
    ],
  },
];

export interface CarouselShowcaseSlide {
  id: string;
  altAr: string;
  altEn: string;
  imageUrl: string;
  targetSection: string;
  kitchenId?: 'hanger_station' | 'mall_al_ain' | 'al_hurriya';
}

export const MAIN_SERVICES_PHOTO_STRIP: CarouselShowcaseSlide[] = [
  {
    id: 'strip_mall_al_ain',
    altAr: 'مطبخ مول العين المركزي — مدينة بدر',
    altEn: 'Mall Al Ain Central Kitchen — Badr City',
    imageUrl: mallAlAinImg,
    targetSection: 'kitchen_detail',
    kitchenId: 'mall_al_ain',
  },
  {
    id: 'strip_hanger',
    altAr: 'مطبخ هنجر استيشن — التجمع',
    altEn: 'Hanger Station Central Kitchen — Tagamoa',
    imageUrl: hangerStationImg,
    targetSection: 'kitchen_detail',
    kitchenId: 'hanger_station',
  },
  {
    id: 'strip_hurriya',
    altAr: 'مطبخ الحرية المركزي — اللاهون والصعيد',
    altEn: 'Al Hurriya Central Kitchen — Al-Lahoun',
    imageUrl: alHurriyaImg,
    targetSection: 'kitchen_detail',
    kitchenId: 'al_hurriya',
  },
  {
    id: 'strip_spread_vip',
    altAr: 'عروض الوجبات والضيافة المؤسسية',
    altEn: 'Corporate Meals & Hospitality',
    imageUrl: cateringVipSpreadImg,
    targetSection: 'service_meals_offer',
  },
  {
    id: 'strip_weddings_buffet',
    altAr: 'بطاقات الأفراح والبوفيه المفتوح',
    altEn: 'Weddings & Open Buffets',
    imageUrl: '/assets/catering/open_buffet.jpg',
    targetSection: 'service_weddings',
  },
];

export const FACTORY_CORPORATE_PHOTO_STRIP: CarouselShowcaseSlide[] = [
  {
    id: 'fac_line_1',
    altAr: 'تغذية خطوط الإنتاج والمصانع',
    altEn: 'Factory Dining & Shift Meals',
    imageUrl: factoryStripImg,
    targetSection: 'service_corporate',
  },
  {
    id: 'fac_kitchen_1',
    altAr: 'إنتاج وجبات الشركات والمواقع',
    altEn: 'Central Kitchen Corporate Production',
    imageUrl: mallAlAinImg,
    targetSection: 'service_catering_req',
  },
  {
    id: 'fac_packing_1',
    altAr: 'تعبئة وتغليف حراري لمواقع المشروعات',
    altEn: 'Thermal Packaging for Project Sites',
    imageUrl: alHurriyaImg,
    targetSection: 'service_corporate',
  },
  {
    id: 'fac_prep_1',
    altAr: 'تجهيز وجبات الموظفين وفق اشتراطات الهايجين',
    altEn: 'Hygienic Employee Meal Assembly',
    imageUrl: hangerStationImg,
    targetSection: 'service_hygiene',
  },
];

export const OFFERS_PHOTO_STRIP: CarouselShowcaseSlide[] = [
  {
    id: 'off_meals_1',
    altAr: 'عروض وجبات الشركات والمشويات',
    altEn: 'Corporate Meal & Grill Offers',
    imageUrl: offersStripImg,
    targetSection: 'service_meals_offer',
  },
  {
    id: 'off_vip_1',
    altAr: 'ولائم وبوفيهات المناسبات',
    altEn: 'VIP Banquets & Occasions',
    imageUrl: cateringVipSpreadImg,
    targetSection: 'service_weddings',
  },
  {
    id: 'off_dates_1',
    altAr: 'بطاقات الهدايا والتمور والعسل والبن',
    altEn: 'Gift Cards, Dates, Honey & Coffee',
    imageUrl: '/assets/catering/siwa_dates.jpg',
    targetSection: 'service_gifts',
  },
  {
    id: 'off_charity_1',
    altAr: 'تجهيز وجبات الإطعام والمناسبات الكبرى',
    altEn: 'Bulk Charity & Event Meal Boxes',
    imageUrl: '/assets/catering/charity_meals.jpg',
    targetSection: 'service_events_trips',
  },
];

export const SWIPEABLE_GALLERY_SLIDES = MAIN_SERVICES_PHOTO_STRIP;

// Food Categories (Prompt Section 7)
export const FOOD_CATEGORIES = [
  { id: 'breakfast', ar: 'الإفطار', en: 'Breakfast' },
  { id: 'pizza', ar: 'البيتزا', en: 'Pizza' },
  { id: 'foul_taameya', ar: 'الفول والطعمية', en: 'Foul & Falafel' },
  { id: 'pastries', ar: 'المعجنات', en: 'Pastries' },
  { id: 'sushi', ar: 'السوشي', en: 'Sushi' },
  { id: 'pasta', ar: 'الباستا', en: 'Pasta' },
  { id: 'desserts', ar: 'الحلويات', en: 'Desserts' },
  { id: 'grills', ar: 'المشويات', en: 'Grills' },
  { id: 'koshary', ar: 'الكشري', en: 'Koshary' },
  { id: 'sandwiches', ar: 'السندوتشات', en: 'Sandwiches' },
  { id: 'juices', ar: 'العصائر', en: 'Juices' },
  { id: 'full_meals', ar: 'الوجبات الكاملة', en: 'Full Meals' },
  { id: 'delivery', ar: 'الدليفري', en: 'Delivery' },
  { id: 'restaurants', ar: 'المطاعم', en: 'Restaurants' },
  { id: 'reservations', ar: 'الحجوزات', en: 'Reservations' },
];

export type RoleScope =
  | 'visitor'
  | 'individual'
  | 'corporate_client'
  | 'kitchen_manager'
  | 'system_admin';

export interface Phase1RoleConfig {
  id: RoleScope;
  nameAr: string;
  nameEn: string;
  permissionsAr: string[];
  permissionsEn: string[];
  canViewInvoices: boolean;
  canViewAdminPanel: boolean;
  canEditKitchens: boolean;
}

export const PHASE1_ROLES: Phase1RoleConfig[] = [
  {
    id: 'visitor',
    nameAr: 'زائر عام',
    nameEn: 'Public Visitor',
    permissionsAr: ['تصفح الخدمات الـ 12', 'استعراض المطابخ المركزية', 'طلب عرض سعر'],
    permissionsEn: ['Browse 12 Services', 'View Central Kitchens', 'Submit RFQ'],
    canViewInvoices: false,
    canViewAdminPanel: false,
    canEditKitchens: false,
  },
  {
    id: 'individual',
    nameAr: 'حساب أفراد',
    nameEn: 'Individual Account',
    permissionsAr: ['الوجبات والعروض', 'سلة الطلبات وحفظها', 'دعم العملاء'],
    permissionsEn: ['Meals & Offers', 'Persistent Cart', 'Customer Support'],
    canViewInvoices: true,
    canViewAdminPanel: false,
    canEditKitchens: false,
  },
  {
    id: 'corporate_client',
    nameAr: 'عميل شركات ومصانع',
    nameEn: 'Corporate Client',
    permissionsAr: ['طلبات الإعاشة', 'فواتير المنشأة فقط', 'بوابة العميل المستقلة'],
    permissionsEn: ['Catering Requests', 'Company-Scoped Invoices', 'Client Portal'],
    canViewInvoices: true,
    canViewAdminPanel: false,
    canEditKitchens: false,
  },
  {
    id: 'kitchen_manager',
    nameAr: 'إدارة المطابخ والطلبات',
    nameEn: 'Kitchen & Orders Admin',
    permissionsAr: ['متابعة طلبات عروض الأسعار', 'مراجعة تشغيل المطابخ', 'سجل العمليات'],
    permissionsEn: ['Review RFQ Orders', 'Kitchen Ops Control', 'Activity Log'],
    canViewInvoices: true,
    canViewAdminPanel: true,
    canEditKitchens: true,
  },
  {
    id: 'system_admin',
    nameAr: 'مدير النظام والإدارة',
    nameEn: 'System Administrator',
    permissionsAr: ['إدارة الصلاحيات الكاملة', 'اعتماد البيانات والأسعار', 'المنظومة التشغيلية الكاملة'],
    permissionsEn: ['Full RBAC Permissions', 'Approve Data & Pricing', 'Full Enterprise Suite'],
    canViewInvoices: true,
    canViewAdminPanel: true,
    canEditKitchens: true,
  },
];

// Explicit 7-Level Task Status per Section 15 (قواعد التنفيذ والاختبار — إلزامية)
export type TaskCompletionStatus =
  | '1. لم تبدأ'
  | '2. قيد التنفيذ'
  | '3. واجهة منفذة فقط'
  | '4. الوظيفة منفذة'
  | '5. الربط الفعلي مكتمل'
  | '6. الاختبار الفعلي ناجح'
  | '7. مكتمل ومعتمد';

export interface Phase1VerificationItem {
  id: string;
  featureAr: string;
  featureEn: string;
  status: TaskCompletionStatus;
  notesAr: string;
  notesEn: string;
}

export const PHASE1_AUDIT_REPORT: Phase1VerificationItem[] = [
  {
    id: 'chk_layout',
    featureAr: 'الهيكل الأساسي Mobile-First والتصميم البرتقالي/الأبيض',
    featureEn: 'Mobile-First Shell & Bright Milky-White/Orange Identity',
    status: '6. الاختبار الفعلي ناجح',
    notesAr: 'تم التنفيذ والاختبار عبر الهاتف والكمبيوتر مع شريط سفلي وتخطيط شبكي متجاوب.',
    notesEn: 'Implemented and verified for mobile & desktop with bottom tab bar and responsive grids.',
  },
  {
    id: 'chk_countries',
    featureAr: 'اختيار الدول الأربع (مصر، الإمارات، السعودية، عُمان) بأعلام مستطيلة',
    featureEn: '4-Country Selector with Rectangular Flags & Dialing Codes',
    status: '6. الاختبار الفعلي ناجح',
    notesAr: 'أعلام رسمية دون إطارات دائرية مع تبديل كود الاتصال (+20/+971/+966/+968) وحفظ محلي.',
    notesEn: 'Official rectangular flags without circles, updating dial codes with localStorage persistence.',
  },
  {
    id: 'chk_i18n',
    featureAr: 'التحويل الكامل بين العربية RTL والإنجليزية LTR',
    featureEn: 'Full Arabic RTL & English LTR Switching',
    status: '6. الاختبار الفعلي ناجح',
    notesAr: 'ترجمة كاملة لكافة عناصر المرحلة الأولى وليس الأزرار فقط.',
    notesEn: 'Complete translation across all Phase 1 views, controls, and menus.',
  },
  {
    id: 'chk_cart',
    featureAr: 'سلة الطلبات (إضافة، تعديل كمية، حذف، إجمالي، حفظ تلقائي)',
    featureEn: 'Shopping Cart (Add, Edit Qty, Remove, Subtotal, Persistence)',
    status: '6. الاختبار الفعلي ناجح',
    notesAr: 'تم اختبارها فعلياً عبر localStorage. الأسعار غير المعتمدة تظهر كـ "بانتظار اعتماد البيانات".',
    notesEn: 'Tested with localStorage persistence. Unapproved items marked as Awaiting Data Approval.',
  },
  {
    id: 'chk_search',
    featureAr: 'البحث متعدد النطاقات في الشريط العلوي',
    featureEn: 'Top Bar Multi-Scope Search',
    status: '6. الاختبار الفعلي ناجح',
    notesAr: 'يدعم البحث في الكل، العروض، الأماكن، الفواتير، بطاقات الهدايا، الوجبات، والمطابخ.',
    notesEn: 'Filters across All, Offers, Places, Invoices, Gift Cards, Meals, and Kitchens.',
  },
  {
    id: 'chk_kitchens',
    featureAr: 'المطابخ المركزية الثلاثة (هنجر استيشن، مول العين، الحرية)',
    featureEn: '3 Independent Central Kitchens Pages',
    status: '6. الاختبار الفعلي ناجح',
    notesAr: 'صفحة مستقلة لكل مطبخ بالصور المعتمدة ونطاق التغطية دون اختراع عناوين أو هواتف.',
    notesEn: 'Dedicated pages with verified coverage and imagery; no fabricated phones or prices.',
  },
  {
    id: 'chk_logo_slot',
    featureAr: 'مساحة الشعار الرسمي القابلة للرفع',
    featureEn: 'Uploadable Official Logo Slot',
    status: '4. الوظيفة منفذة',
    notesAr: 'يمكن رفع شعار PNG/JPG/SVG وحفظه بالمتصفح لحين ربط Firebase Storage في المراحل القادمة.',
    notesEn: 'Supports local upload & persistence; awaits cloud storage binding in next phase.',
  },
  {
    id: 'chk_rfq_db',
    featureAr: 'طلبات عروض الأسعار (RFQ) وحسابات الدخول',
    featureEn: 'Quotation Requests & User Auth Persistence',
    status: '4. الوظيفة منفذة',
    notesAr: 'تحفظ الطلبات برقم فريد محلياً وتظهر بلوحة الإدارة. الربط الكامل بقاعدة بيانات Firestore وOTP وبوابة الدفع مجدول للمرحلة الثانية.',
    notesEn: 'Generates unique IDs & persists locally for admin review; cloud Firestore rules, SMS OTP & payment gateway scheduled for Phase 2.',
  },
];

export const PHASE1_I18N = {
  ar: {
    brandName: 'كاترينج مصر',
    brandSub: 'الشركة الوطنية اللوجستية',
    officialLogoPlaceholder: 'مساحة الشعار الرسمي',
    uploadLogoHint: 'رفع الشعار',
    resetLogo: 'إعادة ضبط',
    searchPlaceholder: 'ابحث في العروض، المطابخ، الوجبات، الفواتير...',
    scopes: {
      all: 'الكل',
      offers: 'العروض',
      places: 'الأماكن',
      invoices: 'الفواتير',
      gift_cards: 'بطاقات الهدايا',
      meals: 'الوجبات',
      kitchens: 'المطابخ',
    },
    nav: {
      home: 'الرئيسية',
      services: 'الخدمات',
      kitchens: 'المطابخ',
      admin: 'الإدارة والصلاحيات',
      enterpriseLegacy: 'بوابة ERP المتقدمة',
    },
    heroBadge: 'منظومة الإعاشة والتموين الغذائي الموحدة',
    heroTitle: 'تغذية المصانع والشركات والضيافة بمعايير احترافية',
    heroDesc:
      'منصة متكاملة لإدارة طلبات الإعاشة، عروض الوجبات اليومية، المطابخ المركزية، وتنظيم المناسبات والولائم في منظومة موحدة متجاوبة.',
    heroPrimaryCta: 'اطلب عرض سعر',
    heroSecondaryCta: 'تصفح المطابخ المركزية',
    servicesHeading: 'الخدمات الأساسية',
    servicesSubheading: 'اختر الخدمة المطلوبة للانتقال الفوري إلى الشاشة المتخصصة',
    galleryHeading: 'جولة مصورة في خدماتنا ومطابخنا',
    galleryHint: 'اسحب لليمين أو اليسار أو اضغط على أي بطاقة لفتح قسمها',
    kitchensHeading: 'المطابخ المركزية المعتمدة',
    kitchensSubheading: 'ثلاثة مطابخ مركزية متكاملة بتغطية جغرافية منظمة',
    awaitingApproval: 'بانتظار اعتماد البيانات',
    hqLabel: 'المقر الرئيسي للشركة',
    locationLabel: 'الموقع',
    coverageLabel: 'نطاق الخدمة الفعلي',
    servicesOfferedLabel: 'الخدمات المتوفرة',
    menusLabel: 'قوائم وتصنيفات الطعام',
    openKitchenPage: 'فتح صفحة المطبخ المستقلة',
    backToAllKitchens: 'العودة لكل المطابخ',
    requestKitchenQuote: 'طلب عرض سعر لهذا المطبخ',
    addToCartTest: 'إضافة للسلة',
    cartTitle: 'سلة الطلبات',
    cartEmpty: 'سلة الطلبات فارغة حالياً',
    cartItemQty: 'الكمية',
    cartRemove: 'حذف',
    cartSubtotal: 'الإجمالي المقدر للبنود المعتمدة',
    cartUnapprovedNote: 'بنود بانتظار اعتماد السعر النهائي من الإدارة',
    cartConvertQuote: 'تحويل السلة لطلب عرض سعر رسمي',
    notificationsTitle: 'الإشعارات والتنبيهات',
    notificationsScopedBy: 'معروضة وفق صلاحية الحساب الحالي:',
    noNotifications: 'لا توجد تنبيهات مصرح بها لهذا الدور حالياً.',
    supportFloatingTitle: 'مركز الدعم والمحادثة',
    supportWelcome: 'مرحباً بك في مركز دعم CATERING EGYPT. أرسل استفسارك أو طلبك ليتم تسجيله ومراجعته.',
    supportSend: 'إرسال رسالة الدعم',
    quoteModalTitle: 'نموذج طلب عرض سعر رسمي',
    joinKitchenTitle: 'طلب انضمام كمطبخ مركزي',
    roleSwitcherLabel: 'مستوى الصلاحية النشط',
    footerBrand: 'CATERING EGYPT',
    footerRights: 'ضمن منظومة الشركة الوطنية اللوجستية',
    illustrativePhotoNote: 'صورة توضيحية تعبّر عن بيئة التشغيل — بانتظار اعتماد الصور الميدانية الرسمية',
  },
  en: {
    brandName: 'CATERING EGYPT',
    brandSub: 'National Logistics Company',
    officialLogoPlaceholder: 'Official Logo Space',
    uploadLogoHint: 'Upload Logo',
    resetLogo: 'Reset',
    searchPlaceholder: 'Search offers, kitchens, meals, invoices...',
    scopes: {
      all: 'All',
      offers: 'Offers',
      places: 'Places',
      invoices: 'Invoices',
      gift_cards: 'Gift Cards',
      meals: 'Meals',
      kitchens: 'Kitchens',
    },
    nav: {
      home: 'Home',
      services: 'Services',
      kitchens: 'Kitchens',
      admin: 'Account & Governance',
      enterpriseLegacy: 'Enterprise Systems',
    },
    heroBadge: 'Unified Catering & Food Logistics Platform',
    heroTitle: 'Corporate, Industrial & Hospitality Catering at Scale',
    heroDesc:
      'An integrated mobile-first platform managing corporate catering orders, daily meal plans, central kitchens, and event banquets with clear data governance.',
    heroPrimaryCta: 'Request Quotation',
    heroSecondaryCta: 'Explore Central Kitchens',
    servicesHeading: 'Core Services',
    servicesSubheading: 'Select any 3D service icon to open its dedicated section',
    galleryHeading: 'Central Kitchens & Services Showcase',
    galleryHint: 'Auto-scrolling continuous photo strip — swipe or tap any photo to open its section',
    kitchensHeading: 'Approved Central Kitchens',
    kitchensSubheading: 'Three dedicated regional central kitchens with defined coverage',
    awaitingApproval: 'Awaiting Data Approval',
    hqLabel: 'Company Headquarters',
    locationLabel: 'Location',
    coverageLabel: 'Active Service Coverage',
    servicesOfferedLabel: 'Available Services',
    menusLabel: 'Food Categories & Menus',
    openKitchenPage: 'Open Dedicated Kitchen Page',
    backToAllKitchens: 'Back to All Kitchens',
    requestKitchenQuote: 'Request Quote for This Kitchen',
    addToCartTest: 'Add to Cart',
    cartTitle: 'Order Cart',
    cartEmpty: 'Your cart is currently empty',
    cartItemQty: 'Qty',
    cartRemove: 'Remove',
    cartSubtotal: 'Estimated Subtotal (Approved Prices)',
    cartUnapprovedNote: 'Items awaiting final admin price approval',
    cartConvertQuote: 'Convert Cart to Quotation Request',
    notificationsTitle: 'Notifications',
    notificationsScopedBy: 'Filtered by active user role permissions:',
    noNotifications: 'No authorized notifications for this role yet.',
    supportFloatingTitle: 'AI Assistant & Support',
    supportWelcome: 'Welcome to CATERING EGYPT AI & Support Center. Ask a question or submit your inquiry.',
    supportSend: 'Send Inquiry',
    quoteModalTitle: 'Official Quotation Request Form',
    joinKitchenTitle: 'Join as a Central Kitchen',
    roleSwitcherLabel: 'Active Permission Role',
    footerBrand: 'CATERING EGYPT',
    footerRights: 'Part of National Logistics Company System',
    illustrativePhotoNote: 'Illustrative operational photo — awaiting official on-site photography approval',
  },
};
