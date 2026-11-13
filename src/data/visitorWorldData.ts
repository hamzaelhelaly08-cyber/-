import alAinFeastImg from '../assets/images/al_ain_restaurants_feast_1794529871083.jpg';
import saltSpaImg from '../assets/images/al_ain_salt_spa_wellness_1794529870640.jpg';
import kidsCircusImg from '../assets/images/al_ain_kids_circus_fun_1794529872787.jpg';
import oudNightImg from '../assets/images/al_ain_oud_oriental_night_1794529872267.jpg';
import giftBoxesImg from '../assets/images/wataniya_seasonal_gift_boxes_1794529872199.jpg';
import cateringVipImg from '../assets/images/catering_vip_spread_1794513442775.jpg';
import factoryStripImg from '../assets/images/strip_factory_catering_1794519256376.jpg';
import hangerStationImg from '../assets/images/kitchen_eg_hanger_station_1794519256392.jpg';
import mallAlAinKitchenImg from '../assets/images/kitchen_eg_mall_al_ain_1794519255070.jpg';
import alHurriyaKitchenImg from '../assets/images/kitchen_eg_al_hurriya_1794519256228.jpg';
import { CarouselShowcaseSlide } from './phase1Data';

export const EXPERIMENTAL_TAG_AR = 'بيانات عرض تجريبية — بانتظار الاعتماد النهائي';
export const EXPERIMENTAL_TAG_EN = 'Demo Preview — Pending Final Data Approval';

export interface AlAinRestaurantItem {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconKey: string;
  imageUrl: string;
  sampleHighlightsAr: string[];
  sampleHighlightsEn: string[];
}

