import React from 'react';
import { Sparkles, MapPin, Check, Lock } from 'lucide-react';

export interface CountryBranchInfo {
  code: 'EG' | 'AE' | 'SA';
  nameAr: string;
  nameEn: string;
  statusAr: string;
  statusEn: string;
  isActive: boolean;
  activeKitchensCount?: number;
  coverageTextAr: string;
  coverageTextEn: string;
  hotline: string;
}

export const COUNTRY_BRANCHES: CountryBranchInfo[] = [
  {
    code: 'EG',
    nameAr: 'جمهورية مصر العربية',
    nameEn: 'Arab Republic of Egypt',
    statusAr: 'الفرع الرئيسي والتشغيل المباشر — 3 مطابخ مركزية',
    statusEn: 'Active Main Operations — 3 Kitchens',
    isActive: true,
    activeKitchensCount: 3,
    coverageTextAr: 'القاهرة الكبرى · العاشر من رمضان · بدر · السويس · العين السخنة',
    coverageTextEn: 'Greater Cairo · 10th of Ramadan · Badr · Suez · Sokhna',
    hotline: '01010430347'
  },
  {
    code: 'AE',
    nameAr: 'الإمارات العربية المتحدة',
    nameEn: 'United Arab Emirates',
    statusAr: 'توسع لوجستي وتصدير تمور — قريباً 2026',
    statusEn: 'Logistics Expansion & Dates Export — 2026',
    isActive: false,
    coverageTextAr: 'دبي · أبوظبي · جبل علي (JAFZA) · الشارقة',
    coverageTextEn: 'Dubai · Abu Dhabi · JAFZA · Sharjah',
    hotline: '+971 4 000 0000'
  },
  {
    code: 'SA',
    nameAr: 'المملكة العربية السعودية',
    nameEn: 'Kingdom of Saudi Arabia',
    statusAr: 'عقود توريد مواسم وتمور — قريباً 2026',
    statusEn: 'Seasons & Dates Supply — 2026',
    isActive: false,
    coverageTextAr: 'الرياض · جدة · الدمام · الجبيل الصناعية · نيوم',
    coverageTextEn: 'Riyadh · Jeddah · Dammam · Jubail · NEOM',
    hotline: '+966 11 000 0000'
  }
];

interface ThreeDCountryFlagsProps {
  selectedCountry: 'EG' | 'AE' | 'SA';
  onSelectCountry: (code: 'EG' | 'AE' | 'SA') => void;
  isRtl?: boolean;
  className?: string;
}

