// Dedicated datasets for Ha-Be German Cement Portal, 12 Buffet Themes, Dates, Camel Liver, and the 6 Professional Departments

export interface GermanEmployee {
  id: string;
  code: string;
  nameAr: string;
  departmentAr: string;
  shift: 'وردية صباحية' | 'وردية مسائية' | 'وردية ليلية';
  jobTitle: string;
  dailyAllowanceEGP: number;
  cashbackBalanceEGP: number;
  monthlyMealsRemaining: number;
  assignedMealPlan: string;
  phone: string;
  status: 'نشط' | 'في إجازة';
}

// Full 81 Factory Employees of German Cement Company (الشركة الألمانية للأسمنت)
export const GERMAN_CEMENT_81_EMPLOYEES: GermanEmployee[] = [
  // خط الإنتاج 1 والأفران (Production Line 1 & Kilns)
  { id: 'emp_01', code: 'GER-001', nameAr: 'م/ سامح قاسم الشناوي', departmentAr: 'إدارة العمليات والتشغيل', shift: 'وردية صباحية', jobTitle: 'مدير الموقع والموارد البشرية', dailyAllowanceEGP: 150, cashbackBalanceEGP: 320, monthlyMealsRemaining: 26, assignedMealPlan: 'بوفيه تنفيذي + وجبة ساخنة', phone: '01198765432', status: 'نشط' },
  { id: 'emp_02', code: 'GER-002', nameAr: 'م/ تامر عبد العال مبروك', departmentAr: 'قسم الأفران الدوارة والكلنكر', shift: 'وردية صباحية', jobTitle: 'رئيس مهندسي الأفران', dailyAllowanceEGP: 130, cashbackBalanceEGP: 215, monthlyMealsRemaining: 24, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223341', status: 'نشط' },
  { id: 'emp_03', code: 'GER-003', nameAr: 'أحمد صابر الدسوقي', departmentAr: 'قسم الأفران الدوارة والكلنكر', shift: 'وردية صباحية', jobTitle: 'مشرف تشغيل الفرن رقم 1', dailyAllowanceEGP: 120, cashbackBalanceEGP: 180, monthlyMealsRemaining: 25, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223342', status: 'نشط' },
  { id: 'emp_04', code: 'GER-004', nameAr: 'محمود جاد الكريم علي', departmentAr: 'قسم الأفران الدوارة والكلنكر', shift: 'وردية مسائية', jobTitle: 'فني تحكم حراري', dailyAllowanceEGP: 120, cashbackBalanceEGP: 145, monthlyMealsRemaining: 23, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223343', status: 'نشط' },
  { id: 'emp_05', code: 'GER-005', nameAr: 'رمضان حسني البشبيشي', departmentAr: 'قسم الأفران الدوارة والكلنكر', shift: 'وردية ليلية', jobTitle: 'مشغل رافعة الكلنكر', dailyAllowanceEGP: 120, cashbackBalanceEGP: 190, monthlyMealsRemaining: 26, assignedMealPlan: 'وجبة ساخنة ليلية + مشروب طاقة', phone: '01011223344', status: 'نشط' },
  { id: 'emp_06', code: 'GER-006', nameAr: 'علاء إسماعيل الطوخي', departmentAr: 'قسم الأفران الدوارة والكلنكر', shift: 'وردية صباحية', jobTitle: 'فني صيانة حراريات', dailyAllowanceEGP: 120, cashbackBalanceEGP: 110, monthlyMealsRemaining: 22, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223345', status: 'نشط' },
  { id: 'emp_07', code: 'GER-007', nameAr: 'سيد عبد الفتاح مرسي', departmentAr: 'قسم الأفران الدوارة والكلنكر', shift: 'وردية مسائية', jobTitle: 'مساعد مشغل أفران', dailyAllowanceEGP: 120, cashbackBalanceEGP: 95, monthlyMealsRemaining: 26, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223346', status: 'نشط' },
  { id: 'emp_08', code: 'GER-008', nameAr: 'إبراهيم شوقي رضوان', departmentAr: 'قسم طواحين الأسمنت', shift: 'وردية صباحية', jobTitle: 'مشرف طواحين الخام', dailyAllowanceEGP: 120, cashbackBalanceEGP: 160, monthlyMealsRemaining: 25, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223347', status: 'نشط' },
  { id: 'emp_09', code: 'GER-009', nameAr: 'وليد عبد الوهاب رشاد', departmentAr: 'قسم طواحين الأسمنت', shift: 'وردية مسائية', jobTitle: 'فني طواحين أسمنت بورتلاندي', dailyAllowanceEGP: 120, cashbackBalanceEGP: 130, monthlyMealsRemaining: 24, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223348', status: 'نشط' },
  { id: 'emp_10', code: 'GER-010', nameAr: 'حسن متولي الشرقاوي', departmentAr: 'قسم طواحين الأسمنت', shift: 'وردية ليلية', jobTitle: 'مشغل سيور نقل الحجر الجيري', dailyAllowanceEGP: 120, cashbackBalanceEGP: 175, monthlyMealsRemaining: 26, assignedMealPlan: 'وجبة ساخنة ليلية', phone: '01011223349', status: 'نشط' },
  
  // الصيانة الميكانيكية والكهربائية (Maintenance)
  { id: 'emp_11', code: 'GER-011', nameAr: 'م/ خالد عبد المنعم درويش', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية صباحية', jobTitle: 'مدير الصيانة المركزية', dailyAllowanceEGP: 140, cashbackBalanceEGP: 280, monthlyMealsRemaining: 25, assignedMealPlan: 'بوفيه تنفيذي + وجبة ساخنة', phone: '01011223350', status: 'نشط' },
  { id: 'emp_12', code: 'GER-012', nameAr: 'طارق مصطفى البنداري', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية صباحية', jobTitle: 'مهندس كهرباء جهد متوسط', dailyAllowanceEGP: 130, cashbackBalanceEGP: 220, monthlyMealsRemaining: 23, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223351', status: 'نشط' },
  { id: 'emp_13', code: 'GER-013', nameAr: 'عصام مجدي النجار', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية صباحية', jobTitle: 'فني ميكانيكا هيدروليك', dailyAllowanceEGP: 120, cashbackBalanceEGP: 140, monthlyMealsRemaining: 26, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223352', status: 'نشط' },
  { id: 'emp_14', code: 'GER-014', nameAr: 'سامح لطفي البحيري', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية مسائية', jobTitle: 'فني لحام ضغط عالي', dailyAllowanceEGP: 120, cashbackBalanceEGP: 155, monthlyMealsRemaining: 24, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223353', status: 'نشط' },
  { id: 'emp_15', code: 'GER-015', nameAr: 'مدحت سمير زكريا', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية ليلية', jobTitle: 'فني أجهزة قياس وتحكم PLC', dailyAllowanceEGP: 125, cashbackBalanceEGP: 195, monthlyMealsRemaining: 26, assignedMealPlan: 'وجبة ساخنة ليلية', phone: '01011223354', status: 'نشط' },
  { id: 'emp_16', code: 'GER-016', nameAr: 'هاني فريد غباشي', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية صباحية', jobTitle: 'فني تزييت وتشحيم تروس', dailyAllowanceEGP: 120, cashbackBalanceEGP: 90, monthlyMealsRemaining: 25, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223355', status: 'نشط' },
  { id: 'emp_17', code: 'GER-017', nameAr: 'ياسر محمد الجزار', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية مسائية', jobTitle: 'فني تبريد وتكييف صناعي', dailyAllowanceEGP: 120, cashbackBalanceEGP: 105, monthlyMealsRemaining: 22, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223356', status: 'نشط' },
  { id: 'emp_18', code: 'GER-018', nameAr: 'عمرو رشاد هنداوي', departmentAr: 'الصيانة الميكانيكية والكهربائية', shift: 'وردية ليلية', jobTitle: 'فني طوارئ صيانة ليلية', dailyAllowanceEGP: 125, cashbackBalanceEGP: 165, monthlyMealsRemaining: 26, assignedMealPlan: 'وجبة ساخنة ليلية', phone: '01011223357', status: 'نشط' },

  // اللوجستيات والمخازن ومحطة التعبئة (Logistics, Packaging & Silos)
  { id: 'emp_19', code: 'GER-019', nameAr: 'أشرف عبد العزيز الفيومي', departmentAr: 'اللوجستيات ومحطة التعبئة', shift: 'وردية صباحية', jobTitle: 'مدير محطة تعبئة الأسمنت السائب والمكيس', dailyAllowanceEGP: 130, cashbackBalanceEGP: 240, monthlyMealsRemaining: 25, assignedMealPlan: 'بوفيه تنفيذي + غداء ساخن', phone: '01011223358', status: 'نشط' },
  { id: 'emp_20', code: 'GER-020', nameAr: 'مجدي نبيل عثمان', departmentAr: 'اللوجستيات ومحطة التعبئة', shift: 'وردية صباحية', jobTitle: 'مشرف موازين شاحنات التصدير', dailyAllowanceEGP: 120, cashbackBalanceEGP: 150, monthlyMealsRemaining: 26, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223359', status: 'نشط' },
  { id: 'emp_21', code: 'GER-021', nameAr: 'نبيل حامد بدوي', departmentAr: 'اللوجستيات ومحطة التعبئة', shift: 'وردية مسائية', jobTitle: 'مشغل ماكينة التعبئة روتو باكر', dailyAllowanceEGP: 120, cashbackBalanceEGP: 135, monthlyMealsRemaining: 23, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223360', status: 'نشط' },
  { id: 'emp_22', code: 'GER-022', nameAr: 'صلاح كمال المنشاوي', departmentAr: 'اللوجستيات ومحطة التعبئة', shift: 'وردية ليلية', jobTitle: 'سائق فوركلفت شحن شاحنات', dailyAllowanceEGP: 120, cashbackBalanceEGP: 160, monthlyMealsRemaining: 26, assignedMealPlan: 'وجبة ساخنة ليلية', phone: '01011223361', status: 'نشط' },
  { id: 'emp_23', code: 'GER-023', nameAr: 'عادل يوسف البرنس', departmentAr: 'اللوجستيات ومحطة التعبئة', shift: 'وردية صباحية', jobTitle: 'أمين مخازن قطع الغيار', dailyAllowanceEGP: 120, cashbackBalanceEGP: 115, monthlyMealsRemaining: 25, assignedMealPlan: 'فطار عمالي + غداء ساخن', phone: '01011223362', status: 'نشط' },
  { id: 'emp_24', code: 'GER-024', nameAr: 'باسم فوزي الجندي', departmentAr: 'اللوجستيات ومحطة التعبئة', shift: 'وردية مسائية', jobTitle: 'مسؤول ميزان بيلت كونتينيوس', dailyAllowanceEGP: 120, cashbackBalanceEGP: 100, monthlyMealsRemaining: 24, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223363', status: 'نشط' },

  // مختبر الجودة وسلامة العمليات (Quality Lab & Safety)
  { id: 'emp_25', code: 'GER-025', nameAr: 'كيميائي/ مروان شاكر زيدان', departmentAr: 'مختبر الجودة والتحاليل الكيميائية', shift: 'وردية صباحية', jobTitle: 'مدير توكيد الجودة والمختبرات', dailyAllowanceEGP: 135, cashbackBalanceEGP: 260, monthlyMealsRemaining: 26, assignedMealPlan: 'بوفيه تنفيذي + وجبة ساخنة', phone: '01011223364', status: 'نشط' },
  { id: 'emp_26', code: 'GER-026', nameAr: 'كيميائي/ إسلام نصر الدين', departmentAr: 'مختبر الجودة والتحاليل الكيميائية', shift: 'وردية صباحية', jobTitle: 'كيميائي تحليل عينات الكلنكر والجبس', dailyAllowanceEGP: 125, cashbackBalanceEGP: 185, monthlyMealsRemaining: 24, assignedMealPlan: 'وجبة ساخنة صحية', phone: '01011223365', status: 'نشط' },
  { id: 'emp_27', code: 'GER-027', nameAr: 'أحمد ماهر الشربيني', departmentAr: 'مختبر الجودة والتحاليل الكيميائية', shift: 'وردية مسائية', jobTitle: 'فني اختبارات مقاومة الضغط والنعومة', dailyAllowanceEGP: 120, cashbackBalanceEGP: 140, monthlyMealsRemaining: 25, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223366', status: 'نشط' },
  { id: 'emp_28', code: 'GER-028', nameAr: 'م/ تامر وجيه سلامة', departmentAr: 'السلامة والصحة المهنية HSE', shift: 'وردية صباحية', jobTitle: 'مدير السلامة والبيئة ومطابقة HACCP', dailyAllowanceEGP: 135, cashbackBalanceEGP: 230, monthlyMealsRemaining: 26, assignedMealPlan: 'بوفيه تنفيذي + وجبة صحية', phone: '01011223367', status: 'نشط' },
  { id: 'emp_29', code: 'GER-029', nameAr: 'شريف مجدي عبد النبي', departmentAr: 'السلامة والصحة المهنية HSE', shift: 'وردية مسائية', jobTitle: 'مفتش سلامة ومطابقة بيئية بالموقع', dailyAllowanceEGP: 120, cashbackBalanceEGP: 120, monthlyMealsRemaining: 25, assignedMealPlan: 'وجبة ساخنة بروتين عالي', phone: '01011223368', status: 'نشط' },

  // ورديات الإنتاج الإضافية وطواقم المحاجر (Production Shifts 30-81)
  ...Array.from({ length: 52 }, (_, idx) => {
    const num = idx + 30;
    const padNum = String(num).padStart(3, '0');
    const firstNames = ['محمود', 'علي', 'حسين', 'سعيد', 'مصطفى', 'شريف', 'كريم', 'ياسين', 'علاء', 'عاطف', 'ضياء', 'هيثم', 'أيمن', 'صلاح'];
    const midNames = ['عبد الرحمن', 'فتحي', 'إسماعيل', 'عثمان', 'البدري', 'رمضان', 'شعبان', 'السيد', 'جلال', 'فاروق', 'ممدوح'];
    const families = ['المصري', 'الهلالي', 'الشناوي', 'السويسي', 'المنوفي', 'الصعيدي', 'الشرقاوي', 'البحيري', 'الدمياطي', 'الديب'];
    
    const fName = firstNames[idx % firstNames.length];
    const mName = midNames[(idx * 3) % midNames.length];
    const lName = families[(idx * 7) % families.length];
    
    const depts = [
      'خط الإنتاج الرئيسي 1',
      'قسم الأفران وتجهيز الخام',
      'قطاع المحاجر وسحق الحجر',
      'طواحين الأسمنت والسيلوهات',
      'الشحن والنقل الداخلي',
      'الخدمات المعاونة والمرافق'
    ];
    const dept = depts[idx % depts.length];
    const shifts: ('وردية صباحية' | 'وردية مسائية' | 'وردية ليلية')[] = ['وردية صباحية', 'وردية مسائية', 'وردية ليلية'];
    const shift = shifts[idx % shifts.length];

    const mealPlans = [
      'وجبة ساخنة بروتين عالي',
      'فطار عمالي + غداء ساخن',
      'وجبة ساخنة ليلية',
      'وجبة صحية متوازنة'
    ];

    return {
      id: `emp_${num}`,
      code: `GER-${padNum}`,
      nameAr: `${fName} ${mName} ${lName}`,
      departmentAr: dept,
      shift,
      jobTitle: `فني تشغيل ${dept.split(' ')[0]}`,
      dailyAllowanceEGP: 120,
      cashbackBalanceEGP: Math.floor(60 + (idx * 4.5) % 150),
      monthlyMealsRemaining: Math.floor(18 + (idx % 9)),
      assignedMealPlan: mealPlans[idx % mealPlans.length],
      phone: `010112233${70 + (idx % 30)}`,
      status: (idx % 12 === 0 ? 'في إجازة' : 'نشط') as ('في إجازة' | 'نشط')
    };
  })
];

// 12 Open Buffet Themes for Events & Weddings ("وجبات مناسبتك")
export interface BuffetTheme {
  id: string;
  number: number;
  nameAr: string;
  nameEn: string;
  category: 'أفراح ومناسبات' | 'مؤتمرات ورجال أعمال' | 'شركات ومصانع' | 'عزائم عائلية';
  capacity: string;
  basePricePerPlateEGP: number;
  highlightDish: string;
  descriptionAr: string;
  image: string;
  features: string[];
}

export const TWELVE_BUFFET_THEMES: BuffetTheme[] = [
  {
    id: 'buffet_01',
    number: 1,
    nameAr: 'بوفيه الفرح الملكي الأسطوري',
    nameEn: 'Royal Wedding Grand Gala',
    category: 'أفراح ومناسبات',
    capacity: '100 — 1,500 فرد',
    basePricePerPlateEGP: 380,
    highlightDish: 'فخدة ضأن مشوية بالفرن مع أرز مكسرات ملكي وكفتة داوود باشا',
    descriptionAr: 'تجربة زفاف راقية شاملة السخانات الإيطالية المذهبة، تشكيلة لحوم ودواجن مشوية، 12 نوع مقبلات ساخنة وباردة، وحلويات شرقية وغربية فاخرة.',
    image: '/assets/catering/open_buffet.jpg',
    features: ['مشروب ترحيبي عصير طبيعي', 'شيفات مباشر للتقطيع والتقديم', 'طاقم ويترز بزي موحد', 'سخانات نحاس وشافنج ديش فاخر']
  },
  {
    id: 'buffet_02',
    number: 2,
    nameAr: 'بوفيه كبار الزوار ورجال الأعمال VIP',
    nameEn: 'Executive VIP Board Buffet',
    category: 'مؤتمرات ورجال أعمال',
    capacity: '30 — 300 فرد',
    basePricePerPlateEGP: 450,
    highlightDish: 'ستيك ريب آي بصوص الفلفل الأسود + سالمون مشوي صوص الشبت',
    descriptionAr: 'مخصص للاجتماعات الوزارية والوفود الدولية ومجالس الإدارات، يقدم أطباقاً عالمية متوازنة مع مقبلات فرنسية وعصائر معصورة طازجة.',
    image: '/assets/catering/camel_liver_tray.jpg',
    features: ['خدمة فندقية 5 نجوم', 'مشروبات دافئة واستراحة شاي كاملة', 'تقديم فردي راقي للضيوف', 'أطباق صحية خالية من الجلوتين']
  },
  {
    id: 'buffet_03',
    number: 3,
    nameAr: 'بوفيه مؤتمرات التغذية والقطاع الطبي',
    nameEn: 'Medical & Healthcare Conference Buffet',
    category: 'مؤتمرات ورجال أعمال',
    capacity: '150 — 2,000 فرد',
    basePricePerPlateEGP: 290,
    highlightDish: 'صدور دجاج مشوية بالأعشاب والليمون + خضار سوتيه على البخار',
    descriptionAr: 'محسوب السعرات والقيم الغذائية ومطابق لاشتراطات أطباء التغذية، خفيف وسريع التناول مع تشكيلة كانابيهات وسلطات عضوية طازجة.',
    image: '/assets/catering/charity_meals.jpg',
    features: ['توضيح السعرات والمكونات على كل طبق', 'خدمة سريعة بدون تكدس', 'عبوات تعبئة معقمة ومحكمة', 'تنوع واسع في السلطات الخضراء']
  },
  {
    id: 'buffet_04',
    number: 4,
    nameAr: 'بوفيه العزومة العائلية ولمة الأحباب',
    nameEn: 'Family Gathering & Festive Buffet',
    category: 'عزائم عائلية',
    capacity: '20 — 150 فرد',
    basePricePerPlateEGP: 260,
    highlightDish: 'صينية الرقاق باللحمة المفرومة + طاجن بامية باللحم الضاني',
    descriptionAr: 'أجواء البيت المصري الأصيل، طواجن فخار بلدي ساخنة، محاشي مشكلة، وكباب حلة بالسمن البلدي مع كود خصم "قوتنا في لمتنا".',
    image: '/assets/catering/open_buffet.jpg',
    features: ['كوبون خصم عائلي "قوتنا في لمتنا"', 'توصيل ساخن جاهز للسفرة فوراً', 'طواجن فخارية طبيعية', 'سرفيس كامل وملاعق تقديم']
  },
  {
    id: 'buffet_05',
    number: 5,
    nameAr: 'بوفيه المشويات الشرقية على الفحم',
    nameEn: 'Charcoal Oriental Grill Buffet',
    category: 'شركات ومصانع',
    capacity: '50 — 1,000 فرد',
    basePricePerPlateEGP: 310,
    highlightDish: 'شيش طاووق، كفتة حاتي بلدي، طرب، وريش بتلو على الفحم المباشر',
    descriptionAr: 'محطة شوي حية لايف ستيشن أمام الحضور، مع خبز بلدي ساخن من الفرن وطحينة سمسم صافي وسلطات بلدي حارة.',
    image: '/assets/catering/camel_liver_tray.jpg',
    features: ['لايف ستيشن شواية فحم متنقلة', 'خبز بلدي يخبز ساخناً', 'سلطات وطحينة ومخللات بلدية', 'شوربة لسان عصفور ترحيبية']
  },
  {
    id: 'buffet_06',
    number: 6,
    nameAr: 'بوفيه الأسماك والمأكولات البحرية الفاخرة',
    nameEn: 'Mediterranean Seafood Feast',
    category: 'أفراح ومناسبات',
    capacity: '50 — 400 فرد',
    basePricePerPlateEGP: 480,
    highlightDish: 'جمبري جامبو مشوي + سمك دنيس بالزيت والليمون + طاجن كاليماري',
    descriptionAr: 'صيد اليوم الطازج من السويس والإسكندرية، شوربة سي فود بالكريمة والزعفران، أرز صيادية بالجمبري، وسلطات رنجة وبابا غنوج.',
    image: '/assets/catering/open_buffet.jpg',
    features: ['مأكولات بحرية طازجة غير مجمدة', 'شوربة بحرية بالكريمة الغنية', 'سلطة سيفود ومقبلات باردة', 'ليمون وأعشاب بحرية طازجة']
  },
  {
    id: 'buffet_07',
    number: 7,
    nameAr: 'بوفيه واحة سيوة والعزائم البدوية الأصيلة',
    nameEn: 'Siwa Oasis & Bedouin Heritage Buffet',
    category: 'عزائم عائلية',
    capacity: '40 — 500 فرد',
    basePricePerPlateEGP: 330,
    highlightDish: 'لحم حنيذ بدوي مدفون تحت الرمل + أرز بالخلطة وتمور سيوة وزبيب',
    descriptionAr: 'نكهة الصحراء الغربية وسيوة، لحم ماعز وضأن مطهو ببطء على الحطب، سلطة زيتون وزيت زيتون سيوة البكر، وشاي زردة على الفحم.',
    image: '/assets/catering/siwa_dates.jpg',
    features: ['تمور سيوة العضوية وزيت زيتون بكر', 'شاي زردة سيوي بالنعناع البلدي', 'طريقة طهي مدفونة بدوية', 'جلسات عربية وسجاد تراثي']
  },
  {
    id: 'buffet_08',
    number: 8,
    nameAr: 'بوفيه المصانع والورديات الثقيلة (طاقة وبروتين)',
    nameEn: 'Industrial High-Energy Factory Buffet',
    category: 'شركات ومصانع',
    capacity: '200 — 5,000 فرد',
    basePricePerPlateEGP: 175,
    highlightDish: 'نصف دجاجة محمرة + أرز مصري بالشعرية + خضار بالصلصة + مخلل وعيش',
    descriptionAr: 'وجبة مشبعة وغنية بالطاقة للعمال والفنيين، مصممة لتحمل بيئات العمل الصناعية ومقدمة في حافظات حرارية عازلة.',
    image: '/assets/catering/charity_meals.jpg',
    features: ['حصص بروتينية مضاعفة للعمال', 'سريعة التوزيع على الورديات', 'حفظ درجة الحرارة فوق 65 مئوية', 'سعر اقتصادي مدعوم للشركات']
  },
  {
    id: 'buffet_09',
    number: 9,
    nameAr: 'بوفيه حفلات التخرج وأعياد الميلاد والمناسبات السعيدة',
    nameEn: 'Graduation & Birthday Celebrations Buffet',
    category: 'أفراح ومناسبات',
    capacity: '40 — 350 فرد',
    basePricePerPlateEGP: 220,
    highlightDish: 'ميني برجر سلايدرز + أصابع كرسبي دجاج + بيتزا وفطائر ميني + تورتة',
    descriptionAr: 'تشكيلة فينجر فود وساندوتشات ميني مقرمشة ومحبوبة للشباب والعائلات، مع كانابيهات ملونة ونافورة شوكولاتة كإضافة مميزة.',
    image: '/assets/catering/open_buffet.jpg',
    features: ['أصناف فينجر فود محبوبة وسهلة الأكل', 'ركن حلويات وتورتة المناسبة', 'عصائر موخيتو وعصائر فريش', 'ديكور بالونات وطاولات مبهجة']
  },
  {
    id: 'buffet_10',
    number: 10,
    nameAr: 'بوفيه الغداء الإيطالي والباستا الطازجة',
    nameEn: 'Italian Pasta & Gourmet Grills Buffet',
    category: 'مؤتمرات ورجال أعمال',
    capacity: '50 — 500 فرد',
    basePricePerPlateEGP: 285,
    highlightDish: 'لايف ستيشن باستا بأنواعها (بيني ألفريدو + فوزيلي بيستو) + إسكالوب بانيه',
    descriptionAr: 'محطة طبخ فوري للمكرونة الإيطالية بأنواع الصوص الأبيض والأحمر والبيستو وجبن البارميزان الأصلي مع بيتزا نابوليتانا ساخنة.',
    image: '/assets/catering/open_buffet.jpg',
    features: ['محطة تجهيز باستا أمام الضيف', 'أجبان بارميزان وموزاريلا طبيعية', 'خبز بالثوم والأعشاب الإيطالية', 'سلطة سيزر بالدجاج المشوي']
  },
  {
    id: 'buffet_11',
    number: 11,
    nameAr: 'بوفيه ليالي رمضان والخيام الرمضانية الساهرة',
    nameEn: 'Ramadan Nights & Tent Iftar Buffet',
    category: 'عزائم عائلية',
    capacity: '100 — 2,500 فرد',
    basePricePerPlateEGP: 320,
    highlightDish: 'طواجن لحم بالبصل المكرمل + بط محمر برتقال + قطايف وكنافة نابلسية',
    descriptionAr: 'روحانيات الإفطار والسحور الرمضاني، عصائر قمر الدين والكركديه والتمر هندي، تمور سيوة الفاخرة، ومأكولات شرقية رمضانية دافئة.',
    image: '/assets/catering/ramadan_box.jpg',
    features: ['مشروبات رمضانية وتمر سيوة على السفرة', 'كنافة وقطايف ساخنة لايف', 'شوربة كريمة ولسان عصفور ساخنة وقت الأذان', 'أجواء رمضانية وفوانيس مضيئة']
  },
  {
    id: 'buffet_12',
    number: 12,
    nameAr: 'بوفيه الكوكتيل والمقبلات الفاخرة (Standing Cocktail)',
    nameEn: 'Luxury Standing Cocktail & Canapés Buffet',
    category: 'مؤتمرات ورجال أعمال',
    capacity: '50 — 800 فرد',
    basePricePerPlateEGP: 210,
    highlightDish: 'كانابيه سالمون مدخن + تارت كبدة دجاج بالكراميل + ميني كباب كفتة',
    descriptionAr: 'مثالي لحفلات افتتاح المقرات والمعارض الفنية وتوقيع العقود، يقدم لقيمات راقية محمولة باليد تسمح بالحركة والتواصل بين الضيوف.',
    image: '/assets/catering/open_buffet.jpg',
    features: ['خدمة تمرير الصواني عبر الويترز Passing Trays', 'طاولات كوكتيل عالية مع زهور طبيعية', 'أصناف متنوعة خفيفة بدون جلوس', 'مشروبات كوكتيل منعشة']
  }
];

// Siwa & New Valley Dates Agricultural Portfolio
export interface DateProductSpec {
  id: string;
  nameAr: string;
  nameEn: string;
  originAr: string;
  grade: string;
  sizesAvailable: string[];
  packagingTypes: string[];
  priceEGPPerKg: number;
  exportReady: boolean;
  descriptionAr: string;
  image: string;
}

export const SIWA_AND_VALLEY_DATES: DateProductSpec[] = [
  {
    id: 'date_siwa_seidi',
    nameAr: 'تمر سيوة الصعيدي العضوي الفاخر',
    nameEn: 'Organic Siwa Seidi Dates',
    originAr: 'مزارع واحة سيوة — مطروح (إنتاج وتعبئة ذاتية مباشرة)',
    grade: 'نخب أول تصدير Extra Grade',
    sizesAvailable: ['جامبو Jumbo', 'كبير Large', 'متوسط Medium'],
    packagingTypes: ['كرتونة تصدير 5 كجم', 'عبوة مستهلك 1 كجم فاخرة', 'أقفاص بلاستيكية للمصانع 10 كجم'],
    priceEGPPerKg: 85,
    exportReady: true,
    descriptionAr: 'تمور برية مجففة طبيعياً تحت شمس سيوة دون أي إضافات كيميائية أو سكريات صناعية، قشرة ناعمة ولحم كثيف غني بالمعادن والألياف.',
    image: '/assets/catering/siwa_dates.jpg'
  },
  {
    id: 'date_medjool_luxury',
    nameAr: 'تمر المجدول الملكي (سيوة والوادي الجديد)',
    nameEn: 'Royal Medjool Dates',
    originAr: 'مزارع الداخلة والخارجة — الوادي الجديد & سيوة',
    grade: 'سوبر جامبو ملكي Super Jumbo',
    sizesAvailable: ['سوبر جامبو (حبة 24-28 جم)', 'جامبو (20-24 جم)', 'لارج (16-20 جم)', 'ميديم'],
    packagingTypes: ['صندوق هدايا كرتون فاخر 1 كجم', 'كرتونة شحن دولي 5 كجم', 'تغليف مفرغ Vacuum'],
    priceEGPPerKg: 195,
    exportReady: true,
    descriptionAr: 'ملك التمور بلا منازع، رطوبة مثالية 18-22%، طعم كراميل طبيعي وقوام طري جداً، مطابق لأعلى مواصفات التصدير لأوروبا ودول الخليج العربي.',
    image: '/assets/catering/siwa_dates.jpg'
  },
  {
    id: 'date_dakhla_wady',
    nameAr: 'تمر الواحات الخارجة والداخلة نصف جاف',
    nameEn: 'New Valley Dakhla Semi-Dry Dates',
    originAr: 'مزارع النيل الأخضر — الداخلة، الوادي الجديد',
    grade: 'فرز أول زراعي',
    sizesAvailable: ['جامبو', 'كبير', 'وسط مبروم'],
    packagingTypes: ['كراتين 5 كجم', 'أكياس فريش 800 جم', 'بالتات شحن مبردة'],
    priceEGPPerKg: 75,
    exportReady: true,
    descriptionAr: 'من أنقى مزارع المياه الجوفية العميقة بالوادي الجديد، نسبة سكر طبيعي متوازنة وعمر تخزيني طويل يصل إلى 18 شهراً.',
    image: '/assets/catering/siwa_dates.jpg'
  }
];

// The 6 Professional Corporate Departments Metadata (Section 3 of User Prompt)
export interface CorporateDepartment {
  id: string;
  code: string;
  number: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  scopeListAr: string[];
  iconKey: string;
  leadOfficerAr: string;
  metrics: { labelAr: string; value: string }[];
  primaryImage: string;
}

export const SIX_CORPORATE_DEPARTMENTS: CorporateDepartment[] = [
  {
    id: 'dept_01',
    code: 'DEPT-NUTRITION',
    number: '01',
    titleAr: 'إدارة التغذية والإعاشة المركزية',
    titleEn: 'Central Nutrition & Catering Operations',
    shortDescAr: 'إدارة الوجبات، المطابخ المركزية الثلاثة، المدارس، المصانع، المستشفيات، وعقود الإعاشة المؤسسية الكبرى.',
    scopeListAr: ['المطابخ المركزية (هنجر استيشن، مول العين ببدر، ريان اللاهون)', 'وجبات المستشفيات العلاجية ومستشفى رويال والشروق', 'إعاشة المصانع الثقيلة والشركة الألمانية للأسمنت', 'عقود التوريد اليومية ومتابعة خطط الطهي'],
    iconKey: 'Utensils',
    leadOfficerAr: 'م/ مصطفى شعبان (مدير العمليات المركزية)',
    metrics: [
      { labelAr: 'طاقة الإنتاج اليومية', value: '18,500 وجبة' },
      { labelAr: 'المطابخ العاملة', value: '3 مطابخ مركزية' },
      { labelAr: 'معدل التوريد في الموعد', value: '99.4%' }
    ],
    primaryImage: '/assets/catering/open_buffet.jpg'
  },
  {
    id: 'dept_02',
    code: 'DEPT-QUALITY',
    number: '02',
    titleAr: 'إدارة الجودة وسلامة الغذاء',
    titleEn: 'Food Safety & HACCP Quality Directorate',
    shortDescAr: 'أنظمة HACCP وISO 22000، التفتيش والرقابة الدورية، التتبع الرقمي، تحليل المخاطر، واعتمادات سلامة الغذاء.',
    scopeListAr: ['فحص نقاط التحكم الحرجة CCP وسجلات درجات الحرارة', 'التفتيش الميداني اليومي ومطابقة الهيئة القومية NFSA', 'شهادات الجودة ISO 22000 و FSSC 22000', 'إجراءات تصحيحية فورية ومسار التتبع من المزرعة للمستهلك'],
    iconKey: 'ShieldCheck',
    leadOfficerAr: 'د/ شريف عثمان & د/ حاتم البشبيشي',
    metrics: [
      { labelAr: 'مؤشر المطابقة والسلامة', value: '99.8%' },
      { labelAr: 'فحوصات CCP اليومية', value: '142 نقطة فحص' },
      { labelAr: 'شهادات الاعتماد', value: 'HACCP + ISO 22000' }
    ],
    primaryImage: '/assets/catering/charity_meals.jpg'
  },
  {
    id: 'dept_03',
    code: 'DEPT-LABS',
    number: '03',
    titleAr: 'إدارة البحوث والمعامل المركزية',
    titleEn: 'Central Research & Food Testing Laboratories',
    shortDescAr: 'الفحوصات الميكروبيولوجية، التحاليل الكيميائية، سحب العينات، التقارير الفنية، ونتائج اختبارات الصلاحية.',
    scopeListAr: ['تحاليل البكتيريا والميكروبات E.Coli & Salmonella', 'فحص متبقيات المبيدات والمعادن الثقيلة بالخضار واللحوم', 'اختبار نقاء مياه الطهي وشبكات التعقيم', 'الاحتفاظ بعينات إرجاعية لمدة 72 ساعة لكل وجبة'],
    iconKey: 'Microscope',
    leadOfficerAr: 'د/ لمياء رضوان (استشاري التحاليل والتغذية)',
    metrics: [
      { labelAr: 'عينات مفحوصة شهرياً', value: '850 عينة' },
      { labelAr: 'زمن ظهور النتيجة', value: 'أقل من 24 ساعة' },
      { labelAr: 'حفظ العينات الإرجاعية', value: '100% مطبق' }
    ],
    primaryImage: '/assets/catering/siwa_dates.jpg'
  },
  {
    id: 'dept_04',
    code: 'DEPT-AGRI',
    number: '04',
    titleAr: 'الإدارة الزراعية والحاصلات',
    titleEn: 'Agricultural & Harvest Directorate (Green Nile Harvest)',
    shortDescAr: 'مزارع النيل الأخضر، محاصيل الخضار والتمور بسيوة والوادي، التعاقدات الزراعية، محطات الفرز والتعبئة.',
    scopeListAr: ['مزارع تمور سيوة والداخلة والخارجة (مجدول وصعيدي)', 'محاصيل الخضروات الورقية والدرنية للطعام المؤسسي', 'محطات الفرز والتدريج الآلي والتعبئة التصديرية', 'تحالف Green Nile Harvest للتميز الزراعي'],
    iconKey: 'Sprout',
    leadOfficerAr: 'م/ عصام عبد الشافي (مدير القطاع الزراعي)',
    metrics: [
      { labelAr: 'مساحة المزارع المتعاقدة', value: '2,400 فدان' },
      { labelAr: 'إنتاج تمور سيوة والوادي', value: '1,200 طن/موسم' },
      { labelAr: 'توريد مباشر للمطابخ', value: 'بدون وسيط 0%' }
    ],
    primaryImage: '/assets/catering/siwa_dates.jpg'
  },
  {
    id: 'dept_05',
    code: 'DEPT-EXPORT',
    number: '05',
    titleAr: 'إدارة التوريد وسجل المصدرين والتجارة',
    titleEn: 'Supply Chain, Procurement & Export Division',
    shortDescAr: 'المشتريات الاستراتيجية، التعاقدات السنوية، التوريد اللوجستي، التصدير الدولي، ومستندات الرقابة على الصادرات GOEIC.',
    scopeListAr: ['أسطول الشاحنات المبردة المجهزة بنظام GPS ومستشعرات حرارة', 'بطاقة قيد سجل المصدرين المعتمدة لتصدير الحاصلات والتمور', 'المشتريات المركزية من كبرى الشركات الوطنية (الزيوت، السكر، اللحوم)', 'إدارة المناقصات وعقود التوريد مع الجهات الحكومية والخاصة'],
    iconKey: 'Truck',
    leadOfficerAr: 'أ/ هاني بهجت & أ/ عبد المجيد الرخاوي',
    metrics: [
      { labelAr: 'أسطول السيارات المبردة', value: '28 شاحنة مبردة' },
      { labelAr: 'دول التصدير المستهدفة', value: '8 دول عربية وأوروبية' },
      { labelAr: 'سجل المصدرين GOEIC', value: 'ساري ومعتمد' }
    ],
    primaryImage: '/assets/catering/ramadan_box.jpg'
  },
  {
    id: 'dept_06',
    code: 'DEPT-AI',
    number: '06',
    titleAr: 'الذكاء والتحليل المؤسسي والتنبؤ بالطلب',
    titleEn: 'Enterprise AI Intelligence & Predictive Forecasting',
    shortDescAr: 'الذكاء الاصطناعي، تحليل البيانات الضخمة، التنبؤ بالطلب الموسمي، تقييم المخاطر، وتحسين كفاءة التشغيل والتكلفة.',
    scopeListAr: ['تحليل الأنماط الموسمية وتغير الطلب بين الصيف والشتاء ومواسم رمضان', 'التنبؤ الذكي بالاستهلاك اليومي لكل موقع متعاقد لمنع الهالك الغذائي', 'مراقبة تكلفة الوجبة التراكمية وهوامش الربح لكل عقد مؤسسي', 'خوارزميات التنبيه المبكر لنقص المواد الخام وإعادة الطلب التلقائي'],
    iconKey: 'Cpu',
    leadOfficerAr: 'م/ مصطفى شعبان (مدير التخطيط الرقمي والعمليات)',
    metrics: [
      { labelAr: 'دقة التنبؤ بالوجبات', value: '98.2%' },
      { labelAr: 'خفض الهالك الغذائي', value: '34% انخفاض' },
      { labelAr: 'تحديث البيانات الحية', value: 'فوري كل ثانية' }
    ],
    primaryImage: '/assets/catering/open_buffet.jpg'
  }
];