export const AL_AIN_RESTAURANTS: AlAinRestaurantItem[] = [
  {
    id: 'pizza_al_ain',
    nameAr: 'بيتزا العين',
    nameEn: 'Al Ain Pizza',
    taglineAr: 'بيتزا مخبوزة على الحجر وعجائن إيطالية طازجة',
    taglineEn: 'Stone-baked artisanal pizzas & fresh dough',
    descriptionAr:
      'منفذ بيتزا متخصص ضمن مطاعم مول العين يقدم أصناف المارجريتا، البيبروني، والدجاج المشوي بعجينة مخمرة طازجة (قائمة الأسعار النهائية بانتظار الاعتماد).',
    descriptionEn:
      'Dedicated pizzeria in Al Ain Mall serving margherita, pepperoni, and wood-fired specialties (final menu prices pending approval).',
    iconKey: 'pizza',
    imageUrl: alAinFeastImg,
    sampleHighlightsAr: ['بيتزا مارجريتا الكلاسيكية (تجريبي)', 'بيتزا باربيكيو دجاج (تجريبي)', 'مخبوزات الجبن بالثوم'],
    sampleHighlightsEn: ['Classic Margherita (Demo)', 'BBQ Chicken Pizza (Demo)', 'Garlic Cheese Crust'],
  },
  {
    id: 'koshary_al_ain',
    nameAr: 'كوشري العين',
    nameEn: 'Al Ain Koshary',
    taglineAr: 'الكشري المصري الأصيل بالصلصة والدقة والشطة',
    taglineEn: 'Authentic Egyptian Koshary with spiced sauces',
    descriptionAr:
      'ركن المطبخ الشعبي الأصيل بلمسة راقية وتعبئة حرارية نظيفة مع إضافات الحمص والبصل المقرمش والطواجن.',
    descriptionEn:
      'Signature Egyptian Koshary station with crispy onions, chickpeas, and oven-baked pasta pots.',
    iconKey: 'utensils',
    imageUrl: '/assets/catering/charity_meals.jpg',
    sampleHighlightsAr: ['طبق كشري العين السوبر (تجريبي)', 'طاجن مكرونة باللحم المفروم (تجريبي)', 'أرز باللبن بالقرفة والمكسرات'],
    sampleHighlightsEn: ['Super Koshary Bowl (Demo)', 'Minced Beef Pasta Bake (Demo)', 'Rice Pudding'],
  },
  {
    id: 'foul_taameya',
    nameAr: 'الفول والطعمية',
    nameEn: 'Foul & Taameya',
    taglineAr: 'إفطار مصري ساخن بطعم البيت على مدار اليوم',
    taglineEn: 'Fresh Egyptian breakfast & crispy falafel',
    descriptionAr:
      'فول مدمس بالخلطة المصرية والزيت الحار والطحينة مع طعمية ساخنة مقرمشة وخبز طازج.',
    descriptionEn:
      'Slow-simmered fava beans, sesame tahini, and golden freshly fried falafel with warm bread.',
    iconKey: 'utensils',
    imageUrl: cateringVipImg,
    sampleHighlightsAr: ['طبق فول بالزيت الحار والطحينة (تجريبي)', 'سندوتش طعمية محشية ساخن (تجريبي)', 'بطاطس ومخللات مشكلة'],
    sampleHighlightsEn: ['Foul with Flaxseed Oil (Demo)', 'Stuffed Taameya Sandwich (Demo)', 'Assorted Sides'],
  },
  {
    id: 'mandi_al_ain',
    nameAr: 'المندي',
    nameEn: 'Al Mandi House',
    taglineAr: 'لحم ودجاج مندي مطهو على الجمر والأرز البسمتي',
    taglineEn: 'Slow-roasted lamb & chicken Mandi over saffron rice',
    descriptionAr:
      'أطباق مندي ومظبي وحنيذ مطهوة بعناية مع تتبيلة الزعفران والأرز طويل الحبة وصوص الدقوس.',
    descriptionEn:
      'Traditional aromatic smoked meat and poultry served on seasoned basmati rice with dakos salsa.',
    iconKey: 'grills',
    imageUrl: alAinFeastImg,
    sampleHighlightsAr: ['مندي ضاني مطهو ببطء (تجريبي)', 'نصف دجاج مندي بالزعفران (تجريبي)', 'كنافة بالمانجو أو القشطة'],
    sampleHighlightsEn: ['Slow Lamb Mandi (Demo)', 'Half Saffron Chicken Mandi (Demo)', 'Traditional Kunafa'],
  },
  {
    id: 'grills_al_ain',
    nameAr: 'المشويات',
    nameEn: 'Al Ain Grills',
    taglineAr: 'كباب وكفتة وشيش طاووق على الفحم الطبيعي',
    taglineEn: 'Charcoal-grilled kebab, kofta & shish tawook',
    descriptionAr:
      'مشويات طازجة على الفحم، كفتة حاتي، ريش ضاني، وطرب مع سلطات بلدي وطحينة وخبز ساخن.',
    descriptionEn:
      'Freshly grilled meat cuts, kofta skewers, and lamb chops paired with green salad and tahini.',
    iconKey: 'grills',
    imageUrl: '/assets/catering/open_buffet.jpg',
    sampleHighlightsAr: ['مشكل مشويات العين العائلي (تجريبي)', 'كفتة حاتي على الفحم (تجريبي)', 'شيش طاووق متبل'],
    sampleHighlightsEn: ['Family Mixed Grill Platter (Demo)', 'Charcoal Kofta (Demo)', 'Marinated Shish Tawook'],
  },
  {
    id: 'sushi_al_ain',
    nameAr: 'السوشي',
    nameEn: 'Al Ain Sushi Bar',
    taglineAr: 'رولات سوشي يابانية طازجة وتشكيلة نيجيري',
    taglineEn: 'Fresh Japanese maki rolls & nigiri selection',
    descriptionAr:
      'تجربة المطبخ الياباني بأعلى درجات الدقة والحفظ المبرد: كاليفورنيا رول، سبايسي سلمون، وتيمبورا.',
    descriptionEn:
      'Precision-crafted sushi rolls, salmon nigiri, and crispy tempura platters.',
    iconKey: 'sushi',
    imageUrl: cateringVipImg,
    sampleHighlightsAr: ['كومبو رول سوشي 16 قطعة (تجريبي)', 'كريسبي سلمون رول (تجريبي)', 'شوربة ميسو وصوص ترياكي'],
    sampleHighlightsEn: ['16-Piece Combo Platter (Demo)', 'Crispy Salmon Roll (Demo)', 'Miso & Teriyaki'],
  },
  {
    id: 'indian_restaurants',
    nameAr: 'المطاعم الهندية',
    nameEn: 'Indian Kitchen',
    taglineAr: 'برياني، بتر تشيكن، وتاندوري بالتوابل الأصيلة',
    taglineEn: 'Biryani, butter chicken & tandoori spice kitchen',
    descriptionAr:
      'أشهى أطباق المطبخ الهندي في مول العين مع خبز النان الساخن بالثوم والزبدة وتتبيلة المسالا.',
    descriptionEn:
      'Aromatic Indian curries, sizzling tandoori platters, and fresh garlic naan straight from the tandoor.',
    iconKey: 'chef',
    imageUrl: alAinFeastImg,
    sampleHighlightsAr: ['برياني دجاج بالزعفران (تجريبي)', 'بتر تشيكن مع نان بالثوم (تجريبي)', 'سمبوسك هندي متبل'],
    sampleHighlightsEn: ['Chicken Biryani (Demo)', 'Butter Chicken & Garlic Naan (Demo)', 'Spiced Samosas'],
  },
  {
    id: 'turkish_restaurants',
    nameAr: 'المطاعم التركية',
    nameEn: 'Turkish Kitchen',
    taglineAr: 'اسكندر كباب، فطائر بيدة، وشاورما تركية',
    taglineEn: 'Iskender kebab, Turkish pide & Anatolian grills',
    descriptionAr:
      'أجواء المطبخ التركي الغنية باللحم المقطع، أضنة كباب، معجنات الفطير التركي، وبقلاوة بالفستق.',
    descriptionEn:
      'Signature Anatolian Iskender kebab, Adana skewers, oven pide flatbreads, and pistachio baklava.',
    iconKey: 'grills',
    imageUrl: '/assets/catering/open_buffet.jpg',
    sampleHighlightsAr: ['اسكندر كباب بالزبدة والزبادي (تجريبي)', 'فطيرة بيدة تركية باللحم والجبن (تجريبي)', 'شاي تركي وبقلاوة'],
    sampleHighlightsEn: ['Iskender Kebab (Demo)', 'Turkish Cheese & Meat Pide (Demo)', 'Turkish Tea & Baklava'],
  },
  {
    id: 'pasta_al_ain',
    nameAr: 'الباستا',
    nameEn: 'Al Ain Pasta',
    taglineAr: 'مكرونات بالصوص الأبيض، المشروم، والسي فود',
    taglineEn: 'Creamy Alfredo, arrabbiata & seafood pasta',
    descriptionAr:
      'ركن المكرونات الإيطالية المحضرة عند الطلب بصوص الكريمة، الروزيه، والريحان مع جبن البارميزان.',
    descriptionEn:
      'Cooked-to-order pasta bowls with Alfredo cream, basil pesto, and slow-simmered tomato sauces.',
    iconKey: 'utensils',
    imageUrl: alAinFeastImg,
    sampleHighlightsAr: ['فيتوتشيني ألفريدو دجاج ومشروم (تجريبي)', 'بيني أرابياتا حار (تجريبي)', 'باستا سي فود'],
    sampleHighlightsEn: ['Chicken Alfredo Fettuccine (Demo)', 'Penne Arrabbiata (Demo)', 'Seafood Pasta'],
  },
  {
    id: 'desserts_al_ain',
    nameAr: 'الحلويات',
    nameEn: 'Desserts & Patisserie',
    taglineAr: 'حلويات شرقية وغربية وتورتات المناسبات',
    taglineEn: 'Oriental & French patisserie sweets',
    descriptionAr:
      'كنافة، بسبوسة، جلاش، تشيز كيك، وتشكيلة تورتات وهدايا الحلويات الطازجة يومياً.',
    descriptionEn:
      'Daily baked kunafa, basbousa, cheesecakes, and specialty tarts crafted for dine-in and gifting.',
    iconKey: 'heart',
    imageUrl: giftBoxesImg,
    sampleHighlightsAr: ['طبق حلويات شرقية مشكل (تجريبي)', 'تشيز كيك بالموسميات (تجريبي)', 'علبة كحك وبسكويت'],
    sampleHighlightsEn: ['Oriental Sweets Box (Demo)', 'Seasonal Cheesecake (Demo)', 'Festive Cookies'],
  },
  {
    id: 'coffee_nuts',
    nameAr: 'البن والمكسرات',
    nameEn: 'Roastery Coffee & Nuts',
    taglineAr: 'بن محمص طازج، قهوة مختصة، ومكسرات فاخرة',
    taglineEn: 'Freshly roasted Arabic coffee & luxury nuts',
    descriptionAr:
      'محمصة متخصصة لتوليفات البن التركي والعربي المحوج، الإسبريسو، واللوز والكاجو والفستق المحمص.',
    descriptionEn:
      'Freshly roasted coffee blends, single-origin espresso, and roasted pistachio & cashew tins.',
    iconKey: 'coffee',
    imageUrl: '/assets/catering/siwa_dates.jpg',
    sampleHighlightsAr: ['توليفة بن تركي محوج ممتاز (تجريبي)', 'بوكس مكسرات وتمور ضيافة (تجريبي)', 'قهوة عربية بالهيل'],
    sampleHighlightsEn: ['Signature Turkish Roast (Demo)', 'Luxury Nuts & Dates Box (Demo)', 'Cardamom Arabic Coffee'],
  },
  {
    id: 'al_ain_grand_market',
    nameAr: 'الماركت الكبير',
    nameEn: 'Al Ain Grand Market',
    taglineAr: 'تسوق منتجات التجزئة للزوار والعائلات في مول العين',
    taglineEn: 'Public visitor retail grocery & fresh pantry',
    descriptionAr:
      'منفذ التجزئة العام لرواد مول العين وزوار المنطقة التجارية (منفصل تماماً عن ماركت العاملين Ha-Be داخل المصانع).',
    descriptionEn:
      'Public retail supermarket serving Al Ain Mall visitors & families (strictly distinct from B2B worker Ha-Be Market).',
    iconKey: 'market',
    imageUrl: '/assets/catering/ramadan_box.jpg',
    sampleHighlightsAr: ['قسم المواد الغذائية الطازجة (تجريبي)', 'منتجات الألبان والمخبوزات (تجريبي)', 'مستلزمات الأسرة والضيافة'],
    sampleHighlightsEn: ['Fresh Produce & Dairy (Demo)', 'Artisan Bakery Counter (Demo)', 'Family Pantry'],
  },
];

