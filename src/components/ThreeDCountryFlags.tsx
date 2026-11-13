import React from 'react';
import { Globe2, Check } from 'lucide-react';
import { OfficialCountryFlag } from './OfficialCountryFlags';
import { CountryCode } from '../data/phase1Data';
import dubaiSkylineImg from '../assets/images/basit_international_markets_1794582819462.jpg';

export interface CountryBranchInfo {
  code: 'EG' | 'AE' | 'GB';
  nameAr: string;
  nameEn: string;
  hubLabelAr: string;
  hubLabelEn: string;
  statusAr: string;
  statusEn: string;
  isActive: boolean;
  coverageTextAr: string;
  coverageTextEn: string;
  currency: string;
}

export const COUNTRY_BRANCHES: CountryBranchInfo[] = [
  {
    code: 'EG',
    nameAr: 'مصر',
    nameEn: 'Egypt',
    hubLabelAr: 'القاهرة · التجمع · بدر · اللاهون',
    hubLabelEn: 'Cairo · New Cairo · Badr · Al-Lahoun',
    statusAr: 'المركز الإقليمي والتشغيل المباشر',
    statusEn: 'Primary Hub & Live Operations',
    isActive: true,
    coverageTextAr: 'المطاعم · الضيافة · التوصيل · المطابخ المركزية · فرص الأعمال',
    coverageTextEn: 'Dining · Hospitality · Delivery · Kitchens · Business Opportunities',
    currency: 'EGP',
  },
  {
    code: 'AE',
    nameAr: 'دبي، الإمارات العربية المتحدة',
    nameEn: 'Dubai, UAE',
    hubLabelAr: 'دبي · الخليج · الضيافة والتجارة',
    hubLabelEn: 'Dubai · GCC · Hospitality & Commerce',
    statusAr: 'سوق دولي معتمد — دبي والإمارات',
    statusEn: 'Featured International Market — Dubai & UAE',
    isActive: true,
    coverageTextAr: 'المطاعم والضيافة · التوصيل السريع · الشركاء والمستثمرون',
    coverageTextEn: 'Dining & Hospitality · Courier Fleet · Commercial Partners',
    currency: 'AED',
  },
  {
    code: 'GB',
    nameAr: 'المملكة المتحدة',
    nameEn: 'United Kingdom',
    hubLabelAr: 'لندن · الشبكة الأوروبية للتجارة',
    hubLabelEn: 'London · UK Commerce & Dining Network',
    statusAr: 'سوق دولي معتمد — المملكة المتحدة',
    statusEn: 'Featured International Market — United Kingdom',
    isActive: true,
    coverageTextAr: 'المطاعم · التجارة · الشراكات اللوجستية والفرص الدولية',
    coverageTextEn: 'Restaurants · Retail · Logistics & Global Opportunities',
    currency: 'GBP',
  },
];

interface ThreeDCountryFlagsProps {
  selectedCountry: CountryCode;
  onSelectCountry: (code: CountryCode) => void;
  isRtl?: boolean;
  className?: string;
}

export const ThreeDCountryFlags: React.FC<ThreeDCountryFlagsProps> = ({
  selectedCountry,
  onSelectCountry,
  isRtl = true,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE7F6] dark:border-[#852BEB]/30 pb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#852BEB] flex items-center justify-center text-white shadow-sm shadow-[#852BEB]/30">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#1A132B] dark:text-white flex items-center gap-2">
              <span>{isRtl ? 'الأسواق الدولية المعتمدة — BASIT' : 'Featured International Markets — BASIT'}</span>
            </h4>
            <p className="text-[11px] font-medium text-[#6E6485] dark:text-[#B8AED1]">
              {isRtl
                ? 'مصر · دبي (الإمارات العربية المتحدة) · المملكة المتحدة — قابلة للتوسع لأسواق إضافية'
                : 'Egypt · Dubai (UAE) · United Kingdom — Expandable international footprint'}
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F4E600] text-[#1A132B] text-[11px] font-black shadow-xs">
          <span>{isRtl ? '3 أسواق نشطة' : '3 Active Markets'}</span>
        </span>
      </div>

      {/* Market Selector Cards with Official Flags & Dubai Architectural Distinction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {COUNTRY_BRANCHES.map((country) => {
          const isSelected = selectedCountry === country.code;

          return (
            <button
              key={country.code}
              type="button"
              onClick={() => onSelectCountry(country.code)}
              className={`group text-start p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                isSelected
                  ? 'bg-gradient-to-br from-[#F8F5FF] via-white to-[#FEFCE8] dark:from-[#261942] dark:to-[#1C1430] border-[#852BEB] shadow-lg shadow-[#852BEB]/15 ring-1 ring-[#852BEB]/40'
                  : 'bg-white dark:bg-[#1A132B] border-[#ECE7F6] dark:border-[#852BEB]/25 hover:border-[#852BEB]/70 hover:shadow-md'
              }`}
            >
              {/* Clean Official Flag Frame */}
              <div className="shrink-0 space-y-1.5">
                <OfficialCountryFlag country={country.code} className="w-14 h-9" />
                {country.code === 'AE' && (
                  <img
                    src={dubaiSkylineImg}
                    alt="Dubai UAE"
                    className="w-14 h-7 object-cover rounded-[4px] border border-[#ECE7F6]"
                  />
                )}
              </div>

              {/* Country Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                  <h5 className="text-xs sm:text-sm font-black text-[#1A132B] dark:text-white truncate">
                    {isRtl ? country.nameAr : country.nameEn}
                  </h5>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#852BEB] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] font-bold text-[#852BEB] dark:text-[#F4E600] truncate">
                  {isRtl ? country.hubLabelAr : country.hubLabelEn}
                </p>

                <p className="text-[11px] font-medium text-[#6E6485] dark:text-[#B8AED1] line-clamp-2 leading-relaxed">
                  {isRtl ? country.coverageTextAr : country.coverageTextEn}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