export const ThreeDCountryFlags: React.FC<ThreeDCountryFlagsProps> = ({
  selectedCountry,
  onSelectCountry,
  isRtl = true,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Compact Header Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-orange-500/20 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{isRtl ? 'فروع ونطاقات التوريد المعتمدة' : 'Authorized Territories & Branches'}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                أعلام رسمية
              </span>
            </h4>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{isRtl ? 'المركز الرئيسي: مصر (نشط)' : 'HQ: Egypt (Active)'}</span>
        </span>
      </div>

      {/* Small Compact Flag Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {COUNTRY_BRANCHES.map((country) => {
          const isSelected = selectedCountry === country.code;

          return (
            <div
              key={country.code}
              onClick={() => onSelectCountry(country.code)}
              className={`p-2.5 rounded-2xl border transition-all duration-200 select-none cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/40 dark:to-slate-900 border-orange-500 shadow-md ring-1 ring-orange-500/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Authentic Small Circular Flag Icon (w-11 h-11) */}
              <div className="relative w-11 h-11 shrink-0 rounded-full p-0.5 shadow-md bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600">
                <div className="w-full h-full rounded-full overflow-hidden border border-black/20 relative shadow-inner">
                  
                  {/* 1. EGYPT FLAG: Tricolor Red/White/Black with Golden Eagle of Saladin in center */}
                  {country.code === 'EG' && (
                    <svg viewBox="0 0 44 44" className="w-full h-full" preserveAspectRatio="none">
                      {/* Red Top Stripe */}
                      <rect x="0" y="0" width="44" height="14.6" fill="#C8102E" />
                      {/* White Middle Stripe */}
                      <rect x="0" y="14.6" width="44" height="14.8" fill="#FFFFFF" />
                      {/* Black Bottom Stripe */}
                      <rect x="0" y="29.4" width="44" height="14.6" fill="#000000" />
                      
                      {/* Authentic Eagle of Saladin in center of white stripe */}
                      <g transform="translate(22, 22)">
                        {/* Golden Wings */}
                        <path d="M-5,-4 C-8,-6 -9,-2 -7,2 C-5,5 -3,5 -1,3 Z" fill="#B8860B" />
                        <path d="M5,-4 C8,-6 9,-2 7,2 C5,5 3,5 1,3 Z" fill="#B8860B" />
                        {/* Center Shield with tricolor bands */}
                        <path d="M-2.5,-1.5 L2.5,-1.5 L2,3.5 L0,5 L-2,3.5 Z" fill="#D4AF37" stroke="#7A5A07" strokeWidth="0.4" />
                        <rect x="-1.5" y="-0.5" width="3" height="1.2" fill="#C8102E" />
                        <rect x="-1.5" y="0.7" width="3" height="1.2" fill="#FFFFFF" />
                        <rect x="-1.5" y="1.9" width="3" height="1.2" fill="#000000" />
                        {/* Head turned to the right */}
                        <circle cx="0" cy="-4" r="1.4" fill="#D4AF37" />
                        <path d="M0.5,-4.5 L2.5,-4 L1,-3.2 Z" fill="#7A5A07" />
                        {/* Scroll Base */}
                        <rect x="-3.5" y="5" width="7" height="1.2" rx="0.5" fill="#D4AF37" />
                      </g>

                      {/* Glossy radial sheen */}
                      <circle cx="22" cy="22" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    </svg>
                  )}

                  {/* 2. UAE FLAG: Green/White/Black horizontal with Red vertical hoist + Falcon emblem */}
                  {country.code === 'AE' && (
                    <svg viewBox="0 0 44 44" className="w-full h-full" preserveAspectRatio="none">
                      {/* Green Top */}
                      <rect x="12" y="0" width="32" height="14.6" fill="#00732F" />
                      {/* White Middle */}
                      <rect x="12" y="14.6" width="32" height="14.8" fill="#FFFFFF" />
                      {/* Black Bottom */}
                      <rect x="12" y="29.4" width="32" height="14.6" fill="#000000" />
                      {/* Red Hoist Band */}
                      <rect x="0" y="0" width="12" height="44" fill="#FF0000" />

                      {/* Falcon of Quraish (صقر قريش) emblem on center */}
                      <g transform="translate(28, 22)">
                        {/* Golden Falcon Wings */}
                        <path d="M-5,-4 C-8,-5 -8,-1 -6,2 C-4,4 -2,4 -1,2 Z" fill="#D4AF37" />
                        <path d="M5,-4 C8,-5 8,-1 6,2 C4,4 2,4 1,2 Z" fill="#D4AF37" />
                        {/* Central Flag Disk on chest with 7 stars */}
                        <circle cx="0" cy="1" r="2.8" fill="#D4AF37" stroke="#854D0E" strokeWidth="0.4" />
                        <circle cx="0" cy="1" r="2.1" fill="#C8102E" />
                        {/* Falcon Head */}
                        <circle cx="0" cy="-4" r="1.3" fill="#D4AF37" />
                        <path d="M0.3,-4.5 L2,-4 L0.8,-3.2 Z" fill="#854D0E" />
                        {/* Tail Feathers */}
                        <path d="M-1.5,4 L1.5,4 L1,6 L-1,6 Z" fill="#D4AF37" />
                      </g>

                      <circle cx="22" cy="22" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    </svg>
                  )}

                  {/* 3. SAUDI ARABIA FLAG: Emerald Green with Crossed Swords & Palm Tree emblem */}
                  {country.code === 'SA' && (
                    <svg viewBox="0 0 44 44" className="w-full h-full" preserveAspectRatio="none">
                      {/* Emerald Green Field */}
                      <rect x="0" y="0" width="44" height="44" fill="#006C35" />

                      {/* Official Saudi Emblem: Palm Tree & Two Crossed Swords */}
                      <g transform="translate(22, 21)">
                        {/* Palm Tree Trunk & Fronds */}
                        <path d="M-0.8,0 L0.8,0 L0.5,-4.5 L-0.5,-4.5 Z" fill="#D4AF37" />
                        {/* Fronds */}
                        <path d="M0,-4.5 C-3,-6 -5,-4 -4,-2 C-3,-3 -1,-3.5 0,-4.5 Z" fill="#D4AF37" />
                        <path d="M0,-4.5 C3,-6 5,-4 4,-2 C3,-3 1,-3.5 0,-4.5 Z" fill="#D4AF37" />
                        <path d="M0,-4.5 C-1.5,-7 1.5,-7 0,-4.5 Z" fill="#D4AF37" />

                        {/* Two Crossed Arabian Curved Swords underneath */}
                        {/* Sword 1 */}
                        <path d="M-5,4 Q0,1.5 5,1 L4.5,1.5 Q0,2 -4.5,4.5 Z" fill="#FFFFFF" />
                        <rect x="-5.5" y="3.5" width="1" height="2" fill="#D4AF37" transform="rotate(-30 -5.5 3.5)" />
                        {/* Sword 2 */}
                        <path d="M5,4 Q0,1.5 -5,1 L-4.5,1.5 Q0,2 4.5,4.5 Z" fill="#FFFFFF" />
                        <rect x="4.5" y="3.5" width="1" height="2" fill="#D4AF37" transform="rotate(30 4.5 3.5)" />
                      </g>

                      <circle cx="22" cy="22" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    </svg>
                  )}

                </div>
              </div>

              {/* Country Details (Compact & Clear) */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-black text-slate-900 dark:text-white truncate">
                    {isRtl ? country.nameAr : country.nameEn}
                  </h5>
                  {country.isActive ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="نشط" />
                  ) : (
                    <span className="text-[9px] text-amber-500 font-bold shrink-0">قريباً</span>
                  )}
                </div>

                <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold truncate mt-0.5">
                  {isRtl ? country.statusAr.split('—')[0] : country.statusEn.split('—')[0]}
                </p>

                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {isRtl ? country.coverageTextAr.split('·').slice(0, 3).join('·') : country.coverageTextEn.split('·').slice(0, 3).join('·')}
                </p>
              </div>

              {/* Selection Checkmark */}
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