export interface MajlisFeatureItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  imageUrl: string;
}

export const MAJLIS_EXPERIENCES: MajlisFeatureItem[] = [
  {
    id: 'camel_liver_taste',
    titleAr: 'تجربة Taste الكبدة الجمالي',
    titleEn: 'Authentic Camel Liver Taste Experience',
    descAr: 'تحضير حي ومباشر للكبدة الجمالي الطازجة بتتبيلة الثوم والفلفل والخلطة الخاصة على الصاج الساخن.',
    descEn: 'Live hot griddle preparation of seasoned camel liver served fresh in warm majlis platters.',
    imageUrl: '/assets/catering/camel_liver_tray.jpg',
  },
  {
    id: 'majlis_mandi',
    titleAr: 'صواني المندي والضيافة الملكية',
    titleEn: 'Royal Mandi & Gathering Feasts',
    descAr: 'ولائم المندي الضاني والدجاج مع أرز البسمتي بالزعفران والمكسرات لضيوف المجالس واللقاءات.',
    descEn: 'Signature lamb and saffron chicken Mandi platters prepared for large group hospitality.',
    imageUrl: alAinFeastImg,
  },
  {
    id: 'majlis_seating',
    titleAr: 'جلسات الضيافة وتجارب المناسبات',
    titleEn: 'Curated Hospitality Lounge & Gatherings',
    descAr: 'مساحات جلوس شرقية أنيقة مجهزة لاستقبال الضيوف والاجتماعات العائلية والاحتفالات الخاصة.',
    descEn: 'Elegant Arabic lounge seating tailored for VIP gatherings, family events, and special evenings.',
    imageUrl: '/assets/aistudio/________________________________d7d7f115.png',
  },
  {
    id: 'majlis_delivery_promo',
    titleAr: 'من مجلسك... إلى مكانك (عروض المجلس)',
    titleEn: 'From Our Majlis to Your Location',
    descAr: 'طلب باقات المجلس والوجبات الخاصة مع عروض الضيافة والتوصيل السريع (عرض تجريبي لحين اعتماد الأسعار).',
    descEn: 'Express Majlis feast boxes and special lounge package reservations (demo pricing).',
    imageUrl: '/assets/aistudio/cbb76c9d-a6af-403a-88f3-96d2fda53603_437a97db.jpg',
  },
];

export interface WellnessServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  iconKey: string;
  imageUrl: string;
  isSaltHouse?: boolean;
}

export const WELLNESS_SERVICES: WellnessServiceItem[] = [
  {
    id: 'luxury_barber',
    titleAr: 'صالون حلاقة رجالي فاخر',
    titleEn: 'Luxury Men’s Grooming Salon',
    descAr: 'خدمات العناية بالذقن والشعر، فوط ساخنة، وجلسات عناية رجالية متكاملة في أجواء هادئة ومريحة.',
    descEn: 'Executive haircut, hot-towel beard grooming, and personal care in a modern lounge.',
    iconKey: 'barber',
    imageUrl: saltSpaImg,
  },
  {
    id: 'steam_bath',
    titleAr: 'حمام بخار',
    titleEn: 'Aromatic Steam Room',
    descAr: 'جلسات بخار دافئة تساعد على تجديد النشاط والاسترخاء بعد يوم عمل حافل.',
    descEn: 'Warm aromatic steam sessions designed for comfort and evening unwinding.',
    iconKey: 'spa',
    imageUrl: saltSpaImg,
  },
  {
    id: 'luxury_spa',
    titleAr: 'سبا واسترخاء وعناية شخصية',
    titleEn: 'Spa & Personal Relaxation',
    descAr: 'جلسات عناية شخصية واسترخاء متكاملة بأسلوب فندقي هادئ وخصوصية كاملة.',
    descEn: 'Tranquil hospitality-grade personal care and relaxation rooms with full privacy.',
    iconKey: 'spa',
    imageUrl: saltSpaImg,
  },
  {
    id: 'moroccan_hammam',
    titleAr: 'حمام مغربي',
    titleEn: 'Traditional Moroccan Hammam',
    descAr: 'تجربة الحمام المغربي الأصيلة باستخدام الصابون البلدي والطمي المغربي في غرف رخامية دافئة.',
    descEn: 'Authentic Moroccan hammam ritual featuring traditional natural care in heated marble suites.',
    iconKey: 'spa',
    imageUrl: saltSpaImg,
  },
  {
    id: 'salt_house',
    titleAr: 'بيت الملح',
    titleEn: 'The Salt House Sanctuary',
    descAr:
      'تجربة استرخاء وعافية فريدة داخل غرفة هادئة مغطاة بكتل الملح الطبيعي مع إضاءة كهرمانية دافئة وموسيقى هادئة لصفاء الذهن والاستجمام (تجربة استرخاء وراحة نفسية فقط دون أي ادعاءات طبية أو علاجية).',
    descEn:
      'A serene salt-lined relaxation room bathed in soft amber illumination and calm acoustics crafted purely for peaceful rest and personal comfort (non-medical wellness experience).',
    iconKey: 'salt',
    imageUrl: saltSpaImg,
    isSaltHouse: true,
  },
];

export interface CouponTemplate {
  id: string;
  categoryAr: string;
  categoryEn: string;
  code: string;
  defaultDiscountLabelAr: string;
  defaultDiscountLabelEn: string;
  validityAr: string;
  validityEn: string;
  termsAr: string;
  termsEn: string;
  iconKey: string;
  accentGradient: string;
}

export const WATANIYA_COUPONS: CouponTemplate[] = [
  {
    id: 'cpn_restaurants',
    categoryAr: 'مطاعم العين (الـ 12 مطعم)',
    categoryEn: 'Al Ain Restaurants (All 12)',
    code: 'CE-DEMO-DINE',
    defaultDiscountLabelAr: 'نسبة خصم تجريبية (% تحددها الإدارة)',
    defaultDiscountLabelEn: 'Demo Discount (% Admin Approved)',
    validityAr: 'فترة صلاحية تجريبية — تُحدد عند التفعيل',
    validityEn: 'Demo Validity — Set Upon Activation',
    termsAr: 'قسيمة استرشادية للعاملين والمتعاقدين مع الشركة الوطنية اللوجستية عند اعتماد الشراكة مع مول العين.',
    termsEn: 'Sample voucher for National Logistics employees & contractors upon formal partnership activation.',
    iconKey: 'utensils',
    accentGradient: 'from-[#5B18B0] via-[#852BEB] to-[#A855F7]',
  },
  {
    id: 'cpn_mandi_grills',
    categoryAr: 'المندي والمشاوي',
    categoryEn: 'Mandi & Charcoal Grills',
    code: 'CE-DEMO-MANDI',
    defaultDiscountLabelAr: 'نسبة خصم تجريبية — بانتظار الاعتماد',
    defaultDiscountLabelEn: 'Demo Discount — Pending Approval',
    validityAr: 'ساري تجريبياً في أوقات العمل المحددة',
    validityEn: 'Demo schedule during dining hours',
    termsAr: 'يُطبق على طلبات الصالات أو التوصيل وفق اللائحة المعتمدة لاحقاً.',
    termsEn: 'Applicable on dine-in & takeaway orders once commercial terms are finalized.',
    iconKey: 'grills',
    accentGradient: 'from-[#4C1D95] via-[#7C3AED] to-[#852BEB]',
  },
  {
    id: 'cpn_majlis',
    categoryAr: 'مجلس ضيافة العين',
    categoryEn: 'Al Ain Hospitality Majlis',
    code: 'CE-DEMO-MAJLIS',
    defaultDiscountLabelAr: 'مزايا ضيافة تجريبية للمجموعات',
    defaultDiscountLabelEn: 'Demo Group Hospitality Benefit',
    validityAr: 'يُحدد وفق حجوزات المجلس المعتمدة',
    validityEn: 'Based on approved Majlis bookings',
    termsAr: 'تشمل تجربة الكبدة الجمالي وباقات الضيافة الجماعية فور اعتماد الإدارة.',
    termsEn: 'Covers live Camel Liver experience & Majlis group packages upon approval.',
    iconKey: 'sparkles',
    accentGradient: 'from-[#3B0764] via-[#6B21A8] to-[#852BEB]',
  },
  {
    id: 'cpn_barber',
    categoryAr: 'صالون الحلاقة الرجالي',
    categoryEn: 'Luxury Men’s Barber',
    code: 'CE-DEMO-BARBER',
    defaultDiscountLabelAr: 'خصم تجريبي لخدمات الحلاقة',
    defaultDiscountLabelEn: 'Demo Grooming Discount',
    validityAr: 'صلاحية تجريبية أسبوعية',
    validityEn: 'Weekly demo window',
    termsAr: 'قسيمة توضيحية للعاملين المتعاقدين لحين اعتماد نسبة الخصم الفعلية.',
    termsEn: 'Illustrative contractor benefit awaiting approved percentage.',
    iconKey: 'barber',
    accentGradient: 'from-[#5B18B0] via-[#7E22CE] to-[#9333EA]',
  },
  {
    id: 'cpn_spa_hammam',
    categoryAr: 'السبا والحمام المغربي',
    categoryEn: 'Spa & Moroccan Hammam',
    code: 'CE-DEMO-SPA',
    defaultDiscountLabelAr: 'قسيمة استجمام تجريبية',
    defaultDiscountLabelEn: 'Demo Spa Wellness Voucher',
    validityAr: 'بالحجز المسبق التجريبي',
    validityEn: 'Advance demo reservation',
    termsAr: 'متاحة للباقات المعتمدة للعاملين وأسرهم وفق اتفاق الشراكة.',
    termsEn: 'Valid for approved employee & family wellness sessions per partnership terms.',
    iconKey: 'spa',
    accentGradient: 'from-[#4338CA] via-[#6D28D9] to-[#852BEB]',
  },
  {
    id: 'cpn_salt_house',
    categoryAr: 'بيت الملح',
    categoryEn: 'The Salt House',
    code: 'CE-DEMO-SALT',
    defaultDiscountLabelAr: 'خصم جلسة استرخاء (تجريبي)',
    defaultDiscountLabelEn: 'Demo Relaxation Session Rate',
    validityAr: 'تُحدد عند الاعتماد الرسمي',
    validityEn: 'Set upon official launch',
    termsAr: 'قسيمة تجربة استرخاء داخل غرفة الملح الهادئة — بدون أي التزام مالي قبل الاعتماد.',
    termsEn: 'Sample voucher for serene Salt House sessions prior to pricing approval.',
    iconKey: 'salt',
    accentGradient: 'from-[#2A1459] via-[#5B18B0] to-[#852BEB]',
  },
  {
    id: 'cpn_kids_area',
    categoryAr: 'منطقة الأطفال Kids Area',
    categoryEn: 'Kids Area Play Zone',
    code: 'CE-DEMO-KIDS',
    defaultDiscountLabelAr: 'باقة عائلية تجريبية للأطفال',
    defaultDiscountLabelEn: 'Demo Family Kids Pass',
    validityAr: 'ساري تجريبياً طوال الأسبوع',
    validityEn: 'Demo valid all week',
    termsAr: 'مخصصة لعائلات العاملين والشركات المتعاقدة مع الوطنية اللوجستية.',
    termsEn: 'Designed for families of National Logistics staff & client partners.',
    iconKey: 'kids',
    accentGradient: 'from-[#6D28D9] via-[#852BEB] to-[#A855F7]',
  },
  {
    id: 'cpn_circus',
    categoryAr: 'السيرك والترفيه',
    categoryEn: 'Circus & Live Shows',
    code: 'CE-DEMO-CIRCUS',
    defaultDiscountLabelAr: 'تذكرة عروض تجريبية',
    defaultDiscountLabelEn: 'Demo Show Pass Rate',
    validityAr: 'وفق جدول العروض الترفيهية',
    validityEn: 'Per live show calendar',
    termsAr: 'قسيمة مخفضة تجريبية لعروض السيرك والألعاب بمول العين.',
    termsEn: 'Sample discount voucher for Al Ain circus pavilion shows.',
    iconKey: 'circus',
    accentGradient: 'from-[#4C1D95] via-[#852BEB] to-[#9333EA]',
  },
  {
    id: 'cpn_oriental_nights',
    categoryAr: 'ليالي الطرب الشرقي',
    categoryEn: 'Oriental Takht Nights',
    code: 'CE-DEMO-TAKHT',
    defaultDiscountLabelAr: 'خصم سهرات الخميس والجمعة (تجريبي)',
    defaultDiscountLabelEn: 'Demo Thu/Fri Evening Benefit',
    validityAr: 'الخميس والجمعة — عرض تجريبي',
    validityEn: 'Thursday & Friday — Demo',
    termsAr: 'يشمل حجز طاولات أمسيات العود والضيافة الشرقية عند تفعيل التعاقد.',
    termsEn: 'Applies to Oud & Oriental evening table reservations upon contract activation.',
    iconKey: 'oud',
    accentGradient: 'from-[#1A132B] via-[#5B18B0] to-[#852BEB]',
  },
];

export interface OccasionCampaignItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  imageUrl: string;
  iconKey: string;
}

export const OCCASIONS_CAMPAIGNS: OccasionCampaignItem[] = [
  {
    id: 'occ_ramadan',
    titleAr: 'شهر رمضان المبارك',
    titleEn: 'Holy Month of Ramadan',
    subtitleAr: 'خيام الإفطار والسحور، كراتين وباقات الضيافة الرمضانية بإشراف الوطنية اللوجستية',
    subtitleEn: 'Iftar & Suhoor corporate banquets & curated Ramadan hospitality hampers',
    imageUrl: '/assets/catering/ramadan_box.jpg',
    iconKey: 'sparkles',
  },
  {
    id: 'occ_eid_fitr',
    titleAr: 'عيد الفطر المبارك',
    titleEn: 'Eid Al-Fitr',
    subtitleAr: 'علب معايدات وهدايا العيد الفاخرة للشركات والأسر',
    subtitleEn: 'Premium corporate & family Eid Al-Fitr celebration boxes',
    imageUrl: giftBoxesImg,
    iconKey: 'gift',
  },
  {
    id: 'occ_eid_adha',
    titleAr: 'عيد الأضحى المبارك',
    titleEn: 'Eid Al-Adha',
    subtitleAr: 'ولائم الأضاحي والفتة والمشويات وباقات الإطعام المنظمة',
    subtitleEn: 'Organized feast platters, grills, and charity meal packaging',
    imageUrl: alAinFeastImg,
    iconKey: 'grills',
  },
  {
    id: 'occ_kahk_season',
    titleAr: 'موسم الكحك وحلويات العيد',
    titleEn: 'Eid Kahk & Pastries Season',
    subtitleAr: 'عبوات كحك، غريبة، بيتي فور، وبسكويت في صناديق فاخرة تحمل هوية الوطنية اللوجستية',
    subtitleEn: 'Artisanal Kahk & pastries presented in signature National Logistics keepsake boxes',
    imageUrl: giftBoxesImg,
    iconKey: 'party',
  },
  {
    id: 'occ_christmas_newyear',
    titleAr: 'أعياد الميلاد والكريسماس',
    titleEn: 'Christmas & New Year Celebrations',
    subtitleAr: 'بوفيهات الاحتفالات السنوية وعلب الهدايا الموسمية للجهات الدولية',
    subtitleEn: 'Festive end-of-year galas & bespoke seasonal gift tins',
    imageUrl: '/assets/catering/open_buffet.jpg',
    iconKey: 'party',
  },
  {
    id: 'occ_corporate_events',
    titleAr: 'حفلات ومؤتمرات الشركات',
    titleEn: 'Corporate Galas & Conferences',
    subtitleAr: 'تجهيز الكوفي بريك والغداء التنفيذي وافتتاحات المصانع والشركات',
    subtitleEn: 'Executive coffee breaks, conference lunches & grand openings',
    imageUrl: cateringVipImg,
    iconKey: 'factory',
  },
  {
    id: 'occ_weddings',
    titleAr: 'حفلات الزواج والخطوبة',
    titleEn: 'Weddings & Engagement Banquets',
    subtitleAr: 'تصميم كامل لبوفيهات الأفراح والخطوبة وبطاقات الدعوة والضيافة',
    subtitleEn: 'Full wedding buffet staging, VIP table service & celebration packages',
    imageUrl: '/assets/catering/open_buffet.jpg',
    iconKey: 'heart',
  },
  {
    id: 'occ_family_events',
    titleAr: 'المناسبات العائلية والاجتماعات',
    titleEn: 'Family Gatherings & Milestones',
    subtitleAr: 'العقيقة، التخرج، والاجتماعات العائلية الكبرى بتجهيز فوري',
    subtitleEn: 'Graduations, family dinners & special milestone gatherings',
    imageUrl: alAinFeastImg,
    iconKey: 'utensils',
  },
  {
    id: 'occ_vip_buffets',
    titleAr: 'باقات الضيافة والبوفيهات المفتوحة',
    titleEn: 'Hospitality & Open Buffet Packages',
    subtitleAr: 'طاولات عرض ساخنة ومبردة بأطقم الخدمة الفاخرة',
    subtitleEn: 'Full open-buffet chafing lines with uniformed hospitality crew',
    imageUrl: '/assets/catering/open_buffet.jpg',
    iconKey: 'compass',
  },
  {
    id: 'occ_seasonal_boxes',
    titleAr: 'علب الهدايا والمنتجات الموسمية',
    titleEn: 'Seasonal Gift Boxes & Hampers',
    subtitleAr: 'تغليف وتعبئة فاخرة (تمور، عسل، مكسرات، بن) بمساحة الشعار الرسمي المعتمد',
    subtitleEn: 'Luxury boxes (dates, honey, coffee, nuts) ready for the official corporate crest',
    imageUrl: giftBoxesImg,
    iconKey: 'gift',
  },
];

// 6 Independent Horizontal Auto-Scrolling Strips (Stage 7)
export const STRIP_1_HERO_CAMPAIGNS: CarouselShowcaseSlide[] = [
  {
    id: 's1_majlis_hero',
    altAr: 'مجلس ضيافة العين — ملتقى الأكيلة والمطاعم والعروض',
    altEn: 'Al Ain Hospitality Majlis — Dining & Offers',
    imageUrl: '/assets/aistudio/________________________________d7d7f115.png',
    targetSection: 'al_ain_majlis',
  },
  {
    id: 's1_feast',
    altAr: 'مطاعم العين — عالم من المذاقات',
    altEn: 'Al Ain Restaurants — World of Flavors',
    imageUrl: alAinFeastImg,
    targetSection: 'al_ain_restaurants',
  },
  {
    id: 's1_delivery',
    altAr: 'من مجلسك إلى مكانك — عروض وتجارب المجلس',
    altEn: 'From Our Majlis to You',
    imageUrl: '/assets/aistudio/cbb76c9d-a6af-403a-88f3-96d2fda53603_437a97db.jpg',
    targetSection: 'al_ain_majlis',
  },
  {
    id: 's1_salt_spa',
    altAr: 'بيت الملح والسبا والعناية الشخصية بمول العين',
    altEn: 'Salt House & Luxury Wellness',
    imageUrl: saltSpaImg,
    targetSection: 'al_ain_wellness',
  },
];

export const STRIP_2_AL_AIN_RESTAURANTS: CarouselShowcaseSlide[] = [
  {
    id: 's2_pizza_mandi',
    altAr: 'بيتزا العين والمندي والمشويات',
    altEn: 'Al Ain Pizza, Mandi & Grills',
    imageUrl: alAinFeastImg,
    targetSection: 'al_ain_restaurant:pizza_al_ain',
  },
  {
    id: 's2_liver',
    altAr: 'تجربة الكبدة الجمالي ومجلس الضيافة',
    altEn: 'Camel Liver & Majlis Cuisine',
    imageUrl: '/assets/catering/camel_liver_tray.jpg',
    targetSection: 'al_ain_majlis',
  },
  {
    id: 's2_grills_turkish',
    altAr: 'المشويات والمطاعم التركية والبوفيهات',
    altEn: 'Grills & Turkish Specialties',
    imageUrl: '/assets/catering/open_buffet.jpg',
    targetSection: 'al_ain_restaurant:grills_al_ain',
  },
  {
    id: 's2_coffee_nuts',
    altAr: 'البن والمكسرات والتمور والحلويات',
    altEn: 'Coffee, Nuts, Dates & Sweets',
    imageUrl: '/assets/catering/siwa_dates.jpg',
    targetSection: 'al_ain_restaurant:coffee_nuts',
  },
];

export const STRIP_3_COUPONS_OFFERS: CarouselShowcaseSlide[] = [
  {
    id: 's3_cpn_main',
    altAr: 'عروض وخصومات الوطنية اللوجستية — قسائم تجريبية',
    altEn: 'National Logistics Offers & Vouchers',
    imageUrl: '/assets/aistudio/cbb76c9d-a6af-403a-88f3-96d2fda53603_437a97db.jpg',
    targetSection: 'al_ain_coupons',
  },
  {
    id: 's3_cpn_dining',
    altAr: 'قسائم خصم المطاعم والمندي والمشويات',
    altEn: 'Dining & Mandi Discount Coupons',
    imageUrl: alAinFeastImg,
    targetSection: 'al_ain_coupons',
  },
  {
    id: 's3_cpn_wellness',
    altAr: 'قسائم السبا وبيت الملح والصالون',
    altEn: 'Spa, Salt House & Salon Vouchers',
    imageUrl: saltSpaImg,
    targetSection: 'al_ain_coupons',
  },
  {
    id: 's3_cpn_kids',
    altAr: 'عروض وقسائم منطقة الأطفال والسيرك',
    altEn: 'Kids Area & Circus Passes',
    imageUrl: kidsCircusImg,
    targetSection: 'al_ain_coupons',
  },
];

export const STRIP_4_ENTERTAINMENT_WELLNESS: CarouselShowcaseSlide[] = [
  {
    id: 's4_kids_circus',
    altAr: 'Kids Area — استمتع أنت وأولادك + السيرك والترفيه',
    altEn: 'Kids Area & Family Circus',
    imageUrl: kidsCircusImg,
    targetSection: 'al_ain_kids',
  },
  {
    id: 's4_salt_spa',
    altAr: 'بيت الملح والسبا وحمام البخار والحمام المغربي والصالون',
    altEn: 'Salt House, Spa & Men Salon',
    imageUrl: saltSpaImg,
    targetSection: 'al_ain_wellness',
  },
  {
    id: 's4_oud_night',
    altAr: 'ليالي الطرب الشرقي والتخت الشرقي — الخميس والجمعة',
    altEn: 'Oriental Takht Music Nights',
    imageUrl: oudNightImg,
    targetSection: 'al_ain_oriental_nights',
  },
  {
    id: 's4_circus_direct',
    altAr: 'السيرك والعروض الترفيهية للعائلات',
    altEn: 'Circus Tent & Entertainment Shows',
    imageUrl: kidsCircusImg,
    targetSection: 'al_ain_circus',
  },
];

export const STRIP_5_OCCASIONS_FESTIVALS: CarouselShowcaseSlide[] = [
  {
    id: 's5_boxes',
    altAr: 'علب الكحك والعيد والهدايا الفاخرة — الوطنية اللوجستية',
    altEn: 'Festive Kahk & Gift Packaging Boxes',
    imageUrl: giftBoxesImg,
    targetSection: 'al_ain_occasions',
  },
  {
    id: 's5_ramadan',
    altAr: 'حملات شهر رمضان وباقات الضيافة الموسمية',
    altEn: 'Ramadan Campaigns & Gift Hampers',
    imageUrl: '/assets/catering/ramadan_box.jpg',
    targetSection: 'al_ain_occasions',
  },
  {
    id: 's5_weddings',
    altAr: 'حفلات الزواج والخطوبة والشركات وبوفيهات الضيافة',
    altEn: 'Weddings, Corporate Events & Open Buffets',
    imageUrl: '/assets/catering/open_buffet.jpg',
    targetSection: 'al_ain_occasions',
  },
  {
    id: 's5_dates',
    altAr: 'منتجات التمور والعسل والبن للمناسبات',
    altEn: 'Dates, Honey & Coffee Celebration Sets',
    imageUrl: '/assets/catering/siwa_dates.jpg',
    targetSection: 'al_ain_occasions',
  },
];

// Strictly Separated B2B / Industrial Corporate Operations Strip (Stage 8 Separation)
export const STRIP_6_CORPORATE_OPERATIONS: CarouselShowcaseSlide[] = [
  {
    id: 's6_factory_line',
    altAr: 'توريد وإعاشة وجبات المصانع والخطوط الإنتاجية',
    altEn: 'Industrial Factory Meal Production',
    imageUrl: factoryStripImg,
    targetSection: 'service_corporate',
  },
  {
    id: 's6_mall_al_ain_kitchen',
    altAr: 'مطبخ مول العين المركزي بمدينة بدر — التشغيل المؤسسي',
    altEn: 'Mall Al Ain Central Kitchen (B2B Ops)',
    imageUrl: mallAlAinKitchenImg,
    targetSection: 'kitchen_detail',
    kitchenId: 'mall_al_ain',
  },
  {
    id: 's6_hanger',
    altAr: 'مطبخ هنجر استيشن المركزي — التجمع',
    altEn: 'Hanger Station Central Kitchen',
    imageUrl: hangerStationImg,
    targetSection: 'kitchen_detail',
    kitchenId: 'hanger_station',
  },
  {
    id: 's6_hurriya',
    altAr: 'مطبخ الحرية المركزي — اللاهون والصعيد',
    altEn: 'Al Hurriya Central Kitchen',
    imageUrl: alHurriyaKitchenImg,
    targetSection: 'kitchen_detail',
    kitchenId: 'al_hurriya',
  },
];
